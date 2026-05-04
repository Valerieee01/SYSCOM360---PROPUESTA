import { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  FileText,
  MapPin,
} from "lucide-react";
import PedidoForm from "./PedidoForm";

interface Pedido {
  id: string;
  cliente: string;
  origen: string;
  destino: string;
  fecha: string;
  peso: string;
  estado: "Pendiente" | "Aprobado" | "En Proceso" | "Completado" | "Cancelado";
  prioridad: "Baja" | "Media" | "Alta" | "Urgente";
  tipoCarga: string;
}

const pedidosData: Pedido[] = [
  {
    id: "PED-001234",
    cliente: "ACME Corporation",
    origen: "Bogotá",
    destino: "Medellín",
    fecha: "14/03/2026",
    peso: "5,000 kg",
    estado: "En Proceso",
    prioridad: "Alta",
    tipoCarga: "Carga General",
  },
  {
    id: "PED-001235",
    cliente: "TechCo S.A.",
    origen: "Cali",
    destino: "Barranquilla",
    fecha: "14/03/2026",
    peso: "8,500 kg",
    estado: "Pendiente",
    prioridad: "Media",
    tipoCarga: "Tecnología",
  },
  {
    id: "PED-001236",
    cliente: "Global Logistics Ltd",
    origen: "Cartagena",
    destino: "Bogotá",
    fecha: "13/03/2026",
    peso: "12,000 kg",
    estado: "Aprobado",
    prioridad: "Urgente",
    tipoCarga: "Refrigerado",
  },
  {
    id: "PED-001237",
    cliente: "LogiCo Internacional",
    origen: "Medellín",
    destino: "Pereira",
    fecha: "13/03/2026",
    peso: "3,200 kg",
    estado: "Completado",
    prioridad: "Baja",
    tipoCarga: "Documentos",
  },
  {
    id: "PED-001238",
    cliente: "Transportes del Norte",
    origen: "Bucaramanga",
    destino: "Cúcuta",
    fecha: "12/03/2026",
    peso: "6,800 kg",
    estado: "En Proceso",
    prioridad: "Alta",
    tipoCarga: "Construcción",
  },
];

