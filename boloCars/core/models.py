from decimal import Decimal
from django.db import models
from django.db.models import Sum
from shortuuid.django_fields import ShortUUIDField 
from django.utils.html import mark_safe
from authuser.models import User
from django.utils import timezone
from simple_history.models import HistoricalRecords 

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
  date_time = models.DateTimeField(default=timezone.now)
  destination = models.CharField(max_length=100, blank=False)
  rental_rate_amount = models.DecimalField(blank=True, null=True, max_digits=10,  decimal_places=2, default=0.00)
  expenses = models.DecimalField(blank=True, null=True, max_digits=10,  decimal_places=2, default=0.00)
  expense_tag = models.CharField(max_length=100, blank=False)
  management_fee_accruals = models.DecimalField(blank=True, null=True, max_digits=10,  decimal_places=2, default=0.00)
  driver_income = models.DecimalField(blank=True, null=True, max_digits=10,  decimal_places=2, default=0.00)
  net_income = models.DecimalField(blank=True, null=True, max_digits=10,  decimal_places=2, default=0.00)
  transaction = models.DecimalField(blank=True, null=True, max_digits=10,  decimal_places=2, default=0.00)
  comments = models.CharField(max_length=100, blank=False, default="leave message")

  #functionality to sum  total amount on each fields 
  @classmethod
  def get_total_sums(cls, field_names):
    total_sums = {}
    for field_name in field_names:
      total_sum = cls.objects.aggregate(**{f"{field_name}_sum": Sum(field_name)})[f"{field_name}_sum"]
      total_sums[field_name] = total_sum or Decimal('0.00')
    return total_sums

  def save(self, *args, **kwargs):
    if self.rental_rate_amount is not None:
      if isinstance(self.rental_rate_amount, Decimal):
        #calculate 10% of rental_rate_amount
        self.management_fee_accruals = self.rental_rate_amount * Decimal('0.10')
      else:
        #handles the case where rental_rate is not a decimal eg converts to decimal
        self.management_fee_accruals = Decimal(str(self.rental_rate_amount)) * Decimal('0.10')
    
    # to perform substraction operation from fields
    if self.rental_rate_amount is not None and self.management_fee_accruals is not None and self.driver_income:
      result = self.rental_rate_amount - self.management_fee_accruals - self.driver_income
      self.net_income = Decimal(result)
    
    # calculation for transaction
    if self.rental_rate_amount is not None and self.expenses is not None:
      result = self.rental_rate_amount - self.expenses
      self.transaction = Decimal(result)
      
      super(CarsType, self).save(*args, **kwargs)

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

  history = HistoricalRecords()

  class Meta:
    verbose_name = "Elvis Section"
    verbose_name_plural = "Elvis Sections"

class LevinusSection(CarsType):

  history = HistoricalRecords()
  
  class Meta:
    verbose_name = "Levinus Section"
    verbose_name_plural = "Levinus Sections"

class SergeSection(CarsType):

  history = HistoricalRecords() 
  
  class Meta:
    verbose_name = "Serge Section"
    verbose_name_plural = "Serge Sections"