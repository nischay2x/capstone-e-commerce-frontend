"use client";

import useDebouncedCallback from "@/components/hooks/useDebouncedCallback";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { orderState } from "./config";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function FilterByStatus() {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((value: string) => {
        const params = new URLSearchParams(searchParams);
        if (value !== "x") {
            params.set("status", value);
        } else {
            params.delete("status");
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <Select onValueChange={(v) => handleSearch(v)} defaultValue={searchParams.get('status') ?? ""}>
            <SelectTrigger className="max-w-[140px]">
                <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="x" className="bg-red-100">Select Status</SelectItem>
            {
                orderState.map(c => <SelectItem key={c} className="capitalize text-sm" value={c}>{c}</SelectItem>)
            }
            </SelectContent>
        </Select>
    )
}