from django.http import HttpResponse
from django.shortcuts import render, redirect, get_object_or_404
from core.models import Product, Category,  CartOrder, CartOrderItems, ProductImages, ProductReview, Wishlist, Address, ElvisSection, CarsType
from .forms import *
from django.contrib import messages
# importing for creating accounts
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.conf import settings
from django.core.mail import EmailMessage
from django.urls import reverse

# Create your views here.
def index(request):
  # cars = Product.objects.all().order_by("-id")
  cars = Product.objects.filter(product_status="published", featured=True)

  context = {
    "Products" : cars
  }

  return render(request, 'core/index.html', context)

#code below to create acccount and user authentication
def loginview(request):
  return render(request, 'core/login.html')

def registerview(request):
  return render(request, 'core/register.html')

#code to list different pages
def product_list_view(request):
  products = Product.objects.filter(product_status="published")

  context = {
    "products": products

  }

  return render(request, 'core/product-list.html', context)

def category_list_view(request):
  categories = Category.objects.all()

  context = {
    "categories": categories
  }
  return render(request, 'core/category_list.html', context)

def category_product_list__view(request, cid):
  category = Category.objects.get(cid=cid)
  products = Product.objects.filter(product_status="published", category=category)

  context = {
    "category": category,
    "products": products,
  }
  return render(request, "core/category-product-list.html", context)

# def vendor_list_view(request):
#   vendor = Vendor.objects.all()
  
#   context = {
#      "vendor": vendor,
#   }
#   return render(request, "core/vendor-list.html", context)
  
def product_detail_view(request, pid):
  product = Product.objects.get(pid=pid)

  p_image = product.p_images.all()

  context = {
    "p": product,
    # "p_image": p_image,
  }
  return render(request, "core/product-detail.html", context)

#functionality to calculate total sum of fields

def prado1_elvis_view(request):
  elvissection = ElvisSection.objects.all()

  field_names = ['rental_rate_amount', 'expenses', 'management_fee_accruals', 'driver_income', 'net_income', 'transaction' ]

 # Calculate total sums for each field listed above

  total_sums = {}
  for field_name in field_names:
    total_sum = elvissection.aggregate(**{f"{field_name}_sum": Sum(field_name)})[f"{field_name}_sum"]
    total_sums[field_name] = total_sum or Decimal('0.00')
  print(total_sums)

  context = {
    'elvissection' : elvissection,
    'header' : 'Prado1-Elvis',
    'total_sums': total_sums,

  }
  return render(request, "core/prado-1-elvis.html", context)


def prado1_elvis_history_view(request):
    # Fetch history for each ElvisSection instance
    elvissection = ElvisSection.objects.all()

    elvis_history = []
    for elvis in elvissection:
        history = elvis.history.all()  # Get all historical records for this instance
        elvis_history.append({
            'current': elvis,
            'history': history,
        })

    context = {
      'elvis_history': elvis_history, # Pass the history data to the template
      'header' : 'prado1_elvis_history'
    }
    return render(request, 'core/history-prado1.html', context)

def prado2_levinus_view(request):
  levinussection = LevinusSection.objects.all()
  field_names = ['rental_rate_amount', 'expenses', 'management_fee_accruals', 'driver_income', 'net_income', 'transaction' ]
  total_sums = {}
  for field_name in field_names:
    total_sum = levinussection.aggregate(**{f"{field_name}_sum": Sum(field_name)})[f"{field_name}_sum"]
    total_sums[field_name] = total_sum or Decimal('0.00')
  print(total_sums)

  context = {
    'levinussection' : levinussection,
    'header' : 'Prado2-Levinus',
    'total_sums': total_sums
  }
  return render(request, "core/prado-2-levinus.html", context)

def prado2_levinus_history_view(request):
    # Fetch history for each ElvisSection instancea
    levinussection = LevinusSection.objects.all()

    levinus_history = []
    for levinus in levinussection:
        history = levinus.history.all()  # Get all historical records for this instance
        levinus_history.append({
            'current': levinus,
            'history': history,
        })

    context = {
      'levinus_history':  levinus_history, # Pass the history data to the template
      'header' : 'prado2_levinus_history'
    }
    return render(request, 'core/history-prado2.html', context)

