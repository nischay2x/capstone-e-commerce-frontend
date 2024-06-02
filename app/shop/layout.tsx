import { getServerSession } from "next-auth";
import authOptions from "../api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";

export default async function ShopLayout({ children }: { children: React.ReactNode }) {

    const session = await getServerSession(authOptions); 

    if(session){
        if(session.user.role !== "USER"){
            redirect(`/${session.user.role.toLowerCase()}`);
        }
    }

    return children;
}