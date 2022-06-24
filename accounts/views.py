from django.shortcuts import get_object_or_404
from rest_framework import generics
from django.contrib.auth import get_user_model

from .models import Profile
from .serializers import ProfileSerializer

# Create your views here.

User = get_user_model()

class ProfileListAPIView(generics.ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def perform_create(self, serializer):
        # serializer.save(user=get_object_or_404(User, id=1))
        serializer.save(user=self.request.user)


