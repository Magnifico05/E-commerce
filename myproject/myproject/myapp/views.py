from datetime import date
import logging
from django.shortcuts import render
from matplotlib.dates import DateFormatter
from rest_framework.response import Response
from rest_framework import status
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import viewsets
from .models import *
from .serializers import *
from django.db import transaction
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from rest_framework.exceptions import NotFound


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
   ## permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.action in ['list']:
            self.permission_classes = [IsAdminUser]
        else:
            self.permission_classes = [IsAuthenticated]
        return super().get_permissions()


class AddressViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer
    permission_classes = [IsAuthenticated]


class SpecificationViewSet(viewsets.ModelViewSet):
    queryset = Specification.objects.all()
    serializer_class = SpecificationSerializer
   ## permission_classes = [IsAuthenticated]


class CategoriesViewSet(viewsets.ModelViewSet):
    queryset = categories.objects.all()
    serializer_class = CategoriesSerializer
    permission_classes = [IsAuthenticated]


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
   ## permission_classes = [IsAuthenticated]


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


class CartViewSet(viewsets.ModelViewSet):
    queryset = cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]
    

class UserAddressesView(generics.ListAPIView):
    serializer_class = AddressSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        return Address.objects.filter(user_id=user_id)


class UserOrdersView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        return order.objects.filter(user_id=user_id)


class UsersByProductView(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        product_id = self.kwargs['product_id']
        return User.objects.filter(order__orderitem__product_id=product_id)
    
# user -> cart -> cartitem -> 

class UserCartView(generics.ListAPIView):
    serializer_class = CartItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user_id = self.kwargs.get('user_id')
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            raise NotFound(detail="User not found")

        carts_with_user = cart.objects.filter(user_id=user_id)
        
        return cartitem.objects.filter(cart__in=carts_with_user)
    
#return address of order : order -> user -> address

# class OrderAddressView(generics.ListAPIView):
#     serializer_class = AddressSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         order_id = self.kwargs['order_id']
#         try:
#             Order = order.objects.get(id=order_id)
#         except order.DoesNotExist:
#                 raise NotFound(detail="Order not found")
        
#         user = Order.user
#         try:
#             address = Address.objects.get(user=user)
#         except Address.DoesNotExist:
#             raise NotFound(detail="Address not found for this user")

#         return address
#     def get(self, request, *args, **kwargs):
#         address = self.get_object()
#         serializer = self.get_serializer(address)
#         return Response(serializer.data)    

class OrderAddressView(generics.GenericAPIView):
    serializer_class = AddressSerializer
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
logger = logging.getLogger(__name__)

class CheckoutView(generics.GenericAPIView):
    serializer_class = OrderItemSerializer

    def post(self, request, *args, **kwargs):
        user = request.user

        # Ensure the user exists
        if not user:
            logger.error("User is not found in the request.")
            return Response({'detail': 'User is not found.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Start a transaction to ensure data integrity
            with transaction.atomic():
                # Get the user's cart
                try:
                    user_cart = cart.objects.get(user=user)
                except cart.DoesNotExist:
                    logger.error(f"Cart not found for user {user.id}")
                    return Response({'detail': 'Cart not found.'}, status=status.HTTP_404_NOT_FOUND)

                # Create a new order
                new_order = order.objects.create(
                    user=user,
                    ordertotal=user_cart.totalprice,
                    date=date.today(),
                    delivery=0.0  # Assuming default delivery cost
                )

                # Transfer all cart items to order items
                cart_items = cartitem.objects.filter(cart=user_cart)
                order_items = []
                for cart_item in cart_items:
                    order_item = orderitem.objects.create(
                        order=new_order,
                        product=cart_item.product,
                        quantity=cart_item.quantity
                    )
                    order_items.append(order_item)

                # Clear the cart
                cart_items.delete()

            # Serialize and return the order items
            serializer = self.get_serializer(order_items, many=True)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        except Exception as e:
            logger.error(f"Error during checkout: {e}")
            return Response({'detail': 'An error occurred during checkout.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)