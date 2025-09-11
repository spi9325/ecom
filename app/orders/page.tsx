"use client"
import axios from 'axios'
import { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const page = () => {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        async function name() {
            const orders = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/order/my`, {}, { withCredentials: true })
            if (orders.data) {
                setOrders(orders.data.orders)
            }
        }
        name()
    }, [])
    return (
        <div className='mt-[100px] max-w-[1440px] p-2 mx-auto rounded-md'>

            <Table>
                <TableCaption>A list of your All Purchese Products.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">QTY</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead className="text-center">TotalAmount</TableHead>
                        <TableHead className="text-center">OrderAt</TableHead>
                    </TableRow>
                </TableHeader>
                {
                    orders.map((cur: any,index) => (
                        <TableBody key={index}>
                            <TableRow>
                                <TableCell className="font-medium">{cur.qty}</TableCell>
                                <TableCell>{
                                    new Intl.NumberFormat("en-IN", {
                                        style: "currency",
                                        currency: "INR",
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0,
                                    }).format(cur.price)
                                }</TableCell>
                                <TableCell>{cur.name}</TableCell>
                                <TableCell className="text-center">{
                                    new Intl.NumberFormat("en-IN", {
                                        style: "currency",
                                        currency: "INR",
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0,
                                    }).format(cur.total)
                                }</TableCell>
                                <TableCell className='text-center'>{new Date(cur.createdAt).toLocaleString()}</TableCell>
                            </TableRow>
                        </TableBody>
                    ))
                }
            </Table>
        </div>
    )
}

export default page