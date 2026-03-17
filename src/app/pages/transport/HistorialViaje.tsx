import { useState } from "react";
import {
  FileText,
  Package,
  Truck,
  FileCheck,
  DollarSign,
  ClipboardCheck,
  User,
  Calendar,
  MapPin,
  Clock,
  CheckCircle,
  Circle,
  Send,
  Play,
  Flag,
  AlertCircle,
  Navigation,
  MessageSquare,
  ChevronRight,
} from "lucide-react";

// Mock data para timeline de viajes
const viajesConHistorial = [
  {
    id: "V-2024-001",
    pedido: "PED-2024-045",
    manifiesto: "MAN-2024-089",
    origen: "Cali",
    destino: "Barranquilla",
    conductor: "Juan Pérez",
    vehiculo: "ABC-123",
    estado: "En tránsito",
    timeline: [
      {
        evento: "Pedido creado",
        fecha: "2024-03-10 09:30",
        usuario: "admin@syscom360.com",
        documento: "PED-2024-045",
        estado: "completado",
        icon: FileText,
        color: "blue",
        descripcion: "Cliente: ACME Corp - Ruta: Cali → Barranquilla",
      },
      {
        evento: "Orden de cargue generada",
        fecha: "2024-03-10 10:15",
        usuario: "operaciones@syscom360.com",
        documento: "OC-2024-078",
        estado: "completado",
        icon: Package,
        color: "green",
        descripcion: "Programación de cargue automática basada en disponibilidad",
      },
      {
        evento: "Vehículo asignado",
        fecha: "2024-03-10 10:20",
        usuario: "Sistema IA",
        documento: "ABC-123 (Tractocamión)",
        estado: "completado",
        icon: Truck,
        color: "blue",
        descripcion: "Asignación automática por IA - Eficiencia: 92%",
      },
      {
        evento: "Conductor asignado",
        fecha: "2024-03-10 10:25",
        usuario: "Sistema IA",
        documento: "Juan Pérez (CC 1234567)",
        estado: "completado",
        icon: User,
        color: "purple",
        descripcion: "Mejor conductor disponible - Calificación: 4.8⭐",
      },
      {
        evento: "Remesa creada",
        fecha: "2024-03-11 14:00",
        usuario: "logistica@syscom360.com",
        documento: "REM-2024-128",
        estado: "completado",
        icon: Package,
        color: "purple",
        descripcion: "2 contenedores - Peso total: 8,500 kg",
      },
      {
        evento: "Manifiesto generado",
        fecha: "2024-03-12 08:30",
        usuario: "Sistema Automático",
        documento: "MAN-2024-089",
        estado: "completado",
        icon: FileCheck,
        color: "orange",
        descripcion: "Totales calculados automáticamente - ICA y retenciones aplicadas",
      },
      {
        evento: "Manifiesto enviado a RNDC",
        fecha: "2024-03-12 08:35",
        usuario: "Sistema Integración",
        documento: "RNDC-88745623",
        estado: "completado",
        icon: Send,
        color: "blue",
        descripcion: "Respuesta RNDC: Aceptado - Código: RNDC-88745623",
      },
      {
        evento: "Anticipo generado",
        fecha: "2024-03-13 10:00",
        usuario: "finanzas@syscom360.com",
        documento: "ANT-2024-034",
        estado: "completado",
        icon: DollarSign,
        color: "emerald",
        descripcion: "Valor: $800,000 - Transferencia bancaria",
      },
      {
        evento: "Viaje iniciado",
        fecha: "2024-03-14 06:00",
        usuario: "Juan Pérez",
        documento: "Cargue completado",
        estado: "completado",
        icon: Play,
        color: "green",
        descripcion: "Inicio de tránsito - Cargue verificado",
      },
      {
        evento: "Viaje en tránsito",
        fecha: "2024-03-14 12:00",
        usuario: "Sistema GPS",
        documento: "Ubicación: Bucaramanga",
        estado: "en-proceso",
        icon: Navigation,
        color: "blue",
        descripcion: "Progreso: 65% - Velocidad promedio: 75 km/h",
      },
      {
        evento: "Viaje finalizado",
        fecha: "-",
        usuario: "-",
        documento: "-",
        estado: "pendiente",
        icon: Flag,
        color: "gray",
        descripcion: "Esperando llegada a destino",
      },
      {
        evento: "Cumplido generado",
        fecha: "-",
        usuario: "-",
        documento: "-",
        estado: "pendiente",
        icon: ClipboardCheck,
        color: "gray",
        descripcion: "Pendiente de finalización del viaje",
      },
    ],
  },
  {
    id: "V-2024-002",
    pedido: "PED-2024-046",
    manifiesto: "MAN-2024-090",
    origen: "Bogotá",
    destino: "Medellín",
    conductor: "María López",
    vehiculo: "DEF-456",
    estado: "Cumplido",
    timeline: [
      {
        evento: "Pedido creado",
        fecha: "2024-03-08 11:00",
        usuario: "admin@syscom360.com",
        documento: "PED-2024-046",
        estado: "completado",
        icon: FileText,
        color: "blue",
      },
      {
        evento: "Orden de cargue generada",
        fecha: "2024-03-08 11:30",
        usuario: "operaciones@syscom360.com",
        documento: "OC-2024-079",
        estado: "completado",
        icon: Package,
        color: "green",
      },
      {
        evento: "Vehículo y conductor asignados",
        fecha: "2024-03-08 12:00",
        usuario: "Sistema IA",
        documento: "DEF-456 - María López",
        estado: "completado",
        icon: Truck,
        color: "blue",
      },
      {
        evento: "Remesa creada",
        fecha: "2024-03-09 09:00",
        usuario: "logistica@syscom360.com",
        documento: "REM-2024-129",
        estado: "completado",
        icon: Package,
        color: "purple",
      },
      {
        evento: "Manifiesto generado y enviado a RNDC",
        fecha: "2024-03-10 07:00",
        usuario: "Sistema Automático",
        documento: "MAN-2024-090 / RNDC-88745624",
        estado: "completado",
        icon: FileCheck,
        color: "orange",
      },
      {
        evento: "Anticipo generado",
        fecha: "2024-03-10 10:00",
        usuario: "finanzas@syscom360.com",
        documento: "ANT-2024-035",
        estado: "completado",
        icon: DollarSign,
        color: "emerald",
      },
      {
        evento: "Viaje iniciado",
        fecha: "2024-03-11 05:00",
        usuario: "María López",
        documento: "Cargue completado",
        estado: "completado",
        icon: Play,
        color: "green",
      },
      {
        evento: "Viaje en tránsito",
        fecha: "2024-03-11 10:00",
        usuario: "Sistema GPS",
        documento: "En ruta",
        estado: "completado",
        icon: Navigation,
        color: "blue",
      },
      {
        evento: "Viaje finalizado",
        fecha: "2024-03-11 15:00",
        usuario: "María López",
        documento: "Descargue completado",
        estado: "completado",
        icon: Flag,
        color: "green",
      },
      {
        evento: "Cumplido generado",
        fecha: "2024-03-11 16:00",
        usuario: "operaciones@syscom360.com",
        documento: "CUM-2024-067",
        estado: "completado",
        icon: ClipboardCheck,
        color: "teal",
        descripcion: "Viaje cerrado exitosamente - Tipo: Cumplido Normal",
      },
    ],
  },
];

