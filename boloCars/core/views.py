from django.http import HttpResponse
from django.shortcuts import render, redirect, get_object_or_404
from core.models import Product, ElvisSection, Contact
from .forms import *
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.conf import settings
from django.core.mail import EmailMessage
from django.urls import reverse
from authuser.models import PasswordReset
from .serializers import CategorySerializer, VendorSerializer, ProductSerializer, CartOrderSerializer, ProductReviewSerializer, WishlistSerializer, ContactSerializer
from rest_framework.decorators import api_view
from rest_framework import viewsets
from rest_framework.response import Response
from .serializers import ElvisSectionSerializer, UserRegistrationSerializer, LevinusSectionSerializer, SergeSectionSerializer, LoginSerializer
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

class Prado1ElvisView(viewsets.ModelViewSet):
    queryset = ElvisSection.objects.all()
    serializer_class = ElvisSectionSerializer

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)

        field_names = ['destination', 'rental_rate_amount', 'expenses', 'expense_tag', 'management_fee_accruals', 'driver_income', 'net_income', 'transaction', 'comments']

        # Calculate total sums for each field listed above
        total_sums = {}
        for field_name in field_names:
            total_sum = self.queryset.aggregate(**{f"{field_name}_sum": Sum(field_name)})[f"{field_name}_sum"]
            total_sums[field_name] = total_sum or Decimal('0.00')

        return Response({
            'elvissections': response.data,
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
    
    # functionality to add data to thne models table

class ElvisSectionCreateView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = ElvisSectionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LevinusSectionCreateView(APIView):
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





    # functionality to edit views
class ElvisSectionUpdateView(generics.RetrieveUpdateAPIView):
    queryset = ElvisSection.objects.all()
    serializer_class = ElvisSectionSerializer
    permission_classes = [AllowAny]


class LevinusSectionUpdateView(generics.UpdateAPIView):
    queryset = LevinusSection.objects.all()
    serializer_class = LevinusSectionSerializer

class SergeSectionUpdateView(generics.UpdateAPIView):
    queryset = SergeSection.objects.all()
    serializer_class = SergeSectionSerializer



# history view
# class ElvisSectionHistoryAPIView(generics.ListAPIView):
#     serializer_class = ElvisSectionHistorySerializer
#     permission_classes = [AllowAny]

#     def get_queryset(self):
#         return ElvisSection.objects.all()
    
#     def list(self, request, *args, **kwargs):
#         queryset = self.get_queryset()
#         serializer = self.get_serializer(queryset, many=True)
#         return Response(serializer.data)
      


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
   
         




  


      

