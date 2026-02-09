'use client';

// import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { KPIGrid } from '@/components/ui/KPIGrid';
import { FilterSection } from '@/components/ui/FilterSection';
import { RevenueChart } from '@/components/charts/RevenueChart';
import { OrdersChart } from '@/components/charts/OrdersChart';
import { UserDistributionChart } from '@/components/charts/UserDistributionChart';
import { TrafficSourceChart } from '@/components/charts/TrafficSourceChart';
import { useDashboardData } from '@/hooks/useDashboardData';
import DashboardSkeleton from '@/components/skeleton/DashboardSkeleton';

export default function Home() {
    const {
        stats,
        chartData,
        userDistribution,
        trafficSources,
        loading,
        error,
        isRefreshing,
        refreshData,
    } = useDashboardData();

    if (loading && !stats) {
        return (
            // <DashboardLayout>
            <DashboardSkeleton />
            // </DashboardLayout>
        );
    }

    if (error) {
        return (
            // <DashboardLayout>
            <div className="flex items-center justify-center min-h-96">
                <div className="text-center max-w-md">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Unable to load dashboard data
                    </h3>
                    <p className="text-gray-500 mb-6">{error}</p>
                    <button
                        onClick={refreshData}
                        disabled={isRefreshing}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isRefreshing ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Refreshing...
                            </>
                        ) : (
                            'Try Again'
                        )}
                    </button>
                </div>
            </div>
            // </DashboardLayout>
        );
    }

    if (!stats) {
        return null;
    }

    return (
        // <DashboardLayout>
        <div className="space-y-4 sm:space-y-6">
            {/* Page Header with Refresh */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                        Analytics Dashboard
                    </h1>
                    <p className="text-gray-500 mt-1 text-sm sm:text-base dark:text-gray-400">
                        Monitor your business metrics and performance
                    </p>
                </div>
                <button
                    onClick={refreshData}
                    disabled={isRefreshing}
                    className="inline-flex cursor-pointer items-center px-3 py-2 bg-white dark:bg-gray-800 dark:text-white border border-gray-300 dark:border-gray-700 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isRefreshing ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-700 mr-2"></div>
                            Refreshing...
                        </>
                    ) : (
                        'Refresh'
                    )}
                </button>
            </div>

            {/* Filters */}
            <FilterSection />

            {/* KPI Cards */}
            <KPIGrid stats={stats} />

            {/* Charts Grid - Responsive Design */}
            <div className="space-y-4 sm:space-y-6">
                {/* Revenue Chart - Full Width on all devices */}
                <RevenueChart data={chartData} />

                {/* Charts Row - Stacked on mobile, side-by-side on desktop */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
                    {/* Orders Chart */}
                    <OrdersChart data={chartData} />

                    {/* User Distribution Chart */}
                    <UserDistributionChart data={userDistribution} />
                </div>

                {/* Traffic Sources Chart - Optional Advanced Feature */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
                    <TrafficSourceChart data={trafficSources} />
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex items-center justify-center min-h-[300px]">
                        <div className="text-center">
                            <div className="text-blue-500 text-4xl mb-3">
                                📊
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                More Insights
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">
                                Advanced analytics features coming soon
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        // </DashboardLayout>
    );
}
