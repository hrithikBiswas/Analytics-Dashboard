'use client';

import React, { memo } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
    Cell,
} from 'recharts';
import { OrderData } from '@/types';

interface OrdersChartProps {
    data: OrderData[];
    loading?: boolean;
}

const COLORS = [
    '#3b82f6',
    '#8b5cf6',
    '#ec4899',
    '#f59e0b',
    '#10b981',
    '#6366f1',
];

const OrdersChart: React.FC<OrdersChartProps> = memo(
    ({ data, loading = false }) => {
        if (loading) {
            return (
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 animate-pulse">
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-6"></div>
                    <div className="h-80 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
            );
        }

        return (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 animate-fade-in">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                    Orders Per Month
                </h3>
                <ResponsiveContainer width="100%" height={320}>
                    <BarChart
                        data={data}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#374151"
                            opacity={0.2}
                        />
                        <XAxis
                            dataKey="month"
                            stroke="#6b7280"
                            tick={{ fill: '#6b7280' }}
                            tickLine={{ stroke: '#6b7280' }}
                        />
                        <YAxis
                            stroke="#6b7280"
                            tick={{ fill: '#6b7280' }}
                            tickLine={{ stroke: '#6b7280' }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(17, 24, 39, 0.95)',
                                border: '1px solid #374151',
                                borderRadius: '8px',
                                color: '#fff',
                            }}
                            formatter={(value: number | undefined) => [
                                value ?? 0,
                                'Orders',
                            ]}
                            labelStyle={{ color: '#9ca3af' }}
                            cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
                        />
                        <Legend
                            wrapperStyle={{ paddingTop: '20px' }}
                            iconType="circle"
                        />
                        <Bar
                            dataKey="orders"
                            name="Orders"
                            radius={[8, 8, 0, 0]}
                            animationDuration={800}
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        );
    },
);

OrdersChart.displayName = 'OrdersChart';

export default OrdersChart;
