from datetime import date
from rest_framework.response import Response
from rest_framework import status
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import viewsets
from rest_framework import status
from .models import *
from .serializers import *
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from django.db import transaction
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.core.mail import send_mail
from rest_framework.exceptions import NotFound, AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView
from rest_framework.decorators import action



from datetime import  timedelta
from django.utils import timezone

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.action in ['list']:
            self.permission_classes = [IsAdminUser]
        else:
            self.permission_classes = [IsAuthenticated]
        return super().get_permissions()


class MeAPIView(RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

class AddressViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Address.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class SpecificationViewSet(viewsets.ModelViewSet):
    queryset = Specification.objects.all()
    serializer_class = SpecificationSerializer



class CategoriesViewSet(viewsets.ModelViewSet):
    queryset = categories.objects.all()
    serializer_class = CategoriesSerializer
    permission_classes = [IsAuthenticated]


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]


class OrderItemViewSet(viewsets.ModelViewSet):
    queryset = orderitem.objects.all()
    serializer_class = OrderItemSerializer
    permission_classes = [IsAuthenticated]


class OrderViewSet(viewsets.ModelViewSet):
    queryset = order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]


class CartItemViewSet(viewsets.ModelViewSet):
    queryset = cartitem.objects.all()
    serializer_class = CartItemSerializer
    permission_classes = [IsAuthenticated]
    
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data)
    
    
    @action(detail=False, methods=['post'])
    def add_to_cart(self, request):
        try:
            product_id = request.data.get('product_id')
            quantity = request.data.get('quantity', 1)

            # Retrieve or create the user's cart
            user_cart, created = cart.objects.get_or_create(user=request.user)

            # Retrieve the product by ID
            product = Product.objects.get(id=product_id)

            # Retrieve or create the cart item
            cart_item, created = cartitem.objects.get_or_create(
                cart=user_cart,
                product=product,
                defaults={'quantity': quantity}
            )

            if not created:
                # If the item already exists, update the quantity
                cart_item.quantity += quantity
                cart_item.save()

            # Optionally, update the total price of the cart
            user_cart.totalprice = sum(item.product.price * item.quantity for item in user_cart.cartitem_set.all())
            user_cart.save()

            return Response({'message': 'Item added to cart'}, status=status.HTTP_200_OK)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CartViewSet(viewsets.ModelViewSet):
    queryset = cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]
    

class UserAddressesView(generics.ListAPIView):
    serializer_class = AddressSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user_id = self.request.user.id
        
        return Address.objects.filter(user_id=user_id)


class UserOrdersView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user_id = self.request.user.id
        return order.objects.filter(user_id=user_id)


class UsersByProductView(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        product_id = self.kwargs['product_id']
        return User.objects.filter(order__orderitem__product_id=product_id)
class UserCartView(generics.ListAPIView):
    serializer_class = CartItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user_id = self.request.user.id
        print(self.request.user)
        print(self.request.user.id)

        user = self.request.user

        if not user.is_authenticated:
            raise AuthenticationFailed("Authentication credentials were not provided or are invalid.")

        user_id = user.id
        print(f"Authenticated User: {user}")
        print(f"User ID: {user_id}")

        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            raise NotFound(detail= "User not found")

        carts_with_user = cart.objects.filter(user_id=user_id)
        
        return cartitem.objects.filter(cart__in=carts_with_user)
    
class OrderAddressView(generics.GenericAPIView):
    serializer_class = AddressSerializer
    permission_classes = [IsAuthenticated]

    lookup_field = 'order_id'  # This is the custom field you will use for lookup

    def get_object(self):
        # Use the custom lookup_field to retrieve the order
        order_id = self.kwargs.get(self.lookup_field)

        try:
            # Retrieve the order
            Order = order.objects.get(id=order_id)
        except order.DoesNotExist:
            raise NotFound(detail="Order not found")

        # Find the user's address (assuming a user has one address)
        user = Order.user
        try:
            address = Address.objects.get(user=user)
        except Address.DoesNotExist:
            raise NotFound(detail="Address not found for this user")

        return address

    def get(self, request, *args, **kwargs):
        address = self.get_object()
        serializer = self.get_serializer(address)
        return Response(serializer.data)

class OrdersInAddressView(generics.ListAPIView):
    serializer_class = OrderSerializer
    # permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Get the address_id from the URL parameters
        address_id = self.kwargs.get('address_id')

        try:
            # Check if the address exists
            address = Address.objects.get(id=address_id)
        except Address.DoesNotExist:
            raise NotFound(detail="Address not found")

        # Find all users associated with this address
        users_with_address = User.objects.filter(address__id=address_id)
        
        # Find all orders for these users
        return order.objects.filter(user__in=users_with_address)
    

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]


    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
    

