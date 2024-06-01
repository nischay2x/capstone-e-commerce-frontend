"use client";

import { Download } from "lucide-react";
import { Button } from "./ui/button";

type Props = {
    text?: string;
}
export default function GetInvoiceButton({ text }: Props) {

    function onClick() {
        print()
    }

    return <Button size="sm" onClick={onClick} className="flex gap-2"><Download size={16} /> {text}</Button>
}