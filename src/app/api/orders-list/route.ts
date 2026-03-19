import { NextResponse } from 'next/server';
import { Order } from '@/types';

const mockOrders: Order[] = [
    {
        id: 'ORD-001',
        customer: 'Alice Johnson',
        email: 'alice@example.com',
        product: 'Premium Subscription',
        amount: 99.99,
        status: 'delivered',
        date: '2024-03-15',
    },
    {
        id: 'ORD-002',
        customer: 'Bob Smith',
        email: 'bob@example.com',
        product: 'Basic Package',
        amount: 49.99,
        status: 'shipped',
        date: '2024-03-16',
    },
    {
        id: 'ORD-003',
        customer: 'Carol Williams',
        email: 'carol@example.com',
        product: 'Enterprise License',
        amount: 299.99,
        status: 'processing',
        date: '2024-03-17',
    },
    {
        id: 'ORD-004',
        customer: 'David Brown',
        email: 'david@example.com',
        product: 'Premium Subscription',
        amount: 99.99,
        status: 'pending',
        date: '2024-03-18',
    },
    {
        id: 'ORD-005',
        customer: 'Emma Davis',
        email: 'emma@example.com',
        product: 'Add-on Feature',
        amount: 19.99,
        status: 'delivered',
        date: '2024-03-14',
    },
    {
        id: 'ORD-006',
        customer: 'Frank Miller',
        email: 'frank@example.com',
        product: 'Basic Package',
        amount: 49.99,
        status: 'cancelled',
        date: '2024-03-13',
    },
    {
        id: 'ORD-007',
        customer: 'Grace Wilson',
        email: 'grace@example.com',
        product: 'Enterprise License',
        amount: 299.99,
        status: 'shipped',
        date: '2024-03-16',
    },
    {
        id: 'ORD-008',
        customer: 'Henry Taylor',
        email: 'henry@example.com',
        product: 'Premium Subscription',
        amount: 99.99,
        status: 'processing',
        date: '2024-03-17',
    },
    {
        id: 'ORD-009',
        customer: 'Ivy Chen',
        email: 'ivy@example.com',
        product: 'Basic Package',
        amount: 49.99,
        status: 'pending',
        date: '2024-03-18',
    },
    {
        id: 'ORD-010',
        customer: 'Jack Martin',
        email: 'jack@example.com',
        product: 'Add-on Feature',
        amount: 19.99,
        status: 'delivered',
        date: '2024-03-15',
    },
];

export async function GET() {
    return NextResponse.json(mockOrders);
}

export async function PATCH(request: Request) {
    const body = await request.json();
    const orderIndex = mockOrders.findIndex(
        (o) => o.id === body.id || o.id === request.url.split('/').pop(),
    );
    if (orderIndex !== -1) {
        mockOrders[orderIndex] = { ...mockOrders[orderIndex], ...body };
        return NextResponse.json(mockOrders[orderIndex]);
    }
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
}
