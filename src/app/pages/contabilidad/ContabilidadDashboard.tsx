import KPICard from "../../components/KPICard";
import {
  DollarSign,
  TrendingUp,
  FileText,
  CreditCard,
  BarChart3,
  PieChart,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const monthlyData = [
  { mes: "Ene", ingresos: 45, egresos: 28 },
  { mes: "Feb", ingresos: 52, egresos: 32 },
  { mes: "Mar", ingresos: 48, egresos: 30 },
  { mes: "Abr", ingresos: 61, egresos: 35 },
  { mes: "May", ingresos: 55, egresos: 33 },
  { mes: "Jun", ingresos: 67, egresos: 38 },
];

export default function ContabilidadDashboard() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Dashboard de Contabilidad
        </h1>
        <p className="text-gray-600">
          Control financiero, cartera y facturación electrónica
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Ingresos del Mes"
          value="$128.5M"
          icon={DollarSign}
          trend={{ value: "15.3%", isPositive: true }}
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
        />
        <KPICard
          title="Cuentas por Cobrar"
          value="$45.2M"
          icon={TrendingUp}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
        />
        <KPICard
          title="Facturas Emitidas"
          value="156"
          icon={FileText}
          trend={{ value: "8%", isPositive: true }}
          iconBgColor="bg-purple-100"
          iconColor="text-purple-600"
        />
        <KPICard
          title="Cuentas por Pagar"
          value="$28.3M"
          icon={CreditCard}
          iconBgColor="bg-orange-100"
          iconColor="text-orange-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Ingresos vs Egresos (Millones $)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="mes" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="ingresos"
                stroke="#10b981"
                strokeWidth={2}
                key="line-ingresos"
              />
              <Line
                type="monotone"
                dataKey="egresos"
                stroke="#ef4444"
                strokeWidth={2}
                key="line-egresos"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Estado de Cartera
          </h3>
          <div className="space-y-4">
            {[
              { rango: "0-30 días", valor: "$18.5M", porcentaje: 41, color: "bg-green-500" },
              { rango: "31-60 días", valor: "$12.3M", porcentaje: 27, color: "bg-blue-500" },
              { rango: "61-90 días", valor: "$8.7M", porcentaje: 19, color: "bg-yellow-500" },
              { rango: "Más de 90 días", valor: "$5.7M", porcentaje: 13, color: "bg-red-500" },
            ].map((item) => (
              <div key={item.rango}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">{item.rango}</span>
                  <span className="text-sm font-medium text-gray-900">
                    {item.valor}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`${item.color} h-2 rounded-full`}
                    style={{ width: `${item.porcentaje}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Facturas Recientes
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                  Nº Factura
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                  Cliente
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                  Fecha
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                  Valor
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  numero: "FE-1245",
                  cliente: "ACME Corp",
                  fecha: "14/03/2026",
                  valor: "$2,500,000",
                  estado: "Pagada",
                },
                {
                  numero: "FE-1246",
                  cliente: "TechCo",
                  fecha: "14/03/2026",
                  valor: "$3,200,000",
                  estado: "Pendiente",
                },
                {
                  numero: "FE-1247",
                  cliente: "Global Ltd",
                  fecha: "13/03/2026",
                  valor: "$1,800,000",
                  estado: "Vencida",
                },
              ].map((factura) => (
                <tr
                  key={factura.numero}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3 px-4 font-medium text-gray-900">
                    {factura.numero}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {factura.cliente}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {factura.fecha}
                  </td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">
                    {factura.valor}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        factura.estado === "Pagada"
                          ? "bg-green-100 text-green-700"
                          : factura.estado === "Pendiente"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {factura.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}