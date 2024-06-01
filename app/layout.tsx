import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/toaster";
import AppBar from "@/components/AppBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "eZbuy Shopping",
  description: "eZbuy Online Shopping",
  openGraph: {
    title: "eZbuy Shopping",
    description: "eZbuy Online Shopping",
    url: "https://ezbuy-blue.vercel.app/",
    siteName: "eZbuy Shopping",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en-US",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={`${inter.className} bg-slate-100`}>
          <NextTopLoader/>
          <AppBar/>
          {children}
          <Toaster/>
        </body>
      </AuthProvider>
    </html>
  );
}
