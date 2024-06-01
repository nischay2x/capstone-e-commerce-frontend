
import { ProductsResponse } from "./config";
import { authFetcher } from "@/lib/fetcher";
import Image from "next/image";
import { formatToINR } from "@/lib/utils";
import AddToCartButton from "./AddToCartButton";
import { getServerSession } from "next-auth";
import { ShoppingBagIcon } from "lucide-react";
import Link from "next/link";
import { cache } from "react";


const getData = cache(async () : Promise<ProductsResponse> => {
    const fetcher = await authFetcher();
    try {
        const { data } = await fetcher.get("/products");
        return data;
    } catch (error) {
        return { previousProducts: [], grouping: [] };
    }
}) 

export default async function ProducCards() {
    const { previousProducts, grouping } = await getData();
    const session = await getServerSession();

    return (
        <>
            {
                previousProducts.length ?
                    <div className="py-4 my-4">
                        <h3 className="text-xl font-semibold mb-3 border-b pb-1">Previously Bought</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                            {
                                previousProducts.map(p => (
                                    <div key={p.id} className="bg-white rounded-lg shadow-md overflow-hidden dark:bg-gray-950">
                                        <div className="aspect-square p-2 relative group border rounded-lg shadow-md">
                                            <Image
                                                alt={p.name}
                                                className="w-full h-full object-contain aspect-square rounded-lg"
                                                height={200}
                                                src={p.image ?? "/placeholder.svg"}
                                                width={200}
                                            />
                                            <div className="absolute top-2 right-2 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                                                {
                                                    Boolean(session) ? <AddToCartButton product={p} /> : <button type="button" title="Login to use cart" className="border p-2 rounded-full hover:bg-slate-900 hover:text-white">
                                                        <ShoppingBagIcon size={16} />
                                                    </button>
                                                }
                                            </div>
                                        </div>
                                        <div className="p-2 md:p-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400 capitalize">{p.category}</span>
                                                <span className="text-lg font-bold text-gray-900 dark:text-gray-50">{formatToINR(p.price)}</span>
                                            </div>
                                            <Link href={`/shop/${p.id}-${p.name.toLowerCase().replace(/\s+/g, "-")}`}>
                                                <div className="w-full">
                                                    <h3 className="text-xl text-left font-bold text-gray-900 dark:text-gray-50 mb-2">
                                                        {p.name}
                                                    </h3>
                                                    <p className="text-gray-600 text-left text-xs dark:text-gray-400 line-clamp-1">
                                                        {p.description}
                                                    </p>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div> : null
            }
            {
                grouping.map(g => <div key={g.category} className="py-4 my-4">
                    {
                        g.products.length ? <>

                            <h3 className="text-xl font-semibold mb-3 border-b pb-1">{g.category}</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                                {
                                    g.products.map(p => (
                                        <div key={p.id} className="bg-white rounded-lg shadow-md overflow-hidden dark:bg-gray-950">
                                            <div className="aspect-square p-2 relative group border rounded-lg shadow-md">
                                                <Image
                                                    alt={p.name}
                                                    className="w-full h-full object-contain aspect-square rounded-lg"
                                                    height={200}
                                                    src={p.image ?? "/placeholder.svg"}
                                                    width={200}
                                                />
                                                <div className="absolute top-2 right-2 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                                                    {
                                                        Boolean(session) ? <AddToCartButton product={p} /> : <button type="button" title="Login to use cart" className="border p-2 rounded-full hover:bg-slate-900 hover:text-white">
                                                            <ShoppingBagIcon size={16} />
                                                        </button>
                                                    }
                                                </div>
                                            </div>
                                            <div className="p-2 md:p-4">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 capitalize">{p.category}</span>
                                                    <span className="text-lg font-bold text-gray-900 dark:text-gray-50">{formatToINR(p.price)}</span>
                                                </div>
                                                <Link href={`/shop/${p.id}-${p.name.toLowerCase().replace(/\s+/g, "-")}`}>
                                                    <div className="w-full">
                                                        <h3 className="text-xl text-left font-bold text-gray-900 dark:text-gray-50 mb-2">
                                                            {p.name}
                                                        </h3>
                                                        <p className="text-gray-600 text-left text-xs dark:text-gray-400 line-clamp-1">
                                                            {p.description}
                                                        </p>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </> : null
                    }
                </div>)
            }
        </>

    )
}