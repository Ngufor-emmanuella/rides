from django.urls import path
from .views import UserRegistrationView, CustomTokenObtainPairView, PasswordResetRequestView, PasswordResetConfirmView

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='login'),
    
    # password rest
    path('password-reset/', PasswordResetRequestView.as_view(), name='password_reset'),
    path('reset/<uidb64>/<token>/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),


]
