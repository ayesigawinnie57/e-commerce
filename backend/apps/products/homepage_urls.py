from django.urls import path
from .homepage import HomepageView

urlpatterns = [
    path("", HomepageView.as_view(), name="homepage"),
]
