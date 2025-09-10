export interface productTypes{
     name: string,
      details: string,
      limited:boolean,
      price: number,
      basePrice: number,
      material: string,
      color: string,
      company: string,
      imageUrl:string
}

export interface cartTypes{
  name:string;
  image:string;
  price:number;
  qty:number;
  total:number;
}

export interface ProductStore {
  products: productTypes[];
}

export interface CartStore{
  carts: cartTypes[];
  addToCart:(name:string,image:string,price:number,qty:number,total:number)=> void
  increaseQty:(name:string,qty:number)=>void
  decreaseQty:(name:string,qty:number)=>void
  removeCart:(name:string)=>void
  removeAll:()=>void
}

