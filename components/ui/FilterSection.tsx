'use client';

import React from 'react';
import { useDashboardStore } from '@/store/dashboardStore';
import { FilterState } from '@/types';
import { dateRangeOptions, userTypeOptions } from '@/data/mockData';

export const FilterSection: React.FC = () => {
  const { filters, setFilters } = useDashboardStore();

  const handleDateRangeChange = (value: FilterState['dateRange']) => {
    setFilters({ dateRange: value });
  };

  const handleUserTypeChange = (value: FilterState['userType']) => {
    setFilters({ userType: value });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Dashboard Filters</h2>
          <p className="text-sm text-gray-500 mt-1">Customize your view with date range and user filters</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          {/* Date Range Filter */}
          <div className="relative">
            <label htmlFor="date-range" className="block text-sm font-medium text-gray-700 mb-1">
              Date Range
            </label>
            <select
              id="date-range"
              value={filters.dateRange}
              onChange={(e) => handleDateRangeChange(e.target.value as FilterState['dateRange'])}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm border rounded-md bg-white"
            >
              {dateRangeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* User Type Filter */}
          <div className="relative">
            <label htmlFor="user-type" className="block text-sm font-medium text-gray-700 mb-1">
              User Type
            </label>
            <select
              id="user-type"
              value={filters.userType}
              onChange={(e) => handleUserTypeChange(e.target.value as FilterState['userType'])}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm border rounded-md bg-white"
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

      {/* Active Filters Display */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-600">Active filters:</span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {dateRangeOptions.find(option => option.value === filters.dateRange)?.label}
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {userTypeOptions.find(option => option.value === filters.userType)?.label}
          </span>
        </div>
      </div>
    </div>
  );
};