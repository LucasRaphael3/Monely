from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model # noqa
from apps.finances.models import Category, Transaction

User = get_user_model()

class FinancesAPITests(APITestCase):

    def setUp(self):
        # Criar dois usuários para testar o isolamento de dados
        self.user1 = User.objects.create_user(username='user1', password='password123')
        self.user2 = User.objects.create_user(username='user2', password='password123')

        # Criar uma categoria para o user1
        self.category_user1 = Category.objects.create(user=self.user1, name='Lazer', type='expense')

        # Criar uma transação para o user1
        self.transaction_user1 = Transaction.objects.create(
            user=self.user1,
            category=self.category_user1,
            type='expense',
            amount=100.00,
            description='Cinema',
            date='2025-10-17'
        )

        # Autenticar o cliente com user1 por padrão
        self.client.force_authenticate(user=self.user1)

    def test_user_can_only_list_own_categories(self):
        """
        Garante que um usuário só pode listar suas próprias categorias.
        """
        # Criar uma categoria para o user2 que não deve aparecer na listagem do user1
        Category.objects.create(user=self.user2, name='Transporte', type='expense')

        response = self.client.get(reverse('category-list')) # Supondo que a URL se chame 'category-list'
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['name'], self.category_user1.name)

    def test_user_cannot_access_other_user_transaction(self):
        """
        Garante que um usuário não pode acessar detalhes de uma transação de outro usuário.
        """
        # Tentar acessar a transação do user1 enquanto autenticado como user2
        self.client.force_authenticate(user=self.user2)
        url = reverse('transaction-detail', kwargs={'pk': self.transaction_user1.pk}) # Supondo 'transaction-detail'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
