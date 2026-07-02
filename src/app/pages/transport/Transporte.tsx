import { useState, useEffect } from "react";
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
  Eye,
  XCircle,
  Info,
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
  ArrowUpRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import OrdenCargueForm from "./OrdenCargueForm";
import RemesaForm from "./RemesaForm";
import ManifiestoForm from "./ManifiestoForm";
import CumplidoForm from "./CumplidoForm";
import AnticipoForm from "./AnticipoForm";
import TransportDashboard from "./TransportDashboard";
import PDFViewer from "../../components/PDFViewer";
import { useTransport } from "../../context/TransportContext";
import {
  getSubprocesos,
  type SubprocesoDef,
} from "./subprocesos";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../../components/ui/dropdown-menu";

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
  compania: string;
  cliente: string;
  origen: string;
  destino: string;
  vehiculo: string;
  valor: number;
  estado: "Pendiente" | "En Proceso" | "Completado" | "Aplicado" | "Anulado";
}

// Permisos de creación (por ahora todos habilitados; se conectaría al rol del
// usuario). Si un tipo no es creable, la card muestra "Solo visualización".
const tiposCreables = new Set<DocumentType>([
  "Pedidos",
  "Órdenes de Cargue",
  "Remesas",
  "Manifiestos",
  "Anticipos",
  "Cumplidos",
]);
const puedeCrear = (type: DocumentType) => tiposCreables.has(type);

// `hoy` = documentos creados hoy para ese tipo · `singular` = para el botón "Crear ..."
const documentTypes = [
  { name: "Pedidos", singular: "pedido", icon: FileText, color: "blue", hoy: 12 },
  { name: "Órdenes de Cargue", singular: "orden", icon: Package, color: "yellow", hoy: 8 },
  { name: "Remesas", singular: "remesa", icon: Truck, color: "purple", hoy: 15 },
  { name: "Manifiestos", singular: "manifiesto", icon: FileCheck, color: "orange", hoy: 7 },
  { name: "Anticipos", singular: "anticipo", icon: DollarSign, color: "cyan", hoy: 5 },
  { name: "Cumplidos", singular: "cumplido", icon: ClipboardCheck, color: "teal", hoy: 9 },
];

// Badge por tipo de documento (color propio según diseño de referencia)
const tipoBadge: Record<DocumentType, { label: string; className: string }> = {
  Pedidos: { label: "Pedido", className: "bg-blue-100 text-blue-700" },
  "Órdenes de Cargue": { label: "Órden", className: "bg-yellow-100 text-yellow-700" },
  Remesas: { label: "Remesa", className: "bg-purple-100 text-purple-700" },
  Manifiestos: { label: "Manifiesto", className: "bg-orange-100 text-orange-700" },
  Cumplidos: { label: "Cumplido", className: "bg-cyan-100 text-cyan-700" },
  Anticipos: { label: "Anticipo", className: "bg-cyan-50 text-cyan-600" },
};

// Badge por estado
const estadoBadge: Record<Document["estado"], string> = {
  Pendiente: "bg-yellow-100 text-yellow-800",
  Anulado: "bg-purple-100 text-purple-800",
  "En Proceso": "bg-blue-100 text-blue-800",
  Completado: "bg-green-100 text-green-800",
  Aplicado: "bg-green-100 text-green-800",
};

// Punto de color por estado (lista móvil / leyenda)
const estadoDot: Record<Document["estado"], string> = {
  Pendiente: "bg-yellow-400",
  Aplicado: "bg-green-500",
  Anulado: "bg-red-500",
  "En Proceso": "bg-blue-500",
  Completado: "bg-green-500",
};

// Acciones disponibles por tipo (ver/descargar siempre disponibles).
// La edición además se oculta si el documento está Anulado (regla de negocio).
const accionesPorTipo: Record<DocumentType, { editar: boolean; duplicar: boolean }> = {
  Pedidos: { editar: true, duplicar: true },
  "Órdenes de Cargue": { editar: true, duplicar: true },
  Remesas: { editar: false, duplicar: true },
  Manifiestos: { editar: false, duplicar: false },
  Cumplidos: { editar: false, duplicar: false },
  Anticipos: { editar: false, duplicar: false },
};

