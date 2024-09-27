# Generated by Django 5.1 on 2024-09-06 10:06

import core.models
import django.db.models.deletion
import django.utils.timezone
import shortuuid.django_fields
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cid', shortuuid.django_fields.ShortUUIDField(alphabet='abcdefgh12345', length=10, max_length=30, prefix='cat', unique=True)),
                ('title', models.CharField(default='Bolo cars for Rents', max_length=100)),
                ('image', models.ImageField(default='category.jpg', upload_to='category')),
            ],
            options={
                'verbose_name_plural': 'Categories',
            },
        ),
        migrations.CreateModel(
            name='ElvisSection',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_time', models.DateTimeField(default=django.utils.timezone.now)),
                ('destination', models.CharField(max_length=100)),
                ('rental_rate_amount', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=10, null=True)),
                ('expenses', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=10, null=True)),
                ('expense_tag', models.CharField(max_length=100)),
                ('management_fee_accruals', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=10, null=True)),
                ('driver_income', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=10, null=True)),
                ('net_income', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=10, null=True)),
                ('transaction', models.CharField(max_length=100)),
                ('comments', models.CharField(default='leave message', max_length=100)),
            ],
            options={
                'verbose_name': 'Elvis Section',
                'verbose_name_plural': 'Elvis Sections',
            },
        ),
        migrations.CreateModel(
            name='LevinusSection',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_time', models.DateTimeField(default=django.utils.timezone.now)),
                ('destination', models.CharField(max_length=100)),
                ('rental_rate_amount', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=10, null=True)),
                ('expenses', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=10, null=True)),
                ('expense_tag', models.CharField(max_length=100)),
                ('management_fee_accruals', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=10, null=True)),
                ('driver_income', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=10, null=True)),
                ('net_income', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=10, null=True)),
                ('transaction', models.CharField(max_length=100)),
                ('comments', models.CharField(default='leave message', max_length=100)),
            ],
            options={
                'verbose_name': 'Levinus Section',
                'verbose_name_plural': 'Levinus Sections',
            },
        ),
        migrations.CreateModel(
            name='SergeSection',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_time', models.DateTimeField(default=django.utils.timezone.now)),
                ('destination', models.CharField(max_length=100)),
                ('rental_rate_amount', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=10, null=True)),
                ('expenses', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=10, null=True)),
                ('expense_tag', models.CharField(max_length=100)),
                ('management_fee_accruals', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=10, null=True)),
                ('driver_income', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=10, null=True)),
                ('net_income', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=10, null=True)),
                ('transaction', models.CharField(max_length=100)),
                ('comments', models.CharField(default='leave message', max_length=100)),
            ],
            options={
                'verbose_name': 'Serge Section',
                'verbose_name_plural': 'Serge Sections',
            },
        ),
        migrations.CreateModel(
            name='Tags',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='Address',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('address', models.CharField(max_length=100, null=True)),
                ('status', models.BooleanField(default=False)),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name_plural': 'Address',
            },
        ),
        migrations.CreateModel(
            name='CartOrder',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=10, null=True)),
                ('paid_status', models.BooleanField(default=False)),
                ('order_date', models.DateTimeField(auto_now_add=True)),
                ('product_status', models.CharField(choices=[('process', 'Processing'), ('reserved', 'Reserved'), ('delivered', 'Delivered')], default='processing', max_length=30)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name_plural': 'Cart Order',
            },
        ),
        migrations.CreateModel(
            name='CartOrderItems',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('invoice_no', models.CharField(max_length=200)),
                ('product_status', models.CharField(max_length=200)),
                ('item', models.CharField(max_length=200)),
                ('image', models.CharField(max_length=200)),
                ('qty', models.IntegerField(default=0)),
                ('price', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=10, null=True)),
                ('total', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=10, null=True)),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.cartorder')),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pid', shortuuid.django_fields.ShortUUIDField(alphabet='abcdefgh12345', length=10, max_length=20, prefix='', unique=True)),
                ('title', models.CharField(max_length=100)),
                ('image', models.ImageField(default='product.jpg', upload_to=core.models.user_directory_path)),
                ('description', models.TextField(blank=True, default='Bolo car for rents acaliable', null=True)),
                ('price', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=10, null=True)),
                ('old_price', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=10, null=True)),
                ('specifications', models.TextField(blank=True, null=True)),
                ('product_status', models.CharField(choices=[('draft', 'Draft'), ('disabled', 'Disabled'), ('rejected', 'Rejected'), ('in_review', 'In Review'), ('published', 'Published')], default='in_review', max_length=10)),
                ('status', models.BooleanField(default=True)),
                ('in_stock', models.BooleanField(default=True)),
                ('featured', models.BooleanField(default=False)),
                ('digital', models.BooleanField(default=False)),
                ('sku', shortuuid.django_fields.ShortUUIDField(alphabet='1234567890', length=4, max_length=10, prefix='sku', unique=True)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(blank=True, null=True)),
                ('category', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='category', to='core.category')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name_plural': 'Products',
            },
        ),
        migrations.CreateModel(
            name='ProductImages',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('images', models.ImageField(default='product.jpg', upload_to='product-image')),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('product', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='p_images', to='core.product')),
            ],
            options={
                'verbose_name_plural': 'Product Images',
            },
        ),
        migrations.CreateModel(
            name='ProductReview',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('review', models.TextField()),
                ('rating', models.IntegerField(choices=[(1, '⭐☆☆☆☆'), (2, '⭐⭐☆☆☆'), (3, '⭐⭐⭐☆☆'), (4, '⭐⭐⭐⭐☆'), (5, '⭐⭐⭐⭐⭐')], default=None)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('product', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='core.product')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name_plural': 'Product Review',
            },
        ),
        migrations.CreateModel(
            name='Vendor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('vid', shortuuid.django_fields.ShortUUIDField(alphabet='abcdefgh12345', length=10, max_length=30, prefix='ven', unique=True)),
                ('title', models.CharField(default='Cars Avaliable', max_length=100)),
                ('image', models.ImageField(default='cars.jpg', upload_to=core.models.user_directory_path)),
                ('description', models.TextField(blank=True, default='Beautify cars avaliable', null=True)),
                ('address', models.CharField(default='1280 Rue de Deido-Bonanjo, after Total Bonateki, before Carrefour Bonabassem, Douala.', max_length=100)),
                ('contact', models.CharField(default='+237 652921000 / +237 693339340', max_length=100)),
                ('chat_resp_time', models.CharField(default='100', max_length=100)),
                ('delivery_on_time', models.CharField(default='100', max_length=100)),
                ('authentic_rating', models.CharField(default='100', max_length=100)),
                ('days_return', models.CharField(default='100', max_length=100)),
                ('warranty_period', models.CharField(default='100', max_length=100)),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name_plural': 'Vendors',
            },
        ),
        migrations.CreateModel(
            name='Wishlist',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('product', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='core.product')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name_plural': 'Wishlists',
            },
        ),
    ]
