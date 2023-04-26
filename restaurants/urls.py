"""restaurants URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from rest_framework.routers import DefaultRouter

from restaurants import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('admin/', admin.site.urls),
    path('restaurants/', views.restaurant_list),
    path('restaurants/<int:id>', views.restaurant_detail),
    path('owners/', views.owner_list),
    path('owners/<int:id>', views.owner_detail),
    path('owners/<int:id>/restaurants/', views.owner_add_restaurants),
    path('owners/filter/<int:owner_fortune>', views.owner_filter, name='owner-filter'),
    path('menus/', views.menu_list),
    path('menus/<int:id>', views.menu_detail),
    path('menuitems/', views.menu_item_list),
    path('menuitems/<int:id>', views.menu_item_detail),
    path('users/', views.user_list),
    path('users/<int:id>', views.user_detail),
    path('reservations/', views.reservation_list),
    path('reservations/<int:id>', views.reservation_detail),
    path('averagepages/', views.restaurant_menu_page_order, name='restaurant-menu-page-order'),
    path('averageprice/', views.menu_menu_item_order)

]

urlpatterns = format_suffix_patterns(urlpatterns)
