from django.contrib import admin
from .models import Shipment

@admin.register(Shipment)
class ShipmentAdmin(admin.ModelAdmin):
    list_display = ("order", "tracking_number", "carrier", "status", "estimated_delivery")
    list_filter = ("status",)
    search_fields = ("order__order_number", "tracking_number")
