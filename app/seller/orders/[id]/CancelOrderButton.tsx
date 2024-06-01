"use client";

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
  import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
  
  type Props = {
    cancelOrder: () => Promise<{error: boolean, message: string}>
  }
  export function CancelOrderButton({cancelOrder}: Props) {

    const { toast } = useToast();
    const [isLoading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    async function onCancelConfirm () {
        setLoading(true);
        const { error, message } = await cancelOrder();
        toast({
            variant: error ? "destructive": "default",
            title: error? "Failure": "Success",
            description: message
        });
        setLoading(false);
        router.push("/orders")
    }

    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="sm" variant="destructive">Cancel Order</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Order?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Your order will be cancelled and returned back to the seller.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction disabled={isLoading} onClick={onCancelConfirm}>
                Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  