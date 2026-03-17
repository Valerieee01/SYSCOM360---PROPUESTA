import { useState } from "react";
import {
  Calendar,
  Truck,
  User,
  MapPin,
  Clock,
  DollarSign,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Navigation,
  Route,
  Sparkles,
  ChevronRight,
  Plus,
  Filter,
  RefreshCw,
  Building2,
  Package,
  Copy,
  Phone,
} from "lucide-react";

// Mock data para sugerencias automáticas
const conductoresDisponibles = [
  {
    id: "C001",
    nombre: "Juan Pérez",
    documento: "CC 1234567",
    experiencia: 8,
    viajesCompletados: 156,
    calificacion: 4.8,
    estado: "Disponible",
    ultimoViaje: "2024-03-14",
  },
  {
    id: "C002",
    nombre: "María López",
    documento: "CC 7654321",
    experiencia: 5,
    viajesCompletados: 98,
    calificacion: 4.9,
    estado: "Disponible",
    ultimoViaje: "2024-03-15",
  },
  {
    id: "C003",
    nombre: "Carlos Gómez",
    documento: "CC 9876543",
    experiencia: 12,
    viajesCompletados: 234,
    calificacion: 4.7,
    estado: "Disponible",
    ultimoViaje: "2024-03-13",
  },
];

const vehiculosDisponibles = [
  {
    placa: "ABC-123",
    tipo: "Tractocamión",
    capacidad: 28000,
    estado: "Disponible",
    ultimoMantenimiento: "2024-02-20",
    viajesRealizados: 145,
    eficiencia: 92,
  },
  {
    placa: "DEF-456",
    tipo: "Turbo",
    capacidad: 10000,
    estado: "Disponible",
    ultimoMantenimiento: "2024-03-01",
    viajesRealizados: 87,
    eficiencia: 95,
  },
  {
    placa: "GHI-789",
    tipo: "Sencillo",
    capacidad: 5000,
    estado: "Disponible",
    ultimoMantenimiento: "2024-03-10",
    viajesRealizados: 54,
    eficiencia: 89,
  },
];

const rutasHistoricas = [
  {
    origen: "Bogotá",
    destino: "Medellín",
    distancia: 415,
    tiempoPromedio: "8-10 horas",
    costoPedagio: 45000,
    costoEstimado: 850000,
    viajesRealizados: 234,
  },
  {
    origen: "Cali",
    destino: "Barranquilla",
    distancia: 1035,
    tiempoPromedio: "18-20 horas",
    costoPedagio: 125000,
    costoEstimado: 1850000,
    viajesRealizados: 145,
  },
  {
    origen: "Cartagena",
    destino: "Bogotá",
    distancia: 1065,
    tiempoPromedio: "16-18 horas",
    costoPedagio: 115000,
    costoEstimado: 1650000,
    viajesRealizados: 189,
  },
];

const viajesProgramados = [
  {
    id: "VP-001",
    fecha: "2024-03-18",
    origen: "Bogotá",
    destino: "Medellín",
    conductor: "Juan Pérez",
    vehiculo: "ABC-123",
    estado: "Programado",
    pedido: "PED-2024-056",
  },
  {
    id: "VP-002",
    fecha: "2024-03-19",
    origen: "Cali",
    destino: "Barranquilla",
    conductor: "María López",
    vehiculo: "DEF-456",
    estado: "Programado",
    pedido: "PED-2024-057",
  },
  {
    id: "VP-003",
    fecha: "2024-03-17",
    origen: "Medellín",
    destino: "Pereira",
    conductor: "Carlos Gómez",
    vehiculo: "GHI-789",
    estado: "En curso",
    pedido: "PED-2024-055",
  },
];

