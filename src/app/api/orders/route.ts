// src/app/api/orders/route.ts
import { NextRequest, NextResponse } from 'next/server';

const mockOrdersData = {
    '7days': {
        all: [
            { month: 'Mon', orders: 12 },
            { month: 'Tue', orders: 15 },
            { month: 'Wed', orders: 9 },
            { month: 'Thu', orders: 18 },
            { month: 'Fri', orders: 11 },
            { month: 'Sat', orders: 8 },
            { month: 'Sun', orders: 5 },
        ],
        free: [
            { month: 'Mon', orders: 8 },
            { month: 'Tue', orders: 9 },
            { month: 'Wed', orders: 5 },
            { month: 'Thu', orders: 11 },
            { month: 'Fri', orders: 6 },
            { month: 'Sat', orders: 4 },
            { month: 'Sun', orders: 2 },
        ],
        premium: [
            { month: 'Mon', orders: 8 },
            { month: 'Tue', orders: 10 },
            { month: 'Wed', orders: 6 },
            { month: 'Thu', orders: 12 },
            { month: 'Fri', orders: 7 },
            { month: 'Sat', orders: 5 },
            { month: 'Sun', orders: 3 },
        ],
        enterprise: [
            { month: 'Mon', orders: 2 },
            { month: 'Tue', orders: 2 },
            { month: 'Wed', orders: 1 },
            { month: 'Thu', orders: 3 },
            { month: 'Fri', orders: 2 },
            { month: 'Sat', orders: 1 },
            { month: 'Sun', orders: 1 },
        ],
    },
    '30days': {
        all: [
            { month: 'Week 1', orders: 78 },
            { month: 'Week 2', orders: 89 },
            { month: 'Week 3', orders: 92 },
            { month: 'Week 4', orders: 83 },
        ],
        free: [
            { month: 'Week 1', orders: 42 },
            { month: 'Week 2', orders: 48 },
            { month: 'Week 3', orders: 51 },
            { month: 'Week 4', orders: 44 },
        ],
        premium: [
            { month: 'Week 1', orders: 28 },
            { month: 'Week 2', orders: 32 },
            { month: 'Week 3', orders: 35 },
            { month: 'Week 4', orders: 30 },
        ],
        enterprise: [
            { month: 'Week 1', orders: 8 },
            { month: 'Week 2', orders: 9 },
            { month: 'Week 3', orders: 10 },
            { month: 'Week 4', orders: 9 },
        ],
    },
    '12months': {
        all: [
            { month: 'Jan', orders: 298 },
            { month: 'Feb', orders: 315 },
            { month: 'Mar', orders: 338 },
            { month: 'Apr', orders: 322 },
            { month: 'May', orders: 356 },
            { month: 'Jun', orders: 378 },
            { month: 'Jul', orders: 348 },
            { month: 'Aug', orders: 365 },
            { month: 'Sep', orders: 342 },
            { month: 'Oct', orders: 368 },
            { month: 'Nov', orders: 380 },
            { month: 'Dec', orders: 372 },
        ],
        free: [
            { month: 'Jan', orders: 162 },
            { month: 'Feb', orders: 175 },
            { month: 'Mar', orders: 189 },
            { month: 'Apr', orders: 178 },
            { month: 'May', orders: 195 },
            { month: 'Jun', orders: 208 },
            { month: 'Jul', orders: 192 },
            { month: 'Aug', orders: 201 },
            { month: 'Sep', orders: 185 },
            { month: 'Oct', orders: 198 },
            { month: 'Nov', orders: 210 },
            { month: 'Dec', orders: 202 },
        ],
        premium: [
            { month: 'Jan', orders: 106 },
            { month: 'Feb', orders: 118 },
            { month: 'Mar', orders: 127 },
            { month: 'Apr', orders: 121 },
            { month: 'May', orders: 134 },
            { month: 'Jun', orders: 142 },
            { month: 'Jul', orders: 131 },
            { month: 'Aug', orders: 137 },
            { month: 'Sep', orders: 128 },
            { month: 'Oct', orders: 138 },
            { month: 'Nov', orders: 143 },
            { month: 'Dec', orders: 139 },
        ],
        enterprise: [
            { month: 'Jan', orders: 30 },
            { month: 'Feb', orders: 32 },
            { month: 'Mar', orders: 35 },
            { month: 'Apr', orders: 33 },
            { month: 'May', orders: 37 },
            { month: 'Jun', orders: 39 },
            { month: 'Jul', orders: 36 },
            { month: 'Aug', orders: 38 },
            { month: 'Sep', orders: 35 },
            { month: 'Oct', orders: 38 },
            { month: 'Nov', orders: 40 },
            { month: 'Dec', orders: 38 },
        ],
    },
};

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const dateRange = searchParams.get('dateRange') || '30days';
    const userType = searchParams.get('userType') || 'all';

    const data =
        mockOrdersData[dateRange as keyof typeof mockOrdersData]?.[
            userType as keyof (typeof mockOrdersData)['30days']
        ];

    if (!data) {
        return NextResponse.json(
            { error: 'Invalid parameters' },
            { status: 400 },
        );
    }

    return NextResponse.json(data);
}
