from django.db import models

# Create your models here.

DESIGNATION_CHOICES = (
    ('consultant', 'Consultant'),
    ('senior_consultant', 'Senior Consultant'),
    ('assistant_professor', 'Assistant Professor'),
    ('associate_professor', 'Associate Professor'),
    ('professor', 'Professor'),
)

DAY_CHOICES = (
    ('saturday', 'Saturday'),
    ('sunday', 'Sunday'),
    ('monday', 'Monday'),
    ('tuesday', 'Tuesday'),
    ('wednesday', 'Wednesday'),
    ('thursday', 'Thursday')
)

RATING_CHOICES = [(i, i) for i in range(1, 11)]

class Hospital(models.Model):
    name = models.CharField(max_length = 100, null = False)
    area = models.CharField(max_length = 30, null = False)

class Clinic(models.Model):
    name = models.CharField(max_length = 100, null = False)
    area = models.CharField(max_length = 30, null = False)

class Doctor(models.Model):
    username = models.CharField(max_length = 25, primary_key = True, unique = True, null = False)
    password = models.CharField(max_length = 30, null = False)
    name = models.CharField(max_length = 50, null = False)
    email = models.CharField(max_length = 50, unique = True, null = False)
    phone_number = models.CharField(max_length = 11, unique = True, null = False)
    area = models.CharField(max_length = 30, null = True)
    dob = models.DateField(null = False)
    description = models.CharField(max_length = 400, null = True)
    hospital = models.ForeignKey(Hospital, on_delete = models.CASCADE)
    department = models.CharField(max_length = 30, null = False)
    designation = models.CharField(max_length = 25, choices = DESIGNATION_CHOICES)

class Consultency(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete= models.CASCADE, related_name='consultency')
    clinic = models.ForeignKey(Clinic, on_delete= models.CASCADE)
    room = models.CharField(max_length = 4)
    #day = models.CharField(max_length = 10, choices= DAY_CHOICES)
    start_time = models.TimeField()
    end_time = models.TimeField()

    class Meta:
        constraints = [
            models.UniqueConstraint(fields = ['doctor', 'clinic', 'room'], name='unique_doctor_clinic_room'),
        ]

class ConsultencyDay(models.Model):
    consultency = models.ForeignKey(Consultency, on_delete = models.CASCADE, related_name='days')
    day = models.CharField(max_length = 10, choices = DAY_CHOICES)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields = ['consultency', 'day'], name='unique_consultency_day'),
        ]


