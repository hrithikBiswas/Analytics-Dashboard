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
  Activity
} from 'lucide-react';

interface SidebarProps {
  className?: string;
}

const navigation = [
  { name: 'Dashboard', href: '#', icon: LayoutDashboard, current: true },
  { name: 'Analytics', href: '#', icon: BarChart3, current: false },
  { name: 'Users', href: '#', icon: Users, current: false },
  { name: 'Orders', href: '#', icon: ShoppingCart, current: false },
  { name: 'Reports', href: '#', icon: TrendingUp, current: false },
  { name: 'Activity', href: '#', icon: Activity, current: false },
  { name: 'Settings', href: '#', icon: Settings, current: false },
];

export const Sidebar: React.FC<SidebarProps> = () => {
  const { sidebarOpen, toggleSidebar, setSidebarOpen } = useDashboardStore();

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
          'fixed inset-y-0 left-0 z-50 flex flex-col bg-white border-r border-gray-200 transition-all duration-300 ease-in-out lg:relative lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:w-20',
          !sidebarOpen && 'lg:w-20',
          sidebarOpen && 'w-64'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            {sidebarOpen && (
              <span className="text-lg font-semibold text-gray-900">Analytics</span>
            )}
          </div>
          <button
            onClick={toggleSidebar}
            className="hidden lg:flex items-center justify-center w-8 h-8 text-gray-500 hover:text-gray-700 transition-colors"
          >
            {sidebarOpen ? (
              <ChevronLeft className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={cn(
                'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                item.current
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <item.icon
                className={cn(
                  'flex-shrink-0 w-5 h-5',
                  item.current ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500',
                  sidebarOpen ? 'mr-3' : 'mx-auto'
                )}
              />
              {sidebarOpen && item.name}
            </a>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-3 py-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-gray-600">A</span>
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">Admin User</p>
                <p className="text-xs text-gray-500 truncate">admin@example.com</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};