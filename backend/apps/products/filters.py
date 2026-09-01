import django_filters
from .models import Product


class ProductFilter(django_filters.FilterSet):
    min_price = django_filters.NumberFilter(field_name="price", lookup_expr="gte")
    max_price = django_filters.NumberFilter(field_name="price", lookup_expr="lte")
    category = django_filters.CharFilter(field_name="category__slug")
    seller = django_filters.NumberFilter(field_name="seller__id")
    brand = django_filters.CharFilter(field_name="brand__slug")

    class Meta:
        model = Product
        fields = ["status", "category", "seller", "brand", "min_price", "max_price"]
