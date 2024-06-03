
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Metadata } from "next"
import ContactForm from "./ContactForm"

export const metadata: Metadata = {
    title: "eZbuy Shopping | Contact Support",
    description: "Have a question or need help? Fill out the form and our support team will get back to you as soon as possible."
}

export default function Support() {
    return (
            <main className="md:p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Contact Support</CardTitle>
                        <CardDescription>
                            Have a question or need help? Fill out the form and our support team will get back to you as soon as
                            possible.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 grid md:grid-cols-2 gap-12 px-4 md:px-6 py-12 md:py-20">
                        <div className="space-y-6">
                            <ContactForm/>
                        </div>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
                                <p className="text-gray-500 dark:text-gray-400">Check out our most common questions and answers.</p>
                            </div>
                            <Accordion type="single" collapsible>
                                <AccordionItem value="order">
                                    <AccordionTrigger className="text-base font-medium">How do I place an order?</AccordionTrigger>
                                    <AccordionContent>
                                        <p className="text-gray-500 dark:text-gray-400">
                                            To place an order, simply browse our selection of products, add the items you want to your cart, and
                                            proceed to checkout. You&apos;ll be guided through the process of providing your shipping and payment
                                            information.
                                        </p>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="returns">
                                    <AccordionTrigger className="text-base font-medium">What is your return policy?</AccordionTrigger>
                                    <AccordionContent>
                                        <p className="text-gray-500 dark:text-gray-400">
                                            We offer a 30-day return policy on all of our products. If you&apos;re not satisfied with your purchase,
                                            you can return the item for a full refund. Please refer to our Returns page for more details on the
                                            process.
                                        </p>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="shipping">
                                    <AccordionTrigger className="text-base font-medium">How long does shipping take?</AccordionTrigger>
                                    <AccordionContent>
                                        <p className="text-gray-500 dark:text-gray-400">
                                            Shipping times can vary depending on your location and the shipping method you choose. We offer
                                            standard and expedited shipping options. Most orders within the continental US arrive within 5-7
                                            business days for standard shipping.
                                        </p>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="payment">
                                    <AccordionTrigger className="text-base font-medium">What payment methods do you accept?</AccordionTrigger>
                                    <AccordionContent>
                                        <p className="text-gray-500 dark:text-gray-400">
                                            We accept all major credit cards, including Visa, Mastercard, American Express, and Discover. We also
                                            accept PayPal and Apple Pay for a convenient checkout experience.
                                        </p>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </CardContent>
                </Card>
            </main>
    )
}

