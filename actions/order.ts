"use server";

import { CheckoutFormValues } from "@/app/checkout/page";
import axiosErrorFormatter from "@/lib/axiosErrorFormattor";
import { authFetcher } from "@/lib/fetcher";
import { revalidatePath } from "next/cache";

type Response = {
    error: boolean;
    message: string;
}
export async function createOrder(d: CheckoutFormValues): Promise<Response>{
    const fetcher = await authFetcher();

    try {
        const { data } = await fetcher.post("/orders", d);
        revalidatePath("/orders")
        return {
            error: false,
            message: `Placed order to ${data.totalOrders} sellers for a sum of ₹${data.totalPrice}`
        };
    } catch (error) {
        let e = axiosErrorFormatter(error);
        return {
            error: true,
            message: e
        }
    }
}