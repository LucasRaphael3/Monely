from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Sum, Count, Q
from datetime import datetime, timedelta
from .models import Category, Transaction, Budget
from .serializers import (
    CategorySerializer, TransactionSerializer, 
    BudgetSerializer, DashboardSerializer
)

class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer

    def get_queryset(self):
        return Category.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class TransactionViewSet(viewsets.ModelViewSet):
    serializer_class = TransactionSerializer

    def get_queryset(self):
        queryset = Transaction.objects.filter(user=self.request.user)
        
        # Filtros opcionais
        transaction_type = self.request.query_params.get('type', None)
        start_date = self.request.query_params.get('start_date', None)
        end_date = self.request.query_params.get('end_date', None)
        category = self.request.query_params.get('category', None)
        
        if transaction_type:
            queryset = queryset.filter(type=transaction_type)
        if start_date:
            queryset = queryset.filter(date__gte=start_date)
        if end_date:
            queryset = queryset.filter(date__lte=end_date)
        if category:
            queryset = queryset.filter(category_id=category)
            
        return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class BudgetViewSet(viewsets.ModelViewSet):
    serializer_class = BudgetSerializer

    def get_queryset(self):
        return Budget.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class DashboardViewSet(viewsets.ViewSet):
    @action(detail=False, methods=['get'])
    def summary(self, request):
        user = request.user
        month = request.query_params.get('month', datetime.now().month)
        year = request.query_params.get('year', datetime.now().year)
        
        # Transações do mês
        transactions = Transaction.objects.filter(
            user=user,
            date__month=month,
            date__year=year,
            status='completed'
        )
        
        # Totais
        income = transactions.filter(type='income').aggregate(
            total=Sum('amount'))['total'] or 0
        expenses = transactions.filter(type='expense').aggregate(
            total=Sum('amount'))['total'] or 0
        balance = income - expenses
        
        # Por categoria
        income_by_cat = transactions.filter(type='income').values(
            'category__name', 'category__color'
        ).annotate(total=Sum('amount')).order_by('-total')
        
        expenses_by_cat = transactions.filter(type='expense').values(
            'category__name', 'category__color'
        ).annotate(total=Sum('amount')).order_by('-total')
        
        # Tendência mensal (últimos 6 meses)
        monthly_data = []
        for i in range(5, -1, -1):
            target_date = datetime.now() - timedelta(days=30*i)
            month_transactions = Transaction.objects.filter(
                user=user,
                date__month=target_date.month,
                date__year=target_date.year,
                status='completed'
            )
            month_income = month_transactions.filter(type='income').aggregate(
                total=Sum('amount'))['total'] or 0
            month_expenses = month_transactions.filter(type='expense').aggregate(
                total=Sum('amount'))['total'] or 0
            
            monthly_data.append({
                'month': target_date.strftime('%b/%y'),
                'income': float(month_income),
                'expenses': float(month_expenses),
                'balance': float(month_income - month_expenses)
            })
        
        data = {
            'total_income': income,
            'total_expenses': expenses,
            'balance': balance,
            'transactions_count': transactions.count(),
            'income_by_category': list(income_by_cat),
            'expenses_by_category': list(expenses_by_cat),
            'monthly_trend': monthly_data
        }
        
        serializer = DashboardSerializer(data)
        return Response(serializer.data)
