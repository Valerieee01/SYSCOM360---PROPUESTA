import { Plus, Search, Filter, Eye } from "lucide-react";

export default function OrdenCargue() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Órdenes de Cargue
          </h1>
          <p className="text-gray-600">
            Gestión de órdenes de cargue y asignación de vehículos
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5" />
          Nueva Orden
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total", count: 32 },
          { label: "Pendientes", count: 12 },
          { label: "Asignadas", count: 15 },
          { label: "Completadas", count: 5 },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white p-4 rounded-lg border border-gray-200"
          >
            <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900">{stat.count}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar órdenes..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-5 h-5" />
            Filtros
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">
                ID Orden
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">
                Pedido
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">
                Vehículo
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">
                Conductor
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">
                Fecha Cargue
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">
                Estado
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                id: "ORD-001",
                pedido: "PED-001234",
                vehiculo: "ABC-123",
                conductor: "Juan Pérez",
                fecha: "15/03/2026",
                estado: "Pendiente",
              },
              {
                id: "ORD-002",
                pedido: "PED-001235",
                vehiculo: "DEF-456",
                conductor: "María López",
                fecha: "15/03/2026",
                estado: "Asignada",
              },
              {
                id: "ORD-003",
                pedido: "PED-001236",
                vehiculo: "GHI-789",
                conductor: "Carlos Gómez",
                fecha: "14/03/2026",
                estado: "Completada",
              },
            ].map((orden) => (
              <tr
                key={orden.id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="py-4 px-6 font-medium text-gray-900">
                  {orden.id}
                </td>
                <td className="py-4 px-6 text-sm text-gray-600">
                  {orden.pedido}
                </td>
                <td className="py-4 px-6 text-sm text-gray-600">
                  {orden.vehiculo}
                </td>
                <td className="py-4 px-6 text-sm text-gray-600">
                  {orden.conductor}
                </td>
                <td className="py-4 px-6 text-sm text-gray-600">
                  {orden.fecha}
                </td>
                <td className="py-4 px-6">
                  <span
                    className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      orden.estado === "Completada"
                        ? "bg-green-100 text-green-700"
                        : orden.estado === "Asignada"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {orden.estado}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
