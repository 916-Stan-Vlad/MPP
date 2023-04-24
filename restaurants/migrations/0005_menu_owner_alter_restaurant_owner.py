# Generated by Django 4.1.7 on 2023-03-15 16:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('restaurants', '0004_restaurant_review'),
    ]

    operations = [
        migrations.CreateModel(
            name='Menu',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('menu_title', models.CharField(max_length=100)),
                ('menu_nr_pages', models.IntegerField()),
                ('menu_food', models.CharField(max_length=200)),
                ('menu_drinks', models.CharField(max_length=200)),
                ('menu_deserts', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Owner',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('owner_name', models.CharField(max_length=50)),
                ('owner_age', models.IntegerField()),
                ('owner_fortune', models.IntegerField()),
                ('owner_birth_location', models.CharField(max_length=200)),
                ('owner_native_language', models.CharField(max_length=200)),
            ],
        ),
        migrations.AlterField(
            model_name='restaurant',
            name='owner',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='restaurants.owner'),
        ),
    ]
