"use server";

import axiosErrorFormatter from "@/lib/axiosErrorFormattor";
import { authFetcher } from "@/lib/fetcher";
import { revalidatePath } from "next/cache";

type FormState = {
    error: boolean;
    message: string;
}
export async function createProduct(data: FormData) {
    const fetcher = await authFetcher();

    try {
        const res = await fetcher.post("/products", data);
        revalidatePath("/seller/products")
        return {
            error: false,
            message: String(res.data.message)
        }
    } catch (error) {
        let e = axiosErrorFormatter(error);
        return {
            error: true,
            message: e
        }
    }
}

export async function updateProduct(data: FormData, id: string|number) {
    const fetcher = await authFetcher();

    try {
        const res = await fetcher.put(`/products/${id}`, data);
        revalidatePath('/seller/products')
        return {
            error: false,
            message: String(res.data.message)
        }
    } catch (error) {
        let e = axiosErrorFormatter(error);
        return {
            error: true,
            message: e
        }
    }
}

export async function deleteProduct(id: string|number){
    const fetcher = await authFetcher();

    try {
        const res = await fetcher.delete(`/products/${id}`);
        revalidatePath("/seller/products")
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