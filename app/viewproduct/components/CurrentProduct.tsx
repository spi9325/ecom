"use client"
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { RiRefund2Line } from "react-icons/ri";
import { TbReceiptBitcoin } from "react-icons/tb";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { Button } from '@/components/ui/button';
import { useProducts } from '@/app/store/products';
import { productTypes } from '@/app/store/types';
import { useCartStore } from '@/app/store/carts';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useSession } from 'next-auth/react';



export const CurrentProduct = () => {
    const router = useRouter();
    const [qtyAmount, setQtyAmount] = useState(1);
    const [currentProduct, setcurrentProduct] = useState<productTypes[]>([]);
    const { products } = useProducts();
    const {carts,addToCart} = useCartStore();
    const {data:authData} = useSession();

    const params = useParams()
    const id = params.id;

    useEffect(() => {
        const product = products.filter((cur) => cur.name == id)
        setcurrentProduct(product)
    }, [products])

    function handelIncrease() {
        setQtyAmount((prev) => prev + 1);
    }
    function handelDecrease() {
        qtyAmount > 1 ? setQtyAmount((prev) => prev - 1) : null
    }

    async function handelAddToCart(name:string,image:string,qty:number,price:number,total:number){
        const alredyExist = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/add/cart`,{name,email:authData?.user?.email,price:price.toString(),image,qty:qtyAmount.toString(),total:total.toString()})  
        console.log(alredyExist.data)
        if(alredyExist.data === "cart already exist..."){
            toast.warning("product Already In Cart")
        }else{
            addToCart(name,image,qty,price,total);
            if(!authData?.user){
                toast.warning("Login First");
                router.push("/login")
            }else{
                 router.push("/cart");
            }
        }
    }

    return (
        <section className="mt-[100px] p-2 max-w-[1440px] mx-auto lg:px-4">
            {
                currentProduct.map((curProd) => (
                    <div key={curProd.name} className=" p-1 flex flex-col sm:flex-row gap-3 lg:gap-9 lg:px-[100px] justify-center items-cente">

                        <div className="w-full sm:w-[40%] bg-purple-500 relative h-[300px]">
                            <Image
                                src={`${curProd.imageUrl}`}
                                fill
                                alt='image'
                                className='w-full h-full object-cover'
                            />
                        </div>

                        <div className="w-full sm:w-[55%]  px-2 py-1">
                            <h1 className="text-xl font-semibold mb-3 lg:text-3xl">{curProd.name}</h1>
                            <p className=" px-1 lg:w-[60%] py-2 overflow-hidden h-[120px] font-extralight mb-3">
                               {curProd.details}
                            </p>
                            <span className={`text-sm  ${curProd.limited ? "bg-red-600 text-white" : "bg-green-400 text-black"} py-1 px-2  rounded-sm shadow-md`}>{curProd.limited ? "Limited time deal" : "All Time"}</span>
                            <div className="mt-3 flex gap-1">
                                <span className="text-2xl font-bold">
                                    {
                                        new Intl.NumberFormat("en-IN", {
                                            style: "currency",
                                            currency: "INR",
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 0,
                                        }).format(curProd.price)
                                    }
                                </span>
                            </div>
                            <div className="mt-1 flex text-[11px] gap-[2px] line-through">
                                <span className="">
                                    {
                                        new Intl.NumberFormat("en-IN", {
                                            style: "currency",
                                            currency: "INR",
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 0,
                                        }).format(curProd.basePrice)
                                    }
                                </span>
                            </div>
                            <div className="mt-2 grid grid-cols-3 justify-center items-center">
                                <div className="flex justify-center items-center flex-col">
                                    <RiRefund2Line className='text-4xl' />
                                    <p className=" overflow-hidden text-[11px] text-center h-[40px]">10 days Return & Exchange</p>
                                </div>
                                <div className="flex justify-center items-center flex-col">
                                    <RiMoneyRupeeCircleFill className='text-4xl' />
                                    <p className=" overflow-hidden text-[11px] text-center h-[40px] px-2">Cash/Pay on Delivery</p>
                                </div>
                                <div className="flex justify-center items-center flex-col">
                                    <TbReceiptBitcoin className='text-4xl' />
                                    <p className=" overflow-hidden text-[11px] text-center h-[40px]">100% Branded</p>
                                </div>

                            </div>

                            <h2 className="text-xl font-semibold mt-4">Product Details</h2>

                            <div className="flex flex-col gap-1 mt-5">
                                <div className="flex gap-5 text-sm">
                                    <p className="font-bold text-[12px]">Material Type :</p>
                                    <p className="font-semibold text-[12px]">{curProd.material}</p>
                                </div>
                                <div className="flex gap-5 text-sm">
                                    <p className="font-bold text-[12px]">Color :</p>
                                    <span className="font-semibold text-[12px]">{curProd.color}</span>
                                </div>
                                <div className="flex gap-5 text-sm">
                                    <p className="font-bold text-[12px]">Company :</p>
                                    <span className="font-semibold text-[12px]">{curProd.company}</span>
                                </div>
                            </div>
                            {/* add to cart bellow */}
                            <div className="mt-[50px] flex flex-col gap-5">
                                <div className=" relative flex items-center">
                                    <Button onClick={handelDecrease} className=" text-2xl p-2 text-white bg-black"><FaMinus /></Button>
                                    <span className="px-5 text-xl">{qtyAmount}</span>
                                    <Button onClick={handelIncrease} className=" text-2xl p-2 text-white bg-black"><FaPlus /></Button>
                                </div>
                                <Button onClick={()=>handelAddToCart(curProd.name,curProd.imageUrl,qtyAmount,curProd.price,curProd.price * qtyAmount)}>Add To Cart</Button>
                            </div>
                            {/* end of div */}
                        </div>
                    </div>
                ))
            }
        </section>
    )
}


