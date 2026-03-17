import { XCircle, Search, AlertTriangle } from "lucide-react";

export default function Anulaciones() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Anulación de Manifiestos
        </h1>
        <p className="text-gray-600">
          Control y registro de manifiestos anulados
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Anulados", count: 12 },
          { label: "Este Mes", count: 3 },
          { label: "Pendientes Revisión", count: 1 },
          { label: "Aprobados", count: 11 },
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
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar anulaciones..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">
                Manifiesto
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">
                Motivo
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">
                Usuario
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">
                Fecha Anulación
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">
                Estado Anterior
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">
                Estado
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                manifiesto: "MAN-005670",
                motivo: "Error en datos del conductor",
                usuario: "Admin",
                fecha: "12/03/2026",
                estadoAnterior: "Enviado",
                estado: "Aprobado",
              },
              {
                manifiesto: "MAN-005665",
                motivo: "Cambio de vehículo",
                usuario: "María López",
                fecha: "10/03/2026",
                estadoAnterior: "Pendiente",
                estado: "Aprobado",
              },
              {
                manifiesto: "MAN-005658",
                motivo: "Cliente canceló el servicio",
                usuario: "Carlos Pérez",
                fecha: "08/03/2026",
                estadoAnterior: "Aprobado",
                estado: "En Revisión",
              },
            ].map((anulacion) => (
              <tr
                key={anulacion.manifiesto}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="py-4 px-6 font-medium text-gray-900">
                  <div className="flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-500" />
                    {anulacion.manifiesto}
                  </div>
                </td>
                <td className="py-4 px-6 text-sm text-gray-600">
                  {anulacion.motivo}
                </td>
                <td className="py-4 px-6 text-sm text-gray-600">
                  {anulacion.usuario}
                </td>
                <td className="py-4 px-6 text-sm text-gray-600">
                  {anulacion.fecha}
                </td>
                <td className="py-4 px-6">
                  <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                    {anulacion.estadoAnterior}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      anulacion.estado === "Aprobado"
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {anulacion.estado === "En Revisión" && (
                      <AlertTriangle className="w-3 h-3" />
                    )}
                    {anulacion.estado}
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
