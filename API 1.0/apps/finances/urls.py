from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, TransactionViewSet, BudgetViewSet, DashboardViewSet

router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'transactions', TransactionViewSet, basename='transaction')
router.register(r'budgets', BudgetViewSet, basename='budget')
router.register(r'dashboard', DashboardViewSet, basename='dashboard')

urlpatterns = [
    path('', include(router.urls)),
]