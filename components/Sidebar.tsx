"use client";

import { NO_BAR_ROUTES } from "@/app/constants";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { LogOutIcon } from "lucide-react";

type NavComponent = {
    title: string; href: string; description: string
}

const accountComponents: NavComponent[] = [
    {
        title: "Company Profile",
        href: "/profile",
        description: "Re-usable components built using Radix UI and Tailwind CSS."
    },
    {
        href: "/organizations",
        title: "Organizations",
        description: "How to install dependencies and structure your app."
    },
    {
        href: "/notifications",
        title: "Alert Settings",
        description: "Styles for headings, paragraphs, lists...etc"
    },
    {
        href: "/billing",
        title: "Billing",
        description: "Styles for headings, paragraphs, lists...etc"
    },
    {
        href: "/access-keys",
        title: "Access Keys",
        description: "Styles for headings, paragraphs, lists...etc"
    }
]

const inventoryComponents: NavComponent[] = [
    {
        title: "Edge Devices",
        href: "/devices",
        description:
            "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
        title: "Tunnels",
        href: "/tunnels",
        description:
            "For sighted users to preview content available behind a link.",
    },
    {
        title: "Peers",
        href: "/peers",
        description:
            "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
        title: "Authorization Keys",
        href: "/tokens",
        description: "Visually or semantically separates content.",
    },
    {
        title: "Path Labels",
        href: "/path-labels",
        description:
            "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
        title: "Traffig & App Identifications",
        href: "/app-identifications",
        description:
            "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
];

const trafficComponents: NavComponent[] = [
    {
        title: "Path Selection",
        href: "/path-selections",
        description: "Time"
    },
    {
        title: "QoS",
        href: "/qos-policies",
        description: "dashdj fa"
    }
];

const securityComponents: NavComponent[] = [
    {
        title: "Firewall",
        href: "/firewall-policies",
        description: "Time"
    }
];

const availableComponents: NavComponent[] = [
    {
        title: "VRRP",
        href: "/vrrp",
        description: "VRRP"
    }
]

const storeComponents: NavComponent[] = [
    {
        title: "Installed",
        href: "/applications/installed",
        description: "VRRP"
    },
    {
        title: "Available",
        href: "/applications/available",
        description: "VRRP"
    }
]

const dashboardComponents: NavComponent[] = [
    {
        title: "Network",
        href: "/network",
        description: "Network"
    },
    {
        title: "World Map",
        href: "/networkmap",
        description: "VRRP"
    },
    {
        title: "Traffic",
        href: "/traffic",
        description: "VRRP"
    }
]

const troubleshootComponents: NavComponent[] = [
    {
        title: "Jobs",
        href: "/jobs",
        description: "Network"
    },
    {
        title: "Notifications",
        href: "/notifications",
        description: "VRRP"
    }
]

export default function Sidebar() {
    const pathname = usePathname();

    const { data: session } = useSession();
    const { push } = useRouter();

    // useEffect(() => {
    //     if(session?.user) {
    //         if(session?.user.org){}
    //         else {
    //             push("/organizations/add")
    //         }
    //     }
    // }, [pathname, session, push]);


    async function logOut() {
        await signOut({ redirect: true, callbackUrl: window.location.origin + "/auth/login" });
    }
    
    return (
        NO_BAR_ROUTES.some(r => r === pathname) ? null :
        <aside id="default-sidebar" className="top-0 border-l left-0 z-40 w-64 min-w-64 flex flex-col h-screen" aria-label="Sidebar">
            <div className="h-fulloverflow-y-auto bg-white dark:bg-gray-800">
                {/* <div className="pl-2 py-2">
                    <Image src="/sizaf-logo-2x.png" priority alt="Sizaf Logo" className="mx-auto" width={91} height={43} />
                </div> */}

                <div className="bg-black text-white w-full py-4 text-center">
                    Organization: <b>{"N/A"}</b>
                </div>

                <Accordion type="single" collapsible className="w-full mt-3">

                    <div className="py-2 px-3 text-black font-medium border-b hover:bg-slate-200">
                        <Link className="block" href="/home">Home Page</Link>
                    </div>

                    <AccordionItem value="item-1">
                        <AccordionTrigger className="hover:bg-slate-200 px-3">User Account</AccordionTrigger>
                        <AccordionContent>
                            <ul className="w-full space-y-1 text-black list-none list-inside dark:text-gray-400">
                                {
                                    accountComponents.map((i) => <li key={i.title} className="py-1 pl-4 hover:bg-slate-100">
                                        <Link href={i.href} className="block">
                                            {i.title}
                                        </Link>
                                    </li>)
                                }
                            </ul>
                        </AccordionContent>
                    </AccordionItem>

                    <div className="py-2 px-3 text-black font-medium border-b hover:bg-slate-200">
                        <Link className="block" href="/members">Users</Link>
                    </div>

                    <AccordionItem value="item-2">
                        <AccordionTrigger className="hover:bg-slate-200 px-3">Device Management</AccordionTrigger>
                        <AccordionContent>
                            <ul className="w-full space-y-1 text-gray-500 list-none list-inside dark:text-gray-400">
                                {
                                    inventoryComponents.map((i) => <li key={i.title} className="py-1 pl-4 hover:bg-slate-100">
                                        <Link href={i.href} className="block">
                                            {i.title}
                                        </Link>
                                    </li>)
                                }
                            </ul>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                        <AccordionTrigger className="hover:bg-slate-200 px-3">Route Optimization</AccordionTrigger>
                        <AccordionContent>
                            <ul className="w-full space-y-1 text-gray-500 list-none list-inside dark:text-gray-400">
                                {
                                    trafficComponents.map((i) => <li key={i.title} className="py-1 pl-4 hover:bg-slate-100">
                                        <Link href={i.href} className="block">
                                            {i.title}
                                        </Link>
                                    </li>)
                                }
                            </ul>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-4">
                        <AccordionTrigger className="hover:bg-slate-200 px-3">Security Features</AccordionTrigger>
                        <AccordionContent>
                            <ul className="w-full space-y-1 text-gray-500 list-none list-inside dark:text-gray-400">
                                {
                                    securityComponents.map((i) => <li key={i.title} className="py-1 pl-4 hover:bg-slate-100">
                                        <Link href={i.href} className="block">
                                            {i.title}
                                        </Link>
                                    </li>)
                                }
                            </ul>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-5">
                        <AccordionTrigger className="hover:bg-slate-200 px-3">High Availability</AccordionTrigger>
                        <AccordionContent>
                            <ul className="w-full space-y-1 text-gray-500 list-none list-inside dark:text-gray-400">
                                {
                                    availableComponents.map((i) => <li key={i.title} className="py-1 pl-4 hover:bg-slate-100">
                                        <Link href={i.href} className="block">
                                            {i.title}
                                        </Link>
                                    </li>)
                                }
                            </ul>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-6">
                        <AccordionTrigger className="hover:bg-slate-200 px-3">App Store</AccordionTrigger>
                        <AccordionContent>
                            <ul className="w-full space-y-1 text-gray-500 list-none list-inside dark:text-gray-400">
                                {
                                    storeComponents.map((i) => <li key={i.title} className="py-1 pl-4 hover:bg-slate-100">
                                        <Link href={i.href} className="block">
                                            {i.title}
                                        </Link>
                                    </li>)
                                }
                            </ul>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-7">
                        <AccordionTrigger className="hover:bg-slate-200 px-3">Dashboards</AccordionTrigger>
                        <AccordionContent>
                            <ul className="w-full space-y-1 text-gray-500 list-none list-inside dark:text-gray-400">
                                {
                                    dashboardComponents.map((i) => <li key={i.title} className="py-1 pl-4 hover:bg-slate-100">
                                        <Link href={i.href} className="block">
                                            {i.title}
                                        </Link>
                                    </li>)
                                }
                            </ul>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-8">
                        <AccordionTrigger className="hover:bg-slate-200 px-3">Troubleshoot</AccordionTrigger>
                        <AccordionContent>
                            <ul className="w-full space-y-1 text-gray-500 list-none list-inside dark:text-gray-400">
                                {
                                    troubleshootComponents.map((i) => <li key={i.title} className="py-1 pl-4 hover:bg-slate-100">
                                        <Link href={i.href} className="block">
                                            {i.title}
                                        </Link>
                                    </li>)
                                }
                            </ul>
                        </AccordionContent>
                    </AccordionItem>

                    <div className="py-2 px-3 text-black font-medium border-b hover:bg-slate-200">
                        <Link className="block" href="/about">About</Link>
                    </div>
                </Accordion>
            </div>
            <div className="py-3 bg-gray-200 px-2 mt-auto flex items-center gap-2 bottom-0 w-full">
                <button title="Log Out" onClick={logOut} className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md"><LogOutIcon size={15} /></button>
                <b>{session?.user.name}</b>
            </div>
        </aside>
    )
}