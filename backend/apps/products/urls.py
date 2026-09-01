from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, BrandViewSet

router = DefaultRouter()
router.register("brands", BrandViewSet, basename="brand")
router.register("", ProductViewSet, basename="product")
urlpatterns = router.urls
