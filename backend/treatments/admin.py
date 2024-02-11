from django.contrib import admin
from .models import Request, Treatment, Prescription, Symptom, Test, Diagnosis, Advice, Medicine 

# Register your models here.
model_list = [Request, Treatment]
admin.site.register(model_list)
