from django.db import models
from doctors.models import Doctor
from patients.models import Patient

# Create your models here.

STATUS_CHOICES = (
    ('pending', 'Pending'),
    ('accepted', 'Accepted'),
    ('rejected', 'Rejected'),
)

TREATMENT_STATUS_CHOICES = (
    ('ongoing', 'Ongoing'),
    ('success', 'Success'),
    ('failure', 'Failure'),
)

MEAL_TIME_CHOICES = [
        ('before', 'Before'),
        ('after', 'After'),
    ]

class Request(models.Model):
    patient = models.ForeignKey(Patient, on_delete= models.CASCADE)
    doctor = models.ForeignKey(Doctor, on_delete= models.CASCADE)
    status = models.CharField(max_length = 20, default = 'pending', choices = STATUS_CHOICES)
    date = models.DateField(auto_now_add = True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields = ['patient', 'doctor', 'date'], name = 'unique_patient_doctor_date'),
        ]

class Treatment(models.Model):
    patient = models.ForeignKey(Patient, on_delete= models.CASCADE)
    doctor = models.ForeignKey(Doctor, on_delete= models.CASCADE)
    disease = models.CharField(max_length = 100, null = True)
    status = models.CharField(max_length = 20, default = 'ongoing', choices = TREATMENT_STATUS_CHOICES)
    start_date = models.DateField(auto_now_add = True)
    last_date = models.DateField(auto_now = True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields = ['patient', 'doctor', 'disease', 'start_date'], name = 'unique_patient_doctor_disease_start_date')
        ]

class Prescription(models.Model):
    age = models.IntegerField()
    weight = models.IntegerField()
    address = models.CharField(max_length = 255)
    bp_low = models.IntegerField()
    bp_high = models.IntegerField()
    patient_name = models.CharField(max_length = 100)
    doctor_name = models.CharField(max_length = 100)
    specialist = models.CharField(max_length = 100)
    notes = models.CharField(max_length = 255, null = True, blank = True)
    treatment = models.ForeignKey(Treatment, on_delete = models.SET_NULL, null = True, blank = True)
    patient = models.ForeignKey(Patient, on_delete = models.SET_NULL, null = True, blank = True)
    date = models.DateField()

class Symptom(models.Model):
    prescription = models.ForeignKey(Prescription, related_name = 'symptoms', on_delete = models.CASCADE)
    symptom = models.CharField(max_length = 255)

    class Meta:
        # Define a unique constraint for prescription and symptom fields
        constraints = [
            models.UniqueConstraint(fields = ['prescription', 'symptom'], name = 'unique_prescription_symptom')
        ]

class Test(models.Model):
    prescription = models.ForeignKey(Prescription, related_name = 'tests', on_delete = models.CASCADE)
    test_name = models.CharField(max_length = 255)
    image_path = models.CharField(max_length = 255, null = True, blank = True)

    class Meta:
        # Define a unique constraint for prescription and test_name fields
        constraints = [
            models.UniqueConstraint(fields=['prescription', 'test_name'], name='unique_prescription_test_name')
        ]

class Diagnosis(models.Model):
    prescription = models.ForeignKey(Prescription, related_name = 'diagnoses', on_delete = models.CASCADE)
    disease = models.CharField(max_length = 255)

    class Meta:
        # Define a unique constraint for prescription and disease fields
        constraints = [
            models.UniqueConstraint(fields=['prescription', 'disease'], name='unique_prescription_disease')
        ]

class Advice(models.Model):
    prescription = models.ForeignKey(Prescription, related_name = 'advices', on_delete = models.CASCADE)
    advice = models.CharField(max_length = 255)

    class Meta:
        # Define a unique constraint for prescription and advice fields
        constraints = [
            models.UniqueConstraint(fields=['prescription', 'advice'], name='unique_prescription_advice')
        ]

class Medicine(models.Model):
    prescription = models.ForeignKey(Prescription, related_name = 'medicines', on_delete = models.CASCADE)
    medicine_name = models.CharField(max_length = 255)
    duration = models.IntegerField()
    interval = models.IntegerField(null = True, blank = True)
    meal_time = models.CharField(max_length = 6, choices = MEAL_TIME_CHOICES, null = True, blank = True)
    breakfast = models.BooleanField(default = False)
    lunch = models.BooleanField(default = False)
    dinner = models.BooleanField(default = False)

class PrescriptionAccess(models.Model):
    prescription = models.ForeignKey(Prescription, on_delete = models.CASCADE)
    doctor = models.ForeignKey(Doctor, on_delete = models.CASCADE)
    patient = models.ForeignKey(Patient, on_delete = models.CASCADE)
    status = models.CharField(max_length = 20, choices = STATUS_CHOICES, default = 'pending')

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['prescription', 'doctor'], name = 'unique_prescription_doctor')
        ]