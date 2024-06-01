"use client";

import useCartStore, { CartProduct } from "@/components/zustand/cartStore";
import { Minus, Plus, ShoppingBagIcon } from "lucide-react";
interface AddToCartButtonProps {
    product: CartProduct;
    text?: string;
}
export default function AddToCartButton({ product, text }: AddToCartButtonProps) {

    const { addToCart, cart, decreaseItemQuantity } = useCartStore(state => state);
    const isAlredyAdded = cart.find(c => c.id === product.id);

    return isAlredyAdded ? (<div className="flex gap-2 p-2 justify-between rounded-full border bg-white shadow-sm">
        <button onClick={() => decreaseItemQuantity(product.id)}><Minus size={12} /></button>
        <span className="text-xs">{isAlredyAdded.quantity}</span>
        <button onClick={() => addToCart(product)}><Plus size={12} /></button>
    </div>) : (
        <button type="button" onClick={() => addToCart(product)} title="Add to Cart" className="p-2 border-none flex items-center gap-2 rounded-full bg-slate-900 text-white">
            <ShoppingBagIcon size={16} /> {text && <span className="text-sm pr-1">{text}</span>}
        </button>
    )
}