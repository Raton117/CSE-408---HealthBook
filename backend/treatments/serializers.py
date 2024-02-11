from rest_framework import serializers
from .models import Request, Treatment, Prescription, Symptom, Test, Diagnosis, Advice, Medicine
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

class SymptomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Symptom
        #fields = '__all__'
        fields = ('symptom',)

class TestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Test
        fields = ('test_name',)

class DiagnosisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Diagnosis
        fields = ('disease',)

class AdviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Advice
        fields = ('advice',)

class MedicineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medicine
        fields = ('medicine_name', 'duration', 'interval', 'meal_time', 'breakfast', 'lunch', 'dinner')

class PrescriptionSerializer(serializers.ModelSerializer):
    symptoms = SymptomSerializer(many=True, required=False)
    tests = TestSerializer(many=True, required=False)
    diagnoses = DiagnosisSerializer(many=True, required=False)
    advices = AdviceSerializer(many=True, required=False)
    medicines = MedicineSerializer(many=True, required=False)

    print('in serializer')

    class Meta:
        model = Prescription
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['symptoms'] = SymptomSerializer(instance.symptoms.all(), many=True).data
        representation['tests'] = TestSerializer(instance.tests.all(), many=True).data
        representation['diagnoses'] = DiagnosisSerializer(instance.diagnoses.all(), many=True).data
        representation['advices'] = AdviceSerializer(instance.advices.all(), many=True).data
        representation['medicines'] = MedicineSerializer(instance.medicines.all(), many=True).data
        return representation

    def create(self, validated_data):
        symptoms_data = validated_data.pop('symptoms', [])
        tests_data = validated_data.pop('tests', [])
        diagnoses_data = validated_data.pop('diagnoses', [])
        advices_data = validated_data.pop('advices', [])
        medicines_data = validated_data.pop('medicines', [])

        prescription = Prescription.objects.create(**validated_data)

        print(prescription)

        for symptom_data in symptoms_data:
            Symptom.objects.create(prescription=prescription, **symptom_data)

        for test_data in tests_data:
            Test.objects.create(prescription=prescription, **test_data)

        for diagnosis_data in diagnoses_data:
            Diagnosis.objects.create(prescription=prescription, **diagnosis_data)

        for advice_data in advices_data:
            Advice.objects.create(prescription=prescription, **advice_data)

        for medicine_data in medicines_data:
            Medicine.objects.create(prescription=prescription, **medicine_data)

        return prescription

