"use client";

import { useLang } from "@/lib/i18n";

const content = {
  en: {
    title: "Legal Notice (Impressum)",
    lastUpdated: "Last updated: March 14, 2026",
    responsible: "Responsible for this website according to \u00a7 5 TMG:",
    name: "John-Niklas Einfeldt",
    address: "Feldbergblick 6\n61273 Wehrheim\nGermany",
    contactTitle: "Contact",
    contactNote:
      "Email address will be added shortly. In the meantime, please use our contact page.",
    disclaimerTitle: "Disclaimer",
    disclaimerContent:
      "Despite careful content control, we assume no liability for the content of external links. The operators of the linked pages are solely responsible for their content.",
    copyrightTitle: "Copyright",
    copyrightContent:
      "The content and works created by the site operator on these pages are subject to copyright law. Duplication, processing, distribution, or any form of commercialization beyond the scope of copyright law requires the written consent of the respective author or creator.",
  },
  de: {
    title: "Impressum",
    lastUpdated: "Zuletzt aktualisiert: 14. M\u00e4rz 2026",
    responsible: "Angaben gem\u00e4\u00df \u00a7 5 TMG:",
    name: "John-Niklas Einfeldt",
    address: "Feldbergblick 6\n61273 Wehrheim\nDeutschland",
    contactTitle: "Kontakt",
    contactNote:
      "E-Mail-Adresse wird in K\u00fcrze erg\u00e4nzt. Bitte nutze in der Zwischenzeit unsere Kontaktseite.",
    disclaimerTitle: "Haftungsausschluss",
    disclaimerContent:
      "Trotz sorgf\u00e4ltiger inhaltlicher Kontrolle \u00fcbernehmen wir keine Haftung f\u00fcr die Inhalte externer Links. F\u00fcr den Inhalt der verlinkten Seiten sind ausschlie\u00dflich deren Betreiber verantwortlich.",
    copyrightTitle: "Urheberrecht",
    copyrightContent:
      "Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielf\u00e4ltigung, Bearbeitung, Verbreitung und jede Art der Verwertung au\u00dferhalb der Grenzen des Urheberrechtes bed\u00fcrfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.",
  },
  es: {
    title: "Aviso Legal (Impressum)",
    lastUpdated: "\u00daltima actualizaci\u00f3n: 14 de marzo de 2026",
    responsible:
      "Responsable de este sitio web seg\u00fan \u00a7 5 TMG (ley alemana de telemedia):",
    name: "John-Niklas Einfeldt",
    address: "Feldbergblick 6\n61273 Wehrheim\nAlemania",
    contactTitle: "Contacto",
    contactNote:
      "La direcci\u00f3n de correo electr\u00f3nico se a\u00f1adir\u00e1 pronto. Mientras tanto, utiliza nuestra p\u00e1gina de contacto.",
    disclaimerTitle: "Descargo de responsabilidad",
    disclaimerContent:
      "A pesar del cuidadoso control del contenido, no asumimos ninguna responsabilidad por el contenido de los enlaces externos. Los operadores de las p\u00e1ginas enlazadas son los \u00fanicos responsables de su contenido.",
    copyrightTitle: "Derechos de autor",
    copyrightContent:
      "El contenido y las obras creadas por el operador del sitio en estas p\u00e1ginas est\u00e1n sujetos a la ley de derechos de autor alemana. La duplicaci\u00f3n, el procesamiento, la distribuci\u00f3n o cualquier forma de comercializaci\u00f3n m\u00e1s all\u00e1 del alcance de la ley de derechos de autor requiere el consentimiento por escrito del autor o creador respectivo.",
  },
};

export default function ImpressumPage() {
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
          {/* Responsible party */}
          <div>
            <p className="mb-2 text-text-muted">{c.responsible}</p>
            <p className="font-bold">{c.name}</p>
            <p className="whitespace-pre-line text-text-muted">{c.address}</p>
          </div>

          {/* Contact */}
          <div>
            <h2 className="mb-2 text-lg font-bold">{c.contactTitle}</h2>
            <p className="text-text-muted leading-relaxed">
              {c.contactNote}{" "}
              <a
                href="/contact"
                className="text-accent transition-colors hover:text-accent-light"
              >
                &rarr; {c.contactTitle}
              </a>
            </p>
          </div>

          {/* Disclaimer */}
          <div>
            <h2 className="mb-2 text-lg font-bold">{c.disclaimerTitle}</h2>
            <p className="text-text-muted leading-relaxed">
              {c.disclaimerContent}
            </p>
          </div>

          {/* Copyright */}
          <div>
            <h2 className="mb-2 text-lg font-bold">{c.copyrightTitle}</h2>
            <p className="text-text-muted leading-relaxed">
              {c.copyrightContent}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
