import { useState } from "react";
import { ArrowLeft, Plus, Search, Edit2, Trash2, Warehouse, X, Save, MapPin } from "lucide-react";

interface Bodega {
  id: string;
  codigo: string;
  nombre: string;
  direccion: string;
  ciudad: string;
  departamento: string;
  tipo: "Origen" | "Destino" | "Intermedia";
  empresaAsociada: string;
  estado: "Activa" | "Inactiva";
}

const mockBodegas: Bodega[] = [
  {
    id: "1",
    codigo: "BOD-001",
    nombre: "Bodega Central Bogotá",
    direccion: "Calle 100 #15-20",
    ciudad: "Bogotá",
    departamento: "Cundinamarca",
    tipo: "Origen",
    empresaAsociada: "Transportes ABC S.A.S.",
    estado: "Activa",
  },
  {
    id: "2",
    codigo: "BOD-002",
    nombre: "Punto Logístico Medellín",
    direccion: "Carrera 50 #45-67",
    ciudad: "Medellín",
    departamento: "Antioquia",
    tipo: "Destino",
    empresaAsociada: "Distribuidora XYZ Ltda.",
    estado: "Activa",
  },
];

export default function BodegasPage({ onBack }: { onBack: () => void }) {
  const [bodegas] = useState<Bodega[]>(mockBodegas);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedBodega, setSelectedBodega] = useState<Bodega | null>(null);

  const filteredBodegas = bodegas.filter((b) =>
    b.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.codigo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = () => {
    setSelectedBodega({
      id: "",
      codigo: "",
      nombre: "",
      direccion: "",
      ciudad: "",
      departamento: "",
      tipo: "Origen",
      empresaAsociada: "",
      estado: "Activa",
    });
    setIsCreating(true);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg"><ArrowLeft className="w-5 h-5" /></button>
          <div>
            <h1 className="text-3xl font-bold">Catálogo de Bodegas</h1>
            <p className="text-gray-600 mt-1">Administra los puntos logísticos</p>
          </div>
        </div>
        <button onClick={handleCreate} className="px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg hover:shadow-lg flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Nueva Bodega
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="text" placeholder="Buscar bodega..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Código</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Nombre</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Ubicación</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Tipo</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Empresa</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Estado</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredBodegas.map((bodega) => (
              <tr key={bodega.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-semibold text-gray-900">{bodega.codigo}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Warehouse className="w-5 h-5 text-teal-600" />
                    <span className="font-medium">{bodega.nombre}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1 text-sm">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{bodega.ciudad}, {bodega.departamento}</span>
                  </div>
                  <p className="text-xs text-gray-500">{bodega.direccion}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    bodega.tipo === "Origen" ? "bg-blue-100 text-blue-800" :
                    bodega.tipo === "Destino" ? "bg-purple-100 text-purple-800" :
                    "bg-orange-100 text-orange-800"
                  }`}>
                    {bodega.tipo}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{bodega.empresaAsociada}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${bodega.estado === "Activa" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                    {bodega.estado}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button onClick={() => { setSelectedBodega(bodega); setIsCreating(false); setIsModalOpen(true); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
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

      {isModalOpen && selectedBodega && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full">
            <div className="border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold">{isCreating ? "Crear" : "Editar"} Bodega</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Código *</label>
                  <input type="text" defaultValue={selectedBodega.codigo} placeholder="BOD-001" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Nombre *</label>
                  <input type="text" defaultValue={selectedBodega.nombre} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-2">Dirección *</label>
                  <input type="text" defaultValue={selectedBodega.direccion} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Ciudad *</label>
                  <select defaultValue={selectedBodega.ciudad} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500">
                    <option>Bogotá</option>
                    <option>Medellín</option>
                    <option>Cali</option>
                    <option>Barranquilla</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Departamento *</label>
                  <select defaultValue={selectedBodega.departamento} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500">
                    <option>Cundinamarca</option>
                    <option>Antioquia</option>
                    <option>Valle del Cauca</option>
                    <option>Atlántico</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Tipo *</label>
                  <select defaultValue={selectedBodega.tipo} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500">
                    <option>Origen</option>
                    <option>Destino</option>
                    <option>Intermedia</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Empresa Asociada *</label>
                  <select defaultValue={selectedBodega.empresaAsociada} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500">
                    <option>Transportes ABC S.A.S.</option>
                    <option>Distribuidora XYZ Ltda.</option>
                    <option>Transportes CR</option>
                  </select>
                </div>
              </div>
              <div className="sticky bottom-0 left-0 right-0 bg-white lg:bg-transparent flex flex-col lg:flex-row justify-end gap-2 lg:gap-3 p-4 lg:p-0 lg:pt-4 border-t border-gray-200 -mx-4 lg:mx-0 -mb-4 lg:mb-0 shadow-lg lg:shadow-none">
                <button onClick={() => setIsModalOpen(false)} className="w-full lg:w-auto px-4 lg:px-6 py-3 lg:py-2 border border-gray-300 rounded-lg hover:bg-gray-50 active:scale-95 transition-all font-medium order-2 lg:order-1">
                  Cancelar
                </button>
                <button className="w-full lg:w-auto px-4 lg:px-6 py-3 lg:py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 active:scale-95 transition-all flex items-center justify-center gap-2 font-medium order-1 lg:order-2">
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