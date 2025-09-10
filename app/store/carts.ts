import { create } from 'zustand'
import { CartStore, cartTypes, ProductStore } from './types'


export const useCartStore = create<CartStore>((set) => ({
 carts:[],
 addToCart:(name:string,image:string,qty:number,price:number,total:number) => 
    set((state) => ({
      carts: [...state.carts, {name,image,qty,price,total}],
    })),
  increaseQty:(name:string,qty:number)=>
    set((state)=>({
      carts: state.carts.map((cur)=>
        cur.name === name ? {...cur,qty:qty + 1} : cur
      )
    })),  
  decreaseQty:(name:string,qty:number)=>
    set((state)=>({
      carts: state.carts.map((cur)=>
        cur.name === name ? {...cur,qty:qty - 1} : cur
      )
    })) ,
    
  removeCart:(name:string)=>
      set((state)=>({
        carts:state.carts.filter((cur)=> cur.name != name)
      })),  
  removeAll:()=>{
      set((state)=>({
        carts:state.carts
      }))
    }    
}))