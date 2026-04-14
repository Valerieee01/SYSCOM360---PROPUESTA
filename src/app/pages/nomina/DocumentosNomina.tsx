import { useState } from "react";
import {
  FileText,
  DollarSign,
  Users,
  Plus,
  Search,
  Download,
  Edit2,
  X,
} from "lucide-react";

type DocumentType =
  | "Nómina Mensual"
  | "Liquidación"
  | "Certificados Laborales"
  | "Paz y Salvo"
  | "Vacaciones"
  | "Incapacidades";

interface Document {
  id: string;
  type: DocumentType;
  numero: string;
  fecha: string;
  empleado: string;
  valor: number;
  estado: "Pendiente" | "Pagado" | "Anulado";
}

const documentTypes = [
  { name: "Nómina Mensual", icon: DollarSign, color: "blue" },
  { name: "Liquidación", icon: FileText, color: "red" },
  { name: "Certificados Laborales", icon: FileText, color: "green" },
  { name: "Paz y Salvo", icon: FileText, color: "purple" },
  { name: "Vacaciones", icon: Users, color: "orange" },
  { name: "Incapacidades", icon: FileText, color: "teal" },
];

const mockDocuments: Document[] = [
  {
    id: "1",
    type: "Nómina Mensual",
    numero: "NOM-2024-03",
    fecha: "2024-03-01",
    empleado: "Todos los empleados",
    valor: 45000000,
    estado: "Pagado",
  },
  {
    id: "2",
    type: "Liquidación",
    numero: "LIQ-2024-008",
    fecha: "2024-03-10",
    empleado: "Juan Pérez",
    valor: 8500000,
    estado: "Pendiente",
  },
  {
    id: "3",
    type: "Vacaciones",
    numero: "VAC-2024-025",
    fecha: "2024-03-12",
    empleado: "María González",
    valor: 2300000,
    estado: "Pagado",
  },
];

