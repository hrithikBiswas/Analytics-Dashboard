'use client';

import React, { memo } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from 'recharts';
import { RevenueData } from '@/types';
import ChartSkeleton from '@/components/skeleton/ChartSkeleton';

interface RevenueChartProps {
    data: RevenueData[];
    loading?: boolean;
}

const RevenueChart: React.FC<RevenueChartProps> = memo(
    ({ data, loading = false }) => {
        if (loading) return <ChartSkeleton />;

        return (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-300 animate-fade-in">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                    Revenue Over Time
                </h3>
                <ResponsiveContainer width="100%" height={320}>
                    <LineChart
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
                            tickFormatter={(value) =>
                                `$${(value / 1000).toFixed(0)}k`
                            }
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#f9fafb',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                color: '#fff',
                            }}
                            formatter={(value: number | undefined) => [
                                `$${(value ?? 0).toLocaleString()}`,
                                'Revenue',
                            ]}
                            labelStyle={{ color: '#9ca3af' }}
                        />
                        <Legend
                            wrapperStyle={{ paddingTop: '20px' }}
                            iconType="circle"
                        />
                        <Line
                            type="monotone"
                            dataKey="revenue"
                            stroke="#3b82f6"
                            strokeWidth={3}
                            dot={{ fill: '#3b82f6', r: 5 }}
                            activeDot={{ r: 7 }}
                            name="Revenue"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        );
    },
);

RevenueChart.displayName = 'RevenueChart';

export default RevenueChart;
