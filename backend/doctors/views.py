from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import Hospital, Doctor
from treatments.models import Request
from patients.models import Patient
from treatments.serializers import RequestSerializer, TreatmentSerializer
from .serializers import HospitalSerializer, DoctorSerializer

#Create your views here.

class RequestPatientData(generics.CreateAPIView):
    serializer_class = RequestSerializer
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception = True)

        patient_username = serializer.validated_data.get('patient')['username']
        doctor_username = serializer.validated_data.get('doctor')['username']

        if not Patient.objects.filter(username = patient_username).exists():
            return Response({'ResponseCode': 400, 'error': 'No patient found'})

        if not Doctor.objects.filter(username = doctor_username).exists():
            return Response({'ResponseCode': 400, 'error': 'No doctor found'})

        self.perform_create(serializer)
        return Response({'id': serializer.instance.id, 'responseCode': 201})

class CreateTreatmentView(generics.CreateAPIView):
    def post(self, request):
        patient_username = request.data.get('patient_username')
        doctor_username = request.data.get('doctor_username')
        disease = request.data.get('disease')

        # Retrieve patient and doctor objects
        try:
            patient = Patient.objects.get(username = patient_username)
            doctor = Doctor.objects.get(username=doctor_username)
        except Patient.DoesNotExist or Doctor.DoesNotExist:
            return Response({'error': 'Patient or doctor not found'}, status=404)

        # Create the treatment object
        serializer = TreatmentSerializer(data={
            'patient': patient.pk,  # Use primary key for relationships
            'doctor': doctor.pk,
            'disease': disease
        })

        if serializer.is_valid():
            serializer.save()
            # return Response(serializer.data, status=201)
            return Response({'responseCode': 200, 'status': 'Treatment created', 'treatment': serializer.data})
        else:
            #return Response(serializer.errors, status=400)
            return Response({'responseCode': 400, 'status': serializer.errors})
