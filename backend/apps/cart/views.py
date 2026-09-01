from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from drf_spectacular.utils import extend_schema
from apps.common.responses import success_response, error_response
from apps.products.models import Product, ProductVariant
from .models import Cart, CartItem
from .serializers import CartSerializer, AddCartItemSerializer, UpdateCartItemSerializer


def _get_or_create_cart(user):
    cart, _ = Cart.objects.get_or_create(user=user)
    return cart


@extend_schema(tags=["cart"])
class CartView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        cart = _get_or_create_cart(request.user)
        return success_response(CartSerializer(cart).data)

    def delete(self, request):
        cart = _get_or_create_cart(request.user)
        cart.items.all().delete()
        return success_response(message="Cart cleared.")


@extend_schema(tags=["cart"])
class CartItemView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = AddCartItemSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        try:
            product = Product.objects.get(pk=data["product_id"], status="active")
        except Product.DoesNotExist:
            return error_response("Product not found or unavailable.")

        variant = None
        if data.get("variant_id"):
            try:
                variant = ProductVariant.objects.get(pk=data["variant_id"], product=product)
            except ProductVariant.DoesNotExist:
                return error_response("Variant not found.")

        available_stock = variant.stock if variant else product.stock
        if available_stock < data["quantity"]:
            return error_response(f"Only {available_stock} units available.")

        cart = _get_or_create_cart(request.user)
        item, created = CartItem.objects.get_or_create(
            cart=cart, product=product, variant=variant,
            defaults={"quantity": data["quantity"]},
        )
        if not created:
            new_qty = item.quantity + data["quantity"]
            if available_stock < new_qty:
                return error_response(f"Only {available_stock} units available.")
            item.quantity = new_qty
            item.save(update_fields=["quantity"])

        return success_response(CartSerializer(cart).data, status_code=status.HTTP_201_CREATED)

    def patch(self, request, pk):
        serializer = UpdateCartItemSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            item = CartItem.objects.select_related("product", "variant").get(
                pk=pk, cart__user=request.user
            )
        except CartItem.DoesNotExist:
            return error_response("Cart item not found.", status_code=status.HTTP_404_NOT_FOUND)

        stock = item.variant.stock if item.variant else item.product.stock
        qty = serializer.validated_data["quantity"]
        if stock < qty:
            return error_response(f"Only {stock} units available.")
        item.quantity = qty
        item.save(update_fields=["quantity"])
        return success_response(CartSerializer(item.cart).data)

    def delete(self, request, pk):
        try:
            item = CartItem.objects.get(pk=pk, cart__user=request.user)
        except CartItem.DoesNotExist:
            return error_response("Cart item not found.", status_code=status.HTTP_404_NOT_FOUND)
        item.delete()
        return success_response(message="Item removed.")
