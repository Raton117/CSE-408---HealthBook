from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('request-data', views.RequestPatientData.as_view()),
    path('add-treatment', views.CreateTreatmentView.as_view()),
    path('profile', views.DoctorProfileView.as_view()),
    path('login', views.DoctorLoginView.as_view()),
    path('signup', views.DoctorSignupView.as_view()),
    path('add-degree', views.AddDegreeView.as_view()),
    path('list-of-degrees', views.ListofDegreesView.as_view()),
    path('add-consultency', views.AddConsultencyView.as_view()),
    path('upload-prescription', views.UploadPrescriptionView.as_view()),
    path('request-prescription-access', views.PrescriptionAccessView.as_view()),
]
