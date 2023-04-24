import unittest

from rest_framework.test import APIClient
from unittest import TestCase
from django.test import Client
from django.urls import reverse
from unittest.mock import patch

from restaurants.models import Owner
from restaurants.serializers import OwnerSerializer


class TestFilterOwnersTestCase(unittest.TestCase):
    def setUp(self):
        self.client = APIClient()

    @patch('restaurants.views.Owner.objects.all')
    def test_filter_owner(self, mock_all):
        owner_fortune = 20000
        response = self.client.get(reverse('owner-filter', args=[owner_fortune]))
        self.assertEqual(response.status_code, 200)

        expected_data = OwnerSerializer(Owner.objects.all(), many=True).data
        self.assertEqual(response.data, expected_data)


class TestRestaurantMenuPageOrderTestCase(unittest.TestCase):
    def setUp(self):
        self.client = APIClient()

    @patch('restaurants.models.Menu')
    def test_restaurant_menu_page_number(self, mock):
        response = self.client.get(reverse('restaurant-menu-page-order'))
        self.assertEqual(response.status_code, 200)

        expected_date = [
                            {
                                "menu_restaurant": 3,
                                "average_pages": 100.0
                            },
                            {
                                "menu_restaurant": 4,
                                "average_pages": 70.0
                            },
                            {
                                "menu_restaurant": 6,
                                "average_pages": 27.0
                            },
                            {
                                "menu_restaurant": 2,
                                "average_pages": 10.0
                            },
                            {
                                "menu_restaurant": 5,
                                "average_pages": 7.0
                            }
                        ]
        self.assertEqual(response.data, expected_date)


if __name__ == '__main__':
    unittest.main()
