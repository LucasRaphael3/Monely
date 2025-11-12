from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model  # noqa
from apps.finances.models import Category, Transaction

User = get_user_model()


class FinancesAPITests(APITestCase):

    def setUp(self):
        # Criar dois usuários para testar o isolamento de dados
        self.user1 = User.objects.create_user(
            username='user1', password='password123')
        self.user2 = User.objects.create_user(
            username='user2', password='password123')

        # Criar uma categoria para o user1
        self.category_user1 = getattr(Category, "objects").create(
            user=self.user1, name='Lazer', type='expense')

        # Criar uma transação para o user1
        self.transaction_user1 = getattr(Transaction, "objects").create(
            
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
        getattr(Category, "objects").create(
            user=self.user2, name='Transporte', type='expense')

        # Supondo que a URL se chame 'category-list'
        response = self.client.get(reverse('category-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results']
                         [0]['name'], self.category_user1.name)

    def test_user_can_create_category(self):
        """
        Garante que um usuário pode criar uma nova categoria.
        """
        url = reverse('category-list')
        data = {'name': 'Alimentação', 'type': 'expense'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(getattr(Category, "objects").count(), 3)  # Duas do setUp + esta
        new_category = getattr(Category, "objects").get(name='Alimentação')
        self.assertEqual(new_category.user, self.user1)

    def test_user_can_update_own_category(self):
        """
        Garante que um usuário pode atualizar sua própria categoria.
        """
        url = reverse('category-detail', kwargs={'pk': self.category_user1.pk})
        data = {'name': 'Lazer e Diversão', 'type': 'expense'}
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.category_user1.refresh_from_db()
        self.assertEqual(self.category_user1.name, 'Lazer e Diversão')

    def test_user_cannot_update_other_user_category(self):
        """
        Garante que um usuário não pode atualizar uma categoria de outro usuário.
        """
        category_user2 = getattr(Category, "objects").create(
            user=self.user2, name='Saúde', type='expense')
        url = reverse('category-detail', kwargs={'pk': category_user2.pk})
        data = {'name': 'Saúde e Bem-estar', 'type': 'expense'}
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_user_can_delete_own_category(self):
        """
        Garante que um usuário pode deletar sua própria categoria.
        """
        url = reverse('category-detail', kwargs={'pk': self.category_user1.pk})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        # Access the model manager dynamically to avoid static type-checker errors
        self.assertFalse(getattr(Category, "objects").filter(
            pk=self.category_user1.pk).exists())  # type: ignore[attr-defined]

    def test_user_can_only_list_own_transactions(self):
        """
        Garante que um usuário só pode listar suas próprias transações.
        """
        # Criar uma transação para o user2 que não deve aparecer na listagem do user1
        category_user2 = getattr(Category, "objects").create(
            user=self.user2, name='Moradia', type='expense')
        getattr(Transaction, "objects").create(
            user=self.user2,
            category=category_user2,
            type='expense',
            amount=1500.00,
            description='Aluguel',
            date='2025-10-20'
        )

        response = self.client.get(reverse('transaction-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(
            response.data['results'][0]['description'], self.transaction_user1.description)

    def test_user_cannot_access_other_user_transaction(self):
        """
        Garante que um usuário não pode acessar detalhes de uma transação de outro usuário.
        """
        # Tentar acessar a transação do user1 enquanto autenticado como user2
        self.client.force_authenticate(user=self.user2)
        url = reverse('transaction-detail',
                      kwargs={'pk': self.transaction_user1.pk})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_user_can_delete_own_transaction(self):
        """
        Garante que um usuário pode deletar sua própria transação.
        """
        url = reverse('transaction-detail',
                      kwargs={'pk': self.transaction_user1.pk})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        # Access the model manager dynamically to avoid static type-checker errors
        self.assertFalse(getattr(Transaction, "objects").filter(
            pk=self.transaction_user1.pk).exists())  # type: ignore[attr-defined]
