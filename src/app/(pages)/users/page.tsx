'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
    Search,
    Plus,
    Edit2,
    Trash2,
    MoreVertical,
    Shield,
    UserCheck,
    UserX,
} from 'lucide-react';
import { usersAPI } from '@/lib/api';
import { User } from '@/types';

const roleColors: Record<User['role'], string> = {
    admin: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
    manager: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
    user: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
    guest: 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400',
};

const statusColors: Record<User['status'], string> = {
    active: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
    inactive: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
    pending:
        'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
};

const roleIcons: Record<User['role'], React.ReactNode> = {
    admin: <Shield className="h-3.5 w-3.5" />,
    manager: <Shield className="h-3.5 w-3.5" />,
    user: <UserCheck className="h-3.5 w-3.5" />,
    guest: <UserX className="h-3.5 w-3.5" />,
};

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState<User['role'] | 'all'>('all');
    const [statusFilter, setStatusFilter] = useState<User['status'] | 'all'>(
        'all',
    );
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const fetchUsers = useCallback(async () => {
        try {
            setIsLoading(true);
            const data = await usersAPI.getUsers();
            setUsers(data);
            setFilteredUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    useEffect(() => {
        let result = users;

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                (user) =>
                    user.name.toLowerCase().includes(query) ||
                    user.email.toLowerCase().includes(query),
            );
        }

        if (roleFilter !== 'all') {
            result = result.filter((user) => user.role === roleFilter);
        }

        if (statusFilter !== 'all') {
            result = result.filter((user) => user.status === statusFilter);
        }

        setFilteredUsers(result);
    }, [users, searchQuery, roleFilter, statusFilter]);

    const handleDeleteUser = async (id: string) => {
        if (confirm('Are you sure you want to delete this user?')) {
            try {
                await usersAPI.deleteUser(id);
                setUsers(users.filter((u) => u.id !== id));
                setOpenDropdown(null);
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    const handleAddUser = async (userData: Partial<User>) => {
        try {
            const newUser = await usersAPI.createUser(userData);
            setUsers([...users, newUser]);
            setShowAddModal(false);
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    const handleUpdateUser = async (userData: Partial<User>) => {
        if (!editingUser) return;
        try {
            const updated = await usersAPI.updateUser(editingUser.id, userData);
            setUsers(users.map((u) => (u.id === editingUser.id ? updated : u)));
            setEditingUser(null);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <div className="mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                        Users
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Manage your users and their roles.
                    </p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                >
                    <Plus className="h-4 w-4" />
                    Add User
                </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                        />
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <select
                            value={roleFilter}
                            onChange={(e) =>
                                setRoleFilter(
                                    e.target.value as User['role'] | 'all',
                                )
                            }
                            className="px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                        >
                            <option value="all">All Roles</option>
                            <option value="admin">Admin</option>
                            <option value="manager">Manager</option>
                            <option value="user">User</option>
                            <option value="guest">Guest</option>
                        </select>
                        <select
                            value={statusFilter}
                            onChange={(e) =>
                                setStatusFilter(
                                    e.target.value as User['status'] | 'all',
                                )
                            }
                            className="px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                        >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="pending">Pending</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-300">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700/50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                    User
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                    Role
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                    Joined
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                    Last Active
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {isLoading ? (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-6 py-12 text-center"
                                    >
                                        <div className="flex justify-center">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredUsers.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-6 py-12 text-center text-gray-500 dark:text-gray-400"
                                    >
                                        No users found matching your criteria.
                                    </td>
                                </tr>
                            ) : (
                                filteredUsers.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shrink-0">
                                                    <span className="text-white text-sm font-semibold">
                                                        {user.avatar ||
                                                            user.name.charAt(0)}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-white">
                                                        {user.name}
                                                    </p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        {user.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${roleColors[user.role]}`}
                                            >
                                                {roleIcons[user.role]}
                                                {user.role
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    user.role.slice(1)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[user.status]}`}
                                            >
                                                <span
                                                    className={`w-1.5 h-1.5 rounded-full ${
                                                        user.status === 'active'
                                                            ? 'bg-green-500'
                                                            : user.status ===
                                                                'inactive'
                                                              ? 'bg-red-500'
                                                              : 'bg-yellow-500'
                                                    }`}
                                                ></span>
                                                {user.status
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    user.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                                {user.createdAt}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                                {user.lastActive}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="relative flex justify-end">
                                                <button
                                                    onClick={() =>
                                                        setOpenDropdown(
                                                            openDropdown ===
                                                                user.id
                                                                ? null
                                                                : user.id,
                                                        )
                                                    }
                                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                                >
                                                    <MoreVertical className="h-4 w-4 text-gray-500" />
                                                </button>
                                                {openDropdown === user.id && (
                                                    <>
                                                        <div
                                                            className="fixed inset-0 z-10"
                                                            onClick={() =>
                                                                setOpenDropdown(
                                                                    null,
                                                                )
                                                            }
                                                        ></div>
                                                        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-20 animate-slide-in">
                                                            <div className="py-1">
                                                                <button
                                                                    onClick={() => {
                                                                        setEditingUser(
                                                                            user,
                                                                        );
                                                                        setOpenDropdown(
                                                                            null,
                                                                        );
                                                                    }}
                                                                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                                                >
                                                                    <Edit2 className="h-4 w-4" />
                                                                    Edit
                                                                </button>
                                                                <button
                                                                    onClick={() =>
                                                                        handleDeleteUser(
                                                                            user.id,
                                                                        )
                                                                    }
                                                                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {(showAddModal || editingUser) && (
                <UserModal
                    user={editingUser}
                    onClose={() => {
                        setShowAddModal(false);
                        setEditingUser(null);
                    }}
                    onSubmit={editingUser ? handleUpdateUser : handleAddUser}
                />
            )}
        </div>
    );
}

interface UserModalProps {
    user: User | null;
    onClose: () => void;
    onSubmit: (data: Partial<User>) => void;
}

function UserModal({ user, onClose, onSubmit }: UserModalProps) {
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        role: user?.role || ('user' as User['role']),
        status: user?.status || ('pending' as User['status']),
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <>
            <div
                className="fixed inset-0 bg-black/50 z-40"
                onClick={onClose}
            ></div>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md animate-scale-in">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {user ? 'Edit User' : 'Add New User'}
                        </h2>
                    </div>
                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Name
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        name: e.target.value,
                                    })
                                }
                                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        email: e.target.value,
                                    })
                                }
                                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Role
                            </label>
                            <select
                                value={formData.role}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        role: e.target.value as User['role'],
                                    })
                                }
                                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                            >
                                <option value="admin">Admin</option>
                                <option value="manager">Manager</option>
                                <option value="user">User</option>
                                <option value="guest">Guest</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Status
                            </label>
                            <select
                                value={formData.status}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        status: e.target
                                            .value as User['status'],
                                    })
                                }
                                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                                <option value="pending">Pending</option>
                            </select>
                        </div>
                        <div className="flex gap-3 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                            >
                                {user ? 'Save Changes' : 'Add User'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
