import { create } from 'zustand';
import { FilterState } from '@/types';

interface DashboardState {
    filters: FilterState;
    theme: 'light' | 'dark';
    sidebarCollapsed: boolean;
    menuSidebarCollapsed: boolean;
    loading: boolean;
    error: string | null;
    setFilters: (filters: Partial<FilterState>) => void;
    toggleTheme: () => void;
    toggleSidebar: () => void;
    toggleMenuSidebar: () => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
    //stats
    filters: {
        dateRange: '12months',
        userType: 'all',
    },
    theme: 'light',
    sidebarCollapsed: false,
    menuSidebarCollapsed: true,
    loading: false,
    error: null,

    //actions
    setFilters: (filters) =>
        set((state) => ({
            filters: { ...state.filters, ...filters },
        })),
    toggleTheme: () =>
        set((state) => {
            const newTheme = state.theme === 'light' ? 'dark' : 'light';
            if (typeof document !== 'undefined') {
                document.documentElement.classList.toggle(
                    'dark',
                    newTheme === 'dark',
                );
            }
            return { theme: newTheme };
        }),
    toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
    toggleMenuSidebar: () =>
        set((state) => ({ menuSidebarCollapsed: !state.menuSidebarCollapsed })),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
}));
