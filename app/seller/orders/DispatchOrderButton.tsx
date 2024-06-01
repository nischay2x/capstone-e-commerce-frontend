"use client";

import { Send } from "lucide-react";
import { useState } from "react";
import { dispatchOrder } from "./actions";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { usePathname, useRouter } from "next/navigation";
interface Props {
    id: string | number;
    text?: string;
    size?: "default" | "sm" | "lg" | "icon" | null | undefined;
    variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined
}
export default function DispatchOrderButton({ id, text, size, variant }: Props) {

    const [loading, setLoading] = useState<boolean>(false);
    const { toast } = useToast();
    const { back } = useRouter();
    const pathname = usePathname();

    async function onDispatchClick() {
        setLoading(true);
        const { error, message } = await dispatchOrder(id);
        if (message) {
            toast({
                variant: error ? "destructive" : "default",
                title: error ? "Failure": "Success",
                description: message
            });
            if(!error) {
                if(pathname !== "/seller/orders") back();
            }
        }

        setLoading(false);
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
            <Button title="Dispatch Order" variant={variant?? "default"} size={size?? "default"}  className="flex gap-2" type="button">
            <Send size={16} /> {text && <span>{text}</span>}
        </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Ready to Dispatch?</AlertDialogTitle>
                    <AlertDialogDescription>

                        Make sure that the order package contains all the items and a copy of signed invoice.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onDispatchClick} disabled={loading}>
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
        
    )
}