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

export interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'manager' | 'user' | 'guest';
    status: 'active' | 'inactive' | 'pending';
    avatar?: string;
    createdAt: string;
    lastActive: string;
}

export interface Order {
    id: string;
    customer: string;
    email: string;
    product: string;
    amount: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    date: string;
}

export interface Report {
    id: string;
    name: string;
    type: 'revenue' | 'users' | 'orders' | 'performance';
    dateRange: string;
    generatedAt: string;
    size: string;
}

export interface SettingsCategory {
    id: string;
    label: string;
    icon: string;
}

export interface NotificationSettings {
    email: boolean;
    push: boolean;
    sms: boolean;
    orderUpdates: boolean;
    marketingEmails: boolean;
    securityAlerts: boolean;
}

export interface AnalyticsMetrics {
    pageViews: number;
    uniqueVisitors: number;
    bounceRate: number;
    avgSessionDuration: number;
    conversionRate: number;
    revenue: number;
}
