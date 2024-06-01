"use server";

import axiosErrorFormatter from "@/lib/axiosErrorFormattor";
import { authFetcher } from "@/lib/fetcher";
import { revalidatePath } from "next/cache";

export async function suspendUser(id: number) {
    const fetcher = await authFetcher();
    try {
        const { data } = await fetcher.delete(`/users/suspend/${id}`);
        revalidatePath("/admin/users")
        return {
            error: false,
            message: data.message
        }
    } catch (error) {
        const e = axiosErrorFormatter(error);
        return {
            error: true,
            message: e
        }
    }
}


export async function unSuspendUser(id: number) {
    const fetcher = await authFetcher();
    try {
        const { data } = await fetcher.delete(`/users/unsuspend/${id}`);
        revalidatePath("/admin/users")
        return {
            error: false,
            message: data.message
        }
    } catch (error) {
        const e = axiosErrorFormatter(error);
        return {
            error: true,
            message: e
        }
    }
}