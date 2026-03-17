import { CheckCircle, Search, Calendar } from "lucide-react";

export default function Cumplidos() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Cumplidos de Manifiesto
        </h1>
        <p className="text-gray-600">
          Registro de finalización y cierre de viajes
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Cumplidos Hoy", count: 8 },
          { label: "Esta Semana", count: 42 },
          { label: "Este Mes", count: 156 },
          { label: "Pendientes", count: 5 },
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
            placeholder="Buscar cumplidos..."
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
                Vehículo
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">
                Ruta
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">
                Fecha Cumplido
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">
                Novedades
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">
                Estado
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                manifiesto: "MAN-005678",
                vehiculo: "ABC-123",
                ruta: "Bogotá - Medellín",
                fecha: "14/03/2026",
                novedades: "Sin novedades",
                estado: "Completado",
              },
              {
                manifiesto: "MAN-005679",
                vehiculo: "DEF-456",
                ruta: "Cali - Barranquilla",
                fecha: "14/03/2026",
                novedades: "Entrega parcial",
                estado: "Con Novedad",
              },
              {
                manifiesto: "MAN-005680",
                vehiculo: "GHI-789",
                ruta: "Medellín - Pereira",
                fecha: "13/03/2026",
                novedades: "Sin novedades",
                estado: "Completado",
              },
            ].map((cumplido) => (
              <tr
                key={cumplido.manifiesto}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="py-4 px-6 font-medium text-gray-900">
                  {cumplido.manifiesto}
                </td>
                <td className="py-4 px-6 text-sm text-gray-600">
                  {cumplido.vehiculo}
                </td>
                <td className="py-4 px-6 text-sm text-gray-600">
                  {cumplido.ruta}
                </td>
                <td className="py-4 px-6 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {cumplido.fecha}
                  </div>
                </td>
                <td className="py-4 px-6 text-sm text-gray-600">
                  {cumplido.novedades}
                </td>
                <td className="py-4 px-6">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      cumplido.estado === "Completado"
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {cumplido.estado === "Completado" && (
                      <CheckCircle className="w-3 h-3" />
                    )}
                    {cumplido.estado}
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
