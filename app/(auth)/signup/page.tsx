"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { toast } from "react-toastify";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { registerSchema } from "@/app/zodSchemas/types";

export default function Page() {
 const router = useRouter();
  async function signup(e: FormEvent<HTMLFormElement>) {
    try {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string | undefined;
        const password = formData.get("password") as string | undefined;
        if (!email || !password) {
          toast.error("please provide all values");
          return;
        }
        const validInput = registerSchema.safeParse({ email, password });
        if (!validInput.success) {
          toast.error((Array(validInput.error).map(cur=>(cur.issues[0].message))).toString())
          return;
        }
        const result = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/add/user`,
          {
            email: validInput.data.email,
            password: validInput.data.password,
          }
        );
        if(result.data){
          toast.success(result.data.toString())
          // console.log(result.data)
        }
    } catch (error:any) {
        // console.error(error.response.data.message);
        if(error.response.status == 400){
          toast.error(error.response.data.message);
        }
    }
  }

  return (
    <div className="flex justify-center items-center w-full h-dvh">
      <Card className="w-[90%] md:w-[50%] lg:w-[28%]">
        <CardHeader>
          <CardTitle className="text-2xl text-center">SignUp</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" onSubmit={signup}>
            <Input placeholder="Email" name="email" />
            <Input placeholder="password" name="password" type="password" />
            <Button type="submit">SignUp</Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <form
            className="flex flex-col gap-4"
            action={async () => {
              await signIn("google",{redirectTo:"/"});
            }}
          >
            <p className="text-center">OR</p>
            <Button type="submit" variant={"outline"}>
              <FcGoogle />
              Login With Google
            </Button>
          </form>
          <Link
            className="text-sm flex gap-2 mt-2 hover:text-green-600"
            href={"/login"}
          >
            <p className="text-black dark:text-white">
              Already have an account?
            </p>
            Signin
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}