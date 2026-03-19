'use client';

import React, { useState, useEffect, useCallback } from 'react';
import FilterSection from '@/components/ui/FilterSection';
import MetricCard from '@/components/ui/MetricCard';
import EngagementChart from '@/components/charts/EngagementChart';
import ConversionChart from '@/components/charts/ConversionChart';
import RevenueChart from '@/components/charts/RevenueChart';
import { useDashboardStore } from '@/store/dashboardStore';
import { dashboardAPI } from '@/lib/api';
import { AnalyticsMetrics } from '@/types';
import { formatNumber, formatCurrency } from '@/lib/utils';

interface EngagementData {
    day: string;
    views: number;
    sessions: number;
}

interface ConversionData {
    stage: string;
    value: number;
    fill: string;
}

interface RevenueData {
    month: string;
    revenue: number;
    orders: number;
}

export default function AnalyticsPage() {
    const { filters, setFilters } = useDashboardStore();

    const [metrics, setMetrics] = useState<AnalyticsMetrics | null>(null);
    const [engagementData, setEngagementData] = useState<EngagementData[]>([]);
    const [conversionData, setConversionData] = useState<ConversionData[]>([]);
    const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchAnalyticsData = useCallback(async () => {
        try {
            setIsLoading(true);
            const [metricsRes, conversionRes, engagementRes, revenueRes] =
                await Promise.all([
                    dashboardAPI.getAnalyticsMetrics(filters),
                    dashboardAPI.getAnalyticsConversion(filters),
                    dashboardAPI.getAnalyticsEngagement(filters),
                    dashboardAPI.getRevenue(filters),
                ]);

            setMetrics(metricsRes);
            setConversionData(conversionRes);
            setEngagementData(engagementRes);
            setRevenueData(revenueRes);
        } catch (error) {
            console.error('Error fetching analytics data:', error);
        } finally {
            setIsLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        fetchAnalyticsData();
    }, [fetchAnalyticsData]);

    const formatDuration = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}m ${secs}s`;
    };

    return (
        <div className="mx-auto space-y-6">
            <div className="animate-fade-in">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                    Analytics
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Track your website performance and engagement metrics.
                </p>
            </div>

            <FilterSection filters={filters} onFilterChange={setFilters} />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                <MetricCard
                    title="Page Views"
                    value={metrics ? formatNumber(metrics.pageViews) : '0'}
                    subtitle="Total views"
                    icon="views"
                    loading={isLoading}
                />
                <MetricCard
                    title="Unique Visitors"
                    value={metrics ? formatNumber(metrics.uniqueVisitors) : '0'}
                    subtitle="Individual users"
                    icon="visitors"
                    loading={isLoading}
                />
                <MetricCard
                    title="Bounce Rate"
                    value={metrics ? `${metrics.bounceRate}%` : '0%'}
                    subtitle="Lower is better"
                    icon="bounce"
                    loading={isLoading}
                />
                <MetricCard
                    title="Avg. Session"
                    value={
                        metrics ? formatDuration(metrics.avgSessionDuration) : '0m'
                    }
                    subtitle="Per visit"
                    icon="session"
                    loading={isLoading}
                />
                <MetricCard
                    title="Conversion Rate"
                    value={metrics ? `${metrics.conversionRate}%` : '0%'}
                    subtitle="Visitor to subscriber"
                    icon="conversion"
                    loading={isLoading}
                />
                <MetricCard
                    title="Revenue"
                    value={
                        metrics
                            ? formatCurrency(metrics.revenue)
                            : '$0'
                    }
                    subtitle="Total revenue"
                    icon="revenue"
                    loading={isLoading}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RevenueChart data={revenueData} loading={isLoading} />
                <ConversionChart data={conversionData} loading={isLoading} />
            </div>

            <div className="grid grid-cols-1 gap-6">
                <EngagementChart data={engagementData} loading={isLoading} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-300 animate-fade-in">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Top Pages
                    </h3>
                    <div className="space-y-3">
                        {[
                            { page: '/dashboard', views: 12450 },
                            { page: '/analytics', views: 8920 },
                            { page: '/users', views: 6540 },
                            { page: '/orders', views: 4280 },
                            { page: '/settings', views: 2150 },
                        ].map((item, index) => (
                            <div
                                key={item.page}
                                className="flex items-center justify-between"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-5">
                                        {index + 1}
                                    </span>
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                                        {item.page}
                                    </span>
                                </div>
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {formatNumber(item.views)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-300 animate-fade-in">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Traffic by Device
                    </h3>
                    <div className="space-y-4">
                        {[
                            { device: 'Desktop', percentage: 58, color: 'bg-blue-500' },
                            { device: 'Mobile', percentage: 32, color: 'bg-purple-500' },
                            { device: 'Tablet', percentage: 10, color: 'bg-pink-500' },
                        ].map((item) => (
                            <div key={item.device}>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {item.device}
                                    </span>
                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                        {item.percentage}%
                                    </span>
                                </div>
                                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full ${item.color} rounded-full transition-all duration-500`}
                                        style={{ width: `${item.percentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-300 animate-fade-in">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Geographic Distribution
                    </h3>
                    <div className="space-y-3">
                        {[
                            { country: 'United States', percentage: 45 },
                            { country: 'United Kingdom', percentage: 18 },
                            { country: 'Germany', percentage: 12 },
                            { country: 'Canada', percentage: 8 },
                            { country: 'Others', percentage: 17 },
                        ].map((item) => (
                            <div
                                key={item.country}
                                className="flex items-center justify-between"
                            >
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {item.country}
                                </span>
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {item.percentage}%
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
