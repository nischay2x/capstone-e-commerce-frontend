import { OrderStatus, decideStatusBackground } from "@/app/orders/config";
import { authFetcher } from "@/lib/fetcher"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatToINR } from "@/lib/utils";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";

type Item = {
    "quantity": number;
    "id": number;
    "product": {
        "price": number;
        "id": number;
        "name": string;
        "description": string;
        "sellerId": number;
    }
}

type UserById = {
    user: {
        id: number;
        name: string;
        role: "SELLER" | "USER";
        image: string;
        email: string;
    },
    recentOrders: {
        id: number;
        netBilledAmount: number
        user?: {
            name: string;
            id: string;
        },
        seller?: {
            name: string;
            id: string;
        },
        address: string;
        createdAt: Date;
        status: OrderStatus;
        paymentMode: string;
        items: Item[]
    }[]
}
async function getData(id: string): Promise<UserById | null> {
    const fetcher = await authFetcher();

    try {
        const { data } = await fetcher.get(`/users/${id}`);
        return data
    } catch (error) {
        return null;
    }
}

type Props = {
    params: { id: string }
}
export default async function UserById({ params }: Props) {
    const data = await getData(params.id);

    return data ? (
        <Card>
            <CardHeader>
                <CardTitle>{data.user.name}</CardTitle>
                <CardDescription>{data.user.email}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="p-2 rounded-md border w-fit text-sm">{data.user.role}</div>
                    <div className="text-lg font-semibold">Recent Orders</div>
                    <hr />
                    <div className="space-y-4">
                        {data.recentOrders.map(r => <div key={r.id} className="space-y-2 border p-3 rounded-md">
                            <div className="flex gap-2 items-center">
                                <span className="font-semibold">#{r.id}</span>
                                <span className="ml-auto py-1 px-2 text-sm border rounded-md">{r.paymentMode}</span>
                                <span className={`py-1 px-2 text-sm border rounded-md ${decideStatusBackground(r.status)}`} >{r.status}</span>
                            </div>
                            <div className="flex justify-between flex-wrap items-center">
                                {
                                    r.user && <Link href={`/admin/users/${r.user.id}`}>Buyer: <span className="font-semibold text-blue-500">{r.user.name}</span></Link>
                                }
                                {
                                    r.seller && <Link href={`/admin/users/${r.seller.id}`}>Seller: <span className="font-semibold text-blue-500">{r.seller.name}</span></Link>
                                }

                                <span>{r.address}</span>
                            </div>
                            <div className="p-2">
                                <Table className="border rounded-md">
                                    <TableHeader>
                                        <TableRow className="bg-zinc-50">
                                            <TableCell>#</TableCell>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Price</TableCell>
                                            <TableCell>Quantity</TableCell>
                                            <TableCell className="text-right">Total</TableCell>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {
                                            r.items.map((i, idx) => <TableRow key={i.id}>
                                                <TableCell>{idx + 1}</TableCell>
                                                <TableCell>{i.product.name}</TableCell>
                                                <TableCell>{formatToINR(i.product.price)}</TableCell>
                                                <TableCell>{i.quantity}</TableCell>
                                                <TableCell className="text-right">{formatToINR(i.quantity * i.product.price)}</TableCell>
                                            </TableRow>)
                                        }
                                    </TableBody>
                                    
                                </Table>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground text-sm">{new Date(r.createdAt).toLocaleString()}</span>
                                <div>Total: <span className="font-semibold">{formatToINR(r.netBilledAmount)}</span></div>
                            </div>
                        </div>)}
                    </div>
                </div>
            </CardContent>
        </Card>
    ) : null;
}