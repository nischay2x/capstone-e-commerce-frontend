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
import { createSeller } from "../action";
import { useState } from "react";

const formSchema = z.object({
    email: z.string().email({ message: "Email is required!" }),
    password: z.string().min(6).max(32),
    name: z.string().min(3).max(50)
})

type FormValues = z.infer<typeof formSchema>;

export default function LoginForm() {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        },
    })

    const [loading, setLoading] = useState<boolean>(false);
    const { toast } = useToast();
    const { push } = useRouter();

    async function onSubmit(values: FormValues) {
        setLoading(true);
        const { error, message } = await createSeller(values);
        toast({
            variant: error ? "destructive" : "default",
            title: message
        });
        if (!error) push('/auth/login');
        setLoading(false);
    }

    return <>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-4 mb-5 p-4 border-red-200 border rounded-md shadow-sm shadow-red-300">
                <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Shop Name</FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" autoComplete="off" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex justify-between items-center">
                    <Button size="sm" variant="destructive" disabled={loading} type="submit">Register as Seller</Button>
                    <Link href="/auth/login" className="text-blue-500 hover:text-blue-600">Login?</Link>
                </div>
            </form>
        </Form>
    </>
}