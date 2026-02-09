import { create } from 'zustand';
import {
    FilterState,
    DashboardStats,
    ChartData,
    UserDistribution,
    TrafficSource,
} from '@/types';
import {
    mockStats,
    mockChartData,
    mockUserDistribution,
    mockTrafficSources,
} from '@/data/mockData';

interface DashboardStore {
    // State
    stats: DashboardStats | null;
    chartData: ChartData[];
    userDistribution: UserDistribution[];
    trafficSources: TrafficSource[];
    filters: FilterState;
    sidebarOpen: boolean;
    loading: boolean;
    error: string | null;

    // Actions
    setFilters: (filters: Partial<FilterState>) => void;
    toggleSidebar: () => void;
    setSidebarOpen: (open: boolean) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    refreshData: () => void;
}

export const useDashboardStore = create<DashboardStore>((set, get) => ({
    // Initial state
    stats: null,
    chartData: [],
    userDistribution: [],
    trafficSources: [],
    filters: {
        dateRange: '30d',
        userType: 'all',
    },
    sidebarOpen: true,
    loading: false,
    error: null,

    // Actions
    setFilters: (newFilters) =>
        set((state) => ({
            filters: { ...state.filters, ...newFilters },
        })),

    toggleSidebar: () =>
        set((state) => ({
            sidebarOpen: !state.sidebarOpen,
        })),

    setSidebarOpen: (open) =>
        set({
            sidebarOpen: open,
        }),

    setLoading: (loading) =>
        set({
            loading,
        }),

    setError: (error) =>
        set({
            error,
        }),

    refreshData: async () => {
        const { setLoading, setError } = get();

        try {
            setLoading(true);
            setError(null);

            // Simulate API delay
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // In a real app, this would be an API call
            set({
                stats: mockStats,
                chartData: mockChartData,
                userDistribution: mockUserDistribution,
                trafficSources: mockTrafficSources,
            });
        } catch (err) {
            setError(
                err instanceof Error ? err.message : 'Failed to load data',
            );
        } finally {
            setLoading(false);
        }
    },
}));
