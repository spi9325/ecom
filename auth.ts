import axios from "axios"
import NextAuth, { CredentialsSignin } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import bcrypt from "bcrypt"
import { registerSchema } from "./app/zodSchemas/types"
// Your own logic for dealing with plaintext password strings; be careful!
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
 
        const email = credentials.email as string | undefined
         const password = credentials.password as string | undefined
         if(!email || !password) throw new CredentialsSignin("provide both email password",{cause:"both required email and password"})
         const validInput = registerSchema.safeParse({ email, password });
         if (!validInput.success) {
          //@ts-ignore
           throw new CredentialsSignin(validInput.error.errors[0]?.message,{cause:validInput.error.errors[0]?.message+"...."});
         }
       
         const user = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/get/user`,{email})
         
         if (!user) {
          throw new CredentialsSignin("Invalid credentials.",{cause:"invalid credential"})
        }
         const validPassword = await bcrypt.compare(password!,user?.data?.password!)
          if(!validPassword){
            throw new CredentialsSignin("Invalid password.",{cause:"invalid credential"})
          }
         
         return {
           email: user?.data?.email.toString(),
         }
      },
    }),
     Google({ 
      clientId: `${process.env.AUTH_GOOGLE_ID}`,
      clientSecret: `${process.env.AUTH_GOOGLE_SECRET}`
    })
  ],
  pages: {
    signIn: "/signin"
  },
  callbacks: {
    async signIn({ account, user}) {
      if (account?.provider === "google") {
        const {email,image} = user;
        if(!email){
          return false
        }
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/add/googleuser`,{email,image});
              if(res.status === 200){
                return true
              }else{
                return false
              }
      }
      return true // Do different verification for other providers that don't have `email_verified`
    },
    
  },
})