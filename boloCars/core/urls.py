from django.urls import path
from core.views import category_list_view, category_product_list__view, index, product_list_view, product_detail_view, prado1_elvis_view
from .views import *
from . import views


app_name ='core'

urlpatterns = [
  path("", index, name="index"),
  path("products/", product_list_view, name="product-list"),
  path("product/<pid>/", product_detail_view, name="product-detail"),

  # category
  path("category/", category_list_view, name="category-list"),
  path("category/<cid>/", category_product_list__view, name="category-product-list"),

  # vendors
  # path("vendors/", vendor_list_view, name="vendor-list"),

  #car category page
  path("prado-1-elvis", prado1_elvis_view, name="prado-1-elvis"),

  path("prado-2-levinus", prado2_levinus_view, name="prado-2-levinus"),

  # link for add car details for each table
  path("add_elvissection_view", views.add_elvissection_view, name="add_elvissection_view"),
    
  path("add_levinussection_view", views.add_levinussection_view, name="add_levinussection_view"),

  # link for edit button
  path("edit_elvissection/<int:pk>/", views.edit_elvissection, name="edit_elvissection"),
  path("edit_levinussection", views.edit_levinussection, name="edit_levinussection"),

  #add history view of sheets
  path("prado1_elvis_history_view", views.prado1_elvis_history_view, name='prado1_elvis_history_view')


 
]
