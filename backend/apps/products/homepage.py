from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from drf_spectacular.utils import extend_schema
from django.utils import timezone

from apps.products.models import Product
from apps.products.serializers import ProductListSerializer
from apps.categories.models import Category
from apps.categories.serializers import CategorySerializer


@extend_schema(tags=["homepage"])
class HomepageView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        active_qs = Product.objects.filter(status="active").select_related(
            "seller", "category", "brand"
        ).prefetch_related("images")

        # Categories
        categories = Category.objects.filter(is_active=True, parent=None).order_by("name")[:12]

        # Flash deals — products with a discount price
        flash_deals = active_qs.filter(discount_price__isnull=False).order_by("-created_at")[:10]

        # Popular products — highest stock as proxy until sold_count field exists
        popular = active_qs.order_by("-created_at")[:10]

        # Trending — same queryset, different slice (extend when view_count field added)
        trending = active_qs.order_by("?")[:10]

        # Category sections — top 3 categories with products
        cat_sections = []
        for cat in Category.objects.filter(is_active=True, parent=None).order_by("name")[:3]:
            products = active_qs.filter(category=cat)[:8]
            if products.exists():
                cat_sections.append({
                    "category": CategorySerializer(cat, context={"request": request}).data,
                    "products": ProductListSerializer(products, many=True, context={"request": request}).data,
                })

        ctx = {"request": request}
        return Response({
            "heroBanners": [],
            "categories": CategorySerializer(categories, many=True, context=ctx).data,
            "flashDeals": {
                "products": ProductListSerializer(flash_deals, many=True, context=ctx).data,
                "endsAt": None,
            },
            "popularProducts": ProductListSerializer(popular, many=True, context=ctx).data,
            "trendingProducts": ProductListSerializer(trending, many=True, context=ctx).data,
            "promotionalBanner": None,
            "categorySections": cat_sections,
            "brands": [],
        })
