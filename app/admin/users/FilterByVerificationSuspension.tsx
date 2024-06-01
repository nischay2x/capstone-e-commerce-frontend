"use client";

import useDebouncedCallback from "@/components/hooks/useDebouncedCallback";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

let suspensionStatus = [
    { value: "0", text: "Active" },
    { value: "1", text: "Suspended" }
]

export default function FilterBySuspension() {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((value: string) => {
        const params = new URLSearchParams(searchParams);
        if (value !== "x") {
            params.set("suspended", value);
        } else {
            params.delete("suspended");
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <Select onValueChange={(v) => handleSearch(v)} defaultValue={searchParams.get('suspended') ?? ""}>
            <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Suspension" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="x" className="bg-red-100">Select</SelectItem>
            {
                suspensionStatus.map(c => <SelectItem key={c.value} className="capitalize text-sm" value={c.value}>{c.text}</SelectItem>)
            }
            </SelectContent>
        </Select>
    )
}