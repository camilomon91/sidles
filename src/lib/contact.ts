import { z } from "zod";

export const contactSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(1200, "Message must be 1200 characters or less"),
  website: z.string().optional().default(""),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ApiError = {
  ok: false;
  error: {
    code: string;
    message: string;
    fieldErrors?: Record<string, string[]>;
  };
};

export function validateContactInput(payload: unknown) {
  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return {
      ok: false as const,
      error: {
        code: "VALIDATION_ERROR",
        message: "Please fix the highlighted fields.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
    };
  }

  if (parsed.data.website) {
    return {
      ok: false as const,
      error: {
        code: "SPAM_DETECTED",
        message: "Spam detected.",
      },
    };
  }

  return { ok: true as const, data: parsed.data };
}
