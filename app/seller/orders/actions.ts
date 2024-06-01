"use server";

import axiosErrorFormatter from "@/lib/axiosErrorFormattor";
import { authFetcher } from "@/lib/fetcher";
import { revalidatePath } from "next/cache";

type FormState = {
    error: boolean;
    message: string;
}

export async function dispatchOrder(id: string|number): Promise<FormState> {
    const fetcher = await authFetcher();

    try {
        const res = await fetcher.put(`/seller-orders/dispatch/${id}`);
        revalidatePath("/seller/orders")
        return {
            error: false,
            message: String(res.data.message)
        }
    } catch (error) {
        console.log(error);
        
        let e = axiosErrorFormatter(error);
        return {
            error: true,
            message: e
        }
    }
}


export async function completeOrder(id: string|number): Promise<FormState> {
    const fetcher = await authFetcher();

    try {
        const res = await fetcher.put(`/seller-orders/complete/${id}`);
        revalidatePath("/seller/orders")
        return {
            error: false,
            message: String(res.data.message)
        }
    } catch (error) {
        console.log(error);
        
        let e = axiosErrorFormatter(error);
        return {
            error: true,
            message: e
        }
    }
}
