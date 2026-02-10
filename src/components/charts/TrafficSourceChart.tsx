// src/components/charts/TrafficSourceChart.tsx
'use client';

import React, { memo } from 'react';
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend,
} from 'recharts';
import { TrafficSource } from '@/types';
import ChartSkeleton from '@/components/skeleton/ChartSkeleton';

interface TrafficSourceChartProps {
    data: TrafficSource[];
    loading?: boolean;
}

const TrafficSourceChart: React.FC<TrafficSourceChartProps> = memo(
    ({ data, loading = false }) => {
        if (loading) return <ChartSkeleton />;

        return (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-300 animate-fade-in">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                    Traffic Sources
                </h3>
                <ResponsiveContainer width="100%" height={320}>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                            animationDuration={800}
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry.color}
                                />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(17, 24, 39, 0.95)',
                                border: '1px solid #374151',
                                borderRadius: '8px',
                                color: '#fff',
                            }}
                            formatter={(value: number | undefined) => [
                                `${value ?? 0}%`,
                                'Traffic',
                            ]}
                            labelStyle={{ color: '#9ca3af' }}
                        />
                        <Legend
                            verticalAlign="bottom"
                            height={36}
                            iconType="circle"
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        );
    },
);

TrafficSourceChart.displayName = 'TrafficSourceChart';

export default TrafficSourceChart;
