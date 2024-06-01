
import DataTable from './DataTable';
import DataTableSkeleton from '@/components/DataTableSkeleton';

import { Suspense } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import FilterByStatus from './FilterByStatus';
import MonthFilter from "@/components/MonthFilter";


interface PageProps {
    searchParams?: {
        query?: string;
        page?: string;
        category?: string;
        perPage?: string;
    };
}
export default async function OrdersHome({ searchParams }: PageProps) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    return (
        <Card>
            <CardHeader>
                <CardTitle>Users</CardTitle>
                <CardDescription>List of users..</CardDescription>
            </CardHeader>
            <CardContent>

            <div className="my-4 flex items-center justify-between gap-2 md:mt-8">
                <FilterByStatus />
                <div className="flex-grow"></div>
                <MonthFilter />
            </div>
            <div className="border p-3 rounded-md">

            <Suspense key={query + currentPage} fallback={<DataTableSkeleton />}>
                <DataTable searchParams={searchParams} />
            </Suspense>
            </div>
            <div className="mt-5 flex w-full justify-center">
                {/* <Pagination totalPages={totalPages} /> */}
            </div>
            </CardContent>

        </Card>
    );
}