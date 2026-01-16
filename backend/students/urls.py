from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from .views import StudentViewSet, custom_login

router = DefaultRouter()
router.register(r'students', StudentViewSet, basename='student')

urlpatterns = [
    path('', include(router.urls)),
    path('auth/login/', custom_login, name='custom_login'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
