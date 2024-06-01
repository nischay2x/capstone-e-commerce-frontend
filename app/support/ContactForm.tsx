"use client";

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast";
import { FormEvent } from "react";

export default function ContactForm() {
    const { toast } = useToast();

    function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        toast({
            title: "Thank you for your message!",
            description: "We will get back to you as soon as possible",
        });
        e.currentTarget.reset()
    }

    return (
        <form className="space-y-4" onSubmit={onSubmit}>
            <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" required placeholder="Enter your name" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" required type="email" placeholder="Enter your email" />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" required placeholder="Enter the subject" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" required placeholder="Enter your message" className="min-h-[150px]" />
            </div>
            <Button type="submit" className="w-full">
                Submit Inquiry
            </Button>
        </form>
    )
}