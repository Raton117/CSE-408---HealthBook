from rest_framework import generics, permissions, status
from rest_framework.response import Response
from datetime import date
from .models import (
    Patient,
)
from .serializers import (
    PatientSerializer,
    PatientSignupSerializer,
    PatientLoginSerializer,
    PatientUpdateSerializer,
)

# from ..doctors.models import Doctor, Hospital
# from ..doctors.serializers import HospitalSerializer, DoctorSerializer
from doctors.models import Doctor, Hospital
from doctors.serializers import HospitalSerializer, DoctorSerializer
from treatments.models import Request, Prescription
from treatments.serializers import RequestSerializer, PrescriptionSerializer
from django.http.response import JsonResponse
from django.utils.dateparse import parse_date

# Create your views here.

class PatientSignupView(generics.CreateAPIView):
    serializer_class = PatientSignupSerializer

    def create(self, request, *args, **kwargs):

        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception = True)

        username = serializer.validated_data['username']

        if Patient.objects.filter(username = username).exists():
            return Response({'error': 'Username is already taken', 'responseCode': 400}, status = status.HTTP_400_BAD_REQUEST)

        email = serializer.validated_data['email']
        if Patient.objects.filter(email = email).exists():
            return Response({'error': 'Email is already taken', 'responseCode': 400}, status = status.HTTP_400_BAD_REQUEST)

        phone_number = serializer.validated_data['phone_number']
        if Patient.objects.filter(phone_number = phone_number).exists():
            return Response({'error': 'Phone Number is already taken', 'responseCode': 400}, status = status.HTTP_400_BAD_REQUEST)

        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response({'username': serializer.instance.username, 'responseCode': 201}, status = status.HTTP_201_CREATED, headers = headers)

class PatientLoginView(generics.GenericAPIView):
    serializer_class = PatientLoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data = request.data)

        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']

            patient = Patient.objects.filter(username = username, password = password).first()

            if patient is not None:
                return Response({'responseCode': 200, 'username': username})
                # dynamic_attributes = ['username', 'password', 'name', 'email', 'phone_number', 'dob', 'age', 'area']
                # return Response({'responseCode': 200, 'patient': PatientSerializer(patient, fields = dynamic_attributes).data})
            else:
                return Response({'responseCode': 401})

        return Response({'responseCode': 400}, serializer.errors, status = status.HTTP_400_BAD_REQUEST)

class PatientProfileView(generics.RetrieveAPIView):
    def retrieve(self, request, *args, **kwargs):
        username = request.GET.get('username', None)
        requesting_username = request.GET.get('requesting_username', None)
        print(username)
        print(requesting_username)

        patient = Patient.objects.filter(username = username).first()

        if patient is not None:
            if username == requesting_username:
                dynamic_attributes = ['username', 'password', 'name', 'email', 'phone_number', 'dob', 'area']
                return Response({'responseCode': 200, 'patient': PatientSerializer(patient, fields = dynamic_attributes).data})
            else:
                dynamic_attributes = ['username', 'password', 'name', 'email', 'area']
                return Response({'responseCode': 200, 'patient': PatientSerializer(patient, fields = dynamic_attributes).data})

        return Response({'responseCode': 400}, status = status.HTTP_400_BAD_REQUEST)

class PatientUpdateProfileView(generics.UpdateAPIView):
    serializer_class = PatientUpdateSerializer

    def update(self, request, *args, **kwargs):
        username = request.data['username']
        email = request.data['email']
        phone_number = request.data['phone_number']
        password = request.data['password']
        patient = Patient.objects.filter(username = username).first()
        other_patients = Patient.objects.exclude(username = username)
        if patient is None:
            return Response({"error": "Patient doesn't exist", "responseCode": 400}, status = status.HTTP_400_BAD_REQUEST)
        if other_patients.filter(email = email).exists():
            return Response({'error': 'Email is already taken', 'responseCode': 400}, status = status.HTTP_400_BAD_REQUEST)
        if other_patients.filter(phone_number = phone_number).exists():
            return Response({'error': 'Phone Number is already taken', 'responseCode': 400}, status = status.HTTP_400_BAD_REQUEST)
        if password != patient.password:
            return Response({'error': 'Password Mismatch', 'responseCode': 400}, status = status.HTTP_400_BAD_REQUEST)
        
        patient.email = email
        patient.phone_number = phone_number
        patient.name = request.data['name']
        patient.area = request.data['area']
        patient.dob = request.data['dob']
        patient.save()

        return Response({'ResponseCode': 200, 'status': 'Patient Updated successfully'})
        

