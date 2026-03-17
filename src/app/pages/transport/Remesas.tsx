import { Plus, Search, MapPin } from "lucide-react";

export default function Remesas() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Gestión de Remesas
          </h1>
          <p className="text-gray-600">Control de remesas y seguimiento de carga</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5" />
          Nueva Remesa
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Activas", count: 32, color: "bg-blue-100" },
          { label: "En Tránsito", count: 18, color: "bg-purple-100" },
          { label: "Entregadas", count: 156, color: "bg-green-100" },
          { label: "Con Novedad", count: 2, color: "bg-red-100" },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`p-4 rounded-lg border border-gray-200 ${stat.color}`}
          >
            <p className="text-sm text-gray-700 mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900">{stat.count}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar remesas..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">
                Nº Remesa
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">
                Placa
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">
                Conductor
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">
                Ruta
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">
                Valor
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">
                Estado
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                id: "REM-001",
                placa: "ABC-123",
                conductor: "Juan Pérez",
                ruta: "Bogotá - Medellín",
                valor: "$2,500,000",
                estado: "En Tránsito",
              },
              {
                id: "REM-002",
                placa: "DEF-456",
                conductor: "María López",
                ruta: "Cali - Barranquilla",
                valor: "$3,200,000",
                estado: "Activa",
              },
              {
                id: "REM-003",
                placa: "GHI-789",
                conductor: "Carlos Gómez",
                ruta: "Medellín - Pereira",
                valor: "$1,800,000",
                estado: "Entregada",
              },
            ].map((remesa) => (
              <tr
                key={remesa.id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="py-4 px-6 font-medium text-gray-900">
                  {remesa.id}
                </td>
                <td className="py-4 px-6 text-sm text-gray-600">
                  {remesa.placa}
                </td>
                <td className="py-4 px-6 text-sm text-gray-600">
                  {remesa.conductor}
                </td>
                <td className="py-4 px-6 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    {remesa.ruta}
                  </div>
                </td>
                <td className="py-4 px-6 text-sm font-medium text-gray-900">
                  {remesa.valor}
                </td>
                <td className="py-4 px-6">
                  <span
                    className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      remesa.estado === "Entregada"
                        ? "bg-green-100 text-green-700"
                        : remesa.estado === "En Tránsito"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {remesa.estado}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
