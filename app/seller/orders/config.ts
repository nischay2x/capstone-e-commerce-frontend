import { OrderItem, OrderStatus } from "@/app/orders/config";

export type SellerOrderResponse = {
    orders: SellerOrder[],
    page: number;
    perPage: number;
    count: number;
    status?: string;
    year?: string;
    month?: string;
}

type SellerOrder = {
    id: number;
    netBilledAmount: number;
    address: string;
    createdAt: Date;
    updatedAt: Date;
    status: OrderStatus;
}

export type SellerOrderById = {
    id: number;
    updatedAt: Date;
    createdAt: Date;
    items: OrderItem[];
    address: string;
    phoneNumber: string;
    netBilledAmount: number;
    paymentMode: string;
    status: OrderStatus;
    user: {
        name: string;
        email: string;
    }
}

export const orderState = [
    "PENDING",
    "DISPATCHED",
    "COMPLETED",
    "CANCELLED",
]