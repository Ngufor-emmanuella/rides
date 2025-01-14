from django.http import HttpResponse
from django.shortcuts import render, redirect, get_object_or_404
from core.models import Product, ElvisSection, Contact, EditHistory
from .forms import *
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.conf import settings
from django.core.mail import EmailMessage
from django.urls import reverse
from authuser.models import PasswordReset
from .serializers import CategorySerializer, VendorSerializer, ProductSerializer, CartOrderSerializer, ProductReviewSerializer, WishlistSerializer, ContactSerializer, EditHistorySerializer
from rest_framework.decorators import api_view
from rest_framework import viewsets
from rest_framework.response import Response
from .serializers import ElvisSectionSerializer, UserRegistrationSerializer, LevinusSectionSerializer, SergeSectionSerializer, LoginSerializer, MonthlyGoalSerializer
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from rest_framework.permissions import AllowAny
from rest_framework import serializers
from rest_framework.generics import ListCreateAPIView
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework import generics
from .serializers import ElvisSectionSerializer
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator



User = get_user_model()

# Create your views here.
def index(request):
  # cars = Product.objects.all().order_by("-id")
  cars = Product.objects.filter(product_status="published", featured=True)

  context = {
    "Products" : cars
  }

  return render(request, 'core/index.html', context)



#code below to create acccount and user authentication

