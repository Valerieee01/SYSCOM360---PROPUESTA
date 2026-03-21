import { Link } from "react-router";
import {
  Truck,
  Calculator,
  Users,
  Fuel,
  TrendingUp,
  Package,
  FileText,
  AlertCircle,
} from "lucide-react";
import KPICard from "../components/KPICard";

const modules = [
  {
    name: "Transporte",
    description: "Gestión completa de operación logística y RNDC",
    icon: Truck,
    path: "/transporte",
    bgColor: "bg-gradient-to-br from-blue-500 to-blue-600",
    stats: { pedidos: 45, manifiestos: 28, alertas: 3 },
  },
  {
    name: "Contabilidad",
    description: "Control financiero, cartera y facturación electrónica",
    icon: Calculator,
    path: "/contabilidad",
    bgColor: "bg-gradient-to-br from-green-500 to-green-600",
    stats: { facturas: 156, cartera: "$45.2M", pendientes: 12 },
  },
  {
    name: "Nómina",
    description: "Gestión de personal, nómina y seguridad social",
    icon: Users,
    path: "/nomina",
    bgColor: "bg-gradient-to-br from-purple-500 to-purple-600",
    stats: { empleados: 89, nominas: 2, novedades: 5 },
  },
  {
    name: "EDS",
    description: "Operación y administración de estaciones de servicio",
    icon: Fuel,
    path: "/eds",
    bgColor: "bg-gradient-to-br from-orange-500 to-orange-600",
    stats: { ventas: "$12.8M", transacciones: 1250, inventario: "98%" },
  },
];

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Dashboard Principal
        </h1>
        <p className="text-gray-600">
          Bienvenido a SyscomWeb - Sistema de Gestión Empresarial
        </p>
      </div>

      {/* Global KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Ingresos del Mes"
          value="$128.5M"
          icon={TrendingUp}
          trend={{ value: "12.5%", isPositive: true }}
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
        />
        <KPICard
          title="Pedidos Activos"
          value="45"
          icon={Package}
          trend={{ value: "8.2%", isPositive: true }}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
        />
        <KPICard
          title="Facturas Emitidas"
          value="156"
          icon={FileText}
          trend={{ value: "3.1%", isPositive: false }}
          iconBgColor="bg-purple-100"
          iconColor="text-purple-600"
        />
        <KPICard
          title="Alertas Pendientes"
          value="8"
          icon={AlertCircle}
          iconBgColor="bg-red-100"
          iconColor="text-red-600"
        />
      </div>

      {/* Modules Grid */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Módulos del Sistema
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <Link
                key={module.name}
                to={module.path}
                className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
              >
                <div className={`${module.bgColor} p-6`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {module.name}
                      </h3>
                      <p className="text-blue-50 text-sm">
                        {module.description}
                      </p>
                    </div>
                    <Icon className="w-12 h-12 text-white opacity-80" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(module.stats).map(([key, value]) => (
                      <div key={key}>
                        <p className="text-xs text-gray-500 uppercase mb-1">
                          {key}
                        </p>
                        <p className="text-lg font-bold text-gray-900">
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <span className="text-blue-600 text-sm font-medium group-hover:underline">
                      Acceder al módulo →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Actividad Reciente
        </h2>
        <div className="space-y-4">
          {[
            {
              action: "Nuevo pedido creado",
              user: "Juan Pérez",
              time: "Hace 5 minutos",
              module: "Transporte",
            },
            {
              action: "Factura #1245 aprobada",
              user: "María García",
              time: "Hace 15 minutos",
              module: "Contabilidad",
            },
            {
              action: "Nómina procesada",
              user: "Carlos López",
              time: "Hace 1 hora",
              module: "Nómina",
            },
            {
              action: "Manifiesto enviado al RNDC",
              user: "Ana Martínez",
              time: "Hace 2 horas",
              module: "Transporte",
            },
          ].map((activity, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {activity.action}
                </p>
                <p className="text-xs text-gray-500">
                  {activity.user} • {activity.module}
                </p>
              </div>
              <span className="text-xs text-gray-400">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
