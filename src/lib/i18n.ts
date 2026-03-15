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
  "results.copy": { en: "Copy", de: "Kopieren", es: "Copiar" },
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
  "footer.impressum": { en: "Legal Notice", de: "Impressum", es: "Aviso Legal" },
  "footer.privacy": { en: "Privacy", de: "Datenschutz", es: "Privacidad" },
  "footer.terms": { en: "Terms", de: "Nutzungsbedingungen", es: "T\u00e9rminos" },
  "footer.contact": { en: "Contact", de: "Kontakt", es: "Contacto" },

  // Party Mode
  "party.title": { en: "Party Mode", de: "Party-Modus", es: "Modo fiesta" },
  "party.addPlayers": { en: "Add 2-4 players to get started", de: "Füge 2-4 Spieler hinzu", es: "Agrega 2-4 jugadores para empezar" },
  "party.player": { en: "Player", de: "Spieler", es: "Jugador" },
  "party.addPlayer": { en: "Add Player", de: "Spieler hinzufügen", es: "Agregar jugador" },
  "party.start": { en: "Start Game", de: "Spiel starten", es: "Iniciar juego" },
  "party.rounds": { en: "5 rounds. Pass the device between turns.", de: "5 Runden. Gebt das Gerät weiter.", es: "5 rondas. Pasa el dispositivo entre turnos." },
  "party.round": { en: "Round", de: "Runde", es: "Ronda" },
  "party.yourTurn": { en: "It's your turn! Get ready to guess.", de: "Du bist dran! Mach dich bereit.", es: "¡Es tu turno! Prepárate para adivinar." },
  "party.dontPeek": { en: "Make sure other players aren't peeking!", de: "Stellt sicher, dass niemand schaut!", es: "¡Asegúrate de que nadie espíe!" },
  "party.ready": { en: "I'm Ready!", de: "Ich bin bereit!", es: "¡Estoy listo!" },
  "party.passTurn": { en: "Pass Device", de: "Gerät weitergeben", es: "Pasar dispositivo" },
  "party.roundComplete": { en: "Round Complete!", de: "Runde abgeschlossen!", es: "¡Ronda completada!" },
  "party.nextRound": { en: "Next Round", de: "Nächste Runde", es: "Siguiente ronda" },
  "party.finalResults": { en: "See Final Results", de: "Endergebnis ansehen", es: "Ver resultados finales" },
  "party.gameOver": { en: "Game Over!", de: "Spiel vorbei!", es: "¡Fin del juego!" },
  "party.winner": { en: "Winner", de: "Gewinner", es: "Ganador" },
  "party.leaderboard": { en: "Final Standings", de: "Endstand", es: "Clasificación final" },
  "party.roundBreakdown": { en: "Round Breakdown", de: "Runden-Übersicht", es: "Desglose por ronda" },
  "party.total": { en: "Total", de: "Gesamt", es: "Total" },
  "party.answers": { en: "Answers", de: "Antworten", es: "Respuestas" },
  "party.standings": { en: "Standings", de: "Zwischenstand", es: "Clasificación" },
  "party.mainMenu": { en: "Main Menu", de: "Hauptmenü", es: "Menú principal" },
  "party.newGame": { en: "New Game", de: "Neue Runde", es: "Nueva partida" },
  "party.playAgain": { en: "Play Again", de: "Nochmal spielen", es: "Jugar de nuevo" },
  "party.sameDevice": { en: "Same Device", de: "Ein Gerät", es: "Mismo dispositivo" },
  "party.sameDevice.desc": { en: "Pass the device between turns", de: "Gebt das Gerät weiter", es: "Pasa el dispositivo entre turnos" },
  "party.online": { en: "Online", de: "Online", es: "En línea" },
  "party.online.desc": { en: "Each player on their own device", de: "Jeder auf seinem eigenen Gerät", es: "Cada jugador en su dispositivo" },
  "party.chooseMode": { en: "How do you want to play?", de: "Wie wollt ihr spielen?", es: "¿Cómo quieres jugar?" },

  // Avatar
  "avatar.shape": { en: "Hairstyle", de: "Frisur", es: "Peinado" },
  "avatar.color": { en: "Skin Tone", de: "Hautfarbe", es: "Tono de piel" },
  "avatar.accessory": { en: "Accessory", de: "Accessoire", es: "Accesorio" },

  // Online
  "online.createRoom": { en: "Create Room", de: "Raum erstellen", es: "Crear sala" },
  "online.joinRoom": { en: "Join Room", de: "Raum beitreten", es: "Unirse a sala" },
  "online.roomCode": { en: "Room Code", de: "Raumcode", es: "Código de sala" },
  "online.enterCode": { en: "Enter room code...", de: "Raumcode eingeben...", es: "Introduce el código..." },
  "online.waiting": { en: "Waiting for host...", de: "Warte auf Host...", es: "Esperando al anfitrión..." },
  "online.waitingPlayers": { en: "Waiting for players...", de: "Warte auf Spieler...", es: "Esperando jugadores..." },
  "online.players": { en: "Players", de: "Spieler", es: "Jugadores" },
  "online.startGame": { en: "Start Game", de: "Spiel starten", es: "Iniciar juego" },
  "online.connecting": { en: "Connecting...", de: "Verbinde...", es: "Conectando..." },
  "online.disconnected": { en: "Disconnected. Reconnecting...", de: "Getrennt. Verbinde erneut...", es: "Desconectado. Reconectando..." },
  "online.shareCode": { en: "Share this code with friends:", de: "Teile diesen Code:", es: "Comparte este código:" },
  "online.copied": { en: "Copied!", de: "Kopiert!", es: "¡Copiado!" },
  "online.needMorePlayers": { en: "Need at least 2 players", de: "Mindestens 2 Spieler nötig", es: "Se necesitan al menos 2 jugadores" },
  "online.host": { en: "Host", de: "Host", es: "Anfitrión" },
  "online.join": { en: "Join", de: "Beitreten", es: "Unirse" },
  "online.yourName": { en: "Your name", de: "Dein Name", es: "Tu nombre" },
  "online.foundAnswer": { en: "found an answer!", de: "hat eine Antwort gefunden!", es: "¡encontró una respuesta!" },
  "online.everyoneDone": { en: "Everyone's done!", de: "Alle fertig!", es: "¡Todos listos!" },
  "online.roomFull": { en: "Room is full", de: "Raum ist voll", es: "La sala está llena" },
  "online.gameInProgress": { en: "Game already in progress", de: "Spiel läuft bereits", es: "Juego en curso" },

  // Language
  "lang.en": { en: "English", de: "Englisch", es: "Inglés" },
  "lang.de": { en: "German", de: "Deutsch", es: "Alemán" },
  "lang.es": { en: "Spanish", de: "Spanisch", es: "Español" },

  // Auth
  "auth.login": { en: "Log In", de: "Anmelden", es: "Iniciar sesión" },
  "auth.register": { en: "Create Account", de: "Konto erstellen", es: "Crear cuenta" },
  "auth.logout": { en: "Log Out", de: "Abmelden", es: "Cerrar sesión" },
  "auth.email": { en: "Email", de: "E-Mail", es: "Correo electrónico" },
  "auth.password": { en: "Password", de: "Passwort", es: "Contraseña" },
  "auth.confirmPassword": { en: "Confirm Password", de: "Passwort bestätigen", es: "Confirmar contraseña" },
  "auth.displayName": { en: "Display Name", de: "Anzeigename", es: "Nombre" },
  "auth.noAccount": { en: "Don't have an account?", de: "Noch kein Konto?", es: "¿No tienes cuenta?" },
  "auth.hasAccount": { en: "Already have an account?", de: "Schon ein Konto?", es: "¿Ya tienes cuenta?" },
  "auth.checkEmail": { en: "Check your email to confirm your account!", de: "Prüfe deine E-Mails, um dein Konto zu bestätigen!", es: "¡Revisa tu correo para confirmar tu cuenta!" },
  "auth.error": { en: "Something went wrong. Please try again.", de: "Etwas ist schiefgelaufen. Bitte versuche es erneut.", es: "Algo salió mal. Inténtalo de nuevo." },
  "auth.passwordMismatch": { en: "Passwords do not match.", de: "Passwörter stimmen nicht überein.", es: "Las contraseñas no coinciden." },
  "auth.welcome": { en: "Welcome back!", de: "Willkommen zurück!", es: "¡Bienvenido de vuelta!" },

  // Profile
  "profile.title": { en: "Profile", de: "Profil", es: "Perfil" },
  "profile.stats": { en: "Stats", de: "Statistiken", es: "Estadísticas" },
  "profile.gamesPlayed": { en: "Games Played", de: "Spiele gespielt", es: "Partidas jugadas" },
  "profile.bestScore": { en: "Best Daily Score", de: "Bester Tages-Score", es: "Mejor puntuación diaria" },
  "profile.currentStreak": { en: "Current Streak", de: "Aktuelle Serie", es: "Racha actual" },
  "profile.longestStreak": { en: "Longest Streak", de: "Längste Serie", es: "Racha más larga" },

  // Newsletter
  "newsletter.subscribe": { en: "Subscribe to newsletter", de: "Newsletter abonnieren", es: "Suscribirse al boletín" },
  "newsletter.description": { en: "Get updates about new features and game content.", de: "Erhalte Updates über neue Features und Spielinhalte.", es: "Recibe noticias sobre nuevas funciones y contenido." },

  // Leaderboard
  "leaderboard.title": { en: "Leaderboard", de: "Rangliste", es: "Ranking" },
  "leaderboard.today": { en: "Today", de: "Heute", es: "Hoy" },
  "leaderboard.allTime": { en: "All Time", de: "Gesamt", es: "Total" },
  "leaderboard.rank": { en: "Rank", de: "Rang", es: "Posición" },
  "leaderboard.player": { en: "Player", de: "Spieler", es: "Jugador" },
  "leaderboard.score": { en: "Score", de: "Punkte", es: "Puntos" },
  "leaderboard.empty": { en: "No scores yet today. Be the first!", de: "Noch keine Scores heute. Sei der Erste!", es: "¡Aún no hay puntuaciones hoy. Sé el primero!" },
  "leaderboard.signUpCta": { en: "Create a free account to appear on the leaderboard!", de: "Erstelle ein kostenloses Konto, um in der Rangliste zu erscheinen!", es: "¡Crea una cuenta gratis para aparecer en el ranking!" },
  "leaderboard.viewFull": { en: "View Full Leaderboard", de: "Gesamte Rangliste", es: "Ver ranking completo" },
};

export function t(key: string, lang: Lang): string {
  const entry = translations[key];
  if (!entry) return key;
  return entry[lang] || entry.en || key;
}