class RegisterView(ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'user': UserRegistrationSerializer(user).data,
                'token': token.key
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email
        })

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            user = authenticate(request, email=email, password=password)
           
            if user is not None:
                login(request, user)
                return Response({"message": "Login successful"}, status=status.HTTP_200_OK)
            return Response({"error": "Invalid login credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response({"message": "Successfully logged out"}, status=status.HTTP_200_OK)


class ForgotPasswordView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        # Implement your forgot password logic here
        return Response({"message": "Reset link sent to your email"}, status=200)
    
#functionality to calculate total sum of fields

# @login_required
#
# functionality to display all added data in tables
class Prado1ElvisView(viewsets.ModelViewSet):
    permission_classes = [AllowAny]

    queryset = ElvisSection.objects.all()
    serializer_class = ElvisSectionSerializer

    def perform_create(self, serializer):
        validated_data = serializer.validated_data
        amounts = serializer.calculate_amounts(validated_data)
        serializer.save(**amounts)  # Include calculated fields
 
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        print(f"Queryset count: {queryset.count()}")

        for obj in queryset:
            print(f"Object ID: {obj.id}")

        serializer = self.get_serializer(queryset, many=True)


        field_names = ['destination', 'rental_rate_amount', 'expenses', 'expense_tag', 'management_fee_accruals', 'driver_income', 'net_income', 'transaction', 'comments',
                        'number_of_rental_days', 'total_amount_due',
                        'paid_amount', 'balance_amount_due']

        # Calculate total sums for each field listed above
        total_sums = {}
        for field_name in field_names:
            total_sum = queryset.aggregate(Sum(field_name))[f'{field_name}__sum']
            total_sums[field_name] = total_sum or Decimal('0.00')

        return Response({
            'elvissections': serializer.data,
            'header': 'Prado1-Elvis',
            'total_sums': total_sums,
        })

class Prado2LevinusView(viewsets.ModelViewSet):
    queryset = LevinusSection.objects.all()
    serializer_class = LevinusSectionSerializer

    
    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        
        field_names = ['destination', 'rental_rate_amount', 'expenses', 'expense_tag', 'management_fee_accruals', 'driver_income', 'net_income', 'transaction', 'comments']

        # Calculate total sums for each field listed above
        total_sums = {}
        for field_name in field_names:
            total_sum = self.queryset.aggregate(**{f"{field_name}_sum": Sum(field_name)})[f"{field_name}_sum"]
            total_sums[field_name] = total_sum or Decimal('0.00')

        return Response({
            'levinussections': response.data,
            'header': 'Prado2-Levinus',
            'total_sums': total_sums,
        })

      
class Rav4SergeView(viewsets.ModelViewSet):
  queryset = SergeSection.objects.all()
  serializer_class = SergeSectionSerializer
  
  def list(self, request, *args, **kwargs):
    response = super().list(request, *args, **kwargs)
    field_names = ['destination', 'rental_rate_amount', 'expenses','expenses_tag',  'management_fee_accruals', 'driver_income', 'net_income', 'transaction', 'comments']
    
      # Calculate total sums for each field listed above
    total_sums = {}
    for field_name in field_names:
      total_sum = self.queryset.aggregate(**{f"{field_name}_sum": Sum(field_name)})[f"{field_name}_sum"]
      total_sums[field_name] = total_sum or Decimal('0.00')
      
      return Response({
         'sergesections': response.data,
         'header': 'Rav4-Serge',
         'total_sums': total_sums,
        })
    

    # functionality to add data to the models table

class ElvisSectionViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = ElvisSection.objects.all()
    serializer_class = ElvisSectionSerializer

    def perform_create(self, serializer):
        serializer.save()

class ElvisSectionCreateView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = ElvisSectionSerializer(data=request.data)
        if serializer.is_valid():
            instance = serializer.save()
            return Response(ElvisSectionSerializer(instance).data, status=status.HTTP_201_CREATED)
        
        else:
            print(serializer.errors)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class LevinusSectionCreateView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LevinusSectionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SergeSectionCreateView(APIView):
    def post(self, request):
        serializer = SergeSectionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# functionality to calculate balance amount due etc
    # functionality to edit views
class ElvisSectionUpdateView(generics.RetrieveUpdateAPIView):
    queryset = ElvisSection.objects.all()
    serializer_class = ElvisSectionSerializer
    permission_classes = [AllowAny]


class LevinusSectionUpdateView(generics.RetrieveUpdateAPIView):
    queryset = LevinusSection.objects.all()
    serializer_class = LevinusSectionSerializer
    permission_classes = [AllowAny]

class SergeSectionUpdateView(generics.RetrieveUpdateAPIView):
    queryset = SergeSection.objects.all()
    serializer_class = SergeSectionSerializer
    permission_classes = [AllowAny]


# functionality for history view
class EditHistoryListView(generics.ListAPIView):
    queryset = EditHistory.objects.all()
    serializer_class = EditHistorySerializer

class EditHistoryDetailView(generics.RetrieveAPIView):
    queryset = EditHistory.objects.all()
    serializer_class = EditHistorySerializer

class LevinusHistoryListView(generics.ListAPIView):
    queryset = EditHistory.objects.filter(content_type=ContentType.objects.get_for_model(LevinusSection))
    serializer_class = EditHistorySerializer

class SergeHistoryListView(generics.ListAPIView):
    queryset = EditHistory.objects.filter(content_type=ContentType.objects.get_for_model(SergeSection))
    serializer_class = EditHistorySerializer


# view for monthly and yearly goals percentage
class MonthlyGoalView(APIView):
    def get(self, request, year=None):
        if year is None:
            year = timezone.now().year

        elvis_yearly_goal = []
        total_yearly_rental = Decimal('0.00')

        # List of month names
        month_names = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ]

        try:
            for month in range(1, 13):
                result = ElvisSection.monthly_goal_percentage(year=year, month=month)
                total_yearly_rental += result['total_rental_rate']

                monthly_goal_data = {
                    'month_number': month,
                    'month_name': month_names[month - 1],
                    'total_rental_rate': result['total_rental_rate'],
                    'percentage_of_goal': result['percentage_of_goal'],
                }
                
                elvis_yearly_goal.append(monthly_goal_data)

            yearly_percentage = (total_yearly_rental / Decimal('1000000')) * Decimal('100')

            response_data = {
                'year': year,
                'elvis_yearly_goal': elvis_yearly_goal,
                'total_yearly_rental': total_yearly_rental,
                'yearly_percentage': yearly_percentage,
            }

            return Response(response_data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': 'An error occurred. Please try again.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class LevinusMonthlyGoalView(APIView):
    def get(self, request, year=None):
        if year is None:
            year = timezone.now().year

        levinus_yearly_goal = []
        total_yearly_rental = Decimal('0.00')

        month_names = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ]

        try:
            for month in range(1, 13):
                result = LevinusSection.monthly_goal_percentage(year=year, month=month)  # Implement this method in your model
                total_yearly_rental += result['total_rental_rate']

                monthly_goal_data = {
                    'month_number': month,
                    'month_name': month_names[month - 1],
                    'total_rental_rate': result['total_rental_rate'],
                    'percentage_of_goal': result['percentage_of_goal'],
                }
                
                levinus_yearly_goal.append(monthly_goal_data)

            yearly_percentage = (total_yearly_rental / Decimal('1000000')) * Decimal('100')

            response_data = {
                'year': year,
                'levinus_yearly_goal': levinus_yearly_goal,
                'total_yearly_rental': total_yearly_rental,
                'yearly_percentage': yearly_percentage,
            }

            return Response(response_data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': 'An error occurred. Please try again.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class SergeMonthlyGoalView(APIView):
    def get(self, request, year=None):
        if year is None:
            year = timezone.now().year

        serge_yearly_goal = []
        total_yearly_rental = Decimal('0.00')

        month_names = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ]

        try:
            for month in range(1, 13):
                result = SergeSection.monthly_goal_percentage(year=year, month=month)  # Implement this method in your model
                total_yearly_rental += result['total_rental_rate']

                monthly_goal_data = {
                    'month_number': month,
                    'month_name': month_names[month - 1],
                    'total_rental_rate': result['total_rental_rate'],
                    'percentage_of_goal': result['percentage_of_goal'],
                }
                
                serge_yearly_goal.append(monthly_goal_data)

            yearly_percentage = (total_yearly_rental / Decimal('1000000')) * Decimal('100')

            response_data = {
                'year': year,
                'serge_yearly_goal': serge_yearly_goal,
                'total_yearly_rental': total_yearly_rental,
                'yearly_percentage': yearly_percentage,
            }

            return Response(response_data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': 'An error occurred. Please try again.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# contact view

def contact(request):
    if request.method == "POST":
        contact = Contact()
        name = request.POST.get('name')
        email = request.POST.get('email')
        subject = request.POST.get('subject')

        contact.name = name
        contact.email = email
        contact.subject = subject
        contact.save()
        
        return Response("<h2>Thanks for contacting us. Our team will get in touch with you shortly!</h2>")
    
    return render(request, 'core/contact.html')

@api_view()
def testing_api(request):
   return Response('Correct emma')
   
         




  


      

