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
    disease = models.CharField(max_length = 100)
    status = models.CharField(max_length = 20, default = 'ongoing', choices = TREATMENT_STATUS_CHOICES)
    start_date = models.DateField(auto_now_add = True)
    last_date = models.DateField(auto_now = True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields = ['patient', 'doctor', 'disease', 'start_date'], name = 'unique_patient_doctor_disease_start_date')
        ]
