import { authFetcher } from "@/lib/fetcher";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { formatToINR } from "@/lib/utils";
import AddToCartButton from "../AddToCartButton";
import type { Metadata, ResolvingMetadata } from 'next';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";

type Product = {
    id: number;
    "name": string;
    "description": string;
    "price": number;
    "image": string;
    "category": string;
    "seller": {
        "name": string;
        "id": number;
    }
};
async function getData(id: string): Promise<{ product: Product, recs: Product[] } | null> {
    const fetcher = await authFetcher();

    let productId: string | number = id.split("-")[0];
    productId = parseInt(productId);

    if (!productId) {
        return null;
    }

    try {
        const { data } = await fetcher.get(`/products/${productId}?recommend=1`);
        return data;
    } catch (error) {
        return null;
    }
}

type PageProps = {
    params: {
        id: string;
    }
}

export async function generateMetadata(
    { params }: PageProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const data = await getData(params.id);
    const product = data?.product;
    const prev = await parent;

    const previousImages = prev.openGraph?.images || [];
    if (product?.image) {
        previousImages.unshift(product.image)
    }

    return {
        title: `${product?.name ?? prev.title} - Shop at eZbuy`,
        description: product?.description ?? prev.description,
        openGraph: {
            images: previousImages,
        },
    }
}

export default async function ProductById({ params }: PageProps) {
    const d = await getData(params.id);
    const data = d?.product;
    const session = await getServerSession();

    return data && (
        <main className="md:p-4 lg:p-8 h-svh">
            <Card>
                <CardHeader>
                    <CardTitle>{data.name}</CardTitle>
                    <CardDescription>{data.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="aspect-square p-2 relative group border rounded-lg shadow-md">
                            <Image
                                alt={data.name ?? "Product Image"}
                                className="w-full h-full object-contain aspect-square rounded-lg"
                                height={400}
                                src={data.image ?? "/placeholder.svg"}
                                width={400}
                            />
                        </div>
                        <div className="gap-y-4 flex flex-col">
                            <div className="text-3xl font-bold">{formatToINR(data.price)}</div>
                            <div className="px-2 py-1 w-fit border rounded-md text-muted-foreground">{data.category}</div>
                            <div className="w-fit">
                                {
                                    session &&
                                    <AddToCartButton text="Add to Cart" product={data} />
                                }
                            </div>
                            <div className="flex flex-col mt-auto text-sm">
                                <span className="block font-semibold">Sold By:</span>
                                <span className="block text-muted-foreground">{data.seller.name}</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <div className="w-full">
                        <div className="ml-auto w-fit">
                            <Link href="/shop">
                                <Button variant="outline">Back to shop</Button>
                            </Link>
                        </div>
                        <br />
                        <h5 className="text-lg font-semibold border-b">More from {data.category}</h5>
                        <br />
                        <div className="gap-5 grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
                            {
                                d.recs.map((r) => <div className="border rounded-md shadow-md" key={r.id}>
                                    <div className="aspect-square p-2 relative group rounded-lg">
                                        <Image
                                            alt={r.name}
                                            className="w-full h-full object-contain aspect-square rounded-lg"
                                            height={200}
                                            src={r.image ?? "/placeholder.svg"}
                                            width={200}
                                        />
                                    </div>
                                    <div className="px-2 pb-2">
                                        <Link href={`/shop/${r.id}-${r.name.toLowerCase().replace(/\s+/g, "-")}`}>{r.name}</Link>
                                    </div>
                                </div>)
                            }
                        </div>
                    </div>
                </CardFooter>
            </Card>
            <br />
        </main>
    )
}
