import { useState } from "react";
import {
  FileText,
  Package,
  Truck,
  ClipboardCheck,
  DollarSign,
  FileCheck,
  Plus,
  Filter,
  Download,
  Edit2,
  Search,
  Calendar,
  X,
  User,
  MapPin,
  Building2,
  Package as PackageIcon,
  AlertCircle,
  ClipboardList,
  Copy,
  Save,
  Send,
} from "lucide-react";
import OrdenCargueForm from "./OrdenCargueForm";
import RemesaForm from "./RemesaForm";
import ManifiestoForm from "./ManifiestoForm";
import CumplidoForm from "./CumplidoForm";
import AnticipoForm from "./AnticipoForm";
import TransportDashboard from "./TransportDashboard";
import PDFViewer from "../../components/PDFViewer";

type DocumentType =
  | "Pedidos"
  | "Órdenes de Cargue"
  | "Remesas"
  | "Manifiestos"
  | "Anticipos"
  | "Cumplidos";

interface Document {
  id: string;
  type: DocumentType;
  numero: string;
  fecha: string;
  cliente: string;
  origen: string;
  destino: string;
  valor: number;
  estado: "Pendiente" | "En Proceso" | "Completado" | "Anulado";
}

const documentTypes = [
  { name: "Pedidos", icon: FileText, color: "blue" },
  { name: "Órdenes de Cargue", icon: Package, color: "green" },
  { name: "Remesas", icon: Truck, color: "purple" },
  { name: "Manifiestos", icon: FileCheck, color: "orange" },
  { name: "Anticipos", icon: DollarSign, color: "emerald" },
  { name: "Cumplidos", icon: ClipboardCheck, color: "teal" },
];

const mockDocuments: Document[] = [
  {
    id: "1",
    type: "Pedidos",
    numero: "PED-2024-001",
    fecha: "2024-03-10",
    cliente: "Transportes ABC",
    origen: "Bogotá",
    destino: "Medellín",
    valor: 1500000,
    estado: "Pendiente",
  },
  {
    id: "2",
    type: "Órdenes de Cargue",
    numero: "OC-2024-045",
    fecha: "2024-03-11",
    cliente: "Logística XYZ",
    origen: "Cali",
    destino: "Barranquilla",
    valor: 2300000,
    estado: "En Proceso",
  },
  {
    id: "3",
    type: "Remesas",
    numero: "REM-2024-128",
    fecha: "2024-03-12",
    cliente: "Distribuidora 123",
    origen: "Cartagena",
    destino: "Bogotá",
    valor: 1800000,
    estado: "Completado",
  },
  {
    id: "4",
    type: "Manifiestos",
    numero: "MAN-2024-089",
    fecha: "2024-03-13",
    cliente: "Carga Pesada SAS",
    origen: "Medellín",
    destino: "Pereira",
    valor: 3500000,
    estado: "Completado",
  },
  {
    id: "5",
    type: "Anticipos",
    numero: "ANT-2024-067",
    fecha: "2024-03-14",
    cliente: "Envíos Rápidos",
    origen: "Bucaramanga",
    destino: "Cúcuta",
    valor: 950000,
    estado: "Completado",
  },
  {
    id: "6",
    type: "Cumplidos",
    numero: "CUM-2024-067",
    fecha: "2024-03-14",
    cliente: "Envíos Rápidos",
    origen: "Bucaramanga",
    destino: "Cúcuta",
    valor: 950000,
    estado: "Completado",
  },
];

