from rest_framework import serializers
from .models import Order, OrderItem, OrderAddress


class OrderAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderAddress
        exclude = ("id", "order")


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ("id", "product", "product_name", "variant_info", "unit_price", "quantity", "line_total")


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    address = OrderAddressSerializer(read_only=True)

    class Meta:
        model = Order
        fields = (
            "id", "order_number", "status", "subtotal", "discount",
            "delivery_fee", "tax", "total", "notes", "items", "address", "created_at",
        )
        read_only_fields = fields


class CheckoutSerializer(serializers.Serializer):
    full_name = serializers.CharField(max_length=200)
    phone = serializers.CharField(max_length=20)
    address_line1 = serializers.CharField(max_length=300)
    address_line2 = serializers.CharField(max_length=300, required=False, allow_blank=True)
    city = serializers.CharField(max_length=100)
    district = serializers.CharField(max_length=100, required=False, allow_blank=True)
    country = serializers.CharField(max_length=100, default="Uganda")
    notes = serializers.CharField(required=False, allow_blank=True)
    coupon_code = serializers.CharField(required=False, allow_blank=True)
