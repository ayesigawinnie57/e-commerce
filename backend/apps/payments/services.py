import uuid
from .models import Payment, PaymentStatus


def initiate_payment(order, provider: str, payment_method: str = "") -> Payment:
    """Create a pending payment record. Provider integration hooks in here."""
    payment, _ = Payment.objects.get_or_create(
        order=order,
        defaults={
            "amount": order.total,
            "provider": provider,
            "payment_method": payment_method,
            "transaction_reference": str(uuid.uuid4()),
            "status": PaymentStatus.PENDING,
        },
    )
    return payment


def confirm_payment(transaction_reference: str) -> Payment:
    """Called by webhook or manual confirmation."""
    payment = Payment.objects.select_related("order").get(
        transaction_reference=transaction_reference
    )
    payment.status = PaymentStatus.SUCCESSFUL
    payment.save(update_fields=["status", "updated_at"])
    # Update order status
    payment.order.status = "confirmed"
    payment.order.save(update_fields=["status"])
    return payment
