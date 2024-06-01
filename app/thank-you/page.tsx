
import Link from "next/link"

export default function ThankYou() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
            <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                <div className="text-center space-y-4">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Thank You for Your Order</h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        We appreciate your business and are excited to fulfill your order. Thank you for choosing us.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link
                            className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow-sm transition-colors hover:bg-gray-900/90 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus:ring-gray-300"
                            href="/shop"
                        >
                            Continue Shopping
                        </Link>
                        <Link
                            className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 shadow-sm transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50 dark:hover:bg-gray-800 dark:focus:ring-gray-300"
                            href="/orders"
                        >
                            See Orders
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    )
}