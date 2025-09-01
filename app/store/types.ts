export interface productTypes{
      name: string,
      price: number,
      details: string,
      textcolor: string,
      color: string,
      material: string,
      imageUrl: string,
      availabel: string
}

export interface ProductStore {
  products: productTypes[];
}

export interface cartType {
    name:string;
    price:string;
    availabel:string;
    image:string;
}
export interface cartStoreType{
  myCart:cartType[];
  add: (name: string, price: string, availabel: string, image: string) => void;
  remove:(name:string)=>void
}

export interface cartViewType{
  currentCart:string;
  viewCart:(cartName:string) => void
}