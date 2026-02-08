export interface KPIData {
  title: string;
  value: string;
  change: number;
  changeType: 'increase' | 'decrease';
}

export interface ChartData {
  month: string;
  revenue: number;
  orders: number;
  users: number;
}

export interface UserDistribution {
  name: string;
  value: number;
  color: string;
}

export interface TrafficSource {
  name: string;
  value: number;
  color: string;
}

export interface DashboardStats {
  totalRevenue: number;
  totalUsers: number;
  orders: number;
  conversionRate: number;
}

export interface FilterState {
  dateRange: '7d' | '30d' | '12m';
  userType: 'all' | 'free' | 'premium' | 'enterprise';
}

export interface ApiResponse<T> {
  data: T;
  loading: boolean;
  error: string | null;
}