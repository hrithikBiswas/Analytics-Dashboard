'use client';

import React from 'react';
import { useDashboardStore } from '@/store/dashboardStore';
import { cn } from '@/lib/utils';
import {
    LayoutDashboard,
    Users,
    ShoppingCart,
    TrendingUp,
    Settings,
    ChevronLeft,
    ChevronRight,
    BarChart3,
    Activity,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
    className?: string;
}

const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Users', href: 'users', icon: Users },
    { name: 'Orders', href: 'orders', icon: ShoppingCart },
    { name: 'Reports', href: 'reports', icon: TrendingUp },
    { name: 'Activity', href: 'activity', icon: Activity },
    { name: 'Settings', href: 'settings', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = () => {
    const { sidebarOpen, toggleSidebar, setSidebarOpen } = useDashboardStore();
    const pathname = usePathname();

    return (
        <>
            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div
                className={cn(
                    'fixed inset-y-0 left-0 z-50 flex flex-col bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-700 lg:translate-x-0', //transition-all duration-300 ease-in-out
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:w-20',
                    !sidebarOpen && 'lg:w-20',
                    sidebarOpen && 'w-64',
                )}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <BarChart3 className="w-5 h-5 text-white" />
                        </div>
                        {sidebarOpen && (
                            <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                Analytics
                            </span>
                        )}
                    </div>
                    <button
                        onClick={toggleSidebar}
                        className="hidden lg:flex cursor-pointer items-center justify-center w-8 h-8 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        {sidebarOpen ? (
                            <ChevronLeft className="w-5 h-5 dark:text-gray-400 dark:hover:text-gray-500 transition-colors" />
                        ) : (
                            <ChevronRight className="w-5 h-5 dark:text-gray-400 dark:hover:text-gray-500 transition-colors" />
                        )}
                    </button>
                </div>

                {/* Navigation */}
                <nav className="px-2 py-4 space-y-1">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                'group flex items-center px-3 py-2 text-sm font-semibold rounded-md',
                                pathname === item.href
                                    ? 'bg-blue-50 dark:bg-blue-600/20 text-blue-600'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-600/20 hover:text-blue-600',
                            )}
                        >
                            <item.icon
                                className={cn(
                                    'flex-shrink-0 w-5 h-5',
                                    pathname === item.href
                                        ? 'text-blue-600'
                                        : 'text-gray-400 dark:text-gray-200 group-hover:text-blue-600',
                                    sidebarOpen ? 'mr-3' : 'mx-auto',
                                )}
                            />
                            {sidebarOpen && item.name}
                        </Link>
                    ))}
                </nav>

                {/* Footer */}
                <div className="absolute bottom-0 w-full px-3 py-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-600">
                                A
                            </span>
                        </div>
                        {sidebarOpen && (
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                                    Admin User
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                    admin@example.com
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
