import {
  X,
  Save,
  Send,
  Calendar,
  User,
  MapPin,
  Building2,
  PackageIcon,
  Truck,
  ClipboardList,
  Copy,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";
import { useFormValidation } from "../../hooks/useFormValidation";
import { ValidationAlert, FieldError, SuccessMessage } from "../../components/ValidationAlert";
import { validatePedido, validateDangerousCargo } from "../../utils";
import type { Pedido, OperationType } from "../../types";

interface PedidoFormProps {
  onClose: () => void;
  onSuccess?: () => void;
}

export default function PedidoForm({ onClose, onSuccess }: PedidoFormProps) {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isDangerousCargo, setIsDangerousCargo] = useState(false);
  const [copyFromRemitente, setCopyFromRemitente] = useState(false);

  const pedidoForm = useFormValidation<Partial<Pedido>>({
    initialValues: {
      numero: `PED-2026-${String(Math.floor(Math.random() * 1000)).padStart(6, '0')}`,
      compania: "SYSCOM S.A.S.",
      tipoOperacion: "" as OperationType,
      tipoServicio: "",
      fecha: new Date(),
      remitenteId: "",
      sedeOrigenId: "",
      destinatarioId: "",
      sedeDestinoId: "",
      propietarioCargaId: "",
      cantidad: 0,
      peso: 0,
      volumen: 0,
      valorDeclarado: 0,
      prioridad: "Media" as "Baja" | "Media" | "Alta" | "Urgente",
      observaciones: "",
      estado: "BORRADOR" as const,
      creadoPor: "current-user",
      fechaCreacion: new Date(),
    },
    validate: (values) => validatePedido(values),
    onSubmit: async (values) => {
      console.log("Guardando pedido...", values);
      setShowSuccessMessage(true);
      setTimeout(() => {
        if (onSuccess) onSuccess();
        onClose();
      }, 2000);
    },
  });

  const handleCopyFromRemitente = () => {
    setCopyFromRemitente(!copyFromRemitente);
    if (!copyFromRemitente) {
      pedidoForm.setFieldValue("propietarioCargaId", pedidoForm.values.remitenteId);
    }
  };

  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-sm z-50 lg:flex lg:items-center lg:justify-center lg:p-4">
      <div className="bg-white lg:rounded-xl shadow-xl lg:max-w-4xl w-full h-full lg:h-auto lg:max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[#40A095] to-[#99D6CF] lg:bg-white lg:border-b border-gray-200 px-4 lg:px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-xl lg:text-2xl font-bold text-white lg:text-gray-900">
            Nuevo Pedido de Transporte
          </h2>
          <button
            onClick={onClose}
            className="text-white lg:text-gray-400 hover:text-white/80 lg:hover:text-gray-600 p-2 rounded-lg hover:bg-white/10 lg:hover:bg-gray-100 active:scale-95 transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
          {/* Success Message */}
          {showSuccessMessage && (
            <SuccessMessage
              message="Pedido guardado exitosamente"
              onClose={() => setShowSuccessMessage(false)}
            />
          )}

          {/* Validation Alert */}
          {pedidoForm.hasErrors && (
            <ValidationAlert
              type="error"
              title="Campos obligatorios incompletos"
              message="Por favor complete todos los campos marcados con asterisco (*) antes de guardar."
              errors={pedidoForm.errors}
              onClose={() => pedidoForm.resetForm()}
            />
          )}

          {/* 1. Datos Básicos del Pedido */}
          <div className="bg-gradient-to-br from-[#40A095]/5 to-[#99D6CF]/5 rounded-xl p-4 lg:p-6 border border-[#99D6CF]/20">
            <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-3 lg:mb-4 flex items-center gap-2">
              <ClipboardList className="w-4 lg:w-5 h-4 lg:h-5 text-[#40A095]" />
              Datos Básicos del Pedido
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Número de Pedido
                </label>
                <input
                  type="text"
                  value={pedidoForm.values.numero}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Compañía *
                </label>
                <input
                  type="text"
                  value={pedidoForm.values.compania}
                  onChange={(e) => pedidoForm.handleChange("compania", e.target.value)}
                  onBlur={() => pedidoForm.handleBlur("compania")}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#40A095] focus:border-transparent ${
                    pedidoForm.errors.compania ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                />
                <FieldError error={pedidoForm.errors.compania} show={pedidoForm.touched.compania} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Operación *
                </label>
                <select
                  value={pedidoForm.values.tipoOperacion}
                  onChange={(e) => pedidoForm.handleChange("tipoOperacion", e.target.value as OperationType)}
                  onBlur={() => pedidoForm.handleBlur("tipoOperacion")}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#40A095] focus:border-transparent ${
                    pedidoForm.errors.tipoOperacion ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                >
                  <option value="">Seleccione...</option>
                  <option value="GENERAL">General</option>
                  <option value="MCIACONSOL">Mercancía Consolidada</option>
                  <option value="CONTENEDOR">Contenedor</option>
                  <option value="CONT_VACIO">Contenedor Vacío</option>
                </select>
                <FieldError error={pedidoForm.errors.tipoOperacion} show={pedidoForm.touched.tipoOperacion} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Servicio *
                </label>
                <select
                  value={pedidoForm.values.tipoServicio}
                  onChange={(e) => pedidoForm.handleChange("tipoServicio", e.target.value)}
                  onBlur={() => pedidoForm.handleBlur("tipoServicio")}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#40A095] focus:border-transparent ${
                    pedidoForm.errors.tipoServicio ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                >
                  <option value="">Seleccione...</option>
                  <option>Carga completa</option>
                  <option>Carga parcial</option>
                  <option>Express</option>
                </select>
                <FieldError error={pedidoForm.errors.tipoServicio} show={pedidoForm.touched.tipoServicio} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha del Pedido *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    value={pedidoForm.values.fecha ? new Date(pedidoForm.values.fecha).toISOString().split('T')[0] : ''}
                    onChange={(e) => pedidoForm.handleChange("fecha", new Date(e.target.value))}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#40A095] focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prioridad *
                </label>
                <select
                  value={pedidoForm.values.prioridad}
                  onChange={(e) => pedidoForm.handleChange("prioridad", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#40A095] focus:border-transparent"
                >
                  <option value="Baja">Baja</option>
                  <option value="Media">Media</option>
                  <option value="Alta">Alta</option>
                  <option value="Urgente">Urgente</option>
                </select>
              </div>
            </div>
          </div>

          {/* 2. Información del Remitente */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100/30 rounded-xl p-4 lg:p-6 border border-blue-200">
            <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-3 lg:mb-4 flex items-center gap-2">
              <User className="w-4 lg:w-5 h-4 lg:h-5 text-blue-600" />
              Información del Remitente
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Remitente / Razón Social *
                </label>
                <select
                  value={pedidoForm.values.remitenteId}
                  onChange={(e) => pedidoForm.handleChange("remitenteId", e.target.value)}
                  onBlur={() => pedidoForm.handleBlur("remitenteId")}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    pedidoForm.errors.remitenteId ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                >
                  <option value="">Seleccione remitente...</option>
                  <option value="TER-001">ACME Corporation - 900123456</option>
                  <option value="TER-002">TechCo S.A. - 800234567</option>
                  <option value="TER-003">Global Logistics Ltd - 700345678</option>
                </select>
                <FieldError error={pedidoForm.errors.remitenteId} show={pedidoForm.touched.remitenteId} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sede Origen *
                </label>
                <select
                  value={pedidoForm.values.sedeOrigenId}
                  onChange={(e) => pedidoForm.handleChange("sedeOrigenId", e.target.value)}
                  onBlur={() => pedidoForm.handleBlur("sedeOrigenId")}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    pedidoForm.errors.sedeOrigenId ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                >
                  <option value="">Seleccione sede...</option>
                  <option value="SEDE-001">Sede Principal - Bogotá</option>
                  <option value="SEDE-002">Bodega Norte - Medellín</option>
                  <option value="SEDE-003">Almacén Sur - Cali</option>
                </select>
                <FieldError error={pedidoForm.errors.sedeOrigenId} show={pedidoForm.touched.sedeOrigenId} />
              </div>
            </div>
          </div>

          {/* 3. Información del Destinatario */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100/30 rounded-xl p-4 lg:p-6 border border-purple-200">
            <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-3 lg:mb-4 flex items-center gap-2">
              <MapPin className="w-4 lg:w-5 h-4 lg:h-5 text-purple-600" />
              Información del Destinatario
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destinatario / Razón Social *
                </label>
                <select
                  value={pedidoForm.values.destinatarioId}
                  onChange={(e) => pedidoForm.handleChange("destinatarioId", e.target.value)}
                  onBlur={() => pedidoForm.handleBlur("destinatarioId")}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    pedidoForm.errors.destinatarioId ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                >
                  <option value="">Seleccione destinatario...</option>
                  <option value="TER-004">Distribuidora XYZ - 900987654</option>
                  <option value="TER-005">Almacenes ABC - 800876543</option>
                  <option value="TER-006">Super Mercados 123 - 700765432</option>
                </select>
                <FieldError error={pedidoForm.errors.destinatarioId} show={pedidoForm.touched.destinatarioId} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sede Destino *
                </label>
                <select
                  value={pedidoForm.values.sedeDestinoId}
                  onChange={(e) => pedidoForm.handleChange("sedeDestinoId", e.target.value)}
                  onBlur={() => pedidoForm.handleBlur("sedeDestinoId")}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    pedidoForm.errors.sedeDestinoId ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                >
                  <option value="">Seleccione sede...</option>
                  <option value="SEDE-004">Centro Distribución - Barranquilla</option>
                  <option value="SEDE-005">Sucursal Caribe - Cartagena</option>
                  <option value="SEDE-006">Almacén Norte - Santa Marta</option>
                </select>
                <FieldError error={pedidoForm.errors.sedeDestinoId} show={pedidoForm.touched.sedeDestinoId} />
              </div>
            </div>
          </div>

          {/* 4. Propietario de la Carga */}
          <div className="bg-gradient-to-br from-green-50 to-green-100/30 rounded-xl p-4 lg:p-6 border border-green-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base lg:text-lg font-bold text-gray-900 flex items-center gap-2">
                <Building2 className="w-4 lg:w-5 h-4 lg:h-5 text-green-600" />
                Propietario de la Carga
              </h3>
              <button
                onClick={handleCopyFromRemitente}
                className="flex items-center gap-2 px-3 py-1.5 bg-white border border-green-300 text-green-700 rounded-lg hover:bg-green-50 transition-colors text-sm"
              >
                <Copy className="w-4 h-4" />
                Copiar del Remitente
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Propietario de la Carga *
                </label>
                <select
                  value={pedidoForm.values.propietarioCargaId}
                  onChange={(e) => pedidoForm.handleChange("propietarioCargaId", e.target.value)}
                  onBlur={() => pedidoForm.handleBlur("propietarioCargaId")}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    pedidoForm.errors.propietarioCargaId ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                >
                  <option value="">Seleccione propietario...</option>
                  <option value="TER-001">ACME Corporation - 900123456</option>
                  <option value="TER-002">TechCo S.A. - 800234567</option>
                  <option value="TER-003">Global Logistics Ltd - 700345678</option>
                </select>
                <FieldError error={pedidoForm.errors.propietarioCargaId} show={pedidoForm.touched.propietarioCargaId} />
              </div>
            </div>
          </div>

          {/* 5. Detalle Logístico */}
          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100/30 rounded-xl p-4 lg:p-6 border border-indigo-200">
            <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-3 lg:mb-4 flex items-center gap-2">
              <Truck className="w-4 lg:w-5 h-4 lg:h-5 text-indigo-600" />
              Detalle Logístico
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cantidad *
                </label>
                <input
                  type="number"
                  value={pedidoForm.values.cantidad}
                  onChange={(e) => pedidoForm.handleChange("cantidad", parseInt(e.target.value))}
                  onBlur={() => pedidoForm.handleBlur("cantidad")}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                    pedidoForm.errors.cantidad ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                />
                <FieldError error={pedidoForm.errors.cantidad} show={pedidoForm.touched.cantidad} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Peso (kg) *
                </label>
                <input
                  type="number"
                  value={pedidoForm.values.peso}
                  onChange={(e) => pedidoForm.handleChange("peso", parseFloat(e.target.value))}
                  onBlur={() => pedidoForm.handleBlur("peso")}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                    pedidoForm.errors.peso ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                />
                <FieldError error={pedidoForm.errors.peso} show={pedidoForm.touched.peso} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Volumen (m³)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={pedidoForm.values.volumen}
                  onChange={(e) => pedidoForm.handleChange("volumen", parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* 6. Observaciones */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100/30 rounded-xl p-4 lg:p-6 border border-gray-200">
            <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-3 lg:mb-4 flex items-center gap-2">
              <AlertCircle className="w-4 lg:w-5 h-4 lg:h-5 text-gray-600" />
              Observaciones
            </h3>
            <textarea
              rows={4}
              value={pedidoForm.values.observaciones}
              onChange={(e) => pedidoForm.handleChange("observaciones", e.target.value)}
              placeholder="Instrucciones especiales, requerimientos de manejo, etc..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Actions */}
          <div className="sticky bottom-0 left-0 right-0 bg-white lg:bg-transparent flex flex-col lg:flex-row items-stretch lg:items-center justify-end gap-2 lg:gap-3 p-4 lg:p-0 lg:pt-4 border-t border-gray-200 -mx-4 lg:mx-0 -mb-4 lg:mb-0 shadow-lg lg:shadow-none">
            <button
              onClick={onClose}
              type="button"
              disabled={pedidoForm.isSubmitting}
              className="w-full lg:w-auto px-4 lg:px-6 py-3 lg:py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 active:scale-95 transition-all flex items-center justify-center gap-2 font-medium order-3 lg:order-1 disabled:opacity-50"
            >
              <X className="w-4 h-4" />
              <span>Cancelar</span>
            </button>
            <button
              onClick={() => pedidoForm.handleSubmit()}
              type="button"
              disabled={pedidoForm.isSubmitting}
              className="w-full lg:w-auto px-4 lg:px-6 py-3 lg:py-2.5 bg-gradient-to-r from-[#40A095] to-[#99D6CF] text-white rounded-lg hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 font-medium order-1 lg:order-2 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span className="hidden lg:inline">
                {pedidoForm.isSubmitting ? "Guardando..." : "Guardar Pedido"}
              </span>
              <span className="lg:hidden">
                {pedidoForm.isSubmitting ? "Guardando..." : "Guardar"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
