import { NextResponse } from 'next/server';
import { User } from '@/types';

const mockUsers: User[] = [
    {
        id: '1',
        name: 'Alice Johnson',
        email: 'alice@example.com',
        role: 'admin',
        status: 'active',
        avatar: 'AJ',
        createdAt: '2024-01-15',
        lastActive: '2024-03-18',
    },
    {
        id: '2',
        name: 'Bob Smith',
        email: 'bob@example.com',
        role: 'manager',
        status: 'active',
        avatar: 'BS',
        createdAt: '2024-02-20',
        lastActive: '2024-03-17',
    },
    {
        id: '3',
        name: 'Carol Williams',
        email: 'carol@example.com',
        role: 'user',
        status: 'active',
        avatar: 'CW',
        createdAt: '2024-01-25',
        lastActive: '2024-03-18',
    },
    {
        id: '4',
        name: 'David Brown',
        email: 'david@example.com',
        role: 'user',
        status: 'inactive',
        avatar: 'DB',
        createdAt: '2023-11-10',
        lastActive: '2024-02-28',
    },
    {
        id: '5',
        name: 'Emma Davis',
        email: 'emma@example.com',
        role: 'user',
        status: 'pending',
        avatar: 'ED',
        createdAt: '2024-03-01',
        lastActive: '2024-03-15',
    },
    {
        id: '6',
        name: 'Frank Miller',
        email: 'frank@example.com',
        role: 'manager',
        status: 'active',
        avatar: 'FM',
        createdAt: '2023-12-05',
        lastActive: '2024-03-18',
    },
    {
        id: '7',
        name: 'Grace Wilson',
        email: 'grace@example.com',
        role: 'guest',
        status: 'active',
        avatar: 'GW',
        createdAt: '2024-02-28',
        lastActive: '2024-03-16',
    },
    {
        id: '8',
        name: 'Henry Taylor',
        email: 'henry@example.com',
        role: 'user',
        status: 'active',
        avatar: 'HT',
        createdAt: '2024-01-08',
        lastActive: '2024-03-17',
    },
];

export async function GET() {
    return NextResponse.json(mockUsers);
}

export async function POST(request: Request) {
    const body = await request.json();
    const newUser: User = {
        id: String(mockUsers.length + 1),
        ...body,
        createdAt: new Date().toISOString().split('T')[0],
        lastActive: new Date().toISOString().split('T')[0],
    };
    mockUsers.push(newUser);
    return NextResponse.json(newUser, { status: 201 });
}
