import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  // basic validation
  if (!body.email || !body.message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // In real life: send email via Resend/SendGrid, or store in DB.
  // For internship demo: log it and return success.
  console.log("Contact form submission:", body);

  return NextResponse.json({ ok: true });
}
