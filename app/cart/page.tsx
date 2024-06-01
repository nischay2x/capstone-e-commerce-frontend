"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Meh, Minus, Plus, Trash } from "lucide-react";
import useCartStore from "@/components/zustand/cartStore";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatToINR } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {

    const { cart, addToCart, decreaseItemQuantity, removeFromCart } = useCartStore(state => state);
    const total = cart.map(c => c.price * (c.quantity ?? 0)).reduce((a, b) => a + b, 0);

    const router = useRouter();

    return (
        <main className='p-4 bg-gray-100 dark:bg-gray-950 lg:p-8 h-svh'>
            <Card>
                <CardHeader>
                    <CardTitle>Shopping Cart</CardTitle>
                    <CardDescription>See the items in your cart.</CardDescription>
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
                                                    <div className="flex items-center gap-x-2">
                                                        <button className="border p-1 rounded-sm hover:bg-blue-100"><Minus size={12} onClick={() => decreaseItemQuantity(c.id)} /></button>
                                                        <input className="w-8 text-center border rounded-sm outline-none arrow-hidden" disabled value={c.quantity} />
                                                        <button className="border p-1 rounded-sm hover:bg-blue-100"><Plus size={12} onClick={() => addToCart(c)} /></button>
                                                        <button className="border p-1 rounded-sm bg-red-400 text-white"><Trash size={12} onClick={() => removeFromCart(c.id)} /></button>
                                                    </div>
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
                                <div className="flex justify-end">
                                    <Link href="/checkout">
                                        <Button>Checkout</Button>
                                    </Link>
                                </div>
                            </>
                            : <div className="flex flex-col py-8 items-center">
                                <Meh size={60} />
                                <div className="mt-2 text-xl">Wow ... so empty!</div>
                                <br />
                                <Button type="button" onClick={() => router.back()}>Go Back</Button>
                            </div>
                    }
                </CardContent>
            </Card>
        </main>

    )
}