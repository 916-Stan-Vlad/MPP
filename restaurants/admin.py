from django.contrib import admin
from .models import Restaurant, Owner, Menu, MenuItem, User, Reservation


admin.site.register(Restaurant)
admin.site.register(Owner)
admin.site.register(Menu)
admin.site.register(MenuItem)
admin.site.register(User)
admin.site.register(Reservation)

