from django.http import HttpResponse
from django.shortcuts import render, redirect, get_object_or_404
from core.models import Product, Category,  CartOrder, CartOrderItems, ProductImages, ProductReview, Wishlist, Address, ElvisSection
from .forms import *
# from django.urls import reverse

# Create your views here.
def index(request):
  # cars = Product.objects.all().order_by("-id")
  cars = Product.objects.filter(product_status="published", featured=True)

  context = {
    "Products" : cars
  }

  return render(request, 'core/index.html', context)

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


def prado1_elvis_view(request):
  elvissection = ElvisSection.objects.all()

  context = {
    'elvissection' : elvissection,
    'header' : 'Prado1-Elvis'
  }
  return render(request, "core/prado-1-elvis.html", context)

def prado2_levinus_view(request):
  levinussection = LevinusSection.objects.all()

  context = {
    'levinussection' : levinussection,
    'header' : 'Prado2-Levinus'
  }

  return render(request, "core/prado-2-levinus.html", context)
 
  


# function to add cars details to the sheet for each column
def add_rentedcars_view(request, cls):
  if request.method == "POST":
    form = cls(request.POST)

    if form.is_valid():
      form.save()
      return render(request, "core/index.html" ) 

  else:
    form = cls()
    return render(request, "core/add_new.html", {'form' : form } )
  
# function inheritance from above
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

