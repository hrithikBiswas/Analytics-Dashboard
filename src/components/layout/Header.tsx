'use client';

import React, { useState } from 'react';
import { useDashboardStore } from '@/store/dashboardStore';
import { cn } from '@/lib/utils';
import {
    Bell,
    Search,
    User,
    LogOut,
    Settings,
    Menu,
    ChevronDown,
} from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { ExportButton } from '@/components/ui/ExportButton';
import Link from 'next/link';

interface HeaderProps {
    className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className }) => {
    const { sidebarOpen, setSidebarOpen } = useDashboardStore();
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

    return (
        <header
            className={cn(
                'bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-700 px-4 py-4',
                className,
            )}
        >
            <div className="flex items-center justify-between">
                {/* Left side - Mobile menu button and search */}
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="lg:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <Menu className="w-6 h-6" />
                    </button>

                    <div className="hidden md:block">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search..."
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white text-gray-700 dark:text-gray-300 dark:bg-gray-800 dark:border-gray-700 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                            />
                        </div>
                    </div>
                </div>

                {/* Right side - Notifications and profile */}
                <div className="flex items-center space-x-2 sm:space-x-4">
                    {/* Export Button - Hidden on mobile */}
                    <div className="hidden sm:block">
                        <ExportButton />
                    </div>

                    {/* Theme Toggle */}
                    <ThemeToggle />

                    {/* Notifications */}
                    <button className="relative p-2 cursor-pointer text-gray-500 hover:text-gray-700 transition-colors">
                        <Bell className="w-6 h-6" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>

                    {/* Profile dropdown */}
                    <div className="relative">
                        <button
                            onClick={() =>
                                setProfileDropdownOpen(!profileDropdownOpen)
                            }
                            className="flex items-center cursor-pointer space-x-3 p-2 text-sm rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                <User className="w-4 h-4 text-gray-600" />
                            </div>
                            <span className="hidden md:block text-gray-700 dark:text-gray-300 font-medium">
                                Admin User
                            </span>
                            <ChevronDown className="hidden md:block w-4 h-4 text-gray-400" />
                        </button>

                        {/* Dropdown menu */}
                        {profileDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 dark:border-gray-700 rounded-md shadow-lg border border-gray-200 z-50">
                                <div className="py-1">
                                    <Link
                                        href="#"
                                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-100 transition-colors"
                                    >
                                        <Settings className="w-4 h-4 mr-3 text-gray-600 dark:text-gray-200" />
                                        Settings
                                    </Link>
                                    <Link
                                        href="#"
                                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-100 transition-colors"
                                    >
                                        <LogOut className="w-4 h-4 mr-3 text-gray-600 dark:text-gray-200" />
                                        Sign out
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile search */}
            <div className="mt-4 md:hidden">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 dark:text-gray-300 dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                </div>
            </div>
        </header>
    );
};
