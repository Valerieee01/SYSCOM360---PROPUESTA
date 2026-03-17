import {
  ClipboardList,
  User,
  DollarSign,
  Building2,
  Truck,
  FileText,
  CheckCircle,
  X,
  Save,
  Send,
  CreditCard,
  Wallet,
  AlertCircle,
  Calendar,
} from "lucide-react";
import { useState } from "react";

interface AnticipoFormProps {
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

export default function AnticipoForm({
  selectedDocument,
  isCreating,
  onClose,
}: AnticipoFormProps) {
  const [valorAnticipo, setValorAnticipo] = useState(800000);

  return (
    <div className="p-6 space-y-6">
      {/* Alerta de Automatización */}
      <div className="bg-gradient-to-r from-green-50 to-teal-50 border-l-4 border-green-500 p-4 rounded-lg">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-green-900 mb-1">Anticipo Automatizado - Regla de 3 Clics</h4>
            <p className="text-sm text-green-700">
              Al seleccionar el manifiesto, el sistema carga automáticamente el conductor, vehículo y cuentas bancarias. 
              Solo ingresa el valor del anticipo y guarda. ¡Simple y rápido!
            </p>
          </div>
        </div>
      </div>

      {/* 1. Datos Básicos del Anticipo */}
      <div className="bg-gradient-to-br from-teal-50 to-teal-100/30 rounded-xl p-6 border border-teal-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-teal-600" />
          Datos Básicos del Anticipo
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              No. Anticipo
            </label>
            <input
              type="text"
              defaultValue={selectedDocument.numero || "ANT-2024-034"}
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
              Fecha de Creación
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="datetime-local"
                defaultValue="2026-03-16T15:30"
                disabled
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estado
            </label>
            <select 
              disabled
              defaultValue="Pendiente"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
            >
              <option>Pendiente</option>
              <option>Aprobado</option>
              <option>Pagado</option>
              <option>Rechazado</option>
            </select>
          </div>
        </div>
      </div>

      {/* 2. Información del Manifiesto */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100/30 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          Información del Manifiesto (Heredada)
        </h3>
        
        <div className="grid grid-cols-1 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              No. Manifiesto *
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
              <option>Seleccione manifiesto...</option>
              <option selected>MAN-2024-089 - Cali → Barranquilla (Juan Pérez)</option>
              <option>MAN-2024-088 - Bogotá → Medellín (Carlos Gómez)</option>
              <option>MAN-2024-087 - Cartagena → Bogotá (María López)</option>
            </select>
            <p className="text-xs text-blue-600 mt-1">
              <AlertCircle className="w-3 h-3 inline mr-1" />
              Al seleccionar el manifiesto se cargan automáticamente el vehículo, conductor y cuentas bancarias
            </p>
          </div>
        </div>

        {/* Datos heredados del manifiesto */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1 text-xs">
              Vehículo
            </label>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-blue-600" />
              <p className="text-sm font-semibold text-gray-900">ABC-123 (Tractocamión)</p>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1 text-xs">
              Conductor
            </label>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-blue-600" />
              <p className="text-sm font-semibold text-gray-900">Juan Pérez</p>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1 text-xs">
              Documento Conductor
            </label>
            <p className="text-sm font-semibold text-gray-900">CC 1234567</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1 text-xs">
              Ruta
            </label>
            <p className="text-sm font-semibold text-gray-900">Cali → Barranquilla</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1 text-xs">
              Fecha Manifiesto
            </label>
            <p className="text-sm font-semibold text-gray-900">2024-03-13</p>
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

      {/* 3. Datos del Beneficiario */}
      <div className="bg-gradient-to-br from-purple-50 to-purple-100/30 rounded-xl p-6 border border-purple-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-purple-600" />
          Datos del Beneficiario (Cargados Automáticamente)
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Identificación Beneficiario *
            </label>
            <input
              type="text"
              defaultValue="CC 1234567"
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-purple-50 text-gray-700 font-medium"
            />
            <p className="text-xs text-purple-600 mt-1">Heredado del conductor del manifiesto</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre Beneficiario
            </label>
            <input
              type="text"
              defaultValue="Juan Pérez Martínez"
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-purple-50 text-gray-700 font-medium"
            />
            <p className="text-xs text-purple-600 mt-1">Heredado del conductor del manifiesto</p>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cuenta Bancaria Beneficiario *
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white">
              <option>Seleccione cuenta registrada...</option>
              <option selected>Bancolombia - Ahorros - 123-456789-01 (Juan Pérez)</option>
              <option>Banco de Bogotá - Corriente - 987-654321-09 (Juan Pérez)</option>
              <option>Davivienda - Ahorros - 456-789012-34 (Juan Pérez)</option>
            </select>
            <p className="text-xs text-purple-600 mt-1">
              <CreditCard className="w-3 h-3 inline mr-1" />
              Cuentas bancarias registradas del conductor
            </p>
          </div>
        </div>
      </div>

      {/* 4. Información Financiera */}
      <div className="bg-gradient-to-br from-green-50 to-green-100/30 rounded-xl p-6 border border-green-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-green-600" />
          Información Financiera del Anticipo
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cuenta Bancaria Emisor (Empresa)
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white">
              <option>Seleccione cuenta de la empresa...</option>
              <option selected>Bancolombia - Corriente - 800-999888-77 (SYSCOM 360)</option>
              <option>Banco de Bogotá - Corriente - 600-777666-55 (SYSCOM 360)</option>
              <option>Davivienda - Corriente - 500-444333-22 (SYSCOM 360)</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">Cuenta desde donde se emite el anticipo</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Valor Anticipo (COP) *
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="number"
                value={valorAnticipo}
                onChange={(e) => setValorAnticipo(Number(e.target.value))}
                className="w-full pl-10 pr-3 py-2 border-2 border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-lg font-semibold text-gray-900"
                placeholder="0"
              />
            </div>
            <p className="text-xs text-green-600 mt-1 font-medium">
              Valor total del anticipo a entregar al conductor
            </p>
          </div>
        </div>

        {/* Resumen Visual */}
        <div className="mt-6 p-4 bg-gradient-to-br from-green-100 to-green-200 rounded-lg border-2 border-green-400">
          <h4 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            Resumen del Anticipo
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded-lg">
              <p className="text-xs text-gray-600 mb-1">Beneficiario</p>
              <p className="text-sm font-bold text-gray-900">Juan Pérez</p>
              <p className="text-xs text-gray-500">CC 1234567</p>
            </div>
            <div className="bg-white p-3 rounded-lg">
              <p className="text-xs text-gray-600 mb-1">Manifiesto</p>
              <p className="text-sm font-bold text-gray-900">MAN-2024-089</p>
              <p className="text-xs text-gray-500">Cali → Barranquilla</p>
            </div>
            <div className="bg-white p-3 rounded-lg">
              <p className="text-xs text-gray-600 mb-1">Cuenta Destino</p>
              <p className="text-sm font-bold text-gray-900">Bancolombia - Ahorros</p>
              <p className="text-xs text-gray-500">123-456789-01</p>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-lg">
              <p className="text-xs text-green-100 mb-1">Valor a Transferir</p>
              <p className="text-2xl font-bold text-white">
                ${valorAnticipo.toLocaleString('es-CO')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Observaciones */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100/30 rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-gray-600" />
          Observaciones del Anticipo
        </h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Observaciones
          </label>
          <textarea
            rows={3}
            placeholder="Notas adicionales sobre el anticipo, conceptos específicos, etc..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent resize-none bg-white"
          ></textarea>
        </div>
      </div>

      {/* Información del Sistema */}
      <div className="bg-gradient-to-br from-slate-50 to-slate-100/30 rounded-xl p-6 border border-slate-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-slate-600" />
          Información del Sistema
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Usuario Creación
            </label>
            <input
              type="text"
              defaultValue="admin@syscom360.com"
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Método de Pago
            </label>
            <select 
              defaultValue="Transferencia"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent bg-white"
            >
              <option>Transferencia Bancaria</option>
              <option>Efectivo</option>
              <option>Cheque</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Comprobante de Pago
            </label>
            <input
              type="text"
              placeholder="No. de comprobante (opcional)"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent bg-white"
            />
          </div>
        </div>
      </div>

      {/* Botones de Acción */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
        <button
          onClick={onClose}
          className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
        >
          <X className="w-4 h-4" />
          Cancelar
        </button>
        <button className="px-6 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2">
          <Save className="w-4 h-4" />
          Guardar Borrador
        </button>
        <button className="px-6 py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2">
          <Send className="w-4 h-4" />
          Aprobar y Registrar Anticipo
        </button>
      </div>
    </div>
  );
}
