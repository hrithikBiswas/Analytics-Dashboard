// src/components/charts/UserDistributionChart.tsx
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
import { UserDistribution } from '@/types';

interface UserDistributionChartProps {
    data: UserDistribution[];
    loading?: boolean;
}

interface CustomLabelProps {
    cx?: number;
    cy?: number;
    midAngle?: number;
    innerRadius?: number;
    outerRadius?: number;
    percent?: number;
}

const UserDistributionChart: React.FC<UserDistributionChartProps> = memo(
    ({ data, loading = false }) => {
        if (loading) {
            return (
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 animate-pulse">
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-6"></div>
                    <div className="h-80 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
            );
        }

        const renderCustomLabel = ({
            cx = 0,
            cy = 0,
            midAngle = 0,
            innerRadius = 0,
            outerRadius = 0,
            percent = 0,
        }: CustomLabelProps) => {
            const RADIAN = Math.PI / 180;
            const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);

            return (
                <text
                    x={x}
                    y={y}
                    fill="white"
                    textAnchor={x > cx ? 'start' : 'end'}
                    dominantBaseline="central"
                    className="text-sm font-semibold"
                >
                    {`${(percent * 100).toFixed(0)}%`}
                </text>
            );
        };

        return (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 animate-fade-in">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                    User Distribution
                </h3>
                <ResponsiveContainer width="100%" height={320}>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomLabel}
                            outerRadius={100}
                            fill="#8884d8"
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
                                value?.toLocaleString() ?? '0',
                                'Users',
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

UserDistributionChart.displayName = 'UserDistributionChart';

export default UserDistributionChart;
