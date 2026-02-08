'use client';

import React from 'react';
import { memo } from 'react';
import { formatCurrency, formatNumber, formatPercentage } from '@/lib/utils';
import { TrendingUp, TrendingDown, DollarSign, Users, ShoppingCart, Target } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease';
  icon?: React.ReactNode;
  format?: 'currency' | 'number' | 'percentage';
}

const KPICard: React.FC<KPICardProps> = ({ 
  title, 
  value, 
  change, 
  changeType, 
  icon, 
  format = 'number' 
}) => {
  const formatValue = (val: string | number) => {
    if (typeof val === 'string') return val;
    
    switch (format) {
      case 'currency':
        return formatCurrency(val);
      case 'percentage':
        return formatPercentage(val);
      default:
        return formatNumber(val);
    }
  };

  const isPositive = changeType === 'increase';
  const changeColor = isPositive ? 'text-green-600' : 'text-red-600';
  const bgColor = isPositive ? 'bg-green-50' : 'bg-red-50';

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{formatValue(value)}</p>
          
          <div className={`flex items-center mt-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${bgColor} ${changeColor}`}>
            {isPositive ? (
              <TrendingUp className="w-3 h-3 mr-1" />
            ) : (
              <TrendingDown className="w-3 h-3 mr-1" />
            )}
            {Math.abs(change)}%
          </div>
        </div>
        
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center text-gray-600">
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
};

interface KPIGridProps {
  stats: {
    totalRevenue: number;
    totalUsers: number;
    orders: number;
    conversionRate: number;
  };
}

const MemoizedKPICard = memo(KPICard);
MemoizedKPICard.displayName = 'MemoizedKPICard';

export const KPIGrid: React.FC<KPIGridProps> = memo(({ stats }) => {
  const kpiData = React.useMemo(() => [
    {
      title: 'Total Revenue',
      value: stats.totalRevenue,
      change: 12.5,
      changeType: 'increase' as const,
      icon: <DollarSign className="w-6 h-6" />,
      format: 'currency' as const,
    },
    {
      title: 'Total Users',
      value: stats.totalUsers,
      change: 8.2,
      changeType: 'increase' as const,
      icon: <Users className="w-6 h-6" />,
      format: 'number' as const,
    },
    {
      title: 'Orders',
      value: stats.orders,
      change: -3.1,
      changeType: 'decrease' as const,
      icon: <ShoppingCart className="w-6 h-6" />,
      format: 'number' as const,
    },
    {
      title: 'Conversion Rate',
      value: stats.conversionRate,
      change: 2.4,
      changeType: 'increase' as const,
      icon: <Target className="w-6 h-6" />,
      format: 'percentage' as const,
    },
  ], [stats.totalRevenue, stats.totalUsers, stats.orders, stats.conversionRate]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpiData.map((kpi, index) => (
        <MemoizedKPICard key={index} {...kpi} />
      ))}
    </div>
  );
});

KPIGrid.displayName = 'KPIGrid';