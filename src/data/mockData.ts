import {
    DashboardStats,
    ChartData,
    UserDistribution,
    TrafficSource,
} from '@/types';

export const mockStats: DashboardStats = {
    totalRevenue: 54230,
    totalUsers: 1245,
    orders: 342,
    conversionRate: 4.3,
};

export const mockChartData: ChartData[] = [
    { month: 'Jan', revenue: 4500, orders: 28, users: 95 },
    { month: 'Feb', revenue: 5200, orders: 32, users: 102 },
    { month: 'Mar', revenue: 4800, orders: 29, users: 98 },
    { month: 'Apr', revenue: 6100, orders: 35, users: 112 },
    { month: 'May', revenue: 5500, orders: 31, users: 105 },
    { month: 'Jun', revenue: 6700, orders: 38, users: 118 },
    { month: 'Jul', revenue: 7200, orders: 42, users: 125 },
    { month: 'Aug', revenue: 6900, orders: 40, users: 122 },
    { month: 'Sep', revenue: 7500, orders: 44, users: 128 },
    { month: 'Oct', revenue: 8200, orders: 48, users: 135 },
    { month: 'Nov', revenue: 7800, orders: 46, users: 132 },
    { month: 'Dec', revenue: 8500, orders: 50, users: 140 },
];

export const mockUserDistribution: UserDistribution[] = [
    { name: 'Free Users', value: 65, color: '#3b82f6' },
    { name: 'Premium Users', value: 25, color: '#10b981' },
    { name: 'Enterprise Users', value: 10, color: '#f59e0b' },
];

export const mockTrafficSources: TrafficSource[] = [
    { name: 'Organic', value: 45, color: '#3b82f6' },
    { name: 'Paid', value: 25, color: '#10b981' },
    { name: 'Social', value: 20, color: '#f59e0b' },
    { name: 'Referral', value: 10, color: '#ef4444' },
];

export const dateRangeOptions = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '12m', label: 'Last 12 months' },
];

export const userTypeOptions = [
    { value: 'all', label: 'All Users' },
    { value: 'free', label: 'Free Users' },
    { value: 'premium', label: 'Premium Users' },
    { value: 'enterprise', label: 'Enterprise Users' },
];
