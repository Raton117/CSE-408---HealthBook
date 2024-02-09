from rest_framework import serializers
from .models import Hospital, Doctor, Clinic, Consultency, ConsultencyDay, Degree

class HospitalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hospital
        fields = ('name', 'location')

class ConsultencyDaySerializer(serializers.ModelSerializer):
    class Meta:
        model = ConsultencyDay
        #fields = "__all__"
        fields = ('day',)

class ConsultencySerializer(serializers.ModelSerializer):
    clinic_name = serializers.CharField(source = 'clinic.name')
    days = ConsultencyDaySerializer(many = True)
    class Meta:
        model = Consultency
        fields = ('clinic_name', 'room', 'days', 'start_time', 'end_time')

class DegreeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Degree
        fields = ('degree', 'speciality')

class DoctorSerializer(serializers.ModelSerializer):
    hospital_name = serializers.CharField(source = 'hospital.name')
    consultency = ConsultencySerializer(many = True)
    degree = DegreeSerializer(many = True)
    class Meta:
        model = Doctor
        fields = ('username', 'password', 'name', 'email', 'phone_number', 'area', 'dob', 'description', 'hospital_name', 'department', 'degree', 'designation', 'consultency')

    def __init__(self, *args, **kwargs):
        # Dynamically set fields based on the 'fields' parameter
        fields = kwargs.pop('fields', None)
        super(DoctorSerializer, self).__init__(*args, **kwargs)

        if fields:
            allowed = set(fields)
            existing = set(self.fields.keys())
            for field_name in existing - allowed:
                self.fields.pop(field_name)



