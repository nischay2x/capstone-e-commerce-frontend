"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function OrdersLoading() {
    return (
        <main className="md:p-4 bg-gray-100 dark:bg-gray-950 lg:p-8 h-svh">
            <Card>
                <CardHeader>
                    <CardTitle><Skeleton className="h-8 w-[100px]" /></CardTitle>
                    <CardDescription><Skeleton className="h-4 w-[200px]" /></CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="ml-auto w-fit">
                        <Skeleton className="h-6 w-[200px]" />
                    </div>
                    <br />
                    <div className="space-y-3">

                        <div className="flex items-center w-full justify-between border-b py-2 hover:px-3 hover:bg-slate-100 transition-all">
                            <div>
                                <Skeleton className="h-4 w-[100px]" />
                                <Skeleton className="h-4 w-[100px]" />
                            </div>
                            <div className={`text-xs py-1 px-2 rounded-md text-black`}>
                                <Skeleton className="h-4 w-[100px]" />
                            </div>
                            <div>
                                <Skeleton className="h-4 w-4" />
                            </div>
                        </div>

                        <div className="flex items-center w-full justify-between border-b py-2 hover:px-3 hover:bg-slate-100 transition-all">
                            <div>
                                <Skeleton className="h-4 w-[100px]" />
                                <Skeleton className="h-4 w-[100px]" />
                            </div>
                            <div className={`text-xs py-1 px-2 rounded-md text-black`}>
                                <Skeleton className="h-4 w-[100px]" />
                            </div>
                            <div>
                                <Skeleton className="h-4 w-4" />
                            </div>
                        </div>

                        <div className="flex items-center w-full justify-between border-b py-2 hover:px-3 hover:bg-slate-100 transition-all">
                            <div>
                                <Skeleton className="h-4 w-[100px]" />
                                <Skeleton className="h-4 w-[100px]" />
                            </div>
                            <div className={`text-xs py-1 px-2 rounded-md text-black`}>
                                <Skeleton className="h-4 w-[100px]" />
                            </div>
                            <div>
                                <Skeleton className="h-4 w-4" />
                            </div>
                        </div>


                    </div>

                </CardContent>
            </Card>
        </main>
    )
}