def rav4_serge_view(request):
  sergesection = SergeSection.objects.all()
  field_names = ['rental_rate_amount', 'expenses', 'management_fee_accruals', 'driver_income', 'net_income', 'transaction' ]
  total_sums = {}
  for field_name in field_names:
    total_sum = sergesection.aggregate(**{f"{field_name}_sum": Sum(field_name)})[f"{field_name}_sum"]
    total_sums[field_name] = total_sum or Decimal('0.00')
  print(total_sums)

  context = {
    'sergesection' : sergesection,
    'header' : 'Rav-4 Serge',
    'total_sums': total_sums
  }
  return render(request, "core/rav-4-serge.html", context)

def rav4_serge_history_view(request):
    # Fetch history for each ElvisSection instancea
    sergesection = SergeSection.objects.all()

    serge_history = []
    for serge in sergesection:
        history = serge.history.all()  # Get all historical records for this instance
        serge_history.append({
            'current': serge,
            'history': history,
        })

    context = {
      'serge_history':  serge_history, # Pass the history data to the template
      'header' : 'Rav4_serge_history'
    }
    return render(request, 'core/history-rav4.html', context)

 
# function to add cars details to the sheet for each column
def add_rentedcars_view(request, cls):
  if request.method == "POST":
    form = cls(request.POST)

    if form.is_valid():
      form.save()
      messages.success(request, 'Car details submitted successfully')
      return render(request, "core/index.html" ) 

  else:
    form = cls()
    return render(request, "core/add_new.html", {'form' : form } )
  
# function inheritance from above , view to add car data on each table
def add_elvissection_view(request):
  return add_rentedcars_view(request, ElvisSectionForm)
  
def add_levinussection_view(request):
  return add_rentedcars_view(request, LevinusSectionForm)

def add_sergesection_view(request):
  return add_rentedcars_view(request, SergeSectionForm)

# add edit button on each row 
def edit_rentedcars(request, pk, model, cls):
  item = get_object_or_404(model, pk=pk)

  if request.method == "POST":
    item.save()
    form = cls(request.POST, instance=item)

    if form.is_valid():
      form.save()
      return render(request, "core/index.html" ) 

  else:
    form = cls(instance=item)
    return render(request, "core/edit_item.html", {'form': form} )
  
# inheriting the above code...
def edit_elvissection(request, pk):
  return edit_rentedcars(request, pk, ElvisSection, ElvisSectionForm)

def edit_levinussection(request, pk):
  return edit_rentedcars(request, pk, LevinusSection, LevinusSectionForm)

def edit_sergesection(request, pk):
  return edit_rentedcars(request, pk, SergeSection, SergeSectionForm)


# views for monthly and yearly goals

def prado1_elvis_yearly_goal_view(request, year):
  elvis_yearly_goal = []

  for month in range(1, 13):
    result = ElvisSection.monthly_goal_percentage(year=year, month=month)

    elvis_yearly_goal.append({
      'month' : month,
      'total_rental_rate' : result['total_rental_rate'],
      'percentage_of_goal' : result['percentage_of_goal'],
    })

  context = {
    'year' : year,
    'elvis_yearly_goal' : elvis_yearly_goal,
    }
  
  return render(request, 'core/goal-prado1.html', context)


def prado2_levinus_yearly_goal_view(request, year):
  levinus_yearly_goal = []

  for month in range(1, 13):
    result = LevinusSection.monthly_goal_percentage(year=year, month=month)
    levinus_yearly_goal.append({
      'month' : month,
      'total_rental_rate' : result['total_rental_rate'],
      'percentage_of_goal' : result['percentage_of_goal'],
    })

  context = {
    'year' : year,
    'levinus_yearly_goal' : levinus_yearly_goal,
    }
  return render(request, 'core/goal-prado2.html', context)

def rav4_serge_yearly_goal_view(request, year):
  serge_yearly_goal = []

  for month in range(1, 13):
    result = SergeSection.monthly_goal_percentage(year=year, month=month)
    serge_yearly_goal.append({
      'month' : month,
      'total_rental_rate' : result['total_rental_rate'],
      'percentage_of_goal' : result['percentage_of_goal'],
    })
  context = {
    'year' : year,
    'serge_yearly_goal' : serge_yearly_goal,
  }
  return render(request, 'core/goal-rav4.html', context)




  


      

