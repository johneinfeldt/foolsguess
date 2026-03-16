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

  // Daily Results page
  "results.playToday": { en: "Play Today's", de: "Heute spielen", es: "Jugar hoy" },
  "dailyResults.subtitle": { en: "Here's what everyone was guessing", de: "Das haben alle geraten", es: "Esto es lo que todos adivinaron" },
  "dailyResults.players": { en: "Players", de: "Spieler", es: "Jugadores" },
  "dailyResults.avgScore": { en: "Avg Score", de: "Ø Score", es: "Promedio" },
  "dailyResults.highScore": { en: "Best", de: "Bester", es: "Mejor" },
  "dailyResults.question": { en: "Question", de: "Frage", es: "Pregunta" },
  "dailyResults.playCTA": { en: "Play Today's Challenge", de: "Heutige Challenge spielen", es: "Jugar el reto de hoy" },
  "dailyResults.freeToPlay": { en: "Free to play. No account needed.", de: "Kostenlos. Kein Account nötig.", es: "Gratis. Sin cuenta." },
  "results.leaderboardCTA": { en: "Want to see your name on the leaderboard?", de: "Willst du deinen Namen im Leaderboard sehen?", es: "¿Quieres ver tu nombre en la clasificación?" },
  "results.leaderboardCTA.desc": { en: "Create a free account to track your scores and compete globally.", de: "Erstelle einen kostenlosen Account, um Scores zu tracken und weltweit zu spielen.", es: "Crea una cuenta gratis para seguir tus puntuaciones y competir globalmente." },
  "results.viewLeaderboard": { en: "View Leaderboard", de: "Leaderboard ansehen", es: "Ver clasificación" },
  "results.seeYesterday": { en: "See Yesterday's Answers", de: "Gestrige Antworten ansehen", es: "Ver respuestas de ayer" },
  "archive.title": { en: "Daily Challenge Archive", de: "Daily Challenge Archiv", es: "Archivo de retos diarios" },
  "archive.subtitle": { en: "Browse past challenges and see what everyone guessed", de: "Vergangene Challenges ansehen und sehen was alle geraten haben", es: "Explora retos pasados y ve lo que todos adivinaron" },
  "archive.noResults": { en: "No past challenges yet. Play today's first!", de: "Noch keine vergangenen Challenges. Spiele zuerst die heutige!", es: "Aún no hay retos pasados. ¡Juega el de hoy primero!" },
  "results.seeYesterday.desc": { en: "Check the questions and top answers from yesterday", de: "Schau dir die Fragen und Top-Antworten von gestern an", es: "Mira las preguntas y respuestas principales de ayer" },

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

  // H1 with keywords
  "hero.h1": {
    en: "FoolsGuess \u2014 The Free Survey Guessing Game",
    de: "FoolsGuess \u2014 Das kostenlose Umfrage-Ratespiel",
    es: "FoolsGuess \u2014 El juego gratuito de adivinar encuestas",
  },

  // SEO Content Section
  "seo.whatIs.title": {
    en: "What is FoolsGuess?",
    de: "Was ist FoolsGuess?",
    es: "\u00bfQu\u00e9 es FoolsGuess?",
  },
  "seo.whatIs.text": {
    en: "FoolsGuess is a free, browser-based survey guessing game inspired by classic TV game shows like Family Feud. Your goal is simple: guess what the most popular answers are to everyday survey questions. We surveyed real people, and now it\u2019s your turn to figure out what they said. No downloads, no sign-ups required \u2014 just pick a game mode and start guessing right in your browser. Whether you\u2019re looking for a quick brain teaser or a competitive challenge, FoolsGuess has something for everyone.",
    de: "FoolsGuess ist ein kostenloses, browserbasiertes Umfrage-Ratespiel, inspiriert von beliebten TV-Gameshows wie Familienduell. Dein Ziel ist einfach: Rate, was die beliebtesten Antworten auf allt\u00e4gliche Umfragefragen sind. Wir haben echte Menschen befragt, und jetzt bist du dran herauszufinden, was sie gesagt haben. Kein Download, keine Anmeldung n\u00f6tig \u2014 w\u00e4hle einfach einen Spielmodus und fang direkt im Browser an zu raten. Ob du ein schnelles Denkspiel suchst oder eine kompetitive Herausforderung \u2014 FoolsGuess hat f\u00fcr jeden etwas.",
    es: "FoolsGuess es un juego gratuito de adivinanza de encuestas que se juega en el navegador, inspirado en programas de televisi\u00f3n cl\u00e1sicos como 100 Mexicanos Dijeron. Tu objetivo es simple: adivina cu\u00e1les son las respuestas m\u00e1s populares a preguntas de encuestas cotidianas. Encuestamos a personas reales, y ahora es tu turno de descubrir qu\u00e9 dijeron. Sin descargas, sin registro \u2014 solo elige un modo de juego y empieza a adivinar directamente en tu navegador. Ya sea que busques un reto r\u00e1pido o un desaf\u00edo competitivo, FoolsGuess tiene algo para todos.",
  },
  "seo.whySurvey.title": {
    en: "Why Survey-Based Guessing Games Are So Much Fun",
    de: "Warum Umfrage-basierte Ratespiele so viel Spa\u00df machen",
    es: "Por qu\u00e9 los juegos de encuestas son tan divertidos",
  },
  "seo.whySurvey.text": {
    en: "There\u2019s something uniquely entertaining about trying to think like everyone else. Survey games challenge you to step outside your own perspective and predict what the majority would say. It\u2019s not about being the smartest person in the room \u2014 it\u2019s about understanding how people think. Whether you\u2019re playing solo during a lunch break or competing head-to-head with friends at a party, the mix of strategy, humor, and surprise keeps every round fresh and engaging.",
    de: "Es hat etwas einzigartig Unterhaltsames, zu versuchen, wie alle anderen zu denken. Umfragespiele fordern dich heraus, deine eigene Perspektive zu verlassen und vorherzusagen, was die Mehrheit sagen w\u00fcrde. Es geht nicht darum, der Kl\u00fcgste zu sein \u2014 es geht darum zu verstehen, wie Menschen denken. Ob du in der Mittagspause alleine spielst oder dich mit Freunden auf einer Party misst \u2014 die Mischung aus Strategie, Humor und \u00dcberraschung macht jede Runde spannend und abwechslungsreich.",
    es: "Hay algo \u00fanico en intentar pensar como todos los dem\u00e1s. Los juegos de encuestas te desaf\u00edan a salir de tu propia perspectiva y predecir lo que dir\u00eda la mayor\u00eda. No se trata de ser el m\u00e1s inteligente \u2014 se trata de entender c\u00f3mo piensa la gente. Ya sea que juegues solo durante un descanso o compitas con amigos en una fiesta, la mezcla de estrategia, humor y sorpresa hace que cada ronda sea fresca y emocionante.",
  },
  "seo.gameModes.title": {
    en: "Game Modes for Every Occasion",
    de: "Spielmodi f\u00fcr jede Gelegenheit",
    es: "Modos de juego para cada ocasi\u00f3n",
  },
  "seo.gameModes.text": {
    en: "FoolsGuess offers three distinct ways to play. The Daily Challenge gives everyone the same set of questions each day \u2014 perfect for comparing your score with friends or climbing the global leaderboard. Solo Journey lets you progress through divisions and levels at your own pace, earning XP and building streaks as you go. And Party Mode turns any gathering into a game night \u2014 play on one shared device or create an online room so everyone can join from their own phone.",
    de: "FoolsGuess bietet drei verschiedene Spielmodi. Die Tages-Challenge gibt allen jeden Tag die gleichen Fragen \u2014 perfekt um deinen Score mit Freunden zu vergleichen oder die globale Rangliste zu erklimmen. Die Solo-Reise l\u00e4sst dich in deinem eigenen Tempo durch Divisionen und Level aufsteigen, XP sammeln und Serien aufbauen. Und der Party-Modus verwandelt jedes Treffen in einen Spieleabend \u2014 spielt auf einem gemeinsamen Ger\u00e4t oder erstellt einen Online-Raum, dem alle von ihrem eigenen Handy aus beitreten k\u00f6nnen.",
    es: "FoolsGuess ofrece tres formas distintas de jugar. El Reto Diario da a todos las mismas preguntas cada d\u00eda \u2014 perfecto para comparar tu puntuaci\u00f3n con amigos o subir en la clasificaci\u00f3n global. El Viaje en Solitario te permite progresar por divisiones y niveles a tu propio ritmo, ganando XP y construyendo rachas. Y el Modo Fiesta convierte cualquier reuni\u00f3n en una noche de juegos \u2014 juega en un dispositivo compartido o crea una sala online para que todos se unan desde su propio tel\u00e9fono.",
  },
  "seo.language.title": {
    en: "Play in Your Language",
    de: "Spiele in deiner Sprache",
    es: "Juega en tu idioma",
  },
  "seo.language.text": {
    en: "FoolsGuess is available in English, German (Deutsch), and Spanish (Espa\u00f1ol). Switch languages anytime with a single click \u2014 all questions and answers are fully translated so you get the best experience in your preferred language.",
    de: "FoolsGuess ist auf Englisch, Deutsch und Spanisch (Espa\u00f1ol) verf\u00fcgbar. Wechsle jederzeit die Sprache mit einem Klick \u2014 alle Fragen und Antworten sind vollst\u00e4ndig \u00fcbersetzt, damit du das beste Spielerlebnis in deiner bevorzugten Sprache hast.",
    es: "FoolsGuess est\u00e1 disponible en ingl\u00e9s, alem\u00e1n (Deutsch) y espa\u00f1ol. Cambia de idioma en cualquier momento con un solo clic \u2014 todas las preguntas y respuestas est\u00e1n completamente traducidas para que tengas la mejor experiencia en tu idioma preferido.",
  },
  "seo.free.title": {
    en: "Free to Play, No Account Required",
    de: "Kostenlos spielen, kein Konto n\u00f6tig",
    es: "Gratis, sin cuenta necesaria",
  },
  "seo.free.text": {
    en: "You can enjoy FoolsGuess completely for free without creating an account. If you\u2019d like to track your scores and appear on the global leaderboard, you can optionally create a free account in seconds. There are no paywalls and no ads \u2014 just a fun game you can play anytime, anywhere.",
    de: "Du kannst FoolsGuess komplett kostenlos spielen, ohne ein Konto zu erstellen. Wenn du deine Scores verfolgen und in der globalen Rangliste erscheinen m\u00f6chtest, kannst du optional in Sekunden ein kostenloses Konto erstellen. Keine Paywalls, keine Werbung \u2014 einfach ein spa\u00dfiges Spiel, das du jederzeit und \u00fcberall spielen kannst.",
    es: "Puedes disfrutar de FoolsGuess completamente gratis sin crear una cuenta. Si quieres seguir tus puntuaciones y aparecer en la clasificaci\u00f3n global, puedes crear opcionalmente una cuenta gratuita en segundos. Sin muros de pago, sin anuncios \u2014 solo un juego divertido que puedes jugar en cualquier momento y lugar.",
  },

  // Footer social
  "footer.followUs": { en: "Follow us", de: "Folge uns", es: "S\u00edguenos" },
};

export function t(key: string, lang: Lang): string {
  const entry = translations[key];
  if (!entry) return key;
  return entry[lang] || entry.en || key;
}
