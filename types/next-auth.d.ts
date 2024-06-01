import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            role: "USER"|"SELLER"|"ADMIN";
            name: string;
            email: string;
            cartId?: number;
            token: string;
            refreshToken: string;
        }
    }
}