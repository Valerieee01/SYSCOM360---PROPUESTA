import KPICard from "../../components/KPICard";
import { Users, DollarSign, Calendar, AlertCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const departmentData = [
  { area: "Operaciones", empleados: 35 },
  { area: "Administración", empleados: 18 },
  { area: "Comercial", empleados: 15 },
  { area: "Finanzas", empleados: 12 },
  { area: "IT", empleados: 9 },
];

export default function NominaDashboard() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Dashboard de Nómina
        </h1>
        <p className="text-gray-600">
          Gestión de personal, nómina y seguridad social
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Empleados Activos"
          value="89"
          icon={Users}
          trend={{ value: "5", isPositive: true }}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
        />
        <KPICard
          title="Nómina del Mes"
          value="$185.2M"
          icon={DollarSign}
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
        />
        <KPICard
          title="Novedades Pendientes"
          value="5"
          icon={AlertCircle}
          iconBgColor="bg-orange-100"
          iconColor="text-orange-600"
        />
        <KPICard
          title="Contratos por Vencer"
          value="8"
          icon={Calendar}
          iconBgColor="bg-red-100"
          iconColor="text-red-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Empleados por Área
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="area" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Bar dataKey="empleados" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Novedades Recientes
          </h3>
          <div className="space-y-3">
            {[
              { tipo: "Incapacidad", empleado: "Juan Pérez", dias: "3 días", fecha: "14/03/2026" },
              { tipo: "Horas Extra", empleado: "María López", dias: "8 horas", fecha: "13/03/2026" },
              { tipo: "Vacaciones", empleado: "Carlos Gómez", dias: "15 días", fecha: "12/03/2026" },
              { tipo: "Bonificación", empleado: "Ana Martínez", dias: "$500,000", fecha: "11/03/2026" },
            ].map((novedad, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">{novedad.tipo}</p>
                  <p className="text-xs text-gray-600">{novedad.empleado}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{novedad.dias}</p>
                  <p className="text-xs text-gray-500">{novedad.fecha}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Empleados Recientes
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Empleado</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Cargo</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Área</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Ingreso</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Salario</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Estado</th>
              </tr>
            </thead>
            <tbody>
              {[
                { nombre: "Juan Pérez", cargo: "Conductor", area: "Operaciones", ingreso: "01/02/2026", salario: "$1,500,000", estado: "Activo" },
                { nombre: "María López", cargo: "Contador", area: "Finanzas", ingreso: "15/01/2026", salario: "$2,800,000", estado: "Activo" },
                { nombre: "Carlos Gómez", cargo: "Vendedor", area: "Comercial", ingreso: "10/03/2026", salario: "$1,800,000", estado: "Activo" },
              ].map((empleado, idx) => (
                <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">{empleado.nombre}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{empleado.cargo}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{empleado.area}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{empleado.ingreso}</td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">{empleado.salario}</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      {empleado.estado}
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
