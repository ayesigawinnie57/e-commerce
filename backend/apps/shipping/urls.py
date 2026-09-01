from django.urls import path
from .views import ShipmentDetailView

urlpatterns = [
    path("<int:pk>/", ShipmentDetailView.as_view(), name="shipment-detail"),
]
