import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
    return clsx(inputs);
}

export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
}

export function formatNumber(num: number): string {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

export function formatPercentage(value: number): string {
    return value.toFixed(1) + '%';
}

export function generateId(): string {
    return Math.random().toString(36).substr(2, 9);
}

export const fetchKPIs = async () => {
    return {
        totalRevenue: {
            label: 'Total Revenue',
            value: 54230,
            currency: 'USD',
        },
        totalUsers: {
            label: 'Total Users',
            value: 1245,
        },
        orders: {
            label: 'Orders',
            value: 342,
        },
        conversionRate: {
            label: 'Conversion Rate',
            value: 4.3,
            unit: '%',
        },
    };
};
