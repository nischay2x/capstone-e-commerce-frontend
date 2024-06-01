"use client";

import useDebouncedCallback from "@/components/hooks/useDebouncedCallback";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { productCategories } from "./config";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function FilterByCategory() {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((value: string) => {
        const params = new URLSearchParams(searchParams);
        if (value !== "x") {
            params.set("category", value);
        } else {
            params.delete("category");
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <Select onValueChange={(v) => handleSearch(v)} defaultValue={searchParams.get('status') ?? ""}>
            <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="x" className="bg-red-100">Select Category</SelectItem>
            {
                productCategories.map(c => <SelectItem key={c} className="capitalize text-sm" value={c}>{c}</SelectItem>)
            }
            </SelectContent>
        </Select>
    )
}