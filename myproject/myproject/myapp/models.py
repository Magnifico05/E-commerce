from django.db import models
from django.contrib.auth.models import User, AbstractBaseUser, BaseUserManager

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
      
    
