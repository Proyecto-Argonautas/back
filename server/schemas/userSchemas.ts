import { z } from "zod/v4";

export const registerSchema = z.object({
  name: z
    .string()
    .min(1, "Username is required")
    .min(3, "At least 3 characters long"),
  lastName: z.string().min(3, "at least 3 characters long"),
  email: z
    .email()
    .min(1, "Email is required")
    .min(3, "At least 3 characters long")
    .max(100, "Maximum 100 characters long"),
});

export const updateUserSchema = z.object({
  name: z.string().optional(),
  lastName: z.string().optional(),
});

export type RegisterUserValues = z.infer<typeof registerSchema>;

export const travel = z.object({
  destiny: z
    .string()
    .min(1, "name travel is required")
    .min(3, "the destiny must be at least 2 characters"),
});

// export const emailValidation = z.object({
//   email: z.email()
// })
