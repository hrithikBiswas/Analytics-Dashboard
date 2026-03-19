'use client';

import React, { memo } from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import ChartSkeleton from '@/components/skeleton/ChartSkeleton';

interface EngagementData {
    day: string;
    views: number;
    sessions: number;
}

interface EngagementChartProps {
    data: EngagementData[];
    loading?: boolean;
}

const EngagementChart: React.FC<EngagementChartProps> = memo(
    ({ data, loading = false }) => {
        if (loading) return <ChartSkeleton />;

        return (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-300 animate-fade-in">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                    Engagement Overview
                </h3>
                <ResponsiveContainer width="100%" height={320}>
                    <AreaChart
                        data={data}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient
                                id="colorViews"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="#3b82f6"
                                    stopOpacity={0.3}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="#3b82f6"
                                    stopOpacity={0}
                                />
                            </linearGradient>
                            <linearGradient
                                id="colorSessions"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="#8b5cf6"
                                    stopOpacity={0.3}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="#8b5cf6"
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#374151"
                            opacity={0.2}
                        />
                        <XAxis
                            dataKey="day"
                            stroke="#6b7280"
                            tick={{ fill: '#6b7280' }}
                            tickLine={{ stroke: '#6b7280' }}
                        />
                        <YAxis
                            stroke="#6b7280"
                            tick={{ fill: '#6b7280' }}
                            tickLine={{ stroke: '#6b7280' }}
                            tickFormatter={(value) =>
                                value >= 1000
                                    ? `${(value / 1000).toFixed(0)}k`
                                    : value
                            }
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#f9fafb',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                color: '#374151',
                            }}
                            formatter={(value: number | undefined, name: string | undefined) => [
                                (value ?? 0).toLocaleString(),
                                name === 'views' ? 'Page Views' : 'Sessions',
                            ]}
                            labelStyle={{ color: '#9ca3af' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="views"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorViews)"
                            name="views"
                        />
                        <Area
                            type="monotone"
                            dataKey="sessions"
                            stroke="#8b5cf6"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorSessions)"
                            name="sessions"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        );
    },
);

EngagementChart.displayName = 'EngagementChart';

export default EngagementChart;
