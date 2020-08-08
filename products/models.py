"""This module defines the models of the products app."""
from django.db import models
from django.contrib.auth.models import User
from categories.models import Category


class Product(models.Model):
    """
    This class defines the product model.

    Attributes:
        owner (User): The product owner.
        category (Category): the product category.
        label (str):  The product label.
        unit (str): The product unit.
        icon (str): The product icon.
    """

    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    label = models.CharField(max_length=50)
    unit = models.CharField(max_length=10)
    icon = models.TextField(null=True)
    
    def __str__(self):
        """Return the value when the model is called directly."""
        return self.label

    class Meta:
        """
        This class defines metadata for the model.

        Attributes:
            ordering (list(str)): The list to sort a list of models.
        """

        ordering = ['label']
