from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader


def index(request):
    return render(request, 'cv_builder/index.html')


def display_cv(request):
    return render(request, 'cv_builder/cv.html')
