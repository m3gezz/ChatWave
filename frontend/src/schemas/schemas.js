import { refine, z } from "zod";

export const signinFormSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .trim()
    .min(5, {
      message: "Password must be at least 5 characters.",
    })
    .max(255, {
      message: "Password must not pass 255 characters.",
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
    password: z
      .string()
      .trim()
      .min(5, {
        message: "Password must be at least 5 characters.",
      })
      .max(255, {
        message: "Password must not pass 255 characters.",
      }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords must match",
    path: ["password_confirmation"],
  });

export const usernameSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, {
      message: "Username must be at least 3 characters.",
    })
    .max(20, {
      message: "Username must not pass 20 characters.",
    }),
});

export const emailSchema = z.object({
  email: z.email(),
});

export const passwordsSchema = z
  .object({
    old_password: z
      .string()
      .trim()
      .min(5, {
        message: "Password must be at least 5 characters.",
      })
      .max(255, {
        message: "Password must not pass 255 characters.",
      }),
    new_password: z
      .string()
      .trim()
      .min(5, {
        message: "Password must be at least 5 characters.",
      })
      .max(255, {
        message: "Password must not pass 255 characters.",
      }),
    new_password_confirmation: z.string(),
  })
  .refine((data) => data.old_password !== data.new_password, {
    message: "Old and New Passwords must not match",
    path: ["new_password"],
  })
  .refine((data) => data.new_password === data.new_password_confirmation, {
    message: "New and the confirmation Passwords must match",
    path: ["new_password_confirmation"],
  });

export const accountDeletionSchema = z.object({
  password: z
    .string()
    .trim()
    .min(5, {
      message: "Password must be at least 5 characters.",
    })
    .max(255, {
      message: "Password must not pass 255 characters.",
    }),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .trim()
      .min(5, {
        message: "Password must be at least 5 characters.",
      })
      .max(255, {
        message: "Password must not pass 255 characters.",
      }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords must match",
    path: ["password_confirmation"],
  });

export const groupCreationSchema = z.object({
  title: z
    .string()
    .trim()
    .min(4, {
      message: "Title must be at least 4 characters.",
    })
    .max(40, {
      message: "Title must not be over 40 characters.",
    }),
  members: z
    .array(z.string())
    .min(1, "Pick at least one member")
    .max(5, "Pick 5 or less member"),
  avatar: z.string(),
});

export const conversationCreationSchema = z.object({
  members: z.string({ message: "Pick a member" }),
});

export const messageSchema = z.object({
  message: z.string().trim().min(1).max(255),
});

export const groupEditSchema = z.object({
  title: z
    .string()
    .trim()
    .min(4, {
      message: "Title must be at least 4 characters.",
    })
    .max(40, {
      message: "Title must not be over 40 characters.",
    }),
  avatar: z.string(),
});

export const membersEditSchema = z.object({
  members: z.array(z.string()).min(0).max(5, "Pick 5 or less member"),
});
