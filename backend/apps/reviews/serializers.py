from rest_framework import serializers
from .models import Review


class ReviewSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source="user.full_name", read_only=True)

    class Meta:
        model = Review
        fields = ("id", "user_name", "product", "rating", "title", "body", "is_verified_purchase", "created_at")
        read_only_fields = ("id", "user_name", "is_verified_purchase", "created_at")


class CreateReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ("product", "rating", "title", "body")
