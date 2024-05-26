import { z } from "zod";

export const LoginFormSchema = z.object({
  clubCode: z
    .string()
    .min(1, { message: "Club Code is required" })
    .regex(new RegExp("\\d{6}"), {
      message: "Club Code must be 6 digit code",
    })
    .max(6, { message: "Club Code must be 6 digit code" }),
});
