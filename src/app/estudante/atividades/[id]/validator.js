import { z } from "zod";

export const deliveryTaskSchema = z.object({
  content: z.string({ required_error: "Obrigatório." }).min(1, "Obrigatório."),
});

export const doubtSchema = z.object({
  message: z.string({ required_error: "Obrigatório." }).min(1, "Obrigatório."),
});
