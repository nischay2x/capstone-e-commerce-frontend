import Link from "next/link";

export default function SellerSidebar() {
    return (
        <div className="w-full h-full flex flex-col sticky top-10">
            <div className="w-full text-black font-medium border-b hover:bg-slate-200">
                <Link className="py-2 px-3 block" href="/seller/products">Products</Link>
            </div>
            <div className="w-full text-black font-medium border-b hover:bg-slate-200">
                <Link className="py-2 px-3 block" href="/seller/orders">Orders</Link>
            </div>
            <div className="w-full text-black font-medium border-b hover:bg-slate-200">
                <Link className="py-2 px-3 block" href="/seller/products">Products</Link>
            </div>
        </div>
    )
}