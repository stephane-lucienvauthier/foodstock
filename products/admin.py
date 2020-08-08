"""This module manages the admin section for the products app."""
from django.contrib import admin
from .models import Product

admin.site.register(Product)
