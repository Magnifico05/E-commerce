
import random
from datetime import timedelta 
from django.utils import timezone
from django.db import models
from django.contrib.auth.models import User
import datetime
from django.contrib.auth.models import User, AbstractBaseUser, BaseUserManager





# class AccountManager(BaseUserManager):
#     def create_user(self, email, phone_number, first_name, last_name, birthdate, password=None):
#         if not email:
#             raise ValueError('Users must have an email address')
#         if not phone_number:
#             raise ValueError('Users must have a phone number')
        
#         user = self.model(
#             email=self.normalize_email(email),
#             phone_number=phone_number,
#             first_name=first_name,
#             last_name=last_name,
#             birthdate=birthdate,
#         )

#         user.set_password(password)
#         user.save(using=self._db)
#         return user

#     def create_superuser(self, email, phone_number, first_name, last_name, birthdate, password=None):
#         user = self.create_user(
#             email=self.normalize_email(email),
#             phone_number=phone_number,
#             first_name=first_name,
#             last_name=last_name,
#             birthdate=birthdate,
#             password=password,
#         )
#         user.is_admin = True
#         user.is_superuser = True
#         user.save(using=self._db)
#         return user
    


# class User(AbstractBaseUser):
#     email = models.EmailField(verbose_name='email', max_length=60, unique=True)
#     phone_number = models.CharField(max_length=255, unique=True)
#     first_name = models.CharField(max_length=255)
#     last_name = models.CharField(max_length=255)
#     birthdate = models.DateField()
#     is_admin = models.BooleanField(default=False)
#     is_superuser = models.BooleanField(default=False)
#     last_login = models.DateTimeField(auto_now=True)

#     USERNAME_FIELD = 'phone_number'
#     REQUIRED_FIELDS = ['email', 'first_name', 'last_name', 'birthdate']


#     def __str__(self):
#         return self.phone_number + ', ' + self.email
    
#     def has_perm(self, perm, obj=None):
#         return self.is_admin
    
#     def has_module_perms(self, app_label):
#         return True

# User.REQUIRED_FIELDS = ['first_name', 'last_name', 'phone_number', 'birthdate']

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=15)
    birthdate = models.DateField()

class Address(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    country = models.CharField(max_length=255)
    governorate = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    street = models.CharField(max_length=255)
    building_number = models.CharField(max_length=255)
    apartment_number = models.CharField(max_length=255)
    notes = models.TextField(blank=True)
    delivery_cost = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)  # Example


    def __str__(self):
       return f"{self.country}, {self.governorate}, {self.city}, {self.street}, {self.building_number}, {self.apartment_number}"
        

class Specification(models.Model):
    processor = models.CharField(max_length=255)
    ram = models.CharField(max_length=255)
    storage = models.CharField(max_length=255)
    screen_size = models.CharField(max_length=255)
    resolution = models.CharField(max_length=255)
    battery_life = models.CharField(max_length=255)
    operating_system = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.processor}, {self.ram}, {self.storage}"
    

class categories(models.Model):
    name = models.CharField(max_length=255)
    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=255)
    brand = models.CharField(max_length=255)
    model_number = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    color = models.CharField(max_length=255)
    weight = models.FloatField()
    dimensions = models.CharField(max_length=255)
    images = models.ImageField(upload_to='products/')
    description = models.TextField()
    specification = models.ForeignKey(Specification, on_delete=models.CASCADE, related_name='products')
    category = models.ForeignKey(categories, on_delete=models.CASCADE, related_name='products', null=True)

    def __str__(self):
        return self.name



class order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    ordertotal= models.FloatField()
    date = models.DateField()
    delivery=models.FloatField()
    
    def __str__(self):
        return f"{self.user},{self.date},{self.delivery},{self.ordertotal}"

class orderitem(models.Model):
    order = models.ForeignKey(order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    def __str__(self):
        return f"{self.order},{self.product},{self.quantity}"

class cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    totalprice = models.FloatField(default=0) 
    def __str__(self):
        return f"Cart for {self.user}"
    
class cartitem(models.Model):
    cart = models.ForeignKey(cart, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    def __str__(self):
        return f"{self.cart},{self.product},{self.quantity}"
      
# class UserToken(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     token = models.CharField(max_length=255)
#     def __str__(self):
#         return f"{self.user},{self.token}"




class OTP(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    otp_code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True,null=True)
    expires_at = models.DateTimeField(null=True, blank=True)

   

    def is_valid(self):
        if self.expires_at is None:
            return False  # Consider OTP invalid if expires_at is None
        return timezone.now() < self.expires_at


