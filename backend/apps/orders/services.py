from decimal import Decimal
from django.db import transaction
from apps.cart.models import Cart
from apps.products.models import Product
from .models import Order, OrderItem, OrderAddress


DELIVERY_FEE = Decimal("5000.00")  # UGX flat rate — replace with real logic
TAX_RATE = Decimal("0.00")         # 0% — adjust per jurisdiction


def checkout(user, address_data: dict, notes: str = "", coupon_code: str = "") -> Order:
    with transaction.atomic():
        try:
            cart = Cart.objects.prefetch_related(
                "items__product", "items__variant"
            ).select_for_update().get(user=user)
        except Cart.DoesNotExist:
            raise ValueError("Cart not found.")

        items = list(cart.items.all())
        if not items:
            raise ValueError("Cart is empty.")

        # Validate stock and lock rows
        for item in items:
            product = Product.objects.select_for_update().get(pk=item.product_id)
            if product.status != "active":
                raise ValueError(f"'{product.name}' is no longer available.")
            stock = item.variant.stock if item.variant else product.stock
            if stock < item.quantity:
                raise ValueError(f"Insufficient stock for '{product.name}'.")

        # Calculate totals server-side
        subtotal = sum(item.line_total for item in items)
        discount = Decimal("0.00")  # coupon logic goes here
        tax = (subtotal * TAX_RATE).quantize(Decimal("0.01"))
        total = subtotal - discount + DELIVERY_FEE + tax

        order = Order.objects.create(
            user=user,
            subtotal=subtotal,
            discount=discount,
            delivery_fee=DELIVERY_FEE,
            tax=tax,
            total=total,
            notes=notes,
        )

        OrderAddress.objects.create(order=order, **address_data)

        for item in items:
            variant_info = f"{item.variant.name}: {item.variant.value}" if item.variant else ""
            OrderItem.objects.create(
                order=order,
                product=item.product,
                variant=item.variant,
                product_name=item.product.name,
                variant_info=variant_info,
                unit_price=item.unit_price,
                quantity=item.quantity,
                line_total=item.line_total,
            )
            # Decrement stock
            if item.variant:
                item.variant.__class__.objects.filter(pk=item.variant.pk).update(
                    stock=item.variant.stock - item.quantity
                )
            else:
                item.product.__class__.objects.filter(pk=item.product.pk).update(
                    stock=item.product.stock - item.quantity
                )

        cart.items.all().delete()
        return order
