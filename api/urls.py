from django.urls import path, include

app_name = 'api_v1'

urlpatterns = [
    path('articles/', include('articles.urls', namespace='articles')),
    path('accounts/', include('accounts.urls', namespace='accounts')),
]
