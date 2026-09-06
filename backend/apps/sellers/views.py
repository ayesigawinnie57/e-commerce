from rest_framework import viewsets, permissions, generics, status
from drf_spectacular.utils import extend_schema
from apps.common.responses import success_response
from .models import Seller
from .serializers import SellerSerializer, SellerCreateSerializer
from .permissions import IsSellerOwner


@extend_schema(tags=["sellers"])
class SellerViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Seller.objects.filter(is_active=True, verification_status="approved")
    serializer_class = SellerSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = "slug"


@extend_schema(tags=["sellers"])
class SellerRegisterView(generics.CreateAPIView):
    serializer_class = SellerCreateSerializer

    def perform_create(self, serializer):
        seller = serializer.save(user=self.request.user)
        self.request.user.role = "seller"
        self.request.user.save(update_fields=["role"])
        return seller

    def create(self, request, *args, **kwargs):
        if hasattr(request.user, "seller_profile"):
            from apps.common.responses import error_response
            return error_response("You already have a seller account.")
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return success_response(
            data=serializer.data,
            message="Seller account created. Pending approval.",
            status_code=status.HTTP_201_CREATED,
        )
