import { useState } from "react";
import { ArrowLeft, Plus, Search, Edit2, Trash2, Route, X, Save, MapPin } from "lucide-react";

interface Ruta {
  id: string;
  nombre: string;
  ciudadOrigen: string;
  ciudadDestino: string;
  distancia: number;
  tiempoEstimado: number;
  estado: "Activa" | "Inactiva";
}

const mockRutas: Ruta[] = [
  {
    id: "1",
    nombre: "Bogotá - Medellín",
    ciudadOrigen: "Bogotá",
    ciudadDestino: "Medellín",
    distancia: 415,
    tiempoEstimado: 9,
    estado: "Activa",
  },
  {
    id: "2",
    nombre: "Cali - Barranquilla",
    ciudadOrigen: "Cali",
    ciudadDestino: "Barranquilla",
    distancia: 1058,
    tiempoEstimado: 18,
    estado: "Activa",
  },
];

export default function RutasPage({ onBack }: { onBack: () => void }) {
  const [rutas] = useState<Ruta[]>(mockRutas);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedRuta, setSelectedRuta] = useState<Ruta | null>(null);

  const filteredRutas = rutas.filter((r) =>
    r.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = () => {
    setSelectedRuta({
      id: "",
      nombre: "",
      ciudadOrigen: "",
      ciudadDestino: "",
      distancia: 0,
      tiempoEstimado: 0,
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
            <h1 className="text-3xl font-bold">Catálogo de Rutas</h1>
            <p className="text-gray-600 mt-1">Administra las rutas logísticas</p>
          </div>
        </div>
        <button onClick={handleCreate} className="px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg hover:shadow-lg flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Nueva Ruta
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="text" placeholder="Buscar ruta..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Ruta</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Origen → Destino</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Distancia</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Tiempo Est.</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Estado</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredRutas.map((ruta) => (
              <tr key={ruta.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-semibold text-gray-900">{ruta.nombre}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-orange-600" />
                    <span>{ruta.ciudadOrigen} → {ruta.ciudadDestino}</span>
                  </div>
                </td>
                <td className="px-6 py-4">{ruta.distancia} km</td>
                <td className="px-6 py-4">{ruta.tiempoEstimado} horas</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${ruta.estado === "Activa" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                    {ruta.estado}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button onClick={() => { setSelectedRuta(ruta); setIsCreating(false); setIsModalOpen(true); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
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

      {isModalOpen && selectedRuta && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full">
            <div className="border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold">{isCreating ? "Crear" : "Editar"} Ruta</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-2">Nombre de la Ruta *</label>
                  <input type="text" defaultValue={selectedRuta.nombre} placeholder="Bogotá - Medellín" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Ciudad Origen *</label>
                  <select defaultValue={selectedRuta.ciudadOrigen} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500">
                    <option>Bogotá</option>
                    <option>Medellín</option>
                    <option>Cali</option>
                    <option>Barranquilla</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Ciudad Destino *</label>
                  <select defaultValue={selectedRuta.ciudadDestino} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500">
                    <option>Bogotá</option>
                    <option>Medellín</option>
                    <option>Cali</option>
                    <option>Barranquilla</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Distancia (km) *</label>
                  <input type="number" defaultValue={selectedRuta.distancia} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Tiempo Estimado (horas) *</label>
                  <input type="number" defaultValue={selectedRuta.tiempoEstimado} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500" />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button onClick={() => setIsModalOpen(false)} className="px-6 py-2 border rounded-lg hover:bg-gray-50">Cancelar</button>
                <button className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center gap-2">
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