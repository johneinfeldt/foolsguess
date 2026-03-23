export interface CategoryConfig {
  slug: string;
  icon: string;
  jsonCategory: string; // Exact match to English questions.json "category" field
  en: { name: string; description: string };
  de: { name: string; description: string };
  es: { name: string; description: string };
}

export const categories: CategoryConfig[] = [
  {
    slug: "everyday-life",
    icon: "\u{1F3E0}",
    jsonCategory: "Everyday Life",
    en: { name: "Everyday Life", description: "Questions about daily habits, common experiences, and things everyone can relate to." },
    de: { name: "Alltag", description: "Fragen \u00fcber t\u00e4gliche Gewohnheiten, gemeinsame Erfahrungen und Dinge, die jeder kennt." },
    es: { name: "Vida Cotidiana", description: "Preguntas sobre h\u00e1bitos diarios, experiencias comunes y cosas con las que todos se identifican." },
  },
  {
    slug: "entertainment",
    icon: "\u{1F3AC}",
    jsonCategory: "Entertainment",
    en: { name: "Entertainment", description: "Movies, music, TV shows, and pop culture trivia." },
    de: { name: "Unterhaltung", description: "Filme, Musik, TV-Shows und Popkultur-Fragen." },
    es: { name: "Entretenimiento", description: "Pel\u00edculas, m\u00fasica, programas de TV y cultura pop." },
  },
  {
    slug: "food-and-drink",
    icon: "\u{1F355}",
    jsonCategory: "Food & Drink",
    en: { name: "Food & Drink", description: "Favorite meals, drinks, cooking habits, and everything delicious." },
    de: { name: "Essen & Trinken", description: "Lieblingsgerichte, Getr\u00e4nke, Kochgewohnheiten und alles Leckere." },
    es: { name: "Comida y Bebida", description: "Comidas favoritas, bebidas, h\u00e1bitos de cocina y todo lo delicioso." },
  },
  {
    slug: "work-and-school",
    icon: "\u{1F4BC}",
    jsonCategory: "Work & School",
    en: { name: "Work & School", description: "Office life, school memories, careers, and workplace culture." },
    de: { name: "Arbeit & Schule", description: "B\u00fcroleben, Schulerinnerungen, Karriere und Arbeitskultur." },
    es: { name: "Trabajo y Escuela", description: "Vida de oficina, recuerdos escolares, carreras y cultura laboral." },
  },
  {
    slug: "culture",
    icon: "\u{1F30D}",
    jsonCategory: "Culture",
    en: { name: "Culture", description: "Traditions, history, languages, and cultural knowledge from around the world." },
    de: { name: "Kultur", description: "Traditionen, Geschichte, Sprachen und kulturelles Wissen aus aller Welt." },
    es: { name: "Cultura", description: "Tradiciones, historia, idiomas y conocimiento cultural de todo el mundo." },
  },
  {
    slug: "travel",
    icon: "\u2708\uFE0F",
    jsonCategory: "Travel",
    en: { name: "Travel", description: "Destinations, vacation habits, packing lists, and travel experiences." },
    de: { name: "Reisen", description: "Reiseziele, Urlaubsgewohnheiten, Packlisten und Reiseerlebnisse." },
    es: { name: "Viajes", description: "Destinos, h\u00e1bitos de vacaciones, listas de equipaje y experiencias de viaje." },
  },
  {
    slug: "animals",
    icon: "\u{1F43E}",
    jsonCategory: "Animals",
    en: { name: "Animals", description: "Pets, wildlife, and everything about the animal kingdom." },
    de: { name: "Tiere", description: "Haustiere, Wildtiere und alles \u00fcber das Tierreich." },
    es: { name: "Animales", description: "Mascotas, vida silvestre y todo sobre el reino animal." },
  },
  {
    slug: "relationships",
    icon: "\u2764\uFE0F",
    jsonCategory: "Relationships",
    en: { name: "Relationships", description: "Dating, friendships, family, and social dynamics." },
    de: { name: "Beziehungen", description: "Dating, Freundschaften, Familie und soziale Dynamiken." },
    es: { name: "Relaciones", description: "Citas, amistades, familia y din\u00e1micas sociales." },
  },
  {
    slug: "holidays",
    icon: "\u{1F384}",
    jsonCategory: "Holidays",
    en: { name: "Holidays", description: "Celebrations, traditions, and festive fun throughout the year." },
    de: { name: "Feiertage", description: "Feste, Traditionen und festlicher Spa\u00df das ganze Jahr \u00fcber." },
    es: { name: "Fiestas", description: "Celebraciones, tradiciones y diversi\u00f3n festiva durante todo el a\u00f1o." },
  },
  {
    slug: "technology",
    icon: "\u{1F4F1}",
    jsonCategory: "Technology",
    en: { name: "Technology", description: "Gadgets, apps, social media, and the digital world." },
    de: { name: "Technologie", description: "Ger\u00e4te, Apps, Social Media und die digitale Welt." },
    es: { name: "Tecnolog\u00eda", description: "Dispositivos, apps, redes sociales y el mundo digital." },
  },
  {
    slug: "health",
    icon: "\u{1F4AA}",
    jsonCategory: "Health",
    en: { name: "Health", description: "Fitness, wellness, nutrition, and healthy living." },
    de: { name: "Gesundheit", description: "Fitness, Wohlbefinden, Ern\u00e4hrung und gesundes Leben." },
    es: { name: "Salud", description: "Fitness, bienestar, nutrici\u00f3n y vida saludable." },
  },
  {
    slug: "sports",
    icon: "\u26BD",
    jsonCategory: "Sports",
    en: { name: "Sports", description: "Popular sports, athletes, and game-day traditions." },
    de: { name: "Sport", description: "Beliebte Sportarten, Athleten und Spieltags-Traditionen." },
    es: { name: "Deportes", description: "Deportes populares, atletas y tradiciones de d\u00eda de juego." },
  },
  {
    slug: "nature",
    icon: "\u{1F333}",
    jsonCategory: "Nature",
    en: { name: "Nature", description: "Weather, seasons, the outdoors, and the natural world." },
    de: { name: "Natur", description: "Wetter, Jahreszeiten, Outdoor-Aktivit\u00e4ten und die Natur." },
    es: { name: "Naturaleza", description: "Clima, estaciones, actividades al aire libre y el mundo natural." },
  },
  {
    slug: "word-play",
    icon: "\u{1F524}",
    jsonCategory: "Word Play",
    en: { name: "Word Play", description: "Word associations, language games, and creative thinking." },
    de: { name: "Wortspiel", description: "Wortassoziationen, Sprachspiele und kreatives Denken." },
    es: { name: "Juego de Palabras", description: "Asociaciones de palabras, juegos de lenguaje y pensamiento creativo." },
  },
];

export function getCategoryBySlug(slug: string): CategoryConfig | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getCategoryByJsonName(name: string): CategoryConfig | undefined {
  return categories.find((c) => c.jsonCategory === name);
}
