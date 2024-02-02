from rest_framework import serializers
from .models import Patient
from datetime import datetime

class PatientSerializer(serializers.ModelSerializer):
    username = serializers.CharField()
    requesting_username = serializers.CharField()
    age = serializers.IntegerField()

    class Meta:
        model = Patient
        fields = ['username', 'requesting_username', 'password', 'name', 'email', 'phone_number', 'dob', 'age','area']

    def __init__(self, *args, **kwargs):
        # Dynamically set fields based on the 'fields' parameter
        fields = kwargs.pop('fields', None)
        super(PatientSerializer, self).__init__(*args, **kwargs)

        if fields:
            allowed = set(fields)
            existing = set(self.fields.keys())
            for field_name in existing - allowed:
                self.fields.pop(field_name)

class PatientSignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only = True, required = True, style = {'input_type': 'password'})
    password_confirmation = serializers.CharField(write_only = True, required = True, style = {'input_type': 'password'})

    class Meta:
        model = Patient
        fields = ('username', 'password', 'password_confirmation', 'name', 'email', 'phone_number', 'dob')

    def validate(self, data):
        if data['password'] != data['password_confirmation']:
            raise serializers.ValidationError("Passwords do not match.")
        return data

    def create(self, validated_data):
        validated_data.pop('password_confirmation', None)
        return Patient.objects.create(username = validated_data['username'], password = validated_data['password'], name = validated_data['name'], email = validated_data['email'], phone_number = validated_data['phone_number'], dob = validated_data['dob'])

class PatientLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only = True, required = True, style = {'input_type': 'password'})

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        if not username:
            raise serializers.ValidationError("Username is required.")

        if not password:
            raise serializers.ValidationError("Password is required.")

        return data
