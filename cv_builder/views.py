import json, ast

from django.core import serializers
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.utils.datastructures import MultiValueDictKeyError

from cv_builder.modules.pdf_export import save_pdf_to_file, get_pdf_from_html, open_file_in_browser
from cv_builder.models import CV
from project_config import settings

cv_json = {}


# This view is to display the index, to choose between showing the CV and exporting it into a pdf
def index(request):
    return render(request, 'cv_builder/template_1/index.html')


# This view is to display the CV
def display_cv(request):
    global cv_json
    return render(request, 'cv_builder/template_1/cv.html', cv_json['json'])


# This view is to export the CV into a pdf
def export_to_pdf(request):
    global cv_json
    url = request.build_absolute_uri('/display_cv')  # Getting the full url of the CV
    output_filename = f"cv_builder/static/cv_builder/exported_cv/{cv_json['name']}.pdf"  # The path to the output file
    pdf_data = get_pdf_from_html(url)  # Converting HTML to PDF
    save_pdf_to_file(pdf_data, output_filename)  # Saving the PDF
    return output_filename


# View to import a new CV to the database from a json
@csrf_exempt
def create_cv(request):
    if request.method == 'POST':
        json_data = json.loads(request.body)  # Getting the json data
        try:
            cv_data = json_data["json"]  # Setting the global variable
            CV.objects.create(name=json_data["name"], json=cv_data)  # Creating the CV in the database
            return HttpResponse(status=201)
        except MultiValueDictKeyError:
            return HttpResponse("This CV is incorrect", status=400)
    return HttpResponse(status=405)


# View to delete a CV from the database
@csrf_exempt
def delete_cv(request):
    if request.method == 'POST':
        json_data = json.loads(request.body)
        try:
            CV.objects.filter(id=json_data["id"]).delete()  # Deleting the CV from the database
            return HttpResponse(status=200)
        except MultiValueDictKeyError:
            return HttpResponse("This CV does not exist.", status=400)
    return HttpResponse(status=405)


# View to list all the CVs in the database
@csrf_exempt
def list_cvs(request):
    if request.method == 'GET':
        cvs = CV.objects.all()  # Getting all the CVs from the database
        cvs_json = []  # Creating a list to store the CVs
        for cv in cvs:  # Iterating over the CVs
            cvs_json.append({"name": cv.name, "json": cv.json})  # Adding the CVs to the list
        return HttpResponse(json.dumps(cvs_json), content_type="application/json")  # Returning the list
    return HttpResponse(status=405)


# Create a PDF from a CV
@csrf_exempt
def create_pdf(request):
    global cv_json
    if request.method == 'GET':
        json_data = json.loads(request.body)  # Getting the json data
        try:
            cv_data = CV.objects.get(id=json_data["id"])  # Getting the CV from the database
            cv_json = serializers.serialize('json', [cv_data])  # Setting the global variable
            cv_json = ast.literal_eval(cv_json)[0]['fields']  # Converting the json to a dictionary
            filepath = export_to_pdf(request)  # Exporting the CV to a PDF
            return HttpResponse(str(settings.BASE_DIR) + '/' + filepath)  # Returning the url of the PDF
        except:
            return HttpResponse("This CV does not exist.", status=400)
    return HttpResponse(status=405)
