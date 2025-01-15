from decimal import Decimal
from django.db import models
from django.db.models import Sum
from shortuuid.django_fields import ShortUUIDField 
from django.utils.html import mark_safe
from authuser.models import User
from django.utils import timezone
from simple_history.models import HistoricalRecords 
from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.core.serializers.json import DjangoJSONEncoder
import json
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType

# Create your models here.

STATUS_CHOICE = (
  ("process", "Processing"),
  ("reserved", "Reserved"),
  ("delivered", "Delivered"),
)

STATUS = (
  ("draft", "Draft"),
  ("disabled", "Disabled"),
  ("rejected", "Rejected"),
  ("in_review", "In Review"),
  ("published", "Published"),
)

RATING = (
  (1, "⭐☆☆☆☆"),
  (2, "⭐⭐☆☆☆"),
  (3, "⭐⭐⭐☆☆"),
  (4, "⭐⭐⭐⭐☆"),
  (5, "⭐⭐⭐⭐⭐"),
)

def user_directory_path(instance, filename):
    return 'user_{0}/{1}'.format(instance.user.id,filename)

class Category(models.Model):
  cid = ShortUUIDField(unique=True, length=10, max_length=30, prefix="cat", alphabet="abcdefgh12345")
  title = models.CharField(max_length=100, default="Bolo cars for Rents")
  image = models.ImageField(upload_to="category", default="category.jpg")


  class Meta:
    verbose_name_plural = "Categories"

  def category_image(self):
    return mark_safe('<img src="%s" width="50" height="50" />' % (self.image.url))
  
  def __str__(self):
    return self.title
  

class Tags(models.Model):
  pass
  

class Vendor(models.Model):
  vid = ShortUUIDField(unique=True, length=10, max_length=30, prefix="ven", alphabet="abcdefgh12345")

  title = models.CharField(max_length=100, default="Cars Avaliable" )
  image = models.ImageField(upload_to=user_directory_path, default="cars.jpg")
  description = models.TextField(null=True, blank=True, default="Beautify cars avaliable")


  address = models.CharField(max_length=100, default="1280 Rue de Deido-Bonanjo, after Total Bonateki, before Carrefour Bonabassem, Douala.")
  contact = models.CharField(max_length=100, default="+237 652921000 / +237 693339340")
  chat_resp_time = models.CharField(max_length=100, default="100")
  delivery_on_time = models.CharField(max_length=100, default="100")
  # where you see delivery_on_time is shipping_on_time
  authentic_rating= models.CharField(max_length=100, default="100")
  days_return = models.CharField(max_length=100, default="100")
  warranty_period = models.CharField(max_length=100, default="100")



  user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)


  class Meta:
    verbose_name_plural = "Vendors"

  def vendor_image(self):
    return mark_safe('<img src="%s" width="50" height="50" />' % (self.image.url))
  
  def __str__(self):
    return self.title


class Product(models.Model):
  pid = ShortUUIDField(unique=True, length=10, max_length=20, alphabet="abcdefgh12345")

  user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
  category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name="category")

  title = models.CharField(max_length=100)
  image = models.ImageField(upload_to=user_directory_path, default="product.jpg")
  description = models.TextField(null=True, blank=True,default="Bolo car for rents acaliable")

  price = models.DecimalField(blank=True, null=True, max_digits=10,  decimal_places=2, default=0.00)
  old_price = models.DecimalField(blank=True, null=True, max_digits=10, decimal_places=2, default=0.00)

  specifications = models.TextField(null=True, blank=True)

  product_status = models.CharField(choices=STATUS, max_length=10, default="in_review")

  status = models.BooleanField(default=True)
  in_stock = models.BooleanField(default=True)
  featured = models.BooleanField(default=False)
  digital = models.BooleanField(default=False)

  sku =  ShortUUIDField(unique=True, length=4, max_length=10, prefix="sku", alphabet="1234567890")

  date = models.DateTimeField(auto_now_add=True)
  updated = models.DateTimeField(null=True, blank=True)

  class Meta:
    verbose_name_plural = "Products"

  def product_image(self):
    return mark_safe('<img src="%s" width="50" height="50" />' % (self.image.url))
  
  def __str__(self):
    return self.title
  

  def get_percentage(self):
    new_price = (self.price / self.old_price) * 100
    return new_price
  

class ProductImages(models.Model):
  images = models.ImageField(upload_to="product-image", default="product.jpg")
  product = models.ForeignKey(Product, related_name="p_images", on_delete=models.SET_NULL, null=True)
  date = models.DateTimeField(auto_now_add=True)


  class Meta:
    verbose_name_plural = "Product Images"



########## cart, order, orderItems and address
 
