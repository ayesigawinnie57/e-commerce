from django.contrib import admin
from .models import Seller


@admin.register(Seller)
class SellerAdmin(admin.ModelAdmin):
    list_display = ("store_name", "user", "verification_status", "rating", "is_active", "created_at")
    list_filter = ("verification_status", "is_active", "country")
    search_fields = ("store_name", "user__email", "slug")
    readonly_fields = ("slug", "rating", "total_sales", "created_at", "updated_at")
