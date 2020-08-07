"""This module defines the routes for the authentication resources."""
from django.urls import path
from authentication.views import RegisterView

urlpatterns = [
    path('register/', RegisterView.as_view())
]
