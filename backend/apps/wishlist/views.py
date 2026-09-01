from rest_framework.views import APIView
from rest_framework import permissions, status
from drf_spectacular.utils import extend_schema
from apps.common.responses import success_response, error_response
from apps.products.models import Product
from .models import Wishlist, WishlistItem
from .serializers import WishlistSerializer, AddWishlistItemSerializer


def _get_or_create_wishlist(user):
    wishlist, _ = Wishlist.objects.get_or_create(user=user)
    return wishlist


@extend_schema(tags=["wishlist"])
class WishlistView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        wishlist = _get_or_create_wishlist(request.user)
        return success_response(WishlistSerializer(wishlist).data)

    def post(self, request):
        serializer = AddWishlistItemSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            product = Product.objects.get(pk=serializer.validated_data["product_id"])
        except Product.DoesNotExist:
            return error_response("Product not found.", status_code=status.HTTP_404_NOT_FOUND)
        wishlist = _get_or_create_wishlist(request.user)
        WishlistItem.objects.get_or_create(wishlist=wishlist, product=product)
        return success_response(WishlistSerializer(wishlist).data, status_code=status.HTTP_201_CREATED)


@extend_schema(tags=["wishlist"])
class WishlistItemDeleteView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, pk):
        try:
            item = WishlistItem.objects.get(pk=pk, wishlist__user=request.user)
        except WishlistItem.DoesNotExist:
            return error_response("Item not found.", status_code=status.HTTP_404_NOT_FOUND)
        item.delete()
        return success_response(message="Removed from wishlist.")
