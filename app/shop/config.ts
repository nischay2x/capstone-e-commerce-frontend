
export type UserProduct = {
    "id": number;
    "image": string;
    "name": string;
    "description": string;
    "price": number;
    "category": string;
}

export type ProductsResponse = {
    previousProducts: UserProduct[];
    grouping: {
        category: string;
        products: UserProduct[]
    }[]
}