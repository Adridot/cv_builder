import json

from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from cv_builder.modules.pdf_export import save_pdf_to_file, get_pdf_from_html, open_file_in_browser
import logging

dev_freelance_adridot = {
    'title': "Développeur web Freelance",
    'sub_title': "",
    'side_title': "adridot",
    'date': "Depuis 2021",
    'location': "",
    'body': "Différentes missions en développement web.<br>"
            "Gain d’<b>expérience</b> pour les technologies "
            "utilisées.<br>Découverte de la vie professionnelle d'<b>entreprenariat</b>, avec des dates limites, "
            "ainsi que la gestion d’une petite entreprise. ",
    'elements_title': "Technologies: ",
    'elements_body': "Wordpress, <b>Symfony</b>, <b>Bootstrap</b>"
}
stage_tilak = {
    'title': "Stage en développement web",
    'side_title': "Tilak Healthcare",
    'date': "Juin - Aout 2021",
    'location': "Paris",
    'body': "Développement d’applications web en équipe, tests qualité",
    'elements_title': "Technologies: ",
    'elements_body': "PHP <b>Symfony</b>, <b>Github</b>"
}
enoria = {
    'title': "Développement web (Bénévolat)",
    'side_title': "Association Enoria",
    'date': "Janvier - Août 2021",
    'location': "Paris",
    'body': "Résolution d’issues, implémentation de fonctionnalités.",
    'elements_title': "Technologies: ",
    'elements_body': "PHP <b>Symfony</b>, Bootstrap, JQuery, Gitlab"
}
conseildami = {
    'title': "Co-fondation d'une startup digitale",
    'side_title': "conseildami.com",
    'date': "2017 - 2018",
    'location': "Fontainebleau",
    'body': "Cashback caritatif : don à une association caritative via des achats en ligne (affiliation).",
    'elements_title': "Technologies: ",
    'elements_body': "Wordpress"
}
experience_pro = {
    'title': 'Expérience professionnelle',
    'sub_sections': [dev_freelance_adridot, stage_tilak, enoria, conseildami]
}

cy_tech = {
    'title': "Diplôme d'ingénieur en informatique",
    'sub_title': "CY Tech (ex EISTI)",
    'date': "2020 - 2023",
    'location': "Pau & Cergy",
    'body': "Option Intelligence Artificielle",
}
tartu_ut = {
    'title': "Mobilité Mathématiques et Informatique",
    'sub_title': "University of Tartu",
    'date': "Février - Juin 2022",
    'location': "Tartu, Estonie",
    'body': "Neural networks, Big data management, Machine"
            " translation, Data science for urban mobility, Computer"
            " programming, Business data analytics",
}
prepa = {
    'title': "Classes préparatoires scientifiques (PCSI-PC)",
    'sub_title': "Institution Sainte Marie",
    'date': "2018 - 2020",
    'location': "Antony",
}
formation = {
    'title': 'Formation',
    'sub_sections': [cy_tech, tartu_ut, prepa],
}

paulitique = {
    'title': "Création d'une association étudiante",
    'side_title': "Paulitique",
    'sub_title': "Rôle: Président",
    'date': "Depuis 2021",
    'location': "Pau",
    'body': "Egalement membre du BDE Capaural (vice trésorier)."
}
mej = {
    'title': "Animation et encadremenent de jeunes",
    'side_title': "MEJ",
    'date': "2018 - 2021",
    'location': "Fontainebleau, Pau",
    'body': "En camps l’été et en équipe locale pendant l’année."
}
secours_catholique = {
    'title': "Bénévolat",
    'side_title': "Secours Catholique",
    'date': "2017 - 2018",
    'location': "Fontainebleau",
    'body': "Organisation et partage de repas chauds avec des sans abris."
}
engagements = {
    'title': 'Engagements',
    'sub_sections': [paulitique, mej, secours_catholique],
}

linkedin = {
    'name': 'LinkedIn',
    'text': '@adriendidot',
    'url': 'https://www.linkedin.com/in/adriendidot/',
}
github = {
    'name': 'Github',
    'text': '@adridot',
    'url': 'https://github.com/Adridot',
}
coordonnees = {
    'title': 'Coordonnées',
    'address': "37 rue Rémy Dumoncel <br>"
               "77210, Avon",
    'phone': "+33 6 68 40 87 71",
    'email': "adrien.didot@gmail.com",
    'links': [linkedin, github],
    'other': "22/06/2000 (21 ans) <br>"
             "Permis B",
}

anglais = {
    'title': 'Anglais',
    'side_title': 'Courant',
    'body': "Score de 980/990 au TOEIC",
}
espagnol = {
    'title': 'Espagnol',
    'side_title': 'Débutant',
}
langues = {
    'title': 'Langues',
    'sub_sections': [anglais, espagnol],
}

langages_web = {
    'title': 'Langages Web',
    'body': "Symfony, React Native, SCSS, Bootstrap, Django"
}
data_science = {
    'title': 'Data Science',
    'body': "<b>Python</b>, Pandas, SKLearn, Fairseq, Pytorch, Keras, SQL"
}
autres_technos = {
    'title': 'Autres technologies',
    'body': "Git, Java, C, Linux"
}
competences = {
    'title': 'Compétences',
    'sub_sections': [langages_web, data_science, autres_technos],
}

sports = {
    'title': 'Sports',
    'body': "VTT, Aviron, Escalade, Randonnée, Ski"
}
loisirs = {
    'title': "Loisirs",
    'body': "Aviation (BIA), Débats, DJing"
}
sports_loisirs = {
    'title': 'Sports & Loisirs',
    'sub_sections': [sports, loisirs],
}

header = {
    'name': "Adrien DIDOT",
    'description': "Etudiant Ingénieur en Informatique, <br>"
                   "spécialisé en <b>Intelligence Artificielle</b> (Bac +5) <br>"
                   "A la recherche d’une alternance en <b>Intelligence Artificielle</b> <br>"
                   "d’une durée de <b>12 mois</b> à partir de <b>Septembre 2022</b>.",
    'picture': "cv_builder/template_1/adriendidot.jpg",
}

context = {
    'header': header,
    'left_sections': [experience_pro, formation, engagements],
    'right_sections': [langues, competences, sports_loisirs],
    'contact_info': coordonnees,

}


def index(request):
    return render(request, 'cv_builder/template_1/index.html')


@csrf_exempt
def display_cv(request):
    global context
    if request.method == 'POST':
        context = json.loads(request.body)
        logging.error(context)
        render(request, 'cv_builder/template_1/index.html', context)
        return context
    return render(request, 'cv_builder/template_1/cv.html', context)


def export_to_pdf(request):
    url = request.build_absolute_uri('/display_cv')  # Getting the full url of the CV
    output_filename = 'media/exported_cv/cv.pdf'  # The path to the output file
    pdf_data = get_pdf_from_html(url)  # Converting HTML to PDF
    save_pdf_to_file(pdf_data, output_filename)  # Saving the PDF
    return open_file_in_browser(output_filename)
