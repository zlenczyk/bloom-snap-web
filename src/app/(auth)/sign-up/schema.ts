import { z } from "zod";

const SignUpFormSchema = z
  .object({
    username: z
      .string()
      .min(1, "Username is required")
      .min(3, "Username must have at least 3 characters")
      .max(50, { message: "Username too long. Use up to 50 characters." }),
    email: z
      .string()
      .min(1, {
        message: "Email is required",
      })
      .email("Invalid email"),
    password: z
      .string()
      .min(1, "Password confirmation is required")
      .min(8, "Password must have at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  });

export default SignUpFormSchema;
