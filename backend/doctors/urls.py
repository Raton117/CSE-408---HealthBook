from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('request-data', views.RequestPatientData.as_view()),
    path('add-treatment', views.CreateTreatmentView.as_view()),
]
