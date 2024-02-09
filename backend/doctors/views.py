from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import Hospital, Doctor, Clinic, Consultency, ConsultencyDay, Degree
from treatments.models import Request
from patients.models import Patient
from treatments.serializers import RequestSerializer, TreatmentSerializer
from .serializers import HospitalSerializer, DoctorSerializer, DegreeSerializer

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

class DoctorProfileView(generics.RetrieveAPIView):
    def retrieve(self, request, *args, **kwargs):
        username = request.GET.get('username', None)
        requesting_username = request.GET.get('requesting_username', None)
        doctor = Doctor.objects.filter(username = username).first()

        if doctor is not None:
            if username == requesting_username:
                dynamic_attributes = ['username', 'password', 'name', 'email', 'phone_number', 'area', 'dob', 'description', 'hospital_name', 'department', 'degree', 'designation', 'consultency']
                return Response({'ResponseCode': 200, 'doctor': DoctorSerializer(doctor, fields = dynamic_attributes).data})
            else:
                dynamic_attributes = ['username', 'name', 'email', 'phone_number', 'description', 'hospital_name', 'department', 'degree', 'designation', 'consultency']
                return Response({'ResponseCode': 200, 'doctor': DoctorSerializer(doctor, fields = dynamic_attributes).data})

        return Response({'ResponseCode': 400}, status= status.HTTP_400_BAD_REQUEST)

class DoctorLoginView(generics.GenericAPIView):
    serializer_class = DoctorSerializer
    
    def post(self, request, *args, **kwargs):
        username = request.data['username']
        password = request.data['password']
        doctor = Doctor.objects.filter(username = username, password = password).first()

        if doctor is not None:
            return Response({'responseCode': 200, 'username': username})
        else:
            return Response({'responseCode': 400, 'responseText': 'Incorrect username or password'})

class AddDegreeView(generics.CreateAPIView):
    serializer_class = DegreeSerializer

    def create(self, request, *args, **kwargs):
        username = request.data.get('username', None)
        degree = request.data.get('degree', None)
        speciality = request.data.get('speciality', None)

        try:
            doctor = Doctor.objects.get(username = username)
        except Doctor.DoesNotExist:
            return Response({'responseCode': 404, 'error': 'Doctor not found'}, status=404)
        
        print('This really sucks')
        
        deg = Degree.objects.filter(username = username, degree = degree, speciality = speciality).first()

        print('This really sucks again')

        if deg is not None:
            return Response({'responseCode': 404, 'error': 'Degree already exists'}, status = 404)
        
        serializer = self.get_serializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            # return Response(serializer.data, status=201)
            return Response({'responseCode': 200, 'status': 'Degree added', 'treatment': serializer.data})
        else:
            #return Response(serializer.errors, status=400)
            return Response({'responseCode': 400, 'status': serializer.errors})