'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
    Search,
    Eye,
    Package,
    Truck,
    CheckCircle,
    XCircle,
    Clock,
    MoreVertical,
} from 'lucide-react';
import { ordersAPI } from '@/lib/api';
import { Order } from '@/types';
import { formatCurrency } from '@/lib/utils';

const statusConfig: Record<
    Order['status'],
    { color: string; bgColor: string; icon: React.ReactNode }
> = {
    pending: {
        color: 'text-yellow-700 dark:text-yellow-300',
        bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
        icon: <Clock className="h-4 w-4" />,
    },
    processing: {
        color: 'text-blue-700 dark:text-blue-300',
        bgColor: 'bg-blue-100 dark:bg-blue-900/30',
        icon: <Package className="h-4 w-4" />,
    },
    shipped: {
        color: 'text-purple-700 dark:text-purple-300',
        bgColor: 'bg-purple-100 dark:bg-purple-900/30',
        icon: <Truck className="h-4 w-4" />,
    },
    delivered: {
        color: 'text-green-700 dark:text-green-300',
        bgColor: 'bg-green-100 dark:bg-green-900/30',
        icon: <CheckCircle className="h-4 w-4" />,
    },
    cancelled: {
        color: 'text-red-700 dark:text-red-300',
        bgColor: 'bg-red-100 dark:bg-red-900/30',
        icon: <XCircle className="h-4 w-4" />,
    },
};

