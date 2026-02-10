'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import KPICard from '@/components/ui/KPIGrid';
import FilterSection from '@/components/ui/FilterSection';
import RevenueChart from '@/components/charts/RevenueChart';
import OrdersChart from '@/components/charts/OrdersChart';
import UserDistributionChart from '@/components/charts/UserDistributionChart';
import TrafficSourceChart from '@/components/charts/TrafficSourceChart';
import { useDashboardStore } from '@/store/dashboardStore';
import { dashboardAPI } from '@/lib/api';
import {
    DashboardStats,
    RevenueData,
    OrderData,
    UserDistribution,
    TrafficSource,
} from '@/types';

export default function DashboardPage() {
    const {
        filters,
        sidebarCollapsed,
        toggleSidebar,
        setFilters,
        setLoading,
        setError,
    } = useDashboardStore();

    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
    const [ordersData, setOrdersData] = useState<OrderData[]>([]);
    const [usersData, setUsersData] = useState<UserDistribution[]>([]);
    const [trafficData, setTrafficData] = useState<TrafficSource[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchDashboardData = useCallback(async () => {
        try {
            setIsLoading(true);
            setLoading(true);
            setError(null);

            const [statsRes, revenueRes, ordersRes, usersRes, trafficRes] =
                await Promise.all([
                    dashboardAPI.getStats(filters),
                    dashboardAPI.getRevenue(filters),
                    dashboardAPI.getOrders(filters),
                    dashboardAPI.getUsers(filters),
                    dashboardAPI.getTraffic(filters),
                ]);

            setStats(statsRes);
            setRevenueData(revenueRes);
            setOrdersData(ordersRes);
            setUsersData(usersRes);
            setTrafficData(trafficRes);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            setError('Failed to load dashboard data. Please try again.');
        } finally {
            setIsLoading(false);
            setLoading(false);
        }
    }, [filters, setLoading, setError]);

    useEffect(() => {
        fetchDashboardData();
    }, [fetchDashboardData]);

    return (
        <div className="mx-auto space-y-6">
            {/* Page Header */}
            <div className="animate-fade-in">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                    Dashboard Overview
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Welcome back! Here&apos;s what&apos;s happening with your
                    business today.
                </p>
            </div>

            {/* Filters */}
            <FilterSection filters={filters} onFilterChange={setFilters} />

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                <KPICard
                    title="Total Revenue"
                    value={
                        stats ? `$${stats.totalRevenue.toLocaleString()}` : '$0'
                    }
                    change={stats?.revenueChange ?? 0}
                    trend={stats && stats.revenueChange >= 0 ? 'up' : 'down'}
                    icon="revenue"
                    loading={isLoading}
                />
                <KPICard
                    title="Total Users"
                    value={stats ? stats.totalUsers.toLocaleString() : '0'}
                    change={stats?.usersChange ?? 0}
                    trend={stats && stats.usersChange >= 0 ? 'up' : 'down'}
                    icon="users"
                    loading={isLoading}
                />
                <KPICard
                    title="Orders"
                    value={stats ? stats.totalOrders.toLocaleString() : '0'}
                    change={stats?.ordersChange ?? 0}
                    trend={stats && stats.ordersChange >= 0 ? 'up' : 'down'}
                    icon="orders"
                    loading={isLoading}
                />
                <KPICard
                    title="Conversion Rate"
                    value={stats ? `${stats.conversionRate}%` : '0%'}
                    change={stats?.conversionChange ?? 0}
                    trend={stats && stats.conversionChange >= 0 ? 'up' : 'down'}
                    icon="conversion"
                    loading={isLoading}
                />
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RevenueChart data={revenueData} loading={isLoading} />
                <OrdersChart data={ordersData} loading={isLoading} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <UserDistributionChart data={usersData} loading={isLoading} />
                <TrafficSourceChart data={trafficData} loading={isLoading} />
            </div>
        </div>
    );
}
