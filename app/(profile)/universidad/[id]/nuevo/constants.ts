import * as z from "zod";

export const formSchema = z.object({
  name: z
    .string()
    .min(5, { message: "El nombre debe contener al menos 5 caracteres." }),
  course: z
    .string()
    .min(5, { message: "La materia debe contener al menos 5 caracteres." }),
  rate: z.enum(["", "1", "2", "3", "4", "5"]),
  difficulty: z.enum(["", "1", "2", "3", "4", "5"]),
  again: z.enum(["", "0", "1"]),
  content: z
    .string()
    .min(50, { message: "La reseña debe contener al menos 50 caracteres." })
    .max(500, { message: "La reseña debe contener menos de 500 caracteres." }),
});