class ListofDoctors(generics.ListAPIView):
    def list(self, request, *args, **kwargs):
        department = request.GET.get('department', None)
        designation = request.GET.get('designation', None)
        area = request.GET.get('area', None)
        name = request.GET.get('name', None)

        doctors = Doctor.objects.all()
        if department:
            doctors = doctors.filter(department = department)

        if designation:
            doctors = doctors.filter(designation = designation)

        if area:
            doctors = doctors.filter(consultency__clinic__area = area)

        if name:
            doctors = doctors.filter(name = name)

        dynamic_attributes = ['username', 'name', 'hospital_name', 'department', 'designation', 'consultency']
        return Response({'ResponseCode': 200, 'doctors': DoctorSerializer(doctors, fields = dynamic_attributes, many = True).data})

class DoctorProfile(generics.RetrieveAPIView):
    def retrieve(self, request, *args, **kwargs):
        username = request.GET.get('username', None)
        doctor = Doctor.objects.filter(username = username).first()

        if doctor is not None:
            dynamic_attributes = ['username', 'name', 'email', 'phone_number', 'description', 'hospital_name', 'department', 'degree', 'designation', 'consultency']
            return Response({'ResponseCode': 200, 'doctor': DoctorSerializer(doctor, fields = dynamic_attributes).data})
        return Response({'ResponseCode': 400}, status= status.HTTP_400_BAD_REQUEST)

class GetPendingRequests(generics.RetrieveAPIView):
    def retrieve(self, request, *args, **kwargs):
        username = request.GET.get('username')
        requests = Request.objects.filter(patient__username = username, status = 'pending', date = date.today())

        #print(date.today())

        dynamic_attributes = ['doctor_username']
        return Response({'ResponseCode': 200, 'requests': RequestSerializer(requests, fields = dynamic_attributes, many = True).data})

class RequestUpdateStatusView(generics.UpdateAPIView):
    serializer_class = RequestSerializer

    def update(self, request, *args, **kwargs):
        print(request.data)
        doctor_username = request.data['doctor_username']
        patient_username = request.data['patient_username']
        status = request.data['status']
        request = Request.objects.filter(patient__username = patient_username, doctor__username = doctor_username, date = date.today()).first()

        if request is None:
            return Response({'responseCode': 400, 'status': 'Request object is not present'})

        if request.status == 'pending':
            request.status = status
            request.save()
            return Response({'responseCode': 200, 'status': 'Request Accepted'})
        return Response({'responseCode': 400, 'status': 'Request was already accepted or rejected'})

class UploadPrescriptionView(generics.CreateAPIView):
    queryset = Prescription.objects.all()
    serializer_class = PrescriptionSerializer

    def create(self, request, *args, **kwargs):
        print('prescription upload requested')
        serializer = PrescriptionSerializer(data = request.data)
        if serializer.is_valid():
            prescription = serializer.save()
            response_serializer = self.get_serializer(prescription)
            return Response(response_serializer.data, status = 201)
        else:
            return Response(serializer.errors, status = 400)
        
class GetPrescriptionView(generics.RetrieveAPIView):
    def retrieve(self, request, *args, **kwargs):
        id = request.GET.get('id', None)
        username = request.GET.get('username', None);
        prescription = Prescription.objects.filter(pk = id).first()
        if prescription is None:
            return Response({'responseCode': '404', 'status': 'Prescription not found'})
        if username != prescription.patient.username:
            return Response({'responseCode': '400', 'status': 'Access not allowed'})
        return Response({'responseCode': '200', 'prescription': PrescriptionSerializer(prescription).data})