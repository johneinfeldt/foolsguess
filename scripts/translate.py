#!/usr/bin/env python3
"""Generate German and Spanish translations of FoolsGuess questions."""
import json
import copy
import os

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
SRC_DATA = os.path.join(SCRIPT_DIR, '..', 'src', 'data')
EN_FILE = os.path.join(SRC_DATA, 'questions.json')
DE_FILE = os.path.join(SRC_DATA, 'questions-de.json')
ES_FILE = os.path.join(SRC_DATA, 'questions-es.json')

# === CATEGORY TRANSLATIONS ===
DE_CATEGORIES = {
    "Animals": "Tiere",
    "Culture": "Kultur",
    "Entertainment": "Unterhaltung",
    "Everyday Life": "Alltag",
    "Food & Drink": "Essen & Trinken",
    "Health": "Gesundheit",
    "Holidays": "Feiertage",
    "Nature": "Natur",
    "Relationships": "Beziehungen",
    "Sports": "Sport",
    "Technology": "Technologie",
    "Travel": "Reisen",
    "Word Play": "Wortspiel",
    "Work & School": "Arbeit & Schule",
}

ES_CATEGORIES = {
    "Animals": "Animales",
    "Culture": "Cultura",
    "Entertainment": "Entretenimiento",
    "Everyday Life": "Vida Cotidiana",
    "Food & Drink": "Comida y Bebida",
    "Health": "Salud",
    "Holidays": "Fiestas",
    "Nature": "Naturaleza",
    "Relationships": "Relaciones",
    "Sports": "Deportes",
    "Technology": "Tecnologia",
    "Travel": "Viajes",
    "Word Play": "Juego de Palabras",
    "Work & School": "Trabajo y Escuela",
}

