import { describe, expect, it } from "vitest";
import { POST } from "@/app/api/contact/route";

describe("POST /api/contact", () => {
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
});
