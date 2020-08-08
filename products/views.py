"""This module manages the views of the categories app."""
from rest_framework import generics, permissions
from products.models import Product
from products.serializers import ProductSerializer


class ProductView(generics.ListCreateAPIView):
    """
    This class manages the view to create and list the products.

    Attributes:
        permission_classes (list(Permissions)): The options to access at this resource.
        serializer_class (Serializer): The serializer to bind the request and the response object.

    Returns:
            200: The list of products.
            201: The product is created.
            400: An error is detected on the request data.
            401: The user must be connected to access this resource.
            406: The response format is not acceptable by the server.
            500: An error was occured in the treatment of the request. 
    """

    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ProductSerializer

    def get_queryset(self):
        """Return the category list of the owner."""
        return Product.objects.filter(owner=self.request.user)  # pylint: disable=no-member

    def perform_create(self, serializer):
        """Add the owner of the category before create it."""
        serializer.save(owner=self.request.user)


class ProductDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    This class manages the view to update and delete a product.

    Attributes:
        permission_classes (list(Permissions)): The options to access at this resource.
        serializer_class (Serializer): The serializer to bind the request and the response object.

    Returns:
            200: The product is updated.
            204: The product is deleted.
            400: An error is detected on the request data.
            401: The user must be connected to access this resource.
            406: The response format is not acceptable by the server.
            500: An error was occured in the treatment of the request.
    """

    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ProductSerializer

    def get_queryset(self):
        """Return the product of the owner."""
        return Product.objects.filter(owner=self.request.user, pk=self.kwargs['pk'])  # pylint: disable=no-member

    def perform_update(self, serializer):
        """Update the owner of the product before update it."""
        serializer.save(owner=self.request.user)
