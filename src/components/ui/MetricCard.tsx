'use client';

import React, { memo } from 'react';
import {
    Eye,
    Users,
    TrendingDown,
    Clock,
    Target,
    DollarSign,
} from 'lucide-react';

interface MetricCardProps {
    title: string;
    value: string;
    subtitle?: string;
    icon: 'views' | 'visitors' | 'bounce' | 'session' | 'conversion' | 'revenue';
    loading?: boolean;
}

const iconMap = {
    views: Eye,
    visitors: Users,
    bounce: TrendingDown,
    session: Clock,
    conversion: Target,
    revenue: DollarSign,
};

const MetricCard: React.FC<MetricCardProps> = memo(
    ({ title, value, subtitle, icon, loading = false }) => {
        const Icon = iconMap[icon];

        if (loading) {
            return (
                <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700 animate-pulse">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                    </div>
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
            );
        }

        return (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-colors duration-300 group">
                <div className="flex items-center gap-3 mb-3">
                    <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {title}
                    </span>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {value}
                </p>
                {subtitle && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        {subtitle}
                    </p>
                )}
            </div>
        );
    },
);

MetricCard.displayName = 'MetricCard';

export default MetricCard;