// Ruta con formato "ORIGEN _ DESTINO NNNN"
const rutaFormat = (doc: Document) => {
  const digits = doc.numero.replace(/\D/g, "");
  const suffix = digits.slice(-4).padStart(4, "0");
  return `${doc.origen.toUpperCase()} _ ${doc.destino.toUpperCase()} ${suffix}`;
};

const mockDocuments: Document[] = [
  { id: "1", type: "Pedidos", numero: "PED-2024-001", fecha: "2024-03-10", compania: "01", cliente: "Transportes ABC", origen: "Bogotá", destino: "Medellín", vehiculo: "ABC-123", valor: 1500000, estado: "Pendiente" },
  { id: "2", type: "Órdenes de Cargue", numero: "OC-2024-045", fecha: "2024-03-11", compania: "01", cliente: "Logística XYZ", origen: "Cali", destino: "Barranquilla", vehiculo: "DEF-456", valor: 2300000, estado: "Anulado" },
  { id: "3", type: "Remesas", numero: "REM-2024-128", fecha: "2024-03-12", compania: "02", cliente: "Distribuidora 123", origen: "Cartagena", destino: "Bogotá", vehiculo: "GHI-789", valor: 1800000, estado: "Pendiente" },
  { id: "4", type: "Manifiestos", numero: "MAN-2024-089", fecha: "2024-03-13", compania: "01", cliente: "Carga Pesada SAS", origen: "Medellín", destino: "Pereira", vehiculo: "JKL-012", valor: 3500000, estado: "Aplicado" },
  { id: "5", type: "Anticipos", numero: "ANT-2024-067", fecha: "2024-03-14", compania: "03", cliente: "Envíos Rápidos", origen: "Bucaramanga", destino: "Cúcuta", vehiculo: "MNO-345", valor: 950000, estado: "Completado" },
  { id: "6", type: "Cumplidos", numero: "CUM-2024-067", fecha: "2024-03-14", compania: "01", cliente: "Envíos Rápidos", origen: "Bucaramanga", destino: "Cúcuta", vehiculo: "MNO-345", valor: 950000, estado: "Completado" },
  { id: "7", type: "Pedidos", numero: "PED-2024-002", fecha: "2024-03-15", compania: "02", cliente: "Comercial del Norte", origen: "Barranquilla", destino: "Cali", vehiculo: "PQR-678", valor: 2100000, estado: "En Proceso" },
  { id: "8", type: "Remesas", numero: "REM-2024-129", fecha: "2024-03-15", compania: "01", cliente: "Almacenes Sur", origen: "Bogotá", destino: "Cúcuta", vehiculo: "STU-901", valor: 1250000, estado: "Anulado" },
  { id: "9", type: "Órdenes de Cargue", numero: "OC-2024-046", fecha: "2024-03-16", compania: "03", cliente: "Logística XYZ", origen: "Medellín", destino: "Bogotá", vehiculo: "VWX-234", valor: 2750000, estado: "Pendiente" },
  { id: "10", type: "Manifiestos", numero: "MAN-2024-090", fecha: "2024-03-16", compania: "02", cliente: "Carga Pesada SAS", origen: "Cali", destino: "Pasto", vehiculo: "YZA-567", valor: 4100000, estado: "Pendiente" },
  { id: "11", type: "Anticipos", numero: "ANT-2024-068", fecha: "2024-03-17", compania: "01", cliente: "Transportes ABC", origen: "Bogotá", destino: "Ibagué", vehiculo: "BCD-890", valor: 780000, estado: "Pendiente" },
  { id: "12", type: "Cumplidos", numero: "CUM-2024-068", fecha: "2024-03-17", compania: "03", cliente: "Distribuidora 123", origen: "Cartagena", destino: "Montería", vehiculo: "EFG-123", valor: 1650000, estado: "Aplicado" },
];

