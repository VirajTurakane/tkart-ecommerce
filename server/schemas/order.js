import { z } from "zod";

const orderZodSchema = z.object({
  id: z.string(),
  quantity: z.coerce.number().optional(),
  reason: z.string().optional(),
});

export { orderZodSchema };
