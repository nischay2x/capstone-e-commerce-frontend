import { authFetcher } from "@/lib/fetcher";
import { formatToINR } from "@/lib/utils";
import { Check, ChevronRight, Clock, History, IndianRupee, ShoppingCart, Truck, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import OrdersChart from "./OrdersChart";
import Link from "next/link";
import MonthFilter from "@/components/MonthFilter";


interface Order {
    id: number;
    address: string;
    netBilledAmount: number;
    updatedAt: string; // or Date if you plan to convert it to a Date object
}

interface OrdersByStatus {
    status: 'PENDING' | 'DISPATCHED' | 'COMPLETED' | 'CANCELLED';
    count: number;
}

interface OrdersPerDay {
    date: string; // or Date if you plan to convert it to a Date object
    count: number;
}

interface DashboardData {
    totalOrders: number;
    ordersByStatus: OrdersByStatus[];
    totalRevenue: number;
    recentOrders: Order[];
    ordersPerDay: OrdersPerDay[];
}

async function getData({ searchParams }: PageProps): Promise<DashboardData> {
    const fetcher = await authFetcher();
    const params = new URLSearchParams(searchParams);
    try {
        const { data } = await fetcher.get(`/seller-orders/overview?${params.toString()}`);

        return data
    } catch (error) {
        return {
            totalOrders: 0,
            ordersByStatus: [],
            totalRevenue: 0,
            recentOrders: [],
            ordersPerDay: []
        };
    }
}

type PageProps = {
    searchParams?: {
        month?: string
        year?: string;
    }
}

export default async function SellerHome({ searchParams }: PageProps) {
    const data = await getData({ searchParams });
    return (
        <Card className="bg-transparent border-none">
            <CardHeader>
                <CardTitle>Overview</CardTitle>
                <CardDescription>See whats happening.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 justify-between md:grid-cols-2 xl:grid-cols-4 gap-4">
                    <div className="shadow-md rounded-md bg-white p-4 border border-purple-300">
                        <div className="text-lg flex justify-between">
                            <h3 className="text-muted-foreground">Total Orders</h3> <ShoppingCart />
                        </div>
                        <br />
                        <div className="text-xl font-bold">{data.totalOrders}</div>
                    </div>
                    <div className="shadow-md rounded-md bg-white p-4 border border-violet-300">
                        <div className="text-lg flex justify-between">
                            <h3 className="text-muted-foreground">Total Revenue</h3> <IndianRupee />
                        </div>
                        <br />
                        <div className="text-xl font-bold">{formatToINR(data.totalRevenue)}</div>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="text-lg mt-4 font-semibold pl-2">
                        Month in a view
                    </div>
                    <MonthFilter />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                    <Link href={`/seller/orders?status=COMPLETED`} className="shadow-md rounded-md bg-white p-4 border border-green-300 transition-all hover:bg-green-100">
                        <div className="text-lg flex justify-between">
                            <h3 className="text-muted-foreground">Fullfilled</h3> <Check />
                        </div>
                        <br />
                        <div className="text-xl font-bold">{data.ordersByStatus.find(o => o.status === "COMPLETED")?.count ?? 0}</div>
                    </Link>
                    <Link href={`/seller/orders?status=PENDING`} className="shadow-md rounded-md bg-white p-4 border border-yellow-300 transition-all hover:bg-yellow-100">
                        <div className="text-lg flex justify-between">
                            <h3 className="text-muted-foreground">Waiting to Dispatch</h3> <Clock />
                        </div>
                        <br />
                        <div className="text-xl font-bold">{data.ordersByStatus.find(o => o.status === "PENDING")?.count ?? 0}</div>
                    </Link>
                    <Link href={`/seller/orders?status=DISPATCHED`} className="shadow-md rounded-md bg-white p-4 border border-blue-300 transition-all hover:bg-blue-100">
                        <div className="text-lg flex justify-between">
                            <h3 className="text-muted-foreground">In Transit</h3> <Truck />
                        </div>
                        <br />
                        <div className="text-xl font-bold">{data.ordersByStatus.find(o => o.status === "DISPATCHED")?.count ?? 0}</div>
                    </Link>
                    <Link href={`/seller/orders?status=CANCELLED`} className="shadow-md rounded-md bg-white p-4 border border-red-300 transition-all hover:bg-red-100">
                        <div className="text-lg flex justify-between">
                            <h3 className="text-muted-foreground">Cancelled</h3> <X />
                        </div>
                        <br />
                        <div className="text-xl font-bold">{data.ordersByStatus.find(o => o.status === "CANCELLED")?.count ?? 0}</div>
                    </Link>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="shadow-md rounded-md bg-white p-4 border">
                        <OrdersChart orders={data.ordersPerDay} />
                    </div>
                    <div className="shadow-md rounded-md bg-white p-4 border">
                        <div className="text-lg flex justify-between">
                            <h3 className="text-muted-foreground">Recent Orders</h3> <History />
                        </div>
                        <br />
                        <div>
                            {
                                data.recentOrders.map(r =>
                                    <Link key={r.id} href={`/seller/orders/${r.id}`} >
                                        <div className="flex justify-between items-center hover:bg-gray-100 p-2 border-b">
                                            <div className="space-y-0.5">
                                                <div className="text-sm">
                                                    {r.address}
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    {new Date(r.updatedAt).toLocaleString()}
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <span className="font-semibold">{formatToINR(r.netBilledAmount)}</span> <ChevronRight />
                                            </div>
                                        </div>
                                    </Link>
                                )
                            }
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

