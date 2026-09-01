from rest_framework import serializers
from .models import Shipment


class ShipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shipment
        fields = ("id", "order", "tracking_number", "carrier", "status", "estimated_delivery", "delivered_at", "created_at")
        read_only_fields = fields
