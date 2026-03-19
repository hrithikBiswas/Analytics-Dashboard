import { NextResponse } from 'next/server';
import { Report } from '@/types';

const mockReports: Report[] = [
    {
        id: 'REP-001',
        name: 'Q1 2024 Revenue Report',
        type: 'revenue',
        dateRange: 'Jan 2024 - Mar 2024',
        generatedAt: '2024-03-15',
        size: '2.4 MB',
    },
    {
        id: 'REP-002',
        name: 'User Growth Analysis',
        type: 'users',
        dateRange: 'Last 30 days',
        generatedAt: '2024-03-18',
        size: '1.8 MB',
    },
    {
        id: 'REP-003',
        name: 'Order Fulfillment Report',
        type: 'orders',
        dateRange: 'Last 7 days',
        generatedAt: '2024-03-17',
        size: '956 KB',
    },
    {
        id: 'REP-004',
        name: 'Performance Metrics Q1',
        type: 'performance',
        dateRange: 'Jan 2024 - Mar 2024',
        generatedAt: '2024-03-15',
        size: '3.2 MB',
    },
    {
        id: 'REP-005',
        name: 'Revenue Breakdown',
        type: 'revenue',
        dateRange: 'Last 12 months',
        generatedAt: '2024-03-10',
        size: '2.1 MB',
    },
    {
        id: 'REP-006',
        name: 'Active Users Report',
        type: 'users',
        dateRange: 'Last 30 days',
        generatedAt: '2024-03-12',
        size: '1.5 MB',
    },
];

export async function GET() {
    return NextResponse.json(mockReports);
}

export async function POST(request: Request) {
    const body = await request.json();
    const newReport: Report = {
        id: `REP-${String(mockReports.length + 1).padStart(3, '0')}`,
        name: `${body.type.charAt(0).toUpperCase() + body.type.slice(1)} Report - ${body.dateRange}`,
        type: body.type,
        dateRange: body.dateRange,
        generatedAt: new Date().toISOString().split('T')[0],
        size: `${(Math.random() * 3 + 0.5).toFixed(1)} MB`,
    };
    mockReports.push(newReport);
    return NextResponse.json(newReport, { status: 201 });
}
