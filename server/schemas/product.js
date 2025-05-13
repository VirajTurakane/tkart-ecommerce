import { z } from "zod";

const productZodSchema = z.object({
  thumbnail: z.string().optional(),
  imageURLs: z.array(z.string()).optional(),
  name: z.string(),
  description: z.string().optional(),
  stock: z.string(),
  price: z.string(),
  discount: z.string().optional(),
  totalRating: z.string().optional(),
  raters: z.string().optional(),
  variants: z.array(z.object({})).optional(),
});

export { productZodSchema };
