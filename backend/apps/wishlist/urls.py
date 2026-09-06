from django.urls import path
from .views import WishlistView, WishlistItemDeleteView

urlpatterns = [
    path("", WishlistView.as_view(), name="wishlist"),
    path("items/", WishlistView.as_view(), name="wishlist-items"),
    path("items/<int:pk>/", WishlistItemDeleteView.as_view(), name="wishlist-item-delete"),
]
