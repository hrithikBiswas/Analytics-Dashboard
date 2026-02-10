'use client';

import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { useDashboardStore } from '@/store/dashboardStore';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
    children,
}) => {
    const {
        sidebarCollapsed,
        menuSidebarCollapsed,
        toggleSidebar,
        toggleMenuSidebar,
    } = useDashboardStore();

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar
                collapsed={sidebarCollapsed}
                menuCollapsed={menuSidebarCollapsed}
                onCollapseSidebar={toggleSidebar}
                onCloseMenu={toggleMenuSidebar}
            />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Header onMenuClick={toggleMenuSidebar} />

                <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-950 p-4 lg:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
};
