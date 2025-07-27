import { z } from "zod/v4";

export const registerSchema = z.object({
  name: z
    .string()
    .min(1, "Username is required")
    .min(3, "At least 3 characters long"),
  last_name: z.string().min(3, "at least 3 characters long"),
  email: z
    .email()
    .min(1, "Email is required")
    .min(3, "At least 3 characters long")
    .max(100, "Maximum 100 characters long"),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

export const travel = z.object({
  destiny: z
    .string()
    .min(1, "name travel is required")
    .min(3, "the destiny must be at least 2 characters"),
});

// export const userLoginSchema = z.object({
//     username: z.string(),
//     password: z.string().min(8),
// })
