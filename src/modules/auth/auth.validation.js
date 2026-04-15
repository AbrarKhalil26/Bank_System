import * as z from "zod";

export const loginSchema = {
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6).max(20),
  }),
};

export const registerSchema = {
  body: z
    .object({
      fullName: z.string({ error: "userName is required" }).min(3).max(20),
      email: z.string().email(),
      password: z.string().min(6).max(20),
      cPassword: z.string().min(6).max(20),
    })
    .refine((data) => data.password === data.cPassword, {
      message: "Passwords do not match",
      path: ["cPassword"],
    }),
};
