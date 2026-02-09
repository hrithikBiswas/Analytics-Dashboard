import { useEffect, useState } from 'react';
import { useDashboardStore } from '@/store/dashboardStore';

export const useDashboardData = () => {
    const {
        stats,
        chartData,
        userDistribution,
        trafficSources,
        loading,
        error,
        refreshData,
        filters,
    } = useDashboardStore();

    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleRefresh = async () => {
        setIsRefreshing(true);
        try {
            await refreshData();
        } finally {
            setIsRefreshing(false);
        }
    };

    useEffect(() => {
        if (!stats && !loading && !error) {
            refreshData();
        }
    }, [stats, loading, error, refreshData]);

    return {
        stats,
        chartData,
        userDistribution,
        trafficSources,
        loading,
        error,
        isRefreshing,
        refreshData: handleRefresh,
        filters,
    };
};
