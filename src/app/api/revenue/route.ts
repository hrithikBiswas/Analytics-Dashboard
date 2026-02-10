// src/app/api/revenue/route.ts
import { NextRequest, NextResponse } from 'next/server';

const mockRevenueData = {
    '7days': {
        all: [
            { month: 'Mon', revenue: 1850, orders: 12 },
            { month: 'Tue', revenue: 2100, orders: 15 },
            { month: 'Wed', revenue: 1650, orders: 9 },
            { month: 'Thu', revenue: 2300, orders: 18 },
            { month: 'Fri', revenue: 1950, orders: 11 },
            { month: 'Sat', revenue: 1400, orders: 8 },
            { month: 'Sun', revenue: 1200, orders: 5 },
        ],
        free: [
            { month: 'Mon', revenue: 0, orders: 8 },
            { month: 'Tue', revenue: 0, orders: 9 },
            { month: 'Wed', revenue: 0, orders: 5 },
            { month: 'Thu', revenue: 0, orders: 11 },
            { month: 'Fri', revenue: 0, orders: 6 },
            { month: 'Sat', revenue: 0, orders: 4 },
            { month: 'Sun', revenue: 0, orders: 2 },
        ],
        premium: [
            { month: 'Mon', revenue: 1320, orders: 8 },
            { month: 'Tue', revenue: 1580, orders: 10 },
            { month: 'Wed', revenue: 1180, orders: 6 },
            { month: 'Thu', revenue: 1750, orders: 12 },
            { month: 'Fri', revenue: 1390, orders: 7 },
            { month: 'Sat', revenue: 980, orders: 5 },
            { month: 'Sun', revenue: 720, orders: 3 },
        ],
        enterprise: [
            { month: 'Mon', revenue: 530, orders: 2 },
            { month: 'Tue', revenue: 520, orders: 2 },
            { month: 'Wed', revenue: 470, orders: 1 },
            { month: 'Thu', revenue: 550, orders: 3 },
            { month: 'Fri', revenue: 560, orders: 2 },
            { month: 'Sat', revenue: 420, orders: 1 },
            { month: 'Sun', revenue: 480, orders: 1 },
        ],
    },
    '30days': {
        all: [
            { month: 'Week 1', revenue: 12450, orders: 78 },
            { month: 'Week 2', revenue: 13850, orders: 89 },
            { month: 'Week 3', revenue: 14200, orders: 92 },
            { month: 'Week 4', revenue: 13730, orders: 83 },
        ],
        free: [
            { month: 'Week 1', revenue: 0, orders: 42 },
            { month: 'Week 2', revenue: 0, orders: 48 },
            { month: 'Week 3', revenue: 0, orders: 51 },
            { month: 'Week 4', revenue: 0, orders: 44 },
        ],
        premium: [
            { month: 'Week 1', revenue: 8920, orders: 28 },
            { month: 'Week 2', revenue: 9870, orders: 32 },
            { month: 'Week 3', revenue: 10150, orders: 35 },
            { month: 'Week 4', revenue: 9820, orders: 30 },
        ],
        enterprise: [
            { month: 'Week 1', revenue: 3530, orders: 8 },
            { month: 'Week 2', revenue: 3980, orders: 9 },
            { month: 'Week 3', revenue: 4050, orders: 10 },
            { month: 'Week 4', revenue: 3910, orders: 9 },
        ],
    },
    '12months': {
        all: [
            { month: 'Jan', revenue: 45230, orders: 298 },
            { month: 'Feb', revenue: 48650, orders: 315 },
            { month: 'Mar', revenue: 52100, orders: 338 },
            { month: 'Apr', revenue: 49870, orders: 322 },
            { month: 'May', revenue: 55430, orders: 356 },
            { month: 'Jun', revenue: 58920, orders: 378 },
            { month: 'Jul', revenue: 54200, orders: 348 },
            { month: 'Aug', revenue: 56780, orders: 365 },
            { month: 'Sep', revenue: 53450, orders: 342 },
            { month: 'Oct', revenue: 57230, orders: 368 },
            { month: 'Nov', revenue: 59150, orders: 380 },
            { month: 'Dec', revenue: 57490, orders: 372 },
        ],
        free: [
            { month: 'Jan', revenue: 0, orders: 162 },
            { month: 'Feb', revenue: 0, orders: 175 },
            { month: 'Mar', revenue: 0, orders: 189 },
            { month: 'Apr', revenue: 0, orders: 178 },
            { month: 'May', revenue: 0, orders: 195 },
            { month: 'Jun', revenue: 0, orders: 208 },
            { month: 'Jul', revenue: 0, orders: 192 },
            { month: 'Aug', revenue: 0, orders: 201 },
            { month: 'Sep', revenue: 0, orders: 185 },
            { month: 'Oct', revenue: 0, orders: 198 },
            { month: 'Nov', revenue: 0, orders: 210 },
            { month: 'Dec', revenue: 0, orders: 202 },
        ],
        premium: [
            { month: 'Jan', revenue: 32310, orders: 106 },
            { month: 'Feb', revenue: 34740, orders: 118 },
            { month: 'Mar', revenue: 37180, orders: 127 },
            { month: 'Apr', revenue: 35580, orders: 121 },
            { month: 'May', revenue: 39560, orders: 134 },
            { month: 'Jun', revenue: 42080, orders: 142 },
            { month: 'Jul', revenue: 38680, orders: 131 },
            { month: 'Aug', revenue: 40510, orders: 137 },
            { month: 'Sep', revenue: 38150, orders: 128 },
            { month: 'Oct', revenue: 40850, orders: 138 },
            { month: 'Nov', revenue: 42220, orders: 143 },
            { month: 'Dec', revenue: 41030, orders: 139 },
        ],
        enterprise: [
            { month: 'Jan', revenue: 12920, orders: 30 },
            { month: 'Feb', revenue: 13910, orders: 32 },
            { month: 'Mar', revenue: 14920, orders: 35 },
            { month: 'Apr', revenue: 14290, orders: 33 },
            { month: 'May', revenue: 15870, orders: 37 },
            { month: 'Jun', revenue: 16840, orders: 39 },
            { month: 'Jul', revenue: 15520, orders: 36 },
            { month: 'Aug', revenue: 16270, orders: 38 },
            { month: 'Sep', revenue: 15300, orders: 35 },
            { month: 'Oct', revenue: 16380, orders: 38 },
            { month: 'Nov', revenue: 16930, orders: 40 },
            { month: 'Dec', revenue: 16460, orders: 38 },
        ],
    },
};

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const dateRange = searchParams.get('dateRange') || '30days';
    const userType = searchParams.get('userType') || 'all';

    const data =
        mockRevenueData[dateRange as keyof typeof mockRevenueData]?.[
            userType as keyof (typeof mockRevenueData)['30days']
        ];

    if (!data) {
        return NextResponse.json(
            { error: 'Invalid parameters' },
            { status: 400 },
        );
    }

    return NextResponse.json(data);
}
