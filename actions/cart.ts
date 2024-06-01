"use server";

import axiosErrorFormatter from "@/lib/axiosErrorFormattor";
import { authFetcher } from "@/lib/fetcher";

type UpdateServerCartProps = {
    productId: number;
    quantity?: number;
}
type Response = {
    error: boolean;
    message?: string;
    id: number;
    quantity?: number;
}
export async function updateServerCart(d: UpdateServerCartProps): Promise<Response>{
    const fetcher = await authFetcher();
    try {
        const { data } = await fetcher.post("/cart-item", d);
        let dat = data as { id: number, quantity: number };
        return {
            error: false,
            message: "",
            ...dat
        }
    } catch (error) {
        let e = axiosErrorFormatter(error);
        return {
            error: true,
            message: e,
            id: d.productId,
            quantity: d.quantity
        }
    }
}

export type CartItem = {
    "id": number,
    "quantity": number,
    "product": {
        "name": string,
        "price": number,
        "id": number
    }
}

export type CartResponse = {
    id: number;
    updatedAt: Date;
    items: CartItem[];
}


export async function getCartData(): Promise<CartResponse|null> {
    const fetcher = await authFetcher();
    try {
        const { data } = await fetcher.get("/cart");
        return data
    } catch (error) {
        return null;
    }
}