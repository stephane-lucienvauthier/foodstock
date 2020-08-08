"""This module defines the routes for the products resources."""
from django.urls import path
from products.views import ProductView, ProductDetail

urlpatterns = [
    path('', ProductView.as_view()),
    path('<int:pk>', ProductDetail.as_view())
]
