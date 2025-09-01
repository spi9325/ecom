"use client"
import { cartStore, cartView } from '@/app/store/products'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { PiSmileyNervous } from "react-icons/pi";
import { CartLoader } from './CartLoader'

interface cartType {
    name: string;
    price: string;
    availabel: string;
    image: string;
}
export const Cart = () => {
    const {data:authData} = useSession();
    const [loading,setLoading] = useState(false);
    const { myCart, remove, add } = cartStore()
    const { viewCart } = cartView()
    const router = useRouter();
    if (!authData?.user?.email) {
        router.push("/login");
    }
    useEffect(() => {
       setLoading(true);
        async function getCart() {
            const mycart = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/get/mycart`, { email:authData?.user?.email!})
            if (mycart.status == 200) {
                myCart.forEach((item) => remove(item.name));

                mycart.data.myCart.forEach((cur: cartType) => {
                    add(cur.name, cur.price, cur.availabel, cur.image);
                });

                setLoading(false);
            }
        }
        getCart();
        
    }, [authData?.user?.email])

    async function handelRemove(name:string){
        remove(name)
        await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/remove/cart`,{
            data:{
                email:authData?.user?.email,
                name
            }
        })
    }

    return (
        loading ? <div className="">
                        <CartLoader/>
                  </div>
         :
        <div className="px-1 sm:px-4 py-3 w-full flex flex-col gap-1">
            {
               myCart.length > 0 ?  myCart.map((cur, index) => (
                    <div key={index} className="bg-amber-50 rounded-lg h-[90px] py-2 px-3 flex">
                        <div className="w-[30%] sm:w-[20%] h-[100%] border-[2px] border-gray-200 object-cover overflow-hidden relative rounded-lg">
                            <Image
                                src={`${cur.image}`}
                                fill
                                alt='cart product image'
                                className='object-cover'
                            />
                        </div>
                        <div className="borde w-[60%] flex flex-col justify-center p-1">
                            <div className="borde sm:text-lg flex flex-col justify-between p-2">
                                <span className="">{cur.name}</span>
                                <span className="">{cur.availabel}</span>
                            </div>
                            <div className="borde px-2 text-sm sm:text-md"><span className="font-bold">$</span><span className="ml-1 font-semibold">3000</span></div>
                        </div>
                        <div className="flex flex-col gap-1 text-sm">
                            <Button onClick={()=>viewCart(cur.name)}>View</Button>
                            <Button onClick={() => handelRemove(cur.name)}>Remove</Button>
                        </div>
                    </div>
                ))
                :
                <div className="text-black flex flex-col gap-3 justify-center items-center">
                    <span className="font-light text-lg sm:text-2xl">Your Cart Is Empty</span>
                    <span className="text-[150px]">
                        <PiSmileyNervous />
                    </span>
                </div>
            }
        </div>
    )
}


 