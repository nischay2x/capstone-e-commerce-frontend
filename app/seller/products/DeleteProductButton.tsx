"use client";

import { TrashIcon } from "lucide-react";
import { useState } from "react";
import { deleteProduct } from "./actions";
import { useToast } from "@/components/ui/use-toast";
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
}
export default function DeleteProductButton({ id }: Props) {

    const [loading, setLoading] = useState<boolean>(false);
    const { toast } = useToast();

    async function onDeleteClick() {
        setLoading(true);
        const { error, message } = await deleteProduct(id);
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
                <button title="Delete" className="text-white bg-red-500 hover:bg-red-600 p-1 rounded-md" type="button">
                    <TrashIcon size={16} />
                </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Product?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onDeleteClick} disabled={loading} >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}