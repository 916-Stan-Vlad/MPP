# Generated by Django 4.1.7 on 2023-03-23 07:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('restaurants', '0006_user_rename_menu_restaurant_menu_review_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='restaurant',
            old_name='name',
            new_name='restaurant_name',
        ),
    ]
