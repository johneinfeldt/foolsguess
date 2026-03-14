"use client";

import { createContext, useContext } from "react";

export type Lang = "en" | "de" | "es";

const LANG_KEY = "foolsguess_lang";

export function loadLang(): Lang {
  if (typeof window === "undefined") return "en";
  try {
    const stored = localStorage.getItem(LANG_KEY);
    if (stored === "de" || stored === "es") return stored;
  } catch {}
  return "en";
}

export function saveLang(lang: Lang): void {
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch {}
}

interface LangContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

export const LangContext = createContext<LangContextValue>({
  lang: "en",
  setLang: () => {},
});

export function useLang(): Lang {
  return useContext(LangContext).lang;
}

export function useSetLang(): (lang: Lang) => void {
  return useContext(LangContext).setLang;
}

const translations: Record<string, Record<Lang, string>> = {
  // Nav
  "nav.playNow": { en: "Play Now", de: "Jetzt spielen", es: "Jugar ahora" },
  "nav.dailyChallenge": { en: "Daily Challenge", de: "Tages-Challenge", es: "Reto diario" },

  // Landing
  "hero.tagline": {
    en: "Guess what everyone else said. Match the most popular survey answers to score big.",
    de: "Rate, was alle anderen gesagt haben. Finde die beliebtesten Umfrage-Antworten.",
    es: "Adivina lo que todos dijeron. Encuentra las respuestas más populares.",
  },
  "hero.free": { en: "Free to play. No account needed.", de: "Kostenlos. Kein Konto nötig.", es: "Gratis. Sin cuenta necesaria." },
  "mode.daily": { en: "Daily Challenge", de: "Tages-Challenge", es: "Reto diario" },
  "mode.daily.desc": {
    en: "A new puzzle every day. Everyone plays the same questions — compare your score.",
    de: "Jeden Tag ein neues Rätsel. Alle spielen dieselben Fragen — vergleiche deinen Score.",
    es: "Un nuevo reto cada día. Todos juegan las mismas preguntas — compara tu puntuación.",
  },
  "mode.solo": { en: "Solo Journey", de: "Solo-Reise", es: "Viaje en solitario" },
  "mode.solo.desc": {
    en: "Progress through divisions and levels. Earn XP, build streaks, unlock challenges.",
    de: "Steige durch Divisionen und Levels auf. Sammle XP und schalte Challenges frei.",
    es: "Avanza por divisiones y niveles. Gana XP, construye rachas, desbloquea retos.",
  },
  "mode.multi": { en: "Multiplayer", de: "Mehrspieler", es: "Multijugador" },
  "mode.multi.desc": {
    en: "Create a room and invite friends. Race to guess the top answers.",
    de: "Erstelle einen Raum und lade Freunde ein. Wer findet die Top-Antworten?",
    es: "Crea una sala e invita amigos. Compite por adivinar las mejores respuestas.",
  },
  "label.popular": { en: "POPULAR", de: "BELIEBT", es: "POPULAR" },
  "label.new": { en: "NEW", de: "NEU", es: "NUEVO" },
  "label.comingSoon": { en: "COMING SOON", de: "BALD VERFÜGBAR", es: "PRÓXIMAMENTE" },
  "label.leaderboard": { en: "Global leaderboard", de: "Globale Rangliste", es: "Ranking global" },
  "label.levels": { en: "100+ levels", de: "100+ Level", es: "100+ niveles" },
  "label.players": { en: "2-8 players", de: "2-8 Spieler", es: "2-8 jugadores" },

  // How it works
  "how.title": { en: "How It Works", de: "So funktioniert's", es: "Cómo funciona" },
  "how.subtitle": { en: "Three steps. Infinite fun.", de: "Drei Schritte. Unendlicher Spaß.", es: "Tres pasos. Diversión infinita." },
  "how.step1.title": { en: "See the Question", de: "Sieh die Frage", es: "Mira la pregunta" },
  "how.step1.desc": {
    en: 'We surveyed 100 people. A question pops up — like "Name something you take to the beach."',
    de: 'Wir haben 100 Leute befragt. Eine Frage erscheint — z.B. "Nenne etwas, das du an den Strand mitnimmst."',
    es: 'Encuestamos a 100 personas. Aparece una pregunta — como "Nombra algo que llevas a la playa."',
  },
  "how.step2.title": { en: "Type Your Answer", de: "Tippe deine Antwort", es: "Escribe tu respuesta" },
  "how.step2.desc": {
    en: "Think like the crowd. Type what you think the most popular answers are.",
    de: "Denke wie die Masse. Tippe die beliebtesten Antworten ein.",
    es: "Piensa como la mayoría. Escribe las respuestas más populares.",
  },
  "how.step3.title": { en: "Score Points", de: "Punkte sammeln", es: "Gana puntos" },
  "how.step3.desc": {
    en: "Match popular answers to earn points. The higher the answer ranks, the more points you get.",
    de: "Finde beliebte Antworten und sammle Punkte. Je höher der Rang, desto mehr Punkte.",
    es: "Acierta respuestas populares para ganar puntos. Cuanto más alto el ranking, más puntos.",
  },

  // Game
  "game.typeAnswer": { en: "Type your answer...", de: "Deine Antwort...", es: "Tu respuesta..." },
  "game.questionOver": { en: "Question over...", de: "Frage beendet...", es: "Pregunta terminada..." },
  "game.guess": { en: "Guess", de: "Raten", es: "Adivinar" },
  "game.found": { en: "found", de: "gefunden", es: "encontradas" },
  "game.score": { en: "Score", de: "Punkte", es: "Puntos" },
  "game.left": { en: "left", de: "übrig", es: "restantes" },
  "game.complete": { en: "Question Complete", de: "Frage abgeschlossen", es: "Pregunta completada" },
  "game.nextQuestion": { en: "Next Question", de: "Nächste Frage", es: "Siguiente pregunta" },
  "game.seeResults": { en: "See Results", de: "Ergebnisse", es: "Ver resultados" },
  "game.revealingAnswers": { en: "Revealing answers...", de: "Antworten werden aufgedeckt...", es: "Revelando respuestas..." },
  "game.allFound": { en: "All answers found!", de: "Alle Antworten gefunden!", es: "¡Todas las respuestas encontradas!" },
  "game.backToMap": { en: "Back to Map", de: "Zurück zur Karte", es: "Volver al mapa" },
  "game.back": { en: "Back", de: "Zurück", es: "Volver" },

  // Daily
  "daily.title": { en: "Daily Challenge", de: "Tages-Challenge", es: "Reto diario" },
  "daily.relaxed": { en: "Relaxed Mode", de: "Entspannt", es: "Modo relajado" },
  "daily.relaxed.desc": { en: "No timer. No pressure. Play at your own pace.", de: "Kein Timer. Kein Druck. Spiele in deinem Tempo.", es: "Sin temporizador. Sin presión. Juega a tu ritmo." },
  "daily.ranked": { en: "Ranked Mode", de: "Ranglistenmodus", es: "Modo ranking" },
  "daily.ranked.desc": { en: "60 seconds per question. Compete on the leaderboard.", de: "60 Sekunden pro Frage. Tritt auf der Rangliste an.", es: "60 segundos por pregunta. Compite en el ranking." },
  "daily.ranked.label": { en: "RANKED", de: "RANGLISTE", es: "RANKING" },
  "daily.notRanked": { en: "Relaxed mode — not ranked", de: "Entspannt — ohne Rangliste", es: "Relajado — sin ranking" },

  // Results
  "results.yourScore": { en: "Your Score", de: "Dein Score", es: "Tu puntuación" },
  "results.share": { en: "Share Results", de: "Ergebnisse teilen", es: "Compartir resultados" },
  "results.copied": { en: "Copied!", de: "Kopiert!", es: "¡Copiado!" },
  "results.nextIn": { en: "Next challenge in", de: "Nächste Challenge in", es: "Siguiente reto en" },
  "results.trySolo": { en: "Want more? Try Solo Journey", de: "Mehr? Probiere die Solo-Reise", es: "¿Quieres más? Prueba el Viaje en solitario" },
  "results.trySolo.desc": { en: "Progress through levels and earn XP at your own pace.", de: "Steige durch Levels auf und sammle XP in deinem Tempo.", es: "Avanza por niveles y gana XP a tu ritmo." },
  "results.playSolo": { en: "Play Solo", de: "Solo spielen", es: "Jugar solo" },

  // Solo
  "solo.goPro": { en: "Go Pro", de: "Pro werden", es: "Hazte Pro" },
  "solo.unlimitedEnergy": { en: "Unlimited energy", de: "Unbegrenzte Energie", es: "Energía ilimitada" },
  "solo.hints": { en: "Hints", de: "Tipps", es: "Pistas" },
  "solo.revealAnswers": { en: "Reveal answers", de: "Antworten aufdecken", es: "Revelar respuestas" },
  "solo.noEnergy": { en: "No energy left! Come back tomorrow or go Pro.", de: "Keine Energie mehr! Komm morgen wieder oder werde Pro.", es: "¡Sin energía! Vuelve mañana o hazte Pro." },
  "solo.locked": { en: "Locked", de: "Gesperrt", es: "Bloqueado" },
  "solo.levelUp": { en: "Level Up!", de: "Level Up!", es: "¡Subida de nivel!" },
  "solo.levelComplete": { en: "complete", de: "abgeschlossen", es: "completado" },
  "solo.continue": { en: "Continue", de: "Weiter", es: "Continuar" },
  "solo.questions": { en: "questions", de: "Fragen", es: "preguntas" },

  // CTA
  "cta.title": { en: "Ready to prove you think like everyone else?", de: "Bereit zu beweisen, dass du denkst wie alle anderen?", es: "¿Listo para demostrar que piensas como todos?" },
  "cta.subtitle": { en: "No sign-up required. Pick a mode and start guessing.", de: "Keine Anmeldung nötig. Wähle einen Modus und los.", es: "Sin registro. Elige un modo y empieza a adivinar." },

  // Footer
  "footer.rights": { en: "All rights reserved.", de: "Alle Rechte vorbehalten.", es: "Todos los derechos reservados." },

  // Language
  "lang.en": { en: "English", de: "Englisch", es: "Inglés" },
  "lang.de": { en: "German", de: "Deutsch", es: "Alemán" },
  "lang.es": { en: "Spanish", de: "Spanisch", es: "Español" },
};

export function t(key: string, lang: Lang): string {
  const entry = translations[key];
  if (!entry) return key;
  return entry[lang] || entry.en || key;
}
