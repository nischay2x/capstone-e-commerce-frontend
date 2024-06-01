"use client";

import useDebouncedCallback from "@/components/hooks/useDebouncedCallback";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { roles } from "./config";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function FilterByRole() {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((value: string) => {
        const params = new URLSearchParams(searchParams);
        if (value !== "x") {
            params.set("role", value);
        } else {
            params.delete("role");
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <Select onValueChange={(v) => handleSearch(v)} defaultValue={searchParams.get('role') ?? ""}>
            <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="x" className="bg-red-100">Select Role</SelectItem>
            {
                roles.map(c => <SelectItem key={c} className="capitalize text-sm" value={c}>{c}</SelectItem>)
            }
            </SelectContent>
        </Select>
    )
}