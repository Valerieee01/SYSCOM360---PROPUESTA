import { useState } from "react";
import { ArrowLeft, Plus, Search, Edit2, Trash2, UserCircle, X, Save } from "lucide-react";

interface Conductor {
  id: string;
  identificacion: string;
  nombre: string;
  telefono: string;
  licencia: string;
  categoriaLicencia: string;
  vencimientoLicencia: string;
  empresaTransportadora: string;
  estado: "Activo" | "Inactivo" | "En Viaje";
}

const mockConductores: Conductor[] = [
  {
    id: "1",
    identificacion: "1.234.567.890",
    nombre: "Juan Pérez Gómez",
    telefono: "(601) 234 5678",
    licencia: "12345678",
    categoriaLicencia: "C2",
    vencimientoLicencia: "2027-06-15",
    empresaTransportadora: "Transportes ABC S.A.S.",
    estado: "Activo",
  },
  {
    id: "2",
    identificacion: "9.876.543.210",
    nombre: "María González",
    telefono: "(604) 345 6789",
    licencia: "87654321",
    categoriaLicencia: "C3",
    vencimientoLicencia: "2028-03-22",
    empresaTransportadora: "Transportes CR",
    estado: "En Viaje",
  },
];

interface ConductoresPageProps {
  onBack: () => void;
}

export default function ConductoresPage({ onBack }: ConductoresPageProps) {
  const [conductores] = useState<Conductor[]>(mockConductores);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedConductor, setSelectedConductor] = useState<Conductor | null>(null);

  const filteredConductores = conductores.filter((c) =>
    c.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.identificacion.includes(searchTerm)
  );

  const handleCreate = () => {
    setSelectedConductor({
      id: "",
      identificacion: "",
      nombre: "",
      telefono: "",
      licencia: "",
      categoriaLicencia: "C2",
      vencimientoLicencia: "",
      empresaTransportadora: "",
      estado: "Activo",
    });
    setIsCreating(true);
    setIsModalOpen(true);
  };

  const handleEdit = (conductor: Conductor) => {
    setSelectedConductor(conductor);
    setIsCreating(false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedConductor(null);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Catálogo de Conductores</h1>
            <p className="text-gray-600 mt-1">Administra los conductores y sus licencias</p>
          </div>
        </div>
        <button onClick={handleCreate} className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:shadow-lg flex items-center gap-2 font-medium">
          <Plus className="w-5 h-5" />
          Nuevo Conductor
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nombre o identificación..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Identificación</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Nombre</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Licencia</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Empresa</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Estado</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredConductores.map((conductor) => (
              <tr key={conductor.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                  {conductor.identificacion}
                </td>
                <td className="px-6 py-4">{conductor.nombre}</td>
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-gray-900">{conductor.licencia}</p>
                    <p className="text-sm text-gray-600">{conductor.categoriaLicencia} - Vence: {conductor.vencimientoLicencia}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">{conductor.empresaTransportadora}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    conductor.estado === "Activo" ? "bg-green-100 text-green-800" :
                    conductor.estado === "En Viaje" ? "bg-blue-100 text-blue-800" :
                    "bg-red-100 text-red-800"
                  }`}>
                    {conductor.estado}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleEdit(conductor)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedConductor && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold">{isCreating ? "Crear" : "Editar"} Conductor</h2>
              <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Identificación *</label>
                  <input type="text" defaultValue={selectedConductor.identificacion} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Nombre Completo *</label>
                  <input type="text" defaultValue={selectedConductor.nombre} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Teléfono *</label>
                  <input type="tel" defaultValue={selectedConductor.telefono} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Número de Licencia *</label>
                  <input type="text" defaultValue={selectedConductor.licencia} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Categoría *</label>
                  <select defaultValue={selectedConductor.categoriaLicencia} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500">
                    <option>A1</option>
                    <option>A2</option>
                    <option>B1</option>
                    <option>B2</option>
                    <option>B3</option>
                    <option>C1</option>
                    <option>C2</option>
                    <option>C3</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Vencimiento Licencia *</label>
                  <input type="date" defaultValue={selectedConductor.vencimientoLicencia} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-2">Empresa Transportadora *</label>
                  <select defaultValue={selectedConductor.empresaTransportadora} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500">
                    <option>Transportes ABC S.A.S.</option>
                    <option>Transportes CR</option>
                    <option>Distribuidora XYZ Ltda.</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button onClick={closeModal} className="px-6 py-2 border rounded-lg hover:bg-gray-50">Cancelar</button>
                <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2">
                  <Save className="w-4 h-4" />
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