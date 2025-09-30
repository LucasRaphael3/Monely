from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from .models import User, Account


class UserAPITest(APITestCase):
    def setUp(self):
        self.user_data = {
            "whatsapp_number": "+5511999999999",
            "name": "Gustavo França",
            "email": "gustavo@example.com"
        }
        self.user = User.objects.create(**self.user_data)

    def test_list_users(self):
        url = reverse("user-list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_user(self):
        url = reverse("user-list")
        data = {
            "whatsapp_number": "+5511888888888",
            "name": "Novo Usuário",
            "email": "novo@example.com"
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 2)


class AccountAPITest(APITestCase):
    def setUp(self):
        self.user = User.objects.create(whatsapp_number="+5511777777777", name="Cliente")
        self.account_data = {
            "user": self.user,
            "name": "Conta Corrente",
            "type": "checking",
            "currency": "BRL",
            "initial_balance": 1000.00,
            "current_balance": 1000.00
        }
        self.account = Account.objects.create(**self.account_data)

    def test_list_accounts(self):
        url = reverse("account-list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_account(self):
        url = reverse("account-list")
        data = {
            "user": self.user.id,
            "name": "Poupança",
            "type": "savings",
            "currency": "BRL",
            "initial_balance": 500.00,
            "current_balance": 500.00
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Account.objects.count(), 2)
