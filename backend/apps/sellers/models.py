from django.db import models
from django.conf import settings
from django.utils.text import slugify
from apps.common.models import TimeStampedModel


class VerificationStatus(models.TextChoices):
    PENDING = "pending", "Pending"
    APPROVED = "approved", "Approved"
    REJECTED = "rejected", "Rejected"
    SUSPENDED = "suspended", "Suspended"


class Seller(TimeStampedModel):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="seller_profile"
    )
    store_name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, db_index=True)
    description = models.TextField(blank=True)
    logo = models.ImageField(upload_to="sellers/logos/", blank=True, null=True)
    banner = models.ImageField(upload_to="sellers/banners/", blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True)
    email = models.EmailField(blank=True)
    address = models.TextField(blank=True)
    city = models.CharField(max_length=100, blank=True)
    country = models.CharField(max_length=100, default="Uganda")
    verification_status = models.CharField(
        max_length=20, choices=VerificationStatus.choices, default=VerificationStatus.PENDING
    )
    commission_rate = models.DecimalField(max_digits=5, decimal_places=2, default=10.00)
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.00)
    total_sales = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = "sellers"
        indexes = [models.Index(fields=["slug"]), models.Index(fields=["verification_status"])]

    def __str__(self):
        return self.store_name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.store_name)
        super().save(*args, **kwargs)

    @property
    def is_approved(self):
        return self.verification_status == VerificationStatus.APPROVED
