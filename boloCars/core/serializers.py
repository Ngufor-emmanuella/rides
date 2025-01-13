from rest_framework import serializers
from core.models import Category, Vendor, Product, ProductImages, CartOrder, CartOrderItems, ProductReview, Wishlist, Address, Contact, ElvisSection, LevinusSection, SergeSection, EditHistory 
from django.contrib.auth.models import User
import json
from decimal import Decimal

class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['name', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(
            name=validated_data['name'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
      
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class VendorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class ProductImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImages
        fields = '__all__'

class CartOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartOrder
        fields = '__all__'

class CartOrderItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartOrderItems
        fields = '__all__'

class ProductReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductReview
        fields = '__all__'

class WishlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wishlist
        fields = '__all__'

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'


class ElvisSectionSerializer(serializers.ModelSerializer):
    destination = serializers.CharField(required=False) 
    rental_rate_amount = serializers.DecimalField(required=False, max_digits=10, decimal_places=2, default=Decimal('0.00'))
    expenses = serializers.DecimalField(required=False, max_digits=10, decimal_places=2, default=Decimal('0.00'))
    expense_tag = serializers.CharField(required=False)  
    management_fee_accruals = serializers.DecimalField(required=False, max_digits=10, decimal_places=2, default=Decimal('0.00'))
    driver_income = serializers.DecimalField(required=False, max_digits=10, decimal_places=2, default=Decimal('0.00'))
    net_income = serializers.DecimalField(required=False, max_digits=10, decimal_places=2, default=Decimal('0.00'))
    transaction = serializers.DecimalField(required=False, max_digits=10, decimal_places=2, default=Decimal('0.00'))
    comments = serializers.CharField(required=False, allow_blank=True)
    
    number_of_rental_days = serializers.IntegerField(required=False,  default=1)
    total_amount_due = serializers.DecimalField(required=False,  allow_null=True, read_only=True, max_digits=10, decimal_places=2, default=0.00)
    paid_amount = serializers.DecimalField(required=False, allow_null=True, max_digits=10, decimal_places=2, default=Decimal('0.00'))
    balance_amount_due = serializers.DecimalField(required=False, read_only=True, allow_null=True, max_digits=10, decimal_places=2, default=Decimal('0.00'))

    class Meta:
        model = ElvisSection
        fields = ['id', 'date_time', 'destination', 'rental_rate_amount', 
                  'expenses', 'expense_tag', 'management_fee_accruals', 
                  'driver_income', 'net_income', 'transaction', 'comments',
                  'number_of_rental_days', 'total_amount_due',
                  'paid_amount', 'balance_amount_due']
        
    def calculate_amounts(self, validated_data):
        rental_rate_amount = Decimal(validated_data.get('rental_rate_amount', 0))
        number_of_rental_days = validated_data.get('number_of_rental_days', 1)
        paid_amount = Decimal(validated_data.get('paid_amount', 0))

        total_amount_due = rental_rate_amount * Decimal(number_of_rental_days)
        balance_amount_due = total_amount_due - paid_amount

        return {
            'total_amount_due':  total_amount_due,
            'balance_amount_due':  balance_amount_due,
        }
    
    def create(self, validated_data):
        amounts = self.calculate_amounts(validated_data)
        validated_data.update(amounts) 
        return ElvisSection.objects.create(**validated_data)

    def validate_expenses(self, value):
        return Decimal(value) if value is not None else Decimal('0.00')
    
   

class LevinusSectionSerializer(serializers.ModelSerializer):

    destination = serializers.CharField(required=False) 
    rental_rate_amount = serializers.DecimalField(required=False, max_digits=10, decimal_places=2) 
    expenses = serializers.DecimalField(required=False, max_digits=10, decimal_places=2) 
    expense_tag = serializers.CharField(required=False)  
    management_fee_accruals = serializers.DecimalField(required=False, max_digits=10, decimal_places=2) 
    driver_income = serializers.DecimalField(required=False, max_digits=10, decimal_places=2) 
    net_income = serializers.DecimalField(required=False, max_digits=10, decimal_places=2) 
    transaction = serializers.CharField(required=False, allow_blank=True) 
    comments = serializers.CharField(required=False, allow_blank=True)

    number_of_rental_days = serializers.IntegerField(required=False,  default=1)
    total_amount_due = serializers.DecimalField(required=False,  allow_null=True, max_digits=10, decimal_places=2, default=0.00)
    paid_amount = serializers.DecimalField(required=False,  allow_null=True, max_digits=10, decimal_places=2, default=0.00)
    balance_amount_due = serializers.DecimalField(required=False,  allow_null=True, max_digits=10, decimal_places=2, default=0.00)


    class Meta:
        model = LevinusSection
        fields = ['id', 'date_time', 'destination', 'rental_rate_amount', 
                  'expenses', 'expense_tag', 'management_fee_accruals', 
                  'driver_income', 'net_income', 'transaction', 'comments'
                  'number_of_rental_days', 'total_amount_due',
                  'paid_amount', 'balance_amount_due']

class SergeSectionSerializer(serializers.ModelSerializer):
    destination = serializers.CharField(required=False) 
    rental_rate_amount = serializers.DecimalField(required=False, max_digits=10, decimal_places=2) 
    expenses = serializers.DecimalField(required=False, max_digits=10, decimal_places=2) 
    expense_tag = serializers.CharField(required=False)  
    management_fee_accruals = serializers.DecimalField(required=False, max_digits=10, decimal_places=2) 
    driver_income = serializers.DecimalField(required=False, max_digits=10, decimal_places=2) 
    net_income = serializers.DecimalField(required=False, max_digits=10, decimal_places=2) 
    transaction = serializers.CharField(required=False, allow_blank=True) 
    comments = serializers.CharField(required=False, allow_blank=True)

    number_of_rental_days = serializers.IntegerField(required=False,  default=1)
    total_amount_due = serializers.DecimalField(required=False,  allow_null=True, max_digits=10, decimal_places=2, default=0.00)
    paid_amount = serializers.DecimalField(required=False,  allow_null=True, max_digits=10, decimal_places=2, default=0.00)
    balance_amount_due = serializers.DecimalField(required=False,  allow_null=True, max_digits=10, decimal_places=2, default=0.00)


    class Meta:
        model = SergeSection
        fields = ['id', 'date_time', 'destination', 'rental_rate_amount', 
                  'expenses', 'expense_tag', 'management_fee_accruals', 
                  'driver_income', 'net_income', 'transaction', 'comments'
                  'number_of_rental_days', 'total_amount_due',
                  'paid_amount', 'balance_amount_due']

# history serializer
class EditHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = EditHistory
        fields = ['id', 'content_type', 'object_id', 'edited_at']

    def to_representation(self, instance):
        """Customize the representation of the instance."""
        representation = super().to_representation(instance)

        try:
            previous_data = json.loads(instance.previous_data)
            current_data = json.loads(instance.current_data)
        except (json.JSONDecodeError, TypeError):
            previous_data = {}
            current_data = {}

        # Mapping extracted data to representation
        field_mappings = {
            'destination': 'destination',
            'rental_rate_amount': 'rental_rate_amount',
            'expenses': 'expenses',
            'expense_tag': 'expense_tag',
            'management_fee_accruals': 'management_fee_accruals',
            'driver_income': 'driver_income',
            'net_income': 'net_income',
            'transaction': 'transaction',
            'comments': 'comments',
        }

        for field, key in field_mappings.items():
            representation[f'previous_{key}'] = previous_data.get(field, None)
            representation[f'current_{key}'] = current_data.get(field, None)

        return representation
    
# serializer code for monthly and yearly goals percentage
class MonthlyGoalSerializer(serializers.Serializer):
    month_number = serializers.IntegerField()
    month_name = serializers.CharField()
    total_rental_rate = serializers.DecimalField(max_digits=10, decimal_places=2)
    percentage_of_goal = serializers.DecimalField(max_digits=5, decimal_places=2)

