from rest_framework import serializers
from .models import Product, ProductImage, ProductVariant, ProductSpecification, Brand


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ("id", "name", "slug", "logo")


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ("id", "image", "alt_text", "is_primary", "order")


class ProductVariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductVariant
        fields = ("id", "name", "value", "price_modifier", "stock", "sku")


class ProductSpecificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductSpecification
        fields = ("id", "name", "value")


class ProductListSerializer(serializers.ModelSerializer):
    primaryImage = serializers.SerializerMethodField()
    effective_price = serializers.ReadOnlyField()
    seller_name = serializers.CharField(source="seller.store_name", read_only=True)
    category_name = serializers.CharField(source="category.name", read_only=True)

    class Meta:
        model = Product
        fields = (
            "id", "name", "slug", "sku", "price", "discount_price", "effective_price",
            "stock", "status", "primaryImage", "seller_name", "category_name", "created_at",
        )

    def get_primaryImage(self, obj):
        img = obj.images.filter(is_primary=True).first() or obj.images.first()
        if not img:
            return None
        request = self.context.get("request")
        url = request.build_absolute_uri(img.image.url) if request else img.image.url
        return {"id": img.id, "url": url, "alt": img.alt_text, "isPrimary": img.is_primary, "order": img.order}


class ProductDetailSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    variants = ProductVariantSerializer(many=True, read_only=True)
    specifications = ProductSpecificationSerializer(many=True, read_only=True)
    brand = BrandSerializer(read_only=True)
    effective_price = serializers.ReadOnlyField()
    seller_name = serializers.CharField(source="seller.store_name", read_only=True)
    category_name = serializers.CharField(source="category.name", read_only=True)

    class Meta:
        model = Product
        fields = (
            "id", "name", "slug", "sku", "description", "price", "discount_price",
            "effective_price", "stock", "status", "brand", "seller_name", "category_name",
            "weight", "length", "width", "height",
            "images", "variants", "specifications", "created_at", "updated_at",
        )


class ProductWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = (
            "name", "description", "sku", "price", "discount_price",
            "stock", "status", "category", "brand", "weight", "length", "width", "height",
        )
