from rest_framework import serializers
from .models import Category


class CategorySerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ("id", "name", "slug", "description", "image", "parent", "children", "is_active")

    def get_children(self, obj):
        return CategorySerializer(
            obj.children.filter(is_active=True), many=True, context=self.context
        ).data
