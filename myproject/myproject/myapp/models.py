from django.db import models
from django.contrib.auth.models import User, AbstractBaseUser, BaseUserManager
from . import Address

class AccountManager(BaseUserManager):
    def create_user(self, email, phone_number, first_name, last_name, address, birthdate, password=None):
        if not email:
            raise ValueError('Users must have an email address')
        if not phone_number:
            raise ValueError('Users must have a phone number')
        
        user = self.model(
            email=self.normalize_email(email),
            phone_number=phone_number,
            first_name=first_name,
            last_name=last_name,
            address=address,
            birthdate=birthdate,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, phone_number, first_name, last_name, address, birthdate, password=None):
        user = self.create_user(
            email=self.normalize_email(email),
            phone_number=phone_number,
            first_name=first_name,
            last_name=last_name,
            address=address,
            birthdate=birthdate,
            password=password,
        )
        user.is_admin = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser):
    email = models.EmailField(verbose_name='email', max_length=60, unique=True)
    phone_number = models.CharField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    address = models.ForeignKey(Address, on_delete=models.CASCADE)
    birthdate = models.DateField()
    is_admin = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    last_login = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'phone_number'
    REQUIRED_FIELDS = ['email', 'first_name', 'last_name', 'address', 'birthdate']

    objects = AccountManager()

    def __str__(self):
        return self.phone_number + ', ' + self.email
    
    def has_perm(self, perm, obj=None):
        return self.is_admin
    
    def has_module_perms(self, app_label):
        return True


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

    def __str__(self):
        return self.name

class categories(models.Model):
    name = models.CharField(max_length=255)
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
    totalprice = models.FloatField() 
    def __str__(self):
        return f"{self.user},{self.totalprice}"
    
class cartitem(models.Model):
    cart = models.ForeignKey(cart, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    def __str__(self):
        return f"{self.cart},{self.product},{self.quantity}"
      

class Address(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    country = models.CharField(max_length=255)
    governorate = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    street = models.CharField(max_length=255)
    building_number = models.CharField(max_length=255)
    apartment_number = models.CharField(max_length=255)
    notes = models.TextField()





