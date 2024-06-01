"use client"

import { useState, useMemo } from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import useDebouncedCallback from "@/components/hooks/useDebouncedCallback"


export default function MonthFilter() {
    const today = new Date();

    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;

    const [monthsBlockedAfter, setMonthsBlockedAfter] = useState<number>(currentMonth)

    const yearOptions = useMemo(() => {
        const currentYear = new Date().getFullYear();
        const endYear = 2023;
        const years = [];

        for (let year = currentYear; year >= endYear; year--) {
            years.push(year);
        }

        return years;
    }, [])


    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((k: string, v: string) => {
        const params = new URLSearchParams(searchParams);
        if (v) {
            params.set(k, v)
        } else {
            params.delete(k)
        }

        if (k === "year") {
            setMonthsBlockedAfter((v === currentYear.toString()) ? currentMonth : 12)
        }

        replace(`${pathname}?${params.toString()}`);
    }, 300);



    return (
        <div className="flex gap-x-2">

            <Select onValueChange={(v) => handleSearch('year', v)} defaultValue={searchParams.get('year') || currentYear.toString()}>
                <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                    {yearOptions.map(y => <SelectItem key={y} value={y.toString()}>{y}</SelectItem>)}
                </SelectContent>
            </Select>


            <Select onValueChange={(v) => handleSearch('month', v)} defaultValue={searchParams.get('month') || currentMonth.toString()}>
                <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="1">January</SelectItem>
                    <SelectItem value="2" disabled={monthsBlockedAfter < 2}>February</SelectItem>
                    <SelectItem value="3" disabled={monthsBlockedAfter < 3}>March</SelectItem>
                    <SelectItem value="4" disabled={monthsBlockedAfter < 4}>April</SelectItem>
                    <SelectItem value="5" disabled={monthsBlockedAfter < 5}>May</SelectItem>
                    <SelectItem value="6" disabled={monthsBlockedAfter < 6}>June</SelectItem>
                    <SelectItem value="7" disabled={monthsBlockedAfter < 7}>July</SelectItem>
                    <SelectItem value="8" disabled={monthsBlockedAfter < 8}>August</SelectItem>
                    <SelectItem value="9" disabled={monthsBlockedAfter < 9}>September</SelectItem>
                    <SelectItem value="10" disabled={monthsBlockedAfter < 10}>October</SelectItem>
                    <SelectItem value="11" disabled={monthsBlockedAfter < 11}>November</SelectItem>
                    <SelectItem value="12" disabled={monthsBlockedAfter < 12}>December</SelectItem>
                </SelectContent>
            </Select>

        </div>
    )
}
