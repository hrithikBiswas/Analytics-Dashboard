import { useDashboardData } from '@/hooks/useDashboardData';
import React from 'react';

const DashboardError: React.FC = () => {
    const { error, isRefreshing, refreshData } = useDashboardData();
    return (
        <div className="flex items-center justify-center min-h-96">
            <div className="text-center max-w-md">
                <div className="text-red-500 text-6xl mb-4">⚠️</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Unable to load dashboard data
                </h3>
                <p className="text-gray-500 mb-6">{error}</p>
                <button
                    onClick={refreshData}
                    disabled={isRefreshing}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isRefreshing ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Refreshing...
                        </>
                    ) : (
                        'Try Again'
                    )}
                </button>
            </div>
        </div>
    );
};

export default DashboardError;
