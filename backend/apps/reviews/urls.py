from django.urls import path
from .views import ProductReviewListView, CreateReviewView

urlpatterns = [
    path("", CreateReviewView.as_view(), name="review-create"),
    path("products/<int:product_id>/", ProductReviewListView.as_view(), name="product-reviews"),
]
