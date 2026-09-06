from django.urls import path
from .views import InitiatePaymentView, PaymentDetailView

urlpatterns = [
    path("", InitiatePaymentView.as_view(), name="payment-initiate"),
    path("<int:pk>/", PaymentDetailView.as_view(), name="payment-detail"),
]
