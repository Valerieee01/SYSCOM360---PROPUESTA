import { useState } from "react";
import {
  Package,
  Truck,
  FileText,
  CheckCircle,
  AlertTriangle,
  Clock,
  TrendingUp,
  MapPin,
  Navigation,
  Play,
  Pause,
  XCircle,
  Search,
  Filter,
  Calendar,
  User,
  ChevronRight,
  Info,
  DollarSign,
  FileCheck,
  AlertCircle,
  Activity,
  Loader,
  Circle,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";

// Mock data para viajes activos
const activeTrips = [
  {
    id: "V-2024-001",
    manifiesto: "MAN-2024-089",
    pedido: "PED-2024-045",
    conductor: "Juan Pérez",
    vehiculo: "ABC-123",
    origen: "Bogotá",
    destino: "Medellín",
    cliente: "ACME Corp",
    estado: "En tránsito",
    fechaSalida: "2024-03-16 08:00",
    fechaEstimada: "2024-03-16 18:00",
    progreso: 65,
    lat: 6.2442,
    lng: -75.5812,
  },
  {
    id: "V-2024-002",
    manifiesto: "MAN-2024-090",
    pedido: "PED-2024-046",
    conductor: "María López",
    vehiculo: "DEF-456",
    origen: "Cali",
    destino: "Barranquilla",
    cliente: "TechCo S.A.",
    estado: "En cargue",
    fechaSalida: "2024-03-16 10:00",
    fechaEstimada: "2024-03-17 14:00",
    progreso: 5,
    lat: 3.4516,
    lng: -76.5320,
  },
  {
    id: "V-2024-003",
    manifiesto: "MAN-2024-091",
    pedido: "PED-2024-047",
    conductor: "Carlos Gómez",
    vehiculo: "GHI-789",
    origen: "Cartagena",
    destino: "Bogotá",
    cliente: "Global Logistics",
    estado: "En descargue",
    fechaSalida: "2024-03-15 14:00",
    fechaEstimada: "2024-03-16 16:00",
    progreso: 95,
    lat: 4.7110,
    lng: -74.0721,
  },
  {
    id: "V-2024-004",
    manifiesto: "MAN-2024-092",
    pedido: "PED-2024-048",
    conductor: "Ana Rodríguez",
    vehiculo: "JKL-012",
    origen: "Medellín",
    destino: "Pereira",
    cliente: "LogiCo",
    estado: "Con novedad",
    fechaSalida: "2024-03-16 06:00",
    fechaEstimada: "2024-03-16 12:00",
    progreso: 40,
    lat: 4.8087,
    lng: -75.6906,
  },
];

// Datos para gráficas
const viajesPorEstadoData = [
  { name: "En curso", value: 8, color: "#3b82f6" },
  { name: "En cargue", value: 3, color: "#f59e0b" },
  { name: "En tránsito", value: 12, color: "#10b981" },
  { name: "En descargue", value: 2, color: "#8b5cf6" },
  { name: "Cumplido", value: 42, color: "#22c55e" },
  { name: "Con novedad", value: 4, color: "#ef4444" },
  { name: "Detenido", value: 1, color: "#64748b" },
];

const viajesPorCiudadData = [
  { ciudad: "Bogotá", cantidad: 28 },
  { ciudad: "Medellín", cantidad: 18 },
  { ciudad: "Cali", cantidad: 15 },
  { ciudad: "Barranquilla", cantidad: 12 },
  { ciudad: "Cartagena", cantidad: 9 },
  { ciudad: "Pereira", cantidad: 6 },
];

const cumplimientoDiarioData = [
  { dia: "Lun", cumplidos: 8, pendientes: 2 },
  { dia: "Mar", cumplidos: 10, pendientes: 1 },
  { dia: "Mié", cumplidos: 6, pendientes: 3 },
  { dia: "Jue", cumplidos: 12, pendientes: 2 },
  { dia: "Vie", cumplidos: 15, pendientes: 4 },
  { dia: "Sáb", cumplidos: 7, pendientes: 1 },
  { dia: "Dom", cumplidos: 3, pendientes: 0 },
];

const documentosPorDiaData = [
  { dia: "Lun", pedidos: 12, ordenes: 10, remesas: 8, manifiestos: 7 },
  { dia: "Mar", pedidos: 15, ordenes: 12, remesas: 10, manifiestos: 9 },
  { dia: "Mié", pedidos: 8, ordenes: 7, remesas: 6, manifiestos: 5 },
  { dia: "Jue", pedidos: 18, ordenes: 15, remesas: 12, manifiestos: 11 },
  { dia: "Vie", pedidos: 22, ordenes: 18, remesas: 15, manifiestos: 14 },
  { dia: "Sáb", pedidos: 10, ordenes: 8, remesas: 7, manifiestos: 6 },
  { dia: "Dom", pedidos: 5, ordenes: 4, remesas: 3, manifiestos: 2 },
];

export default function TransportDashboard() {
  const [selectedTrip, setSelectedTrip] = useState<typeof activeTrips[0] | null>(null);
  const [filterEstado, setFilterEstado] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "En curso":
      case "En tránsito":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "En cargue":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "En descargue":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Cumplido":
        return "bg-green-100 text-green-800 border-green-200";
      case "Con novedad":
        return "bg-red-100 text-red-800 border-red-200";
      case "Detenido":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case "En curso":
      case "En tránsito":
        return <Navigation className="w-4 h-4" />;
      case "En cargue":
        return <Loader className="w-4 h-4" />;
      case "En descargue":
        return <Loader className="w-4 h-4" />;
      case "Cumplido":
        return <CheckCircle className="w-4 h-4" />;
      case "Con novedad":
        return <AlertTriangle className="w-4 h-4" />;
      case "Detenido":
        return <Pause className="w-4 h-4" />;
      default:
        return <Circle className="w-4 h-4" />;
    }
  };

  const filteredTrips = activeTrips.filter((trip) => {
    const matchesEstado = filterEstado === "Todos" || trip.estado === filterEstado;
    const matchesSearch =
      trip.manifiesto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.conductor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.vehiculo.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesEstado && matchesSearch;
  });

  return (
    <div className="p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
            Dashboard de Transporte
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Monitoreo en tiempo real
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
          <Activity className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 animate-pulse" />
          <span>Actualizado</span>
        </div>
      </div>

      {/* KPIs Principales - Tarjetas superiores */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-8 gap-2 sm:gap-3 md:gap-4">
        {/* Viajes en curso */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-blue-200 sm:border-2">
          <div className="flex items-center justify-between mb-1 sm:mb-2">
            <div className="p-1.5 sm:p-2 bg-blue-600 rounded-md sm:rounded-lg">
              <Navigation className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
            </div>
          </div>
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-900">8</p>
          <p className="text-[10px] sm:text-xs font-medium text-blue-700 mt-0.5 sm:mt-1">En Curso</p>
        </div>

        {/* Viajes cumplidos */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-green-200 sm:border-2">
          <div className="flex items-center justify-between mb-1 sm:mb-2">
            <div className="p-1.5 sm:p-2 bg-green-600 rounded-md sm:rounded-lg">
              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
            </div>
          </div>
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-green-900">42</p>
          <p className="text-[10px] sm:text-xs font-medium text-green-700 mt-0.5 sm:mt-1">Cumplidos</p>
        </div>

        {/* Viajes pendientes */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-orange-200 sm:border-2">
          <div className="flex items-center justify-between mb-1 sm:mb-2">
            <div className="p-1.5 sm:p-2 bg-orange-600 rounded-md sm:rounded-lg">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
            </div>
          </div>
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-900">15</p>
          <p className="text-[10px] sm:text-xs font-medium text-orange-700 mt-0.5 sm:mt-1">Pendientes</p>
        </div>

        {/* Viajes con novedad */}
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-red-200 sm:border-2">
          <div className="flex items-center justify-between mb-1 sm:mb-2">
            <div className="p-1.5 sm:p-2 bg-red-600 rounded-md sm:rounded-lg">
              <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
            </div>
          </div>
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-red-900">4</p>
          <p className="text-[10px] sm:text-xs font-medium text-red-700 mt-0.5 sm:mt-1">Novedad</p>
        </div>

        {/* Pedidos sin procesar */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-purple-200 sm:border-2">
          <div className="flex items-center justify-between mb-1 sm:mb-2">
            <div className="p-1.5 sm:p-2 bg-purple-600 rounded-md sm:rounded-lg">
              <FileText className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
            </div>
          </div>
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-900">12</p>
          <p className="text-[10px] sm:text-xs font-medium text-purple-700 mt-0.5 sm:mt-1">Pedidos</p>
        </div>

        {/* Remesas activas */}
        <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-teal-200 sm:border-2">
          <div className="flex items-center justify-between mb-1 sm:mb-2">
            <div className="p-1.5 sm:p-2 bg-teal-600 rounded-md sm:rounded-lg">
              <Package className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
            </div>
          </div>
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-teal-900">32</p>
          <p className="text-[10px] sm:text-xs font-medium text-teal-700 mt-0.5 sm:mt-1">Remesas</p>
        </div>

        {/* Manifiestos pendientes */}
        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-indigo-200 sm:border-2">
          <div className="flex items-center justify-between mb-1 sm:mb-2">
            <div className="p-1.5 sm:p-2 bg-indigo-600 rounded-md sm:rounded-lg">
              <FileCheck className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
            </div>
          </div>
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-indigo-900">18</p>
          <p className="text-[10px] sm:text-xs font-medium text-indigo-700 mt-0.5 sm:mt-1">Manifiestos</p>
        </div>

        {/* Anticipos del día */}
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-emerald-200 sm:border-2">
          <div className="flex items-center justify-between mb-1 sm:mb-2">
            <div className="p-1.5 sm:p-2 bg-emerald-600 rounded-md sm:rounded-lg">
              <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
            </div>
          </div>
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-emerald-900">8</p>
          <p className="text-[10px] sm:text-xs font-medium text-emerald-700 mt-0.5 sm:mt-1">Anticipos</p>
        </div>
      </div>

      {/* Mapa Interactivo y Panel de Detalles */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        {/* Mapa Interactivo */}
        <div className="lg:col-span-2 bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4 md:p-6">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 flex items-center gap-1.5 sm:gap-2">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              Mapa de Viajes
            </h3>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-[10px] sm:text-xs text-gray-500 hidden sm:inline">Vista en tiempo real</span>
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Mapa simulado con marcadores */}
          <div className="relative bg-gradient-to-br from-blue-50 to-teal-50 rounded-md sm:rounded-lg h-64 sm:h-80 md:h-96 border border-gray-200 sm:border-2 overflow-hidden">
            {/* Grid de mapa simulado */}
            <div className="absolute inset-0 opacity-20">
              <svg width="100%" height="100%">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="gray" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Marcadores de viajes */}
            {activeTrips.map((trip, index) => (
              <button
                key={trip.id}
                onClick={() => setSelectedTrip(trip)}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-125 ${
                  selectedTrip?.id === trip.id ? "scale-125 z-10" : ""
                }`}
                style={{
                  left: `${20 + index * 15}%`,
                  top: `${30 + (index % 2) * 20}%`,
                }}
              >
                <div className="relative">
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shadow-lg border-2 ${
                      trip.estado === "En tránsito"
                        ? "bg-blue-500 border-blue-700"
                        : trip.estado === "En cargue"
                        ? "bg-orange-500 border-orange-700"
                        : trip.estado === "En descargue"
                        ? "bg-purple-500 border-purple-700"
                        : trip.estado === "Con novedad"
                        ? "bg-red-500 border-red-700 animate-pulse"
                        : "bg-gray-500 border-gray-700"
                    }`}
                  >
                    <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
                  </div>
                  {selectedTrip?.id === trip.id && (
                    <div className="absolute -top-10 sm:-top-12 left-1/2 -translate-x-1/2 bg-white rounded-md sm:rounded-lg shadow-lg px-2 sm:px-3 py-1.5 sm:py-2 whitespace-nowrap border border-gray-200 z-20">
                      <p className="text-[10px] sm:text-xs font-bold text-gray-900">{trip.vehiculo}</p>
                      <p className="text-[9px] sm:text-xs text-gray-600">{trip.conductor}</p>
                    </div>
                  )}
                </div>
              </button>
            ))}

            {/* Leyenda del mapa */}
            <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 bg-white rounded-md sm:rounded-lg shadow-lg p-2 sm:p-3 border border-gray-200">
              <p className="text-[10px] sm:text-xs font-bold text-gray-900 mb-1 sm:mb-2">Estados:</p>
              <div className="space-y-0.5 sm:space-y-1">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-blue-500"></div>
                  <span className="text-[9px] sm:text-xs text-gray-700">En tránsito</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-orange-500"></div>
                  <span className="text-[9px] sm:text-xs text-gray-700">En cargue</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-purple-500"></div>
                  <span className="text-[9px] sm:text-xs text-gray-700">En descargue</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
                  <span className="text-[9px] sm:text-xs text-gray-700">Con novedad</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Panel de Detalles del Viaje Seleccionado */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4 md:p-6">
          <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-1.5 sm:gap-2">
            <Info className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
            Detalle del Viaje
          </h3>

          {selectedTrip ? (
            <div className="space-y-3 sm:space-y-4">
              {/* Estado */}
              <div className="flex items-center justify-between pb-2 sm:pb-3 border-b border-gray-200">
                <span className="text-xs sm:text-sm text-gray-600">Estado actual:</span>
                <span
                  className={`inline-flex items-center gap-1 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium border ${getEstadoColor(
                    selectedTrip.estado
                  )}`}
                >
                  {getEstadoIcon(selectedTrip.estado)}
                  <span className="hidden sm:inline">{selectedTrip.estado}</span>
                </span>
              </div>

              {/* Barra de progreso */}
              <div>
                <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                  <span className="text-[10px] sm:text-xs text-gray-600">Progreso del viaje</span>
                  <span className="text-[10px] sm:text-xs font-bold text-gray-900">{selectedTrip.progreso}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-teal-500 h-1.5 sm:h-2 rounded-full transition-all"
                    style={{ width: `${selectedTrip.progreso}%` }}
                  ></div>
                </div>
              </div>

              {/* Información del viaje */}
              <div className="space-y-2 sm:space-y-3">
                <div>
                  <p className="text-[10px] sm:text-xs text-gray-500">No. Viaje</p>
                  <p className="text-xs sm:text-sm font-bold text-gray-900">{selectedTrip.id}</p>
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-gray-500">Manifiesto</p>
                  <p className="text-xs sm:text-sm font-semibold text-blue-600">{selectedTrip.manifiesto}</p>
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-gray-500">Pedido</p>
                  <p className="text-xs sm:text-sm font-medium text-gray-900">{selectedTrip.pedido}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  <div>
                    <p className="text-[10px] sm:text-xs text-gray-500">Conductor</p>
                    <p className="text-xs sm:text-sm font-medium text-gray-900">{selectedTrip.conductor}</p>
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs text-gray-500">Vehículo</p>
                    <p className="text-xs sm:text-sm font-medium text-gray-900">{selectedTrip.vehiculo}</p>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-gray-500">Cliente</p>
                  <p className="text-xs sm:text-sm font-medium text-gray-900">{selectedTrip.cliente}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  <div>
                    <p className="text-[10px] sm:text-xs text-gray-500">Origen</p>
                    <p className="text-xs sm:text-sm font-medium text-gray-900">{selectedTrip.origen}</p>
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs text-gray-500">Destino</p>
                    <p className="text-xs sm:text-sm font-medium text-gray-900">{selectedTrip.destino}</p>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-gray-500">Fecha de Salida</p>
                  <p className="text-xs sm:text-sm font-medium text-gray-900">{selectedTrip.fechaSalida}</p>
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-gray-500">Llegada Estimada</p>
                  <p className="text-xs sm:text-sm font-medium text-gray-900">{selectedTrip.fechaEstimada}</p>
                </div>
              </div>

              {/* Timeline del proceso documental */}
              <div className="pt-3 sm:pt-4 border-t border-gray-200">
                <p className="text-[10px] sm:text-xs font-bold text-gray-900 mb-2 sm:mb-3">Flujo Documental</p>
                <div className="space-y-1.5 sm:space-y-2">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                    <span className="text-[10px] sm:text-xs text-gray-700">Pedido</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                    <span className="text-[10px] sm:text-xs text-gray-700">Orden de Cargue</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                    <span className="text-[10px] sm:text-xs text-gray-700">Remesa</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                    <span className="text-[10px] sm:text-xs text-gray-700">Manifiesto</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                    <span className="text-[10px] sm:text-xs text-gray-700">Anticipo</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-orange-600" />
                    <span className="text-[10px] sm:text-xs text-gray-700">Cumplido (pendiente)</span>
                  </div>
                </div>
              </div>

              <button className="w-full mt-3 sm:mt-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-md sm:rounded-lg hover:shadow-lg transition-all text-xs sm:text-sm font-medium">
                Ver Detalle Completo
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-48 sm:h-56 md:h-64 text-gray-400">
              <MapPin className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mb-2 sm:mb-3" />
              <p className="text-xs sm:text-sm text-center px-4">
                Selecciona un vehículo en el mapa para ver los detalles
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Tabla de Seguimiento Operativo */}
      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 gap-3">
          <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900">Seguimiento de Viajes</h3>
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Buscador */}
            <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-auto pl-7 sm:pl-9 pr-3 sm:pr-4 py-1.5 sm:py-2 border border-gray-300 rounded-md sm:rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Filtro por estado */}
            <select
              value={filterEstado}
              onChange={(e) => setFilterEstado(e.target.value)}
              className="px-2 sm:px-4 py-1.5 sm:py-2 border border-gray-300 rounded-md sm:rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Todos</option>
              <option>En tránsito</option>
              <option>En cargue</option>
              <option>En descargue</option>
              <option>Con novedad</option>
              <option>Cumplido</option>
            </select>
          </div>
        </div>

        {/* Vista de tabla en desktop */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">No. Viaje</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Manifiesto</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Vehículo</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Conductor</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Ruta</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Cliente</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Estado</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Progreso</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTrips.map((trip) => (
                <tr
                  key={trip.id}
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => setSelectedTrip(trip)}
                >
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{trip.id}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-blue-600">{trip.manifiesto}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{trip.vehiculo}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{trip.conductor}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {trip.origen} → {trip.destino}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">{trip.cliente}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getEstadoColor(
                        trip.estado
                      )}`}
                    >
                      {getEstadoIcon(trip.estado)}
                      {trip.estado}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-teal-500 h-2 rounded-full"
                          style={{ width: `${trip.progreso}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium text-gray-700">{trip.progreso}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Vista de cards en móvil y tablet */}
        <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
          {filteredTrips.map((trip) => (
            <div
              key={trip.id}
              onClick={() => setSelectedTrip(trip)}
              className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <p className="text-xs font-bold text-gray-900">{trip.id}</p>
                  <p className="text-[10px] text-blue-600 font-semibold">{trip.manifiesto}</p>
                </div>
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-medium border ${getEstadoColor(
                    trip.estado
                  )}`}
                >
                  {getEstadoIcon(trip.estado)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-2">
                <div>
                  <p className="text-[9px] text-gray-500">Vehículo</p>
                  <p className="text-[10px] font-medium text-gray-900">{trip.vehiculo}</p>
                </div>
                <div>
                  <p className="text-[9px] text-gray-500">Conductor</p>
                  <p className="text-[10px] font-medium text-gray-900 truncate">{trip.conductor}</p>
                </div>
              </div>

              <div className="mb-2">
                <p className="text-[9px] text-gray-500 mb-0.5">Ruta</p>
                <p className="text-[10px] text-gray-700">{trip.origen} → {trip.destino}</p>
              </div>

              <div className="mb-2">
                <p className="text-[9px] text-gray-500 mb-0.5">Cliente</p>
                <p className="text-[10px] text-gray-700">{trip.cliente}</p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] text-gray-600">Progreso</span>
                  <span className="text-[9px] font-medium text-gray-900">{trip.progreso}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-teal-500 h-1.5 rounded-full"
                    style={{ width: `${trip.progreso}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTrips.length === 0 && (
          <div className="py-8 sm:py-12 text-center">
            <Truck className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
            <p className="text-gray-500 text-sm sm:text-lg">No se encontraron viajes</p>
            <p className="text-gray-400 text-xs sm:text-sm mt-1 sm:mt-2">Intenta cambiar los filtros de búsqueda</p>
          </div>
        )}
      </div>

      {/* Gráficas Operativas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
        {/* Viajes por Estado */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4 md:p-6">
          <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-3 sm:mb-4">Viajes por Estado</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={viajesPorEstadoData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
                key="pie-viajes-estado"
              >
                {viajesPorEstadoData.map((entry, index) => (
                  <Cell key={`estado-cell-${entry.name}-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip key="tooltip-pie" />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 sm:gap-3 mt-3 sm:mt-4">
            {viajesPorEstadoData.map((item, index) => (
              <div key={`estado-legend-${item.name}-${index}`} className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded" style={{ backgroundColor: item.color }}></div>
                <span className="text-[10px] sm:text-xs md:text-sm text-gray-600">
                  {item.name}: {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Viajes por Ciudad Destino */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4 md:p-6">
          <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-3 sm:mb-4">Viajes por Ciudad</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={viajesPorCiudadData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" key="grid-bar" />
              <XAxis dataKey="ciudad" stroke="#6b7280" style={{ fontSize: "10px" }} key="xaxis-bar" />
              <YAxis stroke="#6b7280" style={{ fontSize: "10px" }} key="yaxis-bar" />
              <Tooltip
                key="tooltip-bar"
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="cantidad" fill="#3b82f6" radius={[8, 8, 0, 0]} key="bar-cantidad" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Cumplimiento Diario */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4 md:p-6">
          <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-3 sm:mb-4">Cumplimiento Diario</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={cumplimientoDiarioData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" key="grid-area" />
              <XAxis dataKey="dia" stroke="#6b7280" style={{ fontSize: "10px" }} key="xaxis-area" />
              <YAxis stroke="#6b7280" style={{ fontSize: "10px" }} key="yaxis-area" />
              <Tooltip
                key="tooltip-area"
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Area
                type="monotone"
                dataKey="cumplidos"
                stackId="1"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.6}
                key="area-cumplidos"
              />
              <Area
                type="monotone"
                dataKey="pendientes"
                stackId="1"
                stroke="#f59e0b"
                fill="#f59e0b"
                fillOpacity={0.6}
                key="area-pendientes"
              />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-4 sm:gap-6 mt-3 sm:mt-4">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded"></div>
              <span className="text-[10px] sm:text-xs md:text-sm text-gray-600">Cumplidos</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-orange-500 rounded"></div>
              <span className="text-[10px] sm:text-xs md:text-sm text-gray-600">Pendientes</span>
            </div>
          </div>
        </div>

        {/* Documentos Procesados por Día */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4 md:p-6">
          <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-3 sm:mb-4">Documentos por Día</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={documentosPorDiaData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" key="grid-line" />
              <XAxis dataKey="dia" stroke="#6b7280" style={{ fontSize: "10px" }} key="xaxis-line" />
              <YAxis stroke="#6b7280" style={{ fontSize: "10px" }} key="yaxis-line" />
              <Tooltip
                key="tooltip-line"
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Line type="monotone" dataKey="pedidos" stroke="#3b82f6" strokeWidth={2} key="line-pedidos" />
              <Line type="monotone" dataKey="ordenes" stroke="#10b981" strokeWidth={2} key="line-ordenes" />
              <Line type="monotone" dataKey="remesas" stroke="#8b5cf6" strokeWidth={2} key="line-remesas" />
              <Line type="monotone" dataKey="manifiestos" stroke="#f59e0b" strokeWidth={2} key="line-manifiestos" />
            </LineChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 sm:mt-4">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded"></div>
              <span className="text-[9px] sm:text-xs text-gray-600">Pedidos</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded"></div>
              <span className="text-[9px] sm:text-xs text-gray-600">Órdenes</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-500 rounded"></div>
              <span className="text-[9px] sm:text-xs text-gray-600">Remesas</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-orange-500 rounded"></div>
              <span className="text-[9px] sm:text-xs text-gray-600">Manifiestos</span>
            </div>
          </div>
        </div>
      </div>

      {/* Alertas y Notificaciones */}
      <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-lg sm:rounded-xl shadow-sm border border-red-200 sm:border-2 p-3 sm:p-4 md:p-6">
        <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-1.5 sm:gap-2">
          <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
          Alertas Recientes
        </h3>
        <div className="space-y-2 sm:space-y-3">
          <div className="bg-white rounded-md sm:rounded-lg p-3 sm:p-4 border border-red-200">
            <div className="flex items-start gap-2 sm:gap-3">
              <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-semibold text-gray-900">Viaje V-2024-004 con novedad</p>
                <p className="text-[10px] sm:text-xs text-gray-600 mt-0.5 sm:mt-1">
                  Vehículo JKL-012 reporta problema mecánico en ruta Medellín-Pereira
                </p>
                <p className="text-[9px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1">Hace 15 minutos</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-md sm:rounded-lg p-3 sm:p-4 border border-orange-200">
            <div className="flex items-start gap-2 sm:gap-3">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-semibold text-gray-900">Viaje V-2024-003 próximo a descargue</p>
                <p className="text-[10px] sm:text-xs text-gray-600 mt-0.5 sm:mt-1">
                  Llegada estimada en 30 minutos - Bogotá
                </p>
                <p className="text-[9px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1">Hace 5 minutos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}