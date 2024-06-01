"use client";

import { Button } from "@/components/ui/button";
import { UserRoundCheck, UserRoundX } from "lucide-react";
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
import { useState } from "react";
import { suspendUser, unSuspendUser } from "./action";
import { useToast } from "@/components/ui/use-toast";

type Props = {
    suspended: boolean,
    id: number
}
export default function ToggleSuspensionButton({ id, suspended }: Props) {

    const [loading, setLoading] = useState<boolean>(false);
    const { toast } = useToast();
    async function onSuspend() {
        setLoading(true);
        const { error, message } = await suspendUser(id);
        if (message) {
            toast({
                variant: error ? "destructive" : "default",
                title: error ? "Failure" : "Success",
                description: message
            });
        }
        setLoading(false);
    }

    async function onSuspensionInvoke() {
        setLoading(true);
        const { error, message } = await unSuspendUser(id);
        if (message) {
            toast({
                variant: error ? "destructive" : "default",
                title: error ? "Failure" : "Success",
                description: message
            });
        }
        setLoading(false);
    }

    return suspended ?
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button size="sm" variant="destructive" title="Invoke Suspension">
                    <UserRoundCheck size={16} />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Invoke Suspension?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure want to invoke suspension of this user?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onSuspensionInvoke} disabled={loading} >
                        Invoke
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog> :
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button size="sm" variant="destructive" title="Suspend User">
                    <UserRoundX size={16} />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Suspend User?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure want to suspend this User?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onSuspend} disabled={loading} >
                        Suspend
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
}