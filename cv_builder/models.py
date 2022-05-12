from django.db import models


class CV(models.Model):
    name = models.CharField(max_length=100)
    json = models.JSONField()
    file = models.FileField(upload_to='cv_files/', blank=True, null=True)
    picture = models.ImageField(upload_to='cv_pictures/', blank=True, null=True)

