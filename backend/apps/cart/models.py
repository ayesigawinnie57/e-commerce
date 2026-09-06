from django.db import models
from django.conf import settings
from apps.common.models import TimeStampedModel
from apps.products.models import Product, ProductVariant


class Cart(TimeStampedModel):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="cart")

    class Meta:
        db_table = "carts"

    def __str__(self):
        return f"Cart({self.user.email})"

    @property
    def total(self):
        return sum(item.line_total for item in self.items.all())

    @property
    def item_count(self):
        return self.items.count()


class CartItem(TimeStampedModel):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    variant = models.ForeignKey(ProductVariant, on_delete=models.SET_NULL, null=True, blank=True)
    quantity = models.PositiveIntegerField(default=1)

    class Meta:
        db_table = "cart_items"
        unique_together = [("cart", "product", "variant")]

    def __str__(self):
        return f"{self.quantity}x {self.product.name}"

    @property
    def unit_price(self):
        base = self.product.effective_price
        if self.variant:
            base += self.variant.price_modifier
        return base

    @property
    def line_total(self):
        return self.unit_price * self.quantity
