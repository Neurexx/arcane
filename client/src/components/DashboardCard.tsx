import React from 'react';
import { LucideIcon } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  bgColor: string;
}

const DashboardCard = ({ title, value, icon: Icon, bgColor }: DashboardCardProps) => {
  return (
    <div className={`${bgColor} rounded-lg p-6 text-white shadow-lg`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-80">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
        <Icon className="w-8 h-8 opacity-80" />
      </div>
    </div>
  );
};

export default DashboardCard;