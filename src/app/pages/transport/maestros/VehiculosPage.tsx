import { useState } from "react";
import {
  ArrowLeft,
  Plus,
  Search,
  Edit2,
  Trash2,
  Truck,
  X,
  Save,
  FileText,
  Calendar,
} from "lucide-react";

interface Vehiculo {
  id: string;
  placa: string;
  tipoVehiculo: string;
  marca: string;
  modelo: string;
  capacidadCarga: number;
  tipoCarroceria: string;
  estado: "Disponible" | "En Ruta" | "Mantenimiento" | "Inactivo";
  propietario: string;
  empresaTransportadora: string;
  remolque?: string;
  soatVencimiento?: string;
  tecnicomecanicaVencimiento?: string;
}

const mockVehiculos: Vehiculo[] = [
  {
    id: "1",
    placa: "ABC-123",
    tipoVehiculo: "Tractocamión",
    marca: "Kenworth",
    modelo: "2022",
    capacidadCarga: 34000,
    tipoCarroceria: "Furgón",
    estado: "Disponible",
    propietario: "Transportes ABC S.A.S.",
    empresaTransportadora: "Transportes ABC S.A.S.",
    remolque: "XYZ-456",
    soatVencimiento: "2026-12-31",
    tecnicomecanicaVencimiento: "2026-10-15",
  },
  {
    id: "2",
    placa: "DEF-456",
    tipoVehiculo: "Camión Sencillo",
    marca: "Chevrolet",
    modelo: "2021",
    capacidadCarga: 12000,
    tipoCarroceria: "Estacas",
    estado: "En Ruta",
    propietario: "Carlos Rodríguez",
    empresaTransportadora: "Transportes CR",
    soatVencimiento: "2026-08-20",
    tecnicomecanicaVencimiento: "2026-07-10",
  },
  {
    id: "3",
    placa: "GHI-789",
    tipoVehiculo: "Camión Doble Troque",
    marca: "Volvo",
    modelo: "2023",
    capacidadCarga: 22000,
    tipoCarroceria: "Refrigerado",
    estado: "Mantenimiento",
    propietario: "Distribuidora XYZ Ltda.",
    empresaTransportadora: "Distribuidora XYZ Ltda.",
    soatVencimiento: "2027-03-15",
    tecnicomecanicaVencimiento: "2027-01-22",
  },
];

interface VehiculosPageProps {
  onBack: () => void;
}

