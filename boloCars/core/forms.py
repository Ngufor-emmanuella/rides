from django import forms
from .models import  *


class ElvisSectionForm(forms.ModelForm):
  class Meta:
    model = ElvisSection
    fields = ('destination', 'rental_rate_amount', 'expenses', 'expense_tag', 'driver_income', 'comments')


class LevinusSectionForm(forms.ModelForm):
  class Meta:
    model = LevinusSection
    fields = ('destination', 'rental_rate_amount', 'expenses', 'expense_tag', 'driver_income', 'comments')

class SergeSectionForm(forms.ModelForm):
  class Meta:
    model = SergeSection
    fields = ('destination', 'rental_rate_amount', 'expenses', 'expense_tag', 'driver_income', 'comments')


class ContactForm(forms.ModelForm):
  name = forms.CharField(label='Your Name', max_length= 100)
  email = forms.EmailField(label= 'Your Email')
  message = forms.CharField(label='Message', widget=forms.Textarea)

