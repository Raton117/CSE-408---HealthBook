from django.contrib import admin
from .models import Hospital, Doctor, Clinic, Consultency, ConsultencyDay

# Register your models here.
models_list = [Hospital, Doctor, Clinic, Consultency, ConsultencyDay]
admin.site.register(models_list)