const statusOrder = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<Order['status'] | 'all'>('all');
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const fetchOrders = useCallback(async () => {
        try {
            setIsLoading(true);
            const data = await ordersAPI.getOrders();
            setOrders(data);
            setFilteredOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    useEffect(() => {
        let result = orders;

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                (order) =>
                    order.id.toLowerCase().includes(query) ||
                    order.customer.toLowerCase().includes(query) ||
                    order.email.toLowerCase().includes(query),
            );
        }

        if (statusFilter !== 'all') {
            result = result.filter((order) => order.status === statusFilter);
        }

        setFilteredOrders(result);
    }, [orders, searchQuery, statusFilter]);

    const handleStatusChange = async (orderId: string, newStatus: Order['status']) => {
        try {
            const updated = await ordersAPI.updateOrderStatus(orderId, newStatus);
            setOrders(orders.map((o) => (o.id === orderId ? updated : o)));
            setOpenDropdown(null);
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    const getNextStatus = (currentStatus: Order['status']): Order['status'] | null => {
        const currentIndex = statusOrder.indexOf(currentStatus);
        if (currentIndex < statusOrder.length - 1 && currentIndex >= 0) {
            return statusOrder[currentIndex + 1] as Order['status'];
        }
        return null;
    };

    const totalRevenue = filteredOrders.reduce((sum, order) => sum + order.amount, 0);
    const pendingCount = filteredOrders.filter((o) => o.status === 'pending').length;
    const processingCount = filteredOrders.filter((o) => o.status === 'processing').length;

    return (
        <div className="mx-auto space-y-6">
            <div className="animate-fade-in">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                    Orders
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Manage and track your customer orders.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                        Total Orders
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {filteredOrders.length}
                    </p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                        Total Revenue
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {formatCurrency(totalRevenue)}
                    </p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                        Pending
                    </p>
                    <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                        {pendingCount}
                    </p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                        Processing
                    </p>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {processingCount}
                    </p>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search orders..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                        />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) =>
                            setStatusFilter(e.target.value as Order['status'] | 'all')
                        }
                        className="px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-300">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700/50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                    Order ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                    Customer
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                    Product
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                    Amount
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center">
                                        <div className="flex justify-center">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredOrders.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="px-6 py-12 text-center text-gray-500 dark:text-gray-400"
                                    >
                                        No orders found matching your criteria.
                                    </td>
                                </tr>
                            ) : (
                                filteredOrders.map((order) => {
                                    const status = statusConfig[order.status];
                                    const nextStatus = getNextStatus(order.status);
                                    return (
                                        <tr
                                            key={order.id}
                                            className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                                        >
                                            <td className="px-6 py-4">
                                                <span className="font-mono text-sm font-medium text-gray-900 dark:text-white">
                                                    {order.id}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-white">
                                                        {order.customer}
                                                    </p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        {order.email}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-gray-900 dark:text-white">
                                                    {order.product}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="font-semibold text-gray-900 dark:text-white">
                                                    {formatCurrency(order.amount)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status.bgColor} ${status.color}`}
                                                >
                                                    {status.icon}
                                                    {order.status.charAt(0).toUpperCase() +
                                                        order.status.slice(1)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                                    {order.date}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="relative flex justify-end">
                                                    <button
                                                        onClick={() =>
                                                            setOpenDropdown(
                                                                openDropdown === order.id
                                                                    ? null
                                                                    : order.id,
                                                            )
                                                        }
                                                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                                    >
                                                        <MoreVertical className="h-4 w-4 text-gray-500" />
                                                    </button>
                                                    {openDropdown === order.id && (
                                                        <>
                                                            <div
                                                                className="fixed inset-0 z-10"
                                                                onClick={() =>
                                                                    setOpenDropdown(null)
                                                                }
                                                            ></div>
                                                            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-20 animate-slide-in">
                                                                <div className="py-1">
                                                                    <button
                                                                        onClick={() => {
                                                                            setSelectedOrder(order);
                                                                            setOpenDropdown(null);
                                                                        }}
                                                                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                                                    >
                                                                        <Eye className="h-4 w-4" />
                                                                        View Details
                                                                    </button>
                                                                    {nextStatus && order.status !== 'cancelled' && (
                                                                        <button
                                                                            onClick={() =>
                                                                                handleStatusChange(
                                                                                    order.id,
                                                                                    nextStatus,
                                                                                )
                                                                            }
                                                                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                                                        >
                                                                            Move to{' '}
                                                                            {nextStatus.charAt(0).toUpperCase() +
                                                                                nextStatus.slice(1)}
                                                                        </button>
                                                                    )}
                                                                    {order.status !== 'cancelled' && (
                                                                        <button
                                                                            onClick={() =>
                                                                                handleStatusChange(
                                                                                    order.id,
                                                                                    'cancelled',
                                                                                )
                                                                            }
                                                                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                                                        >
                                                                            <XCircle className="h-4 w-4" />
                                                                            Cancel Order
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {selectedOrder && (
                <OrderDetailModal
                    order={selectedOrder}
                    onClose={() => setSelectedOrder(null)}
                    onStatusChange={handleStatusChange}
                />
            )}
        </div>
    );
}

interface OrderDetailModalProps {
    order: Order;
    onClose: () => void;
    onStatusChange: (id: string, status: Order['status']) => void;
}

function OrderDetailModal({ order, onClose, onStatusChange }: OrderDetailModalProps) {
    const status = statusConfig[order.status];
    const nextStatus = (['pending', 'processing', 'shipped', 'delivered'] as const).includes(
        order.status as 'pending' | 'processing' | 'shipped' | 'delivered',
    )
        ? (['pending', 'processing', 'shipped', 'delivered'][
              ['pending', 'processing', 'shipped', 'delivered'].indexOf(
                  order.status as 'pending' | 'processing' | 'shipped' | 'delivered',
              ) + 1
          ] as Order['status'])
        : null;

    return (
        <>
            <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose}></div>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-lg animate-scale-in">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Order Details
                            </h2>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                            >
                                <XCircle className="h-5 w-5 text-gray-500" />
                            </button>
                        </div>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="font-mono text-lg font-bold text-gray-900 dark:text-white">
                                {order.id}
                            </span>
                            <span
                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${status.bgColor} ${status.color}`}
                            >
                                {status.icon}
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Customer
                                </p>
                                <p className="font-medium text-gray-900 dark:text-white">
                                    {order.customer}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Email
                                </p>
                                <p className="font-medium text-gray-900 dark:text-white">
                                    {order.email}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Product
                                </p>
                                <p className="font-medium text-gray-900 dark:text-white">
                                    {order.product}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Amount
                                </p>
                                <p className="font-bold text-lg text-gray-900 dark:text-white">
                                    {formatCurrency(order.amount)}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Order Date
                                </p>
                                <p className="font-medium text-gray-900 dark:text-white">
                                    {order.date}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex gap-3">
                        {nextStatus && (
                            <button
                                onClick={() => {
                                    onStatusChange(order.id, nextStatus);
                                    onClose();
                                }}
                                className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                            >
                                Mark as {nextStatus.charAt(0).toUpperCase() + nextStatus.slice(1)}
                            </button>
                        )}
                        <button
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
