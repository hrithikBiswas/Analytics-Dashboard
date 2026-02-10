import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import './globals.css';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Admin Analytics Dashboard',
    description: 'Production-ready admin dashboard with analytics and charts',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ThemeProvider
                    attribute="data-theme"
                    defaultTheme="light"
                    storageKey="preferred-theme"
                >
                    <DashboardLayout>{children}</DashboardLayout>
                </ThemeProvider>
            </body>
        </html>
    );
}
