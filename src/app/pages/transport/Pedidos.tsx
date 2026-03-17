import { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  FileText,
  X,
  Calendar,
  MapPin,
  Package as PackageIcon,
  User,
  AlertCircle,
  Building2,
  Truck,
  ClipboardList,
  Copy,
  Save,
  Send,
} from "lucide-react";

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
  const [copyFromRemitente, setCopyFromRemitente] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [showValidationAlert, setShowValidationAlert] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    tipoOperacion: "",
    tipoServicio: "",
    fechaPedido: "2026-03-14",
    remitente: "",
    nitRemitente: "",
    direccionOrigen: "",
    ciudadOrigen: "",
    destinatario: "",
    nitDestinatario: "",
    direccionDestino: "",
    ciudadDestino: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user types
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: false }));
    }
  };

  const validateForm = () => {
    const requiredFields = {
      tipoOperacion: "Tipo de Operación",
      tipoServicio: "Tipo de Servicio",
      remitente: "Remitente",
      nitRemitente: "NIT Remitente",
      direccionOrigen: "Dirección Origen",
      ciudadOrigen: "Ciudad Origen",
      destinatario: "Destinatario",
      nitDestinatario: "NIT Destinatario",
      direccionDestino: "Dirección Destino",
      ciudadDestino: "Ciudad Destino",
    };

    const newErrors: { [key: string]: boolean } = {};
    let hasErrors = false;

    Object.keys(requiredFields).forEach(field => {
      if (!formData[field as keyof typeof formData] || formData[field as keyof typeof formData] === "") {
        newErrors[field] = true;
        hasErrors = true;
      }
    });

    setErrors(newErrors);
    
    if (hasErrors) {
      setShowValidationAlert(true);
      setTimeout(() => setShowValidationAlert(false), 5000);
    }

    return !hasErrors;
  };

  const handleSave = () => {
    if (validateForm()) {
      // Aquí iría la lógica para guardar
      console.log("Guardando pedido...", formData);
      setShowNewPedido(false);
      // Reset form
      setFormData({
        tipoOperacion: "",
        tipoServicio: "",
        fechaPedido: "2026-03-14",
        remitente: "",
        nitRemitente: "",
        direccionOrigen: "",
        ciudadOrigen: "",
        destinatario: "",
        nitDestinatario: "",
        direccionDestino: "",
        ciudadDestino: "",
      });
      setErrors({});
    }
  };

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
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Gestión de Pedidos
          </h1>
          <p className="text-gray-600">
            Administra las solicitudes de transporte de carga
          </p>
        </div>
        <button
          onClick={() => setShowNewPedido(true)}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Nuevo Pedido
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 hidden md:grid">
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
      <div className="md:hidden">
        <div className="overflow-x-auto scrollbar-hide -mx-6 px-6">
          <div className="flex gap-3 pb-2">
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
                className={`flex-shrink-0 w-32 p-3 rounded-xl border-2 transition-all ${
                  selectedEstado === stat.label
                    ? "border-[#40A095] bg-gradient-to-br from-[#40A095]/10 to-[#99D6CF]/10 shadow-md"
                    : "border-gray-200 bg-white"
                }`}
              >
                <div className="text-2xl mb-1">{stat.icon}</div>
                <p className="text-xs text-gray-600 mb-1 truncate">{stat.label}</p>
                <p className="text-xl font-bold text-gray-900">{stat.count}</p>
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
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por ID, cliente, origen o destino..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-5 h-5 text-gray-600" />
            Filtros Avanzados
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
                      <button className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-600 hover:bg-gray-100 rounded transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors">
                        <FileText className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Mostrando {filteredPedidos.length} de {pedidosData.length} pedidos
          </p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">
              Anterior
            </button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">
              2
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">
              3
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">
              Siguiente
            </button>
          </div>
        </div>
      </div>

      {/* New Pedido Modal */}
      {showNewPedido && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Nuevo Pedido de Transporte
              </h2>
              <button
                onClick={() => setShowNewPedido(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Validation Alert */}
              {showValidationAlert && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg flex items-start gap-3 animate-shake">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-red-800 font-semibold mb-1">
                      Campos obligatorios incompletos
                    </h4>
                    <p className="text-red-700 text-sm">
                      Por favor complete todos los campos marcados con asterisco (*) antes de guardar.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowValidationAlert(false)}
                    className="ml-auto text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* 1. Datos Básicos del Pedido */}
              <div className="bg-gradient-to-br from-[#40A095]/5 to-[#99D6CF]/5 rounded-xl p-6 border border-[#99D6CF]/20">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <ClipboardList className="w-5 h-5 text-[#40A095]" />
                  Datos Básicos del Pedido
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Número de Pedido
                    </label>
                    <input
                      type="text"
                      value="PED-001239"
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cita
                    </label>
                    <input
                      type="text"
                      placeholder="Número de cita"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#40A095] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de Operación *
                    </label>
                    <select
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#40A095] focus:border-transparent ${
                        errors.tipoOperacion ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                      value={formData.tipoOperacion}
                      onChange={(e) => handleInputChange("tipoOperacion", e.target.value)}
                    >
                      <option value="">Seleccione...</option>
                      <option>Transporte Nacional</option>
                      <option>Transporte Internacional</option>
                      <option>Urbano</option>
                    </select>
                    {errors.tipoOperacion && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        Este campo es requerido
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de Servicio *
                    </label>
                    <select
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#40A095] focus:border-transparent ${
                        errors.tipoServicio ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                      value={formData.tipoServicio}
                      onChange={(e) => handleInputChange("tipoServicio", e.target.value)}
                    >
                      <option value="">Seleccione...</option>
                      <option>Carga completa</option>
                      <option>Carga parcial</option>
                      <option>Express</option>
                    </select>
                    {errors.tipoServicio && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        Este campo es requerido
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fecha del Pedido *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        defaultValue="2026-03-14"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#40A095] focus:border-transparent"
                        value={formData.fechaPedido}
                        onChange={(e) => handleInputChange("fechaPedido", e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Estado del Pedido
                    </label>
                    <select
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                    >
                      <option>Pendiente</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 2. Información del Remitente */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100/30 rounded-xl p-6 border border-blue-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Información del Remitente
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Remitente / Razón Social *
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
                      <option>Seleccione remitente...</option>
                      <option>ACME Corporation</option>
                      <option>TechCo S.A.</option>
                      <option>Global Logistics Ltd</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      NIT Remitente *
                    </label>
                    <input
                      type="text"
                      placeholder="900.123.456-7"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      value={formData.nitRemitente}
                      onChange={(e) => handleInputChange("nitRemitente", e.target.value)}
                    />
                    {errors.nitRemitente && (
                      <p className="text-red-500 text-sm mt-1">
                        El campo NIT Remitente es requerido.
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sede Origen
                    </label>
                    <input
                      type="text"
                      placeholder="Nombre de la sede"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dirección Origen *
                    </label>
                    <input
                      type="text"
                      placeholder="Calle 123 #45-67"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      value={formData.direccionOrigen}
                      onChange={(e) => handleInputChange("direccionOrigen", e.target.value)}
                    />
                    {errors.direccionOrigen && (
                      <p className="text-red-500 text-sm mt-1">
                        El campo Dirección Origen es requerido.
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ciudad Origen *
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      value={formData.ciudadOrigen}
                      onChange={(e) => handleInputChange("ciudadOrigen", e.target.value)}
                    >
                      <option>Seleccione ciudad...</option>
                      <option>Bogotá</option>
                      <option>Medellín</option>
                      <option>Cali</option>
                      <option>Barranquilla</option>
                    </select>
                    {errors.ciudadOrigen && (
                      <p className="text-red-500 text-sm mt-1">
                        El campo Ciudad Origen es requerido.
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Departamento Origen *
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
                      <option>Seleccione departamento...</option>
                      <option>Cundinamarca</option>
                      <option>Antioquia</option>
                      <option>Valle del Cauca</option>
                      <option>Atlántico</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      placeholder="(601) 234 5678"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contacto
                    </label>
                    <input
                      type="text"
                      placeholder="Nombre del contacto"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Información del Destinatario */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100/30 rounded-xl p-6 border border-purple-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-purple-600" />
                  Información del Destinatario
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Destinatario / Razón Social *
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white">
                      <option>Seleccione destinatario...</option>
                      <option>ACME Corporation</option>
                      <option>TechCo S.A.</option>
                      <option>Global Logistics Ltd</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      NIT Destinatario *
                    </label>
                    <input
                      type="text"
                      placeholder="900.123.456-7"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                      value={formData.nitDestinatario}
                      onChange={(e) => handleInputChange("nitDestinatario", e.target.value)}
                    />
                    {errors.nitDestinatario && (
                      <p className="text-red-500 text-sm mt-1">
                        El campo NIT Destinatario es requerido.
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sede Destino
                    </label>
                    <input
                      type="text"
                      placeholder="Nombre de la sede"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dirección Destino *
                    </label>
                    <input
                      type="text"
                      placeholder="Calle 123 #45-67"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                      value={formData.direccionDestino}
                      onChange={(e) => handleInputChange("direccionDestino", e.target.value)}
                    />
                    {errors.direccionDestino && (
                      <p className="text-red-500 text-sm mt-1">
                        El campo Dirección Destino es requerido.
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ciudad Destino *
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                      value={formData.ciudadDestino}
                      onChange={(e) => handleInputChange("ciudadDestino", e.target.value)}
                    >
                      <option>Seleccione ciudad...</option>
                      <option>Bogotá</option>
                      <option>Medellín</option>
                      <option>Cali</option>
                      <option>Barranquilla</option>
                    </select>
                    {errors.ciudadDestino && (
                      <p className="text-red-500 text-sm mt-1">
                        El campo Ciudad Destino es requerido.
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Departamento Destino *
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white">
                      <option>Seleccione departamento...</option>
                      <option>Cundinamarca</option>
                      <option>Antioquia</option>
                      <option>Valle del Cauca</option>
                      <option>Atlántico</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      placeholder="(601) 234 5678"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contacto
                    </label>
                    <input
                      type="text"
                      placeholder="Nombre del contacto"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* 4. Propietario de la Carga */}
              <div className="bg-gradient-to-br from-green-50 to-green-100/30 rounded-xl p-6 border border-green-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-green-600" />
                    Propietario de la Carga
                  </h3>
                  <button
                    onClick={() => setCopyFromRemitente(!copyFromRemitente)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-white border border-green-300 text-green-700 rounded-lg hover:bg-green-50 transition-colors text-sm"
                  >
                    <Copy className="w-4 h-4" />
                    Copiar del Remitente
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Propietario de la Carga *
                    </label>
                    <input
                      type="text"
                      placeholder="Razón social"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      NIT Propietario *
                    </label>
                    <input
                      type="text"
                      placeholder="900.123.456-7"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dirección
                    </label>
                    <input
                      type="text"
                      placeholder="Calle 123 #45-67"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ciudad
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white">
                      <option>Seleccione ciudad...</option>
                      <option>Bogotá</option>
                      <option>Medellín</option>
                      <option>Cali</option>
                      <option>Barranquilla</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 5. Información de la Mercancía */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100/30 rounded-xl p-6 border border-orange-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <PackageIcon className="w-5 h-5 text-orange-600" />
                  Información de la Mercancía
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Descripción de la Mercancía *
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Descripción detallada de la mercancía..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none bg-white"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de Carga *
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white">
                      <option>Seleccione...</option>
                      <option>Carga General</option>
                      <option>Granel</option>
                      <option>Refrigerada</option>
                      <option>Peligrosa</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Naturaleza de la Carga *
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white">
                      <option>Seleccione...</option>
                      <option>Perecedera</option>
                      <option>No Perecedera</option>
                      <option>Frágil</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de Embalaje *
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white">
                      <option>Seleccione...</option>
                      <option>Caja</option>
                      <option>Pallet</option>
                      <option>Contenedor</option>
                      <option>Granel</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Unidad de Medida *
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white">
                      <option>Seleccione...</option>
                      <option>Kilogramos (kg)</option>
                      <option>Toneladas (ton)</option>
                      <option>Unidades</option>
                      <option>Metros cúbicos (m³)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 6. Detalle Logístico */}
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100/30 rounded-xl p-6 border border-indigo-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-indigo-600" />
                  Detalle Logístico
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cantidad *
                    </label>
                    <input
                      type="number"
                      placeholder="10"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Peso (kg) *
                    </label>
                    <input
                      type="number"
                      placeholder="5000"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Volumen (m³)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="12.5"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Valor Declarado (COP)
                    </label>
                    <input
                      type="number"
                      placeholder="5000000"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Clase de Riesgo (si aplica)
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white">
                      <option>N/A</option>
                      <option>Clase 1 - Explosivos</option>
                      <option>Clase 2 - Gases</option>
                      <option>Clase 3 - Líquidos inflamables</option>
                      <option>Clase 4 - Sólidos inflamables</option>
                      <option>Clase 5 - Oxidantes</option>
                      <option>Clase 6 - Sustancias tóxicas</option>
                      <option>Clase 7 - Radiactivos</option>
                      <option>Clase 8 - Corrosivos</option>
                      <option>Clase 9 - Misceláneos</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Número UN (si aplica)
                    </label>
                    <input
                      type="text"
                      placeholder="UN####"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* 7. Observaciones */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100/30 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-gray-600" />
                  Observaciones
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Observaciones Generales
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Instrucciones especiales, requerimientos de manejo, etc..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent resize-none bg-white"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prioridad del Pedido *
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-white">
                      <option>Baja</option>
                      <option>Media</option>
                      <option selected>Alta</option>
                      <option>Urgente</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fecha Programada de Cargue
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="datetime-local"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowNewPedido(false)}
                  className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Guardar Pedido
                </button>
                <button className="px-6 py-2.5 bg-gradient-to-r from-[#40A095] to-[#99D6CF] text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  Guardar y Generar Orden de Cargue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}