from django.db import models


class Owner(models.Model):
    owner_name = models.CharField(max_length=50)
    owner_age = models.IntegerField()
    owner_fortune = models.IntegerField()
    owner_birth_location = models.CharField(max_length=200)
    owner_native_language = models.CharField(max_length=200)

    def __str__(self):
        return self.owner_name + " " + str(self.owner_age) + " " + str(self.owner_fortune) + " " +\
            self.owner_birth_location + " " + self.owner_native_language


class Restaurant(models.Model):
    restaurant_name = models.CharField(max_length=100)
    description = models.CharField(max_length=200)
    menu_review = models.CharField(max_length=100)
    review = models.CharField(max_length=200)
    owner = models.ForeignKey(Owner, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.restaurant_name + " " + self.description + " " + self.menu_review + " " + self.review + " " + \
            self.owner.owner_name


class Menu(models.Model):
    menu_title = models.CharField(max_length=100)
    menu_nr_pages = models.IntegerField()
    menu_food = models.CharField(max_length=200)
    menu_drinks = models.CharField(max_length=200)
    menu_deserts = models.CharField(max_length=200)
    menu_restaurant = models.ForeignKey(Restaurant, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.menu_title + " " + str(self.menu_nr_pages) + " " + self.menu_food + " " + self.menu_drinks + " " + \
            self.menu_deserts + " " + self.menu_restaurant.restaurant_name


class MenuItem(models.Model):
    item_name = models.CharField(max_length=100)
    item_price = models.IntegerField()
    item_description = models.CharField(max_length=100)
    item_menu = models.ForeignKey(Menu, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.item_name + " " + str(self.item_price) + " " + self.item_description + " " + self.item_menu.menu_title


class User(models.Model):
    user_name = models.CharField(max_length=100)
    user_email = models.CharField(max_length=100)
    user_password = models.CharField(max_length=100)

    def __str__(self):
        return self.user_name + " " + self.user_email + " " + self.user_password


class Reservation(models.Model):
    user_reservation = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    restaurant_reservation = models.ForeignKey(Restaurant, on_delete=models.SET_NULL, null=True)
    reservation_date = models.DateField()
    reservation_time = models.TimeField()

    def __str__(self):
        return self.user_reservation.user_name + " " + self.restaurant_reservation.restaurant_name + " " +\
            str(self.reservation_date) + " " + str(self.reservation_time)

