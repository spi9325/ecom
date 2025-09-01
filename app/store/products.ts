import { create } from 'zustand'
import { cartStoreType, cartType, cartViewType, ProductStore } from './types'


export const useProducts = create<ProductStore>((set) => ({
  products:[
    {
      name: "Purpule-Glass",
      price: 3000,
      details: "Round Selfy Black Frame White lens.",
      textcolor: "text-purple-400",
      color: "Gold",
      material: "Fiber",
      imageUrl: "/glass1.jpg",
      availabel:"availabel"
    },
    {
      name: "Golden-Rounded",
      price: 3000,
      details: "Round Selfy Black Frame White lens.",
      textcolor: "text-yellow-400",
      color: "Gold",
      material: "Fiber",
      imageUrl: "/glass2.jpg",
      availabel:"availabel"
    },
    {
      name: "Black-class",
      price: 3000,
      details: "Round Selfy Black Frame White lens.",
      textcolor: "text-black",
      color: "Black",
      material: "Fiber",
      imageUrl: "/glass3.jpg",
      availabel:"availabel"
    },
    {
      name: "Light-Golden-class-2",
      price: 3000,
      details: "Round Selfy Black Frame White lens.",
      textcolor: "text-slate-400",
      color: "Light-Gold",
      material: "Fiber",
      imageUrl: "/glass4.jpg",
      availabel:"not availabel"
    },
    {
      name: "Golden-class-1",
      price: 3000,
      details: "Round Selfy Black Frame White lens.",
      textcolor: "text-black",
      color: "Black",
      material: "Fiber",
      imageUrl: "/glass5.jpg",
      availabel:"availabel"
    },
  ],
}))

export const cartStore = create<cartStoreType>((set)=>({
  myCart: [],

  add: (name:string, price:string, availabel:string, image:string) =>
    set((state) => ({
      myCart: [...state.myCart, { name, price, availabel, image },],
    })),

  remove:(name:string)=>
    set((state) => ({
      myCart: state.myCart.filter((item) => item.name != name),
    })),
}))

export const cartView = create<cartViewType>((set)=>({
  currentCart:"",
  viewCart:(cartName)=>
    set((state)=>({
      currentCart: cartName
    }))
}))