# === QUESTION TRANSLATIONS ===
# Format: "id": "translated question text"
DE_QUESTIONS = {
    "rff001": "In welches Zoogehege wuerdest du am wenigsten fallen wollen?",
    "rff002": "Was ist das haeufigste Tattoo bei jungen Leuten?",
    "rff003": "Welche Sprache klingt am schoensten?",
    "rff004": "Nenne ein notorisch billiges Bier.",
    "rff005": "Welches Musikgenre hat die staerksten Songtexte?",
    "rff006": "Nenne ein Wort, das direkt nach dem Wort 'Golden' kommt.",
    "rff007": "Welche bekannte Band hat den besten Namen?",
    "rff008": "Ausser dem Schlafzimmer: Wo koennte eine Liebesszene in einem Film gedreht werden?",
    "rff009": "Welche Superkraft waere als Sportler am besten?",
    "rff010": "Welches Land hat die nettesten Menschen?",
    "rff011": "Nenne einen Roboter aus einem Film.",
    "rff012": "Welche App auf deinem Handy benutzt du am meisten?",
    "rff013": "Was ist die suesseste Hunderasse?",
    "rff014": "Welches Land koennte als das schoenste gelten?",
    "rff015": "Nenne etwas, das man bei einer Partynacht verlieren koennte.",
    "rff016": "Wie viele Tassen Kaffee sollte man maximal am Tag trinken?",
    "rff017": "Welcher Feiertag macht am meisten Spass?",
    "rff018": "Nenne eine Sportart, bei der ein Ball verwendet wird.",
    "rff019": "Wie lange sollte Sex im Durchschnitt dauern?",
    "rff020": "Nenne einen beruehmten Maler.",
    "q001": "Nenne etwas, das man an den Strand mitnimmt.",
    "q002": "Nenne einen Grund, warum sich Leute auf der Arbeit krank melden.",
    "q003": "Nenne etwas, das man in einem Portemonnaie findet.",
    "q004": "Nenne etwas, das Leute auf dem Handy machen, waehrend sie warten.",
    "q005": "Nenne einen beliebten Pizzabelag.",
    "q006": "Nenne etwas, das man immer vergisst einzupacken.",
    "q007": "Nenne etwas, wovor Menschen Angst haben.",
    "q008": "Nenne etwas, das man vor dem Schlafengehen macht.",
    "q009": "Nenne einen typischen Neujahrsvorsatz.",
    "q010": "Nenne etwas, das man in einem Klassenzimmer findet.",
    "q011": "Nenne eine Sportart, die Leute im Fernsehen schauen.",
    "q012": "Nenne etwas, das man auf einen Hamburger legt.",
    "q013": "Nenne etwas, das man in einem Hotelzimmer findet.",
    "q014": "Nenne ein Tier, das im Ozean lebt.",
    "q015": "Nenne etwas, das Menschen sammeln.",
    "q016": "Nenne etwas, das dich zu spaet zur Arbeit kommen laesst.",
    "q017": "Nenne ein beliebtes Fruehstuecksessen.",
    "q018": "Nenne etwas, das man bei einem Sportspiel ruft.",
    "q019": "Nenne etwas, das man auf einer Party macht.",
    "q020": "Nenne etwas, das man im Auto aufbewahrt.",
    "q021": "Nenne einen Grund, warum Leute zum Arzt gehen.",
    "gen001": "Nenne etwas, das man im Supermarkt immer vergisst.",
    "gen002": "Nenne etwas, das Leute machen, wenn ihnen zu Hause langweilig ist.",
    "gen003": "Nenne ein Gemuese, das Kinder nicht essen wollen.",
    "gen004": "Nenne einen Film, den jeder mindestens einmal gesehen hat.",
    "gen005": "Nenne etwas, das man auf einer Firmenveranstaltung nur so tut als wuerde man es geniessen.",
    "gen006": "Nenne ein Land, von dem Leute traeumen es zu besuchen.",
    "gen007": "Nenne eine Tradition, die man an seinem Geburtstag macht.",
    "gen008": "Nenne etwas, das immer im schlechtesten Moment kaputt geht.",
    "gen009": "Nenne eine Sportart, die einfach aussieht, aber wirklich schwer ist.",
    "gen010": "Nenne ein Tier, das ein schrecklicher Mitbewohner waere.",
    "gen011": "Nenne ein Wort, das Leute haeufig falsch schreiben.",
    "gen012": "Nenne etwas, worueber Leute beim ersten Date immer luegen.",
    "gen013": "Nenne etwas, das Leute tun, um juenger auszusehen.",
    "gen014": "Nenne ein Geraeusch in der Natur, das entspannend ist.",
    "gen015": "Nenne etwas, das Leute in ihrer Krimskrams-Schublade horten.",
    "gen016": "Nenne ein Essen, das in der Oeffentlichkeit schwer sauber zu essen ist.",
    "gen017": "Nenne eine Serie, die Leute am Stueck durchschauen.",
    "gen018": "Nenne etwas, das Studenten machen, um das Lernen aufzuschieben.",
    "gen019": "Nenne etwas Nerviges am Fliegen.",
    "gen020": "Nenne etwas, das Leute bis zur letzten Minute aufschieben.",
    "gen021": "Nenne ein Getraenk, das man an der Bar bestellt.",
    "gen022": "Nenne einen Promi, den jeder nachmachen kann.",
    "gen023": "Nenne etwas, das dich nachts wach haelt.",
    "gen024": "Nenne eine Ausrede, warum man nicht trainiert.",
    "gen025": "Nenne etwas, worueber Leute auf Roadtrips streiten.",
    "gen026": "Nenne eine Hausarbeit, die niemand gerne macht.",
    "gen027": "Nenne einen Snack, den man im Kino isst.",
    "gen028": "Nenne etwas, das ein Lehrer Schuelern abnimmt.",
    "gen029": "Nenne ein Tier, von dem Leute ueberrascht sind, dass es gefaehrlich ist.",
    "gen030": "Nenne etwas, das toll riecht, aber schrecklich schmeckt.",
    "gen031": "Nenne einen beruehmten fiktiven Detektiv.",
    "gen032": "Nenne etwas in einem Haus, das Gaeste zuerst bemerken.",
    "gen033": "Nenne ein Spiel, das man auf einem Familientreffen spielt.",
    "gen034": "Nenne etwas, das Leute heimlich googeln.",
    "gen035": "Nenne etwas, das Leuten peinlich ist im Laden zu kaufen.",
    "gen036": "Nenne ein beruehmtes Wahrzeichen, das jeder kennt.",
    "gen037": "Nenne etwas, bei dem man so tut als wuerde man es verstehen.",
    "gen038": "Nenne etwas, das man beim ersten Date nie tun sollte.",
    "gen039": "Nenne eine Blume, die man als Geschenk gibt.",
    "gen040": "Nenne ein Wort, das nach dem Wort 'Chicken' kommt.",
    "gen041": "Nenne etwas, das eine Nachbarschaft laut macht.",
    "gen042": "Nenne ein Essen, das man isst wenn man traurig ist.",
    "gen043": "Nenne einen Beruf, den Kinder ausueben wollen wenn sie gross sind.",
    "gen044": "Nenne etwas, das du als erstes greifen wuerdest wenn dein Haus brennt.",
    "gen045": "Nenne eine Frucht, die schwer sauber zu essen ist.",
    "gen046": "Nenne eine Serie, die in einem Krankenhaus spielt.",
    "gen047": "Nenne etwas, das Leute vergessen bevor sie das Haus verlassen.",
    "gen048": "Nenne eine typische Ausrede dafuer, eine Nachricht nicht beantwortet zu haben.",
    "gen049": "Nenne eine Sportart, die man alleine ausueben kann.",
    "gen050": "Nenne ein Tier, das schlauer ist als die Leute denken.",
    "gen051": "Nenne etwas, das man sich immer ausleiht aber nie zurueckgibt.",
    "gen052": "Nenne etwas, das man in der Schule haette lernen sollen, aber nicht gelernt hat.",
    "gen053": "Nenne einen Ort, an dem man fluestert.",
    "gen054": "Nenne ein Essen, das als Rest besser schmeckt.",
    "gen055": "Nenne einen beruehmten fiktiven Boesewicht.",
    "gen056": "Nenne etwas, das bei der Zulassungsstelle ewig dauert.",
    "gen057": "Nenne ein Musikinstrument, das Leute gerne spielen koennten.",
    "gen058": "Nenne etwas, das Leute im Stau machen.",
    "gen059": "Nenne etwas Albernes, worueber Paare streiten.",
    "gen060": "Nenne einen Ort, an dem man immer Dinge verliert.",
    "gen061": "Nenne ein Wetter, das Plaene ruiniert.",
    "gen062": "Nenne etwas, das man bei Oma im Haus findet.",
    "gen063": "Nenne etwas, das in jedem Actionfilm passiert.",
    "gen064": "Nenne einen Gegenstand, den Leute kaufen aber selten benutzen.",
    "gen065": "Nenne etwas, das ein Zahnarzt dir immer sagt.",
    "gen066": "Nenne ein Lied, bei dem jeder den Text kennt.",
    "gen067": "Nenne etwas, das am Flughafen immer teurer ist.",
    "gen068": "Nenne ein Brettspiel, das zu Familienstreits fuehrt.",
    "gen069": "Nenne etwas, das Leute bei der Arbeit machen wenn der Chef nicht hinschaut.",
    "gen070": "Nenne etwas, das selbstgemacht besser ist als gekauft.",
    "gen071": "Nenne eine Faehigkeit, die auf einer Party beeindruckt.",
    "gen072": "Nenne etwas, das man im Zimmer eines Teenagers findet.",
    "gen073": "Nenne ein Fahrzeug, in dem man einmal mitfahren moechte.",
    "gen074": "Nenne einen Feiertag, fuer den Leute zu viel Geld ausgeben.",
    "gen075": "Nenne ein Geraet, das veraltet ist.",
    "gen076": "Nenne eine olympische Sportart, die die meisten nicht koennten.",
    "gen077": "Nenne ein Tier, das sich langsam bewegt.",
    "gen078": "Nenne etwas, das Leute sofort nach dem Aufwachen machen.",
    "gen079": "Nenne etwas, das du mit Texas verbindest.",
    "gen080": "Nenne etwas, das jedes Buero hat.",
    "gen081": "Nenne etwas, das ein Spukhaus gruselig macht.",
    "gen082": "Nenne etwas, das dein Handy macht und dich nervt.",
    "gen083": "Nenne eine Mannschaftssportart, bei der Teamarbeit unerlässlich ist.",
    "gen084": "Nenne ein Tier mit einem unverdienten Ruf.",
    "gen085": "Nenne etwas, das als Unglueck gilt.",
    "gen086": "Nenne etwas, das Leute von Orten sammeln, die sie besuchen.",
    "gen087": "Nenne etwas, das man vor einem Vorstellungsgespraech tun sollte.",
    "gen088": "Nenne etwas, das mit dem Alter besser wird.",
    "gen089": "Nenne etwas, das auf jeder Hochzeit passiert.",
    "gen090": "Nenne einen Baum, den die meisten erkennen.",
    "gen091": "Nenne ein Wort, das nach 'Home' kommt.",
    "gen092": "Nenne etwas, das man auf einem Campingplatz findet.",
    "gen093": "Nenne ein Feiertagsessen, das man entweder liebt oder hasst.",
    "gen094": "Nenne ein Passwort, das Leute haeufig verwenden.",
    "gen095": "Nenne eine Uebung, die Leute lieben zu hassen.",
    "gen096": "Nenne ein Tier, das man im Garten sehen koennte.",
    "gen097": "Nenne ein Wort, das vor 'Day' kommt.",
    "gen098": "Nenne etwas, das ein Wartezimmer beim Arzt immer hat.",
    "gen099": "Nenne etwas, das du mit Australien verbindest.",
    "gen100": "Nenne einen Grund, warum jemand den Notruf waehlen koennte.",
}

