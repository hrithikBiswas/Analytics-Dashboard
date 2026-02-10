'use client';

import React, { memo, useState } from 'react';
import { Menu, Bell, Sun, Moon, Search } from 'lucide-react';
import { useDashboardStore } from '@/store/dashboardStore';

interface HeaderProps {
    onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = memo(({ onMenuClick }) => {
    const { theme, toggleTheme } = useDashboardStore();
    const [showNotifications, setShowNotifications] = useState(false);

    const notifications = [
        { id: 1, title: 'New order received', time: '5 min ago', unread: true },
        {
            id: 2,
            title: 'Revenue milestone reached',
            time: '1 hour ago',
            unread: true,
        },
        {
            id: 3,
            title: 'New user registered',
            time: '2 hours ago',
            unread: false,
        },
    ];

    const unreadCount = notifications.filter((n) => n.unread).length;

    return (
        <header className="sticky top-0 z-30 h-16 bg-white dark:bg-dark-900 border-b border-gray-200 dark:border-dark-700 px-4 lg:px-6">
            <div className="flex items-center justify-between h-full">
                {/* Left side */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={onMenuClick}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-dark-800 rounded-lg transition-colors lg:hidden"
                        aria-label="Toggle menu"
                    >
                        <Menu className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    </button>

                    <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-dark-800 rounded-lg flex-1 max-w-md">
                        <Search className="h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-transparent border-none outline-none text-sm text-gray-900 dark:text-white placeholder-gray-500 w-full"
                        />
                    </div>
                </div>

                {/* Right side */}
                <div className="flex items-center gap-3">
                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-dark-800 rounded-lg transition-colors"
                        aria-label="Toggle theme"
                    >
                        {theme === 'light' ? (
                            <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                        ) : (
                            <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                        )}
                    </button>

                    {/* Notifications */}
                    <div className="relative">
                        <button
                            onClick={() =>
                                setShowNotifications(!showNotifications)
                            }
                            className="p-2 hover:bg-gray-100 dark:hover:bg-dark-800 rounded-lg transition-colors relative"
                            aria-label="Notifications"
                        >
                            <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                            {unreadCount > 0 && (
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            )}
                        </button>

                        {/* Notification Dropdown */}
                        {showNotifications && (
                            <>
                                <div
                                    className="fixed inset-0 z-10"
                                    onClick={() => setShowNotifications(false)}
                                ></div>
                                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-dark-800 rounded-lg shadow-lg border border-gray-200 dark:border-dark-700 z-20 animate-slide-in">
                                    <div className="p-4 border-b border-gray-200 dark:border-dark-700">
                                        <h3 className="font-semibold text-gray-900 dark:text-white">
                                            Notifications
                                        </h3>
                                    </div>
                                    <div className="max-h-96 overflow-y-auto">
                                        {notifications.map((notification) => (
                                            <div
                                                key={notification.id}
                                                className={`p-4 border-b border-gray-100 dark:border-dark-700 hover:bg-gray-50 dark:hover:bg-dark-700/50 cursor-pointer transition-colors ${
                                                    notification.unread
                                                        ? 'bg-blue-50/50 dark:bg-blue-900/10'
                                                        : ''
                                                }`}
                                            >
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {notification.title}
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                    {notification.time}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="p-3 text-center border-t border-gray-200 dark:border-dark-700">
                                        <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                                            View all notifications
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    {/* User Profile */}
                    <div className="hidden sm:flex items-center gap-3 pl-3 border-l border-gray-200 dark:border-dark-700">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-semibold">
                                AD
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
});

Header.displayName = 'Header';

export default Header;
