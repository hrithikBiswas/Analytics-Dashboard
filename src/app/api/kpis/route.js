import { NextResponse } from 'next/server';
import { fetchKPIs } from '../../../lib/utils';
// import { fetchKPIs } from '@/lib/utils';

export async function GET(_request) {
    try {
        const kpis = await fetchKPIs();

        if (!kpis || typeof kpis !== 'object') {
            throw new Error('Invalid KPI data structure');
        }

        return NextResponse.json({
            success: true,
            data: kpis,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error('Error fetching KPIs:', error);

        return NextResponse.json(
            {
                success: false,
                error: {
                    message: error.message || 'Failed to fetch KPIs',
                    code: 'KPI_FETCH_ERROR',
                },
                data: null,
            },
            { status: 500 },
        );
    }
}
