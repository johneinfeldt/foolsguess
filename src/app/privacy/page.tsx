"use client";

import { useLang } from "@/lib/i18n";

const content = {
  en: {
    title: "Privacy Policy",
    lastUpdated: "Last updated: March 14, 2026",
    sections: [
      {
        heading: "1. Overview",
        text: "FoolsGuess is a free browser-based game operated by John-Niklas Einfeldt, Feldbergblick 6, 61273 Wehrheim, Germany. We respect your privacy and collect as little data as possible. No account or sign-up is required to play.",
      },
      {
        heading: "2. Responsible Party",
        text: "The responsible party (Verantwortlicher) within the meaning of the General Data Protection Regulation (GDPR) is: John-Niklas Einfeldt, Feldbergblick 6, 61273 Wehrheim, Germany. For contact, please use our contact page.",
      },
      {
        heading: "3. Data We Collect",
        text: "We do not collect personal data such as your name, email address, or location. Game progress (scores, energy, level) is stored locally in your browser using localStorage. This data never leaves your device.",
      },
      {
        heading: "4. Legal Basis",
        text: "To the extent that any data processing occurs, it is based on Art. 6(1)(f) GDPR (legitimate interest in providing and improving our service). For online multiplayer, the legal basis is Art. 6(1)(b) GDPR (performance of a contract / provision of the requested service).",
      },
      {
        heading: "5. Cookies & Local Storage",
        text: "FoolsGuess does not use tracking cookies. We only use localStorage to save your game progress and language preference. localStorage is a browser technology that stores data locally on your device and does not transmit data to any server.",
      },
      {
        heading: "6. Online Multiplayer",
        text: "When you use the online party mode, your chosen display name and avatar are shared with other players in the same room via our game server (PartyKit). This data is temporary and is deleted when the room closes. No data is stored permanently on our servers.",
      },
      {
        heading: "7. Hosting & CDN",
        text: "This website is hosted on Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA. When you visit our website, Vercel may process your IP address and technical metadata (browser type, operating system) for delivery purposes. For details, see Vercel's privacy policy at vercel.com/legal/privacy-policy.",
      },
      {
        heading: "8. Analytics",
        text: "We may use privacy-friendly, cookie-free analytics (such as Vercel Analytics) to understand general usage patterns (e.g. page views). This data is anonymous and cannot be used to identify you.",
      },
      {
        heading: "9. Third-Party Services",
        text: "The game is hosted on Vercel. The online multiplayer feature uses PartyKit for real-time communication. Both services may process technical connection data (IP address). Please refer to their respective privacy policies for details.",
      },
      {
        heading: "10. Your Rights (GDPR)",
        text: "Under the GDPR, you have the right to: access your data (Art. 15), rectification (Art. 16), erasure (Art. 17), restriction of processing (Art. 18), data portability (Art. 20), and objection to processing (Art. 21). You also have the right to lodge a complaint with a supervisory authority. Since we do not collect personal data, these rights are largely not applicable in practice.",
      },
      {
        heading: "11. Children's Privacy",
        text: "FoolsGuess does not knowingly collect data from children. The game is suitable for all ages and does not require any personal information.",
      },
      {
        heading: "12. Changes",
        text: "We may update this privacy policy from time to time. Changes will be reflected on this page with an updated date.",
      },
      {
        heading: "13. Contact",
        text: "If you have questions about this privacy policy, please reach out via our contact page.",
      },
    ],
  },
  de: {
    title: "Datenschutzerkl\u00e4rung",
    lastUpdated: "Zuletzt aktualisiert: 14. M\u00e4rz 2026",
    sections: [
      {
        heading: "1. \u00dcberblick",
        text: "FoolsGuess ist ein kostenloses Browserspiel, betrieben von John-Niklas Einfeldt, Feldbergblick 6, 61273 Wehrheim, Deutschland. Wir respektieren deine Privatsph\u00e4re und erheben so wenige Daten wie m\u00f6glich. Zum Spielen ist kein Konto oder Registrierung erforderlich.",
      },
      {
        heading: "2. Verantwortlicher",
        text: "Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist: John-Niklas Einfeldt, Feldbergblick 6, 61273 Wehrheim, Deutschland. F\u00fcr Kontaktaufnahme nutze bitte unsere Kontaktseite.",
      },
      {
        heading: "3. Welche Daten wir erheben",
        text: "Wir erheben keine personenbezogenen Daten wie Name, E-Mail-Adresse oder Standort. Der Spielfortschritt (Punkte, Energie, Level) wird lokal in deinem Browser per localStorage gespeichert. Diese Daten verlassen dein Ger\u00e4t nicht.",
      },
      {
        heading: "4. Rechtsgrundlage",
        text: "Soweit eine Datenverarbeitung stattfindet, erfolgt diese auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Bereitstellung und Verbesserung unseres Dienstes). F\u00fcr den Online-Mehrspieler ist die Rechtsgrundlage Art. 6 Abs. 1 lit. b DSGVO (Vertragserf\u00fcllung / Erbringung des angeforderten Dienstes).",
      },
      {
        heading: "5. Cookies & Lokale Speicherung",
        text: "FoolsGuess verwendet keine Tracking-Cookies. Wir nutzen nur localStorage, um deinen Spielfortschritt und deine Spracheinstellung zu speichern. localStorage ist eine Browser-Technologie, die Daten lokal auf deinem Ger\u00e4t speichert und keine Daten an Server \u00fcbertr\u00e4gt.",
      },
      {
        heading: "6. Online-Mehrspieler",
        text: "Wenn du den Online-Party-Modus nutzt, werden dein gew\u00e4hlter Anzeigename und Avatar mit anderen Spielern im selben Raum \u00fcber unseren Spielserver (PartyKit) geteilt. Diese Daten sind tempor\u00e4r und werden gel\u00f6scht, wenn der Raum geschlossen wird. Es werden keine Daten dauerhaft auf unseren Servern gespeichert.",
      },
      {
        heading: "7. Hosting & CDN",
        text: "Diese Website wird bei Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA gehostet. Beim Besuch unserer Website kann Vercel deine IP-Adresse und technische Metadaten (Browsertyp, Betriebssystem) f\u00fcr Auslieferungszwecke verarbeiten. Details findest du in der Datenschutzerkl\u00e4rung von Vercel unter vercel.com/legal/privacy-policy.",
      },
      {
        heading: "8. Analysen",
        text: "Wir verwenden m\u00f6glicherweise datenschutzfreundliche, cookiefreie Analysen (wie Vercel Analytics), um allgemeine Nutzungsmuster zu verstehen (z.B. Seitenaufrufe). Diese Daten sind anonym und k\u00f6nnen nicht zur Identifizierung verwendet werden.",
      },
      {
        heading: "9. Drittanbieter-Dienste",
        text: "Das Spiel wird auf Vercel gehostet. Die Online-Mehrspieler-Funktion nutzt PartyKit f\u00fcr Echtzeitkommunikation. Beide Dienste k\u00f6nnen technische Verbindungsdaten (IP-Adresse) verarbeiten. Bitte beachte deren jeweilige Datenschutzerkl\u00e4rungen f\u00fcr Details.",
      },
      {
        heading: "10. Deine Rechte (DSGVO)",
        text: "Nach der DSGVO hast du das Recht auf: Auskunft (Art. 15), Berichtigung (Art. 16), L\u00f6schung (Art. 17), Einschr\u00e4nkung der Verarbeitung (Art. 18), Daten\u00fcbertragbarkeit (Art. 20) und Widerspruch gegen die Verarbeitung (Art. 21). Du hast au\u00dferdem das Recht, eine Beschwerde bei einer Aufsichtsbeh\u00f6rde einzureichen. Da wir keine personenbezogenen Daten erheben, sind diese Rechte in der Praxis weitgehend nicht anwendbar.",
      },
      {
        heading: "11. Datenschutz f\u00fcr Kinder",
        text: "FoolsGuess erhebt wissentlich keine Daten von Kindern. Das Spiel ist f\u00fcr alle Altersgruppen geeignet und erfordert keine pers\u00f6nlichen Informationen.",
      },
      {
        heading: "12. \u00c4nderungen",
        text: "Wir k\u00f6nnen diese Datenschutzerkl\u00e4rung von Zeit zu Zeit aktualisieren. \u00c4nderungen werden auf dieser Seite mit einem aktualisierten Datum angezeigt.",
      },
      {
        heading: "13. Kontakt",
        text: "Bei Fragen zu dieser Datenschutzerkl\u00e4rung wende dich bitte \u00fcber unsere Kontaktseite an uns.",
      },
    ],
  },
  es: {
    title: "Pol\u00edtica de Privacidad",
    lastUpdated: "\u00daltima actualizaci\u00f3n: 14 de marzo de 2026",
    sections: [
      {
        heading: "1. Resumen",
        text: "FoolsGuess es un juego gratuito basado en navegador operado por John-Niklas Einfeldt, Feldbergblick 6, 61273 Wehrheim, Alemania. Respetamos tu privacidad y recopilamos la menor cantidad de datos posible. No se requiere cuenta ni registro para jugar.",
      },
      {
        heading: "2. Responsable",
        text: "El responsable en el sentido del Reglamento General de Protecci\u00f3n de Datos (RGPD) es: John-Niklas Einfeldt, Feldbergblick 6, 61273 Wehrheim, Alemania. Para contacto, utiliza nuestra p\u00e1gina de contacto.",
      },
      {
        heading: "3. Datos que recopilamos",
        text: "No recopilamos datos personales como nombre, correo electr\u00f3nico o ubicaci\u00f3n. El progreso del juego (puntuaciones, energ\u00eda, nivel) se almacena localmente en tu navegador usando localStorage. Estos datos nunca salen de tu dispositivo.",
      },
      {
        heading: "4. Base legal",
        text: "En la medida en que se produzca alg\u00fan tratamiento de datos, se basa en el Art. 6(1)(f) RGPD (inter\u00e9s leg\u00edtimo en proporcionar y mejorar nuestro servicio). Para el multijugador en l\u00ednea, la base legal es el Art. 6(1)(b) RGPD (ejecuci\u00f3n de un contrato / prestaci\u00f3n del servicio solicitado).",
      },
      {
        heading: "5. Cookies y almacenamiento local",
        text: "FoolsGuess no utiliza cookies de seguimiento. Solo usamos localStorage para guardar tu progreso de juego y preferencia de idioma. localStorage es una tecnolog\u00eda del navegador que almacena datos localmente en tu dispositivo y no transmite datos a ning\u00fan servidor.",
      },
      {
        heading: "6. Multijugador en l\u00ednea",
        text: "Cuando usas el modo fiesta en l\u00ednea, tu nombre y avatar elegidos se comparten con otros jugadores en la misma sala a trav\u00e9s de nuestro servidor de juego (PartyKit). Estos datos son temporales y se eliminan cuando la sala se cierra. No se almacenan datos permanentemente en nuestros servidores.",
      },
      {
        heading: "7. Hosting y CDN",
        text: "Este sitio web est\u00e1 alojado en Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, EE.UU. Al visitar nuestro sitio web, Vercel puede procesar tu direcci\u00f3n IP y metadatos t\u00e9cnicos (tipo de navegador, sistema operativo) con fines de entrega. Consulta la pol\u00edtica de privacidad de Vercel en vercel.com/legal/privacy-policy.",
      },
      {
        heading: "8. An\u00e1lisis",
        text: "Podemos usar anal\u00edticas respetuosas con la privacidad y sin cookies (como Vercel Analytics) para entender patrones generales de uso (ej. visitas a p\u00e1ginas). Estos datos son an\u00f3nimos y no pueden usarse para identificarte.",
      },
      {
        heading: "9. Servicios de terceros",
        text: "El juego est\u00e1 alojado en Vercel. La funci\u00f3n multijugador en l\u00ednea usa PartyKit para comunicaci\u00f3n en tiempo real. Ambos servicios pueden procesar datos t\u00e9cnicos de conexi\u00f3n (direcci\u00f3n IP). Consulta sus respectivas pol\u00edticas de privacidad para m\u00e1s detalles.",
      },
      {
        heading: "10. Tus derechos (RGPD)",
        text: "Bajo el RGPD, tienes derecho a: acceso a tus datos (Art. 15), rectificaci\u00f3n (Art. 16), supresi\u00f3n (Art. 17), limitaci\u00f3n del tratamiento (Art. 18), portabilidad de datos (Art. 20) y oposici\u00f3n al tratamiento (Art. 21). Tambi\u00e9n tienes derecho a presentar una queja ante una autoridad de supervisi\u00f3n. Dado que no recopilamos datos personales, estos derechos son en gran medida no aplicables en la pr\u00e1ctica.",
      },
      {
        heading: "11. Privacidad de menores",
        text: "FoolsGuess no recopila datos de menores de forma consciente. El juego es adecuado para todas las edades y no requiere informaci\u00f3n personal.",
      },
      {
        heading: "12. Cambios",
        text: "Podemos actualizar esta pol\u00edtica de privacidad de vez en cuando. Los cambios se reflejar\u00e1n en esta p\u00e1gina con una fecha actualizada.",
      },
      {
        heading: "13. Contacto",
        text: "Si tienes preguntas sobre esta pol\u00edtica de privacidad, cont\u00e1ctanos a trav\u00e9s de nuestra p\u00e1gina de contacto.",
      },
    ],
  },
};

export default function PrivacyPage() {
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
