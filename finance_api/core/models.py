from django.db import models

class User(models.Model):
    whatsapp_number = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=100, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    profile_image_url = models.TextField(blank=True, null=True)
    timezone = models.CharField(max_length=50, default='America/Sao_Paulo')
    language = models.CharField(max_length=10, default='pt-BR')
    notification_preferences = models.JSONField(blank=True, null=True)
    onboarding_completed = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    last_activity = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name or self.whatsapp_number


class Account(models.Model):
    CHECKING = 'checking'
    SAVINGS = 'savings'
    CREDIT_CARD = 'credit_card'
    INVESTMENT = 'investment'

    TYPE_CHOICES = [
        (CHECKING, 'Checking'),
        (SAVINGS, 'Savings'),
        (CREDIT_CARD, 'Credit Card'),
        (INVESTMENT, 'Investment'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=50, choices=TYPE_CHOICES)
    institution = models.CharField(max_length=100, blank=True, null=True)
    account_number = models.CharField(max_length=50, blank=True, null=True)
    currency = models.CharField(max_length=3, default="BRL")
    initial_balance = models.DecimalField(max_digits=15, decimal_places=2, default=0)
    current_balance = models.DecimalField(max_digits=15, decimal_places=2, default=0)
    credit_limit = models.DecimalField(max_digits=15, decimal_places=2, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.name} - {self.name}"
