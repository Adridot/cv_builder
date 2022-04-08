# Computer programming project - CV Builder

### Adrien Didot - Emmanuel Cousin

## Introduction

The aim of the project is to help students to build their CV, by simply filling up some fields. We will do this by doing
a web application, where the user will be able to fill up the fields of the CV.

The back-end will be a Python API, which will be used to generate the PDF file. We will develop it, using the Django
framework. To convert the HTML page into a PDF file, we will use selenium, to make a "print" from Chrome. We used the
functions from the
[python-selenium-chrome-html-to-pdf-converter](https://github.com/maxvst/python-selenium-chrome-html-to-pdf-converter)
repo.

## Installation instructions

1. Clone repository
```bash
git clone https://github.com/Adridot/cv_builder.git
cd cv_builder
```

2. Install and activate a virtual environment
```bash
python -m venv venv
source venv/bin/activate
```

3. Install the requirements
```bash
pip install -r requirements.txt
```

4. Run the server 
```bash
python manage.py runserver
```