# Generated by Django 5.0.1 on 2024-02-22 16:08

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("forum", "0008_image_reportcomment_reportpost_upvotecomment_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="topic",
            name="post",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="topics",
                to="forum.post",
            ),
        ),
    ]