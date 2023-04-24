import http

from django.db.models import Avg, Max
from django.http import JsonResponse
from rest_framework import status
from rest_framework.generics import ListAPIView
from rest_framework.response import Response

from .models import Restaurant, Owner, Menu, MenuItem, User, Reservation
from .serializers import RestaurantSerializer, OwnerSerializer, MenuSerializer, MenuItemSerializer, UserSerializer, ReservationSerializer
from rest_framework.decorators import api_view
from django_filters.rest_framework import DjangoFilterBackend


@api_view(['GET', 'POST'])
def restaurant_list(request, format=None):

    if request.method == 'GET':
        restaurants = Restaurant.objects.all()
        serializer = RestaurantSerializer(restaurants, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = RestaurantSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'PUT', 'DELETE'])
def restaurant_detail(request, id, format=None):

    try:
        restaurant = Restaurant.objects.get(pk=id)
    except Restaurant.DoseNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = RestaurantSerializer(restaurant)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = RestaurantSerializer(restaurant, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        restaurant.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def owner_list(request, format=None):

    if request.method == 'GET':
        owners = Owner.objects.all()
        serializer = OwnerSerializer(owners, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = OwnerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def owner_filter(request, owner_fortune, format = None):
    if request.method == 'GET':
        owner_list = []
        owners = Owner.objects.all()
        for owner in owners:
            my_model_instance = Owner.objects.get(pk=owner.id)
            my_field_value = my_model_instance.owner_fortune
            if my_field_value > owner_fortune:
                owner_list.append(owner)
        serializer = OwnerSerializer(owner_list, many=True)
        return Response(serializer.data)


@api_view(['GET', 'PUT', 'DELETE'])
def owner_detail(request, id, format=None):

    try:
        owner = Owner.objects.get(pk=id)
    except Owner.DoseNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        restaurant_list = []
        restaurants = Restaurant.objects.all()
        for restaurant in restaurants:
            my_model_instance = Restaurant.objects.get(pk=restaurant.id)
            my_field_value = my_model_instance.owner
            if my_field_value.id == id:
                restaurant_list.append(restaurant)

        serializer = OwnerSerializer(owner)
        serializer_restaurants = RestaurantSerializer(restaurant_list, many=True)
        return Response({"status": "success", "owner": serializer.data, "restaurants": serializer_restaurants.data},
                        status=status.HTTP_200_OK)

    elif request.method == 'PUT':
        serializer = OwnerSerializer(owner, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        owner.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def owner_add_restaurants(request, id, format=None):
    try:
        owner = Owner.objects.get(pk=id)
    except Owner.DoseNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        restaurant_list = []
        restaurants = Restaurant.objects.all()
        for restaurant in restaurants:
            my_model_instance = Restaurant.objects.get(pk=restaurant.id)
            my_field_value = my_model_instance.owner
            if my_field_value.id == id:
                restaurant_list.append(restaurant)

        serializer = OwnerSerializer(owner)
        serializer_restaurants = RestaurantSerializer(restaurant_list, many=True)
        return Response({"status": "success", "owner": serializer.data, "restaurants": serializer_restaurants.data},
                        status=status.HTTP_200_OK)

    elif request.method == 'POST':
        if id:
            data = request.data
            datastr = data['data']
            datastr = datastr.split(",")
            for datas in datastr:
                cast = int(datas)
                if Restaurant.objects.get(id=cast):

                    serializer = Restaurant.objects.all()
                    Restaurant.objects.create(restaurant_name=serializer.get(id=cast).restaurant_name,
                                            description=serializer.get(id=cast).description,
                                            menu_review=serializer.get(id=cast).menu_review,
                                            review=serializer.get(id=cast).review,
                                            owner=Owner.objects.get(id=id))

            return Response(status.HTTP_200_OK)

        serializer = OwnerSerializer(owner, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def menu_list(request, format=None):
    if request.method == 'GET':
        menus = Menu.objects.all()
        serializer = MenuSerializer(menus, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = MenuSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'PUT', 'DELETE'])
def menu_detail(request, id, format=None):

    try:
        menu = Menu.objects.get(pk=id)
    except Menu.DoseNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = MenuSerializer(menu)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = MenuSerializer(menu, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        menu.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def menu_item_list(request, format=None):
    if request.method == 'GET':
        menus_items = MenuItem.objects.all()
        serializer = MenuItemSerializer(menus_items, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = MenuItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'PUT', 'DELETE'])
def menu_item_detail(request, id, format=None):

    try:
        menu_item = MenuItem.objects.get(pk=id)
    except MenuItem.DoseNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = MenuItemSerializer(menu_item)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = MenuItemSerializer(menu_item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        menu_item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def user_list(request, format=None):
    if request.method == 'GET':
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'PUT', 'DELETE'])
def user_detail(request, id, format=None):
    try:
        user = User.objects.get(pk=id)
    except User.DoseNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = UserSerializer(user)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



@api_view(['GET', 'POST'])
def reservation_list(request, format=None):
    if request.method == 'GET':
        reservations = Reservation.objects.all()
        serializer = ReservationSerializer(reservations, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = ReservationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'PUT', 'DELETE'])
def reservation_detail(request, id, format=None):
    try:
        reservation = Reservation.objects.get(pk=id)
    except Reservation.DoseNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ReservationSerializer(reservation)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = ReservationSerializer(reservation, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        reservation.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# all restaurants in the order of their menu number of pages
@api_view(['GET'])
def restaurant_menu_page_order(request):
    if request.method == 'GET':
        restaurant_page_date = (
            Menu.objects.values('menu_restaurant')
                        .annotate(average_pages=Avg('menu_nr_pages'))
                        .order_by('-average_pages')
        )
        restaurant_info = []
        for restaurant in restaurant_page_date:
            restaurant_info.append(restaurant)

        return Response(restaurant_info)


@api_view(['GET'])
def menu_menu_item_order(request):
    if request.method == 'GET':
        menu_item_date = (
            MenuItem.objects.values('item_menu')
                    .annotate(average_price=Avg('item_price'))
                    .order_by('-average_price')
        )
        menu_info = []
        for menu in menu_item_date:
            menu_info.append(menu)


        return Response(menu_info)



