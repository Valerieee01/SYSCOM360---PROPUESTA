import { useState } from "react";
import {
  X,
  Search,
  Save,
  AlertCircle,
  MapPin,
  Truck,
  User,
  Calendar,
  ClipboardList,
  FileText,
  LogIn,
  LogOut,
} from "lucide-react";
import {
  PUESTOS_CONTROL,
  MOTIVOS_AJUSTE,
  MANIFIESTOS_MOCK,
  formatDateTime,
  type ManifiestoResumen,
} from "./ajustesMonitoreoData";

// Datos que el formulario entrega al guardar; el listado agrega
// numeroRegistro, usuario y fecha, y aplica el cambio real al monitoreo.
export interface AjustePayload {
  manifiestoNumero: string;
  puestoId: string;
  puestoControl: string; // etiqueta legible
  motivoAjuste: string;
  llegadaAnteriorRaw: string;
  llegadaNuevaRaw: string;
  salidaAnteriorRaw: string;
  salidaNuevaRaw: string;
  llegadaAnterior: string; // formateado
  llegadaNueva: string;
  salidaAnterior: string;
  salidaNueva: string;
  observaciones: string;
}

interface AjusteMonitoreoFormProps {
  manifiestos?: ManifiestoResumen[];
  numeroRegistro: number;
  usuario: string;
  onClose: () => void;
  onSave: (payload: AjustePayload) => void;
}