ES_QUESTIONS = {
    "rff001": "En que recinto del zoologico menos te gustaria caer?",
    "rff002": "Cual es el tatuaje mas comun entre los jovenes?",
    "rff003": "Que idioma suena mas bonito?",
    "rff004": "Nombra una cerveza notoriamente barata.",
    "rff005": "Que genero musical tiene las letras mas poderosas?",
    "rff006": "Nombra una palabra que va justo despues de 'Golden'.",
    "rff007": "Que banda famosa tiene el mejor nombre?",
    "rff008": "Aparte del dormitorio, nombra un lugar donde se podria filmar una escena de amor.",
    "rff009": "Que superpoder seria el mejor para un atleta?",
    "rff010": "Que pais tiene la gente mas amable?",
    "rff011": "Nombra un robot de una pelicula.",
    "rff012": "Que app de tu telefono usas mas?",
    "rff013": "Cual es la raza de perro mas linda?",
    "rff014": "Que pais podria considerarse el mas hermoso?",
    "rff015": "Nombra algo que podrias perder en una noche de fiesta.",
    "rff016": "Cuantas tazas de cafe deberia uno tomar como maximo al dia?",
    "rff017": "Que dia festivo es el mas divertido?",
    "rff018": "Nombra un deporte que use una pelota.",
    "rff019": "En promedio, cuanto deberia durar el sexo?",
    "rff020": "Nombra un pintor famoso.",
    "q001": "Nombra algo que llevas a la playa.",
    "q002": "Nombra una razon por la que la gente llama al trabajo para decir que esta enferma.",
    "q003": "Nombra algo que encuentras en una cartera.",
    "q004": "Nombra algo que la gente hace en su telefono mientras espera.",
    "q005": "Nombra un ingrediente popular para pizza.",
    "q006": "Nombra algo que siempre olvidas empacar para un viaje.",
    "q007": "Nombra algo a lo que la gente le tiene miedo.",
    "q008": "Nombra algo que haces antes de ir a la cama.",
    "q009": "Nombra un proposito de Ano Nuevo comun.",
    "q010": "Nombra algo que encuentras en un salon de clases.",
    "q011": "Nombra un deporte que la gente ve en la television.",
    "q012": "Nombra algo que le pones a una hamburguesa.",
    "q013": "Nombra algo que encontrarias en una habitacion de hotel.",
    "q014": "Nombra un animal que vive en el oceano.",
    "q015": "Nombra algo que la gente colecciona.",
    "q016": "Nombra algo que te hace llegar tarde al trabajo.",
    "q017": "Nombra un desayuno popular.",
    "q018": "Nombra algo que gritas en un partido.",
    "q019": "Nombra algo que haces en una fiesta.",
    "q020": "Nombra algo que guardas en tu coche.",
    "q021": "Nombra una razon por la que la gente va al medico.",
    "gen001": "Nombra algo que siempre olvidas en el supermercado.",
    "gen002": "Nombra algo que la gente hace cuando esta aburrida en casa.",
    "gen003": "Nombra una verdura que los ninos se niegan a comer.",
    "gen004": "Nombra una pelicula que todos han visto al menos una vez.",
    "gen005": "Nombra algo que finges disfrutar en un evento de trabajo.",
    "gen006": "Nombra un pais que la gente suena con visitar.",
    "gen007": "Nombra una tradicion que la gente hace en su cumpleanos.",
    "gen008": "Nombra algo que siempre se rompe en el peor momento.",
    "gen009": "Nombra un deporte que parece facil pero es muy dificil.",
    "gen010": "Nombra un animal que seria un companero de piso terrible.",
    "gen011": "Nombra una palabra que la gente suele escribir mal.",
    "gen012": "Nombra algo sobre lo que la gente siempre miente en la primera cita.",
    "gen013": "Nombra algo que la gente hace para parecer mas joven.",
    "gen014": "Nombra un sonido de la naturaleza que es relajante.",
    "gen015": "Nombra algo que la gente acumula en su cajon de cosas.",
    "gen016": "Nombra una comida dificil de comer sin ensuciarse en publico.",
    "gen017": "Nombra una serie que la gente ve de un tiron.",
    "gen018": "Nombra algo que los estudiantes hacen para procrastinar.",
    "gen019": "Nombra algo molesto de viajar en avion.",
    "gen020": "Nombra algo que la gente deja para el ultimo minuto.",
    "gen021": "Nombra una bebida que la gente pide en un bar.",
    "gen022": "Nombra un famoso que todos pueden imitar.",
    "gen023": "Nombra algo que te mantiene despierto por la noche.",
    "gen024": "Nombra una excusa que la gente da para no hacer ejercicio.",
    "gen025": "Nombra algo por lo que la gente discute en viajes por carretera.",
    "gen026": "Nombra una tarea del hogar que nadie quiere hacer.",
    "gen027": "Nombra un snack que la gente come en el cine.",
    "gen028": "Nombra algo que un profesor le confisca a los alumnos.",
    "gen029": "Nombra un animal que sorprende saber que es peligroso.",
    "gen030": "Nombra algo que huele genial pero sabe terrible.",
    "gen031": "Nombra un famoso detective de ficcion.",
    "gen032": "Nombra algo en una casa que los invitados notan primero.",
    "gen033": "Nombra un juego que se juega en reuniones familiares.",
    "gen034": "Nombra algo que la gente busca en secreto en Google.",
    "gen035": "Nombra algo que da verguenza comprar en la tienda.",
    "gen036": "Nombra un monumento famoso que todos reconocen.",
    "gen037": "Nombra algo que finges entender pero realmente no.",
    "gen038": "Nombra algo que nunca deberias hacer en una primera cita.",
    "gen039": "Nombra una flor que la gente regala.",
    "gen040": "Nombra una palabra que sigue a 'Chicken'.",
    "gen041": "Nombra algo que hace ruidoso a un vecindario.",
    "gen042": "Nombra una comida reconfortante que se come cuando estas triste.",
    "gen043": "Nombra un trabajo que los ninos dicen querer de grandes.",
    "gen044": "Nombra algo que agarrarias primero si tu casa estuviera en llamas.",
    "gen045": "Nombra una fruta dificil de comer sin ensuciarse.",
    "gen046": "Nombra una serie ambientada en un hospital.",
    "gen047": "Nombra algo que la gente olvida hacer antes de salir de casa.",
    "gen048": "Nombra una excusa comun para no responder un mensaje.",
    "gen049": "Nombra un deporte que puedes practicar solo.",
    "gen050": "Nombra un animal que es mas inteligente de lo que la gente cree.",
    "gen051": "Nombra algo que la gente siempre pide prestado pero nunca devuelve.",
    "gen052": "Nombra algo que debiste haber aprendido en la escuela pero no.",
    "gen053": "Nombra un lugar donde la gente susurra.",
    "gen054": "Nombra una comida que sabe mejor recalentada.",
    "gen055": "Nombra un famoso villano de ficcion.",
    "gen056": "Nombra algo que tarda una eternidad en la oficina de transito.",
    "gen057": "Nombra un instrumento musical que a la gente le gustaria saber tocar.",
    "gen058": "Nombra algo que la gente hace cuando esta atrapada en el trafico.",
    "gen059": "Nombra algo tonto por lo que las parejas discuten.",
    "gen060": "Nombra un lugar donde siempre pierdes cosas.",
    "gen061": "Nombra un tipo de clima que arruina planes.",
    "gen062": "Nombra algo que encontrarias en la casa de una abuela.",
    "gen063": "Nombra algo que pasa en toda pelicula de accion.",
    "gen064": "Nombra un articulo que la gente compra pero rara vez usa.",
    "gen065": "Nombra algo que un dentista siempre te dice que hagas.",
    "gen066": "Nombra una cancion cuya letra todos conocen.",
    "gen067": "Nombra algo que siempre es mas caro en el aeropuerto.",
    "gen068": "Nombra un juego de mesa que causa peleas familiares.",
    "gen069": "Nombra algo que la gente hace en el trabajo cuando el jefe no mira.",
    "gen070": "Nombra algo que es mejor hecho en casa que comprado.",
    "gen071": "Nombra una habilidad que impresiona en una fiesta.",
    "gen072": "Nombra algo que encontrarias en la habitacion de un adolescente.",
    "gen073": "Nombra un vehiculo en el que te gustaria viajar una vez.",
    "gen074": "Nombra un dia festivo en el que la gente gasta demasiado dinero.",
    "gen075": "Nombra un dispositivo que se ha vuelto obsoleto.",
    "gen076": "Nombra un deporte olimpico que la mayoria no podria hacer.",
    "gen077": "Nombra un animal que se mueve lentamente.",
    "gen078": "Nombra algo que la gente hace inmediatamente al despertar.",
    "gen079": "Nombra algo que asocias con Texas.",
    "gen080": "Nombra algo que toda oficina tiene.",
    "gen081": "Nombra algo que hace aterradora una casa embrujada.",
    "gen082": "Nombra algo que hace tu telefono que te molesta.",
    "gen083": "Nombra un deporte de equipo donde el trabajo en equipo es esencial.",
    "gen084": "Nombra un animal con una reputacion que no merece.",
    "gen085": "Nombra algo que se considera mala suerte.",
    "gen086": "Nombra algo que la gente colecciona de los lugares que visita.",
    "gen087": "Nombra algo que deberias hacer antes de una entrevista de trabajo.",
    "gen088": "Nombra algo que mejora con los anos.",
    "gen089": "Nombra algo que siempre pasa en una boda.",
    "gen090": "Nombra un arbol que la mayoria puede identificar.",
    "gen091": "Nombra una palabra que sigue a 'Home'.",
    "gen092": "Nombra algo que encontrarias en un campamento.",
    "gen093": "Nombra una comida navidena que la gente ama u odia.",
    "gen094": "Nombra una contrasena que la gente usa comunmente.",
    "gen095": "Nombra un ejercicio que la gente ama odiar.",
    "gen096": "Nombra un animal que podrias ver en tu jardin.",
    "gen097": "Nombra una palabra que va antes de 'Day'.",
    "gen098": "Nombra algo que siempre hay en la sala de espera del medico.",
    "gen099": "Nombra algo que asocias con Australia.",
    "gen100": "Nombra una razon por la que alguien llamaria al numero de emergencias.",
}

