from django.urls import path, include

urlpatterns = [
    path("auth/", include("apps.users.urls.auth")),
    path("users/", include("apps.users.urls.users")),
    path("categories/", include("apps.categories.urls")),
    path("sellers/", include("apps.sellers.urls")),
    path("products/", include("apps.products.urls")),
    path("brands/", include("apps.products.brand_urls")),
    path("cart/", include("apps.cart.urls")),
    path("wishlist/", include("apps.wishlist.urls")),
    path("orders/", include("apps.orders.urls")),
    path("payments/", include("apps.payments.urls")),
    path("shipping/", include("apps.shipping.urls")),
    path("reviews/", include("apps.reviews.urls")),
    path("promotions/", include("apps.promotions.urls")),
    path("notifications/", include("apps.notifications.urls")),
    path("homepage/", include("apps.products.homepage_urls")),
]