export default function HistorialViaje() {
  const [viajeSeleccionado, setViajeSeleccionado] = useState(viajesConHistorial[0]);

  const getIconColor = (color: string) => {
    switch (color) {
      case "blue":
        return "bg-blue-100 text-blue-600 border-blue-200";
      case "green":
        return "bg-green-100 text-green-600 border-green-200";
      case "purple":
        return "bg-purple-100 text-purple-600 border-purple-200";
      case "orange":
        return "bg-orange-100 text-orange-600 border-orange-200";
      case "emerald":
        return "bg-emerald-100 text-emerald-600 border-emerald-200";
      case "teal":
        return "bg-teal-100 text-teal-600 border-teal-200";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  const getEstadoIcono = (estado: string) => {
    switch (estado) {
      case "completado":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "en-proceso":
        return <Clock className="w-5 h-5 text-blue-600 animate-pulse" />;
      case "pendiente":
        return <Circle className="w-5 h-5 text-gray-400" />;
      default:
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <Clock className="w-8 h-8 text-purple-600" />
          Historial Completo del Viaje
        </h1>
        <p className="text-gray-600 mt-1">
          Timeline automático de todos los eventos y documentos del proceso de transporte
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Lista de Viajes */}
        <div className="lg:col-span-1 space-y-3">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Seleccionar Viaje:</h3>
          {viajesConHistorial.map((viaje) => (
            <button
              key={viaje.id}
              onClick={() => setViajeSeleccionado(viaje)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                viajeSeleccionado.id === viaje.id
                  ? "bg-blue-50 border-blue-400"
                  : "bg-white border-gray-200 hover:border-blue-300"
              }`}
            >
              <p className="font-bold text-gray-900 mb-1">{viaje.id}</p>
              <p className="text-xs text-gray-600 mb-2">{viaje.pedido}</p>
              <p className="text-xs text-gray-700">
                {viaje.origen} → {viaje.destino}
              </p>
              <span
                className={`inline-block mt-2 px-2 py-1 rounded-full text-xs font-medium ${
                  viaje.estado === "Cumplido"
                    ? "bg-green-100 text-green-800"
                    : viaje.estado === "En tránsito"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {viaje.estado}
              </span>
            </button>
          ))}
        </div>

        {/* Timeline del Viaje */}
        <div className="lg:col-span-3">
          {/* Header del Viaje */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-200 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Timeline - Viaje {viajeSeleccionado.id}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-gray-600">Pedido</p>
                <p className="text-sm font-bold text-blue-600">{viajeSeleccionado.pedido}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Manifiesto</p>
                <p className="text-sm font-bold text-orange-600">{viajeSeleccionado.manifiesto}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Conductor</p>
                <p className="text-sm font-bold text-gray-900">{viajeSeleccionado.conductor}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Vehículo</p>
                <p className="text-sm font-bold text-gray-900">{viajeSeleccionado.vehiculo}</p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              Línea de Tiempo de Eventos
            </h3>

            <div className="relative">
              {/* Línea vertical */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>

              {/* Eventos */}
              <div className="space-y-6">
                {viajeSeleccionado.timeline.map((evento, index) => {
                  const Icon = evento.icon;
                  return (
                    <div key={index} className="relative pl-16">
                      {/* Icono del evento */}
                      <div
                        className={`absolute left-0 w-12 h-12 rounded-full border-2 flex items-center justify-center ${getIconColor(
                          evento.color
                        )}`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>

                      {/* Indicador de estado */}
                      <div className="absolute left-14 top-4">
                        {getEstadoIcono(evento.estado)}
                      </div>

                      {/* Contenido del evento */}
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-blue-300 transition-all">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-bold text-gray-900">{evento.evento}</h4>
                            {evento.descripcion && (
                              <p className="text-sm text-gray-600 mt-1">{evento.descripcion}</p>
                            )}
                          </div>
                          {evento.estado === "en-proceso" && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium animate-pulse">
                              En proceso
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-700">
                              {evento.fecha !== "-" ? evento.fecha : "Pendiente"}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-700">
                              {evento.usuario !== "-" ? evento.usuario : "Pendiente"}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-700 font-medium">
                              {evento.documento !== "-" ? evento.documento : "Pendiente"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Observaciones */}
          <div className="mt-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border-2 border-yellow-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-orange-600" />
              Observaciones y Novedades del Viaje
            </h3>
            <div className="space-y-3">
              <div className="bg-white rounded-lg p-4 border border-orange-200">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Novedad reportada</p>
                    <p className="text-xs text-gray-600 mt-1">
                      Retraso de 30 minutos por tráfico en peaje de La Línea
                    </p>
                    <p className="text-xs text-gray-500 mt-1">2024-03-14 12:45 - Sistema GPS</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
