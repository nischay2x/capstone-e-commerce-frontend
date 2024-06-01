import { withAuth } from "next-auth/middleware"
import { OPEN_ROUTES } from "./app/constants";

type CustomToken = {
    name: string;
    email: string;
    picture: string|null;
    role: 'ADMIN'|'USER'|'SELLER',
    cartId: number|null;
    image: string|null;
    token: string;
    refreshToken: string;
    iat: number
    exp: number;
    jti: string;
}

export default withAuth({
    callbacks: {
        authorized({ req, token }) {
            if(Boolean(token)) {
                let tkn = token as CustomToken;
                if(req.nextUrl.pathname.startsWith("/admin")){
                    return tkn.role === "ADMIN";
                } else if(req.nextUrl.pathname.startsWith("/seller")){
                    return tkn.role === "SELLER";
                } 
                
                if(tkn.role === "ADMIN") {
                    return req.nextUrl.pathname.startsWith("/admin")
                } else if (tkn.role === "SELLER"){
                    return req.nextUrl.pathname.startsWith("/seller")
                }
                
                return true;
            } else if (OPEN_ROUTES.includes(req.nextUrl.pathname)) {
                return true
            }
            
            return false;
        }
    },
})

export const config = {
 matcher: ['/((?!api|_next/static|_next/image|favicon.ico|auth\/*|support).*)'],
};