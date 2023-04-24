# Generated by Django 4.1.7 on 2023-03-22 17:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('restaurants', '0005_menu_owner_alter_restaurant_owner'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_name', models.CharField(max_length=100)),
                ('user_email', models.CharField(max_length=100)),
                ('user_password', models.CharField(max_length=100)),
            ],
        ),
        migrations.RenameField(
            model_name='restaurant',
            old_name='menu',
            new_name='menu_review',
        ),
        migrations.AddField(
            model_name='menu',
            name='menu_restaurant',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='restaurants.restaurant'),
        ),
        migrations.CreateModel(
            name='Reservation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('reservation_date', models.DateField()),
                ('reservation_time', models.TimeField()),
                ('restaurant_reservation', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='restaurants.restaurant')),
                ('user_reservation', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='restaurants.user')),
            ],
        ),
        migrations.CreateModel(
            name='MenuItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('item_name', models.CharField(max_length=100)),
                ('item_price', models.IntegerField()),
                ('item_description', models.CharField(max_length=100)),
                ('item_menu', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='restaurants.menu')),
            ],
        ),
    ]
