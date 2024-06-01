export type User = {
    name: string;
    email: string;
    suspended: boolean;
    role: "SELLER"|"USER"|"ADMIN";
    id: number;
    updatedAt: Date;
    createdAt: Date;
    verified: boolean;
}

export type UserResponse = {
    users: User[],
    count: number,
    page: number,
    perPage: number
}

export const roles = ["SELLER", "USER", "ADMIN"]