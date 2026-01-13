"use client"

import { CarFront } from "lucide-react"

const ProductSummary = () => {
    return (
        <div className="grid grid-cols-3 gap-4 w-full">
            <div className="col-span-3 lg:col-span-1">
                <ProductCard 
                productName="Rail-Guided Vehicle"
                productStock={200}/>
            </div>
            <div className="col-span-3 lg:col-span-1">
                <ProductCard 
                productName="Automated-Guided Vehicle"
                productStock={200}/>
            </div>
            <div className="col-span-3 lg:col-span-1">
                <ProductCard 
                productName="Warehouse Integration System"
                productStock={200}/>
            </div>
        </div>
    )
}


interface ProductCardProps {
    productName: string
    productStock: number

}

const ProductCard = ({
    productName,
    productStock
}: ProductCardProps) => {
    return (
        <div className="rounded-md border p-4 bg-white space-y-3 text-primary flex flex-col justify-between h-full">
            <div className="flex items-center gap-3 font-medium">
                <div className="rounded-full p-1.5 shadow-[0_0_5px_2px_rgba(0,0,0,0.1)]">
                    <CarFront className="size-5" />
                </div>
                { productName }
            </div>
            <div className="flex gap-2 items-end justify-center">
                <h1 className="text-3xl font-semibold">{ productStock }</h1>
                <p className="font-medium">stock</p>
            </div>
            <div className="flex justify-end text-xs">
                <a href="#" className="hover:underline">View details</a>
            </div>
        </div>
    )
}

export default ProductSummary