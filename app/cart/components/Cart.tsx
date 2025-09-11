"use client"

import { cartTypes } from "@/app/store/types";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { toast } from "react-toastify";

export const Cart = () => {
  const [carts, setCart] = useState<cartTypes[]>([]);
  const [allTotal, setAllTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const { data: authData } = useSession();

  async function handelIncrease(name: string,qty:number) {
    const updatedQty = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/quantity/increase`,{name},{withCredentials:true})  
    if(updatedQty.data.message === "Quantity updated"){
      setCart(prev =>
        prev.map(cur =>
          // cur.name === name ? { ...cur, qty: cur.qty + 1 } : cur
          cur.name === name ? { ...cur, qty: cur.qty + 1,total: Number(cur.price) * (cur.qty + 1) } : cur
        )
      );
    }

  }
  async function handelDecrease(name: string, qty: number) {
        if(qty > 1){
          const updatedQty = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/quantity/decrease`,{name},{withCredentials:true})  
          if(updatedQty.data.message === "Quantity updated"){
           setCart((prev) => prev.map(cur => cur.name === name ? { ...cur, qty: cur.qty - 1, total: Number(cur.price) * (cur.qty - 1)} : cur))
          }
        }else{
          toast.error("why are you making 0 qty...")
        }
        
  }
  useEffect(() => {
    setAllTotal(carts.reduce((acc, item) => acc + item.qty * item.price, 0))
  }, [carts]);

  async function handelRemove(name: string) {
    const remove = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/remove/cart`, {
      data: {
        email: authData?.user?.email,
        name
      },
      withCredentials: true
    })
    if (remove.status === 200) {
      setCart(carts.filter((cur) => cur.name != name))
    }
  }
  useEffect(() => {
    async function getCart() {
      setLoading(true)
      const cart = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/get/cart`, { withCredentials: true })
      if (cart.data.myCart) {
        cart.data.myCart.map((cur: any) => {
          setCart((prev) => [...prev, { name: cur.name, image: cur.image, qty: Number(cur.qty), price: Number(cur.price), total: Number(cur.total) }])
        })
        setLoading(false);
      }
    }
    getCart();
    return () => {
      setCart([]);
    };
  }, []);

  async function handelOrder(){
    const order = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/order/place`,{carts},{withCredentials:true})    

    if(order.data){
      const removedAll = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/remove/all`,{withCredentials:true})    
      if(removedAll.status === 200){
        router.push("/orders")
      }
    }
  }

  return (
    <section className="sm:grid sm:grid-cols-2 sm:gap-2 md:block mt-[200px] p-2 md:h-[410px] max-w-[1440px] mx-auto overflow-x-hidden overflow-y-scroll">
      {/* all total */}

      <div className="border border-black absolute top-[100px] py-4 w-full flex justify-center items-center flex-col max-w-[1440px]">
        <div className="flex gap-3">
          <span className="font-semibold">All Total : </span>
          <span className="">
            {
              new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(allTotal > 1000 ? allTotal + 20 : allTotal)
            }
          </span>
        </div>
        <div className="flex gap-7">
          <span className="font-semibold">Delivery Fee :</span>
          <span className="">{allTotal > 1000 ? "₹" + 20 : "₹" + 0}</span>
          <Button onClick={handelOrder} className="px-2">Make Order</Button>
        </div>
      </div>
      
      {/* all total end */}

      {
        loading ? <p className="">loading......</p> :

          carts.length > 0 ? carts.map((cur) => (

            <div key={cur.name} className="w-full lg:w-[80%] mt-2 px-3 py-2 flex flex-col md:flex-row gap-2 md:gap-6 overflow-x-hidden rounded-lg border-4 border-gray-300 mx-auto">

              <div className="  md:w-[40%] md:h-[100px] flex flex-col md:flex-row justify-center items-center gap-2 overflow-hidden">
                <div className="">
                  <Image
                    src={cur.image}
                    alt="image"
                    width={100}
                    height={100}
                    className="w-[100%] h-[100%] md:w-[60%] md:h-[60%]"
                  />
                </div>
                <span className="text-2xl md:h-[20px] md:w-[50%] lg:w-[70%] xl:w-[30%] sm:text-md md:text-[13px] lg:text-[15px] font-semibold overflow-hidden">{cur.name}</span>
              </div>

              <div className=" md:w-[300px] md:h-[100px] md:flex gap-5">

                <div className="flex justify-center items-center gap-1">
                  <span className="font-semibold">Price :</span>
                  <span className="">
                    {
                      new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(cur.price)
                    }
                  </span>
                </div>

                <div className="flex justify-center items-center gap-1">
                  <span className="font-semibold">Total :</span>
                  <span className="">
                    {
                      new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(cur.qty * cur.price)
                    }
                  </span>
                </div>

              </div>

              <div className="md:h-[100px] flex justify-center items-center gap-3">
                <Button onClick={() => handelDecrease(cur.name, cur.qty)} className=" text-2xl p-2 text-white bg-black cursor-pointer"><FaMinus /></Button>
                <span className="px-5 text-xl">{cur.qty}</span>
                <Button onClick={() => handelIncrease(cur.name,cur.qty)} className=" text-2xl p-2 text-white bg-black cursor-pointer"><FaPlus /></Button>
              </div>

              <div className="md:h-[100px] mx-auto md:flex md:justify-center md:items-center">
                <Button onClick={() => handelRemove(cur.name)} className="hover:bg-red-500 text-shadow-2xs cursor-pointer">remove</Button>
              </div>


            </div>
          )) : <div className="flex justify-center items-center text-2xl">Empty</div>
      }
    </section>
  )
}


