import { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  iconBgColor?: string;
  iconColor?: string;
}

export default function KPICard({
  title,
  value,
  icon: Icon,
  trend,
  iconBgColor = "bg-blue-100",
  iconColor = "text-blue-600",
}: KPICardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
          {trend && (
            <div className="flex items-center gap-1">
              <span
                className={`text-sm font-medium ${
                  trend.isPositive ? "text-green-600" : "text-red-600"
                }`}
              >
                {trend.isPositive ? "↑" : "↓"} {trend.value}
              </span>
              <span className="text-xs text-gray-500">vs mes anterior</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${iconBgColor}`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
      </div>
    </div>
  );
}
