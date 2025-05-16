import { z } from "zod";

const orderZodSchema = z.object({
  id: z.string(),
  quantity: z.coerce.number(),
});

export { orderZodSchema };