# === ANSWER TRANSLATIONS ===
# Format: "id": [("text_de", ["alias1", ...]), ...]  -- 6 answers per question, same order
DE_ANSWERS = {
    "rff001": [
        ("Loewe", ["loewen", "lion"]),
        ("Tiger", ["tiger"]),
        ("Gorilla", ["gorillas", "affe"]),
        ("Baer", ["baeren", "grizzly", "eisbaer"]),
        ("Nilpferd", ["flusspferd", "hippo"]),
        ("Krokodil", ["krokodile", "alligator"]),
    ],
    "rff002": [
        ("Blumen oder Baeume", ["blumen", "baeume", "blume", "baum", "rose", "rosen"]),
        ("Unendlichzeichen", ["unendlich", "unendlichkeit", "infinity"]),
        ("Herz", ["herzen", "herz tattoo"]),
        ("Schmetterling", ["schmetterlinge"]),
        ("Woerter oder Zitate", ["woerter", "zitate", "zitat", "schriftzug", "text"]),
        ("Tribal-Tattoo", ["tribal", "tribal design"]),
    ],
    "rff003": [
        ("Franzoesisch", ["franzosisch"]),
        ("Spanisch", []),
        ("Italienisch", []),
        ("Englisch", []),
        ("Japanisch", []),
        ("Deutsch", []),
    ],
    "rff004": [
        ("Budweiser", ["bud", "bud light"]),
        ("Pabst Blue Ribbon", ["pbr", "pabst"]),
        ("Natural Light", ["natty light", "natty", "natty ice"]),
        ("Corona", []),
        ("Coors", ["coors light"]),
        ("Keystone", ["keystone light"]),
    ],
    "rff005": [
        ("Rock", ["rockmusik", "rock and roll"]),
        ("Rap", ["hip hop", "rapmusik", "hip-hop"]),
        ("Metal", ["heavy metal", "metalmusik"]),
        ("R&B", ["rnb", "soul", "r and b"]),
        ("Indie / Folk", ["indie", "folk", "folkmusik", "indiemusik"]),
        ("Country", ["countrymusik"]),
    ],
    "rff006": [
        ("Shower", ["golden shower", "dusche"]),
        ("Girls", ["golden girls", "girl", "maedchen"]),
        ("Retriever", ["golden retriever"]),
        ("Gate", ["golden gate", "bruecke"]),
        ("Boy", ["golden boy", "junge"]),
        ("Globe", ["golden globe", "golden globes"]),
    ],
    "rff007": [
        ("Panic! At The Disco", ["panic at the disco", "panic", "patd"]),
        ("Queen", []),
        ("The Beatles", ["beatles"]),
        ("Imagine Dragons", []),
        ("Led Zeppelin", ["led zep"]),
        ("Red Hot Chili Peppers", ["rhcp", "chili peppers"]),
    ],
    "rff008": [
        ("Kueche", ["die kueche", "kuechentheke"]),
        ("Wohnzimmer", ["das wohnzimmer"]),
        ("Dusche", ["badezimmer", "bad", "duschszene"]),
        ("Couch", ["sofa"]),
        ("Pool", ["schwimmbad", "whirlpool", "jacuzzi"]),
        ("Buero", ["arbeit", "arbeitsplatz"]),
    ],
    "rff009": [
        ("Supergeschwindigkeit", ["geschwindigkeit", "superschnell", "schnell", "speed"]),
        ("Superstaerke", ["staerke", "stark", "superstark"]),
        ("Ausdauer", ["kondition", "unendliche ausdauer"]),
        ("Zeitkontrolle", ["zeit manipulation", "zeit anhalten", "zeit"]),
        ("Fliegen", ["flug", "fliegen koennen"]),
        ("Heilung", ["immunitaet", "regeneration", "selbstheilung", "heilen"]),
    ],
    "rff010": [
        ("Kanada", ["kanadier"]),
        ("USA", ["vereinigte staaten", "amerika", "amerikaner"]),
        ("Schweden", ["schwedisch"]),
        ("Japan", ["japanisch"]),
        ("Niederlande", ["holland", "hollaender", "niederlaender"]),
        ("Daenemark", ["daenisch", "daenen"]),
    ],
    "rff011": [
        ("WALL-E", ["wall e", "walle"]),
        ("R2-D2", ["r2d2", "r2 d2", "artoo"]),
        ("Terminator", ["t-800", "t800", "der terminator"]),
        ("C-3PO", ["c3po", "c 3po", "threepio"]),
        ("HAL 9000", ["hal", "hal9000"]),
        ("RoboCop", ["robo cop"]),
    ],
    "rff012": [
        ("Reddit", []),
        ("Messenger", ["messenger apps", "whatsapp", "imessage", "nachrichten"]),
        ("Instagram", ["insta", "ig"]),
        ("YouTube", ["yt"]),
        ("Browser", ["internet", "chrome", "safari", "webbrowser"]),
        ("Facebook", ["fb"]),
    ],
    "rff013": [
        ("Corgi", ["corgis", "welsh corgi"]),
        ("Golden Retriever", ["golden", "goldie"]),
        ("Pomeranian", ["pom", "zwergspitz"]),
        ("Labrador", ["labrador retriever", "lab"]),
        ("Shiba Inu", ["shiba", "doge"]),
        ("Husky", ["huskies", "sibirischer husky"]),
    ],
    "rff014": [
        ("Island", []),
        ("Schweiz", ["schweizer"]),
        ("Neuseeland", ["nz"]),
        ("Italien", []),
        ("USA", ["vereinigte staaten", "amerika"]),
        ("Kanada", []),
    ],
    "rff015": [
        ("Portemonnaie", ["geldboerse", "geldbeutel", "brieftasche"]),
        ("Handy", ["mein handy", "telefon", "smartphone"]),
        ("Schluessel", ["meine schluessel", "hausschluessel", "autoschluessel"]),
        ("Jungfraeulichkeit", ["unschuld"]),
        ("Bargeld", ["geld", "karte", "kreditkarte"]),
        ("Schmuck", ["ohrringe", "ring", "kette", "uhr"]),
    ],
    "rff016": [
        ("3 Tassen", ["3", "drei", "drei tassen"]),
        ("2 Tassen", ["2", "zwei", "zwei tassen"]),
        ("4 Tassen", ["4", "vier", "vier tassen"]),
        ("5 Tassen", ["5", "fuenf", "fuenf tassen"]),
        ("0 Tassen", ["0", "null", "keine", "null tassen"]),
        ("1 Tasse", ["1", "eine", "eine tasse"]),
    ],
    "rff017": [
        ("Weihnachten", ["xmas", "heiligabend"]),
        ("Halloween", []),
        ("Thanksgiving", ["erntedankfest"]),
        ("4. Juli", ["vierter juli", "unabhaengigkeitstag", "independence day"]),
        ("Silvester", ["neujahr", "silvesterabend"]),
        ("Ostern", []),
    ],
    "rff018": [
        ("Baseball", []),
        ("Basketball", []),
        ("Fussball", ["soccer", "futbol", "football"]),
        ("American Football", ["nfl"]),
        ("Tennis", []),
        ("Golf", []),
    ],
    "rff019": [
        ("30 Minuten", ["30 min", "30", "halbe stunde", "30 mins"]),
        ("20 Minuten", ["20 min", "20", "20 mins"]),
        ("15 Minuten", ["15 min", "15", "15 mins", "viertelstunde"]),
        ("10 Minuten", ["10 min", "10", "10 mins"]),
        ("1 Stunde", ["60 min", "60 minuten", "eine stunde"]),
        ("45 Minuten", ["45 min", "45", "45 mins"]),
    ],
    "rff020": [
        ("Van Gogh", ["vincent van gogh", "vangogh"]),
        ("Picasso", ["pablo picasso"]),
        ("Da Vinci", ["leonardo da vinci", "leonardo", "davinci"]),
        ("Monet", ["claude monet"]),
        ("Michelangelo", ["michaelangelo"]),
        ("Salvador Dali", ["dali", "salvador dali"]),
    ],
}

