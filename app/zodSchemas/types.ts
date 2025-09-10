import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email({ message: "invalid email format" }),
  password: z.string().min(6, { message: "password is min 6 char" }),
});

export const formSchema = z.object({
  phone: z.string().length(10, "Phone number must be 10 digits"),
  pincode: z.string().length(6, "Pincode must be 6 digits"),
  quantity: z.number().min(1, "Minimum quantity is 1"),
  paymentMethod: z.enum(["cod", "card"])
    .refine((val) => val === "cod" || val === "card", {
      message: "Please select a payment method",
    }),
  address: z.string().min(5, "Address must be at least 5 characters"),
});