class LoginView(generics.GenericAPIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        print(request.user)
        serializer = LoginSerializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        cart.objects.get_or_create(user=user)


        refresh = RefreshToken.for_user(user)

        return Response({
            'refresh' : str(refresh),
            'access' : str(refresh.access_token),
            'user_id' : user.id,
        }, status = status.HTTP_200_OK)
        address_id = self.kwargs['address_id']

class ProductSpecificationListView(generics.ListAPIView):
    serializer_class = SpecificationSerializer

    def get_queryset(self):
        product_id = self.kwargs.get('product_id')
        try:
            product = Product.objects.get(id=product_id)
            return Specification.objects.filter(id=product.specification_id)
        except Product.DoesNotExist:
            return Specification.objects.none()

class ProductsByCategoryView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        product_id = self.kwargs.get('product_id')
        try:
            product = Product.objects.get(id=product_id)
            category = product.category
            return Product.objects.filter(category=category)
        except Product.DoesNotExist:
            return Product.objects.none()

class ProductCategoryView(generics.RetrieveAPIView):
    serializer_class = CategoriesSerializer

    def get_object(self):
        product_id = self.kwargs.get('product_id')
        try:
            product = Product.objects.get(id=product_id)
            # Return the category of the specified product
            return product.category
        except Product.DoesNotExist:
            return None
class OrderItemListView(generics.ListAPIView):
    serializer_class = OrderItemSerializer

    def get_queryset(self):
        order_id = self.kwargs.get('order_id')
        return orderitem.objects.filter(order_id=order_id)

class CartItemListView(generics.ListAPIView):
    serializer_class = CartItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Get the cart ID from the URL parameters
        cart_id = self.kwargs.get('cart_id')
        # Filter cart items by the provided cart ID
        return cartitem.objects.filter(cart_id=cart_id)
class CheckoutView(generics.GenericAPIView):
    serializer_class = CheckoutSerializer
    permission_classes = [AllowAny]  # Explicitly allow unauthenticated access

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        user_id = serializer.validated_data['user_id']
        address_id = serializer.validated_data['address_id']
        cart_items_data = serializer.validated_data['cart_items']

        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({'detail': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

        try:
            user_cart = cart.objects.get(user=user)
        except cart.DoesNotExist:
            return Response({'detail': 'Cart not found.'}, status=status.HTTP_404_NOT_FOUND)

        try:
            address = Address.objects.get(id=address_id)
            delivery_cost = address.delivery_cost
        except Address.DoesNotExist:
            return Response({'detail': 'Address not found.'}, status=status.HTTP_404_NOT_FOUND)

        print(f"User found: {user}")
        print(f"Cart found: {user_cart}")
        print(f"Address found: {address}")

        with transaction.atomic():
            new_order = order.objects.create(
                user=user,
                ordertotal=user_cart.totalprice + delivery_cost,  # Include delivery cost
                date=date.today(),
                delivery=delivery_cost
            )

            order_items = []
            for item_data in cart_items_data:
                product_id = item_data.get('product_id')
                quantity = item_data.get('quantity', 1)

                try:
                    product = Product.objects.get(id=product_id)
                except Product.DoesNotExist:
                    return Response({'detail': f'Product with id {product_id} not found.'}, status=status.HTTP_404_NOT_FOUND)

                order_item = orderitem.objects.create(
                    order=new_order,
                    product=product,
                    quantity=quantity
                )
                order_items.append(order_item)

            cartitem.objects.filter(cart=user_cart).delete()

        order_items_serializer = self.get_serializer(order_items, many=True)
        return Response(order_items_serializer.data, status=status.HTTP_201_CREATED)
class SendOTPView(generics.GenericAPIView):
    serializer_class = OTPSerializer  # Specify the serializer class

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data.get('email')
            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                return Response({'detail': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

            # Generate a random OTP
            otp_code = str(random.randint(100000, 999999))  # Generate a 6-digit OTP

            # Create or update OTP
            otp, created = OTP.objects.get_or_create(user=user)
            otp.otp_code = otp_code  # Set the generated OTP
            otp.expires_at = timezone.now() + timedelta(minutes=5)  # Set expiration time to 5 minutes from now
            otp.save()  # Ensure that the OTP is saved

            # Send OTP via email
            send_mail(
                'Your OTP Code',
                f'Your OTP code is {otp.otp_code}. It will expire in 5 minutes.',
                'your-email@example.com',  # Replace with your actual email
                [email],
                fail_silently=False,
            )

            return Response({'detail': 'OTP sent.'}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class VerifyOTPView(generics.GenericAPIView):
    serializer_class = OTPVerifySerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            otp_code = serializer.validated_data['otp_code']

            # Debugging information
            print(f"Email: {email}")
            print(f"OTP Code: {otp_code}")

            # Verify OTP
            try:
                otp = OTP.objects.get(user__email=email, otp_code=otp_code)
                if otp.is_valid():
                    return Response({'detail': 'OTP verified successfully.'}, status=status.HTTP_200_OK)
                else:
                    return Response({'detail': 'OTP has expired.'}, status=status.HTTP_400_BAD_REQUEST)
            except OTP.DoesNotExist:
                return Response({'detail': 'Invalid OTP.'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            # Print serializer errors for debugging
            print("Serializer Errors:", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)