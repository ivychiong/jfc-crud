import z from "zod";

export const LoginSchema = z.object({
  email: z
    .email("Please input your email address.")
    .min(1, "Email is required"),

  password: z
    .string()
    .min(6, "Please input your password.")
    .max(100, "Password cannot exceed 100 characters."),
  rememberMe: z.boolean().optional(),
});

export const RegisterSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required.")
      .max(50, "Name cannot exceed 50 characters.")
      .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces."),

    email: z
      .email("Please provide a valid email address.")
      .min(1, "Email is required."),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters long.")
      .max(100, "Password cannot exceed 100 characters.")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
      .regex(/[0-9]/, "Password must contain at least one number.")
      .regex(
        /[^a-zA-Z0-9]/,
        "Password must contain at least one special character."
      ),
    confirmPassword: z.string().min(1, "Please confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });
