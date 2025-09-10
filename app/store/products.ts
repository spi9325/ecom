import { create } from 'zustand'
import { ProductStore } from './types'


export const useProducts = create<ProductStore>((set) => ({
  products:[
    {
      name: "Purpule-Glass",
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
      name: "Purpule-Glasss",
      details: "Stylish sunglasses designed to protect your eyes from harmful UV rays. Lightweight frame with a comfortable fit for all-day wear. Perfect blend of fashion and function for everyday use.",
      limited:false,
      price: 859,
      basePrice:1259,
      material:"metal",
      color:"Golden",
      company:"Blaze",
      imageUrl:"/glass2.jpg"
    },
    {
      name: "Purpule-Gasss",
      details: "Stylish sunglasses designed to protect your eyes from harmful UV rays. Lightweight frame with a comfortable fit for all-day wear. Perfect blend of fashion and function for everyday use.",
      limited:false,
      price: 859,
      basePrice:1259,
      material:"metal",
      color:"Golden",
      company:"Blaze",
      imageUrl:"/glass2.jpg"
    },
    {
      name: "Purple-Glasss",
      details: "Stylish sunglasses designed to protect your eyes from harmful UV rays. Lightweight frame with a comfortable fit for all-day wear. Perfect blend of fashion and function for everyday use.",
      limited:false,
      price: 859,
      basePrice:1259,
      material:"metal",
      color:"Golden",
      company:"Blaze",
      imageUrl:"/glass2.jpg"
    },
  ],
}))



