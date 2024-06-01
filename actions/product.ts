"use server";

import { authFetcher } from "@/lib/fetcher";

type SearchResponse = {
    id: number;
    name: string;
    category: string;
}
export async function searchUserProducts(query: string) : Promise<SearchResponse[]> {
    const fetcher = await authFetcher();

    try {
        const { data } = await fetcher(`/products/search?q= ${query}`);
        return data;
    } catch (error) {
        return []
    }
}
