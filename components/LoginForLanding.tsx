import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function LoginForLanding() {
    const session = await getServerSession();

    return session?.user.role === "USER" ? null :
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="/auth/login">
            Login
        </Link>

}