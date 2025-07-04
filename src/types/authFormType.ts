import { z } from "zod/v4";

// Auth form schema
export const AuthFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must have at least 2 characters")
    .optional(),
  email: z.email("Enter a valid email"),
  password: z
    .string()
    .trim()
    .min(8, "Password must have minimum of 8 characters"),
});

// Auth form type
export type AuthFormType = z.infer<typeof AuthFormSchema>;
