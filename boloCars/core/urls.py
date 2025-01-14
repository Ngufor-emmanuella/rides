from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import ObtainAuthToken  # Correct import
from .views import (
    index,
    LogoutView, ForgotPasswordView, LoginView, LevinusHistoryListView, SergeHistoryListView, 
    Rav4SergeView, Prado1ElvisView, RegisterView, SergeMonthlyGoalView, LevinusMonthlyGoalView,
    Prado2LevinusView, CustomAuthToken, ElvisSectionUpdateView, LevinusSectionCreateView, MonthlyGoalView,
    LevinusSectionUpdateView, SergeSectionUpdateView, SergeSectionCreateView, EditHistoryDetailView, EditHistoryListView,
    ElvisSectionViewSet,

)

app_name = 'core'

# paths to display all the field in tabble format
router = DefaultRouter()
router.register(r'prado1', Prado1ElvisView)
router.register(r'prado2', Prado2LevinusView)
router.register(r'rav4', Rav4SergeView)
router.register(r'elvis-sections', ElvisSectionViewSet, basename='elvis-section')

urlpatterns = [
    # paths to display all the field in tabble format
    path('users/', RegisterView.as_view(), name='register'),  # Added trailing slash
    path('api/', include(router.urls)),
    path("", index, name="index"),

    # path to add data to model table
    path('api/levinus/', LevinusSectionCreateView.as_view(), name='levinus-section-create'),
    path('api/serge/', SergeSectionCreateView.as_view(), name='serge-section-create'),
   
    #path for balance amount
    
    # paths to edit views
    path('api/elvisupdate/<int:pk>/', ElvisSectionUpdateView.as_view(), name='elvis-section-update'),
    path('api/levinusupdate/<int:pk>/', LevinusSectionUpdateView.as_view(), name='edit_levinus'),
    path('api/serge/<int:pk>/', SergeSectionUpdateView.as_view(), name='edit_serge'),
    
    # path for history

    path('api/elvis-history/', EditHistoryListView.as_view(), name='elvis-history-list'),
    path('api/edit-history/<int:pk>/', EditHistoryDetailView.as_view(), name='edit-history-detail'),
   
    path('api/levinus-history/', LevinusHistoryListView.as_view(), name='levinus-history-list'),
    path('api/serge-history/', SergeHistoryListView.as_view(), name='serge-history-list'),
    
    # path for monthly and yearly goals percentage
    path('api/elvis-monthly-goal/<int:year>/', MonthlyGoalView.as_view(), name='monthly-goal'),
    path('api/levinus-monthly-goal/<int:year>/', LevinusMonthlyGoalView.as_view(), name='levinus-monthly-goal'),
    path('api/serge-monthly-goal/<int:year>/', SergeMonthlyGoalView.as_view(), name='serge-monthly-goal'),

    # Add other paths as needed...
    
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/token-auth/', CustomAuthToken.as_view(), name='token_auth'),
    
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/logout/', LogoutView.as_view(), name='logout'),
    path('api/forgot-password/', ForgotPasswordView.as_view(), name='forgot_password'),
]