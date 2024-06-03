import { authFetcher } from "@/lib/fetcher";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import MonthFilter from "@/components/MonthFilter";
import { formatToINR } from "@/lib/utils";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Order, decideStatusBackground } from "./config";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'eZbuy Shopping | Orders',
    description: "See the history of your orders"
}



async function getData({ searchParams }: PageProps): Promise<Order[] | null> {
    const params = new URLSearchParams(searchParams);
    const fetcher = await authFetcher();

    try {
        const { data } = await fetcher.get(`/orders?${params.toString()}`);
        return data;
    } catch (error) {
        return null;
    }
}

interface PageProps {
    searchParams?: {
        year?: string;
        month?: string;
    };
}
export default async function CustomerOrders({ searchParams }: PageProps) {

    const data = await getData({ searchParams });

    return (
        <main className="md:p-4 bg-gray-100 dark:bg-gray-950 lg:p-8 h-svh">
            <Card>
                <CardHeader>
                    <CardTitle>Orders</CardTitle>
                    <CardDescription>See the history of your orders</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="ml-auto w-fit">
                        <MonthFilter />
                    </div>
                    <br />
                    <div className="space-y-3">
                        {
                            data?.length ? data.map((order) => (<Link href={`/orders/${order.id}`} key={order.id} className="flex items-center w-full justify-between border-b py-2 hover:px-3 hover:bg-slate-100 transition-all">
                                <div>
                                    <span className="block text-black text-xl">{formatToINR(order.netBilledAmount)}</span>
                                    <span className="block text-xs text-muted-foreground">Created: {new Date(order.createdAt).toLocaleString()}</span>
                                </div>
                                <div className="text-sm">
                                    {order.seller.name}
                                </div>
                                <div className="flex gap-3">
                                    <div className={`text-xs py-1 px-2 rounded-md text-black ${decideStatusBackground(order.status)}`}>
                                        {order.status}
                                    </div>
                                    <ChevronRight />
                                </div>
                            </Link>)) : <div>No Orders this Month!</div>

                        }
                    </div>

                </CardContent>
            </Card>
        </main>
    )
}