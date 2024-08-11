from rest_framework import generics
from .models import Specification
from .serializers import SpecificationSerializer

class ProductSpecificationListView(generics.ListAPIView):
    serializer_class = SpecificationSerializer

    def get_queryset(self):
        product_id = self.kwargs.get('product_id')
        print(f"Product ID in get_queryset: {product_id}")  # Debug statement
        return Specification.objects.filter(product_id=product_id)
