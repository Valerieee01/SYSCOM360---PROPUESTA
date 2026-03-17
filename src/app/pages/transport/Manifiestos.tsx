import { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  Download,
  Send,
  CheckCircle,
  AlertTriangle,
  Eye,
  Edit,
  Clock,
  Truck,
  MapPin,
} from "lucide-react";

interface Manifiesto {
  id: string;
  vehiculo: string;
  conductor: string;
  ruta: string;
  remesas: number;
  valor: string;
  fecha: string;
  estadoRNDC: "Pendiente" | "Enviado" | "Aprobado" | "Rechazado" | "Cumplido";
  validaciones: {
    vehiculoOk: boolean;
    conductorOk: boolean;
    remesasOk: boolean;
    datosOk: boolean;
  };
}

const manifiestos: Manifiesto[] = [
  {
    id: "MAN-005678",
    vehiculo: "ABC-123",
    conductor: "Juan Rodríguez",
    ruta: "Bogotá - Medellín",
    remesas: 5,
    valor: "$12,500,000",
    fecha: "14/03/2026",
    estadoRNDC: "Aprobado",
    validaciones: {
      vehiculoOk: true,
      conductorOk: true,
      remesasOk: true,
      datosOk: true,
    },
  },
  {
    id: "MAN-005679",
    vehiculo: "DEF-456",
    conductor: "María López",
    ruta: "Cali - Barranquilla",
    remesas: 8,
    valor: "$18,750,000",
    fecha: "14/03/2026",
    estadoRNDC: "Enviado",
    validaciones: {
      vehiculoOk: true,
      conductorOk: true,
      remesasOk: true,
      datosOk: true,
    },
  },
  {
    id: "MAN-005680",
    vehiculo: "GHI-789",
    conductor: "Carlos Pérez",
    ruta: "Cartagena - Bogotá",
    remesas: 3,
    valor: "$8,200,000",
    fecha: "13/03/2026",
    estadoRNDC: "Pendiente",
    validaciones: {
      vehiculoOk: true,
      conductorOk: true,
      remesasOk: false,
      datosOk: true,
    },
  },
  {
    id: "MAN-005681",
    vehiculo: "JKL-012",
    conductor: "Ana Martínez",
    ruta: "Medellín - Pereira",
    remesas: 6,
    valor: "$15,300,000",
    fecha: "13/03/2026",
    estadoRNDC: "Cumplido",
    validaciones: {
      vehiculoOk: true,
      conductorOk: true,
      remesasOk: true,
      datosOk: true,
    },
  },
];

