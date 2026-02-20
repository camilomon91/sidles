import { NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";
import { validateContactInput, type ApiError } from "@/lib/contact";
import { sendContactEmail } from "@/lib/contact-delivery";

function jsonError(error: ApiError["error"], status: number) {
  return NextResponse.json(
    { ok: false, error },
    {
      status,
      headers: {
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    },
  );
}

function getClientIp(req: Request) {
  const forwardedFor = req.headers.get("x-forwarded-for");
  return forwardedFor?.split(",")[0]?.trim() || "unknown";
}

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const rate = checkRateLimit(ip);

  if (!rate.allowed) {
    return jsonError(
      {
        code: "RATE_LIMITED",
        message: "Too many requests. Please try again later.",
      },
      429,
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return jsonError(
      {
        code: "INVALID_JSON",
        message: "Request body must be valid JSON.",
      },
      400,
    );
  }

  const validated = validateContactInput(body);

  if (!validated.ok) {
    return jsonError(validated.error, validated.error.code === "SPAM_DETECTED" ? 400 : 422);
  }

  const delivery = await sendContactEmail(validated.data);

  if (!delivery.ok) {
    return jsonError(
      {
        code: delivery.code,
        message: delivery.message,
      },
      delivery.code === "MISCONFIGURED" ? 503 : 502,
    );
  }

  return NextResponse.json(
    { ok: true },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    },
  );
}
