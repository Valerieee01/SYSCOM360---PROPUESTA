import { useState } from "react";
import {
  Send,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  RefreshCw,
  FileText,
  Shield,
  Database,
  Activity,
  TrendingUp,
  Zap,
  FileCheck,
  User,
  Truck,
  Package,
  MapPin,
} from "lucide-react";

// Mock data para manifiestos
const manifiestosPendientes = [
  {
    numero: "MAN-2024-089",
    fecha: "2024-03-16",
    origen: "Cali",
    destino: "Barranquilla",
    conductor: "Juan Pérez",
    vehiculo: "ABC-123",
    remesas: 2,
    estado: "Pendiente Envío",
    validacion: "Completa",
  },
  {
    numero: "MAN-2024-090",
    fecha: "2024-03-17",
    origen: "Bogotá",
    destino: "Medellín",
    conductor: "María López",
    vehiculo: "DEF-456",
    remesas: 3,
    estado: "Pendiente Envío",
    validacion: "Completa",
  },
  {
    numero: "MAN-2024-091",
    fecha: "2024-03-15",
    origen: "Cartagena",
    destino: "Bogotá",
    conductor: "Carlos Gómez",
    vehiculo: "GHI-789",
    remesas: 1,
    estado: "Error Validación",
    validacion: "Incompleta",
  },
];

const historialRNDC = [
  {
    id: "RNDC-001",
    manifiesto: "MAN-2024-088",
    fechaEnvio: "2024-03-15 14:30",
    estado: "Aceptado",
    codigoRNDC: "RNDC-88745621",
    respuesta: "Manifiesto recibido y procesado correctamente",
  },
  {
    id: "RNDC-002",
    manifiesto: "MAN-2024-087",
    fechaEnvio: "2024-03-14 10:15",
    estado: "Aceptado",
    codigoRNDC: "RNDC-88745620",
    respuesta: "Manifiesto recibido y procesado correctamente",
  },
  {
    id: "RNDC-003",
    manifiesto: "MAN-2024-086",
    fechaEnvio: "2024-03-13 16:45",
    estado: "Rechazado",
    codigoRNDC: "-",
    respuesta: "Error: Peso de la mercancía no coincide con remesa",
  },
];

