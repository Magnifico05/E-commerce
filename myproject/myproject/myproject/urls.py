from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from myapp.views import *
from myapp.views import CheckoutView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'addresses', AddressViewSet)
router.register(r'specifications', SpecificationViewSet)
router.register(r'categories', CategoriesViewSet)
router.register(r'products', ProductViewSet)
router.register(r'orders', OrderViewSet)
router.register(r'order-items', OrderItemViewSet)
router.register(r'carts', CartViewSet)
router.register(r'cart-items', CartItemViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('api/me/', MeAPIView.as_view(), name='me'),
    path('admin/', admin.site.urls),
    path('register/', RegisterView.as_view(), name='register'), #done
    path('login/', LoginView.as_view(), name='login'), #done
    #  path('auth/', secure.as_view(), name='secure'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/users/addresses/', UserAddressesView.as_view(), name='user-addresses'),
    path('users/orders/', UserOrdersView.as_view(), name='user-orders'),
    path('product/<int:product_id>/users/', UsersByProductView.as_view(), name='user-by-product'),
    path('orders-in-address/<int:address_id>/', OrdersInAddressView.as_view(), name='orders-in-address'),
    path('user-cart/', UserCartView.as_view(), name='user-cart'),
    path('order-address/<int:order_id>/', OrderAddressView.as_view(), name='order-address'),
    # path('users/<int:user_id>/cart/', UserCartView.as_view(), name='user-cart'),
    path('order/<int:order_id>/address/', OrderAddressView.as_view(), name='order-address'),
    path('address/<int:address_id>/orders/', OrdersInAddressView.as_view(), name='orders-in-address'),
   path('products/<int:product_id>/specifications/', ProductSpecificationListView.as_view(), name='product-specifications'),
   path('products/<int:product_id>/category-products/', ProductsByCategoryView.as_view(), name='category-products'),
   path('products/<int:product_id>/category/', ProductCategoryView.as_view(), name='product-category'),
   path('orders/<int:order_id>/items/', OrderItemListView.as_view(), name='order-items'),
   path('checkout/', CheckoutView.as_view(), name='checkout'),
   path('carts/<int:cart_id>/items/', CartItemListView.as_view(), name='cart-items'),
   path('send-otp/', SendOTPView.as_view(), name='send-otp'),
    path('verify-otp/', VerifyOTPView.as_view(), name='verify-otp'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)