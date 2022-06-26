from django.db import models
from django.conf import settings


# Create your models here.

class Article(models.Model):
    title = models.CharField(max_length=255)
    body = models.TextField(max_length=900)
    category = models.CharField(max_length=255)
    image = models.ImageField(upload_to='profiles/', blank=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True)
    is_published = models.BooleanField(default=False)
    is_draft = models.BooleanField(default=False)
    is_editable = models.BooleanField(default=False)
    is_rejected = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title