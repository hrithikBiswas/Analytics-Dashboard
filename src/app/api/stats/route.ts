// src/app/api/stats/route.ts
import { NextRequest, NextResponse } from 'next/server';

const mockStats = {
    '7days': {
        all: {
            totalRevenue: 12450,
            totalUsers: 245,
            totalOrders: 78,
            conversionRate: 3.1,
            revenueChange: 12.5,
            usersChange: 8.2,
            ordersChange: -2.3,
            conversionChange: 0.5,
        },
        free: {
            totalRevenue: 0,
            totalUsers: 180,
            totalOrders: 45,
            conversionRate: 2.8,
            revenueChange: 0,
            usersChange: 10.5,
            ordersChange: -1.2,
            conversionChange: 0.3,
        },
        premium: {
            totalRevenue: 8920,
            totalUsers: 50,
            totalOrders: 25,
            conversionRate: 4.2,
            revenueChange: 15.3,
            usersChange: 6.8,
            ordersChange: -3.1,
            conversionChange: 0.8,
        },
        enterprise: {
            totalRevenue: 3530,
            totalUsers: 15,
            totalOrders: 8,
            conversionRate: 5.5,
            revenueChange: 8.7,
            usersChange: 4.2,
            ordersChange: -4.5,
            conversionChange: 0.2,
        },
    },
    '30days': {
        all: {
            totalRevenue: 54230,
            totalUsers: 1245,
            totalOrders: 342,
            conversionRate: 4.3,
            revenueChange: 18.7,
            usersChange: 12.4,
            ordersChange: 5.8,
            conversionChange: 1.2,
        },
        free: {
            totalRevenue: 0,
            totalUsers: 892,
            totalOrders: 185,
            conversionRate: 3.8,
            revenueChange: 0,
            usersChange: 15.2,
            ordersChange: 4.5,
            conversionChange: 0.8,
        },
        premium: {
            totalRevenue: 38760,
            totalUsers: 280,
            totalOrders: 125,
            conversionRate: 5.1,
            revenueChange: 22.3,
            usersChange: 9.8,
            ordersChange: 7.2,
            conversionChange: 1.5,
        },
        enterprise: {
            totalRevenue: 15470,
            totalUsers: 73,
            totalOrders: 32,
            conversionRate: 6.2,
            revenueChange: 14.5,
            usersChange: 8.3,
            ordersChange: 4.8,
            conversionChange: 1.0,
        },
    },
    '12months': {
        all: {
            totalRevenue: 648500,
            totalUsers: 15234,
            totalOrders: 4128,
            conversionRate: 4.5,
            revenueChange: 24.3,
            usersChange: 32.8,
            ordersChange: 18.5,
            conversionChange: 2.1,
        },
        free: {
            totalRevenue: 0,
            totalUsers: 10892,
            totalOrders: 2245,
            conversionRate: 4.0,
            revenueChange: 0,
            usersChange: 38.5,
            ordersChange: 16.2,
            conversionChange: 1.5,
        },
        premium: {
            totalRevenue: 462180,
            totalUsers: 3458,
            totalOrders: 1512,
            conversionRate: 5.3,
            revenueChange: 28.7,
            usersChange: 25.4,
            ordersChange: 21.3,
            conversionChange: 2.8,
        },
        enterprise: {
            totalRevenue: 186320,
            totalUsers: 884,
            totalOrders: 371,
            conversionRate: 6.5,
            revenueChange: 19.8,
            usersChange: 22.1,
            ordersChange: 17.2,
            conversionChange: 1.9,
        },
    },
};

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const dateRange = searchParams.get('dateRange') || '30days';
    const userType = searchParams.get('userType') || 'all';

    const data =
        mockStats[dateRange as keyof typeof mockStats]?.[
            userType as keyof (typeof mockStats)['30days']
        ];

    if (!data) {
        return NextResponse.json(
            { error: 'Invalid parameters' },
            { status: 400 },
        );
    }

    return NextResponse.json(data);
}