ES_ANSWERS = {
    "rff001": [
        ("Leon", ["leones", "lion"]),
        ("Tigre", ["tigres"]),
        ("Gorila", ["gorilas", "simio"]),
        ("Oso", ["osos", "grizzly", "oso polar"]),
        ("Hipopotamo", ["hipopotamos", "hippo"]),
        ("Cocodrilo", ["cocodrilos", "caiman", "aligator"]),
    ],
    "rff002": [
        ("Flores o Arboles", ["flores", "arboles", "flor", "arbol", "rosa", "rosas"]),
        ("Simbolo de Infinito", ["infinito", "signo infinito", "infinity"]),
        ("Corazon", ["corazones"]),
        ("Mariposa", ["mariposas"]),
        ("Palabras o Frases", ["palabras", "frases", "frase", "texto", "letras"]),
        ("Tatuaje Tribal", ["tribal", "diseno tribal"]),
    ],
    "rff003": [
        ("Frances", []),
        ("Espanol", ["castellano"]),
        ("Italiano", []),
        ("Ingles", []),
        ("Japones", []),
        ("Aleman", []),
    ],
    "rff004": [
        ("Budweiser", ["bud", "bud light"]),
        ("Pabst Blue Ribbon", ["pbr", "pabst"]),
        ("Natural Light", ["natty light", "natty"]),
        ("Corona", []),
        ("Coors", ["coors light"]),
        ("Keystone", ["keystone light"]),
    ],
    "rff005": [
        ("Rock", ["musica rock", "rock and roll"]),
        ("Rap", ["hip hop", "musica rap", "hip-hop"]),
        ("Metal", ["heavy metal", "musica metal"]),
        ("R&B", ["rnb", "soul", "r and b"]),
        ("Indie / Folk", ["indie", "folk", "musica folk", "musica indie"]),
        ("Country", ["musica country"]),
    ],
    "rff006": [
        ("Shower", ["golden shower", "ducha"]),
        ("Girls", ["golden girls", "girl", "chicas"]),
        ("Retriever", ["golden retriever"]),
        ("Gate", ["golden gate", "puente"]),
        ("Boy", ["golden boy", "chico"]),
        ("Globe", ["golden globe", "golden globes"]),
    ],
    "rff007": [
        ("Panic! At The Disco", ["panic at the disco", "panic", "patd"]),
        ("Queen", []),
        ("The Beatles", ["beatles"]),
        ("Imagine Dragons", []),
        ("Led Zeppelin", ["led zep"]),
        ("Red Hot Chili Peppers", ["rhcp", "chili peppers"]),
    ],
    "rff008": [
        ("Cocina", ["la cocina", "mesada"]),
        ("Sala de Estar", ["sala", "salon", "living"]),
        ("Ducha", ["bano", "banera"]),
        ("Sofa", ["sillon"]),
        ("Piscina", ["alberca", "jacuzzi", "pileta"]),
        ("Oficina", ["trabajo", "lugar de trabajo"]),
    ],
    "rff009": [
        ("Super Velocidad", ["velocidad", "super rapido", "rapido", "speed"]),
        ("Super Fuerza", ["fuerza", "fuerte", "super fuerte"]),
        ("Resistencia", ["aguante", "resistencia infinita"]),
        ("Control del Tiempo", ["manipulacion del tiempo", "detener el tiempo", "tiempo"]),
        ("Vuelo", ["volar", "poder volar"]),
        ("Curacion", ["inmunidad", "regeneracion", "autocuracion", "curar"]),
    ],
    "rff010": [
        ("Canada", ["canadienses"]),
        ("EE.UU.", ["estados unidos", "america", "americanos", "usa"]),
        ("Suecia", ["suecos"]),
        ("Japon", ["japoneses"]),
        ("Paises Bajos", ["holanda", "holandeses", "neerlandeses"]),
        ("Dinamarca", ["daneses"]),
    ],
    "rff011": [
        ("WALL-E", ["wall e", "walle"]),
        ("R2-D2", ["r2d2", "r2 d2", "artoo"]),
        ("Terminator", ["t-800", "t800", "el terminator"]),
        ("C-3PO", ["c3po", "c 3po", "threepio"]),
        ("HAL 9000", ["hal", "hal9000"]),
        ("RoboCop", ["robo cop"]),
    ],
    "rff012": [
        ("Reddit", []),
        ("Mensajeria", ["apps de mensajes", "whatsapp", "imessage", "mensajes"]),
        ("Instagram", ["insta", "ig"]),
        ("YouTube", ["yt"]),
        ("Navegador", ["internet", "chrome", "safari"]),
        ("Facebook", ["fb"]),
    ],
    "rff013": [
        ("Corgi", ["corgis", "welsh corgi"]),
        ("Golden Retriever", ["golden", "goldie"]),
        ("Pomerania", ["pom", "pomeranian"]),
        ("Labrador", ["labrador retriever", "lab"]),
        ("Shiba Inu", ["shiba", "doge"]),
        ("Husky", ["huskies", "husky siberiano"]),
    ],
    "rff014": [
        ("Islandia", []),
        ("Suiza", []),
        ("Nueva Zelanda", ["nz"]),
        ("Italia", []),
        ("EE.UU.", ["estados unidos", "america", "usa"]),
        ("Canada", []),
    ],
    "rff015": [
        ("Cartera", ["billetera", "bolso", "monedero"]),
        ("Telefono", ["mi telefono", "celular", "movil"]),
        ("Llaves", ["mis llaves", "llaves de casa", "llaves del coche"]),
        ("Virginidad", ["mi virginidad", "inocencia"]),
        ("Dinero", ["efectivo", "tarjeta", "tarjeta de credito"]),
        ("Joyas", ["aretes", "anillo", "collar", "reloj"]),
    ],
    "rff016": [
        ("3 Tazas", ["3", "tres", "tres tazas"]),
        ("2 Tazas", ["2", "dos", "dos tazas"]),
        ("4 Tazas", ["4", "cuatro", "cuatro tazas"]),
        ("5 Tazas", ["5", "cinco", "cinco tazas"]),
        ("0 Tazas", ["0", "cero", "ninguna", "cero tazas"]),
        ("1 Taza", ["1", "una", "una taza"]),
    ],
    "rff017": [
        ("Navidad", ["xmas", "nochebuena"]),
        ("Halloween", []),
        ("Accion de Gracias", ["thanksgiving", "dia de accion de gracias"]),
        ("4 de Julio", ["cuatro de julio", "dia de la independencia"]),
        ("Nochevieja", ["ano nuevo", "noche vieja", "fin de ano"]),
        ("Semana Santa", ["pascua"]),
    ],
    "rff018": [
        ("Beisbol", ["baseball"]),
        ("Basquetbol", ["basketball", "baloncesto"]),
        ("Futbol", ["soccer", "football"]),
        ("Futbol Americano", ["nfl", "american football"]),
        ("Tenis", ["tennis"]),
        ("Golf", []),
    ],
    "rff019": [
        ("30 minutos", ["30 min", "30", "media hora", "30 mins"]),
        ("20 minutos", ["20 min", "20", "20 mins"]),
        ("15 minutos", ["15 min", "15", "15 mins", "cuarto de hora"]),
        ("10 minutos", ["10 min", "10", "10 mins"]),
        ("1 hora", ["60 min", "60 minutos", "una hora"]),
        ("45 minutos", ["45 min", "45", "45 mins"]),
    ],
    "rff020": [
        ("Van Gogh", ["vincent van gogh", "vangogh"]),
        ("Picasso", ["pablo picasso"]),
        ("Da Vinci", ["leonardo da vinci", "leonardo", "davinci"]),
        ("Monet", ["claude monet"]),
        ("Miguel Angel", ["michelangelo", "michaelangelo"]),
        ("Salvador Dali", ["dali"]),
    ],
}