export default function Transporte() {
  const { mostrarToast } = useTransport();
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [selectedType, setSelectedType] = useState<DocumentType | "Todos">("Todos");
  const [searchTerm, setSearchTerm] = useState(""); // filtro "Documento" (número)
  const [companiaFilter, setCompaniaFilter] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [showFiltrosMobile, setShowFiltrosMobile] = useState(false);
  // Subproceso activo (host genérico): cualquier entrada del registro SUBPROCESOS
  const [activeSubproceso, setActiveSubproceso] = useState<SubprocesoDef | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isPDFViewerOpen, setIsPDFViewerOpen] = useState(false);
  const [pdfDocument, setPdfDocument] = useState<Document | null>(null);
  // Paginación
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [goToPage, setGoToPage] = useState("");

  const handleAnular = (doc: Document) => {
    setDocuments((prev) =>
      prev.map((d) => (d.id === doc.id ? { ...d, estado: "Anulado" } : d))
    );
    mostrarToast("warning", `Documento ${doc.numero} anulado.`);
  };

  const filteredDocuments = documents.filter((doc) => {
    const matchesType = selectedType === "Todos" || doc.type === selectedType;
    const matchesDocumento = doc.numero.toLowerCase().includes(searchTerm.trim().toLowerCase());
    const matchesCompania = doc.compania.toLowerCase().includes(companiaFilter.trim().toLowerCase());
    const matchesInicio = !fechaInicio || doc.fecha >= fechaInicio;
    const matchesFin = !fechaFin || doc.fecha <= fechaFin;
    return matchesType && matchesDocumento && matchesCompania && matchesInicio && matchesFin;
  });

  // Reiniciar a la primera página cuando cambian filtros o el tamaño de página
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedType, searchTerm, companiaFilter, fechaInicio, fechaFin, itemsPerPage]);

  const totalRegistros = filteredDocuments.length;
  const totalPages = Math.max(1, Math.ceil(totalRegistros / itemsPerPage));
  const pageSafe = Math.min(currentPage, totalPages);
  const startIndex = (pageSafe - 1) * itemsPerPage;
  const paginatedDocuments = filteredDocuments.slice(startIndex, startIndex + itemsPerPage);
  const rangoInicio = totalRegistros === 0 ? 0 : startIndex + 1;
  const rangoFin = Math.min(startIndex + itemsPerPage, totalRegistros);

  const limpiarFiltros = () => {
    setSelectedType("Todos");
    setSearchTerm("");
    setCompaniaFilter("");
    setFechaInicio("");
    setFechaFin("");
  };

  const irAPagina = (p: number) => setCurrentPage(Math.min(Math.max(1, p), totalPages));

  const handleGoTo = () => {
    const n = parseInt(goToPage, 10);
    if (!isNaN(n)) irAPagina(n);
    setGoToPage("");
  };

  const handleCreateNew = (type: DocumentType) => {
    setSelectedDocument({
      id: "",
      type,
      numero: "",
      fecha: "",
      compania: "",
      cliente: "",
      origen: "",
      destino: "",
      vehiculo: "",
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

  // Campos de filtro reutilizados en la fila desktop y en el bottom-sheet móvil
  const camposFiltros = (
    <>
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1.5">Tipo Documento</label>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value as DocumentType | "Todos")}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#40A095] bg-white"
        >
          <option value="Todos">Todos</option>
          {documentTypes.map((dt) => (
            <option key={dt.name} value={dt.name}>{dt.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1.5">Documento</label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Ej: 10"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#40A095]"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1.5">Compañía</label>
        <input
          type="text"
          value={companiaFilter}
          onChange={(e) => setCompaniaFilter(e.target.value)}
          placeholder="01"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#40A095]"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1.5">Fecha Inicio</label>
        <input
          type="date"
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#40A095]"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1.5">Fecha Fin</label>
        <input
          type="date"
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#40A095]"
        />
      </div>
    </>
  );

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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3 lg:gap-4">
          {documentTypes.map((docType) => {
            const Icon = docType.icon;

            // Button color mappings based on image
            const buttonColors = {
              blue: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
              yellow: 'bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600',
              purple: 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
              orange: 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700',
              cyan: 'bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-cyan-600',
              teal: 'bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700',
            };

            const iconBgColors = {
              blue: 'bg-blue-50',
              yellow: 'bg-yellow-50',
              purple: 'bg-purple-50',
              orange: 'bg-orange-50',
              cyan: 'bg-cyan-50',
              teal: 'bg-cyan-50',
            };

            const iconColors = {
              blue: 'text-blue-500',
              yellow: 'text-yellow-500',
              purple: 'text-purple-500',
              orange: 'text-orange-500',
              cyan: 'text-cyan-500',
              teal: 'text-cyan-500',
            };

            const buttonColor = buttonColors[docType.color as keyof typeof buttonColors] || buttonColors.blue;
            const iconBg = iconBgColors[docType.color as keyof typeof iconBgColors] || iconBgColors.blue;
            const iconColor = iconColors[docType.color as keyof typeof iconColors] || iconColors.blue;

            // Subprocesos asociados a esta tarjeta (desde el registro declarativo)
            const subprocesos = getSubprocesos(docType.name);

            return (
              <div
                key={docType.name}
                className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Icon */}
                <div className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center mb-3`}>
                  <Icon className={`w-6 h-6 ${iconColor}`} />
                </div>

                {/* Título del tipo de documento */}
                <h3 className="font-semibold text-gray-900 text-sm mb-2">
                  {docType.name}
                </h3>

                {/* Pill "Hoy" + cantidad creada hoy */}
                <div className="mb-3">
                  <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    Hoy
                    <span className="ml-0.5 font-bold text-gray-900">{docType.hoy}</span>
                  </span>
                </div>

                {/* Acción: Crear (si el rol lo permite) o etiqueta de solo lectura */}
                {puedeCrear(docType.name as DocumentType) ? (
                  <button
                    onClick={() => handleCreateNew(docType.name as DocumentType)}
                    className={`w-full ${buttonColor} text-white text-sm font-medium py-2.5 rounded-lg active:scale-95 transition-all shadow-sm flex items-center justify-center gap-2`}
                  >
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">Crear {docType.singular}</span>
                    <span className="sm:hidden">Crear</span>
                  </button>
                ) : (
                  <div className="w-full py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-500 text-xs font-medium flex items-center justify-center gap-1.5">
                    <Info className="w-3.5 h-3.5" />
                    <span>Solo visualización</span>
                  </div>
                )}

                {/* Slot de subprocesos: altura reservada en TODAS las tarjetas para
                    mantener la armonía. Se adapta a la cantidad de subprocesos:
                    0 → vacío · 1 → enlace directo · ≥2 → menú "Procesos (n)". */}
                <div className="mt-2 h-5 flex items-center justify-center">
                  {subprocesos.length === 1 && (
                    <button
                      onClick={() => setActiveSubproceso(subprocesos[0])}
                      className="text-xs font-medium text-[#40A095] hover:text-[#2f7d74] active:scale-95 transition-all flex items-center justify-center gap-1"
                    >
                      <span>{subprocesos[0].label}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {subprocesos.length > 1 && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="text-xs font-medium text-[#40A095] hover:text-[#2f7d74] active:scale-95 transition-all flex items-center justify-center gap-1 outline-none">
                          <span>Procesos ({subprocesos.length})</span>
                          <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="center" className="w-56">
                        {subprocesos.map((sp) => {
                          const SpIcon = sp.icon;
                          return (
                            <DropdownMenuItem
                              key={sp.id}
                              onClick={() => setActiveSubproceso(sp)}
                              className="gap-2 cursor-pointer"
                            >
                              <SpIcon className="w-4 h-4 text-[#40A095]" />
                              <span>{sp.label}</span>
                            </DropdownMenuItem>
                          );
                        })}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filters Bar — desktop/tablet (inline) */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {camposFiltros}
        </div>
        <div className="flex items-center justify-end gap-2 mt-3">
          <button
            onClick={limpiarFiltros}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 active:scale-95 transition-all text-sm font-medium"
          >
            Limpiar
          </button>
          <button
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 active:scale-95 transition-all text-sm font-medium flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            Buscar
          </button>
        </div>
      </div>

      {/* Filtros — móvil (botón que abre bottom-sheet) */}
      <button
        onClick={() => setShowFiltrosMobile(true)}
        className="md:hidden w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg active:scale-95 transition-all font-medium shadow-sm"
      >
        <Filter className="w-5 h-5" />
        <span>Filtros de Búsqueda</span>
      </button>

      {/* Documents Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Table Header Info */}
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between gap-3">
          <span className="text-sm text-gray-600">
            Mostrando {rangoInicio}-{rangoFin} de {totalRegistros} registros
          </span>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Mostrar:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#40A095]"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b-2 border-gray-200">
              <tr>
                {["Tipo Documento", "Número Documento", "Fecha Creación", "Cliente", "Ruta", "Vehículo", "Estado"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase whitespace-nowrap">
                    {h}
                  </th>
                ))}
                <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedDocuments.map((doc) => {
                const badge = tipoBadge[doc.type];
                const acciones = accionesPorTipo[doc.type];
                const puedeEditar = acciones.editar && doc.estado !== "Anulado";

                return (
                  <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${badge.className}`}>
                        {badge.label}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-gray-900">{doc.numero}</span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600">
                        {new Date(doc.fecha).toLocaleDateString("es-CO")}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-700">{doc.cliente}</span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-700">{rutaFormat(doc)}</span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-700">{doc.vehiculo}</span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold ${estadoBadge[doc.estado]}`}>
                        {doc.estado}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1">
                        {puedeEditar && (
                          <button onClick={() => handleEdit(doc)} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all" title="Editar">
                            <Edit2 className="w-4 h-4" />
                          </button>
                        )}
                        {acciones.duplicar && (
                          <button className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-all" title="Duplicar">
                            <Copy className="w-4 h-4" />
                          </button>
                        )}
                        <button onClick={() => handleViewPDF(doc)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="Ver">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDownload(doc)} className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-all" title="Descargar">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Lista de documentos — móvil/tablet (tarjetas compactas tipo app) */}
        <div className="lg:hidden p-3 space-y-2 md:space-y-0 md:grid md:grid-cols-2 md:gap-3">
          {paginatedDocuments.map((doc) => {
            const badge = tipoBadge[doc.type];
            const puedeEditar = accionesPorTipo[doc.type].editar && doc.estado !== "Anulado";

            return (
              <div
                key={doc.id}
                onClick={() => handleViewPDF(doc)}
                className="border border-gray-200 rounded-xl p-3 bg-white active:bg-gray-50 cursor-pointer transition-colors"
              >
                {/* Fila 1: badge tipo + número · punto estado + ver detalle */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold flex-shrink-0 ${badge.className}`}>
                      {badge.label}
                    </span>
                    <span className="font-semibold text-gray-900 text-sm truncate">
                      {doc.numero}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${estadoDot[doc.estado]}`}
                      title={doc.estado}
                    ></span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                </div>

                {/* Fila 2: fecha • placa */}
                <p className="text-xs text-gray-500 mt-1.5">
                  {new Date(doc.fecha).toLocaleDateString("es-CO")} • {doc.vehiculo}
                </p>

                {/* Fila 3: acciones (Editar · Descargar · Anular) */}
                <div
                  className="flex items-center gap-1 mt-2 pt-2 border-t border-gray-100"
                  onClick={(e) => e.stopPropagation()}
                >
                  {puedeEditar && (
                    <button
                      onClick={() => handleEdit(doc)}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 text-gray-600 hover:bg-gray-100 rounded-lg active:scale-95 transition-all text-xs font-medium"
                    >
                      <Edit2 className="w-4 h-4" />
                      <span>Editar</span>
                    </button>
                  )}
                  <button
                    onClick={() => handleDownload(doc)}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 text-green-600 hover:bg-green-50 rounded-lg active:scale-95 transition-all text-xs font-medium"
                  >
                    <Download className="w-4 h-4" />
                    <span>Descargar</span>
                  </button>
                  {doc.estado !== "Anulado" && (
                    <button
                      onClick={() => handleAnular(doc)}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 text-red-600 hover:bg-red-50 rounded-lg active:scale-95 transition-all text-xs font-medium ml-auto"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Anular</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          {/* Leyenda de estados (solo móvil/tablet) */}
          {totalRegistros > 0 && (
            <div className="md:col-span-2 flex items-center justify-center gap-4 flex-wrap pt-3 mt-1 border-t border-gray-100 text-xs text-gray-600">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>Pendiente
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>Aplicado
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>Anulado
              </span>
            </div>
          )}
        </div>

        {totalRegistros === 0 && (
          <div className="py-12 text-center">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No se encontraron documentos</p>
            <p className="text-gray-400 text-sm mt-2">
              Intenta cambiar los filtros o crear un nuevo documento
            </p>
          </div>
        )}

        {/* Table Footer - Pagination */}
        {totalRegistros > 0 && (
          <>
            {/* Móvil — versión compacta Anterior/Siguiente */}
            <div className="md:hidden px-4 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between gap-3">
              <div className="text-xs text-gray-600">
                <p>{rangoInicio}-{rangoFin} de {totalRegistros}</p>
                <p className="text-gray-500">Página {pageSafe} de {totalPages}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => irAPagina(pageSafe - 1)}
                  disabled={pageSafe === 1}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all font-medium"
                >
                  Anterior
                </button>
                <button
                  onClick={() => irAPagina(pageSafe + 1)}
                  disabled={pageSafe === totalPages}
                  className="px-3 py-2 bg-[#40A095] text-white rounded-lg text-sm hover:bg-[#358a80] disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all font-medium"
                >
                  Siguiente
                </button>
              </div>
            </div>

            {/* Desktop/tablet — paginación numerada completa */}
            <div className="hidden md:flex px-4 py-3 bg-gray-50 border-t border-gray-200 flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-sm text-gray-600">
              Página {pageSafe} de {totalPages}
            </div>
            <div className="flex items-center gap-1 flex-wrap justify-center">
              <button
                onClick={() => irAPagina(1)}
                disabled={pageSafe === 1}
                className="p-1.5 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                title="Primera"
              >
                <ChevronsLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => irAPagina(pageSafe - 1)}
                disabled={pageSafe === 1}
                className="p-1.5 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                title="Anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => irAPagina(p)}
                  className={`min-w-[2rem] px-2.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    p === pageSafe
                      ? "bg-[#40A095] text-white shadow-sm"
                      : "border border-gray-300 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {p}
                </button>
              ))}

              <button
                onClick={() => irAPagina(pageSafe + 1)}
                disabled={pageSafe === totalPages}
                className="p-1.5 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                title="Siguiente"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => irAPagina(totalPages)}
                disabled={pageSafe === totalPages}
                className="p-1.5 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                title="Última"
              >
                <ChevronsRight className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-1.5 ml-2">
                <span className="text-sm text-gray-600 whitespace-nowrap">Ir a:</span>
                <input
                  type="number"
                  min={1}
                  max={totalPages}
                  value={goToPage}
                  onChange={(e) => setGoToPage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleGoTo()}
                  onBlur={handleGoTo}
                  className="w-16 px-2 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#40A095]"
                />
              </div>
            </div>
            </div>
          </>
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

      {/* Host genérico de subprocesos (panel superpuesto).
          Monta el componente del subproceso activo en modo embedded; sirve para
          cualquier entrada del registro SUBPROCESOS sin código adicional. */}
      {activeSubproceso && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm z-40 lg:flex lg:items-center lg:justify-center lg:p-4">
          <div className="bg-white lg:rounded-xl shadow-xl w-full lg:max-w-5xl h-full lg:h-auto lg:max-h-[90vh] overflow-y-auto">
            <activeSubproceso.Component
              embedded
              onBack={() => setActiveSubproceso(null)}
            />
          </div>
        </div>
      )}

      {/* Filtros de Búsqueda — bottom-sheet (solo móvil) */}
      {showFiltrosMobile && (
        <div className="md:hidden fixed inset-0 z-50 flex flex-col justify-end">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowFiltrosMobile(false)}
          />
          <div className="relative bg-white rounded-t-2xl shadow-2xl max-h-[85vh] overflow-y-auto animate-slide-in">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Filter className="w-5 h-5 text-green-600" />
                Filtros de Búsqueda
              </h3>
              <button
                onClick={() => setShowFiltrosMobile(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg active:scale-95 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 grid grid-cols-1 gap-3">
              {camposFiltros}
            </div>
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 flex gap-2">
              <button
                onClick={limpiarFiltros}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 active:scale-95 transition-all text-sm font-medium"
              >
                Limpiar
              </button>
              <button
                onClick={() => setShowFiltrosMobile(false)}
                className="flex-1 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 active:scale-95 transition-all text-sm font-medium flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                Buscar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}