"use client";

import { Check } from "lucide-react";
import { useState } from "react";
import { completeOrder } from "./actions";
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

interface Props {
    id: string | number;
    text?: string;
    size?: "default" | "sm" | "lg" | "icon" | null | undefined;
    variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined
}
export default function CompleteOrderButton({ id, text, variant, size }: Props) {

    const [loading, setLoading] = useState<boolean>(false);
    const { toast } = useToast();

    async function onCompleteClick() {
        setLoading(true);
        const { error, message } = await completeOrder(id);
        if (message) {
            toast({
                variant: error ? "destructive" : "default",
                title: error ? "Failure" : "Success",
                description: message
            });
        }

        setLoading(false);
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button title="Complete Order" variant={variant ?? "default"} size={size ?? "default"} className="flex gap-2" type="button">
                    <Check size={16} /> {text && <span>{text}</span>}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Order Delivered?</AlertDialogTitle>
                    <AlertDialogDescription>
                    Make sure that the order has reached the right customer and you have recived the payment.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction disabled={loading} onClick={onCompleteClick}>
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}