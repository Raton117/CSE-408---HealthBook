from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import Hospital, Doctor, Clinic, Consultency, ConsultencyDay, Degree
from treatments.models import Request, Prescription, Treatment, PrescriptionAccess, Medicine, Diagnosis
from patients.models import Patient
from patients.serializers import PatientSerializer
from treatments.serializers import RequestSerializer, TreatmentSerializer, PrescriptionSerializer, PrescriptionAccessSerializer, MedicineSerializer, DiagnosisSerializer
from .serializers import HospitalSerializer, DoctorSerializer, DegreeSerializer, DoctorSignupSerializer, AddDegreeSerializer, AddConsultencySerializer, AddConsultencyDaysSerializer, ConsultencySerializer
from datetime import datetime, timedelta

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
        except Patient.DoesNotExist:
            return Response({'error': 'Patient not found'}, status=404)
        try:
            doctor = Doctor.objects.get(username=doctor_username)
        except Doctor.DoesNotExist:
            return Response({'error': 'Doctor not found'}, status=404)

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
        
class DoctorSignupView(generics.CreateAPIView):
    serializer_class = DoctorSignupSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception = True)

        username = serializer.validated_data['username']

        if Doctor.objects.filter(username = username).exists():
            return Response({'error': 'Username is already taken', 'responseCode': 400}, status = status.HTTP_400_BAD_REQUEST)

        email = serializer.validated_data['email']
        if Doctor.objects.filter(email = email).exists():
            return Response({'error': 'Email is already taken', 'responseCode': 400}, status = status.HTTP_400_BAD_REQUEST)

        phone_number = serializer.validated_data['phone_number']
        if Doctor.objects.filter(phone_number = phone_number).exists():
            return Response({'error': 'Phone Number is already taken', 'responseCode': 400}, status = status.HTTP_400_BAD_REQUEST)

        hospital_name = serializer.validated_data['hospital_name']
        if not Hospital.objects.filter(name = hospital_name).exists():
            return Response({'error': "Hospital doesn't exist", 'responseCode': 400}, status = status.HTTP_400_BAD_REQUEST)

        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response({'username': serializer.instance.username, 'responseCode': 201}, status = status.HTTP_201_CREATED, headers = headers)

class AddDegreeView(generics.CreateAPIView):
    serializer_class = AddDegreeSerializer

    def create(self, request, *args, **kwargs):
        username = request.data.get('username', None)
        degree = request.data.get('degree', None)
        speciality = request.data.get('speciality', None)

        try:
            doctor = Doctor.objects.get(username = username)
        except Doctor.DoesNotExist:
            return Response({'responseCode': 404, 'error': 'Doctor not found'}, status=404)
        
        deg = Degree.objects.filter(username = username, degree = degree, speciality = speciality).first()
        if deg is not None:
            return Response({'responseCode': 404, 'error': 'Degree already exists'}, status = 404)
        
        serializer = self.get_serializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            # return Response(serializer.data, status=201)
            return Response({'responseCode': 200, 'status': 'Degree added', 'degree': serializer.data})
        else:
            #return Response(serializer.errors, status=400)
            return Response({'responseCode': 400, 'status': serializer.errors})
        
class ListofDegreesView(generics.ListAPIView):
    def list(self, request, *args, **kwargs):
        username = request.GET.get('username', None)
        degrees = Degree.objects.filter(username = username)
        return Response({'responseCode': 200, 'degrees': DegreeSerializer(degrees, many = True).data})

class AddConsultencyView(generics.CreateAPIView):
    serializer_class = AddConsultencySerializer
    def create(self, request, *args, **kwargs):
        doctor_username = request.data.get('doctor_username', None)
        clinic_name = request.data.get('clinic_name', None)
        room = request.data.get('room', None)
        start_time = request.data.get('start_time', None)
        end_time = request.data.get('end_time', None)
        start_time = datetime.strptime(start_time, "%H:%M:%S").time()
        end_time = datetime.strptime(end_time, "%H:%M:%S").time()
        days = request.data.get('days', None)

        # Retrieve patient and doctor objects
        try:
            doctor = Doctor.objects.get(username = doctor_username)
            #clinic = Clinic.objects.get(name = clinic_name)
        except Doctor.DoesNotExist:
            return Response({'error': 'Doctor not found'}, status=404)
        
        try:
            clinic = Clinic.objects.get(name=clinic_name)
        except Clinic.DoesNotExist:
            return Response({'error': 'Clinic not found'}, status=404)
        
        serializer = AddConsultencySerializer(data = {
            'room': room,
            'start_time': start_time,
            'end_time': end_time,
            'clinic': clinic.pk,
            'doctor': doctor.pk
        })

        if serializer.is_valid():
            serializer.save()
            consultency = Consultency.objects.get(room = room, start_time = start_time, end_time = end_time, clinic = clinic, doctor = doctor)
            data = []
            for day in days:
                data.append({'consultency': consultency.pk, 'day': day})
            serializer2 = AddConsultencyDaysSerializer(data = data, many = True)
            if serializer2.is_valid():
                serializer2.save()
                return Response({'responseCode': 200, 'status': 'Consultency created', 'consultency': ConsultencySerializer(consultency).data})
            else:
                consultency.delete()
                return Response({'responseCode': 400, 'status': serializer2.errors})
        else:
            #return Response(serializer.errors, status=400)
            return Response({'responseCode': 400, 'status': serializer.errors})

