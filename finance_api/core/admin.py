from django.contrib import admin
from .models import User, Account

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'whatsapp_number', 'email', 'is_active', 'created_at')
    search_fields = ('name', 'whatsapp_number', 'email')
    list_filter = ('is_active', 'language', 'timezone')
    ordering = ('-created_at',)


@admin.register(Account)
class AccountAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'name', 'type', 'currency', 'current_balance', 'is_active')
    search_fields = ('name', 'institution', 'account_number')
    list_filter = ('type', 'currency', 'is_active')
    ordering = ('-created_at',)
