'use client';

import React, { memo } from 'react';
import {
    LayoutDashboard,
    BarChart3,
    Users,
    Settings,
    FileText,
    ShoppingCart,
    X,
    PanelRightOpen,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
    collapsed: boolean;
    menuCollapsed: boolean;
    onCollapseSidebar?: () => void;
    onCloseMenu?: () => void;
}

const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
    { icon: BarChart3, label: 'Analytics', href: '/analytics' },
    { icon: Users, label: 'Users', href: '/users' },
    { icon: ShoppingCart, label: 'Orders', href: '/orders' },
    { icon: FileText, label: 'Reports', href: '/reports' },
    { icon: Settings, label: 'Settings', href: '/settings' },
];

const Sidebar: React.FC<SidebarProps> = memo(
    ({ collapsed, menuCollapsed, onCollapseSidebar, onCloseMenu }) => {
        const pathname = usePathname();
        return (
            <>
                {/* Mobile Overlay */}
                {!menuCollapsed && (
                    <div
                        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                        onClick={onCloseMenu}
                    />
                )}

                {/* Sidebar for mobile */}
                <aside
                    className={`
          lg:hidden fixed lg:sticky top-0 left-0 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 
          transition-all duration-300 z-50
          ${menuCollapsed ? '-translate-x-full lg:translate-x-0 lg:w-20' : 'translate-x-0 w-64'}
        `}
                >
                    <div className="flex flex-col h-full">
                        {/* Logo */}
                        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-3 w-full">
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                    <BarChart3 className="h-5 w-5 text-white" />
                                </div>
                                {!collapsed && (
                                    <div className="flex flex-1 justify-between">
                                        <span className="font-bold text-xl text-gray-900 dark:text-white">
                                            Analytics
                                        </span>
                                        <PanelRightOpen
                                            className="hidden lg:inline cursor-pointer text-gray-500 hover:text-gray-600 transition-colors"
                                            onClick={onCollapseSidebar}
                                        />
                                    </div>
                                )}
                            </div>
                            {!collapsed && (
                                <button
                                    onClick={onCloseMenu}
                                    className="lg:hidden p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                                >
                                    <X className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                                </button>
                            )}
                        </div>

                        {/* Navigation */}
                        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                            {menuItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        onClick={onCloseMenu}
                                        className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all
                    ${
                        pathname === item.href
                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }
                    ${collapsed ? 'justify-center' : ''}
                  `}
                                        title={
                                            collapsed ? item.label : undefined
                                        }
                                    >
                                        <Icon className="h-5 w-5 flex-shrink-0" />
                                        {!collapsed && (
                                            <span className="font-medium">
                                                {item.label}
                                            </span>
                                        )}
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* User Profile */}
                        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                            <div
                                className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}
                            >
                                <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="text-white text-sm font-semibold">
                                        AD
                                    </span>
                                </div>
                                {!collapsed && (
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
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
                </aside>

                {/* Sidebar */}

                <aside
                    className={`
          hidden lg:block fixed lg:sticky top-0 left-0 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 
          transition-all ease-in-out duration-300 z-50
          ${collapsed ? '-translate-x-full lg:translate-x-0 lg:w-20' : 'translate-x-0 w-64'}
        `}
                >
                    <div className="flex flex-col h-full">
                        {/* Logo */}
                        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-3 w-full">
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                    <BarChart3 className="h-5 w-5 text-white" />
                                </div>
                                {!collapsed && (
                                    <div className="flex flex-1 justify-between">
                                        <span className="font-bold text-xl text-gray-900 dark:text-white">
                                            Analytics
                                        </span>
                                        <PanelRightOpen
                                            className="hidden lg:inline cursor-pointer text-gray-500 hover:text-gray-600 transition-colors"
                                            onClick={onCollapseSidebar}
                                        />
                                    </div>
                                )}
                            </div>
                            {!collapsed && (
                                <button
                                    onClick={onCloseMenu}
                                    className="lg:hidden p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                                >
                                    <X className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                                </button>
                            )}
                        </div>

                        {/* Navigation */}
                        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                            {menuItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all
                    ${
                        pathname === item.href
                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }
                    ${collapsed ? 'justify-center' : ''}
                  `}
                                        title={
                                            collapsed ? item.label : undefined
                                        }
                                    >
                                        <Icon className="h-5 w-5 flex-shrink-0" />
                                        {!collapsed && (
                                            <span className="font-medium">
                                                {item.label}
                                            </span>
                                        )}
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* User Profile */}
                        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                            <div
                                className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}
                            >
                                <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="text-white text-sm font-semibold">
                                        AD
                                    </span>
                                </div>
                                {!collapsed && (
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
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
                </aside>
            </>
        );
    },
);

Sidebar.displayName = 'Sidebar';

export default Sidebar;
