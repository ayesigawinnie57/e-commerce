from rest_framework import serializers
from apps.products.serializers import ProductListSerializer
from .models import Cart, CartItem


class CartItemSerializer(serializers.ModelSerializer):
    product = ProductListSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(
        source="product", queryset=__import__("apps.products.models", fromlist=["Product"]).Product.objects.all(),
        write_only=True,
    )
    unit_price = serializers.ReadOnlyField()
    line_total = serializers.ReadOnlyField()

    class Meta:
        model = CartItem
        fields = ("id", "product", "product_id", "variant", "quantity", "unit_price", "line_total")


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total = serializers.ReadOnlyField()
    item_count = serializers.ReadOnlyField()

    class Meta:
        model = Cart
        fields = ("id", "items", "total", "item_count", "updated_at")


class AddCartItemSerializer(serializers.Serializer):
    product_id = serializers.IntegerField()
    variant_id = serializers.IntegerField(required=False, allow_null=True)
    quantity = serializers.IntegerField(min_value=1, default=1)


class UpdateCartItemSerializer(serializers.Serializer):
    quantity = serializers.IntegerField(min_value=1)
