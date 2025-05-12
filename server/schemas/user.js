import { z } from "zod";

const signupZodSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(4),
});

const loginZodSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

export { signupZodSchema, loginZodSchema };
