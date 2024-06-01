"use client";


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";



export default function OrderByIdLoading() {

    return (
        <main className="p-4 bg-gray-100 dark:bg-gray-950 lg:p-8 h-svh">
            <Card>
                <CardHeader>
                    <CardTitle><Skeleton className="h-10 w-2/12" /></CardTitle>
                    <CardDescription><Skeleton className="h-10 w-1/4" /></CardDescription>
                </CardHeader>
                <CardContent>
                    
                         <div className="space-y-6">
                            <div className="flex gap-2">
                                <div className="flex border px-2 py-1 rounded-md gap-2">
                                    <Skeleton className="h-4 w-[50px]" />
                                </div>

                                <div className={`flex border px-2 py-1 rounded-md gap-2`}>
                                    <span>
                                        <Skeleton className="h-4 w-[50px]" />
                                    </span> 
                                </div>
                            </div>
                            <div className="text-muted-foreground">
                                <Skeleton className="h-4 w-12" />
                            </div>
                            <div>
                                <h4 className="border-b text-lg font-semibold"><Skeleton className="h-4 w-[50px]" /></h4>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead><Skeleton className="h-4 w-[50px]" /></TableHead>
                                            <TableHead><Skeleton className="h-4 w-[50px]" /></TableHead>
                                            <TableHead><Skeleton className="h-4 w-[50px]" /></TableHead>
                                            <TableHead><Skeleton className="h-4 w-[50px]" /></TableHead>
                                            <TableHead className="text-right"><Skeleton className="h-4 w-[50px]" /></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {
                                            [1,2,3].map((c, idx) => <TableRow key={idx}>
                                                <TableCell><Skeleton className="h-4 w-[50px]" /></TableCell>
                                                <TableCell><Skeleton className="h-4 w-[50px]" /></TableCell>
                                                <TableCell><Skeleton className="h-4 w-[50px]" /></TableCell>
                                                <TableCell>
                                                    <Skeleton className="h-4 w-[50px]" />
                                                </TableCell>
                                                <TableCell className="text-right"><Skeleton className="h-4 w-[50px]" /></TableCell>
                                            </TableRow>)
                                        }

                                    </TableBody>
                                    <TableFooter>
                                        <TableRow>
                                            <TableCell colSpan={4}><Skeleton className="h-4 w-[50px]" /></TableCell>
                                            <TableCell className="text-right"><Skeleton className="h-4 w-[50px]" /></TableCell>
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            </div>
                            <div>
                                <h4 className="border-b text-lg font-semibold"><Skeleton className="h-4 w-[50px]" /></h4>
                                <div className="py-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <h5 className="font-medium"><Skeleton className="h-4 w-[50px]" /></h5>
                                        <p className="mt-1 py-1 px-2 border rounded-md text-sm">
                                        <Skeleton className="h-4 w-[50px]" />
                                        </p>
                                    </div>
                                    <div>
                                        <h5 className="font-medium"><Skeleton className="h-4 w-[50px]" /></h5>
                                        <p className="mt-1 py-1 px-2 border rounded-md text-sm">
                                        <Skeleton className="h-4 w-[50px]" />
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4 className="border-b text-lg font-semibold"><Skeleton className="h-4 w-[50px]" /></h4>
                                <div className="py-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <h5 className="font-medium"><Skeleton className="h-4 w-[50px]" /></h5>
                                        <p className="mt-1 py-1 px-2 border rounded-md text-sm">
                                        <Skeleton className="h-4 w-[50px]" />
                                        </p>
                                    </div>
                                    <div>
                                        <h5 className="font-medium"><Skeleton className="h-4 w-[50px]" /></h5>
                                        <p className="mt-1 py-1 px-2 border rounded-md text-sm">
                                        <Skeleton className="h-4 w-[50px]" />
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                  
                </CardContent>
            </Card>
        </main>
    )
    
}


