# Generated by Django 5.0.1 on 2024-02-14 07:36

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("doctors", "0006_degree_unique_doctor_degree_speciality"),
        ("patients", "0004_alter_speciality_unique_together_and_more"),
        ("treatments", "0010_prescriptionaccess_and_more"),
    ]

    operations = [
        migrations.RemoveConstraint(
            model_name="request",
            name="unique_patient_doctor_date",
        ),
        migrations.AddConstraint(
            model_name="request",
            constraint=models.UniqueConstraint(
                fields=("patient", "doctor"), name="unique_patient_doctor_date"
            ),
        ),
    ]