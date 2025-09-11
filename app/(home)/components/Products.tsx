"use client"
import { useProducts } from '@/app/store/products';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export const Products = () => {
  const {products} = useProducts()
  const router = useRouter();


  return (
    <section className=" mt-25 h-[calc(100vh-120px)] max-w-[1440px] md:px-6 mx-auto rounded-lg bg-white py-9 grid gap-y-[50px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 overflow-x-hidden">

      {
        products?.map((cur,index) => (

          <div onClick={()=>router.push(`/viewproduct/${cur.name}`)} key={index} className="border border-blac w-[280px] md:w-[300px] h-[360px] md:h-[370px] flex flex-col mx-auto rounded-lg overflow-hidden bg-gray-50">
            <div className="h-[70%] bg-red-200 relative rounded-b-xl overflow-hidden">
              <Image
                src={`${cur.imageUrl}`}
                width={500}
                height={500}
                alt="Product 1 Glass Image"
                className='border border-blac h-full w-full'
              />
            </div>
            <span className="mx-auto mt-4 text-green-400 bg-green-100 rounded-md px-2">{cur.name}</span>
            <div className="px-5 mt-3 md:mt-4 flex justify-between gap-3">
              <span className="font-bold">{cur.material}</span>
              <span className={`font-bold`}>{cur.color}</span>
              <span className="font-bold"> ₹ {cur.price}</span>
            </div>
          </div>

        ))
      }

    </section>
  )
}
