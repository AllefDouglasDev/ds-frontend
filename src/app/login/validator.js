import { z } from "zod";

export const schema = z.object({
  email: z
    .string({ required_error: "Obrigatório." })
    .min(1, "Obrigatório.")
    .email(),
  password: z.string({ required_error: "Obrigatório." }).min(1, "Obrigatório."),
});
