from rest_framework import serializers
from .models import Category, Transaction, Budget

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
        read_only_fields = ('user', 'created_at')

class TransactionSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    
    class Meta:
        model = Transaction
        fields = '__all__'
        read_only_fields = ('user', 'created_at', 'updated_at')

class BudgetSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    spent = serializers.SerializerMethodField()
    
    class Meta:
        model = Budget
        fields = '__all__'
        read_only_fields = ('user', 'created_at', 'updated_at')

    def get_spent(self, obj):
        from django.db.models import Sum
        spent = Transaction.objects.filter(
            user=obj.user,
            category=obj.category,
            type='expense',
            date__month=obj.month,
            date__year=obj.year,
            status='completed'
        ).aggregate(total=Sum('amount'))['total'] or 0
        return float(spent)

class DashboardSerializer(serializers.Serializer):
    total_income = serializers.DecimalField(max_digits=12, decimal_places=2)
    total_expenses = serializers.DecimalField(max_digits=12, decimal_places=2)
    balance = serializers.DecimalField(max_digits=12, decimal_places=2)
    transactions_count = serializers.IntegerField()
    income_by_category = serializers.ListField()
    expenses_by_category = serializers.ListField()
    monthly_trend = serializers.ListField()