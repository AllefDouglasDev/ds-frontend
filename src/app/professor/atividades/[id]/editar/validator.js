import { z } from "zod";

export const schema = z.object({
  title: z.string({ required_error: "Obrigatório." }).min(1, "Obrigatório."),
  classId: z.coerce
    .number({ required_error: "Obrigatório." })
    .min(1, "Obrigatório."),
  description: z
    .string({ required_error: "Obrigatório." })
    .min(1, "Obrigatório."),
  deadline: z
    .string({
      required_error: "Obrigatório.",
      invalid_type_error: "Obrigatório.",
    })
    .min(1, "Obrigatório.")
    .transform(data => new Date(data).toISOString()),
});

