from django.urls import path
from .api import CreateUserView, AuthTokenView, Logout, UserAPIView

app_name = 'account'

urlpatterns = [
    path('create/', CreateUserView.as_view(), name="create"),
    path('token/', AuthTokenView.as_view(), name="token"),
    path('logout/', Logout.as_view(), name="logout"),
    path('me/', UserAPIView.as_view(), name="me"),
]