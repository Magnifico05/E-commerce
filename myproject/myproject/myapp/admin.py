from django.contrib import admin
from .models import Address, Specification, Product, categories, order, orderitem, cart, cartitem

@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = ('country', 'governorate', 'city', 'street', 'building_number', 'apartment_number')
    search_fields = ('country', 'city','governorate')

@admin.register(Specification)
class SpecificationAdmin(admin.ModelAdmin):
    list_display = ('processor', 'ram', 'storage', 'screen_size', 'resolution', 'battery_life', 'operating_system')
    search_fields = ('processor', 'ram', 'storage')

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'brand', 'model_number', 'price', 'color', 'weight', 'dimensions')
    search_fields = ('name', 'brand', 'model_number')
    list_filter = ('brand', 'color')

@admin.register(categories)
class CategoriesAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

@admin.register(order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('user', 'ordertotal', 'date', 'delivery')
    search_fields = ('user__email', 'date')
    list_filter = ('date',)

@admin.register(orderitem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('order', 'product', 'quantity')
    search_fields = ('order_useremail', 'product_name')

@admin.register(cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ('user', 'totalprice')
    search_fields = ('user__email',)

@admin.register(cartitem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ('cart', 'product', 'quantity')
    search_fields = ('cart_useremail', 'product_name')