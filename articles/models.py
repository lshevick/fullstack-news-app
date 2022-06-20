from django.db import models
from django.conf import settings


# Create your models here.

class Article(models.Model):
    title = models.CharField(max_length=255)
    body = models.TextField(max_length=900)
    image = models.ImageField(upload_to='profiles/')
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True)

    def __str__(self):
        return self.title