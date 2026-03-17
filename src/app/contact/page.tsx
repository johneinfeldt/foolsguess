"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n";

const content = {
  en: {
    title: "Contact",
    intro: "Have a question, found a bug, or want to suggest a feature? We'd love to hear from you!",
    feedback: "Please feel free to share any feedback you have — it helps us make FoolsGuess better for everyone.",
    name: "Your name",
    email: "Your email",
    message: "Your message",
    messagePlaceholder: "Tell us what's on your mind — bug reports, feature ideas, feedback, anything!",
    send: "Send",
    sending: "Sending...",
    success: "Thanks for your message! We'll get back to you soon.",
    error: "Something went wrong. Please try again or email us directly.",
    directEmail: "Or email us directly at",
    emailAddress: "hello@foolsguess.com",
  },
  de: {
    title: "Kontakt",
    intro: "Hast du eine Frage, einen Bug gefunden oder möchtest ein Feature vorschlagen? Wir freuen uns auf deine Nachricht!",
    feedback: "Teile uns gerne jedes Feedback mit — es hilft uns, FoolsGuess für alle besser zu machen.",
    name: "Dein Name",
    email: "Deine E-Mail",
    message: "Deine Nachricht",
    messagePlaceholder: "Erzähl uns, was dir auf dem Herzen liegt — Bug-Reports, Feature-Ideen, Feedback, alles!",
    send: "Senden",
    sending: "Wird gesendet...",
    success: "Danke für deine Nachricht! Wir melden uns bald bei dir.",
    error: "Etwas ist schiefgelaufen. Bitte versuche es erneut oder schreib uns direkt.",
    directEmail: "Oder schreib uns direkt an",
    emailAddress: "hello@foolsguess.com",
  },
  es: {
    title: "Contacto",
    intro: "¿Tienes una pregunta, encontraste un error o quieres sugerir una función? ¡Nos encantaría saber de ti!",
    feedback: "No dudes en compartir cualquier comentario que tengas — nos ayuda a mejorar FoolsGuess para todos.",
    name: "Tu nombre",
    email: "Tu correo electrónico",
    message: "Tu mensaje",
    messagePlaceholder: "Cuéntanos lo que piensas — reportes de errores, ideas de funciones, comentarios, ¡lo que sea!",
    send: "Enviar",
    sending: "Enviando...",
    success: "¡Gracias por tu mensaje! Te responderemos pronto.",
    error: "Algo salió mal. Inténtalo de nuevo o escríbenos directamente.",
    directEmail: "O escríbenos directamente a",
    emailAddress: "hello@foolsguess.com",
  },
};

export default function ContactPage() {
  const lang = useLang();
  const c = content[lang];
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (res.ok) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-bg font-sans text-text">
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-border bg-bg/90 px-6 py-4 backdrop-blur-md">
        <a href="/" className="text-xl font-bold tracking-tight">
          <span className="text-accent">Fools</span>Guess
        </a>
      </nav>

      <main className="mx-auto max-w-lg px-6 py-12">
        <h1 className="mb-2 text-3xl font-extrabold">{c.title}</h1>
        <p className="mb-2 text-text-muted">{c.intro}</p>
        <p className="mb-8 text-sm text-accent font-medium">{c.feedback}</p>

        {status === "success" ? (
          <div className="card p-8 text-center">
            <span className="mb-4 block text-4xl">&#x2705;</span>
            <p className="text-lg font-bold">{c.success}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-semibold text-text-muted">
                {c.name}
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-text outline-none transition-colors focus:border-accent"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-semibold text-text-muted">
                {c.email}
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-text outline-none transition-colors focus:border-accent"
              />
            </div>

            <div>
              <label htmlFor="message" className="mb-1 block text-sm font-semibold text-text-muted">
                {c.message}
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={c.messagePlaceholder}
                className="w-full resize-none rounded-xl border border-border bg-surface px-4 py-3 text-text outline-none transition-colors focus:border-accent"
              />
            </div>

            {status === "error" && (
              <p className="text-sm text-wrong">{c.error}</p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="press-effect rounded-xl bg-accent px-6 py-3.5 font-bold text-white transition-colors hover:bg-accent-light disabled:opacity-60"
            >
              {status === "sending" ? c.sending : c.send}
            </button>
          </form>
        )}

        <p className="mt-8 text-center text-sm text-text-dim">
          {c.directEmail}{" "}
          <a href={`mailto:${c.emailAddress}`} className="text-accent hover:text-accent-light">
            {c.emailAddress}
          </a>
        </p>
      </main>
    </div>
  );
}
