# Generated by Django 5.0.1 on 2024-02-11 10:24

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("treatments", "0003_treatment_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="treatment",
            name="disease",
            field=models.CharField(max_length=100, null=True),
        ),
    ]
