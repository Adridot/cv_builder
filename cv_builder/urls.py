from django.contrib import admin
from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('display_cv', views.display_cv, name='display_cv'),
    path('admin/', admin.site.urls),
]