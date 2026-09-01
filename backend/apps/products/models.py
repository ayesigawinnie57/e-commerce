from django.db import models
from django.utils.text import slugify
from apps.common.models import TimeStampedModel
from apps.categories.models import Category
from apps.sellers.models import Seller


class ProductStatus(models.TextChoices):
    DRAFT = "draft", "Draft"
    ACTIVE = "active", "Active"
    INACTIVE = "inactive", "Inactive"
    OUT_OF_STOCK = "out_of_stock", "Out of Stock"


class Brand(TimeStampedModel):
    name = models.CharField(max_length=200, unique=True)
    slug = models.SlugField(unique=True, db_index=True)
    logo = models.ImageField(upload_to="brands/", blank=True, null=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = "brands"

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class Product(TimeStampedModel):
    seller = models.ForeignKey(Seller, on_delete=models.CASCADE, related_name="products")
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name="products")
    brand = models.ForeignKey(Brand, on_delete=models.SET_NULL, null=True, blank=True, related_name="products")
    name = models.CharField(max_length=500, db_index=True)
    slug = models.SlugField(max_length=550, unique=True, db_index=True)
    description = models.TextField(blank=True)
    sku = models.CharField(max_length=100, unique=True, db_index=True)
    price = models.DecimalField(max_digits=12, decimal_places=2)
    discount_price = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    stock = models.PositiveIntegerField(default=0)
    status = models.CharField(max_length=20, choices=ProductStatus.choices, default=ProductStatus.DRAFT)
    view_count = models.PositiveIntegerField(default=0, db_index=True)
    sold_count = models.PositiveIntegerField(default=0, db_index=True)
    weight = models.DecimalField(max_digits=8, decimal_places=3, null=True, blank=True, help_text="kg")
    length = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True, help_text="cm")
    width = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True, help_text="cm")
    height = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True, help_text="cm")

    class Meta:
        db_table = "products"
        indexes = [
            models.Index(fields=["slug"]),
            models.Index(fields=["sku"]),
            models.Index(fields=["status"]),
            models.Index(fields=["seller"]),
            models.Index(fields=["category"]),
            models.Index(fields=["-created_at"]),
        ]

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    @property
    def effective_price(self):
        return self.discount_price if self.discount_price else self.price

    @property
    def is_in_stock(self):
        return self.stock > 0


class ProductImage(TimeStampedModel):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to="products/images/")
    alt_text = models.CharField(max_length=200, blank=True)
    is_primary = models.BooleanField(default=False)
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        db_table = "product_images"
        ordering = ["order", "id"]


class ProductVariant(TimeStampedModel):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="variants")
    name = models.CharField(max_length=100, help_text="e.g. Color, Size, Storage")
    value = models.CharField(max_length=100, help_text="e.g. Red, XL, 128GB")
    price_modifier = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    stock = models.PositiveIntegerField(default=0)
    sku = models.CharField(max_length=100, unique=True, db_index=True)

    class Meta:
        db_table = "product_variants"
        unique_together = [("product", "name", "value")]

    def __str__(self):
        return f"{self.product.name} — {self.name}: {self.value}"


class ProductSpecification(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="specifications")
    name = models.CharField(max_length=200)
    value = models.CharField(max_length=500)

    class Meta:
        db_table = "product_specifications"
