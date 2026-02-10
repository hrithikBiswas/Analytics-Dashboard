// src/app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';

const mockUsersData = {
    '7days': {
        all: [
            { name: 'Free Users', value: 180, color: '#3b82f6' },
            { name: 'Premium Users', value: 50, color: '#8b5cf6' },
            { name: 'Enterprise Users', value: 15, color: '#ec4899' },
        ],
        free: [{ name: 'Free Users', value: 180, color: '#3b82f6' }],
        premium: [{ name: 'Premium Users', value: 50, color: '#8b5cf6' }],
        enterprise: [{ name: 'Enterprise Users', value: 15, color: '#ec4899' }],
    },
    '30days': {
        all: [
            { name: 'Free Users', value: 892, color: '#3b82f6' },
            { name: 'Premium Users', value: 280, color: '#8b5cf6' },
            { name: 'Enterprise Users', value: 73, color: '#ec4899' },
        ],
        free: [{ name: 'Free Users', value: 892, color: '#3b82f6' }],
        premium: [{ name: 'Premium Users', value: 280, color: '#8b5cf6' }],
        enterprise: [{ name: 'Enterprise Users', value: 73, color: '#ec4899' }],
    },
    '12months': {
        all: [
            { name: 'Free Users', value: 10892, color: '#3b82f6' },
            { name: 'Premium Users', value: 3458, color: '#8b5cf6' },
            { name: 'Enterprise Users', value: 884, color: '#ec4899' },
        ],
        free: [{ name: 'Free Users', value: 10892, color: '#3b82f6' }],
        premium: [{ name: 'Premium Users', value: 3458, color: '#8b5cf6' }],
        enterprise: [
            { name: 'Enterprise Users', value: 884, color: '#ec4899' },
        ],
    },
};

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const dateRange = searchParams.get('dateRange') || '30days';
    const userType = searchParams.get('userType') || 'all';

    const data =
        mockUsersData[dateRange as keyof typeof mockUsersData]?.[
            userType as keyof (typeof mockUsersData)['30days']
        ];

    if (!data) {
        return NextResponse.json(
            { error: 'Invalid parameters' },
            { status: 400 },
        );
    }

    return NextResponse.json(data);
}
