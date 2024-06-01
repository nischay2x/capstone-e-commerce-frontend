"use client";

import Link from "next/link"
import { Button } from "./ui/button"
import { ShoppingCart } from "lucide-react"
import useCartStore, { CartProduct } from "./zustand/cartStore";
import { useEffect } from "react";
import useDebouncedCallback from "./hooks/useDebouncedCallback";
import { getCartData, updateServerCart } from "@/actions/cart";
import { useToast } from "./ui/use-toast";

export default function AppBarCart() {

    const { cart, toChange, revert } = useCartStore(state => state);
    const { toast } = useToast();

    const updateCart = useDebouncedCallback((change: CartProduct) => {
        updateServerCart({ productId: change.id, quantity: change.quantity })
        .then(d => {
            if(d.error) {
                revert();
                toast({
                    variant: 'destructive',
                    title: 'Error updating cart',
                    description: d.message
                })
            }
        })
    }, 400);

    useEffect(() => {
        getCartData().then((d) => {
            if(d){
                useCartStore.setState({ cart: d.items.map(i => ({id: i.product.id, quantity: i.quantity, name: i.product.name, price: i.product.price})), toChange: undefined });
            }
        })
    }, []) 

    useEffect(() => {
        if(!toChange) return;
        
        updateCart(toChange);
    }, [toChange?.id, toChange?.quantity])

    return (
        <div className="relative">
            <Link href="/cart">
                <Button size="icon" variant="secondary" className="rounded-full">
                    <ShoppingCart size={20} />
                </Button>
            </Link>
            <span className="absolute bg-red-500 text-white h-4 w-4 grid items-center text-xs rounded-full px-1 right-[-5px] top-[-5px] aspect-square">
                {cart?.length}
            </span>
        </div>
    )
}