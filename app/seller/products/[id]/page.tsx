import { authFetcher } from "@/lib/fetcher";
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card";
import { ProductById } from "../config";
import EditProductForm from "./EditProductForm";

async function getData(id: string): Promise<ProductById|null> {
    const fetcher = await authFetcher();

    try {
        const { data } = await fetcher.get(`/products/${id}`);
        return data.product;
    } catch (error) {
        return null;
    }

}
export default async function EditProduct({ params }: { params: { id: string } }) {
    const data = await getData(params.id)

    return (
        <Card>
            <CardHeader>
                <CardTitle>Edit Product</CardTitle>
                <CardDescription>Make changes in product details.</CardDescription>
            </CardHeader>
            <CardContent>
                {
                    data ? <EditProductForm data={data} /> :  <span className="text-destructive">Product not found</span>
                }
            </CardContent>
        </Card>
    )
}