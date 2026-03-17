import { useState } from "react";
import {
  FileText,
  Receipt,
  CreditCard,
  FileSpreadsheet,
  Plus,
  Search,
  Download,
  Edit2,
  X,
  Calendar,
} from "lucide-react";

type DocumentType =
  | "Facturas"
  | "Notas Crédito"
  | "Notas Débito"
  | "Recibos de Caja"
  | "Comprobantes de Egreso"
  | "Comprobantes Contables";

interface Document {
  id: string;
  type: DocumentType;
  numero: string;
  fecha: string;
  tercero: string;
  valor: number;
  estado: "Pendiente" | "Contabilizado" | "Anulado";
}

const documentTypes = [
  { name: "Facturas", icon: FileText, color: "blue" },
  { name: "Notas Crédito", icon: Receipt, color: "green" },
  { name: "Notas Débito", icon: FileSpreadsheet, color: "red" },
  { name: "Recibos de Caja", icon: CreditCard, color: "purple" },
  { name: "Comprobantes de Egreso", icon: FileText, color: "orange" },
  { name: "Comprobantes Contables", icon: FileSpreadsheet, color: "teal" },
];

const mockDocuments: Document[] = [
  {
    id: "1",
    type: "Facturas",
    numero: "FAC-2024-001",
    fecha: "2024-03-10",
    tercero: "Cliente ABC SAS",
    valor: 5000000,
    estado: "Contabilizado",
  },
  {
    id: "2",
    type: "Notas Crédito",
    numero: "NC-2024-015",
    fecha: "2024-03-11",
    tercero: "Distribuidora XYZ",
    valor: 1200000,
    estado: "Pendiente",
  },
  {
    id: "3",
    type: "Recibos de Caja",
    numero: "RC-2024-078",
    fecha: "2024-03-12",
    tercero: "Logística 123",
    valor: 3500000,
    estado: "Contabilizado",
  },
];

export default function DocumentosContabilidad() {
  const [selectedType, setSelectedType] = useState<DocumentType | "Todos">("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const filteredDocuments = mockDocuments.filter((doc) => {
    const matchesType = selectedType === "Todos" || doc.type === selectedType;
    const matchesSearch =
      doc.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tercero.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800";
      case "Contabilizado":
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
      tercero: "",
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
          Documentos Contables
        </h1>
        <p className="text-gray-600 mt-1">
          Gestión de documentos contables y financieros
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
            placeholder="Buscar por número o tercero..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
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
                  Tercero
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
                    {doc.tercero}
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
                  Tercero
                </label>
                <input
                  type="text"
                  defaultValue={selectedDocument.tercero}
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
                  <option value="Contabilizado">Contabilizado</option>
                  <option value="Anulado">Anulado</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={closeModal}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
                >
                  Cancelar
                </button>
                <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 shadow-md transition-all">
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