// src/app/api/traffic/route.ts
import { NextRequest, NextResponse } from 'next/server';

const mockTrafficData = {
    '7days': {
        all: [
            { source: 'Organic', value: 42, color: '#10b981' },
            { source: 'Paid', value: 28, color: '#f59e0b' },
            { source: 'Social', value: 18, color: '#3b82f6' },
            { source: 'Referral', value: 12, color: '#8b5cf6' },
        ],
        free: [
            { source: 'Organic', value: 48, color: '#10b981' },
            { source: 'Paid', value: 22, color: '#f59e0b' },
            { source: 'Social', value: 20, color: '#3b82f6' },
            { source: 'Referral', value: 10, color: '#8b5cf6' },
        ],
        premium: [
            { source: 'Organic', value: 38, color: '#10b981' },
            { source: 'Paid', value: 35, color: '#f59e0b' },
            { source: 'Social', value: 15, color: '#3b82f6' },
            { source: 'Referral', value: 12, color: '#8b5cf6' },
        ],
        enterprise: [
            { source: 'Organic', value: 30, color: '#10b981' },
            { source: 'Paid', value: 35, color: '#f59e0b' },
            { source: 'Social', value: 10, color: '#3b82f6' },
            { source: 'Referral', value: 25, color: '#8b5cf6' },
        ],
    },
    '30days': {
        all: [
            { source: 'Organic', value: 45, color: '#10b981' },
            { source: 'Paid', value: 30, color: '#f59e0b' },
            { source: 'Social', value: 15, color: '#3b82f6' },
            { source: 'Referral', value: 10, color: '#8b5cf6' },
        ],
        free: [
            { source: 'Organic', value: 52, color: '#10b981' },
            { source: 'Paid', value: 22, color: '#f59e0b' },
            { source: 'Social', value: 18, color: '#3b82f6' },
            { source: 'Referral', value: 8, color: '#8b5cf6' },
        ],
        premium: [
            { source: 'Organic', value: 40, color: '#10b981' },
            { source: 'Paid', value: 35, color: '#f59e0b' },
            { source: 'Social', value: 13, color: '#3b82f6' },
            { source: 'Referral', value: 12, color: '#8b5cf6' },
        ],
        enterprise: [
            { source: 'Organic', value: 32, color: '#10b981' },
            { source: 'Paid', value: 38, color: '#f59e0b' },
            { source: 'Social', value: 8, color: '#3b82f6' },
            { source: 'Referral', value: 22, color: '#8b5cf6' },
        ],
    },
    '12months': {
        all: [
            { source: 'Organic', value: 48, color: '#10b981' },
            { source: 'Paid', value: 28, color: '#f59e0b' },
            { source: 'Social', value: 14, color: '#3b82f6' },
            { source: 'Referral', value: 10, color: '#8b5cf6' },
        ],
        free: [
            { source: 'Organic', value: 55, color: '#10b981' },
            { source: 'Paid', value: 20, color: '#f59e0b' },
            { source: 'Social', value: 17, color: '#3b82f6' },
            { source: 'Referral', value: 8, color: '#8b5cf6' },
        ],
        premium: [
            { source: 'Organic', value: 42, color: '#10b981' },
            { source: 'Paid', value: 33, color: '#f59e0b' },
            { source: 'Social', value: 12, color: '#3b82f6' },
            { source: 'Referral', value: 13, color: '#8b5cf6' },
        ],
        enterprise: [
            { source: 'Organic', value: 35, color: '#10b981' },
            { source: 'Paid', value: 38, color: '#f59e0b' },
            { source: 'Social', value: 7, color: '#3b82f6' },
            { source: 'Referral', value: 20, color: '#8b5cf6' },
        ],
    },
};

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const dateRange = searchParams.get('dateRange') || '30days';
    const userType = searchParams.get('userType') || 'all';

    const data =
        mockTrafficData[dateRange as keyof typeof mockTrafficData]?.[
            userType as keyof (typeof mockTrafficData)['30days']
        ];

    if (!data) {
        return NextResponse.json(
            { error: 'Invalid parameters' },
            { status: 400 },
        );
    }

    return NextResponse.json(data);
}
