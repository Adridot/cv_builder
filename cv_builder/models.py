from django.db import models

#
# class Header(models.Model):
#     name = models.CharField(max_length=50)
#     description = models.TextField()
#     picture = models.ImageField(upload_to='cv_image', blank=True)
#
#
# class Section(models.Model):
#     title = models.CharField(max_length=50)
#     sub_sections = models.ManyToManyField('self', blank=True)
#
#
# class SubSection(models.Model):
#     title = models.CharField(max_length=50)
#     side_title = models.CharField(max_length=25)
#     sub_title = models.CharField(max_length=50)
#     date = models.CharField(max_length=50)
#     location = models.CharField(max_length=50)
#     body = models.TextField()
#     elements_title = models.CharField(max_length=50)
#     elements_body = models.CharField(max_length=50)
#
#
#
#
# class CVContext(models.Model):
#     header = models.ForeignKey(Header, on_delete=models.CASCADE)
#     title = models.CharField(max_length=100)
#     description = models.TextField()
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)
