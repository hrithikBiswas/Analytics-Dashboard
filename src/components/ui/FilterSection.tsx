'use client';

import React, { memo } from 'react';
import { Calendar, Users as UsersIcon } from 'lucide-react';
import { FilterState } from '@/types';

interface FilterSectionProps {
    filters: FilterState;
    onFilterChange: (filters: Partial<FilterState>) => void;
}

const dateRangeOptions = [
    { label: 'Last 7 days', value: '7days' as const },
    { label: 'Last 30 days', value: '30days' as const },
    { label: 'Last 12 months', value: '12months' as const },
];

const userTypeOptions = [
    { label: 'All Users', value: 'all' as const },
    { label: 'Free Users', value: 'free' as const },
    { label: 'Premium Users', value: 'premium' as const },
    { label: 'Enterprise Users', value: 'enterprise' as const },
];

const FilterSection: React.FC<FilterSectionProps> = memo(
    ({ filters, onFilterChange }) => {
        return (
            <div className="bg-white dark:bg-dark-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-dark-700 mb-6 animate-fade-in">
                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Date Range Filter */}
                    <div className="flex-1">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            <Calendar className="h-4 w-4" />
                            Date Range
                        </label>
                        <select
                            value={filters.dateRange}
                            onChange={(e) =>
                                onFilterChange({
                                    dateRange: e.target
                                        .value as FilterState['dateRange'],
                                })
                            }
                            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
                        >
                            {dateRangeOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* User Type Filter */}
                    <div className="flex-1">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            <UsersIcon className="h-4 w-4" />
                            User Type
                        </label>
                        <select
                            value={filters.userType}
                            onChange={(e) =>
                                onFilterChange({
                                    userType: e.target
                                        .value as FilterState['userType'],
                                })
                            }
                            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
                        >
                            {userTypeOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        );
    },
);

FilterSection.displayName = 'FilterSection';

export default FilterSection;
