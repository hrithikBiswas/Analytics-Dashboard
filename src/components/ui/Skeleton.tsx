import React from 'react';

interface SkeletonProps {
    className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => {
    return (
        <div
            className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`}
        ></div>
    );
};

export const KPICardSkeleton: React.FC = () => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <Skeleton className="h-4 w-24 mb-3" />
                    <Skeleton className="h-8 w-32 mb-3" />
                    <Skeleton className="h-6 w-16" />
                </div>
                <Skeleton className="w-12 h-12" />
            </div>
        </div>
    );
};

export const ChartSkeleton: React.FC<{ height?: string }> = ({
    height = '300px',
}) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <Skeleton className="h-6 w-48 mb-4" />
            <div className="relative" style={{ height }}>
                <Skeleton className="absolute inset-0" />
            </div>
        </div>
    );
};

export const TableSkeleton: React.FC<{ rows?: number }> = ({ rows = 5 }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="space-y-3">
                <Skeleton className="h-10 w-full" />
                {Array.from({ length: rows }).map((_, i) => (
                    <Skeleton key={i} className="h-10 w-full" />
                ))}
            </div>
        </div>
    );
};
