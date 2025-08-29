import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email({ message: "invalid email format" }),
  password: z.string().min(6, { message: "password is min 6 char" }),
});