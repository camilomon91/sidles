export type ContactDeliveryInput = {
  email: string;
  message: string;
};

export type ContactDeliveryResult =
  | { ok: true }
  | { ok: false; code: "MISCONFIGURED" | "PROVIDER_ERROR"; message: string };

function getDeliveryConfig() {
  return {
    resendApiKey: process.env.RESEND_API_KEY,
    contactToEmail: process.env.CONTACT_TO_EMAIL,
    contactFromEmail: process.env.CONTACT_FROM_EMAIL,
  };
}

export async function sendContactEmail({ email, message }: ContactDeliveryInput): Promise<ContactDeliveryResult> {
  const { resendApiKey, contactToEmail, contactFromEmail } = getDeliveryConfig();

  if (!resendApiKey || !contactToEmail || !contactFromEmail) {
    return {
      ok: false,
      code: "MISCONFIGURED",
      message: "Contact email delivery is not configured on the server.",
    };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: contactFromEmail,
      to: [contactToEmail],
      reply_to: email,
      subject: `New contact form message from ${email}`,
      text: `You received a new contact message.\n\nFrom: ${email}\n\nMessage:\n${message}`,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    return {
      ok: false,
      code: "PROVIDER_ERROR",
      message: "Email provider rejected the message.",
    };
  }

  return { ok: true };
}
