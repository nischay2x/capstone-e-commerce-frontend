"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createProduct } from "../actions";
import { FormEvent, useEffect, useRef, useState } from "react";
import SubmitButton from "@/components/SubmitButton";
import { useToast } from "@/components/ui/use-toast";
import { UploadIcon } from "lucide-react";
import Image from "next/image";
import { createFormDataFromObject } from "@/lib/utils";

import { formSchema, productCategories, type FormValues } from "../config";
import Link from "next/link";


export default function AddProduct() {

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            price: "",
            category: "",
            image: ""
        },
    });
    const { toast } = useToast();
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [file, setFile] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string>("/placeholder.svg");

    function handleFileChange(e: FormEvent<HTMLInputElement>) {
        let file = e.currentTarget?.files ? e.currentTarget.files[0] : null;

        if (file) {
            setPreviewImage(URL.createObjectURL(file));
            if (file.size > 1024 * 1024) {
                form.setError("image", { message: "Maximum file size allwoed is 1 MB" });
                return;
            }
            setFile(file);
        }
    }

    function onRemoveImage() {
        setFile(null);
        setPreviewImage("/placeholder.svg");
    }

    async function onSubmit(values: FormValues) {
        if (!file) {
            form.setError("image", { message: "A product image is required!" });
            return;
        }
        if (file.size > 1024 * 1024) {
            form.setError("image", { message: "Maximum file size allwoed is 1 MB" });
            return;
        }
        const fd = createFormDataFromObject({ ...values, image: file });
        const formState = await createProduct(fd);
        if (formState.message) {
            toast({
                variant: formState.error ? "destructive" : "default",
                description: formState.message,
                title: formState.error ? "Failure" : "Success",
            });
            if (!formState.error) { form.reset(); setFile(null); setPreviewImage("/placeholder.svg") }
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Add New Product</CardTitle>
                <CardDescription>Fill out the form to add a new product.</CardDescription>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardContent>

                        <div className="flex flex-wrap gap-y-4 justify-between">
                            <div className="w-full lg:w-1/2 space-y-4 px-2">

                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Product Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="price"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Price</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="category"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Category</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a product category" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {
                                                        productCategories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)
                                                    }
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />



                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="A maximum of 200 words" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="w-full lg:w-1/2 px-2 space-y-4">
                                <FormField
                                    control={form.control}
                                    name="image"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Product Image</FormLabel>
                                            <FormControl>
                                                <>
                                                    <Input type="file" {...field} className="hidden" onChange={handleFileChange} accept="image/*" ref={fileInputRef} />
                                                    <div className="relative group rounded-md border md:w-[200px] lg:w-[290px]">
                                                        <Image
                                                            alt="Product Image"
                                                            className="rounded-lg object-contain w-full aspect-square group-hover:opacity-50 transition-opacity"
                                                            height="200"
                                                            src={previewImage}
                                                            width="200"
                                                        />
                                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <Button size="sm" type="button" onClick={() => fileInputRef?.current?.click()} variant="outline">
                                                                <UploadIcon />
                                                                Upload
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button type="button" variant="outline" onClick={onRemoveImage}>Remove</Button>

                            </div>
                        </div>

                    </CardContent>
                    <CardFooter>
                        <div className="flex justify-between gap-2 items-center px-2">
                            <SubmitButton text="Create" size="sm" />
                            <Link href="/seller/products">
                                <Button variant="outline" size="sm">Cancel</Button>
                            </Link>
                        </div>
                    </CardFooter>
                </form>
            </Form>
        </Card>

    )
}
