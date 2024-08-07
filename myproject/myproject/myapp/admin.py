from django.contrib import admin
from .models import User, Address, Specification, Product, categories, order, orderitem, cart, cartitem


myModels = [ User, Address, Specification, Product, categories, order, orderitem, cart, cartitem]  # iterable list
for model in myModels:
    admin.site.register(model)