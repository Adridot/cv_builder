from django.shortcuts import render
from django.http import HttpResponse, FileResponse
from cv_builder.pdf_export import get_pdf_from_html


def index(request):
    return render(request, 'cv_builder/index.html')


def display_cv(request):
    return render(request, 'cv_builder/cv.html')


def export_to_pdf(request):
    url = request.build_absolute_uri('/display_cv')
    result = get_pdf_from_html(url)
    with open('media/exported_cv/cv.pdf', 'wb') as pdf_file:
        pdf_file.write(result)
    with open('media/exported_cv/cv.pdf', 'rb') as pdf_file:
        response = HttpResponse(pdf_file, content_type='application/pdf')
        #TODO: add filename
        response['Content-Disposition'] = 'filename="home_page.pdf"'
    return response
