import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/contact/route";

describe("POST /api/contact", () => {
  const originalFetch = global.fetch;
  const envBackup = {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL,
    CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL,
  };

  beforeEach(() => {
    process.env.RESEND_API_KEY = "re_test_key";
    process.env.CONTACT_TO_EMAIL = "owner@example.com";
    process.env.CONTACT_FROM_EMAIL = "Portfolio <noreply@example.com>";

    global.fetch = vi.fn(async () => new Response(JSON.stringify({ id: "email_123" }), { status: 200 })) as typeof fetch;
  });

  afterEach(() => {
    global.fetch = originalFetch;
    process.env.RESEND_API_KEY = envBackup.RESEND_API_KEY;
    process.env.CONTACT_TO_EMAIL = envBackup.CONTACT_TO_EMAIL;
    process.env.CONTACT_FROM_EMAIL = envBackup.CONTACT_FROM_EMAIL;
    vi.restoreAllMocks();
  });

  it("returns ok on valid payload", async () => {
    const req = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json", "x-forwarded-for": "10.0.0.1" },
      body: JSON.stringify({ email: "a@b.com", message: "This is enough content", website: "" }),
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.ok).toBe(true);
    expect(global.fetch).toHaveBeenCalledOnce();
  });

  it("returns validation error on invalid payload", async () => {
    const req = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json", "x-forwarded-for": "10.0.0.2" },
      body: JSON.stringify({ email: "bad", message: "short", website: "" }),
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(422);
    expect(data.ok).toBe(false);
    expect(data.error.code).toBe("VALIDATION_ERROR");
  });

  it("returns misconfigured error when delivery env vars are missing", async () => {
    process.env.RESEND_API_KEY = "";

    const req = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json", "x-forwarded-for": "10.0.0.3" },
      body: JSON.stringify({ email: "a@b.com", message: "This is enough content", website: "" }),
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(503);
    expect(data.ok).toBe(false);
    expect(data.error.code).toBe("MISCONFIGURED");
  });
});
