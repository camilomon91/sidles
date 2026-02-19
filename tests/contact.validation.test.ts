import { describe, expect, it } from "vitest";
import { validateContactInput } from "@/lib/contact";

describe("validateContactInput", () => {
  it("accepts valid input", () => {
    const result = validateContactInput({
      email: " hello@example.com ",
      message: "  This is a valid message body.  ",
      website: "",
    });

    expect(result.ok).toBe(true);
  });

  it("rejects invalid input", () => {
    const result = validateContactInput({ email: "bad", message: "short" });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.code).toBe("VALIDATION_ERROR");
      expect(result.error.fieldErrors?.email).toBeTruthy();
      expect(result.error.fieldErrors?.message).toBeTruthy();
    }
  });
});
