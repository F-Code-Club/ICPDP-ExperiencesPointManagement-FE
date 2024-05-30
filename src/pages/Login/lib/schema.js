import { z } from "zod";

export const LoginFormSchema = z.object({
  code: z
    .string()
    .min(1, { message: "Code is required" })
    .max(256, { message: "Code must must not exceed 256 characters" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .max(128, { message: "Password must not exceed 128 characters" }),
});
