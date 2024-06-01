import { z } from "zod";

export const formSchema = z.object({
    name: z.string().min(2).max(100),
    description: z.string().max(400),
    price: z.string().regex(/^[0-9]+(\.[0-9]+){0,1}$/, { message: "Only positive numbers" }),
    category: z.string().min(2),
    image: z.string()
})

export type FormValues = z.infer<typeof formSchema>;

export type SellerProductsResponse = {
    products: SellerProduct[],
    page: number;
    perPage: number;
    category: string|undefined;
    query: string|undefined;
    count: number;
}

export type SellerProduct = {
    id: number;
    "name": string;
    "description": string;
    "price": number;
    "category": string;
    "updatedAt": Date;
    image: string;
}

export type ProductById = {
    "id": number;
    "createdAt": Date;
    "updatedAt": Date;
    "image": string;
    "name": string;
    "description": string;
    "price": number;
    "category": string;
    "sellerId": number;
    "state": "ACTIVE" | "DELETED"
}

export const productCategories = [
    "Bedding",
    "Kitchen",
    "Home Decor",
    "Furniture",
    "Lighting",
    "Home Organization",
    "Home Appliances"
]