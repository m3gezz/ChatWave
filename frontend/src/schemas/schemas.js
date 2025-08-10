import { refine, z } from "zod";

export const signinFormSchema = z.object({
  email: z.email(),
  password: z.string().trim().min(5, {
    message: "Password must be at least 5 characters.",
  }),
});

export const signupFormSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(3, {
        message: "Username must be at least 3 characters.",
      })
      .max(20, {
        message: "Username must not pass 20 characters.",
      }),
    email: z.email(),
    password: z.string().trim().min(5, {
      message: "Password must be at least 5 characters.",
    }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords must match",
    path: ["password_confirmation"],
  });
