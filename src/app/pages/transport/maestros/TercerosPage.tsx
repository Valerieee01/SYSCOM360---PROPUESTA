import { useState } from "react";
import {
  ArrowLeft,
  Plus,
  Search,
  Edit2,
  Eye,
  Trash2,
  Building2,
  MapPin,
  Phone,
  Mail,
  User,
  X,
  Save,
  UserPlus,
  AlertCircle,
} from "lucide-react";

interface Tercero {
  id: string;
  tipoDocumento: string;
  numeroIdentificacion: string;
  razonSocial: string;
  nombreComercial: string;
  direccion: string;
  ciudad: string;
  departamento: string;
  telefono: string;
  email: string;
  tipos: string[];
  estado: "Activo" | "Inactivo";
  sedes: Sede[];
}

interface Sede {
  id: string;
  nombre: string;
  direccion: string;
  ciudad: string;
  departamento: string;
  telefono: string;
  contacto: string;
}

const mockTerceros: Tercero[] = [
  {
    id: "1",
    tipoDocumento: "NIT",
    numeroIdentificacion: "900.123.456-7",
    razonSocial: "Transportes ABC S.A.S.",
    nombreComercial: "ABC Logistics",
    direccion: "Calle 100 #15-20",
    ciudad: "Bogotá",
    departamento: "Cundinamarca",
    telefono: "(601) 234 5678",
    email: "info@abclogistics.com",
    tipos: ["Cliente", "Remitente"],
    estado: "Activo",
    sedes: [
      {
        id: "s1",
        nombre: "Sede Norte",
        direccion: "Calle 170 #50-30",
        ciudad: "Bogotá",
        departamento: "Cundinamarca",
        telefono: "(601) 234 5679",
        contacto: "Juan Pérez",
      },
    ],
  },
  {
    id: "2",
    tipoDocumento: "NIT",
    numeroIdentificacion: "800.456.789-1",
    razonSocial: "Distribuidora XYZ Ltda.",
    nombreComercial: "XYZ Distribuciones",
    direccion: "Carrera 45 #23-67",
    ciudad: "Medellín",
    departamento: "Antioquia",
    telefono: "(604) 345 6789",
    email: "contacto@xyz.com",
    tipos: ["Cliente", "Destinatario"],
    estado: "Activo",
    sedes: [],
  },
  {
    id: "3",
    tipoDocumento: "CC",
    numeroIdentificacion: "1.234.567.890",
    razonSocial: "Carlos Rodríguez",
    nombreComercial: "Transportes CR",
    direccion: "Calle 80 #12-34",
    ciudad: "Cali",
    departamento: "Valle del Cauca",
    telefono: "(602) 456 7890",
    email: "carlos@transportescr.com",
    tipos: ["Conductor", "Transportador"],
    estado: "Activo",
    sedes: [],
  },
];

interface TercerosPageProps {
  onBack: () => void;
}

