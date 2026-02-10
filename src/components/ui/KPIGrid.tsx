'use client';

import React, { memo } from 'react';
import {
    TrendingUp,
    TrendingDown,
    DollarSign,
    Users,
    ShoppingCart,
    TrendingUpIcon,
} from 'lucide-react';

interface KPICardProps {
    title: string;
    value: string | number;
    change: number;
    trend: 'up' | 'down';
    icon: 'revenue' | 'users' | 'orders' | 'conversion';
    loading?: boolean;
}

const iconMap = {
    revenue: DollarSign,
    users: Users,
    orders: ShoppingCart,
    conversion: TrendingUpIcon,
};

const KPICard: React.FC<KPICardProps> = memo(
    ({ title, value, change, trend, icon, loading = false }) => {
        const Icon = iconMap[icon];
        const isPositive = trend === 'up';

        if (loading) {
            return (
                <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-dark-700 animate-pulse">
                    <div className="flex items-start justify-between mb-4">
                        <div className="h-10 w-10 bg-gray-200 dark:bg-dark-700 rounded-lg"></div>
                    </div>
                    <div className="h-8 bg-gray-200 dark:bg-dark-700 rounded w-2/3 mb-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-dark-700 rounded w-1/3"></div>
                </div>
            );
        }

        return (
            <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-dark-700 hover:shadow-md transition-all duration-300 animate-fade-in group">
                <div className="flex items-start justify-between mb-4">
                    <div
                        className={`p-2.5 rounded-lg ${
                            isPositive
                                ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400'
                                : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                        } group-hover:scale-110 transition-transform duration-300`}
                    >
                        <Icon className="h-5 w-5" />
                    </div>
                    <div
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                            isPositive
                                ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400'
                                : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                        }`}
                    >
                        {isPositive ? (
                            <TrendingUp className="h-3 w-3" />
                        ) : (
                            <TrendingDown className="h-3 w-3" />
                        )}
                        {Math.abs(change)}%
                    </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {value}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {title}
                </p>
            </div>
        );
    },
);

KPICard.displayName = 'KPICard';

export default KPICard;
