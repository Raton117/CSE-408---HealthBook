# Generated by Django 5.0.1 on 2024-03-01 18:58

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("doctors", "0002_doctor_verified"),
        ("users", "0003_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Rating",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "rating",
                    models.IntegerField(
                        choices=[(1, 1), (2, 2), (3, 3), (4, 4), (5, 5)]
                    ),
                ),
                (
                    "doctor",
                    models.ForeignKey(
                        choices=[(1, 1), (2, 2), (3, 3), (4, 4), (5, 5)],
                        on_delete=django.db.models.deletion.CASCADE,
                        to="doctors.doctor",
                    ),
                ),
                (
                    "patient",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="users.user"
                    ),
                ),
            ],
        ),
        migrations.AddConstraint(
            model_name="rating",
            constraint=models.UniqueConstraint(
                fields=("doctor", "patient"), name="unique_doctor_patient"
            ),
        ),
    ]