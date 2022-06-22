from django.urls import path

from .views import ArticleListAPIView, ArticleDetailAPIView, ArticlesByUserAPIView, PublishedArticlesAPIView, DraftArticlesAPIView

app_name = 'articles'

urlpatterns = [
    path('', PublishedArticlesAPIView.as_view()),
    path('<int:pk>/', ArticleDetailAPIView.as_view()),
    path('author/', ArticlesByUserAPIView.as_view()),
    path('author/drafts/', DraftArticlesAPIView.as_view()),
]