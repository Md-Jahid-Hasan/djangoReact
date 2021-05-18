from rest_framework import generics, authentication, permissions, status
from .serializers import UserSerializer, AuthTokenSerializer
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.settings import api_settings
from rest_framework.views import APIView
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response


class CreateUserView(generics.CreateAPIView):
    serializer_class = UserSerializer


class AuthTokenView(ObtainAuthToken):
    serializer_class = AuthTokenSerializer
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES


class Logout(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (authentication.TokenAuthentication,)

    def get(self, request):
        a = request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)


class UserAPIView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (authentication.TokenAuthentication,)

    def get_object(self):
        return self.request.user
