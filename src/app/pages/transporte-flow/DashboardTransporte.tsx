import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Package,
  FileText,
  MapPin,
  Truck,
  DollarSign,
  CheckCircle,
  Plus,
  ArrowRight,
  AlertTriangle,
  TrendingUp,
  Clock
} from 'lucide-react';
import { useTransport } from '../../context/TransportContext';

export default function DashboardTransporte() {
  const navigate = useNavigate();
  const {  pedidos,
    ordenes,
    remesas,
    manifiestos,
    anticipos,
    cumplidos,
    vehiculos
  } = useTransport();

  // Estadísticas
  const stats = {
    pedidosPendientes: pedidos.filter(p => p.estado === 'pendiente').length,
    viajesEnCurso: ordenes.filter(o => o.estado === 'en_proceso').length,
    viajesCumplidos: cumplidos.length,
    vehiculosDisponibles: vehiculos.filter(v => v.disponible).length,
    totalVehiculos: vehiculos.length
  };

  const flujoSteps = [
    {
      id: 'pedido',
      label: 'Pedido',
      icon: Package,
      count: pedidos.length,
      color: 'blue',
      bgColor: 'from-blue-50 to-blue-100',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-600',
      route: '/transporte/pedidos',
      createRoute: '/transporte/pedidos/nuevo'
    },
    {
      id: 'orden',
      label: 'Orden de Cargue',
      icon: FileText,
      count: ordenes.length,
      color: 'green',
      bgColor: 'from-green-50 to-green-100',
      borderColor: 'border-green-200',
      textColor: 'text-green-600',
      route: '/transporte/ordenes',
      createRoute: '/transporte/ordenes/nueva'
    },
    {
      id: 'remesa',
      label: 'Remesa',
      icon: MapPin,
      count: remesas.length,
      color: 'purple',
      bgColor: 'from-purple-50 to-purple-100',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-600',
      route: '/transporte/remesas',
      createRoute: '/transporte/remesas/nueva'
    },
    {
      id: 'manifiesto',
      label: 'Manifiesto',
      icon: Truck,
      count: manifiestos.length,
      color: 'orange',
      bgColor: 'from-orange-50 to-orange-100',
      borderColor: 'border-orange-200',
      textColor: 'text-orange-600',
      route: '/transporte/manifiestos',
      createRoute: '/transporte/manifiestos/nuevo'
    },
    {
      id: 'anticipo',
      label: 'Anticipo',
      icon: DollarSign,
      count: anticipos.length,
      color: 'teal',
      bgColor: 'from-teal-50 to-teal-100',
      borderColor: 'border-teal-200',
      textColor: 'text-teal-600',
      route: '/transporte/anticipos',
      createRoute: '/transporte/anticipos/nuevo'
    },
    {
      id: 'cumplido',
      label: 'Cumplido',
      icon: CheckCircle,
      count: cumplidos.length,
      color: 'indigo',
      bgColor: 'from-indigo-50 to-indigo-100',
      borderColor: 'border-indigo-200',
      textColor: 'text-indigo-600',
      route: '/transporte/cumplidos',
      createRoute: '/transporte/cumplidos/nuevo'
    }
  ];

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Dashboard de Transporte</h1>
        <p className="text-sm lg:text-base text-gray-600 mt-1">
          Monitoreo en tiempo real de operaciones logísticas
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border-2 border-blue-200">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Package className="w-5 h-5 text-white" />
            </div>
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl lg:text-3xl font-bold text-blue-900">{stats.pedidosPendientes}</p>
          <p className="text-xs font-medium text-blue-700 mt-1">Pedidos Pendientes</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border-2 border-green-200">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-green-600 rounded-lg">
              <Truck className="w-5 h-5 text-white" />
            </div>
            <Clock className="w-4 h-4 text-green-600 animate-pulse" />
          </div>
          <p className="text-2xl lg:text-3xl font-bold text-green-900">{stats.viajesEnCurso}</p>
          <p className="text-xs font-medium text-green-700 mt-1">Viajes en Curso</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border-2 border-purple-200">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-purple-600 rounded-lg">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
          </div>
          <p className="text-2xl lg:text-3xl font-bold text-purple-900">{stats.viajesCumplidos}</p>
          <p className="text-xs font-medium text-purple-700 mt-1">Viajes Cumplidos</p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border-2 border-orange-200">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-orange-600 rounded-lg">
              <Truck className="w-5 h-5 text-white" />
            </div>
          </div>
          <p className="text-2xl lg:text-3xl font-bold text-orange-900">
            {stats.vehiculosDisponibles}/{stats.totalVehiculos}
          </p>
          <p className="text-xs font-medium text-orange-700 mt-1">Vehículos Disponibles</p>
        </div>
      </div>

      {/* Flujo del Proceso */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Flujo del Proceso Logístico</h2>
          <div className="hidden lg:block text-sm text-gray-500">
            Seguimiento completo del ciclo
          </div>
        </div>

        {/* Desktop - Horizontal Flow */}
        <div className="hidden lg:grid lg:grid-cols-11 gap-2 items-stretch">
          {flujoSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <>
                <button
                  key={step.id}
                  onClick={() => navigate(step.route)}
                  className={`col-span-2 bg-gradient-to-br ${step.bgColor} border-2 ${step.borderColor} rounded-lg p-4 hover:shadow-md transition-all group`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Icon className={`w-8 h-8 ${step.textColor}`} />
                    <span className={`text-3xl font-bold ${step.textColor}`}>{step.count}</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 mb-2">{step.label}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(step.createRoute);
                    }}
                    className={`w-full flex items-center justify-center gap-1 px-2 py-1.5 bg-white border ${step.borderColor} rounded-lg text-xs font-medium ${step.textColor} hover:bg-opacity-90 transition-all`}
                  >
                    <Plus className="w-3 h-3" />
                    Crear
                  </button>
                </button>
                {index < flujoSteps.length - 1 && (
                  <div key={`arrow-${index}`} className="col-span-1 flex items-center justify-center">
                    <ArrowRight className="w-6 h-6 text-gray-400" />
                  </div>
                )}
              </>
            );
          })}
        </div>

        {/* Mobile - Vertical Flow */}
        <div className="lg:hidden space-y-3">
          {flujoSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.id}>
                <button
                  onClick={() => navigate(step.route)}
                  className={`w-full bg-gradient-to-br ${step.bgColor} border-2 ${step.borderColor} rounded-lg p-4 hover:shadow-md transition-all`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Icon className={`w-8 h-8 ${step.textColor}`} />
                      <div className="text-left">
                        <p className="text-sm font-semibold text-gray-900">{step.label}</p>
                        <p className={`text-2xl font-bold ${step.textColor}`}>{step.count}</p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(step.createRoute);
                      }}
                      className={`flex items-center gap-1 px-3 py-2 bg-white border ${step.borderColor} rounded-lg text-xs font-medium ${step.textColor}`}
                    >
                      <Plus className="w-4 h-4" />
                      Crear
                    </button>
                  </div>
                </button>
                {index < flujoSteps.length - 1 && (
                  <div className="flex items-center justify-center py-1">
                    <ArrowRight className="w-5 h-5 text-gray-400 rotate-90" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Pedidos Pendientes de Asignación */}
      {stats.pedidosPendientes > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              Pedidos Pendientes de Asignación
            </h2>
            <button
              onClick={() => navigate('/transporte/ordenes/nueva')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden lg:inline">Crear Orden</span>
              <span className="lg:hidden">Crear</span>
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {pedidos
              .filter(p => p.estado === 'pendiente')
              .slice(0, 4)
              .map((pedido) => (
                <div
                  key={pedido.id}
                  className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-bold text-gray-900">{pedido.numero}</p>
                      <p className="text-sm text-gray-600">{pedido.cliente}</p>
                    </div>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                      Pendiente
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <MapPin className="w-3 h-3" />
                    <span>
                      {pedido.origen} → {pedido.destino}
                    </span>
                  </div>
                  <div className="mt-2 pt-2 border-t border-yellow-200 flex items-center justify-between text-xs">
                    <span className="text-gray-600">{pedido.peso.toLocaleString()} kg</span>
                    <button
                      onClick={() => navigate(`/transporte/ordenes/nueva?pedidoId=${pedido.id}`)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                    >
                      Asignar Vehículo
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Alertas del Sistema */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-yellow-600" />
          Alertas del Sistema
        </h2>
        <div className="space-y-2">
          {vehiculos.filter(v => v.enMantenimiento).length > 0 && (
            <div className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-yellow-900">Vehículos en mantenimiento</p>
                <p className="text-sm text-yellow-700">
                  {vehiculos.filter(v => v.enMantenimiento).length} vehículos no disponibles
                </p>
              </div>
            </div>
          )}
          {vehiculos.filter(v => v.documentosVencidos).length > 0 && (
            <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-red-900">Documentos vencidos</p>
                <p className="text-sm text-red-700">
                  {vehiculos.filter(v => v.documentosVencidos).length} vehículos con documentación vencida
                </p>
              </div>
            </div>
          )}
          {stats.pedidosPendientes > 3 && (
            <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-blue-900">Muchos pedidos pendientes</p>
                <p className="text-sm text-blue-700">
                  Hay {stats.pedidosPendientes} pedidos esperando asignación de vehículo
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