export default function ProgramacionViajes() {
  const [origenSeleccionado, setOrigenSeleccionado] = useState("Bogotá");
  const [destinoSeleccionado, setDestinoSeleccionado] = useState("Medellín");
  const [showSugerencias, setShowSugerencias] = useState(false);

  const rutaSugerida = rutasHistoricas.find(
    (r) => r.origen === origenSeleccionado && r.destino === destinoSeleccionado
  );

  const generarSugerencias = () => {
    setShowSugerencias(true);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-purple-600" />
            Programación Automática de Viajes
          </h1>
          <p className="text-gray-600 mt-1">
            Planificación inteligente con sugerencias basadas en IA y datos históricos
          </p>
        </div>
        <button
          onClick={generarSugerencias}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2 font-medium"
        >
          <Sparkles className="w-5 h-5" />
          Generar Sugerencias IA
        </button>
      </div>

      {/* Configuración del Viaje */}
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border-2 border-purple-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Route className="w-5 h-5 text-purple-600" />
          Configuración del Nuevo Viaje
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Origen *
            </label>
            <select
              value={origenSeleccionado}
              onChange={(e) => setOrigenSeleccionado(e.target.value)}
              className="w-full px-4 py-3 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
            >
              <option>Bogotá</option>
              <option>Medellín</option>
              <option>Cali</option>
              <option>Barranquilla</option>
              <option>Cartagena</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Destino *
            </label>
            <select
              value={destinoSeleccionado}
              onChange={(e) => setDestinoSeleccionado(e.target.value)}
              className="w-full px-4 py-3 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
            >
              <option>Medellín</option>
              <option>Bogotá</option>
              <option>Barranquilla</option>
              <option>Cali</option>
              <option>Pereira</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha de Salida *
            </label>
            <input
              type="date"
              defaultValue="2024-03-20"
              className="w-full px-4 py-3 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
            />
          </div>
        </div>

        {/* Información de la Ruta */}
        {rutaSugerida && (
          <div className="mt-4 p-4 bg-white rounded-lg border border-purple-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <Navigation className="w-4 h-4 text-purple-600" />
                Información Histórica de la Ruta
              </h4>
              <span className="text-xs text-gray-500">
                Basado en {rutaSugerida.viajesRealizados} viajes anteriores
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-gray-600">Distancia</p>
                <p className="text-sm font-bold text-gray-900">{rutaSugerida.distancia} km</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Tiempo Estimado</p>
                <p className="text-sm font-bold text-gray-900">{rutaSugerida.tiempoPromedio}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Peajes</p>
                <p className="text-sm font-bold text-gray-900">
                  ${rutaSugerida.costoPedagio.toLocaleString("es-CO")}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Costo Estimado</p>
                <p className="text-sm font-bold text-green-700">
                  ${rutaSugerida.costoEstimado.toLocaleString("es-CO")}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Información del Remitente */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100/30 rounded-xl p-6 border-2 border-blue-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-blue-600" />
          Información del Remitente
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              Dirección Origen *
            </label>
            <input
              type="text"
              placeholder="Calle 123 #45-67"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ciudad Origen *
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
              <option>Bogotá</option>
              <option>Medellín</option>
              <option>Cali</option>
              <option>Barranquilla</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Teléfono *
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="tel"
                placeholder="(601) 234 5678"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              />
            </div>
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

      {/* Información del Destinatario */}
      <div className="bg-gradient-to-br from-purple-50 to-purple-100/30 rounded-xl p-6 border-2 border-purple-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-purple-600" />
          Información del Destinatario
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              Dirección Destino *
            </label>
            <input
              type="text"
              placeholder="Calle 123 #45-67"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ciudad Destino *
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white">
              <option>Medellín</option>
              <option>Bogotá</option>
              <option>Cali</option>
              <option>Barranquilla</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Teléfono *
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="tel"
                placeholder="(601) 234 5678"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
              />
            </div>
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

      {/* Propietario de la Carga */}
      <div className="bg-gradient-to-br from-green-50 to-green-100/30 rounded-xl p-6 border-2 border-green-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-green-600" />
            Propietario de la Carga
          </h3>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-green-300 text-green-700 rounded-lg hover:bg-green-50 transition-colors text-sm">
            <Copy className="w-4 h-4" />
            Copiar del Remitente
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

      {/* Información de la Mercancía */}
      <div className="bg-gradient-to-br from-orange-50 to-orange-100/30 rounded-xl p-6 border-2 border-orange-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Package className="w-5 h-5 text-orange-600" />
          Información de la Mercancía
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
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
              Cantidad *
            </label>
            <input
              type="number"
              placeholder="10"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Peso Total (kg) *
            </label>
            <input
              type="number"
              placeholder="5000"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Valor Declarado (COP) *
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="number"
                placeholder="5000000"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
              />
            </div>
          </div>
        </div>
        
        {/* Alert informativo */}
        <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
          <p className="text-sm text-orange-800 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            Esta información se utilizará para pre-crear automáticamente el Pedido, Orden de Cargue y demás documentos del despacho.
          </p>
        </div>
      </div>

      {/* Sugerencias Automáticas */}
      {showSugerencias && (
        <div className="space-y-6">
          {/* Conductor Sugerido */}
          <div className="bg-white rounded-xl shadow-sm border-2 border-green-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <User className="w-5 h-5 text-green-600" />
                Conductor Recomendado por IA
              </h3>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Mejor opción
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {conductoresDisponibles.map((conductor, index) => (
                <div
                  key={conductor.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    index === 0
                      ? "bg-gradient-to-br from-green-50 to-teal-50 border-green-400"
                      : "bg-gray-50 border-gray-200 hover:border-green-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{conductor.nombre}</p>
                        <p className="text-xs text-gray-600">{conductor.documento}</p>
                      </div>
                    </div>
                    {index === 0 && (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    )}
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Experiencia:</span>
                      <span className="font-medium text-gray-900">{conductor.experiencia} años</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Viajes:</span>
                      <span className="font-medium text-gray-900">{conductor.viajesCompletados}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Calificación:</span>
                      <span className="font-medium text-yellow-600">⭐ {conductor.calificacion}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Último viaje:</span>
                      <span className="font-medium text-gray-900">{conductor.ultimoViaje}</span>
                    </div>
                  </div>
                  {index === 0 && (
                    <div className="mt-3 pt-3 border-t border-green-200">
                      <p className="text-xs text-green-700 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        Mayor experiencia y mejor calificación
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Vehículo Sugerido */}
          <div className="bg-white rounded-xl shadow-sm border-2 border-blue-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Truck className="w-5 h-5 text-blue-600" />
                Vehículo Recomendado por IA
              </h3>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Mejor opción
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {vehiculosDisponibles.map((vehiculo, index) => (
                <div
                  key={vehiculo.placa}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    index === 0
                      ? "bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-400"
                      : "bg-gray-50 border-gray-200 hover:border-blue-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <Truck className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{vehiculo.placa}</p>
                        <p className="text-xs text-gray-600">{vehiculo.tipo}</p>
                      </div>
                    </div>
                    {index === 0 && (
                      <CheckCircle className="w-6 h-6 text-blue-600" />
                    )}
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Capacidad:</span>
                      <span className="font-medium text-gray-900">{vehiculo.capacidad.toLocaleString()} kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Viajes:</span>
                      <span className="font-medium text-gray-900">{vehiculo.viajesRealizados}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Eficiencia:</span>
                      <span className="font-medium text-green-600">{vehiculo.eficiencia}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Mantenimiento:</span>
                      <span className="font-medium text-gray-900 text-xs">{vehiculo.ultimoMantenimiento}</span>
                    </div>
                  </div>
                  {index === 0 && (
                    <div className="mt-3 pt-3 border-t border-blue-200">
                      <p className="text-xs text-blue-700 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        Mayor eficiencia y mejor mantenimiento
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Resumen y Confirmación */}
          <div className="bg-gradient-to-br from-teal-50 to-green-50 rounded-xl shadow-sm border-2 border-teal-300 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-teal-600" />
              Resumen de Programación Sugerida
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-teal-600" />
                  <div>
                    <p className="text-sm text-gray-600">Ruta</p>
                    <p className="font-bold text-gray-900">
                      {origenSeleccionado} → {destinoSeleccionado}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Conductor Asignado</p>
                    <p className="font-bold text-gray-900">{conductoresDisponibles[0].nombre}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Vehículo Asignado</p>
                    <p className="font-bold text-gray-900">{vehiculosDisponibles[0].placa}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="text-sm text-gray-600">Tiempo Estimado</p>
                    <p className="font-bold text-gray-900">{rutaSugerida?.tiempoPromedio}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Costo Estimado</p>
                    <p className="font-bold text-green-700">
                      ${rutaSugerida?.costoEstimado.toLocaleString("es-CO")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-600">Fecha de Salida</p>
                    <p className="font-bold text-gray-900">2024-03-20</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-600 to-green-600 text-white rounded-lg hover:shadow-lg transition-all font-medium flex items-center justify-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Confirmar y Crear Viaje
              </button>
              <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium">
                Modificar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Agenda Logística - Viajes Programados */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-600" />
            Agenda Logística - Viajes Programados
          </h3>
          <div className="flex items-center gap-2">
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <RefreshCw className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">ID Viaje</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Fecha</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Ruta</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Conductor</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Vehículo</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Estado</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {viajesProgramados.map((viaje) => (
                <tr key={viaje.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{viaje.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{viaje.fecha}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {viaje.origen} → {viaje.destino}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">{viaje.conductor}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 font-medium">{viaje.vehiculo}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        viaje.estado === "Programado"
                          ? "bg-blue-100 text-blue-800"
                          : viaje.estado === "En curso"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {viaje.estado}
                    </span>
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
      </div>
    </div>
  );
}