from django.contrib import admin
from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('display_cv', views.display_cv, name='display_cv'),
    path('export_to_pdf', views.export_to_pdf, name='export_to_pdf'),
    path('admin/', admin.site.urls),
]
