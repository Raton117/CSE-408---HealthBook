from rest_framework import generics, permissions, status
from rest_framework.response import Response

from .models import Prescription
from .serializers import PrescriptionSerializer

# Create your views here.

class GetPrescriptionView(generics.RetrieveAPIView):
    def retrieve(self, request, *args, **kwargs):
        id = request.GET.get('id', None)
        prescription = Prescription.objects.filter(pk = id).first()
        return Response({'responseCode' : '200', 'prescription': PrescriptionSerializer(prescription).data})