export default function DocumentosNomina() {
  const [selectedType, setSelectedType] = useState<DocumentType | "Todos">("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const filteredDocuments = mockDocuments.filter((doc) => {
    const matchesType = selectedType === "Todos" || doc.type === selectedType;
    const matchesSearch =
      doc.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.empleado.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800";
      case "Pagado":
        return "bg-green-100 text-green-800";
      case "Anulado":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleCreateNew = (type: DocumentType) => {
    setSelectedDocument({
      id: "",
      type,
      numero: "",
      fecha: "",
      empleado: "",
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

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDocument(null);
    setIsCreating(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Documentos de Nómina
        </h1>
        <p className="text-gray-600 mt-1">
          Gestión de documentos de nómina y recursos humanos
        </p>
      </div>

      {/* Document Type Cards */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documentTypes.map((docType) => {
          const Icon = docType.icon;
          const count = mockDocuments.filter((d) => d.type === docType.name).length;
          return (
            <button
              key={docType.name}
              onClick={() => handleCreateNew(docType.name as DocumentType)}
              className="bg-white p-4 rounded-xl border-2 border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all group"
            >
              <div className={`w-12 h-12 bg-gradient-to-br from-${docType.color}-500 to-${docType.color}-600 rounded-lg flex items-center justify-center mb-3`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 text-sm mb-1">
                {docType.name}
              </h3>
              <p className="text-2xl font-bold text-gray-900">{count}</p>
              <div className="mt-3 flex items-center justify-center gap-1 text-xs text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                <Plus className="w-3 h-3" />
                <span>Crear nuevo</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Mobile Carousel - Document Types */}
      <div className="md:hidden">
        <div className="overflow-x-auto scrollbar-hide -mx-6 px-6">
          <div className="flex gap-3 pb-3">
            {documentTypes.map((docType) => {
              const Icon = docType.icon;
              const count = mockDocuments.filter((d) => d.type === docType.name).length;
              
              const getGradient = (color: string) => {
                const gradients: Record<string, string> = {
                  blue: "from-blue-500 to-blue-600",
                  green: "from-green-500 to-green-600",
                  red: "from-red-500 to-red-600",
                  purple: "from-purple-500 to-purple-600",
                  orange: "from-orange-500 to-orange-600",
                  teal: "from-[#40A095] to-[#99D6CF]",
                };
                return gradients[color] || "from-gray-500 to-gray-600";
              };

              return (
                <button
                  key={docType.name}
                  onClick={() => handleCreateNew(docType.name as DocumentType)}
                  className="flex-shrink-0 w-40 bg-white p-4 rounded-xl border-2 border-gray-200 active:border-[#40A095] active:shadow-lg transition-all"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${getGradient(docType.color)} rounded-lg flex items-center justify-center mb-3`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-xs mb-1 truncate">
                    {docType.name}
                  </h3>
                  <p className="text-xl font-bold text-gray-900 mb-2">{count}</p>
                  <div className="flex items-center justify-center gap-1 text-xs text-[#40A095]">
                    <Plus className="w-3 h-3" />
                    <span>Crear</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="flex justify-center gap-1 mt-2">
          {documentTypes.map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all ${
                i === 0 ? "w-6 bg-[#40A095]" : "w-1 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por número o empleado..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Documents - Desktop Table / Mobile Cards */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Tipo
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Número
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Fecha
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Empleado
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Valor
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Estado
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredDocuments.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
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
                    {doc.empleado}
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
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-all">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden divide-y divide-gray-200">
          {filteredDocuments.map((doc) => {
            const docType = documentTypes.find((dt) => dt.name === doc.type);
            const Icon = docType?.icon || FileText;
            const colorClass = {
              blue: { bg: 'from-blue-500 to-blue-600' },
              red: { bg: 'from-red-500 to-red-600' },
              green: { bg: 'from-green-500 to-green-600' },
              purple: { bg: 'from-purple-500 to-purple-600' },
              orange: { bg: 'from-orange-500 to-orange-600' },
              teal: { bg: 'from-teal-500 to-teal-600' },
            }[docType?.color || 'blue'] || { bg: 'from-gray-500 to-gray-600' };

            return (
              <div
                key={doc.id}
                className="p-4 hover:bg-gray-50 active:bg-gray-100 transition-colors"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className={`w-10 h-10 bg-gradient-to-br ${colorClass.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide truncate">
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

                {/* Info */}
                <div className="space-y-2 mb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Fecha</span>
                    <span className="text-sm font-medium text-gray-900">
                      {new Date(doc.fecha).toLocaleDateString("es-CO", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Empleado</span>
                    <span className="text-sm font-medium text-gray-900 truncate ml-2">
                      {doc.empleado}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Valor</span>
                    <span className="text-sm font-bold text-gray-900">
                      ${(doc.valor / 1000000).toFixed(1)}M
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => handleEdit(doc)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:scale-95 transition-all font-medium text-sm"
                  >
                    <Edit2 className="w-4 h-4" />
                    <span>Editar</span>
                  </button>
                  <button className="p-2.5 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 active:scale-95 transition-all">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedDocument && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {isCreating ? "Crear" : "Editar"} {selectedDocument.type}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Número
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedDocument.numero}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fecha
                  </label>
                  <input
                    type="date"
                    defaultValue={selectedDocument.fecha}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Empleado
                </label>
                <input
                  type="text"
                  defaultValue={selectedDocument.empleado}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Valor ($)
                </label>
                <input
                  type="number"
                  defaultValue={selectedDocument.valor}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estado
                </label>
                <select
                  defaultValue={selectedDocument.estado}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Pendiente">Pendiente</option>
                  <option value="Pagado">Pagado</option>
                  <option value="Anulado">Anulado</option>
                </select>
              </div>

              <div className="sticky bottom-0 left-0 right-0 bg-white lg:bg-transparent flex flex-col lg:flex-row items-stretch lg:items-center justify-end gap-2 lg:gap-3 p-4 lg:p-0 lg:pt-4 border-t border-gray-200 -mx-6 lg:mx-0 -mb-6 lg:mb-0 shadow-lg lg:shadow-none">
                <button
                  onClick={closeModal}
                  className="w-full lg:w-auto px-4 lg:px-6 py-3 lg:py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 active:scale-95 transition-all order-2 lg:order-1"
                >
                  Cancelar
                </button>
                <button className="w-full lg:w-auto px-4 lg:px-6 py-3 lg:py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 shadow-md active:scale-95 transition-all order-1 lg:order-2">
                  {isCreating ? "Crear" : "Guardar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}