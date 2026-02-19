import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_STORYBLOK_TOKEN: z.string().min(1).optional(),
});

const envResult = envSchema.safeParse(process.env);

if (!envResult.success) {
  throw new Error(`Invalid environment variables: ${envResult.error.message}`);
}

export const env = envResult.data;
