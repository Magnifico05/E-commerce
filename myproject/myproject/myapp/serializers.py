from rest_framework import serializers
from django.contrib.auth import authenticate
# from .models import User, Address, Specification, categories, Product, order, orderitem, cart, cartitem
from .models import *

class UserSerializer(serializers.ModelSerializer):
    phone_number = serializers.CharField(source='userprofile.phone_number', read_only=True)
    birthdate = serializers.DateField(source='userprofile.birthdate', read_only=True)
    class Meta:
        model = User
        fields =  fields = ('username', 'email', 'id', 'first_name', 'last_name', 'phone_number', 'birthdate')


class AddressSerializer(serializers.ModelSerializer):
    # user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

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
    images = serializers.SerializerMethodField()
    specification = SpecificationSerializer()
    category = CategoriesSerializer()

    class Meta:
        model = Product
        fields = '__all__'
    
    def get_images(self, obj):
        request = self.context.get('request')
        return request.build_absolute_uri(obj.images.url)


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



# class RegisterSerializer(serializers.ModelSerializer):
#     password = serializers.CharField(write_only=True)
#     phone_number = serializers.CharField(source='userprofile.phone_number', read_only=True)
#     birthdate = serializers.DateField(source='userprofile.birthdate', read_only=True)
#     class Meta:
#         model = User
#         fields = ['username', 'password', 'first_name', 'last_name', 'phone_number', 'birthdate']

#     def create(self, validated_data):
#         user = User.objects.create_user(
#             # username=validated_data['username'],
#             password=validated_data['password'],
#             username=validated_data['username'],
#             first_name=validated_data['first_name'],
#             last_name=validated_data['last_name'],
#             phone_number=validated_data['phone_number'],
#             birthdate=validated_data['birthdate']
#         )
#         return user
    
class RegisterSerializer(serializers.ModelSerializer):
    phone_number = serializers.CharField(write_only=True)
    birthdate = serializers.DateField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'first_name', 'last_name', 'phone_number', 'birthdate']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        # Extract profile-related fields
        phone_number = validated_data.pop('phone_number')
        birthdate = validated_data.pop('birthdate')

        # Create the user
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
        )

        # Create the user profile
        UserProfile.objects.create(
            user=user,
            phone_number=phone_number,
            birthdate=birthdate
        )

        return user

class LoginSerializer(serializers.Serializer):
    identifier = serializers.CharField()
    password = serializers.CharField(write_only=True)   
    # phone_number = serializers.CharField(source='userprofile.phone_number', read_only=True)
    # birthdate = serializers.DateField(source='userprofile.birthdate', read_only=True)

    def validate(self, data):
        identifier = data['identifier']
        password = data['password']
        
        if '@' in identifier:
            try:
                user = User.objects.get(username=identifier)

            except User.DoesNotExist:
                raise serializers.ValidationError('Invalid email or password')

        # else:
        #     try:
        #         user = User.objects.get(phone_number=identifier)
            
        #     except User.DoesNotExist:
        #         raise serializers.ValidationError('Invalid phone number or password')
            
        if not user.check_password(password):
            raise serializers.ValidationError('Invalid email/phone number or password')
        
        if not user.is_active:
            raise serializers.ValidationError('User account is disabled')
        
        return {
            'user': user
        }
# class LoginSerializer(serializers.Serializer):
#     identifier = serializers.CharField()
#     password = serializers.CharField(write_only=True)

#     def validate(self, data):
#         identifier = data['identifier']
#         password = data['password']

#         # Assuming identifier can be email or username
#         try:
#             if '@' in identifier:
#                 user = User.objects.get(email=identifier)
#             # else:
#             #     user = User.objects.get(username=identifier)
#         except User.DoesNotExist:
#             raise serializers.ValidationError('Invalid email or username')

#         if not user.check_password(password):
#             raise serializers.ValidationError('Invalid credentials')

#         if not user.is_active:
#             raise serializers.ValidationError('User account is disabled')

#         return {
#             'user': user
#         }

    
class OTPSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True, help_text="The email address to which the OTP will be sent.")
class OTPVerifySerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp_code = serializers.CharField(max_length=6)
class CheckoutSerializer(serializers.Serializer):
    user_id = serializers.IntegerField()
    address_id = serializers.IntegerField()  # Add this to get the delivery cost
    cart_items = serializers.ListField(child=serializers.DictField())

    def validate(self, data):
        if 'address_id' not in data:
            raise serializers.ValidationError("Address ID is required.")
        return data