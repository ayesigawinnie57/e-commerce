from rest_framework import viewsets, permissions
from drf_spectacular.utils import extend_schema
from .models import Category
from .serializers import CategorySerializer


@extend_schema(tags=["categories"])
class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.filter(is_active=True, parent=None).prefetch_related("children").order_by("name")
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = "slug"
    pagination_class = None
