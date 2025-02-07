from django.contrib import admin
from core.models import Product, ProductImages, ElvisSection, LevinusSection, SergeSection, Contact

# Register your models here.

class ProductImagesAdmin(admin.TabularInline):
  model = ProductImages

class ProductAdmin(admin.ModelAdmin):
  inlines = [ProductImagesAdmin]
  list_display = ['user', 'title', 'product_image', 'price', 'category', 'featured', 'product_status', 'pid']


class BaseSectionAdmin(admin.ModelAdmin):
  list_display = ['id', 'date_time', 'destination', 'rental_rate_amount', 
                  'car_expense', 'expense_tag', 'management_fee_accruals', 
                  'driver_income', 'net_income', 'total_expenses', 'comments',
                  'number_of_rental_days', 'total_amount_due',
                  'paid_amount', 'balance_amount_due'
  ]

class ElvisSectionAdmin(BaseSectionAdmin):
  pass

class LevinusSectionAdmin(BaseSectionAdmin):
  pass

class SergeSectionAdmin(BaseSectionAdmin):
  pass
  # to reguster the above class below

admin.site.register(Product, ProductAdmin)
admin.site.register(ElvisSection, ElvisSectionAdmin)
admin.site.register(LevinusSection, LevinusSectionAdmin)
admin.site.register(SergeSection, SergeSectionAdmin)
admin.site.register(Contact)










