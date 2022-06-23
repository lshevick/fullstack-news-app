from django.urls import path

from .views import ArticleListAPIView, ArticleDetailAPIView, ArticlesByUserAPIView, PublishedArticlesAPIView, DraftArticlesAPIView, SubmittedArticlesAPIView, SubmittedDetailAPIView, CheckIfUserIsAdminView, ReviewArticlesAPIView

app_name = 'articles'

urlpatterns = [
    path('', PublishedArticlesAPIView.as_view()),
    path('<int:pk>/', ArticleDetailAPIView.as_view()),
    path('author/', ArticlesByUserAPIView.as_view()),
    path('author/drafts/', DraftArticlesAPIView.as_view()),
    path('author/submitted/', SubmittedArticlesAPIView.as_view()),
    path('author/submitted/<int:pk>/', SubmittedDetailAPIView.as_view()),
    path('admin/', CheckIfUserIsAdminView.as_view()),
    path('admin_review/', ReviewArticlesAPIView.as_view()),
]