export default function VehiculosPage({ onBack }: VehiculosPageProps) {
  const [vehiculos] = useState<Vehiculo[]>(mockVehiculos);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterEstado, setFilterEstado] = useState<string>("Todos");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedVehiculo, setSelectedVehiculo] = useState<Vehiculo | null>(null);

  const filteredVehiculos = vehiculos.filter((vehiculo) => {
    const matchesSearch =
      vehiculo.placa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehiculo.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehiculo.propietario.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesEstado =
      filterEstado === "Todos" || vehiculo.estado === filterEstado;

    return matchesSearch && matchesEstado;
  });

  const handleCreate = () => {
    setSelectedVehiculo({
      id: "",
      placa: "",
      tipoVehiculo: "Camión Sencillo",
      marca: "",
      modelo: "",
      capacidadCarga: 0,
      tipoCarroceria: "",
      estado: "Disponible",
      propietario: "",
      empresaTransportadora: "",
    });
    setIsCreating(true);
    setIsModalOpen(true);
  };

  const handleEdit = (vehiculo: Vehiculo) => {
    setSelectedVehiculo(vehiculo);
    setIsCreating(false);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    alert("Vehículo guardado exitosamente");
    setIsModalOpen(false);
    setSelectedVehiculo(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVehiculo(null);
    setIsCreating(false);
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "Disponible":
        return "bg-green-100 text-green-800";
      case "En Ruta":
        return "bg-blue-100 text-blue-800";
      case "Mantenimiento":
        return "bg-yellow-100 text-yellow-800";
      case "Inactivo":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Catálogo de Vehículos
            </h1>
            <p className="text-gray-600 mt-1">
              Administra la flota de vehículos y remolques
            </p>
          </div>
        </div>
        <button
          onClick={handleCreate}
          className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2 font-medium"
        >
          <Plus className="w-5 h-5" />
          Nuevo Vehículo
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por placa, marca, propietario..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFilterEstado("Todos")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filterEstado === "Todos"
                  ? "bg-green-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilterEstado("Disponible")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filterEstado === "Disponible"
                  ? "bg-green-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Disponibles
            </button>
            <button
              onClick={() => setFilterEstado("En Ruta")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filterEstado === "En Ruta"
                  ? "bg-green-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              En Ruta
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600">Total Vehículos</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{vehiculos.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600">Disponibles</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {vehiculos.filter((v) => v.estado === "Disponible").length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600">En Ruta</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">
            {vehiculos.filter((v) => v.estado === "En Ruta").length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600">Capacidad Total</p>
          <p className="text-2xl font-bold text-purple-600 mt-1">
            {(
              vehiculos.reduce((acc, v) => acc + v.capacidadCarga, 0) / 1000
            ).toFixed(0)}
            t
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Placa
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Tipo / Marca
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Capacidad
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Carrocería
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Propietario
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
              {filteredVehiculos.map((vehiculo) => (
                <tr key={vehiculo.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Truck className="w-5 h-5 text-green-600" />
                      <span className="font-bold text-gray-900">
                        {vehiculo.placa}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">
                        {vehiculo.tipoVehiculo}
                      </p>
                      <p className="text-sm text-gray-600">
                        {vehiculo.marca} - {vehiculo.modelo}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-semibold text-gray-900">
                      {(vehiculo.capacidadCarga / 1000).toFixed(1)} t
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {vehiculo.tipoCarroceria}
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900">{vehiculo.propietario}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getEstadoColor(
                        vehiculo.estado
                      )}`}
                    >
                      {vehiculo.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(vehiculo)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        title="Editar"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-all"
                        title="Documentos"
                      >
                        <FileText className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
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
      {isModalOpen && selectedVehiculo && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
              <h2 className="text-2xl font-bold text-gray-900">
                {isCreating ? "Crear Nuevo Vehículo" : "Editar Vehículo"}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-all"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Datos del Vehículo */}
              <div className="bg-gradient-to-br from-green-50 to-green-100/30 rounded-xl p-6 border border-green-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-green-600" />
                  Datos del Vehículo
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Placa *
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedVehiculo.placa}
                      placeholder="ABC-123"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 uppercase"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de Vehículo *
                    </label>
                    <select
                      defaultValue={selectedVehiculo.tipoVehiculo}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option>Camión Sencillo</option>
                      <option>Camión Doble Troque</option>
                      <option>Tractocamión</option>
                      <option>Camioneta</option>
                      <option>Furgón</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Marca *
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedVehiculo.marca}
                      placeholder="Kenworth"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Modelo *
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedVehiculo.modelo}
                      placeholder="2024"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Capacidad de Carga (kg) *
                    </label>
                    <input
                      type="number"
                      defaultValue={selectedVehiculo.capacidadCarga}
                      placeholder="34000"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de Carrocería *
                    </label>
                    <select
                      defaultValue={selectedVehiculo.tipoCarroceria}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option>Furgón</option>
                      <option>Estacas</option>
                      <option>Refrigerado</option>
                      <option>Plataforma</option>
                      <option>Tanque</option>
                      <option>Volqueta</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Estado *
                    </label>
                    <select
                      defaultValue={selectedVehiculo.estado}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option>Disponible</option>
                      <option>En Ruta</option>
                      <option>Mantenimiento</option>
                      <option>Inactivo</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Remolque (Placa)
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedVehiculo.remolque}
                      placeholder="XYZ-456"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 uppercase"
                    />
                  </div>
                </div>
              </div>

              {/* Propietario */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100/30 rounded-xl p-6 border border-blue-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Información del Propietario
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Propietario del Vehículo *
                    </label>
                    <select
                      defaultValue={selectedVehiculo.propietario}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option>Seleccione propietario...</option>
                      <option>Transportes ABC S.A.S.</option>
                      <option>Carlos Rodríguez</option>
                      <option>Distribuidora XYZ Ltda.</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Empresa Transportadora *
                    </label>
                    <select
                      defaultValue={selectedVehiculo.empresaTransportadora}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option>Seleccione empresa...</option>
                      <option>Transportes ABC S.A.S.</option>
                      <option>Transportes CR</option>
                      <option>Distribuidora XYZ Ltda.</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Documentos */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100/30 rounded-xl p-6 border border-purple-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  Documentos del Vehículo
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Vencimiento SOAT
                    </label>
                    <input
                      type="date"
                      defaultValue={selectedVehiculo.soatVencimiento}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Vencimiento Tecnomecánica
                    </label>
                    <input
                      type="date"
                      defaultValue={selectedVehiculo.tecnicomecanicaVencimiento}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
              </div>

              {/* Botones */}
              <div className="sticky bottom-0 left-0 right-0 bg-white lg:bg-transparent flex flex-col lg:flex-row items-stretch lg:items-center justify-end gap-2 lg:gap-3 p-4 lg:p-0 lg:pt-4 border-t border-gray-200 -mx-4 lg:mx-0 -mb-4 lg:mb-0 shadow-lg lg:shadow-none">
                <button
                  onClick={closeModal}
                  className="w-full lg:w-auto px-4 lg:px-6 py-3 lg:py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 active:scale-95 transition-all flex items-center justify-center gap-2 font-medium order-2 lg:order-1"
                >
                  <X className="w-4 h-4" />
                  <span>Cancelar</span>
                </button>
                <button
                  onClick={handleSave}
                  className="w-full lg:w-auto px-4 lg:px-6 py-3 lg:py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 font-medium order-1 lg:order-2"
                >
                  <Save className="w-4 h-4" />
                  <span className="hidden lg:inline">{isCreating ? "Crear Vehículo" : "Guardar Cambios"}</span>
                  <span className="lg:hidden">{isCreating ? "Crear" : "Guardar"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}