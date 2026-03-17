import { useState } from "react";
import { ArrowLeft, Plus, Search, Edit2, Trash2, Package, X, Save } from "lucide-react";

interface Mercancia {
  id: string;
  codigo: string;
  descripcion: string;
  tipoCarga: string;
  naturaleza: string;
  tipoEmbalaje: string;
  unidadMedida: string;
  estado: "Activo" | "Inactivo";
}

const mockMercancias: Mercancia[] = [
  {
    id: "1",
    codigo: "MERC-001",
    descripcion: "Electrodomésticos - Neveras",
    tipoCarga: "Carga General",
    naturaleza: "Frágil",
    tipoEmbalaje: "Caja",
    unidadMedida: "Unidades",
    estado: "Activo",
  },
  {
    id: "2",
    codigo: "MERC-002",
    descripcion: "Alimentos Perecederos",
    tipoCarga: "Refrigerada",
    naturaleza: "Perecedera",
    tipoEmbalaje: "Contenedor",
    unidadMedida: "Kilogramos",
    estado: "Activo",
  },
];

export default function MercanciasPage({ onBack }: { onBack: () => void }) {
  const [mercancias] = useState<Mercancia[]>(mockMercancias);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedMercancia, setSelectedMercancia] = useState<Mercancia | null>(null);

  const filteredMercancias = mercancias.filter((m) =>
    m.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.codigo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = () => {
    setSelectedMercancia({
      id: "",
      codigo: "",
      descripcion: "",
      tipoCarga: "Carga General",
      naturaleza: "No Perecedera",
      tipoEmbalaje: "Caja",
      unidadMedida: "Kilogramos",
      estado: "Activo",
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
            <h1 className="text-3xl font-bold">Catálogo de Mercancías</h1>
            <p className="text-gray-600 mt-1">Administra los productos transportados</p>
          </div>
        </div>
        <button onClick={handleCreate} className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg hover:shadow-lg flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Nueva Mercancía
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="text" placeholder="Buscar por código o descripción..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Código</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Descripción</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Tipo de Carga</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Naturaleza</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Embalaje</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Estado</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredMercancias.map((mercancia) => (
              <tr key={mercancia.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-semibold text-gray-900">{mercancia.codigo}</td>
                <td className="px-6 py-4">{mercancia.descripcion}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">{mercancia.tipoCarga}</span>
                </td>
                <td className="px-6 py-4 text-gray-600">{mercancia.naturaleza}</td>
                <td className="px-6 py-4 text-gray-600">{mercancia.tipoEmbalaje}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${mercancia.estado === "Activo" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                    {mercancia.estado}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button onClick={() => { setSelectedMercancia(mercancia); setIsCreating(false); setIsModalOpen(true); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
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

      {isModalOpen && selectedMercancia && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full">
            <div className="border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold">{isCreating ? "Crear" : "Editar"} Mercancía</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Código *</label>
                  <input type="text" defaultValue={selectedMercancia.codigo} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-2">Descripción *</label>
                  <textarea defaultValue={selectedMercancia.descripcion} rows={2} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 resize-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Tipo de Carga *</label>
                  <select defaultValue={selectedMercancia.tipoCarga} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500">
                    <option>Carga General</option>
                    <option>Granel</option>
                    <option>Refrigerada</option>
                    <option>Peligrosa</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Naturaleza *</label>
                  <select defaultValue={selectedMercancia.naturaleza} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500">
                    <option>Perecedera</option>
                    <option>No Perecedera</option>
                    <option>Frágil</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Tipo de Embalaje *</label>
                  <select defaultValue={selectedMercancia.tipoEmbalaje} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500">
                    <option>Caja</option>
                    <option>Pallet</option>
                    <option>Contenedor</option>
                    <option>Granel</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Unidad de Medida *</label>
                  <select defaultValue={selectedMercancia.unidadMedida} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500">
                    <option>Kilogramos</option>
                    <option>Toneladas</option>
                    <option>Unidades</option>
                    <option>Metros cúbicos</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button onClick={() => setIsModalOpen(false)} className="px-6 py-2 border rounded-lg hover:bg-gray-50">Cancelar</button>
                <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2">
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