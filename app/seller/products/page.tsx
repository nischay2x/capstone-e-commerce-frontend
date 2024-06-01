
import Search from '@/components/Search';
import DataTable from './DataTable';
import DataTableSkeleton from '@/components/DataTableSkeleton';

import { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import FilterByCategory from './FilterByCategory';

interface PageProps {
    searchParams?: {
        query?: string;
        page?: string;
        category?: string;
        perPage?: string;
    };
}
export default async function ProductHome({ searchParams }: PageProps) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    return (
        <Card>
            <CardHeader>
                <CardTitle>Products</CardTitle>
                <CardDescription>List of items that you sell.</CardDescription>
            </CardHeader>
            <CardContent>

            <div className="my-4 flex items-center justify-between gap-2 md:mt-8">
                <FilterByCategory />
                <Search placeholder="Search products by name..." />
                <Link href="/seller/products/add">
                    <Button>Add New</Button>
                </Link>
                {/* <CreateInvoice /> */}
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