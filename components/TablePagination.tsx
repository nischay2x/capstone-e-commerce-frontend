"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useDebouncedCallback from "@/components/hooks/useDebouncedCallback";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

type Props = {
    perPage: number;
    page: number;
    count: number;
}
export default function TablePaginantion({ perPage, page, count }: Props) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((key: string, value: string) => {
        const params = new URLSearchParams(searchParams);
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <div className="flex w-full justify-between items-center">
            <Select onValueChange={(v) => handleSearch("perPage", v)} defaultValue={perPage.toString()}>
                <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Values per page" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="30">30</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                </SelectContent>
            </Select>
            
            <div className="flex gap-2">
                <Button size="sm" onClick={() => handleSearch('page', (page-1).toString())} disabled={page <= 1} variant="outline"> <ChevronLeft size={12} />&nbsp;Prev</Button>
                <Button size="sm" onClick={() => handleSearch('page', (page+1).toString())} disabled={(perPage * page) >= count} variant="outline">Next&nbsp; <ChevronRight size={16} /> </Button>
            </div>
        </div >
    )
}