import ProductCards from './ProductCards';
import ProductCardsSkeleton from '@/components/ProductCardsSkeleton';

import { Suspense } from 'react';
import ProductSearch from './ProductSearch';
import { Metadata } from 'next';

export const revalidate = 120;

export const metadata: Metadata = {
    title: 'eZbuy Shopping | Products Shop',
    description: "Shop for your favorite home products."
}

interface PageProps {
    searchParams?: {
        query?: string;
        page?: string;
    };
}
export default async function ProductHome({ searchParams }: PageProps) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    return (
        <main className='md:p-4 lg:p-8'>
            <div className="container">

            <div className="my-4 flex w-full md:w-1/2 lg:w-1/4 xl:w-1/3 md:mt-8">
                <ProductSearch />
            </div>
            <div >
                <Suspense key={query + currentPage} fallback={<ProductCardsSkeleton />}>
                    <ProductCards />
                </Suspense>
            </div>
            <div className="mt-5 flex w-full justify-center">
                {/* <Pagination totalPages={totalPages} /> */}
            </div>

            </div>
        </main>
    );
}