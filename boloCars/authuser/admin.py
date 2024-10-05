from django.contrib import admin
from .models import User
from .models import PasswordReset

# Register your models here.
admin.site.register(User)
admin.site.register(PasswordReset)
