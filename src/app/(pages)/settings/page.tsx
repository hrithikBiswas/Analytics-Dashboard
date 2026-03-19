'use client';

import React, { useState } from 'react';
import {
    User,
    Bell,
    Shield,
    Palette,
    Globe,
    Smartphone,
    Key,
    Save,
    Check,
} from 'lucide-react';
import { useTheme } from 'next-themes';

type SettingsTab =
    | 'profile'
    | 'notifications'
    | 'security'
    | 'appearance'
    | 'integrations';

interface ToggleSwitchProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label: string;
    description?: string;
}

function ToggleSwitch({
    checked,
    onChange,
    label,
    description,
}: ToggleSwitchProps) {
    return (
        <div className="flex items-start justify-between">
            <div>
                <p className="font-medium text-gray-900 dark:text-white">
                    {label}
                </p>
                {description && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {description}
                    </p>
                )}
            </div>
            <button
                onClick={() => onChange(!checked)}
                className={`relative w-11 h-6 rounded-full transition-colors ${
                    checked ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}
            >
                <span
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        checked ? 'translate-x-5' : 'translate-x-0'
                    }`}
                ></span>
            </button>
        </div>
    );
}

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
    const [saved, setSaved] = useState(false);
    const { theme, setTheme } = useTheme();

    const [profileData, setProfileData] = useState({
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'Administrator',
        company: 'Acme Corporation',
        timezone: 'America/New_York',
    });

    const [notifications, setNotifications] = useState({
        emailNotifications: true,
        pushNotifications: true,
        orderUpdates: true,
        marketingEmails: false,
        securityAlerts: true,
        weeklyReport: true,
    });

    const tabs = [
        { id: 'profile' as const, label: 'Profile', icon: User },
        { id: 'notifications' as const, label: 'Notifications', icon: Bell },
        { id: 'security' as const, label: 'Security', icon: Shield },
        { id: 'appearance' as const, label: 'Appearance', icon: Palette },
        { id: 'integrations' as const, label: 'Integrations', icon: Globe },
    ];

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="mx-auto space-y-6">
            <div className="animate-fade-in">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                    Settings
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Manage your account settings and preferences.
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-64 shrink-0">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden sticky top-4">
                        <nav className="p-2">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                            activeTab === tab.id
                                                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                        }`}
                                    >
                                        <Icon className="h-5 w-5" />
                                        <span className="font-medium">
                                            {tab.label}
                                        </span>
                                    </button>
                                );
                            })}
                        </nav>
                    </div>
                </div>

                <div className="flex-1">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                        {activeTab === 'profile' && (
                            <div className="p-6">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                                    Profile Settings
                                </h2>
                                <div className="space-y-6">
                                    <div className="flex items-center gap-6">
                                        <div className="w-20 h-20 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shrink-0">
                                            <span className="text-white text-2xl font-bold">
                                                AU
                                            </span>
                                        </div>
                                        <div>
                                            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium text-sm">
                                                Change Photo
                                            </button>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                                JPG, PNG or GIF. Max 2MB.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                value={profileData.name}
                                                onChange={(e) =>
                                                    setProfileData({
                                                        ...profileData,
                                                        name: e.target.value,
                                                    })
                                                }
                                                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                value={profileData.email}
                                                onChange={(e) =>
                                                    setProfileData({
                                                        ...profileData,
                                                        email: e.target.value,
                                                    })
                                                }
                                                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Role
                                            </label>
                                            <input
                                                type="text"
                                                value={profileData.role}
                                                disabled
                                                className="w-full px-4 py-2.5 bg-gray-100 dark:bg-gray-600 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 cursor-not-allowed"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Company
                                            </label>
                                            <input
                                                type="text"
                                                value={profileData.company}
                                                onChange={(e) =>
                                                    setProfileData({
                                                        ...profileData,
                                                        company: e.target.value,
                                                    })
                                                }
                                                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Timezone
                                        </label>
                                        <select
                                            value={profileData.timezone}
                                            onChange={(e) =>
                                                setProfileData({
                                                    ...profileData,
                                                    timezone: e.target.value,
                                                })
                                            }
                                            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                                        >
                                            <option value="America/New_York">
                                                Eastern Time (ET)
                                            </option>
                                            <option value="America/Chicago">
                                                Central Time (CT)
                                            </option>
                                            <option value="America/Denver">
                                                Mountain Time (MT)
                                            </option>
                                            <option value="America/Los_Angeles">
                                                Pacific Time (PT)
                                            </option>
                                            <option value="Europe/London">
                                                GMT
                                            </option>
                                            <option value="Europe/Paris">
                                                CET
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'notifications' && (
                            <div className="p-6">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                                    Notification Preferences
                                </h2>
                                <div className="space-y-6">
                                    <div className="pb-6 border-b border-gray-200 dark:border-gray-700">
                                        <h3 className="font-medium text-gray-900 dark:text-white mb-4">
                                            Notification Channels
                                        </h3>
                                        <div className="space-y-4">
                                            <ToggleSwitch
                                                checked={
                                                    notifications.emailNotifications
                                                }
                                                onChange={(checked) =>
                                                    setNotifications({
                                                        ...notifications,
                                                        emailNotifications:
                                                            checked,
                                                    })
                                                }
                                                label="Email Notifications"
                                                description="Receive notifications via email"
                                            />
                                            <ToggleSwitch
                                                checked={
                                                    notifications.pushNotifications
                                                }
                                                onChange={(checked) =>
                                                    setNotifications({
                                                        ...notifications,
                                                        pushNotifications:
                                                            checked,
                                                    })
                                                }
                                                label="Push Notifications"
                                                description="Receive push notifications in your browser"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="font-medium text-gray-900 dark:text-white mb-4">
                                            Notification Types
                                        </h3>
                                        <div className="space-y-4">
                                            <ToggleSwitch
                                                checked={
                                                    notifications.orderUpdates
                                                }
                                                onChange={(checked) =>
                                                    setNotifications({
                                                        ...notifications,
                                                        orderUpdates: checked,
                                                    })
                                                }
                                                label="Order Updates"
                                                description="Get notified when orders are placed or updated"
                                            />
                                            <ToggleSwitch
                                                checked={
                                                    notifications.marketingEmails
                                                }
                                                onChange={(checked) =>
                                                    setNotifications({
                                                        ...notifications,
                                                        marketingEmails:
                                                            checked,
                                                    })
                                                }
                                                label="Marketing Emails"
                                                description="Receive promotional content and updates"
                                            />
                                            <ToggleSwitch
                                                checked={
                                                    notifications.securityAlerts
                                                }
                                                onChange={(checked) =>
                                                    setNotifications({
                                                        ...notifications,
                                                        securityAlerts: checked,
                                                    })
                                                }
                                                label="Security Alerts"
                                                description="Important security notifications"
                                            />
                                            <ToggleSwitch
                                                checked={
                                                    notifications.weeklyReport
                                                }
                                                onChange={(checked) =>
                                                    setNotifications({
                                                        ...notifications,
                                                        weeklyReport: checked,
                                                    })
                                                }
                                                label="Weekly Report"
                                                description="Receive a weekly summary of your analytics"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'security' && (
                            <div className="p-6">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                                    Security Settings
                                </h2>
                                <div className="space-y-6">
                                    <div className="pb-6 border-b border-gray-200 dark:border-gray-700">
                                        <h3 className="font-medium text-gray-900 dark:text-white mb-4">
                                            Password
                                        </h3>
                                        <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium">
                                            <Key className="h-4 w-4" />
                                            Change Password
                                        </button>
                                    </div>

                                    <div className="pb-6 border-b border-gray-200 dark:border-gray-700">
                                        <h3 className="font-medium text-gray-900 dark:text-white mb-4">
                                            Two-Factor Authentication
                                        </h3>
                                        <ToggleSwitch
                                            checked={true}
                                            onChange={() => {}}
                                            label="Enable 2FA"
                                            description="Add an extra layer of security to your account"
                                        />
                                    </div>

                                    <div>
                                        <h3 className="font-medium text-gray-900 dark:text-white mb-4">
                                            Active Sessions
                                        </h3>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                                <div className="flex items-center gap-3">
                                                    <Smartphone className="h-5 w-5 text-gray-500" />
                                                    <div>
                                                        <p className="font-medium text-gray-900 dark:text-white">
                                                            Current Session
                                                        </p>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                                            Chrome on macOS
                                                        </p>
                                                    </div>
                                                </div>
                                                <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                                                    Active now
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                                <div className="flex items-center gap-3">
                                                    <Globe className="h-5 w-5 text-gray-500" />
                                                    <div>
                                                        <p className="font-medium text-gray-900 dark:text-white">
                                                            Previous Session
                                                        </p>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                                            Safari on iPhone
                                                        </p>
                                                    </div>
                                                </div>
                                                <button className="text-sm text-red-600 dark:text-red-400 hover:underline">
                                                    Revoke
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'appearance' && (
                            <div className="p-6">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                                    Appearance Settings
                                </h2>
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="font-medium text-gray-900 dark:text-white mb-4">
                                            Theme
                                        </h3>
                                        <div className="grid grid-cols-3 gap-4">
                                            <button
                                                onClick={() =>
                                                    setTheme('light')
                                                }
                                                className={`p-4 rounded-xl border-2 transition-colors ${
                                                    theme === 'light'
                                                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                                }`}
                                            >
                                                <div className="w-full h-20 bg-white border border-gray-200 rounded-lg mb-3 flex items-center justify-center">
                                                    <div className="w-8 h-8 bg-blue-500 rounded"></div>
                                                </div>
                                                <p className="font-medium text-gray-900 dark:text-white text-center">
                                                    Light
                                                </p>
                                            </button>
                                            <button
                                                onClick={() => setTheme('dark')}
                                                className={`p-4 rounded-xl border-2 transition-colors ${
                                                    theme === 'dark'
                                                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                                }`}
                                            >
                                                <div className="w-full h-20 bg-gray-800 border border-gray-700 rounded-lg mb-3 flex items-center justify-center">
                                                    <div className="w-8 h-8 bg-blue-600 rounded"></div>
                                                </div>
                                                <p className="font-medium text-gray-900 dark:text-white text-center">
                                                    Dark
                                                </p>
                                            </button>
                                            <button
                                                onClick={() =>
                                                    setTheme('system')
                                                }
                                                className={`p-4 rounded-xl border-2 transition-colors ${
                                                    theme === 'system'
                                                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                                }`}
                                            >
                                                <div className="w-full h-20 bg-linear-to-r from-white to-gray-800 border border-gray-200 rounded-lg mb-3 flex items-center justify-center">
                                                    <div className="w-8 h-8 bg-linear-to-r from-blue-500 to-purple-500 rounded"></div>
                                                </div>
                                                <p className="font-medium text-gray-900 dark:text-white text-center">
                                                    System
                                                </p>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                                        <h3 className="font-medium text-gray-900 dark:text-white mb-4">
                                            Compact Mode
                                        </h3>
                                        <ToggleSwitch
                                            checked={false}
                                            onChange={() => {}}
                                            label="Enable Compact Mode"
                                            description="Reduce spacing for a denser layout"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'integrations' && (
                            <div className="p-6">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                                    Connected Apps
                                </h2>
                                <div className="space-y-4">
                                    {[
                                        {
                                            name: 'Google Analytics',
                                            description:
                                                'Track website traffic and user behavior',
                                            connected: true,
                                        },
                                        {
                                            name: 'Slack',
                                            description:
                                                'Get notifications in your Slack workspace',
                                            connected: true,
                                        },
                                        {
                                            name: 'Stripe',
                                            description:
                                                'Process payments and manage subscriptions',
                                            connected: false,
                                        },
                                        {
                                            name: 'Mailchimp',
                                            description:
                                                'Send marketing emails to your users',
                                            connected: false,
                                        },
                                    ].map((app) => (
                                        <div
                                            key={app.name}
                                            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                                                    <Globe className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-white">
                                                        {app.name}
                                                    </p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        {app.description}
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                                                    app.connected
                                                        ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50'
                                                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                                                }`}
                                            >
                                                {app.connected
                                                    ? 'Disconnect'
                                                    : 'Connect'}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30">
                            <button
                                onClick={handleSave}
                                className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                            >
                                {saved ? (
                                    <>
                                        <Check className="h-4 w-4" />
                                        Saved
                                    </>
                                ) : (
                                    <>
                                        <Save className="h-4 w-4" />
                                        Save Changes
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
