import { z } from "zod";

const signupZodSchema = z.object({
  fname: z.string(),
  lname: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  password: z.string().min(4),
  address: z.string().optional()
});

const loginZodSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

export { signupZodSchema, loginZodSchema };
