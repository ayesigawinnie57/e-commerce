from django.db import models
from apps.common.models import TimeStampedModel
from apps.orders.models import Order


class PaymentStatus(models.TextChoices):
    PENDING = "pending", "Pending"
    PROCESSING = "processing", "Processing"
    SUCCESSFUL = "successful", "Successful"
    FAILED = "failed", "Failed"
    CANCELLED = "cancelled", "Cancelled"
    REFUNDED = "refunded", "Refunded"


class PaymentProvider(models.TextChoices):
    MOBILE_MONEY = "mobile_money", "Mobile Money"
    CARD = "card", "Card"
    BANK_TRANSFER = "bank_transfer", "Bank Transfer"
    CASH_ON_DELIVERY = "cash_on_delivery", "Cash on Delivery"


class Payment(TimeStampedModel):
    order = models.OneToOneField(Order, on_delete=models.PROTECT, related_name="payment")
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    currency = models.CharField(max_length=10, default="UGX")
    provider = models.CharField(max_length=30, choices=PaymentProvider.choices)
    payment_method = models.CharField(max_length=100, blank=True)
    transaction_reference = models.CharField(max_length=200, unique=True, null=True, blank=True, db_index=True)
    provider_reference = models.CharField(max_length=200, blank=True)
    status = models.CharField(max_length=20, choices=PaymentStatus.choices, default=PaymentStatus.PENDING)
    metadata = models.JSONField(default=dict, blank=True)

    class Meta:
        db_table = "payments"
        indexes = [models.Index(fields=["transaction_reference"]), models.Index(fields=["status"])]

    def __str__(self):
        return f"Payment({self.order.order_number}, {self.status})"
