from django.urls import path
from core.views import category_list_view, category_product_list__view, index, product_list_view, product_detail_view, prado1_elvis_view
from .views import *
from . import views
# from django.contrib.auth.views import LoginView


app_name ='core'

urlpatterns = [
  path("", index, name="index"),
  path("about/", about, name="about"),
  path("products/", product_list_view, name="product-list"),
  path("product/<pid>/", product_detail_view, name="product-detail"),

  # category
  path("category/", category_list_view, name="category-list"),
  path("category/<cid>/", category_product_list__view, name="category-product-list"),

  # vendors
  # path("vendors/", vendor_list_view, name="vendor-list"),

  #car category page to view tabular car transcations 
  path("prado-1-elvis", prado1_elvis_view, name="prado-1-elvis"),
  path("prado-2-levinus", prado2_levinus_view, name="prado-2-levinus"),
  path("rav4-serge-view", rav4_serge_view, name="rav4-serge-view"),

  # link to add car details for each table
  path("add_elvissection_view", views.add_elvissection_view, name="add_elvissection_view"),
  path("add_levinussection_view", views.add_levinussection_view, name="add_levinussection_view"),
  path("add_sergesection_view", views.add_sergesection_view, name="add_sergesection_view"),


  # link for edit button
  path("edit_elvissection/<int:pk>/", views.edit_elvissection, name="edit_elvissection"),
  path("edit_levinussection/<int:pk>/", views.edit_levinussection, name="edit_levinussection"),
  path("edit_sergesection/<int:pk>/", views.edit_sergesection, name="edit_sergesection"),

 
  #add history view of sheets
  path("prado1_elvis_history_view", views.prado1_elvis_history_view, name='prado1_elvis_history_view'),
  path("prado2_levinus_history_view", views.prado2_levinus_history_view, name='prado2_levinus_history_view'),
  path("rav4_serge_history_view", views.rav4_serge_history_view, name='rav4_serge_history_view'),


  #link for monthly and yearly goals achieved
  path("prado1_elvis_yearly_goal_view/<int:year>/", views.prado1_elvis_yearly_goal_view, name='prado1_elvis_yearly_goal_view'),
  path("prado2_levinus_yearly_goal_view/<int:year>/", views.prado2_levinus_yearly_goal_view, name='prado2_levinus_yearly_goal_view'),
  path("rav4_serge_yearly_goal_view/<int:year>/", views.rav4_serge_yearly_goal_view, name='rav4_serge_yearly_goal_view'),

  #path to login and register auth
  path('login/', views.loginview, name='login' ),
  path('register', views.registerview, name='register'),
  path('logout/', views.logoutview, name='logout'),

  #path to reset and forgot password
  path('forgot_password/', views.forgotpasswordview, name='forgot_password'),
  path('password-reset-sentview/<str:reset_id>/', views.passwordresetsentview, name='password-reset-sentview'),
  path('reset-password/<str:reset_id>/', views.resetpassword, name='reset-password'),

  #restrict views only to those who have logged in 
  # path('login/', LoginView.as_view(), name='login'),

]
