from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import User, Address, Specification, categories, Product, order, orderitem, cart, cartitem

class UserSerializer(serializers.ModelSerializer):
    phone_number = serializers.CharField(source='userprofile.phone_number', read_only=True)
    birthdate = serializers.DateField(source='userprofile.birthdate', read_only=True)
    class Meta:
        model = User
        fields =  fields = ('username', 'email', 'id', 'first_name', 'last_name', 'phone_number', 'birthdate')


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



class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    phone_number = serializers.CharField(source='userprofile.phone_number', read_only=True)
    birthdate = serializers.DateField(source='userprofile.birthdate', read_only=True)
    class Meta:
        model = User
        fields = '__all__'

    def create(self, validated_data):
        user = User.objects.create_user(
            # username=validated_data['username'],
            password=validated_data['password'],
            username=validated_data['username'],
            # first_name=validated_data['first_name'],
            # last_name=validated_data['last_name'],
            # phone_number=validated_data['phone_number'],
            # birthdate=validated_data['birthdate']
        )
        return user
    


class LoginSerializer(serializers.Serializer):
    identifier = serializers.CharField()
    password = serializers.CharField(write_only=True)   
    phone_number = serializers.CharField(source='userprofile.phone_number', read_only=True)
    birthdate = serializers.DateField(source='userprofile.birthdate', read_only=True)

    def validate(self, data):
        identifier = data['identifier']
        password = data['password']
        
        if '@' in identifier:
            try:
                user = User.objects.get(username=identifier)

            except User.DoesNotExist:
                raise serializers.ValidationError('Invalid email or password')

        else:
            try:
                user = User.objects.get(phone_number=identifier)
            
            except User.DoesNotExist:
                raise serializers.ValidationError('Invalid phone number or password')
            
        if not user.check_password(password):
            raise serializers.ValidationError('Invalid email/phone number or password')
        
        if not user.is_active:
            raise serializers.ValidationError('User account is disabled')
        
        return {
            'user': user
        }
class OTPSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True, help_text="The email address to which the OTP will be sent.")
class OTPVerifySerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp_code = serializers.CharField(max_length=6)