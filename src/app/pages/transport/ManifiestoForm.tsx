import {
  ClipboardList,
  User,
  MapPin,
  Building2,
  Route,
  Truck,
  Package as PackageIcon,
  BarChart3,
  AlertCircle,
  Clock,
  MessageSquare,
  Calendar,
  X,
  Save,
  Send,
  Plus,
  Trash2,
  DollarSign,
  FileText,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";

interface ManifiestoFormProps {
  selectedDocument: {
    numero: string;
    fecha: string;
    origen: string;
    destino: string;
    valor: number;
  };
  isCreating: boolean;
  onClose: () => void;
}

export default function ManifiestoForm({
  selectedDocument,
  isCreating,
  onClose,
}: ManifiestoFormProps) {
  const [remesas, setRemesas] = useState([
    { 
      id: 1, 
      numero: "REM-2024-128", 
      cliente: "Distribuidora 123",
      mercancia: "Productos electrónicos",
      peso: 5000,
      unidades: 100,
      valor: 1800000,
      origen: "Cartagena",
      destino: "Bogotá"
    }
  ]);

  const agregarRemesa = () => {
    setRemesas([...remesas, { 
      id: remesas.length + 1, 
      numero: "",
      cliente: "",
      mercancia: "",
      peso: 0,
      unidades: 0,
      valor: 0,
      origen: "",
      destino: ""
    }]);
  };

  const eliminarRemesa = (id: number) => {
    setRemesas(remesas.filter((r) => r.id !== id));
  };

  // Cálculos automáticos
  const pesoTotal = remesas.reduce((sum, r) => sum + r.peso, 0);
  const unidadesTotal = remesas.reduce((sum, r) => sum + r.unidades, 0);
  const valorTotalRemesas = remesas.reduce((sum, r) => sum + r.valor, 0);
  
  const costoViaje = 3500000; // Ejemplo
  const costoTrayecto1 = 2000000;
  const costoTrayecto2 = 1500000;
  const costoTrayectoVacio1 = 0;
  const costoTrayectoVacio2 = 0;
  
  const totalBruto = costoViaje;
  const retencionFuente = totalBruto * 0.04; // 4%
  const ica = totalBruto * 0.00966; // 0.966%
  const totalNeto = totalBruto - retencionFuente - ica;

  return (
    <div className="p-6 space-y-6">
      {/* Alerta de Automatización */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500 p-4 rounded-lg hidden lg:block">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-blue-900 mb-1">Manifiesto Automatizado</h4>
            <p className="text-sm text-blue-700">
              Los datos de vehículo, conductor y ruta se heredan automáticamente de la Orden de Cargue.
              Los totales se calculan automáticamente desde las Remesas asociadas.
            </p>
          </div>
        </div>
      </div>

      {/* 1. Datos Básicos del Manifiesto */}
      <div className="bg-gradient-to-br from-orange-50 to-orange-100/30 rounded-xl p-6 border border-orange-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-orange-600" />
          Datos Básicos del Manifiesto
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="hidden lg:block">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              No. Manifiesto *
            </label>
            <input
              type="text"
              defaultValue={selectedDocument.numero || "MAN-2024-089"}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
            />
            <p className="text-xs text-gray-500 mt-1">Autogenerado por el sistema</p>
          </div>
          <div className="hidden lg:block">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Compañía (Cía) *
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white">
              <option>SYSCOM 360 S.A.S.</option>
              <option>Transporte Nacional</option>
              <option>Logística Express</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo Manifiesto *
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white">
              <option>Manifiesto de Carga</option>
              <option>Manifiesto Internacional</option>
              <option>Manifiesto Consolidado</option>
              <option>Manifiesto Express</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cantidad de Viajes *
            </label>
            <input
              type="number"
              defaultValue="1"
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha Despacho
            </label>
            <input
              type="date"
              defaultValue={selectedDocument.fecha || "2024-03-16"}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hora Despacho
            </label>
            <input
              type="time"
              defaultValue="10:30"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
            />
          </div>
          <div className="hidden lg:block">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estado del Manifiesto
            </label>
            <select
              disabled
              defaultValue="Pendiente"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
            >
              <option>Pendiente</option>
              <option>En tránsito</option>
              <option>Completado</option>
              <option>Cerrado</option>
            </select>
          </div>
        </div>
      </div>

      {/* 2. Remesas Asociadas */}
      <div className="bg-gradient-to-br from-purple-50 to-purple-100/30 rounded-xl p-6 border border-purple-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-600" />
            Remesas Asociadas
          </h3>
          <button
            onClick={agregarRemesa}
            className="flex items-center gap-2 px-3 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            Agregar Remesa
          </button>
        </div>
        
        <div className="space-y-3">
          {remesas.map((remesa, index) => (
            <div
              key={remesa.id}
              className="grid grid-cols-1 gap-3 p-4 bg-white rounded-lg border border-purple-200"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-purple-900">Remesa {index + 1}</h4>
                {remesas.length > 1 && (
                  <button
                    onClick={() => eliminarRemesa(remesa.id)}
                    className="px-3 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors text-sm flex items-center gap-2"
                  >
                    <Trash2 className="w-3 h-3" />
                    Eliminar
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    No. Remesa *
                  </label>
                  <select
                    value={remesa.numero || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-sm"
                  >
                    <option value="">Seleccione remesa...</option>
                    <option value="REM-2024-128">REM-2024-128</option>
                    <option value="REM-2024-129">REM-2024-129</option>
                    <option value="REM-2024-130">REM-2024-130</option>
                  </select>
                </div>
                <div className="hidden lg:block">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cliente
                  </label>
                  <input
                    type="text"
                    defaultValue={remesa.cliente}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 text-sm"
                    placeholder="Se autocompleta"
                  />
                </div>
                <div className="hidden lg:block">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Origen → Destino
                  </label>
                  <input
                    type="text"
                    defaultValue={`${remesa.origen} → ${remesa.destino}`}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 text-sm"
                    placeholder="Se autocompleta"
                  />
                </div>
                <div className="hidden lg:block">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Valor (COP)
                  </label>
                  <input
                    type="text"
                    defaultValue={`$${remesa.valor.toLocaleString('es-CO')}`}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 text-sm"
                    placeholder="Se autocompleta"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 hidden lg:grid">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción Mercancía
                  </label>
                  <input
                    type="text"
                    defaultValue={remesa.mercancia}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 text-sm"
                    placeholder="Se autocompleta desde remesa"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Peso (kg)
                  </label>
                  <input
                    type="text"
                    defaultValue={remesa.peso.toLocaleString('es-CO')}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 text-sm"
                    placeholder="Se autocompleta"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Unidades
                  </label>
                  <input
                    type="text"
                    defaultValue={remesa.unidades.toLocaleString('es-CO')}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 text-sm"
                    placeholder="Se autocompleta"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Totales de Remesas */}
        <div className="mt-4 p-4 bg-purple-100 border border-purple-300 rounded-lg">
          <h4 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Totales Consolidados
          </h4>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-purple-700 mb-1">Peso Total</p>
              <p className="text-xl font-bold text-purple-900">{pesoTotal.toLocaleString('es-CO')} kg</p>
            </div>
            <div>
              <p className="text-sm text-purple-700 mb-1">Total Unidades</p>
              <p className="text-xl font-bold text-purple-900">{unidadesTotal.toLocaleString('es-CO')}</p>
            </div>
            <div>
              <p className="text-sm text-purple-700 mb-1">Valor Total Remesas</p>
              <p className="text-xl font-bold text-purple-900">${valorTotalRemesas.toLocaleString('es-CO')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Datos Heredados de Orden de Cargue */}
      <div className="bg-gradient-to-br from-indigo-50 to-indigo-100/30 rounded-xl p-6 border border-indigo-200 hidden lg:block">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Truck className="w-5 h-5 text-indigo-600" />
          Vehículo y Conductor (Heredado de Orden de Cargue)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vehículo (Placa) *
            </label>
            <input
              type="text"
              defaultValue="ABC-123 (Tractocamión)"
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
            />
            <p className="text-xs text-gray-500 mt-1">Desde Orden de Cargue</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Remolque (Placa)
            </label>
            <input
              type="text"
              defaultValue="REM-111 (Furgón 40 pies)"
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
            />
            <p className="text-xs text-gray-500 mt-1">Desde Orden de Cargue</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Conductor Principal *
            </label>
            <input
              type="text"
              defaultValue="Juan Pérez - CC 1234567"
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
            />
            <p className="text-xs text-gray-500 mt-1">Desde Orden de Cargue</p>
          </div>
        </div>
      </div>

      {/* 4. Ruta (Heredado) */}
      <div className="bg-gradient-to-br from-cyan-50 to-cyan-100/30 rounded-xl p-6 border border-cyan-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Route className="w-5 h-5 text-cyan-600" />
          Ruta (Heredado de Orden de Cargue)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ruta *
            </label>
            <input
              type="text"
              defaultValue="Cali - Barranquilla (Costa Atlántica)"
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
            />
            <p className="text-xs text-gray-500 mt-1 hidden lg:block">Heredado desde la Orden de Cargue</p>
          </div>
          <div className="hidden lg:block">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Ruta
            </label>
            <input
              type="text"
              defaultValue="Directa"
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
            />
          </div>
          <div className="hidden lg:block">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Distancia (km)
            </label>
            <input
              type="text"
              defaultValue="1,050 km"
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
            />
          </div>
          <div className="hidden lg:block">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tiempo Estimado
            </label>
            <input
              type="text"
              defaultValue="18:30 hrs"
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
            />
          </div>
          <div className="hidden lg:block">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lugar Pago Flete
            </label>
            <input
              type="text"
              defaultValue="Barranquilla"
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
            />
          </div>
        </div>
      </div>

      {/* 5. Trayectos y Transbordo (Opcional) */}
      <div className="bg-gradient-to-br from-amber-50 to-amber-100/30 rounded-xl p-6 border border-amber-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-amber-600" />
          Trayectos y Transbordo (Opcional)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="hidden lg:block">
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4 text-amber-600 rounded" />
              Tiene Transbordo
            </label>
          </div>
          <div className="hidden lg:block"></div>
          <div className="hidden lg:block">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Municipio Origen
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white">
              <option>Cali (Valle del Cauca)</option>
              <option>Bogotá (Cundinamarca)</option>
              <option>Medellín (Antioquia)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Municipio Intermedio
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white">
              <option>Ninguno</option>
              <option>Medellín (Antioquia)</option>
              <option>Bucaramanga (Santander)</option>
              <option>Pereira (Risaralda)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Trayectos Vacíos
            </label>
            <input
              type="number"
              defaultValue="0"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white"
            />
          </div>
        </div>
      </div>

      {/* 6. Costos del Viaje */}
      <div className="bg-gradient-to-br from-green-50 to-green-100/30 rounded-xl p-6 border border-green-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-green-600" />
          Costos del Viaje
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="hidden lg:block">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Costo del Viaje *
            </label>
            <input
              type="number"
              defaultValue="3500000"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Municipio % ICA *
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white">
              <option>Barranquilla (0.966%)</option>
              <option>Bogotá (1.104%)</option>
              <option>Medellín (1.000%)</option>
              <option>Cali (1.000%)</option>
            </select>
          </div>
          <div className="hidden lg:block">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Costo Trayecto 1
            </label>
            <input
              type="number"
              defaultValue="2000000"
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
            />
            <p className="text-xs text-gray-500 mt-1">Calculado automáticamente</p>
          </div>
          <div className="hidden lg:block">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Costo Trayecto 2
            </label>
            <input
              type="number"
              defaultValue="1500000"
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
            />
            <p className="text-xs text-gray-500 mt-1">Calculado automáticamente</p>
          </div>
          <div className="hidden lg:block">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Costo Trayecto Vacío 1
            </label>
            <input
              type="number"
              defaultValue="0"
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
            />
          </div>
          <div className="hidden lg:block">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Costo Trayecto Vacío 2
            </label>
            <input
              type="number"
              defaultValue="0"
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
            />
          </div>
        </div>
      </div>

      {/* 7. Totales Calculados Automáticamente */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100/30 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          Totales del Manifiesto (Calculados Automáticamente)
        </h3>
        
        {/* Grid de Totales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="p-4 bg-white rounded-lg border border-blue-200">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Total Bruto a Pagar
            </label>
            <p className="text-2xl font-bold text-gray-900">
              ${totalBruto.toLocaleString('es-CO')}
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-blue-200">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Retención en la Fuente (4%)
            </label>
            <p className="text-2xl font-bold text-red-600">
              -${retencionFuente.toLocaleString('es-CO')}
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-blue-200">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              ICA (0.966%)
            </label>
            <p className="text-2xl font-bold text-orange-600">
              -${ica.toFixed(0).toLocaleString('es-CO')}
            </p>
          </div>
          <div className="p-4 bg-gradient-to-br from-green-500 to-green-600 rounded-lg border border-green-700 shadow-lg">
            <label className="block text-sm font-medium text-green-100 mb-2">
              Total Neto a Pagar
            </label>
            <p className="text-3xl font-bold text-white">
              ${totalNeto.toFixed(0).toLocaleString('es-CO')}
            </p>
          </div>
        </div>

        {/* Desglose */}
        <div className="p-4 bg-blue-100 rounded-lg border border-blue-300">
          <h4 className="font-semibold text-blue-900 mb-3">Desglose de Cálculo</h4>
          <div className="space-y-2 text-sm text-blue-800">
            <div className="flex justify-between">
              <span>Costo del viaje:</span>
              <span className="font-medium">${totalBruto.toLocaleString('es-CO')}</span>
            </div>
            <div className="flex justify-between">
              <span>- Retención fuente (4%):</span>
              <span className="font-medium text-red-700">-${retencionFuente.toLocaleString('es-CO')}</span>
            </div>
            <div className="flex justify-between">
              <span>- ICA Barranquilla (0.966%):</span>
              <span className="font-medium text-orange-700">-${ica.toFixed(0).toLocaleString('es-CO')}</span>
            </div>
            <div className="pt-2 border-t-2 border-blue-400 flex justify-between font-bold text-base">
              <span>Total neto a pagar:</span>
              <span className="text-green-700">${totalNeto.toFixed(0).toLocaleString('es-CO')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 8. Comentarios y Firma Electrónica */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100/30 rounded-xl p-6 border border-gray-200 hidden lg:block">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-gray-600" />
          Comentarios y Firma Electrónica
        </h3>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Comentarios
            </label>
            <textarea
              rows={4}
              placeholder="Instrucciones especiales, observaciones del manifiesto..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent resize-none bg-white"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
              Manifiesto Firmado Electrónicamente
            </label>
            <p className="text-xs text-gray-500 ml-6">
              Al marcar esta opción, el manifiesto se considera firmado digitalmente por el responsable autorizado
            </p>
          </div>
        </div>
      </div>

      {/* 9. Información del Sistema */}
      <div className="bg-gradient-to-br from-slate-50 to-slate-100/30 rounded-xl p-6 border border-slate-200 hidden lg:block">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-slate-600" />
          Información del Sistema
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha de Creación
            </label>
            <input
              type="datetime-local"
              defaultValue="2026-03-16T10:30"
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Usuario Creación
            </label>
            <input
              type="text"
              defaultValue="admin@syscomweb.com"
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Última Modificación
            </label>
            <input
              type="datetime-local"
              defaultValue="2026-03-16T14:45"
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
            />
          </div>
        </div>
      </div>

      {/* Botones de Acción */}
      <div className="sticky bottom-0 left-0 right-0 bg-white lg:bg-transparent flex flex-col lg:flex-row items-stretch lg:items-center justify-end gap-2 lg:gap-3 p-4 lg:p-0 lg:pt-4 border-t border-gray-200 -mx-4 lg:mx-0 -mb-4 lg:mb-0 shadow-lg lg:shadow-none">
        <button
          onClick={onClose}
          className="w-full lg:w-auto px-4 lg:px-6 py-3 lg:py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 active:scale-95 transition-all flex items-center justify-center gap-2 font-medium order-3 lg:order-1"
        >
          <X className="w-4 h-4" />
          <span>Cancelar</span>
        </button>
        <button className="w-full lg:w-auto px-4 lg:px-6 py-3 lg:py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 active:scale-95 transition-all flex items-center justify-center gap-2 font-medium order-2 lg:order-2">
          <Save className="w-4 h-4" />
          <span className="hidden lg:inline">Guardar Borrador</span>
          <span className="lg:hidden">Guardar</span>
        </button>
        <button className="w-full lg:w-auto px-4 lg:px-6 py-3 lg:py-2.5 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 font-medium order-1 lg:order-3">
          <Send className="w-4 h-4" />
          <span className="hidden lg:inline">Guardar y Enviar al RNDC</span>
          <span className="lg:hidden">Enviar al RNDC</span>
        </button>
      </div>
    </div>
  );
}
