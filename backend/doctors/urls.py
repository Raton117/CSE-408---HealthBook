from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('request-data', views.RequestPatientData.as_view()),
    path('add-treatment', views.CreateTreatmentView.as_view()),
    path('profile', views.DoctorProfileView.as_view()),
    path('login', views.DoctorLoginView.as_view()),
    path('add-degree', views.AddDegreeView.as_view()),
]
