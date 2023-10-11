import * as z from "zod";

export const formSchema = z.object({
  safety: z.enum(["", "1", "2", "3", "4", "5"]),
  location: z.enum(["", "1", "2", "3", "4", "5"]),
  happiness: z.enum(["", "1", "2", "3", "4", "5"]),
  opportunities: z.enum(["", "1", "2", "3", "4", "5"]),
  reputation: z.enum(["", "1", "2", "3", "4", "5"]),
  clubs: z.enum(["", "1", "2", "3", "4", "5"]),
  facilities: z.enum(["", "1", "2", "3", "4", "5"]),
  internet: z.enum(["", "1", "2", "3", "4", "5"]),
  food: z.enum(["", "1", "2", "3", "4", "5"]),
  social: z.enum(["", "1", "2", "3", "4", "5"]),
  content: z
    .string()
    .min(50, { message: "La reseña debe contener al menos 50 caracteres." })
    .max(500, { message: "La reseña debe contener menos de 500 caracteres." }),
});
