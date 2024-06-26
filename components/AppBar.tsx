"use client";

import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { NO_BAR_ROUTES } from "@/app/constants";
import { LogInIcon, LogOutIcon, UserIcon, Settings, Headphones, Store, NotebookText, Package, CircleGauge } from "lucide-react";
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import Link from "next/link";
import AppBarCart from "./AppBarCart";

export default function AppBar() {

    const { data: session } = useSession();

    const pathname = usePathname();
    async function onLogOut() {
        await signOut()
    }



    return (
        NO_BAR_ROUTES.some(r => r === pathname) ? null :
            <>
                <nav className="w-full bg-white z-10 sticky top-0 shadow-sm">
                    <div className="flex items-center px-4 py-2 border-b-2">
                        <Link href="/">
                            <div className="pl-2">
                                <svg width="100" height="30" viewBox="0 0 317 98" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M55.8254 44.448C55.8254 45.92 55.7294 47.328 55.5374 48.672H21.2654C21.5854 53.344 23.5374 55.68 27.1214 55.68C29.4254 55.68 31.0894 54.624 32.1134 52.512H54.6734C53.9054 56.352 52.2734 59.808 49.7774 62.88C47.3454 65.888 44.2414 68.288 40.4654 70.08C36.7534 71.808 32.6574 72.672 28.1774 72.672C22.8014 72.672 18.0014 71.552 13.7774 69.312C9.61738 67.072 6.35338 63.872 3.98538 59.712C1.68138 55.488 0.529375 50.56 0.529375 44.928C0.529375 39.296 1.68138 34.4 3.98538 30.24C6.35338 26.016 9.61738 22.784 13.7774 20.544C18.0014 18.304 22.8014 17.184 28.1774 17.184C33.5534 17.184 38.3214 18.304 42.4814 20.544C46.7054 22.72 49.9694 25.856 52.2734 29.952C54.6414 34.048 55.8254 38.88 55.8254 44.448ZM34.2254 39.36C34.2254 37.568 33.6494 36.224 32.4974 35.328C31.3454 34.368 29.9054 33.888 28.1774 33.888C24.4014 33.888 22.1934 35.712 21.5534 39.36H34.2254ZM144.346 25.248C145.69 22.752 147.61 20.8 150.106 19.392C152.666 17.92 155.706 17.184 159.226 17.184C163.45 17.184 167.258 18.304 170.65 20.544C174.042 22.72 176.698 25.92 178.618 30.144C180.602 34.304 181.594 39.232 181.594 44.928C181.594 50.624 180.602 55.584 178.618 59.808C176.698 63.968 174.042 67.168 170.65 69.408C167.258 71.584 163.45 72.672 159.226 72.672C155.706 72.672 152.666 71.968 150.106 70.56C147.61 69.088 145.69 67.104 144.346 64.608V72H123.034V0.959999H144.346V25.248ZM159.994 44.928C159.994 42.048 159.258 39.808 157.786 38.208C156.314 36.608 154.426 35.808 152.122 35.808C149.818 35.808 147.93 36.608 146.458 38.208C144.986 39.808 144.25 42.048 144.25 44.928C144.25 47.808 144.986 50.048 146.458 51.648C147.93 53.248 149.818 54.048 152.122 54.048C154.426 54.048 156.314 53.248 157.786 51.648C159.258 50.048 159.994 47.808 159.994 44.928ZM245.596 17.856V72H224.284V63.744C222.62 66.304 220.38 68.384 217.564 69.984C214.812 71.584 211.516 72.384 207.676 72.384C201.468 72.384 196.604 70.304 193.084 66.144C189.628 61.984 187.9 56.352 187.9 49.248V17.856H209.116V46.56C209.116 49.12 209.788 51.168 211.132 52.704C212.54 54.176 214.396 54.912 216.7 54.912C219.068 54.912 220.924 54.176 222.268 52.704C223.612 51.168 224.284 49.12 224.284 46.56V17.856H245.596ZM316.374 17.856L281.718 97.92H258.39L272.022 69.312L249.462 17.856H273.174L283.35 45.312L292.854 17.856H316.374Z" fill="#1E1E1E" />
                                    <path d="M86.1816 55.008H113.446V72H62.5656V55.968L89.4456 20.928H62.5656V4.032H113.446V20.064L86.1816 55.008Z" fill="#4C85F4" />
                                </svg>
                            </div>
                        </Link>
                        <div className="ml-auto flex items-center gap-x-3">

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className="rounded-full" size="icon" variant="secondary">
                                        <UserIcon size={20} />
                                        <span className="sr-only">Toggle user menu</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" >
                                    {
                                        session ? <>
                                            <DropdownMenuLabel className="capitalize">{session.user.name}</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>
                                                <Link className="flex items-center" href="/support">
                                                    <Headphones size={18} className="mr-2" /> <span className="pt-0.5"> Support </span>
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>
                                                <Button className="w-full" size="sm" onClick={onLogOut}>
                                                    <LogOutIcon size={16} className="mr-2" /> Logout
                                                </Button>
                                            </DropdownMenuItem>
                                        </> : <>
                                            <DropdownMenuItem>
                                                <Link href="/auth/login" className="bg-black hover:bg-slate-800 text-white w-full rounded-md flex justify-center items-center py-2">
                                                    <LogInIcon size={18} className="mr-2" />Login
                                                </Link>
                                            </DropdownMenuItem>
                                        </>
                                    }

                                </DropdownMenuContent>
                            </DropdownMenu>

                            {
                                session?.user.role === "USER" && <AppBarCart />
                            }
                        </div>

                    </div>
                </nav>
                {
                    session && <div className="py-2 sticky top-[59px] mx-auto z-[5] bg-white px-4 shadow-md">
                        <div className="flex justify-center gap-2">
                            {
                                session.user.role === "USER" && <>
                                    <Link className={`px-3 rounded-full text-black py-1 hover:bg-slate-200 border gap-2 flex items-center transition-all ${pathname.startsWith("/shop") ? 'bg-slate-100' : ''}`} href="/shop"><Store size={16} /> <span>Shop</span></Link>
                                    <Link className={`px-3 rounded-full text-black py-1 hover:bg-slate-200 border gap-2 flex items-center transition-all ${pathname.startsWith("/orders") ? 'bg-slate-100' : ''}`} href="/orders"><NotebookText size={16} /> <span>Orders</span></Link>
                                </>
                            }

                            {
                                session.user.role === "SELLER" && <>
                                    <Link className={`px-3 rounded-full text-black py-1 hover:bg-slate-200 border gap-2 flex items-center transition-all ${pathname == "/seller" ? 'bg-slate-100' : ''}`} href="/seller"><CircleGauge size={16} /> <span>Overview</span></Link>
                                    <Link className={`px-3 rounded-full text-black py-1 hover:bg-slate-200 border gap-2 flex items-center transition-all ${pathname.startsWith("/seller/products") ? 'bg-slate-100' : ''}`} href="/seller/products"><Package size={16} /> <span>Products</span></Link>
                                    <Link className={`px-3 rounded-full text-black py-1 hover:bg-slate-200 border gap-2 flex items-center transition-all ${pathname.startsWith("/seller/orders") ? 'bg-slate-100' : ''}`} href="/seller/orders"><NotebookText size={16} /> <span>Orders</span></Link>
                                </>
                            }

                            {
                                session.user.role === "ADMIN" && <>
                                    <Link className={`px-3 rounded-full text-black py-1 hover:bg-slate-200 border gap-2 flex items-center transition-all ${pathname == "/admin" ? 'bg-slate-100' : ''}`} href="/admin"><CircleGauge size={16} /> <span>Overview</span></Link>
                                    <Link className={`px-3 rounded-full text-black py-1 hover:bg-slate-200 border gap-2 flex items-center transition-all ${pathname.startsWith("/admin/users") ? 'bg-slate-100' : ''}`} href="/admin/users"><Package size={16} /> <span>Users</span></Link>
                                </>
                            }
                        </div>
                    </div>
                }

            </>
    )
}