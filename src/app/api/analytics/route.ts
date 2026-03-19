import { NextRequest, NextResponse } from 'next/server';

const mockAnalyticsMetrics = {
    '7days': {
        pageViews: 45230,
        uniqueVisitors: 12450,
        bounceRate: 42.5,
        avgSessionDuration: 185,
        conversionRate: 3.1,
        revenue: 12450,
    },
    '30days': {
        pageViews: 187520,
        uniqueVisitors: 52340,
        bounceRate: 38.2,
        avgSessionDuration: 245,
        conversionRate: 4.5,
        revenue: 45345,
    },
    '12months': {
        pageViews: 2156480,
        uniqueVisitors: 598340,
        bounceRate: 35.8,
        avgSessionDuration: 312,
        conversionRate: 4.3,
        revenue: 54230,
    },
};

const mockConversionData = {
    '7days': [
        { stage: 'Visitors', value: 12450, fill: '#3b82f6' },
        { stage: 'Signups', value: 2450, fill: '#8b5cf6' },
        { stage: 'Active', value: 1850, fill: '#ec4899' },
        { stage: 'Subscribers', value: 450, fill: '#f59e0b' },
    ],
    '30days': [
        { stage: 'Visitors', value: 52340, fill: '#3b82f6' },
        { stage: 'Signups', value: 10450, fill: '#8b5cf6' },
        { stage: 'Active', value: 7850, fill: '#ec4899' },
        { stage: 'Subscribers', value: 1890, fill: '#f59e0b' },
    ],
    '12months': [
        { stage: 'Visitors', value: 598340, fill: '#3b82f6' },
        { stage: 'Signups', value: 125450, fill: '#8b5cf6' },
        { stage: 'Active', value: 94500, fill: '#ec4899' },
        { stage: 'Subscribers', value: 22850, fill: '#f59e0b' },
    ],
};

const mockEngagementData = {
    '7days': [
        { day: 'Mon', views: 5420, sessions: 3200 },
        { day: 'Tue', views: 6250, sessions: 3800 },
        { day: 'Wed', views: 5980, sessions: 3500 },
        { day: 'Thu', views: 7120, sessions: 4200 },
        { day: 'Fri', views: 6840, sessions: 4100 },
        { day: 'Sat', views: 5200, sessions: 2900 },
        { day: 'Sun', views: 8420, sessions: 3350 },
    ],
    '30days': [
        { day: 'Week 1', views: 42000, sessions: 25000 },
        { day: 'Week 2', views: 48500, sessions: 28000 },
        { day: 'Week 3', views: 51200, sessions: 31000 },
        { day: 'Week 4', views: 45820, sessions: 27340 },
    ],
    '12months': [
        { day: 'Jan', views: 165000, sessions: 98000 },
        { day: 'Feb', views: 172000, sessions: 102000 },
        { day: 'Mar', views: 185000, sessions: 110000 },
        { day: 'Apr', views: 178000, sessions: 105000 },
        { day: 'May', views: 192000, sessions: 115000 },
        { day: 'Jun', views: 198000, sessions: 118000 },
        { day: 'Jul', views: 175000, sessions: 104000 },
        { day: 'Aug', views: 188000, sessions: 112000 },
        { day: 'Sep', views: 182000, sessions: 108000 },
        { day: 'Oct', views: 195000, sessions: 116000 },
        { day: 'Nov', views: 198000, sessions: 118000 },
        { day: 'Dec', views: 178480, sessions: 106340 },
    ],
};

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const dateRange = searchParams.get('dateRange') || '30days';
    const type = searchParams.get('type') || 'metrics';

    let data;

    switch (type) {
        case 'metrics':
            data =
                mockAnalyticsMetrics[
                    dateRange as keyof typeof mockAnalyticsMetrics
                ];
            break;
        case 'conversion':
            data =
                mockConversionData[
                    dateRange as keyof typeof mockConversionData
                ];
            break;
        case 'engagement':
            data =
                mockEngagementData[
                    dateRange as keyof typeof mockEngagementData
                ];
            break;
        default:
            return NextResponse.json(
                { error: 'Invalid type parameter' },
                { status: 400 },
            );
    }

    if (!data) {
        return NextResponse.json(
            { error: 'Invalid parameters' },
            { status: 400 },
        );
    }

    return NextResponse.json(data);
}
