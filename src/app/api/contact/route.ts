import { NextRequest, NextResponse } from "next/server";

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const CONTACT_EMAIL = "hello@foolsguess.com";

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    if (!BREVO_API_KEY) {
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: { name: "FoolsGuess Contact", email: CONTACT_EMAIL },
        to: [{ email: CONTACT_EMAIL }],
        replyTo: { name, email },
        subject: `FoolsGuess Contact: ${name}`,
        htmlContent: `
          <h2>New message from FoolsGuess contact form</h2>
          <p><strong>Name:</strong> ${name.replace(/</g, "&lt;")}</p>
          <p><strong>Email:</strong> ${email.replace(/</g, "&lt;")}</p>
          <hr />
          <p>${message.replace(/</g, "&lt;").replace(/\n/g, "<br />")}</p>
        `,
      }),
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to send" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