export default function TercerosPage({ onBack }: TercerosPageProps) {
  const [terceros, setTerceros] = useState<Tercero[]>(mockTerceros);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTipo, setFilterTipo] = useState<string>("Todos");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedTercero, setSelectedTercero] = useState<Tercero | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [showValidationAlert, setShowValidationAlert] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    tipoDocumento: "NIT",
    numeroIdentificacion: "",
    razonSocial: "",
    nombreComercial: "",
    estado: "Activo",
    tipos: [] as string[],
    direccion: "",
    ciudad: "",
    departamento: "",
    telefono: "",
    email: "",
  });

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user types
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: false }));
    }
  };

  const handleTipoChange = (tipo: string, checked: boolean) => {
    const newTipos = checked
      ? [...formData.tipos, tipo]
      : formData.tipos.filter((t) => t !== tipo);
    handleInputChange("tipos", newTipos);
  };

  const validateForm = () => {
    const requiredFields = {
      numeroIdentificacion: "Número de Identificación",
      razonSocial: "Razón Social",
      tipos: "Tipos de Tercero",
      direccion: "Dirección",
      ciudad: "Ciudad",
      departamento: "Departamento",
      telefono: "Teléfono",
      email: "Email",
    };

    const newErrors: { [key: string]: boolean } = {};
    let hasErrors = false;

    Object.keys(requiredFields).forEach((field) => {
      if (field === "tipos") {
        if (formData.tipos.length === 0) {
          newErrors[field] = true;
          hasErrors = true;
        }
      } else {
        if (
          !formData[field as keyof typeof formData] ||
          formData[field as keyof typeof formData] === ""
        ) {
          newErrors[field] = true;
          hasErrors = true;
        }
      }
    });

    setErrors(newErrors);

    if (hasErrors) {
      setShowValidationAlert(true);
      setTimeout(() => setShowValidationAlert(false), 5000);
    }

    return !hasErrors;
  };

  const tiposTercero = [
    "Cliente",
    "Remitente",
    "Destinatario",
    "Propietario de carga",
    "Proveedor",
    "Conductor",
    "Transportador",
  ];

  const filteredTerceros = terceros.filter((tercero) => {
    const matchesSearch =
      tercero.razonSocial.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tercero.numeroIdentificacion.includes(searchTerm) ||
      tercero.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTipo =
      filterTipo === "Todos" || tercero.tipos.includes(filterTipo);

    return matchesSearch && matchesTipo;
  });

  const handleCreate = () => {
    setSelectedTercero({
      id: "",
      tipoDocumento: "NIT",
      numeroIdentificacion: "",
      razonSocial: "",
      nombreComercial: "",
      direccion: "",
      ciudad: "",
      departamento: "",
      telefono: "",
      email: "",
      tipos: [],
      estado: "Activo",
      sedes: [],
    });
    setIsCreating(true);
    setIsModalOpen(true);
  };

  const handleEdit = (tercero: Tercero) => {
    setSelectedTercero(tercero);
    setIsCreating(false);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!validateForm()) return;

    // Lógica de guardado
    alert("Tercero guardado exitosamente");
    setIsModalOpen(false);
    setSelectedTercero(null);
  };

  const handleDelete = (id: string) => {
    if (confirm("¿Está seguro de eliminar este tercero?")) {
      setTerceros(terceros.filter((t) => t.id !== id));
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTercero(null);
    setIsCreating(false);
  };

  const getTiposBadges = (tipos: string[]) => {
    const colors: { [key: string]: string } = {
      Cliente: "bg-blue-100 text-blue-800",
      Remitente: "bg-green-100 text-green-800",
      Destinatario: "bg-purple-100 text-purple-800",
      "Propietario de carga": "bg-orange-100 text-orange-800",
      Proveedor: "bg-pink-100 text-pink-800",
      Conductor: "bg-indigo-100 text-indigo-800",
      Transportador: "bg-teal-100 text-teal-800",
    };

    return tipos.map((tipo) => (
      <span
        key={tipo}
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          colors[tipo] || "bg-gray-100 text-gray-800"
        }`}
      >
        {tipo}
      </span>
    ));
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
              Catálogo de Terceros
            </h1>
            <p className="text-gray-600 mt-1">
              Administra clientes, remitentes, destinatarios y más
            </p>
          </div>
        </div>
        <button
          onClick={handleCreate}
          className="px-6 py-3 bg-gradient-to-r from-[#40A095] to-[#99D6CF] text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2 font-medium"
        >
          <Plus className="w-5 h-5" />
          Nuevo Tercero
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nombre, NIT, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#40A095]"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFilterTipo("Todos")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filterTipo === "Todos"
                  ? "bg-[#40A095] text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Todos
            </button>
            {tiposTercero.slice(0, 3).map((tipo) => (
              <button
                key={tipo}
                onClick={() => setFilterTipo(tipo)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filterTipo === tipo
                    ? "bg-[#40A095] text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tipo}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600">Total Terceros</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{terceros.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600">Clientes</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">
            {terceros.filter((t) => t.tipos.includes("Cliente")).length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600">Conductores</p>
          <p className="text-2xl font-bold text-indigo-600 mt-1">
            {terceros.filter((t) => t.tipos.includes("Conductor")).length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600">Activos</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {terceros.filter((t) => t.estado === "Activo").length}
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
                  Identificación
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Razón Social
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Ciudad
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Contacto
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Tipos
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
              {filteredTerceros.map((tercero) => (
                <tr key={tercero.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="font-medium text-gray-900">
                        {tercero.tipoDocumento}
                      </p>
                      <p className="text-sm text-gray-600">
                        {tercero.numeroIdentificacion}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">
                        {tercero.razonSocial}
                      </p>
                      <p className="text-sm text-gray-600">
                        {tercero.nombreComercial}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {tercero.ciudad}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Phone className="w-3 h-3" />
                        {tercero.telefono}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Mail className="w-3 h-3" />
                        {tercero.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {getTiposBadges(tercero.tipos)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        tercero.estado === "Activo"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {tercero.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(tercero)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        title="Editar"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(tercero.id)}
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

        {filteredTerceros.length === 0 && (
          <div className="py-12 text-center">
            <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No se encontraron terceros</p>
            <p className="text-gray-400 text-sm mt-2">
              Intenta cambiar los filtros o crear un nuevo tercero
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && selectedTercero && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
              <h2 className="text-2xl font-bold text-gray-900">
                {isCreating ? "Crear Nuevo Tercero" : "Editar Tercero"}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-all"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Form */}
            <div className="p-6 space-y-6">
              {/* Datos Básicos */}
              <div className="bg-gradient-to-br from-[#40A095]/5 to-[#99D6CF]/5 rounded-xl p-6 border border-[#99D6CF]/20">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-[#40A095]" />
                  Datos Básicos
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de Documento *
                    </label>
                    <select
                      defaultValue={selectedTercero.tipoDocumento}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#40A095]"
                    >
                      <option>NIT</option>
                      <option>CC</option>
                      <option>CE</option>
                      <option>Pasaporte</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Número de Identificación *
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedTercero.numeroIdentificacion}
                      placeholder="900.123.456-7"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#40A095]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Razón Social *
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedTercero.razonSocial}
                      placeholder="Nombre o razón social"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#40A095]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre Comercial
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedTercero.nombreComercial}
                      placeholder="Nombre comercial"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#40A095]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Estado *
                    </label>
                    <select
                      defaultValue={selectedTercero.estado}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#40A095]"
                    >
                      <option>Activo</option>
                      <option>Inactivo</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Tipos de Tercero */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100/30 rounded-xl p-6 border border-blue-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-blue-600" />
                  Tipos de Tercero *
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Selecciona todos los roles que apliquen a este tercero
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {tiposTercero.map((tipo) => (
                    <label
                      key={tipo}
                      className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        defaultChecked={selectedTercero.tipos.includes(tipo)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        {tipo}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Información de Contacto */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100/30 rounded-xl p-6 border border-purple-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-purple-600" />
                  Información de Contacto
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dirección *
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedTercero.direccion}
                      placeholder="Calle 123 #45-67"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ciudad *
                    </label>
                    <select
                      defaultValue={selectedTercero.ciudad}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option>Seleccione ciudad...</option>
                      <option>Bogotá</option>
                      <option>Medellín</option>
                      <option>Cali</option>
                      <option>Barranquilla</option>
                      <option>Cartagena</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Departamento *
                    </label>
                    <select
                      defaultValue={selectedTercero.departamento}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option>Seleccione departamento...</option>
                      <option>Cundinamarca</option>
                      <option>Antioquia</option>
                      <option>Valle del Cauca</option>
                      <option>Atlántico</option>
                      <option>Bolívar</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      defaultValue={selectedTercero.telefono}
                      placeholder="(601) 234 5678"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      defaultValue={selectedTercero.email}
                      placeholder="correo@ejemplo.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
              </div>

              {/* Sedes (si existen) */}
              {selectedTercero.sedes && selectedTercero.sedes.length > 0 && (
                <div className="bg-gradient-to-br from-green-50 to-green-100/30 rounded-xl p-6 border border-green-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-green-600" />
                      Sedes Adicionales
                    </h3>
                    <button className="px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm flex items-center gap-1">
                      <Plus className="w-4 h-4" />
                      Agregar Sede
                    </button>
                  </div>
                  <div className="space-y-3">
                    {selectedTercero.sedes.map((sede) => (
                      <div
                        key={sede.id}
                        className="bg-white p-4 rounded-lg border border-green-300"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900">
                              {sede.nombre}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                              {sede.direccion}, {sede.ciudad}
                            </p>
                            <p className="text-sm text-gray-600">
                              Tel: {sede.telefono} | Contacto: {sede.contacto}
                            </p>
                          </div>
                          <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Botones de Acción */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={closeModal}
                  className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-2.5 bg-gradient-to-r from-[#40A095] to-[#99D6CF] text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {isCreating ? "Crear Tercero" : "Guardar Cambios"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}