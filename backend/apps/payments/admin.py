from django.contrib import admin
from .models import Payment

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ("order", "amount", "currency", "provider", "status", "created_at")
    list_filter = ("status", "provider")
    search_fields = ("order__order_number", "transaction_reference")
    readonly_fields = ("transaction_reference", "created_at", "updated_at")
