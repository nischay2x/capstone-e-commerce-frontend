import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { SellerProductsResponse } from "./config";
import { authFetcher } from "@/lib/fetcher";
import Link from "next/link";
import { SettingsIcon } from "lucide-react";
import DeleteProductButton from "./DeleteProductButton";
import TablePaginantion from "@/components/TablePagination";
import { formatToINR } from "@/lib/utils";


async function getData({ searchParams }: TableProps): Promise<SellerProductsResponse> {
    const fetcher = await authFetcher();
    const sp = new URLSearchParams(searchParams)
    try {
        const { data } = await fetcher.get(`/products/seller?${sp.toString()}`);

        return data;
    } catch (error) {
        return {
            products: [], category: undefined, query: undefined, page: 1, perPage: 10, count: 0
        };
    }
}

interface TableProps {
    searchParams?: {
        query?: string;
        page?: string;
        category?: string;
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
                        <TableHead className="text-black">Name</TableHead>
                        <TableHead className="text-black">Description</TableHead>
                        <TableHead className="text-black">Price</TableHead>
                        <TableHead className="text-black">Category</TableHead>
                        <TableHead className="text-black">Last Updated</TableHead>
                        <TableHead className="text-black">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        data.products.map((d, idx) => (
                            <TableRow key={d.id}>
                                <TableCell>{idx+1}</TableCell>
                                <TableCell>{d.name}</TableCell>
                                <TableCell>{d.description}</TableCell>
                                <TableCell>{formatToINR(d.price)}</TableCell>
                                <TableCell>{d.category}</TableCell>
                                <TableCell>{new Date(d.updatedAt).toLocaleString()}</TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <Link href={`/seller/products/${d.id}`} >
                                            <button title="Edit" className="text-white bg-black hover:bg-slate-700 p-1 rounded-md" type="button">
                                                <SettingsIcon size={16} />
                                            </button>
                                        </Link>
                                        <DeleteProductButton id={d.id} />
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