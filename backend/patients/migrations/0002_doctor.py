# Generated by Django 4.2.9 on 2024-01-27 12:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('patients', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Doctor',
            fields=[
                ('username', models.CharField(max_length=25, primary_key=True, serialize=False, unique=True)),
                ('password', models.CharField(max_length=30)),
                ('name', models.CharField(max_length=50)),
                ('email', models.CharField(max_length=50, unique=True)),
                ('phone_number', models.CharField(max_length=11, unique=True)),
                ('area', models.CharField(max_length=30, null=True)),
                ('dob', models.DateField()),
                ('description', models.CharField(max_length=400, null=True)),
                ('designation', models.CharField(choices=[('consultant', 'Consultant'), ('senior_consultant', 'Senior Consultant'), ('assistant_professor', 'Assistant Professor'), ('associate_professor', 'Associate Professor'), ('professor', 'Professor')], max_length=25)),
                ('hospital', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='patients.hospital')),
            ],
        ),
    ]