export default function Transporte() {
  const [selectedType, setSelectedType] = useState<DocumentType | "Todos">("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isPDFViewerOpen, setIsPDFViewerOpen] = useState(false);
  const [pdfDocument, setPdfDocument] = useState<Document | null>(null);

  const filteredDocuments = mockDocuments.filter((doc) => {
    const matchesType = selectedType === "Todos" || doc.type === selectedType;
    const matchesSearch =
      doc.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.cliente.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800";
      case "En Proceso":
        return "bg-blue-100 text-blue-800";
      case "Completado":
        return "bg-green-100 text-green-800";
      case "Anulado":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    const docType = documentTypes.find((dt) => dt.name === type);
    return docType?.color || "gray";
  };

  const handleCreateNew = (type: DocumentType) => {
    setSelectedDocument({
      id: "",
      type,
      numero: "",
      fecha: "",
      cliente: "",
      origen: "",
      destino: "",
      valor: 0,
      estado: "Pendiente",
    });
    setIsCreating(true);
    setIsModalOpen(true);
  };

  const handleEdit = (doc: Document) => {
    setSelectedDocument(doc);
    setIsCreating(false);
    setIsModalOpen(true);
  };

  const handleDownload = (doc: Document) => {
    console.log("Descargando documento:", doc.numero);
    // Lógica de descarga
  };

  const handleViewPDF = (doc: Document) => {
    setPdfDocument(doc);
    setIsPDFViewerOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDocument(null);
    setIsCreating(false);
  };

  const closePDFViewer = () => {
    setIsPDFViewerOpen(false);
    setPdfDocument(null);
  };

  return (
    <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            Gestión de Transporte
          </h1>
          <p className="text-sm lg:text-base text-gray-600 mt-1">
            Administra todos tus documentos de transporte en un solo lugar
          </p>
        </div>
      </div>

      {/* Document Type Cards - Create Buttons */}
      <div>
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3 lg:hidden">
          Crear Documento
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-2 lg:gap-4">
          {documentTypes.map((docType) => {
            const Icon = docType.icon;
            const count = mockDocuments.filter((d) => d.type === docType.name).length;

            // Inline color classes to avoid Tailwind purging
            const colorClasses = {
              blue: { border: 'border-blue-200 hover:border-blue-400', bg: 'from-blue-500 to-blue-600', text: 'text-blue-600' },
              green: { border: 'border-green-200 hover:border-green-400', bg: 'from-green-500 to-green-600', text: 'text-green-600' },
              purple: { border: 'border-purple-200 hover:border-purple-400', bg: 'from-purple-500 to-purple-600', text: 'text-purple-600' },
              orange: { border: 'border-orange-200 hover:border-orange-400', bg: 'from-orange-500 to-orange-600', text: 'text-orange-600' },
              emerald: { border: 'border-emerald-200 hover:border-emerald-400', bg: 'from-emerald-500 to-emerald-600', text: 'text-emerald-600' },
              teal: { border: 'border-teal-200 hover:border-teal-400', bg: 'from-teal-500 to-teal-600', text: 'text-teal-600' },
            };

            const colors = colorClasses[docType.color as keyof typeof colorClasses] || colorClasses.blue;

            return (
              <button
                key={docType.name}
                onClick={() => handleCreateNew(docType.name as DocumentType)}
                className={`bg-white p-3 lg:p-4 rounded-xl border-2 ${colors.border} hover:shadow-lg active:scale-95 transition-all group`}
              >
                <div className={`w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br ${colors.bg} rounded-lg flex items-center justify-center mb-2`}>
                  <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 text-xs lg:text-sm mb-0.5 lg:mb-1 leading-tight">
                  {docType.name}
                </h3>
                <div className="flex items-baseline justify-between lg:block">
                  <p className="text-lg lg:text-2xl font-bold text-gray-900">{count}</p>
                  <p className="text-xs text-gray-500">docs</p>
                </div>
                <div className="mt-2 lg:mt-3 hidden lg:flex items-center justify-center gap-1 text-xs ${colors.text} opacity-0 group-hover:opacity-100 transition-opacity">
                  <Plus className="w-3 h-3" />
                  <span>Crear nuevo</span>
                </div>
                {/* Mobile: Show plus icon always */}
                <div className="mt-2 flex lg:hidden items-center justify-center gap-1 text-xs ${colors.text}">
                  <Plus className="w-3.5 h-3.5" />
                  <span className="font-medium">Crear</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-3 lg:gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por número o cliente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Desktop Filters */}
          <div className="hidden lg:flex gap-2">
            <button
              onClick={() => setSelectedType("Todos")}
              className={`px-4 py-2 rounded-lg font-medium active:scale-95 transition-all ${
                selectedType === "Todos"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Todos
            </button>
            {documentTypes.map((docType) => (
              <button
                key={docType.name}
                onClick={() => setSelectedType(docType.name as DocumentType)}
                className={`px-4 py-2 rounded-lg font-medium active:scale-95 transition-all ${
                  selectedType === docType.name
                    ? `bg-${docType.color}-600 text-white shadow-md`
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {docType.name}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Carousel Filters */}
        <div className="lg:hidden mt-3">
          <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
            <div className="flex gap-2 pb-2 min-w-max">
              <button
                onClick={() => setSelectedType("Todos")}
                className={`flex-shrink-0 px-4 py-2.5 rounded-lg font-medium text-sm active:scale-95 transition-all ${
                  selectedType === "Todos"
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 active:bg-gray-200"
                }`}
              >
                Todos
              </button>
              {documentTypes.map((docType) => {
                const getColor = (color: string, isSelected: boolean) => {
                  if (!isSelected) return "bg-gray-100 text-gray-700 active:bg-gray-200";
                  
                  const colors: Record<string, string> = {
                    blue: "bg-blue-600 text-white",
                    green: "bg-green-600 text-white",
                    purple: "bg-purple-600 text-white",
                    orange: "bg-orange-600 text-white",
                  };
                  return `${colors[color] || "bg-gray-600 text-white"} shadow-md`;
                };

                return (
                  <button
                    key={docType.name}
                    onClick={() => setSelectedType(docType.name as DocumentType)}
                    className={`flex-shrink-0 px-4 py-2.5 rounded-lg font-medium text-sm active:scale-95 transition-all whitespace-nowrap ${
                      getColor(docType.color, selectedType === docType.name)
                    }`}
                  >
                    {docType.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Documents - Desktop Table / Mobile Cards */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Número
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Ruta
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Valor
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredDocuments.map((doc) => {
                const typeColor = getTypeColor(doc.type);
                return (
                  <tr
                    key={doc.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-${typeColor}-100 text-${typeColor}-800`}
                      >
                        {doc.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {doc.numero}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {new Date(doc.fecha).toLocaleDateString("es-CO")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                      {doc.cliente}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {doc.origen} → {doc.destino}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      ${doc.valor.toLocaleString("es-CO")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          doc.estado
                        )}`}
                      >
                        {doc.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(doc)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                          title="Editar"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDownload(doc)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-all"
                          title="Descargar"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleViewPDF(doc)}
                          className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-all"
                          title="Ver PDF"
                        >
                          <FileCheck className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden divide-y divide-gray-200">
          {filteredDocuments.map((doc) => {
            const typeColor = getTypeColor(doc.type);
            const Icon = documentTypes.find((dt) => dt.name === doc.type)?.icon || FileText;
            return (
              <div
                key={doc.id}
                className="p-4 hover:bg-gray-50 active:bg-gray-100 transition-colors"
              >
                {/* Header: Tipo + Número */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className={`w-10 h-10 bg-gradient-to-br from-${typeColor}-500 to-${typeColor}-600 rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        {doc.type}
                      </p>
                      <p className="font-bold text-gray-900 text-base truncate">
                        {doc.numero}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusColor(
                      doc.estado
                    )}`}
                  >
                    {doc.estado}
                  </span>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Fecha</p>
                    <p className="text-sm font-medium text-gray-900 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      {new Date(doc.fecha).toLocaleDateString("es-CO", {
                        day: "2-digit",
                        month: "short",
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Valor</p>
                    <p className="text-sm font-bold text-gray-900">
                      ${(doc.valor / 1000).toFixed(0)}K
                    </p>
                  </div>
                </div>

                {/* Cliente */}
                <div className="mb-3">
                  <p className="text-xs text-gray-500 mb-1">Cliente</p>
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {doc.cliente}
                  </p>
                </div>

                {/* Ruta */}
                <div className="mb-3">
                  <p className="text-xs text-gray-500 mb-1">Ruta</p>
                  <p className="text-sm text-gray-700 flex items-center gap-1 truncate">
                    <MapPin className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                    <span className="truncate">{doc.origen}</span>
                    <span className="text-gray-400">→</span>
                    <span className="truncate">{doc.destino}</span>
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => handleViewPDF(doc)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:scale-95 transition-all font-medium text-sm"
                  >
                    <FileCheck className="w-4 h-4" />
                    <span>Ver</span>
                  </button>
                  <button
                    onClick={() => handleEdit(doc)}
                    className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 active:scale-95 transition-all font-medium text-sm"
                  >
                    <Edit2 className="w-4 h-4" />
                    <span>Editar</span>
                  </button>
                  <button
                    onClick={() => handleDownload(doc)}
                    className="p-2.5 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 active:scale-95 transition-all"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredDocuments.length === 0 && (
          <div className="py-12 text-center">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No se encontraron documentos</p>
            <p className="text-gray-400 text-sm mt-2">
              Intenta cambiar los filtros o crear un nuevo documento
            </p>
          </div>
        )}
      </div>

      {/* Modal - Full Screen on Mobile */}
      {isModalOpen && selectedDocument && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm z-50 lg:flex lg:items-center lg:justify-center lg:p-4">
          <div className="bg-white lg:rounded-xl shadow-2xl lg:max-w-4xl w-full h-full lg:h-auto lg:max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-[#40A095] to-[#99D6CF] lg:bg-white lg:border-b border-gray-200 px-4 lg:px-6 py-4 flex items-center justify-between z-10">
              <h2 className="text-xl lg:text-2xl font-bold text-white lg:text-gray-900">
                {isCreating ? "Crear" : "Editar"} {selectedDocument.type}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 text-white lg:text-gray-400 hover:text-white/80 lg:hover:text-gray-600 hover:bg-white/10 lg:hover:bg-gray-100 rounded-lg transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Formulario condicional según el tipo */}
            {selectedDocument.type === "Pedidos" ? (
              // Formulario completo de Pedidos
              <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
                {/* 1. Datos Básicos del Pedido */}
                <div className="bg-gradient-to-br from-[#40A095]/5 to-[#99D6CF]/5 rounded-xl p-4 lg:p-6 border border-[#99D6CF]/20">
                  <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-3 lg:mb-4 flex items-center gap-2">
                    <ClipboardList className="w-4 lg:w-5 h-4 lg:h-5 text-[#40A095]" />
                    Datos Básicos del Pedido
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Número de Pedido
                      </label>
                      <input
                        type="text"
                        defaultValue={selectedDocument.numero || "PED-001239"}
                        disabled={!isCreating}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Compañía
                      </label>
                      <input
                        type="text"
                        placeholder="Nombre de la compañía"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#40A095] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo de Operación *
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#40A095] focus:border-transparent">
                        <option>Seleccione...</option>
                        <option>Transporte Nacional</option>
                        <option>Transporte Internacional</option>
                        <option>Urbano</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo de Servicio *
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#40A095] focus:border-transparent">
                        <option>Seleccione...</option>
                        <option>Carga completa</option>
                        <option>Carga parcial</option>
                        <option>Express</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fecha del Pedido *
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="date"
                          defaultValue={selectedDocument.fecha || "2026-03-14"}
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#40A095] focus:border-transparent"
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
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
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
                      />
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
                        defaultValue={selectedDocument.origen}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ciudad Origen *
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
                        <option>Seleccione ciudad...</option>
                        <option>Bogotá</option>
                        <option>Medellín</option>
                        <option>Cali</option>
                        <option>Barranquilla</option>
                      </select>
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
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
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
                      />
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
                        defaultValue={selectedDocument.destino}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ciudad Destino *
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white">
                        <option>Seleccione ciudad...</option>
                        <option>Bogotá</option>
                        <option>Medellín</option>
                        <option>Cali</option>
                        <option>Barranquilla</option>
                      </select>
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
                    <button className="flex items-center gap-2 px-3 py-2 bg-white border border-green-300 text-green-700 rounded-lg hover:bg-green-50 active:scale-95 transition-all text-sm font-medium">
                      <Copy className="w-4 h-4" />
                      <span className="hidden lg:inline">Copiar del Remitente</span>
                      <span className="lg:hidden">Copiar</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
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
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
                    <div className="lg:col-span-2">
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
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-4">
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
                        defaultValue={selectedDocument.valor}
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
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
                    <div className="lg:col-span-2">
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
                      <select defaultValue="Alta" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-white">
                        <option>Baja</option>
                        <option>Media</option>
                        <option>Alta</option>
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

                {/* Botones de Acción */}
                <div className="sticky bottom-0 left-0 right-0 bg-white lg:bg-transparent flex flex-col lg:flex-row items-stretch lg:items-center justify-end gap-2 lg:gap-3 p-4 lg:p-0 lg:pt-4 border-t border-gray-200 -mx-4 lg:mx-0 -mb-4 lg:mb-0 shadow-lg lg:shadow-none">
                  <button
                    onClick={closeModal}
                    className="w-full lg:w-auto px-4 lg:px-6 py-3 lg:py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 active:scale-95 transition-all flex items-center justify-center gap-2 font-medium order-3 lg:order-1"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancelar</span>
                  </button>
                  <button className="w-full lg:w-auto px-4 lg:px-6 py-3 lg:py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 active:scale-95 transition-all flex items-center justify-center gap-2 font-medium order-2 lg:order-2">
                    <Save className="w-4 h-4" />
                    <span className="hidden lg:inline">Guardar Pedido</span>
                    <span className="lg:hidden">Guardar</span>
                  </button>
                  <button className="w-full lg:w-auto px-4 lg:px-6 py-3 lg:py-2.5 bg-gradient-to-r from-[#40A095] to-[#99D6CF] text-white rounded-lg hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 font-medium order-1 lg:order-3">
                    <Send className="w-4 h-4" />
                    <span className="hidden lg:inline">Guardar y Generar Orden de Cargue</span>
                    <span className="lg:hidden">Generar Orden</span>
                  </button>
                </div>
              </div>
            ) : selectedDocument.type === "Órdenes de Cargue" ? (
              // Formulario completo de Orden de Cargue
              <OrdenCargueForm
                selectedDocument={selectedDocument}
                isCreating={isCreating}
                onClose={closeModal}
              />
            ) : selectedDocument.type === "Remesas" ? (
              // Formulario completo de Remesas
              <RemesaForm
                selectedDocument={selectedDocument}
                isCreating={isCreating}
                onClose={closeModal}
              />
            ) : selectedDocument.type === "Manifiestos" ? (
              // Formulario completo de Manifiestos
              <ManifiestoForm
                selectedDocument={selectedDocument}
                isCreating={isCreating}
                onClose={closeModal}
              />
            ) : selectedDocument.type === "Anticipos" ? (
              // Formulario completo de Anticipos
              <AnticipoForm
                selectedDocument={selectedDocument}
                isCreating={isCreating}
                onClose={closeModal}
              />
            ) : selectedDocument.type === "Cumplidos" ? (
              // Formulario completo de Cumplidos
              <CumplidoForm
                selectedDocument={selectedDocument}
                isCreating={isCreating}
                onClose={closeModal}
              />
            ) : (
              // Formulario simple para otros tipos de documentos
              <div className="p-6 space-y-6">
                {/* Número y Fecha */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Número de Documento
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedDocument.numero}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ej: PED-2024-001"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fecha
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        defaultValue={selectedDocument.fecha}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Cliente */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cliente
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedDocument.cliente}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nombre del cliente"
                  />
                </div>

                {/* Origen y Destino */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Origen
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedDocument.origen}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ciudad de origen"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Destino
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedDocument.destino}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ciudad de destino"
                    />
                  </div>
                </div>

                {/* Valor */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Valor ($)
                  </label>
                  <input
                    type="number"
                    defaultValue={selectedDocument.valor}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                  />
                </div>

                {/* Estado */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estado
                  </label>
                  <select
                    defaultValue={selectedDocument.estado}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="En Proceso">En Proceso</option>
                    <option value="Completado">Completado</option>
                    <option value="Anulado">Anulado</option>
                  </select>
                </div>

                {/* Acciones */}
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={closeModal}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
                  >
                    Cancelar
                  </button>
                  <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 shadow-md transition-all">
                    {isCreating ? "Crear" : "Guardar"} Documento
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* PDF Viewer */}
      {isPDFViewerOpen && pdfDocument && (
        <PDFViewer
          documentData={pdfDocument}
          documentType={pdfDocument.type}
          onClose={closePDFViewer}
        />
      )}
    </div>
  );
}