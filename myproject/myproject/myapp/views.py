from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import viewsets
from .models import *
from .serializers import *
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.exceptions import NotFound


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


class AddressViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer
    permission_classes = [IsAuthenticated]


class SpecificationViewSet(viewsets.ModelViewSet):
    queryset = Specification.objects.all()
    serializer_class = SpecificationSerializer
    permission_classes = [IsAuthenticated]


class CategoriesViewSet(viewsets.ModelViewSet):
    queryset = categories.objects.all()
    serializer_class = CategoriesSerializer
    permission_classes = [IsAuthenticated]


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]


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
    permission_classes = [IsAuthenticated]

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
        return order.objects.filter(address__address_id=address_id)
from rest_framework import generics
from .models import Specification
from .serializers import SpecificationSerializer

class ProductSpecificationListView(generics.ListAPIView):
    serializer_class = SpecificationSerializer

    def get_queryset(self):
        product_id = self.kwargs.get('product_id')
        print(f"Product ID in get_queryset: {product_id}")  # Debug statement
        return Specification.objects.filter(product_id=product_id)
