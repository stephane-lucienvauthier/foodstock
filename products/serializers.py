"""This module defines the serializers for the products app."""
from rest_framework import serializers
from products.models import Product


class ProductSerializer(serializers.ModelSerializer):
    """This class defines the serializer for the products view."""

    def to_representation(self, obj):
        """Format the representation to send result."""
        representation = super(ProductSerializer, self).to_representation(obj)
        representation['category'] = obj.category.label
        return representation

    class Meta:
        """
         This class defines the validation metadata for the products view.
        
        Attributes:
            model (Model): The model linked to the serializer.
            fields (list(str)): The field list expencted by the serializer.
        """

        model = Product
        fields = ['id', 'label', 'unit', 'category', 'icon']
