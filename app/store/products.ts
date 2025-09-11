import { create } from 'zustand'
import { ProductStore } from './types'


export const useProducts = create<ProductStore>((set) => ({
  products:[
    {
      name: "Regular-UV",
      details: "Stylish sunglasses designed to protect your eyes from harmful UV rays. Lightweight frame with a comfortable fit for all-day wear. Perfect blend of fashion and function for everyday use.",
      limited:true,
      price: 859,
      basePrice:1259,
      material:"Fiber",
      color:"Purple",
      company:"Blaze",
      imageUrl:"/glass1.jpg"
    },
    {
      name: "Sunglass-Gold",
      details: "Stylish sunglasses designed to protect your eyes from harmful UV rays. Lightweight frame with a comfortable fit for all-day wear. Perfect blend of fashion and function for everyday use.",
      limited:false,
      price: 2150,
      basePrice:1959,
      material:"metal",
      color:"Golden",
      company:"Blaze",
      imageUrl:"/glass2.jpg"
    },
    {
      name: "Casual-classA",
      details: "Stylish sunglasses designed to protect your eyes from harmful UV rays. Lightweight frame with a comfortable fit for all-day wear. Perfect blend of fashion and function for everyday use.",
      limited:false,
      price: 1400,
      basePrice:1600,
      material:"Fiber",
      color:"Black",
      company:"Blaze",
      imageUrl:"/glass3.jpg"
    },
    {
      name: "Regular-UVR",
      details: "Stylish sunglasses designed to protect your eyes from harmful UV rays. Lightweight frame with a comfortable fit for all-day wear. Perfect blend of fashion and function for everyday use.",
      limited:false,
      price: 999,
      basePrice:1200,
      material:"Fiber",
      color:"Gold_Fiber",
      company:"Blaze",
      imageUrl:"/glass4.jpg"
    },
    {
      name: "Primium-BlackS",
      details: "Stylish sunglasses designed to protect your eyes from harmful UV rays. Lightweight frame with a comfortable fit for all-day wear. Perfect blend of fashion and function for everyday use.",
      limited:false,
      price: 2544,
      basePrice:2999,
      material:"metal",
      color:"Golden",
      company:"Blaze",
      imageUrl:"/glass5.jpg"
    },
    {
      name: "Primium-Blaze",
      details: "Stylish sunglasses designed to protect your eyes from harmful UV rays. Lightweight frame with a comfortable fit for all-day wear. Perfect blend of fashion and function for everyday use.",
      limited:false,
      price: 940,
      basePrice:1059,
      material:"metal",
      color:"Metal-Mix",
      company:"Blaze",
      imageUrl:"/glass6.jpg"
    },
  ],
}))



