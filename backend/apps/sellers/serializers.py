from rest_framework import serializers
from .models import Seller


class SellerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seller
        fields = (
            "id", "store_name", "slug", "description", "logo", "banner",
            "phone", "email", "address", "city", "country",
            "verification_status", "rating", "total_sales", "is_active", "created_at",
        )
        read_only_fields = ("id", "slug", "verification_status", "rating", "total_sales", "created_at")


class SellerCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seller
        fields = ("store_name", "description", "phone", "email", "address", "city", "country")
