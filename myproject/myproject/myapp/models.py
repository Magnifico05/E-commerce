from django.db import models

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
    category = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    warranty = models.CharField(max_length=255)
    color = models.CharField(max_length=255)
    weight = models.FloatField()
    dimensions = models.CharField(max_length=255)
    connectivity = models.CharField(max_length=255)
    features = models.TextField()
    reviews = models.TextField()
    availability = models.BooleanField()
    sku = models.CharField(max_length=255)
    images = models.ImageField(upload_to='products/')
    description = models.TextField()
    manufacturer_part_number = models.CharField(max_length=255)
    specification = models.ForeignKey(Specification, on_delete=models.CASCADE, related_name='products')

    def __str__(self):
        return self.name

