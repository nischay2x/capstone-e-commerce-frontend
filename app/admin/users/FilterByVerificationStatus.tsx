"use client";

import useDebouncedCallback from "@/components/hooks/useDebouncedCallback";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

let verificationStatus = [
    { value: "0", text: "Not Verified" },
    { value: "1", text: "Verified" }
]

export default function FilterByVerificationStatus() {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((value: string) => {
        const params = new URLSearchParams(searchParams);
        if (value !== "x") {
            params.set("verified", value);
        } else {
            params.delete("verified");
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <Select onValueChange={(v) => handleSearch(v)} defaultValue={searchParams.get('verified') ?? ""}>
            <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Verification" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="x" className="bg-red-100">Select</SelectItem>
            {
                verificationStatus.map(c => <SelectItem key={c.value} className="capitalize text-sm" value={c.value}>{c.text}</SelectItem>)
            }
            </SelectContent>
        </Select>
    )
}