export default function IntegracionRNDC() {
  const [manifiestoSeleccionado, setManifiestoSeleccionado] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  const enviarManifiesto = (numero: string) => {
    setEnviando(true);
    setManifiestoSeleccionado(numero);
    
    // Simular envío
    setTimeout(() => {
      setEnviando(false);
      alert(`Manifiesto ${numero} enviado exitosamente al RNDC`);
    }, 2000);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Shield className="w-8 h-8 text-blue-600" />
            Integración Automática con RNDC
          </h1>
          <p className="text-gray-600 mt-1">
            Validación, envío y seguimiento de manifiestos al Registro Nacional de Despachos de Carga
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-green-100 rounded-lg border border-green-300">
          <Activity className="w-4 h-4 text-green-600 animate-pulse" />
          <span className="text-sm font-medium text-green-800">Conectado a RNDC</span>
        </div>
      </div>

      {/* KPIs de RNDC */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border-2 border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-blue-600 rounded-lg">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-blue-900">8</p>
          <p className="text-xs font-medium text-blue-700 mt-1">Pendientes de Envío</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border-2 border-green-200">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-green-600 rounded-lg">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <TrendingUp className="w-4 h-4 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-green-900">142</p>
          <p className="text-xs font-medium text-green-700 mt-1">Enviados Exitosamente</p>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 border-2 border-red-200">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-red-600 rounded-lg">
              <XCircle className="w-5 h-5 text-white" />
            </div>
          </div>
          <p className="text-3xl font-bold text-red-900">3</p>
          <p className="text-xs font-medium text-red-700 mt-1">Rechazados</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border-2 border-purple-200">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-purple-600 rounded-lg">
              <Zap className="w-5 h-5 text-white" />
            </div>
          </div>
          <p className="text-3xl font-bold text-purple-900">98.2%</p>
          <p className="text-xs font-medium text-purple-700 mt-1">Tasa de Éxito</p>
        </div>
      </div>

      {/* Panel de Validación */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-600" />
          Validación de Manifiestos - Listos para Envío
        </h3>

        <div className="space-y-3">
          {manifiestosPendientes.map((manifiesto) => (
            <div
              key={manifiesto.numero}
              className={`p-4 rounded-lg border-2 transition-all ${
                manifiesto.validacion === "Completa"
                  ? "bg-green-50 border-green-200"
                  : "bg-red-50 border-red-200"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h4 className="font-bold text-gray-900 text-lg">{manifiesto.numero}</h4>
                    {manifiesto.validacion === "Completa" ? (
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Validación Completa
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        Error en Validación
                      </span>
                    )}
                  </div>

                  {/* Información del Manifiesto */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-600" />
                      <div>
                        <p className="text-xs text-gray-600">Ruta</p>
                        <p className="text-sm font-medium text-gray-900">
                          {manifiesto.origen} → {manifiesto.destino}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-600" />
                      <div>
                        <p className="text-xs text-gray-600">Conductor</p>
                        <p className="text-sm font-medium text-gray-900">{manifiesto.conductor}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-gray-600" />
                      <div>
                        <p className="text-xs text-gray-600">Vehículo</p>
                        <p className="text-sm font-medium text-gray-900">{manifiesto.vehiculo}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-gray-600" />
                      <div>
                        <p className="text-xs text-gray-600">Remesas</p>
                        <p className="text-sm font-medium text-gray-900">{manifiesto.remesas}</p>
                      </div>
                    </div>
                  </div>

                  {/* Checklist de Validación */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    <div className="flex items-center gap-2 text-xs">
                      <CheckCircle className="w-3 h-3 text-green-600" />
                      <span className="text-gray-700">Datos del conductor</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <CheckCircle className="w-3 h-3 text-green-600" />
                      <span className="text-gray-700">Datos del vehículo</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <CheckCircle className="w-3 h-3 text-green-600" />
                      <span className="text-gray-700">Remesas asociadas</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      {manifiesto.validacion === "Completa" ? (
                        <CheckCircle className="w-3 h-3 text-green-600" />
                      ) : (
                        <XCircle className="w-3 h-3 text-red-600" />
                      )}
                      <span className="text-gray-700">Pesos y medidas</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <CheckCircle className="w-3 h-3 text-green-600" />
                      <span className="text-gray-700">Origen y destino</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <CheckCircle className="w-3 h-3 text-green-600" />
                      <span className="text-gray-700">Mercancía descrita</span>
                    </div>
                  </div>
                </div>

                {/* Botón de Envío */}
                <div className="ml-4">
                  {manifiesto.validacion === "Completa" ? (
                    <button
                      onClick={() => enviarManifiesto(manifiesto.numero)}
                      disabled={enviando && manifiestoSeleccionado === manifiesto.numero}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all font-medium flex items-center gap-2 disabled:opacity-50"
                    >
                      {enviando && manifiestoSeleccionado === manifiesto.numero ? (
                        <>
                          <RefreshCw className="w-5 h-5 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Enviar a RNDC
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      disabled
                      className="px-6 py-3 bg-gray-300 text-gray-600 rounded-lg font-medium flex items-center gap-2 cursor-not-allowed"
                    >
                      <XCircle className="w-5 h-5" />
                      Corregir Errores
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Historial de Comunicaciones con RNDC */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Database className="w-5 h-5 text-purple-600" />
            Historial de Comunicaciones con RNDC
          </h3>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all text-sm font-medium flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Actualizar
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Manifiesto</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Fecha Envío</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Estado</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Código RNDC</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Respuesta</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {historialRNDC.map((registro) => (
                <tr key={registro.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm font-semibold text-blue-600">{registro.manifiesto}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{registro.fechaEnvio}</td>
                  <td className="px-4 py-3">
                    {registro.estado === "Aceptado" ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        <CheckCircle className="w-3 h-3" />
                        Aceptado
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                        <XCircle className="w-3 h-3" />
                        Rechazado
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{registro.codigoRNDC}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{registro.respuesta}</td>
                  <td className="px-4 py-3">
                    <button className="px-3 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded-lg transition-all font-medium">
                      Ver Detalle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Estadísticas de Integración */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Tiempo Promedio de Respuesta</p>
              <p className="text-2xl font-bold text-gray-900">2.3 min</p>
            </div>
          </div>
          <div className="pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-500">Última actualización: Hace 5 min</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Manifiestos Hoy</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
          </div>
          <div className="pt-3 border-t border-gray-200">
            <p className="text-xs text-green-600 font-medium">+3 vs ayer</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <FileCheck className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Procesados</p>
              <p className="text-2xl font-bold text-gray-900">1,456</p>
            </div>
          </div>
          <div className="pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-500">En los últimos 30 días</p>
          </div>
        </div>
      </div>
    </div>
  );
}
