import { NextRequest, NextResponse } from "next/server";

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_LIST_ID = parseInt(process.env.BREVO_LIST_ID || "2", 10);

export async function POST(request: NextRequest) {
  try {
    const { email, subscribe } = await request.json();

    if (!email || !BREVO_API_KEY) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    if (subscribe) {
      await fetch("https://api.brevo.com/v3/contacts", {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          "api-key": BREVO_API_KEY,
        },
        body: JSON.stringify({
          email,
          listIds: [BREVO_LIST_ID],
          updateEnabled: true,
        }),
      });
    } else {
      await fetch(
        `https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`,
        {
          method: "PUT",
          headers: {
            accept: "application/json",
            "content-type": "application/json",
            "api-key": BREVO_API_KEY,
          },
          body: JSON.stringify({
            unlinkListIds: [BREVO_LIST_ID],
          }),
        }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
