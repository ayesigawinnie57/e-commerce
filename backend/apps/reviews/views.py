from rest_framework import generics, permissions, status
from drf_spectacular.utils import extend_schema
from apps.common.responses import success_response, error_response
from apps.orders.models import OrderItem
from .models import Review
from .serializers import ReviewSerializer, CreateReviewSerializer


@extend_schema(tags=["reviews"])
class ProductReviewListView(generics.ListAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        return Review.objects.filter(
            product_id=self.kwargs["product_id"], moderation_status="approved"
        ).select_related("user")

    def list(self, request, *args, **kwargs):
        return success_response(self.get_serializer(self.get_queryset(), many=True).data)


@extend_schema(tags=["reviews"])
class CreateReviewView(generics.CreateAPIView):
    serializer_class = CreateReviewSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        product = serializer.validated_data["product"]
        # Verify purchase
        purchased = OrderItem.objects.filter(
            order__user=request.user, product=product, order__status="delivered"
        ).exists()
        review = serializer.save(user=request.user, is_verified_purchase=purchased)
        return success_response(
            ReviewSerializer(review).data,
            message="Review submitted for moderation.",
            status_code=status.HTTP_201_CREATED,
        )
