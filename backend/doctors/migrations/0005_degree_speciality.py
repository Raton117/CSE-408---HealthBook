# Generated by Django 4.2.9 on 2024-02-08 17:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('doctors', '0004_degree'),
    ]

    operations = [
        migrations.AddField(
            model_name='degree',
            name='speciality',
            field=models.CharField(max_length=20, null=True),
        ),
    ]
