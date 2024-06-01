import { authFetcher } from "@/lib/fetcher";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Clock, IndianRupee, ShoppingCart, Truck, User2Icon, X } from "lucide-react";
import { formatToINR } from "@/lib/utils";
import SalesByCategoryChart from "./SalesByCategoryChart";
import OrderTrendsChart from "./OrderTrendsChart";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin | eZbuy",
    description: "Admin Control Panel"
}

interface SalesCategory {
    _sum: {
        price: number;
    };
    category: string;
}

interface OrderStatusBreakdown {
    _count: {
        status: number;
    };
    status: string;
}

interface OrderTrend {
    "count": number,
    "date":string;
}

interface Seller {
    name: string;
    id: number;
}

interface TopSellingProduct {
    name: string;
    id: number;
    image: string;
    price: number;
    seller: Seller;
}

interface SalesData {
    totalSales: number;
    salesByCategory: SalesCategory[];
    totalUsers: number;
    activeUsers: number;
    newRegistrations: number;
    totalOrders: number;
    orderStatusBreakdown: OrderStatusBreakdown[];
    averageOrderValue: number;
    orderTrends: OrderTrend[];
    topSellingProducts: TopSellingProduct[];
}

async function getData(): Promise<SalesData> {
    const fetcher = await authFetcher();
    try {
        const { data } = await fetcher.get("/admin/overview");
        return data;
    } catch (error) {
        return {
            totalUsers: 0,
            activeUsers: 0,
            newRegistrations: 0,
            totalSales: 0,
            averageOrderValue: 0,
            totalOrders: 0,
            salesByCategory: [],
            orderStatusBreakdown: [],
            orderTrends: [],
            topSellingProducts: []
        }
    }
}

export default async function AdminDashboard() {

    const data = await getData();

    return (
            <Card className="bg-transparent border-none">
                <CardHeader>
                    <CardTitle>Overview</CardTitle>
                    <CardDescription>See whats happening.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                        <div className="text-lg mt-4 font-semibold pl-2">
                            Users
                        </div>
                    </div>
                    <div className="grid grid-cols-1 justify-between md:grid-cols-2 xl:grid-cols-4 gap-4">
                        <div className="shadow-md rounded-md bg-white p-4 border border-violet-300">
                            <div className="text-lg flex justify-between">
                                <h3 className="text-gray-700">Total Users</h3> <User2Icon />
                            </div>
                            <br />
                            <div className="text-xl font-bold">{data.totalUsers}</div>
                        </div>
                        <div className="shadow-md rounded-md bg-white p-4 border border-blue-300">
                            <div className="text-lg flex justify-between">
                                <h3 className="text-gray-700">Active / Suspended Accounts</h3> <User2Icon />
                            </div>
                            <br />
                            <div className="text-xl font-bold">{data.activeUsers} / {data.totalUsers - data.activeUsers}</div>
                        </div>
                        <div className="shadow-md rounded-md bg-white p-4 border border-purple-300">
                            <div className="text-lg flex justify-between">
                                <h3 className="text-gray-700">New Registrations</h3> <User2Icon />
                            </div>

                            <br />
                            <div className="flex justify-between items-end">
                                <span className="text-xl font-bold ">{data.newRegistrations}</span><span className="text-xs text-muted-foreground">Last 10 days</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="text-lg mt-4 font-semibold pl-2">
                            Orders
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                        <div className="shadow-md rounded-md bg-white p-4 border border-green-300 transition-all">
                            <div className="text-lg flex justify-between">
                                <h3 className="text-muted-foreground">Fullfilled</h3> <Check />
                            </div>
                            <br />
                            <div className="text-xl font-bold">{data.orderStatusBreakdown.find(o => o.status === "COMPLETED")?._count.status ?? 0}</div>
                        </div>
                        <div className="shadow-md rounded-md bg-white p-4 border border-yellow-300 transition-all">
                            <div className="text-lg flex justify-between">
                                <h3 className="text-muted-foreground">Waiting to Dispatch</h3> <Clock />
                            </div>
                            <br />
                            <div className="text-xl font-bold">{data.orderStatusBreakdown.find(o => o.status === "PENDING")?._count.status ?? 0}</div>
                        </div>
                        <div className="shadow-md rounded-md bg-white p-4 border border-blue-300 transition-all">
                            <div className="text-lg flex justify-between">
                                <h3 className="text-muted-foreground">In Transit</h3> <Truck />
                            </div>
                            <br />
                            <div className="text-xl font-bold">{data.orderStatusBreakdown.find(o => o.status === "DISPATCHED")?._count.status ?? 0}</div>
                        </div>
                        <div className="shadow-md rounded-md bg-white p-4 border border-red-300 transition-all">
                            <div className="text-lg flex justify-between">
                                <h3 className="text-muted-foreground">Cancelled</h3> <X />
                            </div>
                            <br />
                            <div className="text-xl font-bold">{data.orderStatusBreakdown.find(o => o.status === "CANCELLED")?._count.status ?? 0}</div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="text-lg mt-4 font-semibold pl-2">
                            Sales
                        </div>
                    </div>
                    <div className="grid grid-cols-1 justify-between md:grid-cols-2 xl:grid-cols-4 gap-4">
                        <div className="shadow-md rounded-md bg-white p-4 border border-orange-300">
                            <div className="text-lg flex justify-between">
                                <h3 className="text-gray-700">Total Orders</h3> <ShoppingCart />
                            </div>
                            <br />
                            <div className="text-xl font-bold">{data.totalOrders}</div>
                        </div>
                        <div className="shadow-md rounded-md bg-white p-4 border border-green-300">
                            <div className="text-lg flex justify-between">
                                <h3 className="text-gray-700">Total Revenue</h3> <IndianRupee />
                            </div>
                            <br />
                            <div className="text-xl font-bold">{formatToINR(data.totalSales)}</div>
                        </div>
                        <div className="shadow-md rounded-md bg-white p-4 border border-pink-300">
                            <div className="text-lg flex justify-between">
                                <h3 className="text-gray-700">Average Order Value</h3> <IndianRupee />
                            </div>
                            <br />
                            <div className="text-xl font-bold">{formatToINR(data.averageOrderValue)}</div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="text-lg mt-4 font-semibold pl-2">
                            Metrics
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="shadow-md rounded-md bg-white p-4 border border-amber-500">
                            <SalesByCategoryChart sales={data.salesByCategory} />
                        </div>
                        <div className="shadow-md rounded-md bg-white p-4 border border-amber-500">
                            <OrderTrendsChart orders={data.orderTrends} />
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="text-lg mt-4 font-semibold pl-2">
                            Top Selling Products
                        </div>
                    </div>
                    <div className="shadow-md rounded-md bg-white p-4 border border-purple-300">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 ">
                            {
                                data.topSellingProducts.map((p) => (
                                    <div key={p.id} className="border rounded-md">
                                        <div className="aspect-square p-2 relative group">
                                            <Image
                                                alt={p.name}
                                                className="w-full h-full object-contain aspect-square rounded-lg"
                                                height={200}
                                                src={p.image ?? "/placeholder.svg"}
                                                width={200}
                                            />
                                        </div>
                                        <div className="px-2 pb-2">
                                            <div className="flex justify-between items-center">
                                                <h3 className="text-lg font-semibold">{p.name}</h3>
                                                <span>{formatToINR(p.price)}</span>
                                            </div>
                                            <div className="text-muted-foreground">
                                                Sold By: {p.seller.name}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </CardContent>
            </Card>
           
    )
}