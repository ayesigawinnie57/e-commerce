from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator
from apps.common.models import TimeStampedModel
from apps.products.models import Product
from apps.orders.models import OrderItem


class ModerationStatus(models.TextChoices):
    PENDING = "pending", "Pending"
    APPROVED = "approved", "Approved"
    REJECTED = "rejected", "Rejected"


class Review(TimeStampedModel):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="reviews")
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="reviews")
    order_item = models.OneToOneField(OrderItem, on_delete=models.SET_NULL, null=True, blank=True)
    rating = models.PositiveSmallIntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    title = models.CharField(max_length=200, blank=True)
    body = models.TextField(blank=True)
    moderation_status = models.CharField(
        max_length=20, choices=ModerationStatus.choices, default=ModerationStatus.PENDING
    )
    is_verified_purchase = models.BooleanField(default=False)

    class Meta:
        db_table = "reviews"
        unique_together = [("user", "product")]
        indexes = [models.Index(fields=["product"]), models.Index(fields=["moderation_status"])]

    def __str__(self):
        return f"Review({self.product.name}, {self.rating}★)"
