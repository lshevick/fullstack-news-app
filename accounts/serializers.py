from rest_framework import serializers

from dj_rest_auth.serializers import TokenModel

from .models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Profile
        fields = '__all__'

class TokenSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')
    
    class Meta:
        model = TokenModel
        fields = '__all__'