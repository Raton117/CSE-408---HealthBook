# Generated by Django 4.2.9 on 2024-01-27 16:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('doctors', '0002_consultencyday'),
    ]

    operations = [
        migrations.AddConstraint(
            model_name='consultencyday',
            constraint=models.UniqueConstraint(fields=('consultency', 'day'), name='unique_consultency_day'),
        ),
    ]
