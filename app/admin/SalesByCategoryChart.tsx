"use client";

import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { LineChart } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale);

interface Sale {
    "_sum":{
        "price": number
    },
    "category": string
}

interface DashboardData {
    sales: Sale[];
}

export default function SalesByCategoryChart({ sales }: DashboardData) {


    const data = {
        labels: sales.map(s => s.category),
        datasets: [
            {
                label: 'Sales',
                data: sales.map(s => s._sum.price),
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false,
            },
        ],
    };

    return (
        <div>
            <div className="text-lg flex justify-between">
                <h3 className="text-muted-foreground">Sales By Category</h3> <LineChart />
            </div>
            <br />
            <Line data={data} />
        </div>
    );
};

