import KPICard from "../../components/KPICard";
import { Fuel, DollarSign, Activity, TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const salesData = [
  { hora: "06:00", ventas: 12 },
  { hora: "09:00", ventas: 28 },
  { hora: "12:00", ventas: 45 },
  { hora: "15:00", ventas: 38 },
  { hora: "18:00", ventas: 52 },
  { hora: "21:00", ventas: 35 },
];

export default function EDSDashboard() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Dashboard EDS
        </h1>
        <p className="text-gray-600">
          Operación y administración de estaciones de servicio
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Ventas del Día"
          value="$12.8M"
          icon={DollarSign}
          trend={{ value: "8.5%", isPositive: true }}
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
        />
        <KPICard
          title="Transacciones"
          value="1,250"
          icon={Activity}
          trend={{ value: "12%", isPositive: true }}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
        />
        <KPICard
          title="Inventario"
          value="98%"
          icon={Fuel}
          iconBgColor="bg-purple-100"
          iconColor="text-purple-600"
        />
        <KPICard
          title="Ticket Promedio"
          value="$10,240"
          icon={TrendingUp}
          trend={{ value: "3.2%", isPositive: false }}
          iconBgColor="bg-orange-100"
          iconColor="text-orange-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Ventas por Hora (Millones $)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="hora" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Line type="monotone" dataKey="ventas" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Estado de Tanques
          </h3>
          <div className="space-y-4">
            {[
              { tipo: "Gasolina Corriente", capacidad: 85, color: "bg-green-500" },
              { tipo: "Gasolina Extra", capacidad: 92, color: "bg-blue-500" },
              { tipo: "ACPM", capacidad: 78, color: "bg-yellow-500" },
              { tipo: "Diesel", capacidad: 65, color: "bg-orange-500" },
            ].map((tanque) => (
              <div key={tanque.tipo}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">{tanque.tipo}</span>
                  <span className="text-sm font-medium text-gray-900">{tanque.capacidad}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`${tanque.color} h-2 rounded-full`}
                    style={{ width: `${tanque.capacidad}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Transacciones Recientes
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Turno</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Producto</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Cantidad</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Valor</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Método Pago</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Hora</th>
              </tr>
            </thead>
            <tbody>
              {[
                { turno: "Isla 1", producto: "Corriente", cantidad: "45 gal", valor: "$180,000", metodo: "Tarjeta", hora: "14:25" },
                { turno: "Isla 2", producto: "Extra", cantidad: "32 gal", valor: "$145,000", metodo: "Efectivo", hora: "14:22" },
                { turno: "Isla 3", producto: "ACPM", cantidad: "68 gal", valor: "$285,000", metodo: "Tarjeta", hora: "14:18" },
              ].map((tx, idx) => (
                <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">{tx.turno}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{tx.producto}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{tx.cantidad}</td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">{tx.valor}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      tx.metodo === "Tarjeta" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"
                    }`}>
                      {tx.metodo}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{tx.hora}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
