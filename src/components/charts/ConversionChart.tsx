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
    Cell,
} from 'recharts';
import ChartSkeleton from '@/components/skeleton/ChartSkeleton';

interface ConversionData {
    stage: string;
    value: number;
    fill: string;
}

interface ConversionChartProps {
    data: ConversionData[];
    loading?: boolean;
}

const ConversionChart: React.FC<ConversionChartProps> = memo(
    ({ data, loading = false }) => {
        if (loading) return <ChartSkeleton />;

        return (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-300 animate-fade-in">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                    Conversion Funnel
                </h3>
                <ResponsiveContainer width="100%" height={320}>
                    <BarChart
                        data={data}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#374151"
                            opacity={0.2}
                            horizontal={false}
                        />
                        <XAxis
                            type="number"
                            stroke="#6b7280"
                            tick={{ fill: '#6b7280' }}
                            tickLine={{ stroke: '#6b7280' }}
                            tickFormatter={(value) =>
                                value >= 1000
                                    ? `${(value / 1000).toFixed(0)}k`
                                    : value
                            }
                        />
                        <YAxis
                            type="category"
                            dataKey="stage"
                            stroke="#6b7280"
                            tick={{ fill: '#6b7280' }}
                            tickLine={{ stroke: '#6b7280' }}
                            width={80}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#f9fafb',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                color: '#374151',
                            }}
                            formatter={(value: number | undefined) => [
                                (value ?? 0).toLocaleString(),
                                'Users',
                            ]}
                            labelStyle={{ color: '#9ca3af' }}
                            cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
                        />
                        <Bar
                            dataKey="value"
                            name="Users"
                            radius={[0, 8, 8, 0]}
                            animationDuration={800}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        );
    },
);

ConversionChart.displayName = 'ConversionChart';

export default ConversionChart;
