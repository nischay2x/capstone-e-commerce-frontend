"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { useState } from "react";
import { sendEmailOtp, verifyEmailOtp } from "../register/action";

const formSchema = z.object({
    email: z.string().email({ message: "Email is required!" }),
    password: z.string(),
    otp: z.string()
})

type FormValues = z.infer<typeof formSchema>;

export default function ForgetPasseword() {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            otp: "",
            email: "",
            password: ""
        },
    })

    const [loading, setLoading] = useState<boolean>(false);
    const [otpSent, setOtpSent] = useState<boolean>(false);
    const { toast } = useToast();
    const { push } = useRouter();

    async function onSubmit(values: FormValues) {
        setLoading(true);
        if (!otpSent) {
            const { error, message } = await sendEmailOtp(values);
            toast({
                variant: error ? "destructive" : "default",
                title: message
            });
            if (!error) setOtpSent(true);
        } else {
            const { error, message } = await verifyEmailOtp(values);
            toast({
                variant: error ? "destructive" : "default",
                title: message
            });
            if (!error) push("/auth/login")
        }
        setLoading(false);
    }

    async function resend() {
        const { error, message } = await sendEmailOtp({ email: form.getValues("email") });
        toast({
            variant: error ? "destructive" : "default",
            title: message
        });
    }

    return <>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-4 mb-5">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" autoComplete="off" placeholder="hi@ezbuy.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {otpSent && 
                        <div className="flex justify-end">
                            <Button onClick={resend} size="sm" variant="outline">Resend OTP</Button>
                        </div>
                    }

                    {
                        otpSent && <>
                            <FormField
                                control={form.control}
                                name="otp"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>One Time Passowrd</FormLabel>
                                        <FormControl>
                                            <Input type="text" {...field} required />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" autoComplete="off" {...field} required />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                    }
                </div>

                <div className="flex justify-between items-center">
                    <Button size="sm" disabled={loading} type="submit">Submit</Button>
                    <Link href="/auth/login" className="text-blue-500 hover:text-blue-600">Login?</Link>
                </div>
            </form>
        </Form>
    </>
}