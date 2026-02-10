import React from 'react';

const ChartSkeleton: React.FC = () => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-6"></div>
            <div className="h-80 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
    );
};

export default ChartSkeleton;
