import { Skeleton } from "./ui/skeleton";

export default function ProductCardsSkeleton() {
    let d = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {
                d.map(d => <div key={d} className="bg-white rounded-lg shadow-md overflow-hidden dark:bg-gray-950">
                    <div className="aspect-square p-2 relative group ">
                        <Skeleton className="w-full h-full object-contain aspect-square" />
                    </div>
                    <div className="p-2 md:p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 capitalize">
                                <Skeleton className="h-4 w-16" />
                            </span>
                            <span className="text-lg font-bold text-gray-900 dark:text-gray-50">
                                <Skeleton className="h-5 w-10" />
                            </span>
                        </div>
                        <div className="w-full">
                            <h3 className="text-xl text-left font-bold text-gray-900 dark:text-gray-50 mb-2">
                                <Skeleton className="h-4 w-28" />
                            </h3>
                            <Skeleton className="h-4 w-full" />
                        </div>
                    </div>
                </div>)
            }



        </div>
    )
}