from rest_framework import routers
from .views import LeadViewSet
from django.urls import path, include

router = routers.DefaultRouter()
router.register('leads', LeadViewSet)

app_name = 'leads'

urlpatterns = [
    path('', include(router.urls)),
]
