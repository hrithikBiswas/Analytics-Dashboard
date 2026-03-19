import axios from 'axios';
import {
    DashboardStats,
    RevenueData,
    OrderData,
    UserDistribution,
    TrafficSource,
    FilterState,
    AnalyticsMetrics,
    User,
    Order,
    Report,
} from '@/types';

const API_BASE_URL = '/api';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const dashboardAPI = {
    getStats: async (filters: FilterState): Promise<DashboardStats> => {
        await delay(500);
        const response = await axios.get(`${API_BASE_URL}/stats`, {
            params: filters,
        });
        return response.data;
    },

    getRevenue: async (filters: FilterState): Promise<RevenueData[]> => {
        await delay(600);
        const response = await axios.get(`${API_BASE_URL}/revenue`, {
            params: filters,
        });
        return response.data;
    },

    getOrders: async (filters: FilterState): Promise<OrderData[]> => {
        await delay(550);
        const response = await axios.get(`${API_BASE_URL}/orders`, {
            params: filters,
        });
        return response.data;
    },

    getUsers: async (filters: FilterState): Promise<UserDistribution[]> => {
        await delay(500);
        const response = await axios.get(`${API_BASE_URL}/users`, {
            params: filters,
        });
        return response.data;
    },

    getTraffic: async (filters: FilterState): Promise<TrafficSource[]> => {
        await delay(520);
        const response = await axios.get(`${API_BASE_URL}/traffic`, {
            params: filters,
        });
        return response.data;
    },

    getAnalyticsMetrics: async (
        filters: FilterState,
    ): Promise<AnalyticsMetrics> => {
        await delay(500);
        const response = await axios.get(`${API_BASE_URL}/analytics`, {
            params: { ...filters, type: 'metrics' },
        });
        return response.data;
    },

    getAnalyticsConversion: async (filters: FilterState) => {
        await delay(550);
        const response = await axios.get(`${API_BASE_URL}/analytics`, {
            params: { ...filters, type: 'conversion' },
        });
        return response.data;
    },

    getAnalyticsEngagement: async (filters: FilterState) => {
        await delay(600);
        const response = await axios.get(`${API_BASE_URL}/analytics`, {
            params: { ...filters, type: 'engagement' },
        });
        return response.data;
    },
};

export const usersAPI = {
    getUsers: async (): Promise<User[]> => {
        await delay(500);
        const response = await axios.get(`${API_BASE_URL}/users-list`);
        return response.data;
    },

    createUser: async (user: Partial<User>): Promise<User> => {
        await delay(500);
        const response = await axios.post(`${API_BASE_URL}/users-list`, user);
        return response.data;
    },

    updateUser: async (id: string, user: Partial<User>): Promise<User> => {
        await delay(500);
        const response = await axios.put(`${API_BASE_URL}/users-list/${id}`, user);
        return response.data;
    },

    deleteUser: async (id: string): Promise<void> => {
        await delay(300);
        await axios.delete(`${API_BASE_URL}/users-list/${id}`);
    },
};

export const ordersAPI = {
    getOrders: async (): Promise<Order[]> => {
        await delay(500);
        const response = await axios.get(`${API_BASE_URL}/orders-list`);
        return response.data;
    },

    updateOrderStatus: async (
        id: string,
        status: Order['status'],
    ): Promise<Order> => {
        await delay(400);
        const response = await axios.patch(`${API_BASE_URL}/orders-list/${id}`, {
            status,
        });
        return response.data;
    },
};

export const reportsAPI = {
    getReports: async (): Promise<Report[]> => {
        await delay(500);
        const response = await axios.get(`${API_BASE_URL}/reports-list`);
        return response.data;
    },

    generateReport: async (
        type: Report['type'],
        dateRange: string,
    ): Promise<Report> => {
        await delay(800);
        const response = await axios.post(`${API_BASE_URL}/reports-list`, {
            type,
            dateRange,
        });
        return response.data;
    },
};
