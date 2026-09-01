from django.db import models
from django.conf import settings
from apps.common.models import TimeStampedModel
from apps.products.models import Product


class Wishlist(TimeStampedModel):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="wishlist")

    class Meta:
        db_table = "wishlists"


class WishlistItem(TimeStampedModel):
    wishlist = models.ForeignKey(Wishlist, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    class Meta:
        db_table = "wishlist_items"
        unique_together = [("wishlist", "product")]
