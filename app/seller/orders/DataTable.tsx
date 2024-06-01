import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { SellerOrderResponse } from "./config";
import { authFetcher } from "@/lib/fetcher";
import Link from "next/link";
import { EyeIcon } from "lucide-react";
import DispatchOrderButton from "./DispatchOrderButton";
import TablePaginantion from "@/components/TablePagination";
import { formatToINR } from "@/lib/utils";
import { decideStatusBackground } from "@/app/orders/config";
import CompleteOrderButton from "./CompleteOrderButton";
import { Button } from "@/components/ui/button";


async function getData({ searchParams }: TableProps): Promise<SellerOrderResponse> {
    const fetcher = await authFetcher();
    const sp = new URLSearchParams(searchParams)
    try {
        const { data } = await fetcher.get(`/seller-orders?${sp.toString()}`);

        return data;
    } catch (error) {
        return {
            orders: [], status: undefined, page: 1, perPage: 10, count: 0
        };
    }
}

interface TableProps {
    searchParams?: {
        year?: string;
        month?: string;
        status?: string;
        page?: string;
        perPage?: string;
    };
}
export default async function DataTable({ searchParams }: TableProps) {
    const data = await getData({ searchParams });

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-black">#</TableHead>
                        <TableHead className="text-black">Amount</TableHead>
                        <TableHead className="text-black">Address</TableHead>
                        <TableHead className="text-black">Status</TableHead>
                        <TableHead className="text-black">Created</TableHead>
                        <TableHead className="text-black">Last Updated</TableHead>
                        <TableHead className="text-black">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        data.orders.map((d, idx) => (
                            <TableRow key={d.id}>
                                <TableCell>{idx + 1}</TableCell>
                                <TableCell>{formatToINR(d.netBilledAmount)}</TableCell>
                                <TableCell>{d.address}</TableCell>
                                <TableCell>
                                    <div className={`text-xs py-1 px-2 w-fit rounded-md text-black ${decideStatusBackground(d.status)}`}>
                                        {d.status}
                                    </div>
                                </TableCell>
                                <TableCell>{new Date(d.createdAt).toLocaleString()}</TableCell>
                                <TableCell>{new Date(d.updatedAt).toLocaleString()}</TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <Link href={`/seller/orders/${d.id}`} >
                                            <Button title="View" size="sm" type="button">
                                                <EyeIcon size={16} />
                                            </Button>
                                        </Link>
                                        {
                                            d.status === "PENDING" && <DispatchOrderButton size="sm" variant="destructive" id={d.id} />
                                        }
                                        {
                                            d.status === "DISPATCHED" && <CompleteOrderButton size="sm" variant="destructive" id={d.id} />
                                        }
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
            <div className="bg-gray-100 py-4 px-4">
                <TablePaginantion page={data.page} perPage={data.perPage} count={data.count} />
            </div>
        </>
    )
}