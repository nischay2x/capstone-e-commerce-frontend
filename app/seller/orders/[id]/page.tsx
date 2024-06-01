import { authFetcher } from "@/lib/fetcher";
import { type SellerOrderById } from "../config";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatToINR } from "@/lib/utils";
import { Banknote, CreditCard, Landmark, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { decideStatusBackground } from "@/app/orders/config";
import DispatchOrderButton from "../DispatchOrderButton";
import CompleteOrderButton from "../CompleteOrderButton";
import GetInvoiceButton from "@/components/GetInvoiceButton";
import GoBack from "@/components/GoBackButton";

async function getData(id: string): Promise<SellerOrderById | null> {
    const fetcher = await authFetcher();

    try {
        const { data } = await fetcher.get(`/seller-orders/${id}`);
        return data
    } catch (error) {
        return null;
    }
}

type PageProps = {
    params: {
        id: string;
    }
}

export default async function SellerOrderById({ params }: PageProps) {
    const data = await getData(params.id);

    const total: number = data?.items.map(d => d.quantity * d.product.price).reduce((a,b) => a+b, 0) ?? 0;

    return (
        <main className="p-4 dark:bg-gray-950 lg:p-8 h-svh">
            <Card id="print-this" className="print:w-full print:min-h-screen">
                <CardHeader>
                    <CardTitle>Order #{data?.id}</CardTitle>
                    <CardDescription><span className="print:hidden"> Detailed order information</span><span className="hidden print:block">Seller Invoice Copy</span></CardDescription>
                </CardHeader>
                <CardContent>
                    {
                        data && <div className="space-y-6">
                            <div className="flex gap-2">
                                <div className="flex border px-2 py-1 rounded-md gap-2">
                                    {
                                        data.paymentMode === "CASH" && <Banknote />
                                    }
                                    {
                                        data.paymentMode === "UPI" && <QrCode/>
                                    }
                                    {
                                        data.paymentMode === "CARD" && <CreditCard />
                                    }
                                    {
                                        data.paymentMode === "ONLINE" && <Landmark />
                                    }
                                    <span>
                                        {data.paymentMode} 
                                    </span> 
                                </div>

                                <div className={`flex border px-2 py-1 rounded-md gap-2 ${decideStatusBackground(data.status)}`}>
                                    <span>
                                        {data.status} 
                                    </span> 
                                </div>
                                <div className="ml-auto print:hidden">
                                    {
                                        data.status !== "CANCELLED" && 
                                        <GetInvoiceButton text="Print Invoice" />
                                    }
                                </div>
                            </div>
                            <div className="text-muted-foreground flex justify-between flex-wrap">
                                <span>
                                    Created: {new Date(data.createdAt).toLocaleString()}
                                </span>
                                <span>
                                    Last Updated: {new Date(data.updatedAt).toLocaleString()}
                                </span>
                            </div>
                            <div>
                                <h4 className="border-b text-lg font-semibold">Order Items</h4>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>#</TableHead>
                                            <TableHead>Item</TableHead>
                                            <TableHead>Price</TableHead>
                                            <TableHead>Quantity</TableHead>
                                            <TableHead className="text-right">Total</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {
                                            data.items.map((c, idx) => <TableRow key={c.id}>
                                                <TableCell>{idx + 1}</TableCell>
                                                <TableCell>{c.product.name}</TableCell>
                                                <TableCell>{formatToINR(c.product.price)}</TableCell>
                                                <TableCell>
                                                    {c.quantity}
                                                </TableCell>
                                                <TableCell className="text-right">{formatToINR(c.product.price * (c.quantity))}</TableCell>
                                            </TableRow>)
                                        }

                                    </TableBody>
                                    <TableFooter>
                                        <TableRow>
                                            <TableCell colSpan={4}>Total</TableCell>
                                            <TableCell className="text-right">{formatToINR(total)}</TableCell>
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            </div>
                            <div>
                                <h4 className="border-b text-lg font-semibold">Shipping Details</h4>
                                <div className="py-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <h5 className="font-medium">Shipping Address</h5>
                                        <p className="mt-1 py-1 px-2 border rounded-md text-sm">
                                            {data.address}
                                        </p>
                                    </div>
                                    <div>
                                        <h5 className="font-medium">Contact</h5>
                                        <p className="mt-1 py-1 px-2 border rounded-md text-sm">
                                            {data.phoneNumber}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4 className="border-b text-lg font-semibold">Buyer Details</h4>
                                <div className="py-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <h5 className="font-medium">Name</h5>
                                        <p className="mt-1 py-1 px-2 border rounded-md text-sm">
                                            {data.user.name}
                                        </p>
                                    </div>
                                    <div>
                                        <h5 className="font-medium">Email</h5>
                                        <p className="mt-1 py-1 px-2 border rounded-md text-sm">
                                            {data.user.email}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="hidden print:block py-3">{new Date().toLocaleString()}</div>
                            <div className="flex justify-between print:hidden">
                                <Link href="/seller/orders">
                                    <GoBack />
                                </Link>
                                {
                                    data.status === "PENDING" && <DispatchOrderButton id={data.id} text="Dispatch Order" />
                                }
                                {
                                    data.status === "DISPATCHED" && <CompleteOrderButton id={data.id} text="Complete Order" />
                                }
                            </div>
                        </div>
                    }
                </CardContent>
            </Card>
        </main>
    )
    
}


