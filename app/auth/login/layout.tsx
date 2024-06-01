import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login | eZbuy Shopping",
    description: "Login to your account",
    openGraph: {
        title: "Login | eZbuy Shopping",
        description: "Login to your account",
    },
}
export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}