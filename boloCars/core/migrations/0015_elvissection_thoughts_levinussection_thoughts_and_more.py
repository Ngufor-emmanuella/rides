# Generated by Django 5.1.4 on 2025-01-29 14:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0014_remove_elvissection_thoughts_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='elvissection',
            name='thoughts',
            field=models.CharField(default='leave message', max_length=100),
        ),
        migrations.AddField(
            model_name='levinussection',
            name='thoughts',
            field=models.CharField(default='leave message', max_length=100),
        ),
        migrations.AddField(
            model_name='sergesection',
            name='thoughts',
            field=models.CharField(default='leave message', max_length=100),
        ),
    ]
