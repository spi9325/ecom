"use client"
import Image from 'next/image';
import { useState } from 'react';
import { IoIosAddCircleOutline } from "react-icons/io";



const page = () => {
  const [products, setProducts] = useState([
    {
      name: "purpule-glass",
      price: 3000,
      details: "Round Selfy Black Frame White lens.",
      textcolor: "text-purple-400",
      color: "Blue",
      material: "Fiber",
      imageUrl: "/glass1.jpg",
      availabel:"available"
    },
    {
      name: "purpule-glass",
      price: 3000,
      details: "Round Selfy Black Frame White lens.",
      textcolor: "text-yellow-400",
      color: "Blue",
      material: "Fiber",
      imageUrl: "/glass2.jpg",
      availabel:"available"
    },
    {
      name: "purpule-glass",
      price: 3000,
      details: "Round Selfy Black Frame White lens.",
      textcolor: "text-black",
      color: "Blue",
      material: "Fiber",
      imageUrl: "/glass3.jpg",
      availabel:"available"
    },
    {
      name: "purpule-glass",
      price: 3000,
      details: "Round Selfy Black Frame White lens.",
      textcolor: "text-slate-400",
      color: "Blue",
      material: "Fiber",
      imageUrl: "/glass4.jpg",
      availabel:"not available"
    },
    {
      name: "purpule-glass",
      price: 3000,
      details: "Round Selfy Black Frame White lens.",
      textcolor: "text-black",
      color: "Blue",
      material: "Fiber",
      imageUrl: "/glass5.jpg",
      availabel:"available"
    },
  ])
  return (
    <section className=" mt-25 h-[calc(100vh-120px)] max-w-[1440px] md:px-6 mx-auto rounded-lg bg-white py-9 grid gap-y-[50px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 overflow-x-hidden">

      {
        products?.map((cur) => (

          <div className="border border-blac w-[280px] md:w-[300px] h-[360px] md:h-[370px] flex flex-col mx-auto rounded-lg overflow-hidden bg-gray-50">
            <div className="h-[70%] bg-red-200 relative rounded-b-xl overflow-hidden">
              <Image
                src={`${cur.imageUrl}`}
                width={500}
                height={500}
                alt="Product 1 Glass Image"
                className='border border-blac h-full w-full'
              />
              <span className={`absolute top-1 left-2 text-sm py-1 px-2 rounded-lg font-medium ${cur.availabel == "available" ? "text-green-500 bg-green-100" : "text-red-500 bg-red-100"}`}>{cur.availabel}</span>
              <span className="absolute text-2xl top-2 right-3 cursor-pointer"><IoIosAddCircleOutline /></span>
            </div>
            <div className="px-5 mt-4 md:mt-5">
              <p className="">{cur.details}</p>
            </div>
            <div className="px-5 mt-3 md:mt-4 flex justify-between gap-3">
              <span className="font-bold">{cur.material}</span>
              <span className={`${cur.textcolor} font-bold`}>{cur.color}</span>
              <span className="font-bold"> ₹ {cur.price}</span>
            </div>
          </div>

        ))
      }

    </section>
  )
}

export default page