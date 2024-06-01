import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Seller | eZbuy Shopping",
    description: "Seller Dashboard - eZbuy Online Shopping",
  };
  
  export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <main style={{ minHeight: 'calc(100vh - 106px)' }} className="flex" >
        <div className="inline-block w-full p-4">
            {children}
        </div>
      </main>
    );
  }