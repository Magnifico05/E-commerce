from rest_framework import serializers
from .models import User, Address, Specification, categories, Product, order, orderitem, cart, cartitem

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class AddressSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Address
        fields = '__all__'


class SpecificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Specification
        fields = '__all__'


class CategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = categories
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    specification = SpecificationSerializer()
    category = CategoriesSerializer()

    class Meta:
        model = Product
        fields = '__all__'


class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = orderitem
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    orderitem_set = OrderItemSerializer(many=True)  

    class Meta:
        model = order
        fields = '__all__'


class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = cartitem
        fields = '__all__'


class CartSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    cartitem_set = CartItemSerializer(many=True)  

    class Meta:
        model = cart
        fields = '__all__'
