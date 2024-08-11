from django.shortcuts import render
from rest_framework import generics
from .models import Address
from .serializers import AddressSerializer
from rest_framework.permissions import IsAuthenticated

class UserAddressesView(generics.ListAPIView):
    serializer_class = AddressSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        return Address.objects.filter(user_id=user_id)


