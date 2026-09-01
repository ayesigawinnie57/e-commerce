from rest_framework import generics, permissions
from drf_spectacular.utils import extend_schema
from apps.common.responses import success_response
from .models import Shipment
from .serializers import ShipmentSerializer


@extend_schema(tags=["shipping"])
class ShipmentDetailView(generics.RetrieveAPIView):
    serializer_class = ShipmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Shipment.objects.filter(order__user=self.request.user)

    def retrieve(self, request, *args, **kwargs):
        return success_response(self.get_serializer(self.get_object()).data)
