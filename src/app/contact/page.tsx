"use client";

import { useLang } from "@/lib/i18n";

const content = {
  en: {
    title: "Contact",
    intro: "Have a question, found a bug, or want to suggest a feature? We'd love to hear from you.",
    email: "Email",
    emailAddress: "hello@foolsguess.com",
    github: "GitHub",
    githubDesc: "Report bugs or suggest features on our GitHub repository.",
    social: "Follow Us",
    response: "We typically respond within 48 hours.",
  },
  de: {
    title: "Kontakt",
    intro: "Hast du eine Frage, einen Bug gefunden oder mochtest ein Feature vorschlagen? Wir freuen uns auf deine Nachricht.",
    email: "E-Mail",
    emailAddress: "hello@foolsguess.com",
    github: "GitHub",
    githubDesc: "Melde Bugs oder schlage Features in unserem GitHub-Repository vor.",
    social: "Folge uns",
    response: "Wir antworten in der Regel innerhalb von 48 Stunden.",
  },
  es: {
    title: "Contacto",
    intro: "Tienes una pregunta, encontraste un error o quieres sugerir una funcion? Nos encantaria saber de ti.",
    email: "Correo electronico",
    emailAddress: "hello@foolsguess.com",
    github: "GitHub",
    githubDesc: "Reporta errores o sugiere funciones en nuestro repositorio de GitHub.",
    social: "Siguenos",
    response: "Normalmente respondemos en 48 horas.",
  },
};

export default function ContactPage() {
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
        <p className="mb-8 text-text-muted">{c.intro}</p>

        <div className="flex flex-col gap-4">
          {/* Email */}
          <div className="card p-5">
            <h2 className="mb-1 text-sm font-bold uppercase tracking-wider text-text-dim">{c.email}</h2>
            <a
              href={`mailto:${c.emailAddress}`}
              className="text-lg font-semibold text-accent transition-colors hover:text-accent-light"
            >
              {c.emailAddress}
            </a>
          </div>

          {/* GitHub */}
          <div className="card p-5">
            <h2 className="mb-1 text-sm font-bold uppercase tracking-wider text-text-dim">{c.github}</h2>
            <a
              href="https://github.com/johneinfeldt/foolsguess"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold text-accent transition-colors hover:text-accent-light"
            >
              github.com/johneinfeldt/foolsguess
            </a>
            <p className="mt-1 text-sm text-text-muted">{c.githubDesc}</p>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-text-dim">{c.response}</p>
      </main>
    </div>
  );
}
