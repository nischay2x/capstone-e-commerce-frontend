"use client";

import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale, ChartOptions } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { LineChart } from 'lucide-react';
import { format } from 'date-fns';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale);

interface OrderTrend {
    "count": number,
    "date":string;
}

interface DashboardData {
    orders: OrderTrend[];
}

export default function OrderTrendsChart({ orders }: DashboardData) {


    const data = {
        labels: orders.map(order => new Date(order.date)),
        datasets: [
            {
                label: 'Order count',
                data: orders.map(order => order.count),
                borderColor: 'rgba(200, 102, 192, 1)',
                borderWidth: 2,
                fill: false,
            },
        ],
    };

    const options: ChartOptions<"line"> = {
        scales: {
            x: {
                type: 'time' as const,
                time: {
                    unit: 'day' as const,
                },
            },
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1
                }
            },
        },
        plugins: {
            tooltip: {
                callbacks: {
                    title: tooltipItems => {
                        return format(new Date(tooltipItems[0].parsed.x), 'dd-MM-yyyy'); // Format date to 'yyyy-MM-dd'
                    },
                    label: tooltipItem => {
                        return `Orders: ${tooltipItem.parsed.y}`;
                    }
                }
            }
        }
    };

    return (
        <div>
            <div className="text-lg flex justify-between">
                <h3 className="text-muted-foreground">Orders Trends (Last 30 days)</h3> <LineChart />
            </div>
            <br />
            <Line data={data} options={options} />
        </div>
    );
};

