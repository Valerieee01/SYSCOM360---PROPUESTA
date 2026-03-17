import { useState } from "react";
import {
  Users,
  Truck,
  UserCircle,
  Route,
  Package,
  Warehouse,
  Tags,
  DollarSign,
  Search,
  Plus,
  ChevronRight,
  FileText,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import TercerosPage from "./maestros/TercerosPage";
import VehiculosPage from "./maestros/VehiculosPage";
import ConductoresPage from "./maestros/ConductoresPage";
import RutasPage from "./maestros/RutasPage";
import MercanciasPage from "./maestros/MercanciasPage";
import BodegasPage from "./maestros/BodegasPage";

type CatalogoType =
  | "dashboard"
  | "terceros"
  | "vehiculos"
  | "conductores"
  | "rutas"
  | "mercancias"
  | "bodegas"
  | "tipos-carga"
  | "tarifas";

interface CatalogoCard {
  id: CatalogoType;
  name: string;
  description: string;
  icon: any;
  color: string;
  count: number;
  trend: string;
}

const catalogos: CatalogoCard[] = [
  {
    id: "terceros",
    name: "Terceros",
    description: "Clientes, remitentes, destinatarios y proveedores",
    icon: Users,
    color: "blue",
    count: 156,
    trend: "+12%",
  },
  {
    id: "vehiculos",
    name: "Vehículos",
    description: "Flota de vehículos y remolques",
    icon: Truck,
    color: "green",
    count: 48,
    trend: "+5%",
  },
  {
    id: "conductores",
    name: "Conductores",
    description: "Personal de conducción y licencias",
    icon: UserCircle,
    color: "purple",
    count: 73,
    trend: "+8%",
  },
  {
    id: "rutas",
    name: "Rutas",
    description: "Rutas logísticas y puntos intermedios",
    icon: Route,
    color: "orange",
    count: 28,
    trend: "+3%",
  },
  {
    id: "mercancias",
    name: "Mercancías",
    description: "Catálogo de productos transportados",
    icon: Package,
    color: "indigo",
    count: 234,
    trend: "+18%",
  },
  {
    id: "bodegas",
    name: "Bodegas",
    description: "Puntos de cargue y descargue",
    icon: Warehouse,
    color: "teal",
    count: 15,
    trend: "+2%",
  },
  {
    id: "tipos-carga",
    name: "Tipos de Carga",
    description: "Clasificación de mercancías",
    icon: Tags,
    color: "pink",
    count: 12,
    trend: "0%",
  },
  {
    id: "tarifas",
    name: "Tarifas de Flete",
    description: "Tarifas por ruta, peso y vehículo",
    icon: DollarSign,
    color: "emerald",
    count: 64,
    trend: "+7%",
  },
];

export default function Maestros() {
  const [selectedCatalogo, setSelectedCatalogo] = useState<CatalogoType>("dashboard");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCatalogos = catalogos.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderCatalogoContent = () => {
    switch (selectedCatalogo) {
      case "terceros":
        return <TercerosPage onBack={() => setSelectedCatalogo("dashboard")} />;
      case "vehiculos":
        return <VehiculosPage onBack={() => setSelectedCatalogo("dashboard")} />;
      case "conductores":
        return <ConductoresPage onBack={() => setSelectedCatalogo("dashboard")} />;
      case "rutas":
        return <RutasPage onBack={() => setSelectedCatalogo("dashboard")} />;
      case "mercancias":
        return <MercanciasPage onBack={() => setSelectedCatalogo("dashboard")} />;
      case "bodegas":
        return <BodegasPage onBack={() => setSelectedCatalogo("dashboard")} />;
      case "tipos-carga":
        return <div className="p-6">Tipos de Carga - En desarrollo</div>;
      case "tarifas":
        return <div className="p-6">Tarifas de Flete - En desarrollo</div>;
      default:
        return renderDashboard();
    }
  };

  const renderDashboard = () => (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Catálogo de Maestros
          </h1>
          <p className="text-gray-600 mt-1">
            Administra toda la información base del sistema de transporte
          </p>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-gradient-to-r from-[#40A095] to-[#99D6CF] rounded-xl p-6 text-white">
        <div className="flex items-start gap-4">
          <div className="bg-white/20 p-3 rounded-lg">
            <FileText className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-1">
              Sistema de Maestros Centralizado
            </h3>
            <p className="text-white/90 text-sm">
              Todos estos catálogos se integran automáticamente con los documentos de transporte
              (Pedidos, Órdenes de Cargue, Remesas, Manifiestos, Anticipos y Cumplidos) para
              facilitar la creación y gestión de documentos.
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar catálogo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#40A095]"
          />
        </div>
      </div>

      {/* Catálogos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCatalogos.map((catalogo) => {
          const Icon = catalogo.icon;
          return (
            <button
              key={catalogo.id}
              onClick={() => setSelectedCatalogo(catalogo.id)}
              className="bg-white rounded-xl shadow-sm border-2 border-gray-200 hover:border-[#40A095] hover:shadow-lg transition-all p-6 text-left group"
            >
              {/* Icon and Trend */}
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-14 h-14 bg-gradient-to-br from-${catalogo.color}-500 to-${catalogo.color}-600 rounded-xl flex items-center justify-center`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold text-green-600">
                  <TrendingUp className="w-3 h-3" />
                  {catalogo.trend}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {catalogo.name}
              </h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {catalogo.description}
              </p>

              {/* Stats */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {catalogo.count}
                  </p>
                  <p className="text-xs text-gray-500">registros</p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-1 text-sm text-[#40A095] font-medium">
                    <span>Ver catálogo</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-3 rounded-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-blue-700 font-medium">Total Terceros</p>
              <p className="text-2xl font-bold text-blue-900">156</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
          <div className="flex items-center gap-3">
            <div className="bg-green-600 p-3 rounded-lg">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-green-700 font-medium">Flota Activa</p>
              <p className="text-2xl font-bold text-green-900">48</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
          <div className="flex items-center gap-3">
            <div className="bg-purple-600 p-3 rounded-lg">
              <UserCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-purple-700 font-medium">Conductores</p>
              <p className="text-2xl font-bold text-purple-900">73</p>
            </div>
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
        <div className="flex gap-4">
          <div className="bg-amber-100 p-3 rounded-lg h-fit">
            <AlertCircle className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <h4 className="font-bold text-amber-900 mb-2">
              ¿Cómo funcionan los Maestros?
            </h4>
            <p className="text-sm text-amber-800 mb-3">
              Los catálogos de maestros son la base de datos del sistema. Cuando creas documentos
              de transporte (Pedidos, Órdenes de Cargue, etc.), el sistema te sugerirá
              automáticamente información de estos catálogos para completar los campos de forma rápida.
            </p>
            <ul className="text-sm text-amber-800 space-y-1 ml-4">
              <li>• <strong>Terceros:</strong> Selecciona clientes, remitentes y destinatarios</li>
              <li>• <strong>Vehículos y Conductores:</strong> Asigna recursos a los viajes</li>
              <li>• <strong>Rutas:</strong> Calcula automáticamente distancias y tiempos</li>
              <li>• <strong>Tarifas:</strong> Obtén precios basados en rutas y vehículos</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  return <div className="min-h-screen bg-gray-50">{renderCatalogoContent()}</div>;
}
