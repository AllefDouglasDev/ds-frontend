import { z } from "zod";

export const schema = z.object({
  message: z.string({ required_error: "Obrigatório." }).min(1, "Obrigatório."),
});
