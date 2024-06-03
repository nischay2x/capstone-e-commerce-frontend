"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { Input } from "@/components/ui/input";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Meh } from "lucide-react";
import useCartStore from "@/components/zustand/cartStore";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatToINR } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { createOrder } from "@/actions/order";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

const formSchema = z.object({
    address: z.string().min(10, "Please provide complete address.").max(200),
    phoneNumber: z.string().regex(/^[5-9][0-9]{9}$/, "Invalid phone number, 10 digits without country code."),
    paymentMode: z.string().min(2, "Please select payment mode.")
})

export type CheckoutFormValues = z.infer<typeof formSchema>;

export default function CheckoutPage() {

    const { cart, clearCart } = useCartStore(state => state);
    const total = cart.map(c => c.price * (c.quantity ?? 0)).reduce((a, b) => a + b, 0);
    const router = useRouter();

    const form = useForm<CheckoutFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            address: "",
            phoneNumber: "",
            paymentMode: "CASH"
        },
    })


    const [processing, setProcessing] = useState<boolean>(false);
    const { toast } = useToast();
    async function onSubmit(fd: CheckoutFormValues) {
        localStorage?.setItem("address", fd.address);
        localStorage?.setItem("phoneNumber", fd.phoneNumber);
        setProcessing(true);
        const { error, message } = await createOrder(fd);
        toast({
            variant: error? "destructive": "default",
            title: error? "Failed": "Success",
            description: message
        });
        if(!error) {
            clearCart();
            router.push("/thank-you");
        }
        setProcessing(false);
    }

    return (
        <main className='md:p-4 bg-gray-100 dark:bg-gray-950 lg:p-8 h-svh'>
            <Card>
                <CardHeader>
                    <CardTitle>Checkout</CardTitle>
                    <CardDescription>Check items and place your order.</CardDescription>
                </CardHeader>
                <CardContent>
                    {
                        cart.length ?
                            <>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>#</TableHead>
                                            <TableHead>Item</TableHead>
                                            <TableHead>Price</TableHead>
                                            <TableHead>Quantity</TableHead>
                                            <TableHead className="text-right">Total</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {
                                            cart.map((c, idx) => <TableRow key={c.id}>
                                                <TableCell>{idx + 1}</TableCell>
                                                <TableCell>{c.name}</TableCell>
                                                <TableCell>{formatToINR(c.price)}</TableCell>
                                                <TableCell>
                                                    {c.quantity}
                                                </TableCell>
                                                <TableCell className="text-right">{formatToINR(c.price * (c.quantity ?? 0))}</TableCell>
                                            </TableRow>)
                                        }

                                    </TableBody>
                                    <TableFooter>
                                        <TableRow>
                                            <TableCell colSpan={4}>Total</TableCell>
                                            <TableCell className="text-right">{formatToINR(total)}</TableCell>
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                                <br />

                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)}>
                                        <div className="border rounded-md md:p-3">
                                            <div className="container flex flex-wrap gap-y-4 my-5">
                                                <div className="w-full space-y-4 md:w-1/2">

                                                    <FormField
                                                        control={form.control}
                                                        name="address"
                                                        render={({ field }) => (
                                                            <FormItem className="max-w-md">
                                                                <FormLabel>Address</FormLabel>
                                                                <FormControl>
                                                                    <Textarea {...field} defaultValue={localStorage?.getItem("address") ?? ""} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="phoneNumber"
                                                        render={({ field }) => (
                                                            <FormItem className="max-w-md">
                                                                <FormLabel>Contact Number</FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder="9876543210" {...field} defaultValue={localStorage?.getItem("phoneNumber")?? ""} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                </div>
                                                <FormField
                                                    control={form.control}
                                                    name="paymentMode"
                                                    render={({ field }) => (
                                                        <FormItem className="space-y-3">
                                                            <FormLabel>Chose a payment mode</FormLabel>
                                                            <FormControl>
                                                                <RadioGroup
                                                                    onValueChange={field.onChange}
                                                                    defaultValue={field.value}
                                                                    className="flex flex-col space-y-1"
                                                                >
                                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                                        <FormControl>
                                                                            <RadioGroupItem value="CASH" />
                                                                        </FormControl>
                                                                        <FormLabel className="font-normal">
                                                                            Cash
                                                                        </FormLabel>
                                                                    </FormItem>
                                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                                        <FormControl>
                                                                            <RadioGroupItem disabled value="UPI" />
                                                                        </FormControl>
                                                                        <FormLabel className="font-normal">
                                                                            UPI
                                                                        </FormLabel>
                                                                    </FormItem>
                                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                                        <FormControl>
                                                                            <RadioGroupItem disabled value="CARD" />
                                                                        </FormControl>
                                                                        <FormLabel className="font-normal">Debit / Credit Card</FormLabel>
                                                                    </FormItem>
                                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                                        <FormControl>
                                                                            <RadioGroupItem disabled value="ONLINE" />
                                                                        </FormControl>
                                                                        <FormLabel className="font-normal">Net Banking</FormLabel>
                                                                    </FormItem>
                                                                </RadioGroup>
                                                            </FormControl>
                                                            <FormDescription>
                                                                Only cash payment available at this time. Sorry for the inconvenience.
                                                            </FormDescription>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                        </div>
                                        <br />
                                        <div className="flex justify-between">
                                            <Link href="/cart">
                                                <Button type="button" size="sm" disabled={processing} variant="outline">Back to Cart</Button>
                                            </Link>
                                            <Button size="sm" disabled={processing} type="submit">Place Order</Button>
                                        </div>
                                    </form>
                                </Form>

                            </>
                            : <div className="flex flex-col py-8 items-center">
                                <Meh size={60} />
                                <div className="mt-2 text-xl">No items in cart.</div>
                                <br />
                                <Button type="button" onClick={() => router.back()}>Go Back</Button>
                            </div>
                    }
                </CardContent>
            </Card>
        </main>

    )
}