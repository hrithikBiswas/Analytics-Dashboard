'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
    FileText,
    Download,
    Plus,
    Calendar,
    Search,
    TrendingUp,
    Users,
    DollarSign,
    Clock,
} from 'lucide-react';
import { reportsAPI } from '@/lib/api';
import { Report } from '@/types';

const typeConfig: Record<
    Report['type'],
    { color: string; bgColor: string; icon: React.ReactNode }
> = {
    revenue: {
        color: 'text-green-700 dark:text-green-300',
        bgColor: 'bg-green-100 dark:bg-green-900/30',
        icon: <DollarSign className="h-4 w-4" />,
    },
    users: {
        color: 'text-blue-700 dark:text-blue-300',
        bgColor: 'bg-blue-100 dark:bg-blue-900/30',
        icon: <Users className="h-4 w-4" />,
    },
    orders: {
        color: 'text-purple-700 dark:text-purple-300',
        bgColor: 'bg-purple-100 dark:bg-purple-900/30',
        icon: <FileText className="h-4 w-4" />,
    },
    performance: {
        color: 'text-orange-700 dark:text-orange-300',
        bgColor: 'bg-orange-100 dark:bg-orange-900/30',
        icon: <TrendingUp className="h-4 w-4" />,
    },
};

export default function ReportsPage() {
    const [reports, setReports] = useState<Report[]>([]);
    const [filteredReports, setFilteredReports] = useState<Report[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [typeFilter, setTypeFilter] = useState<Report['type'] | 'all'>('all');
    const [showGenerateModal, setShowGenerateModal] = useState(false);
    const [generating, setGenerating] = useState(false);

    const fetchReports = useCallback(async () => {
        try {
            setIsLoading(true);
            const data = await reportsAPI.getReports();
            setReports(data);
            setFilteredReports(data);
        } catch (error) {
            console.error('Error fetching reports:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchReports();
    }, [fetchReports]);

    useEffect(() => {
        let result = reports;

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter((report) =>
                report.name.toLowerCase().includes(query),
            );
        }

        if (typeFilter !== 'all') {
            result = result.filter((report) => report.type === typeFilter);
        }

        setFilteredReports(result);
    }, [reports, searchQuery, typeFilter]);

    const handleGenerateReport = async (type: Report['type'], dateRange: string) => {
        try {
            setGenerating(true);
            const newReport = await reportsAPI.generateReport(type, dateRange);
            setReports([newReport, ...reports]);
            setShowGenerateModal(false);
        } catch (error) {
            console.error('Error generating report:', error);
        } finally {
            setGenerating(false);
        }
    };

    const handleDownload = (report: Report) => {
        const link = document.createElement('a');
        link.href = '#';
        link.download = `${report.name}.pdf`;
        link.click();
    };

    return (
        <div className="mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                        Reports
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Generate and download analytics reports.
                    </p>
                </div>
                <button
                    onClick={() => setShowGenerateModal(true)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                >
                    <Plus className="h-4 w-4" />
                    Generate Report
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                            <DollarSign className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {reports.filter((r) => r.type === 'revenue').length}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Revenue Reports
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                            <Users className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {reports.filter((r) => r.type === 'users').length}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                User Reports
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                            <FileText className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {reports.filter((r) => r.type === 'orders').length}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Order Reports
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400">
                            <TrendingUp className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {reports.filter((r) => r.type === 'performance').length}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Performance
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search reports..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                        />
                    </div>
                    <select
                        value={typeFilter}
                        onChange={(e) =>
                            setTypeFilter(e.target.value as Report['type'] | 'all')
                        }
                        className="px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    >
                        <option value="all">All Types</option>
                        <option value="revenue">Revenue</option>
                        <option value="users">Users</option>
                        <option value="orders">Orders</option>
                        <option value="performance">Performance</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {isLoading ? (
                    Array.from({ length: 6 }).map((_, i) => (
                        <div
                            key={i}
                            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 animate-pulse"
                        >
                            <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
                            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                        </div>
                    ))
                ) : filteredReports.length === 0 ? (
                    <div className="col-span-full bg-white dark:bg-gray-800 rounded-xl p-12 shadow-sm border border-gray-200 dark:border-gray-700 text-center">
                        <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-500 dark:text-gray-400">
                            No reports found matching your criteria.
                        </p>
                    </div>
                ) : (
                    filteredReports.map((report) => {
                        const config = typeConfig[report.type];
                        return (
                            <div
                                key={report.id}
                                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-colors duration-300 animate-fade-in"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div
                                        className={`p-2.5 rounded-lg ${config.bgColor} ${config.color}`}
                                    >
                                        {config.icon}
                                    </div>
                                    <span
                                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${config.bgColor} ${config.color}`}
                                    >
                                        {report.type.charAt(0).toUpperCase() +
                                            report.type.slice(1)}
                                    </span>
                                </div>
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                                    {report.name}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                    {report.dateRange}
                                </p>
                                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="h-3.5 w-3.5" />
                                            {report.generatedAt}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="h-3.5 w-3.5" />
                                            {report.size}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => handleDownload(report)}
                                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-blue-600 dark:text-blue-400"
                                        title="Download report"
                                    >
                                        <Download className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {showGenerateModal && (
                <GenerateReportModal
                    onClose={() => setShowGenerateModal(false)}
                    onGenerate={handleGenerateReport}
                    generating={generating}
                />
            )}
        </div>
    );
}

interface GenerateReportModalProps {
    onClose: () => void;
    onGenerate: (type: Report['type'], dateRange: string) => void;
    generating: boolean;
}

function GenerateReportModal({
    onClose,
    onGenerate,
    generating,
}: GenerateReportModalProps) {
    const [type, setType] = useState<Report['type']>('revenue');
    const [dateRange, setDateRange] = useState('Last 30 days');

    const reportTypes: { value: Report['type']; label: string; icon: React.ReactNode }[] = [
        { value: 'revenue', label: 'Revenue Report', icon: <DollarSign className="h-5 w-5" /> },
        { value: 'users', label: 'User Report', icon: <Users className="h-5 w-5" /> },
        { value: 'orders', label: 'Orders Report', icon: <FileText className="h-5 w-5" /> },
        { value: 'performance', label: 'Performance Report', icon: <TrendingUp className="h-5 w-5" /> },
    ];

    const dateRanges = [
        'Last 7 days',
        'Last 30 days',
        'Last 90 days',
        'Last 12 months',
    ];

    return (
        <>
            <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose}></div>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md animate-scale-in">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Generate New Report
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Create a custom analytics report
                        </p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Report Type
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {reportTypes.map((rt) => (
                                    <button
                                        key={rt.value}
                                        onClick={() => setType(rt.value)}
                                        className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-colors ${
                                            type === rt.value
                                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                                                : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                                        }`}
                                    >
                                        {rt.icon}
                                        <span className="text-sm font-medium">
                                            {rt.label}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Date Range
                            </label>
                            <select
                                value={dateRange}
                                onChange={(e) => setDateRange(e.target.value)}
                                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                            >
                                {dateRanges.map((range) => (
                                    <option key={range} value={range}>
                                        {range}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex gap-3">
                        <button
                            onClick={onClose}
                            disabled={generating}
                            className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => onGenerate(type, dateRange)}
                            disabled={generating}
                            className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {generating ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <Plus className="h-4 w-4" />
                                    Generate
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
