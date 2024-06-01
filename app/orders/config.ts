export type OrderStatus = "PENDING" | "DISPATCHED" | "COMPLETED" | "CANCELLED";
export type Order = {
    "id": number;
    "netBilledAmount": number;
    "createdAt": Date;
    "status": OrderStatus;
    seller: {
        name: string;
    }
};


export type OrderById = Order & {
    address: string;
    phoneNumber: string;
    paymentMode: string;
    updatedAt: Date;
    seller: {
        name: string;
        email: string;
    },
    items: OrderItem[]
}

export type OrderItem = {
    "quantity": number;
    "id": number;
    "product": {
        "price": number;
        "id": number;
        "name": string;
        "description": string;
        "sellerId": number;
    }
}

export function decideStatusBackground(status: OrderStatus){
    switch(status){
        case "PENDING": return "bg-yellow-100 border-yellow-300 border";
        case "DISPATCHED": return "bg-green-100 border-green-300 border";
        case "COMPLETED": return "bg-blue-100 border-blue-300 border";
        default: return "bg-red-100 border-red-300 border";
    }
}