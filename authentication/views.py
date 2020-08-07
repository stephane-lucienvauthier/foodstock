"""This module manages the views of the authentication app."""
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status
from django.contrib.auth.hashers import make_password
from authentication.serializers import RegisterSerializer


class RegisterView(APIView):
    """This class manages the view for the register resources."""

    def post(self, request: Request, format=None) -> Response:
        """
        Registrer a new user.

        Args:
            request (Request): The api request.
            format (NoneType): The suffix format to retrieve the result. Always none. 
                               The format of result is managed by the Accept header.

        Returns:
            201: The user is created.
            400: An error is detected on the request data.
            406: The response format is not acceptable by the server.
            500: An error was occured in the treatment of the request.
        """
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            instance = serializer.save()
            instance.set_password(instance.password)
            instance.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
