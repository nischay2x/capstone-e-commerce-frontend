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
import { signIn } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";


const formSchema = z.object({
    email: z.string().email({ message: "Email is required!" }),
    password: z.string().min(6).max(32)
})

type FormValues = z.infer<typeof formSchema>;

export default function LoginForm() {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    const { toast } = useToast();
    const { push } = useRouter();


    async function onSubmit(values: FormValues) {
        const res = await signIn("credentials", { ...values, redirect: false });
        
        if (res?.ok) {
            push("/shop");
        } else {
            toast({
                variant: "destructive",
                title: res?.error ?? "An error occurred while signing in."
            });
        }
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
                                    <Input type="email" autoComplete="username" placeholder="hi@ezbuy.com" {...field} />
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
                                    <Input type="password" autoComplete="current-password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                <div>
                    <Link href="/auth/forget-password" className="text-blue-500 text-sm hover:text-blue-600">Forget Password?</Link>
                </div>
                </div>
                
                <div className="flex justify-between items-center">
                    <Button size="sm" type="submit">Login</Button>
                    <Link href="/auth/register" className="text-blue-500 hover:text-blue-600">Register?</Link>
                </div>
            </form>
        </Form>
    </>
}