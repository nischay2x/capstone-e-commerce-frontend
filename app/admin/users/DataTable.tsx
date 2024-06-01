import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { User, UserResponse } from "./config";
import { authFetcher } from "@/lib/fetcher";
import Link from "next/link";
import { EyeIcon } from "lucide-react";
import TablePaginantion from "@/components/TablePagination";
import { Button } from "@/components/ui/button";
import ToggleSuspensionButton from "./ToggleSuspensionButton";


async function getData({ searchParams }: TableProps): Promise<UserResponse> {
    const fetcher = await authFetcher();
    const sp = new URLSearchParams(searchParams)
    try {
        const { data } = await fetcher.get(`/users?${sp.toString()}`);
        return data;
    } catch (error) {
        return {
            users: [], page: 1, perPage: 10, count: 0
        };
    }
}

interface TableProps {
    searchParams?: {
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
                        <TableHead className="text-black">Name</TableHead>
                        <TableHead className="text-black">Email</TableHead>
                        <TableHead className="text-black">Role</TableHead>
                        <TableHead className="text-black">Suspension Status</TableHead>
                        <TableHead className="text-black">Verification Status</TableHead>
                        <TableHead className="text-black">Created</TableHead>
                        <TableHead className="text-black">Last Updated</TableHead>
                        <TableHead className="text-black">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        data.users.map((d, idx) => (
                            <TableRow key={d.id}>
                                <TableCell>{idx + 1}</TableCell>
                                <TableCell>{d.name}</TableCell>
                                <TableCell>{d.email}</TableCell>
                                <TableCell>{d.role}</TableCell>
                                <TableCell>
                                    {d.suspended ? "Suspended" : "Active"}
                                </TableCell>
                                <TableCell>
                                    {d.verified ? "Verified" : "Not Verified"}
                                </TableCell>
                                <TableCell>{new Date(d.createdAt).toLocaleString()}</TableCell>
                                <TableCell>{new Date(d.updatedAt).toLocaleString()}</TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <Link href={`/admin/users/${d.id}`} >
                                            <Button title="View" size="sm" type="button">
                                                <EyeIcon size={16} />
                                            </Button>
                                        </Link>
                                        <ToggleSuspensionButton suspended={d.suspended} id={d.id} />
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