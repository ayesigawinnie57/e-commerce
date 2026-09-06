from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.exceptions import TokenError
from drf_spectacular.utils import extend_schema
from apps.common.responses import success_response, error_response
from .serializers import RegisterSerializer, UserProfileSerializer
from .models import User


@extend_schema(tags=["auth"])
class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        tokens = _get_tokens(user)
        return success_response(
            data={**UserProfileSerializer(user).data, **tokens},
            message="Registration successful.",
            status_code=status.HTTP_201_CREATED,
        )


@extend_schema(tags=["auth"])
class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        from django.contrib.auth import authenticate
        email = request.data.get("email", "").lower().strip()
        password = request.data.get("password", "")
        user = authenticate(request, username=email, password=password)
        if not user:
            return error_response("Invalid credentials.", status_code=status.HTTP_401_UNAUTHORIZED)
        if not user.is_active:
            return error_response("Account is disabled.", status_code=status.HTTP_403_FORBIDDEN)
        tokens = _get_tokens(user)
        return success_response(
            data={**UserProfileSerializer(user).data, **tokens},
            message="Login successful.",
        )


@extend_schema(tags=["auth"])
class LogoutView(APIView):
    def post(self, request):
        refresh_token = request.data.get("refresh")
        if not refresh_token:
            return error_response("Refresh token is required.")
        try:
            token = RefreshToken(refresh_token)
            token.blacklist()
        except TokenError:
            return error_response("Invalid or expired token.")
        return success_response(message="Logged out successfully.")


@extend_schema(tags=["auth"])
class MeView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer

    def get_object(self):
        return self.request.user

    def retrieve(self, request, *args, **kwargs):
        serializer = self.get_serializer(self.get_object())
        return success_response(data=serializer.data)

    def update(self, request, *args, **kwargs):
        kwargs["partial"] = True
        serializer = self.get_serializer(self.get_object(), data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return success_response(data=serializer.data, message="Profile updated.")


def _get_tokens(user):
    refresh = RefreshToken.for_user(user)
    return {"access": str(refresh.access_token), "refresh": str(refresh)}