class UploadPrescriptionView(generics.CreateAPIView):
    queryset = Prescription.objects.all()
    serializer_class = PrescriptionSerializer

    def create(self, request, *args, **kwargs):
        print('prescription upload requested')
        data = request.data
        treatment_id = data.get('treatment')
        treatment = Treatment.objects.get(pk=treatment_id)
        data['patient_name'] = treatment.patient.name
        data['patient'] = treatment.patient.username
        data['doctor_name'] = treatment.doctor.name
        serializer = PrescriptionSerializer(data = data)
        if serializer.is_valid():
            prescription = serializer.save()
            response_serializer = self.get_serializer(prescription)
            return Response(response_serializer.data, status = 201)
        else:
            return Response(serializer.errors, status = 400)

class PrescriptionAccessCreateView(generics.CreateAPIView):
    def post(self, request, *args, **kwargs):
        serializer = PrescriptionAccessSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

class GetPrescriptionView(generics.RetrieveAPIView):
    def retrieve(self, request, *args, **kwargs):
        id = request.GET.get('id', None)
        doctor = request.GET.get('doctor', None)
        prescription = Prescription.objects.filter(pk = id).first()
        print(prescription)
        if prescription is None:
            return Response({'responseCode': 404, 'status': 'prescription not found'})
        if prescription.treatment is not None and prescription.treatment.doctor.username == doctor:
            return Response({'responseCode': 200, 'prescription': PrescriptionSerializer(prescription).data})
        prescription_access = PrescriptionAccess.objects.filter(prescription__id = id, doctor__username = doctor).first()
        if prescription_access is None or prescription_access.status != 'accepted':
            return Response({'responseCode': 400, 'status': 'request not allowed'})
        return Response({'responseCode': 200, 'prescription': PrescriptionSerializer(prescription).data})
    
class GetListofprescriptionView(generics.RetrieveAPIView):
    def retrieve(self, request, *args, **kwargs):
        doctor = request.GET.get('doctor', None)
        patient = request.GET.get('patient', None)
        access = Request.objects.filter(doctor__username = doctor, patient__username = patient).first()
        if access is None or access.status != 'accepted':
            return Response({'responseCode': 400, 'status': 'Not authorized to view prescription'})
        prescriptions = Prescription.objects.filter(patient__username = patient).all()
        if days is not None:
            days = days * 30
            current_date = datetime.now().date()
            min_valid_date = current_date - timedelta(days=Medicine.objects.first().duration)
            prescriptions = prescriptions.filter(date__gte = min_valid_date)
        if len(prescriptions) > 0:
            return Response({'responseCode': 200, 'prescriptions': PrescriptionSerializer(prescriptions, many = True).data})
        else:
            return Response({'responseCode': 404, 'status': 'No prescription found'})
    
class PatientSearchAPI(generics.RetrieveAPIView):
    def retrieve(self, request, *args, **kwargs):
        username = request.GET.get('username')
        patient = Patient.objects.filter(username = username).first()
        if patient is None:
            return Response({'responseCode': 404, 'status' :'Patient not found'})
        dynamic_attributes = ['username', 'password', 'name', 'email', 'area']
        return Response({'responseCode': 200, 'patient': PatientSerializer(patient, fields = dynamic_attributes).data})
    
class GetCurrentMedicinesView(generics.RetrieveAPIView):
    def retrieve(self, request, *args, **kwargs):
        doctor = request.GET.get('doctor', None)
        patient = request.GET.get('patient', None)
        disease = request.GET.get('disease', None)
        access = Request.objects.filter(doctor__username = doctor, patient__username = patient).first()
        if access is None or access.status != 'accepted':
            return Response({'responseCode': 400, 'status': 'Not authorized to view medicines'})
        current_date = datetime.now().date()
        min_valid_date = current_date - timedelta(days=Medicine.objects.first().duration)
        medicines = Medicine.objects.filter(prescription__patient__username = patient, prescription__date__gte = min_valid_date).all()
        if len(medicines) > 0:
            return Response({'responseCode': 200, 'medicines': MedicineSerializer(medicines, many = True).data})
        else:
            return Response({'responseCode': 404, 'status': 'No medicine found'})
        
class GetCurrentDiseaseView(generics.RetrieveAPIView):
    def retrieve(self, request, *args, **kwargs):
        doctor = request.GET.get('doctor', None)
        patient = request.GET.get('patient', None)
        #disease = request.GET.get('disease', None)
        current_date = datetime.now().date()
        min_valid_date = current_date - timedelta(days=Medicine.objects.first().duration)
        access = Request.objects.filter(doctor__username = doctor, patient__username = patient).first()
        if access is None or access.status != 'accepted':
            return Response({'responseCode': 400, 'status': 'Not authorized to view diseases'})
        #diagnoses = Diagnosis.objects.filter(prescription__patient__username = patient, prescription__date__gte = min_valid_date, disease__icontains = disease).all()
        diagnoses = Diagnosis.objects.filter(prescription__patient__username = patient, prescription__date__gte = min_valid_date).all()
        if len(diagnoses) > 0:
            return Response({'responseCode': 200, 'medicines': DiagnosisSerializer(diagnoses, many = True).data})
        else:
            return Response({'responseCode': 404, 'status': 'No disease found'})