'use client';

import React from 'react';
import { useDashboardStore } from '@/store/dashboardStore';
import { cn } from '@/lib/utils';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
    children,
}) => {
    const { sidebarOpen } = useDashboardStore();

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950">
            <div className="flex">
                {/* Sidebar */}
                <Sidebar />

                {/* Main content */}
                <div
                    className={cn(
                        'flex-1 flex flex-col min-h-screen transition-all duration-200 ease-in-out',
                        sidebarOpen ? 'lg:ml-64' : 'lg:ml-20',
                    )}
                >
                    {/* Header */}
                    <Header />

                    {/* Main content area */}
                    <main className="flex-1 p-6">{children}</main>
                </div>
            </div>
        </div>
    );
};