export default function AjusteMonitoreoForm({
  manifiestos = MANIFIESTOS_MOCK,
  numeroRegistro,
  usuario,
  onClose,
  onSave,
}: AjusteMonitoreoFormProps) {
  const [manifiestoInput, setManifiestoInput] = useState("");
  const [selected, setSelected] = useState<ManifiestoResumen | null>(null);
  const [searchError, setSearchError] = useState("");

  const [puestoId, setPuestoId] = useState("");
  const [motivo, setMotivo] = useState("");
  const [llegadaNueva, setLlegadaNueva] = useState("");
  const [salidaNueva, setSalidaNueva] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [formError, setFormError] = useState("");

  const fechaSistema = new Date();
  const monitoreoActual =
    selected && puestoId ? selected.monitoreo[puestoId] : undefined;
  const llegadaAnterior = monitoreoActual?.llegada ?? "";
  const salidaAnterior = monitoreoActual?.salida ?? "";

  const handleBuscar = () => {
    const termino = manifiestoInput.trim().toLowerCase();
    if (!termino) {
      setSearchError("Ingrese el número de manifiesto a buscar.");
      return;
    }
    const encontrado = manifiestos.find((m) => m.numero.toLowerCase() === termino);
    if (!encontrado) {
      setSelected(null);
      setSearchError(
        `No se encontró el manifiesto "${manifiestoInput.trim()}". Verifique el número (incluye consecutivo, ej. -01).`
      );
      return;
    }
    setSearchError("");
    setSelected(encontrado);
    setPuestoId("");
    setMotivo("");
    setLlegadaNueva("");
    setSalidaNueva("");
    setFormError("");
  };

  const handlePuesto = (id: string) => {
    setPuestoId(id);
    setFormError("");
    // Precargar llegada/salida actuales si ya existe monitoreo en ese puesto
    const prev = selected?.monitoreo[id];
    setLlegadaNueva(prev?.llegada ?? "");
    setSalidaNueva(prev?.salida ?? "");
  };

  const handleGuardar = () => {
    if (!selected) {
      setFormError("Primero busque y seleccione un manifiesto válido.");
      return;
    }
    if (!puestoId) {
      setFormError("Seleccione el puesto de control.");
      return;
    }
    if (!motivo) {
      setFormError("Seleccione el motivo del ajuste.");
      return;
    }
    const cambioLlegada = llegadaNueva !== llegadaAnterior;
    const cambioSalida = salidaNueva !== salidaAnterior;
    if (!cambioLlegada && !cambioSalida) {
      setFormError("Debe modificar al menos la fecha/hora de llegada o de salida.");
      return;
    }
    if (
      llegadaNueva &&
      salidaNueva &&
      new Date(salidaNueva).getTime() <= new Date(llegadaNueva).getTime()
    ) {
      setFormError("La fecha/hora de salida debe ser posterior a la de llegada.");
      return;
    }

    const puesto = PUESTOS_CONTROL.find((p) => p.id === puestoId);
    onSave({
      manifiestoNumero: selected.numero,
      puestoId,
      puestoControl: puesto?.label ?? puestoId,
      motivoAjuste: motivo,
      llegadaAnteriorRaw: llegadaAnterior,
      llegadaNuevaRaw: llegadaNueva,
      salidaAnteriorRaw: salidaAnterior,
      salidaNuevaRaw: salidaNueva,
      llegadaAnterior: formatDateTime(llegadaAnterior),
      llegadaNueva: formatDateTime(llegadaNueva),
      salidaAnterior: formatDateTime(salidaAnterior),
      salidaNueva: formatDateTime(salidaNueva),
      observaciones: observaciones.trim(),
    });
  };

  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-sm z-50 lg:flex lg:items-center lg:justify-center lg:p-4">
      <div className="bg-white lg:rounded-xl shadow-xl lg:max-w-3xl w-full h-full lg:h-auto lg:max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[#40A095] to-[#99D6CF] lg:bg-white lg:border-b border-gray-200 px-4 lg:px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2 min-w-0">
            <ClipboardList className="w-5 h-5 lg:w-6 lg:h-6 text-white lg:text-[#40A095] flex-shrink-0" />
            <h2 className="text-lg lg:text-2xl font-bold text-white lg:text-gray-900 truncate">
              Nuevo Ajuste de Monitoreo
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-white lg:text-gray-400 hover:text-white/80 lg:hover:text-gray-600 p-2 rounded-lg hover:bg-white/10 lg:hover:bg-gray-100 active:scale-95 transition-all flex-shrink-0"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
          {/* Error de formulario */}
          {formError && (
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800 font-medium">{formError}</p>
            </div>
          )}

          {/* 1. Búsqueda de manifiesto */}
          <div className="bg-gradient-to-br from-[#40A095]/5 to-[#99D6CF]/5 rounded-xl p-4 lg:p-6 border border-[#99D6CF]/20">
            <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-3 lg:mb-4 flex items-center gap-2">
              <Search className="w-4 lg:w-5 h-4 lg:h-5 text-[#40A095]" />
              Buscar Manifiesto
            </h3>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Número de Manifiesto *
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  list="manifiestos-disponibles"
                  value={manifiestoInput}
                  onChange={(e) => setManifiestoInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleBuscar()}
                  placeholder="Ej: MAN-2026-0089-01"
                  className={`w-full pl-9 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#40A095] focus:border-transparent ${
                    searchError ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                />
                <datalist id="manifiestos-disponibles">
                  {manifiestos.map((m) => (
                    <option key={m.numero} value={m.numero} />
                  ))}
                </datalist>
              </div>
              <button
                onClick={handleBuscar}
                className="px-4 py-2 bg-gradient-to-r from-[#40A095] to-[#99D6CF] text-white rounded-lg hover:shadow-lg active:scale-95 transition-all font-medium flex items-center gap-2 flex-shrink-0"
              >
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline">Buscar</span>
              </button>
            </div>
            {searchError && (
              <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {searchError}
              </p>
            )}
          </div>

          {/* 2. Tarjeta de resumen (solo lectura) */}
          {selected && (
            <div className="bg-white rounded-xl p-4 lg:p-6 border-2 border-[#40A095]/20 shadow-sm">
              <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-3 lg:mb-4 flex items-center gap-2">
                <FileText className="w-4 lg:w-5 h-4 lg:h-5 text-[#40A095]" />
                Resumen del Manifiesto
                <span className="ml-auto text-xs font-semibold text-[#40A095] bg-[#40A095]/10 px-2.5 py-1 rounded-full">
                  {selected.numero}
                </span>
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[10px] lg:text-xs text-gray-500">Ruta</p>
                    <p className="text-xs lg:text-sm font-medium text-gray-900 truncate">
                      {selected.origen} → {selected.destino}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Truck className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[10px] lg:text-xs text-gray-500">Placa</p>
                    <p className="text-xs lg:text-sm font-semibold text-gray-900 truncate">
                      {selected.placa}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <User className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[10px] lg:text-xs text-gray-500">Conductor</p>
                    <p className="text-xs lg:text-sm font-medium text-gray-900 truncate">
                      {selected.conductor}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2 col-span-2 lg:col-span-3">
                  <Truck className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[10px] lg:text-xs text-gray-500">Transportador</p>
                    <p className="text-xs lg:text-sm font-medium text-gray-900 truncate">
                      {selected.transportador}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. Datos del ajuste */}
          {selected && (
            <div className="bg-gradient-to-br from-orange-50 to-orange-100/30 rounded-xl p-4 lg:p-6 border border-orange-200">
              <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-3 lg:mb-4 flex items-center gap-2">
                <AlertCircle className="w-4 lg:w-5 h-4 lg:h-5 text-orange-600" />
                Datos del Ajuste
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Puesto de Control *
                  </label>
                  <select
                    value={puestoId}
                    onChange={(e) => handlePuesto(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
                  >
                    <option value="">Seleccione...</option>
                    {PUESTOS_CONTROL.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                  {puestoId && !monitoreoActual && (
                    <p className="mt-1 text-xs text-gray-500">
                      Sin monitoreo previo en este puesto: registrará los valores nuevos.
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Motivo de Ajuste *
                  </label>
                  <select
                    value={motivo}
                    onChange={(e) => setMotivo(e.target.value)}
                    disabled={!puestoId}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white disabled:bg-gray-50 disabled:text-gray-400"
                  >
                    <option value="">
                      {puestoId ? "Seleccione motivo..." : "Seleccione primero el puesto"}
                    </option>
                    {MOTIVOS_AJUSTE.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Llegada y salida (ambas editables) */}
              {puestoId && (
                <div className="mt-3 lg:mt-4 grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
                  {/* Llegada */}
                  <div className="bg-white rounded-lg p-3 lg:p-4 border border-orange-200">
                    <div className="flex items-center gap-2 mb-2">
                      <LogIn className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-gray-700">
                        Fecha/Hora de Llegada
                      </span>
                    </div>
                    <p className="text-[10px] uppercase tracking-wide text-gray-400 mb-1">
                      Actual:{" "}
                      <span className="text-gray-500 font-medium">
                        {formatDateTime(llegadaAnterior) || "Sin registro"}
                      </span>
                    </p>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="datetime-local"
                        value={llegadaNueva}
                        onChange={(e) => setLlegadaNueva(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 border-2 border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-orange-50/40"
                      />
                    </div>
                  </div>
                  {/* Salida */}
                  <div className="bg-white rounded-lg p-3 lg:p-4 border border-orange-200">
                    <div className="flex items-center gap-2 mb-2">
                      <LogOut className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-gray-700">
                        Fecha/Hora de Salida
                      </span>
                    </div>
                    <p className="text-[10px] uppercase tracking-wide text-gray-400 mb-1">
                      Actual:{" "}
                      <span className="text-gray-500 font-medium">
                        {formatDateTime(salidaAnterior) || "Sin registro"}
                      </span>
                    </p>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="datetime-local"
                        value={salidaNueva}
                        onChange={(e) => setSalidaNueva(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 border-2 border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-orange-50/40"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Observaciones */}
              <div className="mt-3 lg:mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Observaciones
                </label>
                <textarea
                  rows={3}
                  value={observaciones}
                  onChange={(e) => setObservaciones(e.target.value)}
                  placeholder="Detalle adicional del ajuste (opcional)..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none bg-white"
                />
              </div>
            </div>
          )}

          {/* 4. Metadatos automáticos */}
          {selected && (
            <div className="bg-gray-50 rounded-xl p-3 lg:p-4 border border-gray-200">
              <p className="text-[10px] lg:text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Registro automático
              </p>
              <div className="grid grid-cols-3 gap-2 lg:gap-4">
                <div>
                  <p className="text-[10px] lg:text-xs text-gray-500">No. Registro</p>
                  <p className="text-xs lg:text-sm font-bold text-gray-900">#{numeroRegistro}</p>
                </div>
                <div>
                  <p className="text-[10px] lg:text-xs text-gray-500">Fecha</p>
                  <p className="text-xs lg:text-sm font-medium text-gray-900">
                    {fechaSistema.toLocaleDateString("es-CO")}
                  </p>
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] lg:text-xs text-gray-500">Usuario</p>
                  <p className="text-xs lg:text-sm font-medium text-gray-900 truncate">{usuario}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer de acciones */}
        <div className="sticky bottom-0 left-0 right-0 bg-white flex flex-col lg:flex-row items-stretch lg:items-center justify-end gap-2 lg:gap-3 p-4 lg:px-6 border-t border-gray-200 shadow-lg lg:shadow-none">
          <button
            onClick={onClose}
            className="w-full lg:w-auto px-4 lg:px-6 py-3 lg:py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 active:scale-95 transition-all flex items-center justify-center gap-2 font-medium order-2 lg:order-1"
          >
            <X className="w-4 h-4" />
            <span>Cancelar</span>
          </button>
          <button
            onClick={handleGuardar}
            disabled={!selected}
            className="w-full lg:w-auto px-4 lg:px-6 py-3 lg:py-2.5 bg-gradient-to-r from-[#40A095] to-[#99D6CF] text-white rounded-lg hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 font-medium order-1 lg:order-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
          >
            <Save className="w-4 h-4" />
            <span>Guardar Ajuste</span>
          </button>
        </div>
      </div>
    </div>
  );
}
