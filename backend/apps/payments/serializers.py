from rest_framework import serializers
from .models import Payment


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ("id", "order", "amount", "currency", "provider", "status", "transaction_reference", "created_at")
        read_only_fields = fields


class InitiatePaymentSerializer(serializers.Serializer):
    order_id = serializers.IntegerField()
    provider = serializers.ChoiceField(choices=["mobile_money", "card", "bank_transfer", "cash_on_delivery"])
    payment_method = serializers.CharField(required=False, allow_blank=True)
