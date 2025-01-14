import { z } from "zod";

// Zod Validation Schema
export const FormSchema = z.object({
  fields: z.array(
    z.object({
      id: z.number(),
      value: z.string().min(1, "Field value is required"),
    })
  ),
});
