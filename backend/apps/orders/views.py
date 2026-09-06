from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from drf_spectacular.utils import extend_schema
from apps.common.responses import success_response, error_response
from .models import Order
from .serializers import OrderSerializer, CheckoutSerializer
from .services import checkout


@extend_schema(tags=["orders"])
class CheckoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = CheckoutSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        address_data = {k: data[k] for k in (
            "full_name", "phone", "address_line1", "address_line2",
            "city", "district", "country",
        ) if k in data}
        try:
            order = checkout(
                user=request.user,
                address_data=address_data,
                notes=data.get("notes", ""),
                coupon_code=data.get("coupon_code", ""),
            )
        except ValueError as e:
            return error_response(str(e))
        return success_response(
            OrderSerializer(order).data,
            message="Order placed successfully.",
            status_code=status.HTTP_201_CREATED,
        )


@extend_schema(tags=["orders"])
class OrderListView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).prefetch_related("items", "address").order_by("-created_at")

    def list(self, request, *args, **kwargs):
        qs = self.get_queryset()
        serializer = self.get_serializer(qs, many=True)
        return success_response(serializer.data)


@extend_schema(tags=["orders"])
class OrderDetailView(generics.RetrieveAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).prefetch_related("items", "address")

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        return success_response(self.get_serializer(instance).data)