# === IMPORT SIMPLE ANSWER TRANSLATIONS ===
# These provide just the display text for q001-q021 + gen001-gen100
import sys
sys.path.insert(0, SCRIPT_DIR)
from de_answers import DE_ANSWER_TEXTS
from es_answers import ES_ANSWER_TEXTS


def build_translated_json(lang):
    """Build translated JSON from English source."""
    with open(EN_FILE, 'r') as f:
        en_questions = json.load(f)

    if lang == 'de':
        cat_map = DE_CATEGORIES
        q_map = DE_QUESTIONS
        detailed_answers = DE_ANSWERS  # rff001-rff020 with custom aliases
        simple_answers = DE_ANSWER_TEXTS  # q001-q021 + gen001-gen100
    else:
        cat_map = ES_CATEGORIES
        q_map = ES_QUESTIONS
        detailed_answers = ES_ANSWERS
        simple_answers = ES_ANSWER_TEXTS

    result = []
    for q in en_questions:
        qid = q['id']
        translated = copy.deepcopy(q)

        # Translate question text
        if qid in q_map:
            translated['question'] = q_map[qid]

        # Translate category
        if q['category'] in cat_map:
            translated['category'] = cat_map[q['category']]

        # Translate answers
        if qid in detailed_answers:
            # Detailed format: list of (text, [aliases]) tuples
            detail = detailed_answers[qid]
            for i, ans in enumerate(translated['answers']):
                if i < len(detail):
                    new_text, new_aliases = detail[i]
                    ans['text'] = new_text
                    # Merge: keep original English aliases + add new translated aliases
                    all_aliases = list(ans['aliases'])  # English aliases
                    for a in new_aliases:
                        if a.lower() not in [x.lower() for x in all_aliases]:
                            all_aliases.append(a)
                    # Also add the English original text as alias
                    en_text = q['answers'][i]['text']
                    if en_text.lower() not in [x.lower() for x in all_aliases] and en_text.lower() != new_text.lower():
                        all_aliases.append(en_text)
                    ans['aliases'] = all_aliases

        elif qid in simple_answers:
            # Simple format: list of translated display texts
            texts = simple_answers[qid]
            for i, ans in enumerate(translated['answers']):
                if i < len(texts):
                    new_text = texts[i]
                    en_text = q['answers'][i]['text']
                    # Keep all English aliases
                    all_aliases = list(ans['aliases'])
                    # Add original English text as alias (so English input still works)
                    if en_text.lower() not in [x.lower() for x in all_aliases] and en_text.lower() != new_text.lower():
                        all_aliases.append(en_text)
                    ans['text'] = new_text
                    ans['aliases'] = all_aliases

        result.append(translated)

    return result


def main():
    print("Building German translations...")
    de_data = build_translated_json('de')
    with open(DE_FILE, 'w') as f:
        json.dump(de_data, f, indent=2, ensure_ascii=False)
    print(f"  Written {len(de_data)} questions to {DE_FILE}")

    print("Building Spanish translations...")
    es_data = build_translated_json('es')
    with open(ES_FILE, 'w') as f:
        json.dump(es_data, f, indent=2, ensure_ascii=False)
    print(f"  Written {len(es_data)} questions to {ES_FILE}")

    print("Done!")


if __name__ == '__main__':
    main()
