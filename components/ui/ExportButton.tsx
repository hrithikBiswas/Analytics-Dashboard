'use client';

import React from 'react';
import { exportDashboardData } from '@/lib/csvExport';
import { useDashboardStore } from '@/store/dashboardStore';
import { FileDown } from 'lucide-react';

interface ExportButtonProps {
  className?: string;
}

export const ExportButton: React.FC<ExportButtonProps> = ({ className = '' }) => {
  const { stats, chartData, userDistribution, trafficSources } = useDashboardStore();

  const handleExport = () => {
    if (!stats) {
      alert('No data available to export');
      return;
    }

    exportDashboardData(stats, chartData, userDistribution, trafficSources);
  };

  return (
    <button
      onClick={handleExport}
      disabled={!stats}
      className={`inline-flex items-center px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      title="Export dashboard data as CSV"
    >
      <FileDown className="w-4 h-4 mr-2" />
      Export CSV
    </button>
  );
};