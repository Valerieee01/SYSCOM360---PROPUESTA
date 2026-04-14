import { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router";
import {
  Truck,
  Calculator,
  Users,
  Fuel,
  LayoutDashboard,
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
  Settings,
  LogOut,
  User,
  Building2,
  AlertCircle,
  CheckCircle,
  Clock,
  TruckIcon,
  MapPin,
  Calendar,
} from "lucide-react";
import logoCompact from "figma:asset/e2e980fcf937603ef77d0fe945c514fbfbe5a597.png";
import logoEmpresa from "../assets/logo-empresa.svg";

const modules = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Parametrización", path: "/parametrizacion", icon: Building2 },
  {
    name: "Transporte",
    path: "/transporte",
    icon: Truck,
    subItems: [
      { name: "Operaciones", path: "/transporte" },
      { name: "Maestros", path: "/transporte/maestros" },
    ],
  },
  {
    name: "Contabilidad",
    path: "/contabilidad",
    icon: Calculator,
    subItems: [
      { name: "Dashboard", path: "/contabilidad" },
      { name: "Documentos", path: "/contabilidad/documentos" },
      { name: "Procesos", path: "/contabilidad/procesos" },
    ],
  },
  {
    name: "Nómina",
    path: "/nomina",
    icon: Users,
    subItems: [
      { name: "Dashboard", path: "/nomina" },
      { name: "Documentos", path: "/nomina/documentos" },
      { name: "Procesos", path: "/nomina/procesos" },
    ],
  },
  {
    name: "EDS",
    path: "/eds",
    icon: Fuel,
    subItems: [
      { name: "Dashboard", path: "/eds" },
      { name: "Documentos", path: "/eds/documentos" },
      { name: "Procesos", path: "/eds/procesos" },
    ],
  },
];

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [expandedModule, setExpandedModule] = useState<string | null>("Transporte");
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [mobileActiveModule, setMobileActiveModule] = useState<string>("Dashboard");
  const location = useLocation();
  const navigate = useNavigate();
  
  // Datos de la empresa desde parametrización (simulado)
  const empresaData = {
    nombre: "TRANSPORTES DEL SUR S.A.S",
    nit: "900.123.456-7"
  };

  // Actualizar fecha y hora cada segundo
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Formatear fecha
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return date.toLocaleDateString('es-CO', options);
  };

  // Formatear hora
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-CO', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const toggleModule = (moduleName: string) => {
    setExpandedModule(expandedModule === moduleName ? null : moduleName);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden w-full max-w-full">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 shadow-sm transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo y Nombre del Aplicativo */}
          <div className="p-6 border-b border-gray-200 bg-gradient-to-br from-[#40A095]/5 to-[#99D6CF]/10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <img src={logoCompact} alt="SYSCOM" className="h-10" />
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-1">
              <h1 className="text-xl font-bold bg-gradient-to-r from-[#40A095] to-[#99D6CF] bg-clip-text text-transparent">
                Syscom web
              </h1>
              <p className="text-xs text-gray-600 font-medium">
                Sistema ERP Empresarial
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {modules.map((module) => {
              const Icon = module.icon;
              const isActive = location.pathname === module.path;
              const hasSubItems = module.subItems && module.subItems.length > 0;
              const isExpanded = expandedModule === module.name;

              return (
                <div key={module.name}>
                  <Link
                    to={module.path}
                    onClick={(e) => {
                      if (hasSubItems) {
                        e.preventDefault();
                        toggleModule(module.name);
                      }
                    }}
                    className={`flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? "bg-gradient-to-r from-[#40A095] to-[#99D6CF] text-white shadow-md"
                        : "text-gray-700 hover:bg-[#99D6CF]/10 hover:text-[#40A095]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{module.name}</span>
                    </div>
                    {hasSubItems && (
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </Link>

                  {/* Submenu */}
                  {hasSubItems && isExpanded && (
                    <div className="ml-4 mt-2 space-y-1 border-l-2 border-[#DBDBDB] pl-4">
                      {module.subItems!.map((subItem) => (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          className={`block px-3 py-2 rounded-lg text-sm transition-all ${
                            location.pathname === subItem.path
                              ? "bg-[#40A095] text-white font-medium"
                              : "text-gray-600 hover:bg-[#99D6CF]/10 hover:text-[#40A095]"
                          }`}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#99D6CF]/10 cursor-pointer transition-all">
              <div className="w-8 h-8 bg-gradient-to-r from-[#40A095] to-[#99D6CF] rounded-full flex items-center justify-center text-white">
                <User className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">admin@syscomweb.com</p>
              </div>
            </div>
            <div className="flex gap-2 mt-2">
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-[#99D6CF]/10 hover:text-[#40A095] transition-all active:scale-95">
                <Settings className="w-4 h-4" />
                <span className="hidden lg:inline text-xs">Config</span>
              </button>
              <button
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-[#F03D26]/10 hover:text-[#F03D26] transition-all active:scale-95"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden lg:inline text-xs">Salir</span>
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden w-full max-w-full min-w-0">
        {/* Top Bar */}
        <header className="bg-gradient-to-r from-[#40A095] to-[#99D6CF] shadow-lg">
          <div className="flex items-center justify-between px-4 lg:px-6 py-3">
            {/* Left side - Logo and Company Info */}
            <div className="flex items-center gap-2 lg:gap-4 flex-1 min-w-0">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-white hover:bg-white/20 p-2 rounded-lg transition-all flex-shrink-0"
              >
                <Menu className="w-6 h-6" />
              </button>

              <div className="flex items-center gap-2 lg:gap-4 min-w-0">
                {/* Logo de la empresa */}
                <div className="hidden md:flex items-center justify-center w-10 lg:w-12 h-10 lg:h-12 bg-white/90 rounded-lg shadow-md flex-shrink-0">
                  <img src={logoEmpresa} alt={empresaData.nombre} className="h-8 lg:h-10 w-8 lg:w-10" />
                </div>

                {/* Información de la empresa */}
                <div className="min-w-0 flex-1">
                  <h2 className="text-xs lg:text-sm font-bold text-white truncate">
                    {empresaData.nombre}
                  </h2>
                  <p className="text-xs text-white/80 hidden sm:block">
                    NIT: {empresaData.nit}
                  </p>
                </div>
              </div>
            </div>

            {/* Right side - Date, Time and Notifications */}
            <div className="flex items-center gap-2 lg:gap-4 flex-shrink-0">
              {/* Fecha y Hora */}
              <div className="hidden xl:flex items-center gap-4 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-white" />
                  <div>
                    <p className="text-xs text-white/70 font-medium">Fecha</p>
                    <p className="text-sm font-semibold text-white capitalize">
                      {formatDate(currentDateTime)}
                    </p>
                  </div>
                </div>

                <div className="w-px h-10 bg-white/30"></div>

                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-white" />
                  <div>
                    <p className="text-xs text-white/70 font-medium">Hora</p>
                    <p className="text-lg font-bold text-white font-mono">
                      {formatTime(currentDateTime)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Mobile - Solo hora */}
              <div className="xl:hidden flex items-center gap-1 bg-white/10 backdrop-blur-sm px-2 lg:px-3 py-1.5 lg:py-2 rounded-lg border border-white/20">
                <Clock className="w-3 lg:w-4 h-3 lg:h-4 text-white" />
                <p className="text-sm lg:text-base font-bold text-white font-mono">
                  {formatTime(currentDateTime)}
                </p>
              </div>

              {/* Notificaciones */}
              <button
                className="relative p-2 text-white hover:bg-white/20 rounded-lg transition-all flex-shrink-0"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#F03D26] rounded-full ring-2 ring-white"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto pb-20 lg:pb-0">
          <Outlet />
        </main>

        {/* Mobile Bottom Navigation - Solo visible en móviles */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-40">
          <div className="grid grid-cols-5 gap-1 px-2 py-2">
            {/* Dashboard */}
            <Link
              to="/"
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-all ${
                location.pathname === "/"
                  ? "bg-gradient-to-br from-[#40A095]/20 to-[#99D6CF]/20"
                  : "hover:bg-gray-100"
              }`}
            >
              <div className={`p-1.5 rounded-lg ${
                location.pathname === "/"
                  ? "bg-gradient-to-r from-[#40A095] to-[#99D6CF]"
                  : "bg-gray-100"
              }`}>
                <LayoutDashboard className={`w-5 h-5 ${
                  location.pathname === "/"
                    ? "text-white"
                    : "text-gray-600"
                }`} />
              </div>
              <span className={`text-xs mt-1 font-medium ${
                location.pathname === "/"
                  ? "text-[#40A095]"
                  : "text-gray-600"
              }`}>
                Inicio
              </span>
            </Link>

            {/* Transporte */}
            <Link
              to="/transporte"
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-all ${
                location.pathname.startsWith("/transporte")
                  ? "bg-gradient-to-br from-[#40A095]/20 to-[#99D6CF]/20"
                  : "hover:bg-gray-100"
              }`}
            >
              <div className={`p-1.5 rounded-lg ${
                location.pathname.startsWith("/transporte")
                  ? "bg-gradient-to-r from-[#40A095] to-[#99D6CF]"
                  : "bg-gray-100"
              }`}>
                <Truck className={`w-5 h-5 ${
                  location.pathname.startsWith("/transporte")
                    ? "text-white"
                    : "text-gray-600"
                }`} />
              </div>
              <span className={`text-xs mt-1 font-medium ${
                location.pathname.startsWith("/transporte")
                  ? "text-[#40A095]"
                  : "text-gray-600"
              }`}>
                Transporte
              </span>
            </Link>

            {/* Contabilidad */}
            <Link
              to="/contabilidad"
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-all ${
                location.pathname.startsWith("/contabilidad")
                  ? "bg-gradient-to-br from-[#40A095]/20 to-[#99D6CF]/20"
                  : "hover:bg-gray-100"
              }`}
            >
              <div className={`p-1.5 rounded-lg ${
                location.pathname.startsWith("/contabilidad")
                  ? "bg-gradient-to-r from-[#40A095] to-[#99D6CF]"
                  : "bg-gray-100"
              }`}>
                <Calculator className={`w-5 h-5 ${
                  location.pathname.startsWith("/contabilidad")
                    ? "text-white"
                    : "text-gray-600"
                }`} />
              </div>
              <span className={`text-xs mt-1 font-medium ${
                location.pathname.startsWith("/contabilidad")
                  ? "text-[#40A095]"
                  : "text-gray-600"
              }`}>
                Contabilidad
              </span>
            </Link>

            {/* Nómina */}
            <Link
              to="/nomina"
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-all ${
                location.pathname.startsWith("/nomina")
                  ? "bg-gradient-to-br from-[#40A095]/20 to-[#99D6CF]/20"
                  : "hover:bg-gray-100"
              }`}
            >
              <div className={`p-1.5 rounded-lg ${
                location.pathname.startsWith("/nomina")
                  ? "bg-gradient-to-r from-[#40A095] to-[#99D6CF]"
                  : "bg-gray-100"
              }`}>
                <Users className={`w-5 h-5 ${
                  location.pathname.startsWith("/nomina")
                    ? "text-white"
                    : "text-gray-600"
                }`} />
              </div>
              <span className={`text-xs mt-1 font-medium ${
                location.pathname.startsWith("/nomina")
                  ? "text-[#40A095]"
                  : "text-gray-600"
              }`}>
                Nómina
              </span>
            </Link>

            {/* Menú / Más opciones */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex flex-col items-center justify-center py-2 px-1 rounded-lg hover:bg-gray-100 transition-all"
            >
              <div className="p-1.5 rounded-lg bg-gray-100">
                <Menu className="w-5 h-5 text-gray-600" />
              </div>
              <span className="text-xs mt-1 font-medium text-gray-600">
                Menú
              </span>
            </button>
          </div>
        </nav>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Notifications Panel - Full Screen on Mobile, Panel on Desktop */}
      {notificationsOpen && (
        <>
          {/* Overlay solo en móvil */}
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={() => setNotificationsOpen(false)}
          />

          {/* Panel de Notificaciones */}
          <div className="fixed lg:right-6 lg:top-20 lg:w-96 inset-0 lg:inset-auto bg-white lg:rounded-xl shadow-2xl border-0 lg:border border-gray-200 z-50 h-full lg:h-auto lg:max-h-[600px] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#40A095] to-[#99D6CF] p-4 lg:p-4 text-white flex-shrink-0">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg lg:text-lg">Notificaciones en Tiempo Real</h3>
                  <p className="text-xs text-white/80 mt-0.5">Novedades de viajes y operaciones</p>
                </div>
                <button
                  onClick={() => setNotificationsOpen(false)}
                  className="p-1 hover:bg-white/20 rounded-lg transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto min-h-0 -webkit-overflow-scrolling-touch">
            {/* Notification 1 - Alerta */}
            <div className="p-4 border-b border-gray-200 hover:bg-red-50 transition-all cursor-pointer">
              <div className="flex gap-3">
                <div className="bg-red-100 p-2 rounded-lg h-fit">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="font-semibold text-gray-900 text-sm">Retraso en Ruta</h4>
                    <span className="text-xs text-gray-500">Hace 5 min</span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">
                    El vehículo <span className="font-bold text-red-600">ABC-123</span> presenta un retraso de 45 minutos en la ruta Bogotá - Medellín.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <MapPin className="w-3 h-3" />
                    <span>Última ubicación: Tunja, Boyacá</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-xs">
                    <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full font-medium">Alta Prioridad</span>
                    <span className="text-gray-500">Manifiesto #MAN-12345</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Notification 2 - Éxito */}
            <div className="p-4 border-b border-gray-200 hover:bg-green-50 transition-all cursor-pointer">
              <div className="flex gap-3">
                <div className="bg-green-100 p-2 rounded-lg h-fit">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="font-semibold text-gray-900 text-sm">Validación RNDC Exitosa</h4>
                    <span className="text-xs text-gray-500">Hace 15 min</span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">
                    El manifiesto <span className="font-bold text-green-600">#MAN-12340</span> fue validado exitosamente ante el RNDC.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Truck className="w-3 h-3" />
                    <span>Vehículo: DEF-456 | Conductor: Juan Pérez</span>
                  </div>
                  <div className="mt-2">
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-medium text-xs">Completado</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Notification 3 - Info */}
            <div className="p-4 border-b border-gray-200 hover:bg-blue-50 transition-all cursor-pointer">
              <div className="flex gap-3">
                <div className="bg-blue-100 p-2 rounded-lg h-fit">
                  <TruckIcon className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="font-semibold text-gray-900 text-sm">Vehículo en Punto de Control</h4>
                    <span className="text-xs text-gray-500">Hace 30 min</span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">
                    El vehículo <span className="font-bold text-blue-600">GHI-789</span> llegó al punto de control "Peaje La Línea" según lo programado.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Clock className="w-3 h-3" />
                    <span>Hora estimada de llegada: 18:30 hrs</span>
                  </div>
                  <div className="mt-2">
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full font-medium text-xs">En Tránsito</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Notification 4 - Advertencia */}
            <div className="p-4 border-b border-gray-200 hover:bg-amber-50 transition-all cursor-pointer">
              <div className="flex gap-3">
                <div className="bg-amber-100 p-2 rounded-lg h-fit">
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="font-semibold text-gray-900 text-sm">Documento por Vencer</h4>
                    <span className="text-xs text-gray-500">Hace 1 hora</span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">
                    El SOAT del vehículo <span className="font-bold text-amber-600">ABC-123</span> vence en 15 días (31 de Marzo, 2026).
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <span>Requiere renovación inmediata</span>
                  </div>
                  <div className="mt-2">
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full font-medium text-xs">Acción Requerida</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Notification 5 - Novedad Conductor */}
            <div className="p-4 border-b border-gray-200 hover:bg-purple-50 transition-all cursor-pointer">
              <div className="flex gap-3">
                <div className="bg-purple-100 p-2 rounded-lg h-fit">
                  <User className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="font-semibold text-gray-900 text-sm">Novedad Reportada por Conductor</h4>
                    <span className="text-xs text-gray-500">Hace 2 horas</span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">
                    El conductor <span className="font-bold text-purple-600">María González</span> reportó tráfico pesado en la vía Medellín - Cali.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <MapPin className="w-3 h-3" />
                    <span>Kilómetro 245 - Vía Panamericana</span>
                  </div>
                  <div className="mt-2 flex gap-2">
                    <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full font-medium text-xs">Novedad</span>
                    <span className="text-xs text-gray-500">Remesa #REM-45678</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Notification 6 - Éxito de entrega */}
            <div className="p-4 border-b border-gray-200 hover:bg-teal-50 transition-all cursor-pointer">
              <div className="flex gap-3">
                <div className="bg-teal-100 p-2 rounded-lg h-fit">
                  <CheckCircle className="w-5 h-5 text-teal-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="font-semibold text-gray-900 text-sm">Entrega Exitosa</h4>
                    <span className="text-xs text-gray-500">Hace 3 horas</span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">
                    La remesa <span className="font-bold text-teal-600">#REM-45670</span> fue entregada en Barranquilla. Cliente satisfecho.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <MapPin className="w-3 h-3" />
                    <span>Bodega Central Barranquilla</span>
                  </div>
                  <div className="mt-2 flex gap-2 items-center">
                    <span className="px-2 py-0.5 bg-teal-100 text-teal-700 rounded-full font-medium text-xs">Entregado</span>
                    <span className="text-xs text-gray-500">12:45 PM - 16/Mar/2026</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

            {/* Footer */}
            <div className="p-3 border-t border-gray-200 bg-gray-50 flex-shrink-0">
              <button className="w-full py-2 text-sm text-[#40A095] hover:bg-[#40A095]/10 rounded-lg font-medium transition-all">
                Ver todas las notificaciones
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}