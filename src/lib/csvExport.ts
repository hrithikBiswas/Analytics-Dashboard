import {
    DashboardStats,
    ChartData,
    UserDistribution,
    TrafficSource,
} from '@/types';

export const exportToCSV = (
    data: Record<string, unknown>[],
    filename: string,
) => {
    if (data.length === 0) return;

    const headers = Object.keys(data[0]);
    const csvContent = [
        headers.join(','),
        ...data.map((row) =>
            headers
                .map((header) => {
                    const value = row[header];
                    // Handle values that might contain commas or quotes
                    if (
                        typeof value === 'string' &&
                        (value.includes(',') || value.includes('"'))
                    ) {
                        return `"${value.replace(/"/g, '""')}"`;
                    }
                    return value;
                })
                .join(','),
        ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export const exportDashboardData = (
    stats: DashboardStats,
    chartData: ChartData[],
    userDistribution: UserDistribution[],
    trafficSources: TrafficSource[],
) => {
    // Export main stats
    const statsData = [
        {
            metric: 'Total Revenue',
            value: stats.totalRevenue,
            change: '+12.5%',
        },
        {
            metric: 'Total Users',
            value: stats.totalUsers,
            change: '+8.2%',
        },
        {
            metric: 'Orders',
            value: stats.orders,
            change: '-3.1%',
        },
        {
            metric: 'Conversion Rate',
            value: `${stats.conversionRate}%`,
            change: '+2.4%',
        },
    ];

    exportToCSV(statsData, 'dashboard-stats');

    // Export chart data
    exportToCSV(
        chartData as unknown as Record<string, unknown>[],
        'revenue-orders-data',
    );

    // Export user distribution
    exportToCSV(
        userDistribution as unknown as Record<string, unknown>[],
        'user-distribution',
    );

    // Export traffic sources
    exportToCSV(
        trafficSources as unknown as Record<string, unknown>[],
        'traffic-sources',
    );
};
