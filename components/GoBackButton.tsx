"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

type Props = {
    text?: string;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined
    size?: "default" | "sm" | "lg" | "icon" | null | undefined
}
export default function GoBack({ text, size, variant }: Props) {
    const { back } = useRouter();
    return (
        <Button onClick={back} variant={variant ?? "outline"} size={size} >
            {text ?? "Go Back"}
        </Button>
    )
}