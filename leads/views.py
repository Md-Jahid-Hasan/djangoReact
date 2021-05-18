from leads.models import Lead
from rest_framework import viewsets, permissions, authentication
from .serializers import LeadSerializer


class LeadViewSet(viewsets.ModelViewSet):
    queryset = Lead.objects.all()
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    authentication_classes = (authentication.TokenAuthentication,)
    serializer_class = LeadSerializer

    def get_queryset(self):
        print(self.request.user, "JAhid")
        return self.queryset.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
