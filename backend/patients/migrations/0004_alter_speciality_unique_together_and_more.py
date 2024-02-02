# Generated by Django 4.2.9 on 2024-01-27 12:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('patients', '0003_speciality'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='speciality',
            unique_together=None,
        ),
        migrations.RemoveField(
            model_name='speciality',
            name='doctor',
        ),
        migrations.DeleteModel(
            name='Doctor',
        ),
        migrations.DeleteModel(
            name='Hospital',
        ),
        migrations.DeleteModel(
            name='Speciality',
        ),
    ]
