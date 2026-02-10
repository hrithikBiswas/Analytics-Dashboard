import axios from 'axios';
import {
    DashboardStats,
    RevenueData,
    OrderData,
    UserDistribution,
    TrafficSource,
    FilterState,
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
};
