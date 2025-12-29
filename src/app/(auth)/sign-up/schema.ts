import { z } from "zod";

export const UserNameSchema = z.object({
  userName: z
    .string()
    .min(1, "Username is required")
    .max(255, "Username too long. Use up to 255 characters."),
});

export const PasswordSchema = z
  .object({
    password: z.string().min(8, "Password must have at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must have at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const SignUpFormSchema = z.object({
  ...UserNameSchema.shape,
  email: z.email("Invalid email").min(1, { message: "Email is required" }),
  ...PasswordSchema.shape,
});
