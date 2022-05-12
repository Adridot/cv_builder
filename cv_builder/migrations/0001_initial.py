# Generated by Django 4.0.3 on 2022-05-12 13:26

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CV',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('json', models.JSONField()),
                ('file', models.FileField(blank=True, upload_to='cv_files/')),
                ('picture', models.ImageField(blank=True, upload_to='cv_pictures/')),
            ],
        ),
    ]
