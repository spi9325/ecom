"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { SlMenu } from "react-icons/sl";
import { Profile } from "./Profile";
import axios from "axios";
import { useCartStore } from "@/app/store/carts";


export function Navbar() {
  const { data: authData } = useSession();
  const [nav, setNav] = useState<boolean>(false);
  const {addToCart} = useCartStore();

  //  async function getCart(){
  //           const cart = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/get/cart`,{email:authData?.user?.email})
  //           if(cart.data.myCart){
  //               cart.data.myCart.map((cur:any)=>{
  //                   addToCart(cur.name,cur.image,Number(cur.qty),Number(cur.price),Number(cur.total))
  //               })
  //           }
            
  //       }
  
  return (
    <header
      className={`max-w-[1440px] mx-auto flex justify-between items-center pr-3 z-50 fixed top-0 left-0 right-0 backdrop-blur-xl glass`}
    >
      <div className="flex p-1 py-4 gap-2 md:gap-[100px] borde">
        <div
          id="menuicon"
          onClick={() => {
            setNav(!nav);
          }}
          className="md:hidden flex justify-center items-center ml-2 md:ml-1 text-lg"
        >
          <SlMenu />
        </div>
        <Link
          href={"/"}
          className={` pl-2 flex justify-center items-center cursor-pointer`}
        >
          <p
            className={`logo text-2xl lg:text-3xl font-bold lg:pl-3 font-serif`}
          >
            E-COM
          </p>
        </Link>

        <nav className="hidden md:flex gap-5 lg:gap-7">
          <Link
            href={"/"}
            className="text-[15px] flex justify-center items-center text-black hover:text-slate-600  dark:text-slate-400 dark:hover:text-white  font-medium cursor-pointer"
          >
            Home
          </Link>

        </nav>

      </div>

      <div className="flex justify-center items-center gap-4 pr-5">
        <div className="cursor-pointer">
          {authData?.user != null && authData.user != undefined ? (
            <Profile authData={authData?.user} />
          ) : (
            <Link href={"/login"}>
              <button
                className={`w-[60px] md:w-[70px] h-[35px] md:h-[44px] rounded-md font-medium bg-black text-white dark:bg-white dark:text-black transform hover:cursor-pointer`}
              >
                Log in
              </button>
            </Link>
          )}
        </div>
        <Link href={"/cart"} className="hover:cursor-pointer">
          <IoCartOutline className="text-3xl" />
        </Link>
      </div>

      {/* nav */}
      <div className=" md:hidden absolute top-[65px] w-full bg-slate-100 dark:bg-black">
        {nav && (
          <nav className="flex flex-col pl-4 text-xl gap-2 py-3 w-[95%]">
            <Link className="" href={"/"}>
              Home
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