export default function Manifiestos() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedManifiesto, setSelectedManifiesto] = useState<Manifiesto | null>(
    null
  );

  const getEstadoBadge = (estado: Manifiesto["estadoRNDC"]) => {
    const styles = {
      Pendiente: "bg-orange-100 text-orange-700",
      Enviado: "bg-blue-100 text-blue-700",
      Aprobado: "bg-green-100 text-green-700",
      Rechazado: "bg-red-100 text-red-700",
      Cumplido: "bg-purple-100 text-purple-700",
    };
    return styles[estado];
  };

  const allValidationsOk = (validaciones: Manifiesto["validaciones"]) => {
    return Object.values(validaciones).every((v) => v);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Gestión de Manifiestos
          </h1>
          <p className="text-gray-600">
            Control de manifiestos y envío al RNDC
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
          <Plus className="w-5 h-5" />
          Nuevo Manifiesto
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {[
          {
            label: "Total",
            count: manifiestos.length,
            color: "bg-gray-100",
            icon: Clock,
          },
          {
            label: "Pendientes",
            count: manifiestos.filter((m) => m.estadoRNDC === "Pendiente").length,
            color: "bg-orange-100",
            icon: Clock,
          },
          {
            label: "Enviados",
            count: manifiestos.filter((m) => m.estadoRNDC === "Enviado").length,
            color: "bg-blue-100",
            icon: Send,
          },
          {
            label: "Aprobados",
            count: manifiestos.filter((m) => m.estadoRNDC === "Aprobado").length,
            color: "bg-green-100",
            icon: CheckCircle,
          },
          {
            label: "Rechazados",
            count: manifiestos.filter((m) => m.estadoRNDC === "Rechazado").length,
            color: "bg-red-100",
            icon: AlertTriangle,
          },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`p-4 rounded-lg border border-gray-200 ${stat.color}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-4 h-4 text-gray-700" />
                <p className="text-sm text-gray-700">{stat.label}</p>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.count}</p>
            </div>
          );
        })}
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por número de manifiesto, vehículo o conductor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-5 h-5 text-gray-600" />
            Filtros
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-5 h-5 text-gray-600" />
            Exportar
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">
                  ID Manifiesto
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">
                  Vehículo
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">
                  Conductor
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">
                  Ruta
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">
                  Remesas
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">
                  Valor Total
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">
                  Validaciones
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">
                  Estado RNDC
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {manifiestos.map((manifiesto) => (
                <tr
                  key={manifiesto.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-6">
                    <span className="font-medium text-gray-900">
                      {manifiesto.id}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-gray-400" />
                      {manifiesto.vehiculo}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">
                    {manifiesto.conductor}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      {manifiesto.ruta}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">
                    {manifiesto.remesas}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900">
                    {manifiesto.valor}
                  </td>
                  <td className="py-4 px-6">
                    {allValidationsOk(manifiesto.validaciones) ? (
                      <span className="flex items-center gap-1 text-green-600 text-sm">
                        <CheckCircle className="w-4 h-4" />
                        OK
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-red-600 text-sm">
                        <AlertTriangle className="w-4 h-4" />
                        Pendiente
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getEstadoBadge(
                        manifiesto.estadoRNDC
                      )}`}
                    >
                      {manifiesto.estadoRNDC}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedManifiesto(manifiesto)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {manifiesto.estadoRNDC === "Pendiente" &&
                        allValidationsOk(manifiesto.validaciones) && (
                          <button className="flex items-center gap-1 px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-xs">
                            <Send className="w-3 h-3" />
                            Enviar
                          </button>
                        )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manifiesto Detail Modal */}
      {selectedManifiesto && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Manifiesto {selectedManifiesto.id}
              </h2>
              <button
                onClick={() => setSelectedManifiesto(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Estado y Validaciones */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getEstadoBadge(
                      selectedManifiesto.estadoRNDC
                    )}`}
                  >
                    {selectedManifiesto.estadoRNDC}
                  </span>
                  <span className="text-sm text-gray-600">
                    Fecha: {selectedManifiesto.fecha}
                  </span>
                </div>
                {selectedManifiesto.estadoRNDC === "Pendiente" &&
                  allValidationsOk(selectedManifiesto.validaciones) && (
                    <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                      <Send className="w-4 h-4" />
                      Enviar al RNDC
                    </button>
                  )}
              </div>

              {/* Panel de Validaciones */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Panel de Validaciones
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { key: "vehiculoOk", label: "Vehículo Registrado" },
                    { key: "conductorOk", label: "Conductor Activo" },
                    { key: "remesasOk", label: "Remesas Asociadas" },
                    { key: "datosOk", label: "Datos Completos" },
                  ].map((validation) => {
                    const isValid =
                      selectedManifiesto.validaciones[
                        validation.key as keyof typeof selectedManifiesto.validaciones
                      ];
                    return (
                      <div
                        key={validation.key}
                        className={`flex items-center gap-3 p-3 rounded-lg border-2 ${
                          isValid
                            ? "border-green-200 bg-green-50"
                            : "border-red-200 bg-red-50"
                        }`}
                      >
                        {isValid ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <AlertTriangle className="w-5 h-5 text-red-600" />
                        )}
                        <span
                          className={`text-sm font-medium ${
                            isValid ? "text-green-900" : "text-red-900"
                          }`}
                        >
                          {validation.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Datos del Vehículo y Conductor */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Datos del Vehículo
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Placa</p>
                      <p className="font-medium text-gray-900">
                        {selectedManifiesto.vehiculo}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Tipo</p>
                      <p className="font-medium text-gray-900">Camión 2 Ejes</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Capacidad</p>
                      <p className="font-medium text-gray-900">10 Toneladas</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Datos del Conductor
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Nombre</p>
                      <p className="font-medium text-gray-900">
                        {selectedManifiesto.conductor}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Cédula</p>
                      <p className="font-medium text-gray-900">1.234.567.890</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Licencia</p>
                      <p className="font-medium text-gray-900">C2 - Vigente</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ruta y Remesas */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Ruta y Remesas
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Ruta</p>
                    <p className="font-medium text-gray-900">
                      {selectedManifiesto.ruta}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Remesas Asociadas</p>
                    <p className="font-medium text-gray-900">
                      {selectedManifiesto.remesas} remesas
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Valor Total</p>
                    <p className="text-xl font-bold text-gray-900">
                      {selectedManifiesto.valor}
                    </p>
                  </div>
                </div>
              </div>

              {/* Historial de Envíos */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Historial de Intentos de Envío
                </h3>
                <div className="space-y-2">
                  {selectedManifiesto.estadoRNDC !== "Pendiente" ? (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          Enviado al RNDC exitosamente
                        </p>
                        <p className="text-xs text-gray-500">
                          14/03/2026 10:30 AM - Usuario: admin
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">
                      No hay intentos de envío registrados
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}