export default function Pedidos() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewPedido, setShowNewPedido] = useState(false);
  const [selectedEstado, setSelectedEstado] = useState<string>("Todos");

  const filteredPedidos = pedidosData.filter((pedido) => {
    const matchesSearch =
      pedido.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pedido.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pedido.origen.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pedido.destino.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesEstado =
      selectedEstado === "Todos" || pedido.estado === selectedEstado;

    return matchesSearch && matchesEstado;
  });

  const getEstadoBadge = (estado: Pedido["estado"]) => {
    const styles = {
      Pendiente: "bg-orange-100 text-orange-700",
      Aprobado: "bg-blue-100 text-blue-700",
      "En Proceso": "bg-purple-100 text-purple-700",
      Completado: "bg-green-100 text-green-700",
      Cancelado: "bg-red-100 text-red-700",
    };
    return styles[estado];
  };

  const getPrioridadBadge = (prioridad: Pedido["prioridad"]) => {
    const styles = {
      Baja: "bg-gray-100 text-gray-700",
      Media: "bg-yellow-100 text-yellow-700",
      Alta: "bg-orange-100 text-orange-700",
      Urgente: "bg-red-100 text-red-700",
    };
    return styles[prioridad];
  };

  return (
    <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 lg:gap-0">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1 lg:mb-2">
            Gestión de Pedidos
          </h1>
          <p className="text-sm lg:text-base text-gray-600">
            Administra las solicitudes de transporte de carga
          </p>
        </div>
        <button
          onClick={() => setShowNewPedido(true)}
          className="w-full lg:w-auto flex items-center justify-center gap-2 px-4 lg:px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:scale-95 transition-all shadow-sm font-medium"
        >
          <Plus className="w-5 h-5" />
          <span>Nuevo Pedido</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 hidden lg:grid">
        {[
          { label: "Todos", count: pedidosData.length, color: "bg-gray-100" },
          {
            label: "Pendiente",
            count: pedidosData.filter((p) => p.estado === "Pendiente").length,
            color: "bg-orange-100",
          },
          {
            label: "Aprobado",
            count: pedidosData.filter((p) => p.estado === "Aprobado").length,
            color: "bg-blue-100",
          },
          {
            label: "En Proceso",
            count: pedidosData.filter((p) => p.estado === "En Proceso").length,
            color: "bg-purple-100",
          },
          {
            label: "Completado",
            count: pedidosData.filter((p) => p.estado === "Completado").length,
            color: "bg-green-100",
          },
        ].map((stat) => (
          <button
            key={stat.label}
            onClick={() => setSelectedEstado(stat.label)}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedEstado === stat.label
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900">{stat.count}</p>
          </button>
        ))}
      </div>

      {/* Mobile Carousel Stats */}
      <div className="lg:hidden">
        <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
          <div className="flex gap-3 pb-2 min-w-max">
            {[
              { label: "Todos", count: pedidosData.length, color: "bg-gray-100", icon: "📋" },
              {
                label: "Pendiente",
                count: pedidosData.filter((p) => p.estado === "Pendiente").length,
                color: "bg-orange-100",
                icon: "⏳",
              },
              {
                label: "Aprobado",
                count: pedidosData.filter((p) => p.estado === "Aprobado").length,
                color: "bg-blue-100",
                icon: "✅",
              },
              {
                label: "En Proceso",
                count: pedidosData.filter((p) => p.estado === "En Proceso").length,
                color: "bg-purple-100",
                icon: "🚛",
              },
              {
                label: "Completado",
                count: pedidosData.filter((p) => p.estado === "Completado").length,
                color: "bg-green-100",
                icon: "✔️",
              },
            ].map((stat) => (
              <button
                key={stat.label}
                onClick={() => setSelectedEstado(stat.label)}
                className={`flex-shrink-0 w-28 p-3 rounded-xl border-2 transition-all active:scale-95 ${
                  selectedEstado === stat.label
                    ? "border-[#40A095] bg-gradient-to-br from-[#40A095]/10 to-[#99D6CF]/10 shadow-md"
                    : "border-gray-200 bg-white active:border-[#40A095]/30"
                }`}
              >
                <div className="text-2xl mb-1">{stat.icon}</div>
                <p className="text-xs text-gray-600 mb-1 truncate">{stat.label}</p>
                <p className="text-lg font-bold text-gray-900">{stat.count}</p>
              </button>
            ))}
          </div>
        </div>
        
        {/* Indicador de scroll */}
        <div className="flex justify-center gap-1 mt-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all ${
                i === 0 ? "w-6 bg-[#40A095]" : "w-1 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row gap-3 lg:gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por ID, cliente, origen o destino..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2 lg:gap-3">
            <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 active:scale-95 transition-all font-medium">
              <Filter className="w-4 h-4 text-gray-600" />
              <span className="text-sm">Filtros</span>
            </button>
            <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 active:scale-95 transition-all font-medium">
              <Download className="w-4 h-4 text-gray-600" />
              <span className="text-sm lg:inline">Exportar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table/Cards */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Mobile Cards */}
        <div className="lg:hidden divide-y divide-gray-200">
          {filteredPedidos.map((pedido) => (
            <div key={pedido.id} className="p-4 hover:bg-gray-50 transition-colors active:bg-gray-100">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gray-900 text-lg mb-1">{pedido.id}</h4>
                  <p className="text-sm text-gray-600 truncate">{pedido.cliente}</p>
                </div>
                <div className="flex items-center gap-2 ml-2 flex-shrink-0">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all active:scale-95">
                    <Eye className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all active:scale-95">
                    <Edit className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Route */}
              <div className="flex items-center gap-2 mb-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-sm text-gray-900 font-medium">{pedido.origen}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-red-600 flex-shrink-0" />
                    <span className="text-sm text-gray-900 font-medium">{pedido.destino}</span>
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Tipo de Carga</p>
                  <p className="text-sm font-medium text-gray-900">{pedido.tipoCarga}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Peso</p>
                  <p className="text-sm font-medium text-gray-900">{pedido.peso}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Fecha</p>
                  <p className="text-sm font-medium text-gray-900">{pedido.fecha}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Prioridad</p>
                  <span
                    className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getPrioridadBadge(
                      pedido.prioridad
                    )}`}
                  >
                    {pedido.prioridad}
                  </span>
                </div>
              </div>

              {/* Footer with Estado */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <span
                  className={`inline-flex px-3 py-1.5 rounded-full text-sm font-medium ${getEstadoBadge(
                    pedido.estado
                  )}`}
                >
                  {pedido.estado}
                </span>
                <button className="flex items-center gap-1 text-sm text-[#40A095] hover:text-[#99D6CF] font-medium active:scale-95 transition-all">
                  <FileText className="w-4 h-4" />
                  <span>Ver PDF</span>
                </button>
              </div>
            </div>
          ))}

          {filteredPedidos.length === 0 && (
            <div className="py-12 text-center px-4">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-2">No se encontraron pedidos</p>
              <p className="text-gray-400 text-sm">
                Intenta cambiar los filtros o el término de búsqueda
              </p>
            </div>
          )}
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">
                  ID Pedido
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">
                  Cliente
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">
                  Ruta
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">
                  Tipo de Carga
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">
                  Peso
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">
                  Fecha
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">
                  Prioridad
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
              {filteredPedidos.map((pedido) => (
                <tr
                  key={pedido.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-6">
                    <span className="font-medium text-gray-900">
                      {pedido.id}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">
                    {pedido.cliente}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">
                    <div className="flex flex-col gap-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-green-600" />
                        {pedido.origen}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-red-600" />
                        {pedido.destino}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">
                    {pedido.tipoCarga}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">
                    {pedido.peso}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">
                    {pedido.fecha}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getPrioridadBadge(
                        pedido.prioridad
                      )}`}
                    >
                      {pedido.prioridad}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getEstadoBadge(
                        pedido.estado
                      )}`}
                    >
                      {pedido.estado}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-all active:scale-95">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-all active:scale-95">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-green-600 hover:bg-green-50 rounded transition-all active:scale-95">
                        <FileText className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination - Desktop Only */}
        <div className="hidden lg:flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Mostrando {filteredPedidos.length} de {pedidosData.length} pedidos
          </p>
          <div className="flex gap-2">
            <button className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 active:scale-95 transition-all text-sm font-medium">
              Anterior
            </button>
            <button className="px-3 py-2 bg-blue-600 text-white rounded active:scale-95 transition-all text-sm font-medium">
              1
            </button>
            <button className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 active:scale-95 transition-all text-sm font-medium">
              2
            </button>
            <button className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 active:scale-95 transition-all text-sm font-medium">
              3
            </button>
            <button className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 active:scale-95 transition-all text-sm font-medium">
              Siguiente
            </button>
          </div>
        </div>

        {/* Mobile Pagination */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-gray-50">
          <p className="text-xs text-gray-600">
            {filteredPedidos.length} de {pedidosData.length}
          </p>
          <div className="flex gap-2">
            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-white active:scale-95 transition-all text-xs font-medium">
              Anterior
            </button>
            <button className="px-3 py-2 bg-gradient-to-r from-[#40A095] to-[#99D6CF] text-white rounded-lg active:scale-95 transition-all text-xs font-medium shadow-sm">
              1
            </button>
            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-white active:scale-95 transition-all text-xs font-medium">
              Siguiente
            </button>
          </div>
        </div>
      </div>

      {/* New Pedido Modal */}
      {showNewPedido && (
        <PedidoForm
          onClose={() => setShowNewPedido(false)}
          onSuccess={() => {
            // Refresh pedidos list
            console.log("Pedido created successfully");
          }}
        />
      )}
    </div>
  );
}