from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema
from .models import Product, Brand
from .serializers import ProductListSerializer, ProductDetailSerializer, ProductWriteSerializer, BrandSerializer
from .filters import ProductFilter
from apps.sellers.permissions import IsApprovedSeller


@extend_schema(tags=["products"])
class ProductViewSet(viewsets.ModelViewSet):
    filterset_class = ProductFilter
    search_fields = ["name", "description", "sku", "brand__name"]
    ordering_fields = ["price", "created_at", "name", "stock", "view_count", "sold_count"]
    ordering = ["-created_at"]

    def get_queryset(self):
        qs = Product.objects.select_related("seller", "category", "brand").prefetch_related("images")
        if self.action in ("list", "featured", "flash_sales"):
            return qs.filter(status="active")
        return qs

    def get_serializer_class(self):
        if self.action in ("create", "update", "partial_update"):
            return ProductWriteSerializer
        if self.action == "retrieve":
            return ProductDetailSerializer
        return ProductListSerializer

    def get_permissions(self):
        if self.action in ("list", "retrieve", "featured", "flash_sales"):
            return [permissions.AllowAny()]
        return [IsApprovedSeller()]

    def perform_create(self, serializer):
        serializer.save(seller=self.request.user.seller_profile)

    @extend_schema(responses=ProductListSerializer(many=True))
    @action(detail=False, methods=["get"], url_path="featured")
    def featured(self, request):
        qs = self.get_queryset().order_by("-created_at")[:12]
        return Response(ProductListSerializer(qs, many=True, context={"request": request}).data)

    @extend_schema(responses=ProductListSerializer(many=True))
    @action(detail=False, methods=["get"], url_path="flash-sales")
    def flash_sales(self, request):
        qs = self.get_queryset().filter(discount_price__isnull=False).order_by("-created_at")[:12]
        return Response(ProductListSerializer(qs, many=True, context={"request": request}).data)


@extend_schema(tags=["products"])
class BrandViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Brand.objects.filter(is_active=True).order_by("name")
    serializer_class = BrandSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = "slug"
