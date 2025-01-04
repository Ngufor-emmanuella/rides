from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import ObtainAuthToken  # Correct import
from .views import (
    index,
    LogoutView, ForgotPasswordView, LoginView,
    Rav4SergeView, Prado1ElvisView, RegisterView, ElvisSectionCreateView,
    Prado2LevinusView, CustomAuthToken, ElvisSectionUpdateView, LevinusSectionCreateView, MonthlyGoalView,
    LevinusSectionUpdateView, SergeSectionUpdateView, SergeSectionCreateView, EditHistoryDetailView, EditHistoryListView

)

app_name = 'core'

router = DefaultRouter()
router.register(r'prado1', Prado1ElvisView)
router.register(r'prado2', Prado2LevinusView)
router.register(r'rav4', Rav4SergeView)

urlpatterns = [
    path('users/', RegisterView.as_view(), name='register'),  # Added trailing slash
    path('api/', include(router.urls)),
    path("", index, name="index"),

    # path to add data to model table
    path('api/elvis/', ElvisSectionCreateView.as_view(), name='elvis-section-create'),
    path('api/levinus/', LevinusSectionCreateView.as_view(), name='levinus-section-create'),
    path('api/serge/', SergeSectionCreateView.as_view(), name='serge-section-create'),

    # paths to edit views
    path('api/elvisupdate/<int:pk>/', ElvisSectionUpdateView.as_view(), name='elvis-section-update'),
    path('api/levinus/<int:pk>/', LevinusSectionUpdateView.as_view(), name='edit_levinus'),
    path('api/serge/<int:pk>/', SergeSectionUpdateView.as_view(), name='edit_serge'),
    
    # path for history

    path('api/elvis-history/', EditHistoryListView.as_view(), name='elvis-history-list'),
    path('api/edit-history/<int:pk>/', EditHistoryDetailView.as_view(), name='edit-history-detail'),
   
    # path for monthly and yearly goals percentage
    path('api/elvis-monthly-goal/<int:year>/', MonthlyGoalView.as_view(), name='monthly-goal'),

    # Add other paths as needed...
    
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/token-auth/', CustomAuthToken.as_view(), name='token_auth'),
    
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/logout/', LogoutView.as_view(), name='logout'),
    path('api/forgot-password/', ForgotPasswordView.as_view(), name='forgot_password'),
]