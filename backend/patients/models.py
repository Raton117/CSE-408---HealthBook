from django.db import models

# Create your models here.

class Patient(models.Model):
    username = models.CharField(max_length = 25, primary_key = True, unique = True, null = False)
    password = models.CharField(max_length = 30, null = False)
    name = models.CharField(max_length = 50, null = False)
    email = models.CharField(max_length = 50, unique = True, null = False)
    phone_number = models.CharField(max_length = 11, unique = True, null = False)
    area = models.CharField(max_length = 30, null = True)
    dob = models.DateField(null = False)
