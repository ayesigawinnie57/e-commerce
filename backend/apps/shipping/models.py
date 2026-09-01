from django.db import models
from apps.common.models import TimeStampedModel
from apps.orders.models import Order


class ShipmentStatus(models.TextChoices):
    PENDING = "pending", "Pending"
    CONFIRMED = "confirmed", "Confirmed"
    PICKED_UP = "picked_up", "Picked Up"
    IN_TRANSIT = "in_transit", "In Transit"
    OUT_FOR_DELIVERY = "out_for_delivery", "Out for Delivery"
    DELIVERED = "delivered", "Delivered"
    FAILED = "failed", "Failed"
    RETURNED = "returned", "Returned"


class Shipment(TimeStampedModel):
    order = models.OneToOneField(Order, on_delete=models.PROTECT, related_name="shipment")
    tracking_number = models.CharField(max_length=100, unique=True, null=True, blank=True, db_index=True)
    carrier = models.CharField(max_length=100, blank=True)
    status = models.CharField(max_length=30, choices=ShipmentStatus.choices, default=ShipmentStatus.PENDING)
    estimated_delivery = models.DateField(null=True, blank=True)
    delivered_at = models.DateTimeField(null=True, blank=True)
    notes = models.TextField(blank=True)

    class Meta:
        db_table = "shipments"

    def __str__(self):
        return f"Shipment({self.order.order_number})"
