from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAdminUser

from .models import Article 
from .serializers import ArticleSerializer
from .permissions import IsAuthorOrReadOnly

# Create your views here.


class ArticleListAPIView(generics.ListCreateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class PublishedArticlesAPIView(generics.ListAPIView): 
    # queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        return Article.objects.filter(is_published=True)
    

class ArticleDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = (IsAuthorOrReadOnly,)


class ArticlesByUserAPIView(generics.ListCreateAPIView):
    # queryset = Article.objects.all()
    serializer_class = ArticleSerializer

    def get_queryset(self):
        author = self.request.user
        return Article.objects.filter(author=author.id)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class DraftArticlesAPIView(generics.ListCreateAPIView):
    serializer_class = ArticleSerializer
    
    def get_queryset(self):
        author = self.request.user
        return Article.objects.filter(is_draft=True, author=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class SubmittedArticlesAPIView(generics.ListCreateAPIView):
    serializer_class = ArticleSerializer


    def get_queryset(self):
        author = self.request.user
        return Article.objects.filter(is_published=False, is_draft=False, author=author.id)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class SubmittedDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ArticleSerializer
    permission_classes = (IsAdminUser,)

    def get_queryset(self):
        return Article.objects.filter(is_published=False, is_draft=False)