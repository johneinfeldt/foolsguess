"use client";

import { useLang } from "@/lib/i18n";

const content = {
  en: {
    title: "Terms of Service",
    lastUpdated: "Last updated: March 14, 2026",
    sections: [
      {
        heading: "Acceptance of Terms",
        text: "By accessing and playing FoolsGuess, you agree to these terms. If you do not agree, please do not use the service.",
      },
      {
        heading: "Description of Service",
        text: "FoolsGuess is a free, browser-based survey guessing game. We provide the game as-is, without warranties of any kind. The service may be modified, suspended, or discontinued at any time without notice.",
      },
      {
        heading: "User Conduct",
        text: "When using multiplayer features, you agree to choose appropriate display names and behave respectfully toward other players. We reserve the right to terminate access for users who violate this policy.",
      },
      {
        heading: "Intellectual Property",
        text: "All content, design, and code of FoolsGuess are protected by copyright. You may not copy, redistribute, or modify any part of the game without permission.",
      },
      {
        heading: "No Account Required",
        text: "FoolsGuess does not require registration. Game progress is stored locally on your device. We are not responsible for data loss due to browser cache clearing or device changes.",
      },
      {
        heading: "Availability",
        text: "We strive to keep FoolsGuess available at all times, but we do not guarantee uninterrupted service. Maintenance, updates, or technical issues may cause temporary downtime.",
      },
      {
        heading: "Limitation of Liability",
        text: "FoolsGuess is provided for entertainment purposes. We are not liable for any damages arising from the use of this service.",
      },
      {
        heading: "Changes to Terms",
        text: "We may update these terms from time to time. Continued use of the service after changes constitutes acceptance of the updated terms.",
      },
      {
        heading: "Contact",
        text: "For questions about these terms, please visit our contact page.",
      },
    ],
  },
  de: {
    title: "Nutzungsbedingungen",
    lastUpdated: "Zuletzt aktualisiert: 14. Marz 2026",
    sections: [
      {
        heading: "Akzeptanz der Bedingungen",
        text: "Durch den Zugriff auf und das Spielen von FoolsGuess stimmst du diesen Bedingungen zu. Wenn du nicht einverstanden bist, nutze den Dienst bitte nicht.",
      },
      {
        heading: "Beschreibung des Dienstes",
        text: "FoolsGuess ist ein kostenloses, browserbasiertes Umfrage-Ratespiel. Wir stellen das Spiel ohne Garantien jeglicher Art zur Verfugung. Der Dienst kann jederzeit ohne Vorankundigung geandert, ausgesetzt oder eingestellt werden.",
      },
      {
        heading: "Nutzerverhalten",
        text: "Bei der Nutzung von Mehrspieler-Funktionen verpflichtest du dich, angemessene Anzeigenamen zu wahlen und dich gegenuber anderen Spielern respektvoll zu verhalten. Wir behalten uns das Recht vor, den Zugang fur Nutzer zu sperren, die gegen diese Richtlinie verstossen.",
      },
      {
        heading: "Geistiges Eigentum",
        text: "Alle Inhalte, das Design und der Code von FoolsGuess sind urheberrechtlich geschutzt. Du darfst keinen Teil des Spiels ohne Erlaubnis kopieren, weiterverbreiten oder verandern.",
      },
      {
        heading: "Kein Konto erforderlich",
        text: "FoolsGuess erfordert keine Registrierung. Der Spielfortschritt wird lokal auf deinem Gerat gespeichert. Wir ubernehmen keine Haftung fur Datenverlust durch Loschen des Browser-Cache oder Geratewechsel.",
      },
      {
        heading: "Verfugbarkeit",
        text: "Wir bemuhen uns, FoolsGuess jederzeit verfugbar zu halten, garantieren aber keinen unterbrechungsfreien Dienst. Wartung, Updates oder technische Probleme konnen zu vorubergehenden Ausfallzeiten fuhren.",
      },
      {
        heading: "Haftungsbeschrankung",
        text: "FoolsGuess wird zu Unterhaltungszwecken bereitgestellt. Wir haften nicht fur Schaden, die aus der Nutzung dieses Dienstes entstehen.",
      },
      {
        heading: "Anderungen der Bedingungen",
        text: "Wir konnen diese Bedingungen von Zeit zu Zeit aktualisieren. Die fortgesetzte Nutzung des Dienstes nach Anderungen gilt als Zustimmung zu den aktualisierten Bedingungen.",
      },
      {
        heading: "Kontakt",
        text: "Bei Fragen zu diesen Bedingungen besuche bitte unsere Kontaktseite.",
      },
    ],
  },
  es: {
    title: "Terminos de Servicio",
    lastUpdated: "Ultima actualizacion: 14 de marzo de 2026",
    sections: [
      {
        heading: "Aceptacion de los terminos",
        text: "Al acceder y jugar a FoolsGuess, aceptas estos terminos. Si no estas de acuerdo, por favor no utilices el servicio.",
      },
      {
        heading: "Descripcion del servicio",
        text: "FoolsGuess es un juego gratuito de adivinanzas basado en encuestas y navegador. Proporcionamos el juego tal cual, sin garantias de ningun tipo. El servicio puede ser modificado, suspendido o descontinuado en cualquier momento sin previo aviso.",
      },
      {
        heading: "Conducta del usuario",
        text: "Al usar las funciones multijugador, te comprometes a elegir nombres apropiados y comportarte respetuosamente con otros jugadores. Nos reservamos el derecho de terminar el acceso a usuarios que violen esta politica.",
      },
      {
        heading: "Propiedad intelectual",
        text: "Todo el contenido, diseno y codigo de FoolsGuess estan protegidos por derechos de autor. No puedes copiar, redistribuir o modificar ninguna parte del juego sin permiso.",
      },
      {
        heading: "Sin cuenta requerida",
        text: "FoolsGuess no requiere registro. El progreso del juego se almacena localmente en tu dispositivo. No somos responsables de la perdida de datos debido a la limpieza de cache del navegador o cambios de dispositivo.",
      },
      {
        heading: "Disponibilidad",
        text: "Nos esforzamos por mantener FoolsGuess disponible en todo momento, pero no garantizamos un servicio ininterrumpido. El mantenimiento, actualizaciones o problemas tecnicos pueden causar tiempo de inactividad temporal.",
      },
      {
        heading: "Limitacion de responsabilidad",
        text: "FoolsGuess se proporciona con fines de entretenimiento. No somos responsables de ningun dano derivado del uso de este servicio.",
      },
      {
        heading: "Cambios en los terminos",
        text: "Podemos actualizar estos terminos de vez en cuando. El uso continuado del servicio despues de los cambios constituye la aceptacion de los terminos actualizados.",
      },
      {
        heading: "Contacto",
        text: "Para preguntas sobre estos terminos, visita nuestra pagina de contacto.",
      },
    ],
  },
};

export default function TermsPage() {
  const lang = useLang();
  const c = content[lang];

  return (
    <div className="min-h-screen bg-bg font-sans text-text">
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-border bg-bg/90 px-6 py-4 backdrop-blur-md">
        <a href="/" className="text-xl font-bold tracking-tight">
          <span className="text-accent">Fools</span>Guess
        </a>
      </nav>

      <main className="mx-auto max-w-2xl px-6 py-12">
        <h1 className="mb-2 text-3xl font-extrabold">{c.title}</h1>
        <p className="mb-8 text-sm text-text-dim">{c.lastUpdated}</p>

        <div className="flex flex-col gap-6">
          {c.sections.map((section, i) => (
            <div key={i}>
              <h2 className="mb-2 text-lg font-bold">{section.heading}</h2>
              <p className="text-text-muted leading-relaxed">{section.text}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
