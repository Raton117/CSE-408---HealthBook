from rest_framework import serializers
from .models import Request, Treatment
from patients.models import Patient
from doctors.models import Doctor

class RequestSerializer(serializers.ModelSerializer):
    patient_username = serializers.CharField(source = 'patient.username')
    doctor_username = serializers.CharField(source = 'doctor.username')

    class Meta:
        model = Request
        fields = ('id', 'patient_username', 'doctor_username', 'status', 'date')

    def __init__(self, *args, **kwargs):
        fields = kwargs.pop('fields', None)
        super(RequestSerializer, self).__init__(*args, **kwargs)

        if fields:
            allowed = set(fields)
            existing = set(self.fields.keys())
            for field_name in existing - allowed:
                self.fields.pop(field_name)

    def validate(self, data):
        patient_username = data.get('patient')['username']
        doctor_username = data.get('doctor')['username']

        if not patient_username:
            raise serializers.ValidationError("Patient is required.")

        if not doctor_username:
            raise serializers.ValidationError("Doctor is required.")

        return data

    def create(self, validated_data):
        patient = Patient.objects.filter(username = validated_data.get('patient')['username']).first()
        doctor = Doctor.objects.filter(username = validated_data.get('doctor')['username']).first()
        return Request.objects.create(patient = patient, doctor = doctor)

class TreatmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Treatment
        fields = '__all__'  # Or specify the fields you want to include
