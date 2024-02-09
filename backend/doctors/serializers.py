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

class DoctorSignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only = True, required = True, style = {'input_type': 'password'})
    password_confirmation = serializers.CharField(write_only = True, required = True, style = {'input_type': 'password'})
    hospital_name = serializers.CharField(write_only = True, required = True)

    class Meta:
        model = Doctor
        fields = ('username', 'password', 'password_confirmation', 'name', 'email', 'phone_number', 'dob', 'designation', 'hospital_name', 'department')

    def validate(self, data):
        if data['password'] != data['password_confirmation']:
            raise serializers.ValidationError("Passwords do not match.")
        return data
    
    def create(self, validated_data):
        validated_data.pop('password_confirmation', None)
        hospital_name = validated_data.pop('hospital_name', None)
        print(hospital_name)
        hospital = Hospital.objects.filter(name = hospital_name).first()
        print(hospital)
        validated_data['hospital'] = hospital
        return super().create(validated_data)

class DegreeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Degree
        fields = ('username', 'degree', 'speciality')