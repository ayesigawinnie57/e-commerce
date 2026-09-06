from rest_framework.views import APIView
from rest_framework import permissions, status
from drf_spectacular.utils import extend_schema
from apps.common.responses import success_response, error_response
from apps.orders.models import Order
from .models import Payment
from .serializers import PaymentSerializer, InitiatePaymentSerializer
from .services import initiate_payment


@extend_schema(tags=["payments"])
class InitiatePaymentView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = InitiatePaymentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        try:
            order = Order.objects.get(pk=data["order_id"], user=request.user)
        except Order.DoesNotExist:
            return error_response("Order not found.", status_code=status.HTTP_404_NOT_FOUND)
        payment = initiate_payment(order, data["provider"], data.get("payment_method", ""))
        return success_response(PaymentSerializer(payment).data, status_code=status.HTTP_201_CREATED)


@extend_schema(tags=["payments"])
class PaymentDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, pk):
        try:
            payment = Payment.objects.get(pk=pk, order__user=request.user)
        except Payment.DoesNotExist:
            return error_response("Payment not found.", status_code=status.HTTP_404_NOT_FOUND)
        return success_response(PaymentSerializer(payment).data)
