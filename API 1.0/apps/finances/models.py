from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Category(models.Model):
    TRANSACTION_TYPES = (
        ('income', 'Receita'),
        ('expense', 'Despesa'),
    )
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='categories')
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=10, choices=TRANSACTION_TYPES)
    color = models.CharField(max_length=7, default='#000000')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'categories'
        unique_together = ['user', 'name', 'type']

    def __str__(self):
        return f"{self.name} ({self.get_type_display()})"

class Transaction(models.Model):
    TRANSACTION_TYPES = (
        ('income', 'Receita'),
        ('expense', 'Despesa'),
    )
    
    STATUS_CHOICES = (
        ('pending', 'Pendente'),
        ('completed', 'Concluída'),
        ('cancelled', 'Cancelada'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='transactions')
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    type = models.CharField(max_length=10, choices=TRANSACTION_TYPES)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    description = models.TextField(blank=True)
    date = models.DateField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='completed')
    source = models.CharField(max_length=20, default='web')  # web, whatsapp, api
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'transactions'
        ordering = ['-date', '-created_at']

    def __str__(self):
        return f"{self.get_type_display()} - R$ {self.amount} - {self.date}"

class Budget(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='budgets')
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    month = models.IntegerField()
    year = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'budgets'
        unique_together = ['user', 'category', 'month', 'year']

    def __str__(self):
        return f"{self.category.name} - {self.month}/{self.year} - R$ {self.amount}"