class CartOrder(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  price = models.DecimalField(blank=True, null=True, max_digits=10,  decimal_places=2, default=0.00)
  paid_status = models.BooleanField(default=False)
  order_date = models.DateTimeField(auto_now_add=True)
  product_status = models.CharField(choices=STATUS_CHOICE, max_length=30, default="processing")



  class Meta:
    verbose_name_plural ="Cart Order"

class CartOrderItems(models.Model):
  order = models.ForeignKey(CartOrder, on_delete=models.CASCADE)
  invoice_no = models.CharField(max_length=200)
  product_status = models.CharField(max_length=200)
  item = models.CharField(max_length=200)
  image = models.CharField(max_length=200)
  qty = models.IntegerField(default= 0)
  price = models.DecimalField(blank=True, null=True, max_digits=10,  decimal_places=2, default=0.00)
  total = models.DecimalField(blank=True, null=True, max_digits=10,  decimal_places=2, default=0.00)


class Meta:
  verbose_name_plural = "Cart Order Items"

  def order_img(self):
    return mark_safe('<img src="/media/%s" width="50" height="50" />' % (self.image))
  


# ######## pproducts, reviews, wishlists, address #######
# ######## pproducts, reviews, wishlists, address #######


class ProductReview(models.Model):
  user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
  product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
  review = models.TextField()
  rating = models.IntegerField(choices=RATING, default=None)
  date = models.DateTimeField(auto_now_add=True)


  class Meta:
    verbose_name_plural = "Product Review"

  def __str__(self):
    return self.product.title
  
  def get_rating(self):
    return self.ratting



class Wishlist(models.Model):
  user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
  product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
  date = models.DateTimeField(auto_now_add=True)


  class Meta:
    verbose_name_plural = "Wishlists"

  def __str__(self):
    return self.product.title
  

class Address(models.Model):
  user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
  address = models.CharField(max_length=100, null=True)
  status = models.BooleanField(default=False)

  class Meta:
    verbose_name_plural = "Address"


class CarsType(models.Model):
  id = models.BigAutoField(primary_key=True)
  date_time = models.DateTimeField(default=timezone.now)
  destination = models.CharField(max_length=100, blank=False)
  rental_rate_amount = models.DecimalField(blank=True, null=True, max_digits=10, decimal_places=2, default=Decimal('0.00'))
  expenses = models.DecimalField(blank=True, null=True, max_digits=10, decimal_places=2, default=Decimal('0.00'))
  expense_tag = models.CharField(max_length=100, blank=False)
  management_fee_accruals = models.DecimalField(blank=True, null=True, max_digits=10, decimal_places=2, default=Decimal('0.00'))
  driver_income = models.DecimalField(blank=True, null=True, max_digits=10, decimal_places=2, default=Decimal('0.00'))
  net_income = models.DecimalField(blank=True, null=True, max_digits=10, decimal_places=2, default=Decimal('0.00'))
  transaction = models.DecimalField(blank=True, null=True, max_digits=10, decimal_places=2, default=Decimal('0.00'))
  number_of_rental_days = models.IntegerField(blank=False, default=1)
  total_amount_due = models.DecimalField(blank=True, null=True, max_digits=10, decimal_places=2, default=Decimal('0.00'))
  paid_amount = models.DecimalField(blank=True, null=True, max_digits=10, decimal_places=2, default=Decimal('0.00'))
  balance_amount_due = models.DecimalField(blank=True, null=True, max_digits=10, decimal_places=2, default=Decimal('0.00'))

  comments = models.CharField(max_length=100, blank=False, default="leave message")

  # temp_field = models.CharField(max_length=100, null=True, blank=True)

  
  #functionality to sum  total amount on each fields 
  @classmethod
  def get_total_sums(cls, field_names):
    total_sums = {}
    for field_name in field_names:
      total_sum = cls.objects.aggregate(**{f"{field_name}_sum": Sum(field_name)})[f"{field_name}_sum"]
      total_sums[field_name] = total_sum or Decimal('0.00')
    return total_sums
  
  def save(self, *args, **kwargs):
    # Ensure expenses is a Decimal
    self.expenses = self.expenses or Decimal('0.00')
    self.rental_rate_amount = self.rental_rate_amount or Decimal('0.00')

    # Calculate management fee accruals
    self.management_fee_accruals = self.rental_rate_amount * Decimal('0.10')

    # Calculate net income
    self.net_income = self.rental_rate_amount - self.management_fee_accruals - (self.driver_income or Decimal('0.00'))

    # Transaction calculation
    self.transaction = self.rental_rate_amount - self.expenses

    # Total amount due
    self.total_amount_due = self.rental_rate_amount * self.number_of_rental_days

    # Balance amount due calculation
    self.balance_amount_due = self.total_amount_due - (self.paid_amount or Decimal('0.00'))

    super(CarsType, self).save(*args, **kwargs)

  def make_payments(self, payment_amount):
    if self.balance_amount_due <=0:
      return "Payment has already been completed. No further payments can be made."
    
    if self.paid_amount is None:
      self.paid_amount = Decimal('0.00')

      # code if payment exceeds balance due
    if self.paid_amount > self.balance_amount_due:
      return "Payment exceeds the balance amount due. pleadse enter a valid amount."
    
    # record payments
    payment = payment.objects.create(car_rental=self, amount=payment_amount)
 
    # update payment amount
    self.paid_amount += Decimal(payment_amount)

    # calculate balance again after payment
    self.balance_amount_due = self.total_amount_due - self.paid_amount

    # check of payment completes the total amount due
    if self.paid_amount >= self.total_amount_due:
      self.balance_amount_due = Decimal('0.00')
      self.save()
      return "Payment has been completed !"
    
    self.save()
    return f"Payment of {payment_amount} accepted. Amount due: {self.balance_amount_due}."

  # method calculates sum of rental rate for each month and percentage achieved
  @classmethod
  def monthly_goal_percentage(cls, year, month, goal=1000000):
    total_rental_rate = cls.objects.filter(
      date_time__year = year,
      date_time__month = month
    ).aggregate(total=Sum('rental_rate_amount'))['total'] or Decimal('0.00')
    
    percentage = (total_rental_rate / Decimal(goal)) * Decimal('100') if total_rental_rate > 0 else Decimal('0.00')

    return {
      'total_rental_rate': total_rental_rate,
      'percentage_of_goal': percentage
    }
    
  class Meta:
    abstract = True
    verbose_name = "Cars Type"
    verbose_name_plural = "Cars Types"
    
  def __str__(self):
    return f"{self.destination } - {self.date_time}"
  
# Inherit from CarsType and add history tracking
 
class ElvisSection(CarsType):
  
  class Meta:
    verbose_name = "Elvis Section"
    verbose_name_plural = "Elvis Sections"

class LevinusSection(CarsType):
  
  class Meta:
    verbose_name = "Levinus Section"
    verbose_name_plural = "Levinus Sections"

class SergeSection(CarsType):
  
  class Meta:
    verbose_name = "Serge Section"
    verbose_name_plural = "Serge Sections"


# model to store previous and current data

class EditHistory(models.Model):
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    section = GenericForeignKey('content_type', 'object_id')
    
    previous_data = models.JSONField()  # Store previous data as JSON
    current_data = models.JSONField()   # Store current data as JSON
    edited_at = models.DateTimeField(default=timezone.now)  # Timestamp of when edited

    def __str__(self):
        return f"Edit history for {self.section} at {self.edited_at}"

@receiver(pre_save, sender=ElvisSection)
@receiver(pre_save, sender=LevinusSection)
@receiver(pre_save, sender=SergeSection)
def track_history(sender, instance, **kwargs):
    if instance.pk:  # Check if it's an update (not a new instance)
        previous_instance = sender.objects.get(pk=instance.pk)
        
        # Create an EditHistory record
        EditHistory.objects.create(
            content_type=ContentType.objects.get_for_model(instance),
            object_id=instance.pk,
            previous_data=json.dumps({
                'destination': previous_instance.destination,
                'rental_rate_amount': previous_instance.rental_rate_amount,
                'expenses': previous_instance.expenses,
                'expense_tag': previous_instance.expense_tag,
                'management_fee_accruals': previous_instance.management_fee_accruals,
                'driver_income': previous_instance.driver_income,
                'net_income': previous_instance.net_income,
                'transaction': previous_instance.transaction,
                'comments': previous_instance.comments,
                'date_time': previous_instance.date_time,

                'number_of_rental_days': previous_instance.number_of_rental_days,
                'total_amount_due': previous_instance.total_amount_due,
                'paid_amount': previous_instance.paid_amount,
                'balance_amount_due':previous_instance.balance_amount_due,

            }, cls=DjangoJSONEncoder),
            current_data=json.dumps({
                'destination': instance.destination,
                'rental_rate_amount': instance.rental_rate_amount,
                'expenses': instance.expenses,
                'expense_tag': instance.expense_tag,
                'management_fee_accruals': instance.management_fee_accruals,
                'driver_income': instance.driver_income,
                'net_income': instance.net_income,
                'transaction': instance.transaction,
                'comments': instance.comments,
                'date_time': instance.date_time,

                'number_of_rental_days': instance.number_of_rental_days,
                'total_amount_due': instance.total_amount_due,
                'paid_amount': instance.paid_amount,
                'balance_amount_due':instance.balance_amount_due,

            }, cls=DjangoJSONEncoder),
        )

class Contact(models.Model):
  name=models.CharField(max_length=200)
  email=models.EmailField()
  subject=models.TextField()
  def __str__(self):
    return self.name
  