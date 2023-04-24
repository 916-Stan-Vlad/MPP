from rest_framework import serializers
from .models import Restaurant, Owner, Menu, MenuItem, User, Reservation


class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = ['id', 'restaurant_name', 'description', 'menu_review', 'review', 'owner']
        depth = 1


class OwnerSerializer(serializers.ModelSerializer):
    def validate(self, data):
        if data.get("owner_fortune") < 0:
            raise serializers.ValidationError("Fortune less then 0")
        return data

    class Meta:
        model = Owner
        fields = ['id', 'owner_name', 'owner_age', 'owner_fortune', 'owner_birth_location', 'owner_native_language']


class MenuSerializer(serializers.ModelSerializer):
    def validate(self, data):
        if data.get("menu_nr_pages") < 0:
            raise serializers.ValidationError("Nr of pages less then 0")
        return data

    class Meta:
        model = Menu
        fields = ['id', 'menu_title', 'menu_nr_pages', 'menu_food', 'menu_drinks', 'menu_deserts', 'menu_restaurant']
        depth = 1


class MenuItemSerializer(serializers.ModelSerializer):
    def validate(self, data):
        if data.get("item_price") < 0:
            raise serializers.ValidationError("Item price less then 0")
        return data

    class Meta:
        model = MenuItem
        fields = ['id', 'item_name', 'item_price', 'item_description', 'item_menu']
        depth = 3


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'user_name', 'user_email', 'user_password']


class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = ['id', 'user_reservation', 'restaurant_reservation', 'reservation_date', 'reservation_time']
        depth = 1


