export interface KPIData {
    id: string;
    title: string;
    value: string | number;
    change: number;
    trend: 'up' | 'down';
    icon: string;
}

export interface RevenueData {
    month: string;
    revenue: number;
    orders: number;
}

export interface OrderData {
    month: string;
    orders: number;
}

export interface UserDistribution {
    name: string;
    value: number;
    color: string;
}

export interface TrafficSource {
    source: string;
    value: number;
    color: string;
}

export interface DashboardStats {
    totalRevenue: number;
    totalUsers: number;
    totalOrders: number;
    conversionRate: number;
    revenueChange: number;
    usersChange: number;
    ordersChange: number;
    conversionChange: number;
}

export interface FilterState {
    dateRange: '7days' | '30days' | '12months';
    userType: 'all' | 'free' | 'premium' | 'enterprise';
}

export type DateRangeOption = {
    label: string;
    value: FilterState['dateRange'];
};

export type UserTypeOption = {
    label: string;
    value: FilterState['userType'];
};
