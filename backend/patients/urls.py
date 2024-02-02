from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('signup', views.PatientSignupView.as_view()),
    path('login', views.PatientLoginView.as_view()),
    path('profile', views.PatientProfileView.as_view()),
    path('doctor-list', views.ListofDoctors.as_view()),
    path('doctor', views.DoctorProfile.as_view()),
    path('get-access-requests', views.GetPendingRequests.as_view()),
    path('response-access', views.RequestUpdateStatusView.as_view()),
]
