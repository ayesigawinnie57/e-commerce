from django.contrib import admin
from .models import Order, OrderItem, OrderAddress


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ("product_name", "variant_info", "unit_price", "quantity", "line_total")


class OrderAddressInline(admin.StackedInline):
    model = OrderAddress
    extra = 0


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ("order_number", "user", "status", "total", "created_at")
    list_filter = ("status",)
    search_fields = ("order_number", "user__email")
    readonly_fields = ("order_number", "subtotal", "discount", "delivery_fee", "tax", "total", "created_at")
    inlines = [OrderAddressInline, OrderItemInline]
