from rest_framework import serializers
from core.models import Category, Vendor, Product, ProductImages, CartOrder, CartOrderItems, ProductReview, Wishlist, Address, Contact, ElvisSection, LevinusSection, SergeSection 
from django.contrib.auth.models import User

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
    destination = serializers.CharField(required=False)  # Optional field
    rental_rate_amount = serializers.DecimalField(required=False, max_digits=10, decimal_places=2)  # Optional field
    expenses = serializers.DecimalField(required=False, max_digits=10, decimal_places=2)  # Optional field
    expense_tag = serializers.CharField(required=False)   # Optional field
    management_fee_accruals = serializers.DecimalField(required=False, max_digits=10, decimal_places=2)  # Optional field
    driver_income = serializers.DecimalField(required=False, max_digits=10, decimal_places=2)  # Optional field
    net_income = serializers.DecimalField(required=False, max_digits=10, decimal_places=2)  # Optional field
    transaction = serializers.CharField(required=False, allow_blank=True)  # Optional field
    comments = serializers.CharField(required=False, allow_blank=True)  # Optional field

    class Meta:
        model = ElvisSection
        fields = ['id', 'date_time', 'destination', 'rental_rate_amount', 
                  'expenses', 'expense_tag', 'management_fee_accruals', 
                  'driver_income', 'net_income', 'transaction', 'comments']

class LevinusSectionSerializer(serializers.ModelSerializer):

    destination = serializers.CharField(required=False)  # Optional field
    rental_rate_amount = serializers.DecimalField(required=False, max_digits=10, decimal_places=2)  # Optional field
    expenses = serializers.DecimalField(required=False, max_digits=10, decimal_places=2)  # Optional field
    expense_tag = serializers.CharField(required=False)   # Optional field
    management_fee_accruals = serializers.DecimalField(required=False, max_digits=10, decimal_places=2)  # Optional field
    driver_income = serializers.DecimalField(required=False, max_digits=10, decimal_places=2)  # Optional field
    net_income = serializers.DecimalField(required=False, max_digits=10, decimal_places=2)  # Optional field
    transaction = serializers.CharField(required=False, allow_blank=True)  # Optional field
    comments = serializers.CharField(required=False, allow_blank=True)  # Optional field

    class Meta:
        model = LevinusSection
        fields = ['id', 'date_time', 'destination', 'rental_rate_amount', 
                  'expenses', 'expense_tag', 'management_fee_accruals', 
                  'driver_income', 'net_income', 'transaction', 'comments']

class SergeSectionSerializer(serializers.ModelSerializer):
    destination = serializers.CharField(required=False)  # Optional field
    rental_rate_amount = serializers.DecimalField(required=False, max_digits=10, decimal_places=2)  # Optional field
    expenses = serializers.DecimalField(required=False, max_digits=10, decimal_places=2)  # Optional field
    expense_tag = serializers.CharField(required=False)   # Optional field
    management_fee_accruals = serializers.DecimalField(required=False, max_digits=10, decimal_places=2)  # Optional field
    driver_income = serializers.DecimalField(required=False, max_digits=10, decimal_places=2)  # Optional field
    net_income = serializers.DecimalField(required=False, max_digits=10, decimal_places=2)  # Optional field
    transaction = serializers.CharField(required=False, allow_blank=True)  # Optional field
    comments = serializers.CharField(required=False, allow_blank=True)  # Optional field

    class Meta:
        model = SergeSection
        fields = ['id', 'date_time', 'destination', 'rental_rate_amount', 
                  'expenses', 'expense_tag', 'management_fee_accruals', 
                  'driver_income', 'net_income', 'transaction', 'comments']



# class ElvisSectionHistorySerializer(serializers.ModelSerializer):
    previous_data = serializers.SerializerMethodField()
    current_data = serializers.SerializerMethodField()

    class Meta:
        model = ElvisSection
        fields = ('id', 'history_type', 'history_date', 'previous_data', 'current_data')

    def get_previous_data(self, obj):
        last_history = obj.history.order_by('-history_date').first()
        if last_history:
            changes = {}
            current_values = self.get_current_data(obj)
            for field in current_values.keys():
                if hasattr(last_history, field):
                    previous_value = getattr(last_history, field)
                    current_value = current_values[field]
                    if current_value != previous_value:
                        changes[field] = {
                            'previous': previous_value,
                            'current': current_value,
                        }
            return changes
        return {}

    def get_current_data(self, obj):
        return {
            'date_time': obj.date_time,
            'destination': obj.destination,
            'rental_rate_amount': obj.rental_rate_amount,
            'expenses': obj.expenses,
            'expense_tag': obj.expense_tag,
            'management_fee_accruals': obj.management_fee_accruals,
            'driver_income': obj.driver_income,
            'net_income': obj.net_income,
            'transaction': obj.transaction,
            'comments': obj.comments,
            'history_type': obj.history_type,
        }