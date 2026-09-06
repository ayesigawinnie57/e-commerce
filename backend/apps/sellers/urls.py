from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import SellerViewSet, SellerRegisterView

router = DefaultRouter()
router.register("", SellerViewSet, basename="seller")

urlpatterns = [
    path("register/", SellerRegisterView.as_view(), name="seller-register"),
] + router.urls
