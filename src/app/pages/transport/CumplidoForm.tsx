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
  FileCheck,
} from "lucide-react";
import { useState } from "react";

interface CumplidoFormProps {
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

export default function CumplidoForm({
  selectedDocument,
  isCreating,
  onClose,
}: CumplidoFormProps) {
  // Datos heredados del manifiesto
  const remesas = [
    { 
      item: 1, 
      numero: "REM-2024-128", 
      descripcion: "Productos electrónicos - Televisores LED",
      peso: 5000,
      unidades: 100,
      volumen: 45.5,
      tarifaCobro: 180000,
      tarifaTabla: 150000
    },
    { 
      item: 2, 
      numero: "REM-2024-129", 
      descripcion: "Electrodomésticos - Refrigeradores",
      peso: 3500,
      unidades: 50,
      volumen: 38.2,
      tarifaCobro: 140000,
      tarifaTabla: 120000
    }
  ];

  // Cálculos automáticos
  const pesoTotal = remesas.reduce((sum, r) => sum + r.peso, 0);
  const unidadesTotal = remesas.reduce((sum, r) => sum + r.unidades, 0);
  const volumenTotal = remesas.reduce((sum, r) => sum + r.volumen, 0);
  const totalCliente = remesas.reduce((sum, r) => sum + r.tarifaCobro, 0);
  const totalPago = remesas.reduce((sum, r) => sum + r.tarifaTabla, 0);
  
  // Valores adicionales
  const [cuapl, setCuapl] = useState("1600600.00");
  const [compensacion, setCompensacion] = useState("500000.00");
  const [valorAdicionalCategoria, setValorAdicionalCategoria] = useState("0");
  const valorAdicionalCargues = 50000;
  const valorAdicionalDescargues = 30000;
  const valorAdicionalAPagar = 25000;
  const [motivoPagoAdicional, setMotivoPagoAdicional] = useState("");
  const [fechaEstrategiaDescuento, setFechaEstrategiaDescuento] = useState("");
  const [compuestoContable, setCompuestoContable] = useState("");
  const [codigoComplementario, setCodigoComplementario] = useState("");
  const [nombreComplementario, setNombreComplementario] = useState("");
  const [plazoPago, setPlazoPago] = useState("");
  const [fechaPago, setFechaPago] = useState("");
  const [comentarios, setComentarios] = useState("");

  const totalPagoFinal = totalPago + valorAdicionalCargues + valorAdicionalDescargues + valorAdicionalAPagar + parseFloat(compensacion || "0") + parseFloat(valorAdicionalCategoria || "0");

  return (
    <div className="p-6 space-y-6">
      {/* Alerta de Automatización */}
      <div className="bg-gradient-to-r from-green-50 to-teal-50 border-l-4 border-green-500 p-4 rounded-lg hidden md:block">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-green-900 mb-1">Cumplido Automatizado - Último Paso del Proceso</h4>
            <p className="text-sm text-green-700">
              Al seleccionar el manifiesto, todos los datos del viaje, vehículo, conductor y remesas se cargan automáticamente.
              Los totales se calculan en tiempo real. Solo confirma el tipo de cumplido y guarda.
            </p>
          </div>
        </div>
      </div>

      {/* 1. Datos Básicos */}
      <div className="bg-gradient-to-br from-teal-50 to-teal-100/30 rounded-xl p-6 border border-teal-200 hidden md:block">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-teal-600" />
          Datos Básicos del Cumplido
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              No. Cumplido
            </label>
            <input
              type="text"
              defaultValue={selectedDocument.numero || "CUM-2024-067"}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
            />
            <p className="text-xs text-gray-500 mt-1">Autogenerado por el sistema</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Compañía
            </label>
            <select 
              disabled
              defaultValue="SYSCOM 360 S.A.S."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
            >
              <option>SYSCOM 360 S.A.S.</option>
              <option>Transporte Nacional</option>
              <option>Logística Express</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              No. Radicado Min. Transporte
            </label>
            <input
              type="text"
              defaultValue="RAD-MT-2024-1547"
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
            />
            <p className="text-xs text-gray-500 mt-1">Autogenerado</p>
          </div>
        </div>
      </div>

      {/* 2. Información del Manifiesto */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100/30 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          Información del Manifiesto (Heredada)
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              No. Manifiesto *
            </label>
            <select
              defaultValue="MAN-2024-089"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="">Seleccione manifiesto...</option>
              <option value="MAN-2024-089">MAN-2024-089 - Cali → Barranquilla</option>
              <option value="MAN-2024-088">MAN-2024-088 - Bogotá → Medellín</option>
              <option value="MAN-2024-087">MAN-2024-087 - Cartagena → Bogotá</option>
            </select>
          </div>
        </div>

        {/* Datos heredados del manifiesto */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200 hidden md:grid">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1 text-xs">
              Compañía
            </label>
            <p className="text-sm font-semibold text-gray-900">SYSCOM 360 S.A.S.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1 text-xs">
              Fecha Creación
            </label>
            <p className="text-sm font-semibold text-gray-900">2024-03-13</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1 text-xs">
              Vehículo
            </label>
            <p className="text-sm font-semibold text-gray-900">ABC-123 (Tractocamión)</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1 text-xs">
              Documento Conductor
            </label>
            <p className="text-sm font-semibold text-gray-900">CC 1234567</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1 text-xs">
              Nombre Conductor
            </label>
            <p className="text-sm font-semibold text-gray-900">Juan Pérez</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1 text-xs">
              Viajes Diarios
            </label>
            <p className="text-sm font-semibold text-gray-900">1</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1 text-xs">
              Lugar Origen
            </label>
            <p className="text-sm font-semibold text-gray-900">Cali, Valle del Cauca</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1 text-xs">
              Lugar Destino
            </label>
            <p className="text-sm font-semibold text-gray-900">Barranquilla, Atlántico</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1 text-xs">
              Estado Manifiesto
            </label>
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Completado
            </span>
          </div>
        </div>
      </div>

      {/* 3. Información Adicional / Configuración */}
      <div className="bg-gradient-to-br from-purple-50 to-purple-100/30 rounded-xl p-6 border border-purple-200 hidden md:block">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-purple-600" />
          Información Adicional y Configuración
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tolerancia en Faltante (%)
            </label>
            <input
              type="number"
              defaultValue="5"
              step="0.1"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
            />
            <p className="text-xs text-gray-500 mt-1">Configuración del sistema</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Margen
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white">
              <option>Porcentaje (%)</option>
              <option>Valor Fijo (COP)</option>
              <option>Por Unidad</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Unidad de Cálculo
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white">
              <option>Kilogramos (kg)</option>
              <option>Toneladas (ton)</option>
              <option>Unidades</option>
              <option>Metros cúbicos (m³)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tarifa Faltante de Pago
            </label>
            <input
              type="number"
              placeholder="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Peso de Pago
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white">
              <option>Peso Bruto</option>
              <option>Peso Neto</option>
              <option>Peso Volumétrico</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tarifa Faltante de Pago (Cobro)
            </label>
            <input
              type="number"
              placeholder="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Peso de Cobro
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white">
              <option>Peso Bruto</option>
              <option>Peso Neto</option>
              <option>Peso Volumétrico</option>
            </select>
          </div>
        </div>
      </div>

      {/* 4. Remesas Asociadas (Tabla) */}
      <div className="bg-gradient-to-br from-orange-50 to-orange-100/30 rounded-xl p-6 border border-orange-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <PackageIcon className="w-5 h-5 text-orange-600" />
          Remesas Asociadas (Desde Manifiesto)
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-orange-100 border-b-2 border-orange-300">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Item</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">No. Remesa</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Descripción Mercancía</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Peso (kg)</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Unidades</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Volumen (m³)</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Tarifa Cobro</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Tarifa Tabla</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-orange-200">
              {remesas.map((remesa) => (
                <tr key={remesa.item} className="hover:bg-orange-50 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{remesa.item}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-blue-600">{remesa.numero}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{remesa.descripcion}</td>
                  <td className="px-4 py-3 text-sm text-right font-medium text-gray-900">{remesa.peso.toLocaleString('es-CO')}</td>
                  <td className="px-4 py-3 text-sm text-right font-medium text-gray-900">{remesa.unidades.toLocaleString('es-CO')}</td>
                  <td className="px-4 py-3 text-sm text-right font-medium text-gray-900">{remesa.volumen.toFixed(2)}</td>
                  <td className="px-4 py-3 text-sm text-right font-semibold text-green-700">${remesa.tarifaCobro.toLocaleString('es-CO')}</td>
                  <td className="px-4 py-3 text-sm text-right font-semibold text-blue-700">${remesa.tarifaTabla.toLocaleString('es-CO')}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-orange-200 border-t-2 border-orange-400 font-bold">
                <td colSpan={3} className="px-4 py-3 text-sm text-gray-900">TOTALES</td>
                <td className="px-4 py-3 text-sm text-right text-gray-900">{pesoTotal.toLocaleString('es-CO')}</td>
                <td className="px-4 py-3 text-sm text-right text-gray-900">{unidadesTotal.toLocaleString('es-CO')}</td>
                <td className="px-4 py-3 text-sm text-right text-gray-900">{volumenTotal.toFixed(2)}</td>
                <td className="px-4 py-3 text-sm text-right text-green-800">${totalCliente.toLocaleString('es-CO')}</td>
                <td className="px-4 py-3 text-sm text-right text-blue-800">${totalPago.toLocaleString('es-CO')}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="mt-4 p-3 bg-orange-100 border border-orange-300 rounded-lg">
          <p className="text-sm text-orange-800">
            <AlertCircle className="w-4 h-4 inline mr-1" />
            <strong>Información cargada automáticamente desde el Manifiesto:</strong> Todas las remesas, pesos, unidades y tarifas se heredan del manifiesto seleccionado.
          </p>
        </div>
      </div>

      {/* 5. Cumplido - Cierre del Viaje */}
      <div className="bg-gradient-to-br from-green-50 to-green-100/30 rounded-xl p-6 border border-green-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FileCheck className="w-5 h-5 text-green-600" />
          Datos del Cumplido - Cierre del Viaje
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Cumplido *
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white">
              <option>Seleccione...</option>
              <option selected>Cumplido Normal</option>
              <option>Cumplido con Novedad</option>
              <option>Cumplido Parcial</option>
              <option>Cumplido con Suspensión</option>
            </select>
          </div>
          <div className="hidden md:block">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Motivo Suspensión (si aplica)
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white">
              <option>N/A</option>
              <option>Fuerza Mayor</option>
              <option>Orden Policial</option>
              <option>Daño Mecánico</option>
              <option>Condiciones Climáticas</option>
              <option>Otro</option>
            </select>
          </div>
          <div className="hidden md:block">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Suspensión (si aplica)
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white">
              <option>N/A</option>
              <option>Temporal</option>
              <option>Permanente</option>
              <option>Por Inspección</option>
            </select>
          </div>
          <div className="hidden md:block"></div>

          {/* Valores Adicionales */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Valor Adicional Cargues
            </label>
            <input
              type="number"
              defaultValue={valorAdicionalCargues}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Valor Adicional Descargues
            </label>
            <input
              type="number"
              defaultValue={valorAdicionalDescargues}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Valor Adicional a Pagar
            </label>
            <input
              type="number"
              defaultValue={valorAdicionalAPagar}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
            />
          </div>
        </div>
      </div>

      {/* 5.5 Información Adicional de Pago */}
      <div className="bg-gradient-to-br from-teal-50 to-teal-100/30 rounded-xl p-6 border border-teal-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-teal-600" />
          Información Adicional de Pago
        </h3>

        {/* Formulario de campos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CUAPL-00 (Referencia)
            </label>
            <input
              type="number"
              step="0.01"
              value={cuapl}
              onChange={(e) => setCuapl(e.target.value)}
              placeholder="Ingrese monto de referencia"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Montos de Compensación
            </label>
            <input
              type="number"
              step="0.01"
              value={compensacion}
              onChange={(e) => setCompensacion(e.target.value)}
              placeholder="Ingrese compensación"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Valor Adicional Categoría
            </label>
            <input
              type="number"
              step="0.01"
              value={valorAdicionalCategoria}
              onChange={(e) => setValorAdicionalCategoria(e.target.value)}
              placeholder="Ingrese valor adicional"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Motivo Pago Adicional
            </label>
            <input
              type="text"
              value={motivoPagoAdicional}
              onChange={(e) => setMotivoPagoAdicional(e.target.value)}
              placeholder="Descripción del motivo"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha Estrategia Descuento
            </label>
            <input
              type="date"
              value={fechaEstrategiaDescuento}
              onChange={(e) => setFechaEstrategiaDescuento(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Compuesto Contable
            </label>
            <input
              type="text"
              value={compuestoContable}
              onChange={(e) => setCompuestoContable(e.target.value)}
              placeholder="Código contable"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Código Complementario
            </label>
            <input
              type="text"
              value={codigoComplementario}
              onChange={(e) => setCodigoComplementario(e.target.value)}
              placeholder="Código complementario"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre Complementario
            </label>
            <input
              type="text"
              value={nombreComplementario}
              onChange={(e) => setNombreComplementario(e.target.value)}
              placeholder="Nombre complementario"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Plazo de Pago (días)
            </label>
            <input
              type="number"
              value={plazoPago}
              onChange={(e) => setPlazoPago(e.target.value)}
              placeholder="Ej: 30 días"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha de Pago
            </label>
            <input
              type="date"
              value={fechaPago}
              onChange={(e) => setFechaPago(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
            />
            <p className="text-xs text-gray-500 mt-1">Formato: DD-MM-YYYY</p>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Comentarios Adicionales
            </label>
            <textarea
              rows={3}
              value={comentarios}
              onChange={(e) => setComentarios(e.target.value)}
              placeholder="Ingrese comentarios adicionales sobre el pago..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none bg-white placeholder-gray-400"
            ></textarea>
          </div>
        </div>

        {/* Tabla de Resumen de Pagos Adicionales */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-teal-100 border-b-2 border-teal-300">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Concepto</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Valor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-teal-200">
              <tr className="hover:bg-teal-50 transition-colors">
                <td className="px-4 py-3 text-sm font-medium text-gray-900">CUAPL-00</td>
                <td className="px-4 py-3 text-sm text-right font-semibold text-gray-900">
                  ${parseFloat(cuapl || "0").toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
              </tr>
              <tr className="hover:bg-teal-50 transition-colors">
                <td className="px-4 py-3 text-sm font-medium text-gray-900">Montos de Compensación</td>
                <td className="px-4 py-3 text-sm text-right font-semibold text-teal-700">
                  ${parseFloat(compensacion || "0").toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
              </tr>
              <tr className="hover:bg-teal-50 transition-colors">
                <td className="px-4 py-3 text-sm font-medium text-gray-900">Valor Adicional Categoría</td>
                <td className="px-4 py-3 text-sm text-right font-semibold text-gray-900">
                  ${parseFloat(valorAdicionalCategoria || "0").toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
              </tr>
              <tr className="hover:bg-teal-50 transition-colors">
                <td className="px-4 py-3 text-sm font-medium text-gray-900">Valor Adicional Descargues</td>
                <td className="px-4 py-3 text-sm text-right font-semibold text-gray-900">
                  ${valorAdicionalDescargues.toLocaleString("es-CO")}
                </td>
              </tr>
              <tr className="hover:bg-teal-50 transition-colors">
                <td className="px-4 py-3 text-sm font-medium text-gray-900">Valor Adicional a Pagar</td>
                <td className="px-4 py-3 text-sm text-right font-semibold text-gray-900">
                  ${valorAdicionalAPagar.toLocaleString("es-CO")}
                </td>
              </tr>
              <tr className="hover:bg-teal-50 transition-colors">
                <td className="px-4 py-3 text-sm font-medium text-gray-900">Motivo</td>
                <td className="px-4 py-3 text-sm text-right text-gray-700 italic">
                  {motivoPagoAdicional || "Sin especificar"}
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="bg-teal-200 border-t-2 border-teal-400 font-bold">
                <td className="px-4 py-3 text-sm text-gray-900">TOTAL PAGOS ADICIONALES</td>
                <td className="px-4 py-3 text-sm text-right text-teal-800">
                  ${(parseFloat(cuapl || "0") + parseFloat(compensacion || "0") + parseFloat(valorAdicionalCategoria || "0") + valorAdicionalDescargues + valorAdicionalAPagar).toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="mt-4 p-3 bg-teal-100 border border-teal-300 rounded-lg">
          <p className="text-sm text-teal-800">
            <AlertCircle className="w-4 h-4 inline mr-1" />
            <strong>Información de Registro:</strong> Los valores adicionales se suman al total de pago del conductor.
            {fechaPago && ` Fecha de pago programada: ${new Date(fechaPago).toLocaleDateString('es-CO')}.`}
            {plazoPago && ` Plazo: ${plazoPago} días.`}
          </p>
        </div>
      </div>

      {/* 6. Totales Calculados Automáticamente */}
      <div className="bg-gradient-to-br from-indigo-50 to-indigo-100/30 rounded-xl p-6 border border-indigo-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-indigo-600" />
          Totales del Cumplido (Calculados Automáticamente)
        </h3>
        
        {/* Grid de Totales */}
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div className="p-4 bg-white rounded-lg border border-indigo-200">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Peso Total
            </label>
            <p className="text-2xl font-bold text-gray-900">
              {pesoTotal.toLocaleString('es-CO')} kg
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-indigo-200">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Total Unidades
            </label>
            <p className="text-2xl font-bold text-gray-900">
              {unidadesTotal.toLocaleString('es-CO')}
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-indigo-200">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Total Cliente (Cobro)
            </label>
            <p className="text-2xl font-bold text-green-700">
              ${totalCliente.toLocaleString('es-CO')}
            </p>
          </div>
          <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg border border-blue-700 shadow-lg">
            <label className="block text-sm font-medium text-blue-100 mb-2">
              Total Pago (Conductor)
            </label>
            <p className="text-2xl font-bold text-white">
              ${totalPago.toLocaleString('es-CO')}
            </p>
          </div>
        </div>

        {/* Desglose Final */}
        <div className="p-4 bg-indigo-100 rounded-lg border border-indigo-300">
          <h4 className="font-semibold text-indigo-900 mb-3 flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Desglose de Pago al Conductor
          </h4>
          <div className="space-y-2 text-sm text-indigo-800">
            <div className="flex justify-between">
              <span>Total tarifa tabla (remesas):</span>
              <span className="font-medium">${totalPago.toLocaleString('es-CO')}</span>
            </div>
            <div className="flex justify-between">
              <span>+ Valor adicional cargues:</span>
              <span className="font-medium text-green-700">+${valorAdicionalCargues.toLocaleString('es-CO')}</span>
            </div>
            <div className="flex justify-between">
              <span>+ Valor adicional descargues:</span>
              <span className="font-medium text-green-700">+${valorAdicionalDescargues.toLocaleString('es-CO')}</span>
            </div>
            <div className="flex justify-between">
              <span>+ Valor adicional a pagar:</span>
              <span className="font-medium text-green-700">+${valorAdicionalAPagar.toLocaleString('es-CO')}</span>
            </div>
            <div className="flex justify-between">
              <span>+ Compensación:</span>
              <span className="font-medium text-teal-700">+${parseFloat(compensacion || "0").toLocaleString('es-CO')}</span>
            </div>
            <div className="flex justify-between">
              <span>+ Valor adicional categoría:</span>
              <span className="font-medium text-teal-700">+${parseFloat(valorAdicionalCategoria || "0").toLocaleString('es-CO')}</span>
            </div>
            <div className="pt-2 border-t-2 border-indigo-400 flex justify-between font-bold text-base">
              <span>Total a pagar al conductor:</span>
              <span className="text-blue-700">${totalPagoFinal.toLocaleString('es-CO')}</span>
            </div>
          </div>
        </div>

        {/* Margen */}
        <div className="mt-4 p-4 bg-green-100 rounded-lg border border-green-300">
          <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Margen de Utilidad
          </h4>
          <div className="flex justify-between items-center">
            <span className="text-sm text-green-800">Total cliente - Total pago:</span>
            <span className="text-2xl font-bold text-green-700">
              ${(totalCliente - totalPagoFinal).toLocaleString('es-CO')}
            </span>
          </div>
        </div>
      </div>

      {/* 7. Observaciones */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100/30 rounded-xl p-6 border border-gray-200 hidden md:block">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-gray-600" />
          Observaciones del Cumplido
        </h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Observaciones
          </label>
          <textarea
            rows={4}
            placeholder="Novedades del viaje, observaciones del conductor, problemas presentados, etc..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent resize-none bg-white"
          ></textarea>
        </div>
      </div>

      {/* Información del Sistema */}
      <div className="bg-gradient-to-br from-slate-50 to-slate-100/30 rounded-xl p-6 border border-slate-200 hidden md:block">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-slate-600" />
          Información del Sistema
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha de Creación
            </label>
            <input
              type="datetime-local"
              defaultValue="2026-03-16T15:30"
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
              Estado del Cumplido
            </label>
            <select
              disabled
              defaultValue="Completado"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
            >
              <option>Pendiente</option>
              <option>Completado</option>
              <option>Cerrado</option>
            </select>
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
        <button className="w-full lg:w-auto px-4 lg:px-6 py-3 lg:py-2.5 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 font-medium order-1 lg:order-3">
          <Send className="w-4 h-4" />
          <span className="hidden lg:inline">Cerrar Cumplido y Finalizar Viaje</span>
          <span className="lg:hidden">Finalizar Viaje</span>
        </button>
      </div>
    </div>
  );
}
