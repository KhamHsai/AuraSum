from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, ReceiptViewSet

router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'receipts', ReceiptViewSet, basename='receipt')

urlpatterns = [
    path('', include(router.urls)),
]
