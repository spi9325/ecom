import z from "zod";

export const registerSchema = z.object({
    email:z.email({message:"invalid email format"}),
    password:z.string().min(6,{message:"password is min 6 char"}).max(10,{message:"password is max 10 char"})
})