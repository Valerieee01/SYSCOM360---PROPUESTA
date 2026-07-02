import { useState } from "react";
import {
  X,
  Search,
  Save,
  AlertCircle,
  User,
  Building2,
  MapPin,
  ArrowRight,
  Hash,
  Calendar,
  ClipboardList,
  Truck,
  FileText,
} from "lucide-react";
import {
  TIPOS_CAMBIO,
  CIUDADES,
  REMESAS_MOCK,
  formatValorCampo,
  type RemesaResumen,
} from "./correccionesRemesaData";

// Datos que el formulario entrega al guardar; el listado agrega
// numeroRegistro, usuario y fecha, y aplica el cambio real a la remesa.
export interface CorreccionPayload {
  remesaNumero: string;
  item: number;
  tipoCambio: string; // etiqueta legible
  campoAfectado: string;
  motivoCambio: string;
  valorAnteriorRaw: string;
  valorNuevoRaw: string;
  valorAnterior: string; // formateado para mostrar
  valorNuevo: string; // formateado para mostrar
  observaciones: string;
}

interface CorreccionRemesaFormProps {
  remesas?: RemesaResumen[];
  numeroRegistro: number;
  usuario: string;
  onClose: () => void;
  onSave: (payload: CorreccionPayload) => void;
}

export default function CorreccionRemesaForm({
  remesas = REMESAS_MOCK,
  numeroRegistro,
  usuario,
  onClose,
  onSave,
}: CorreccionRemesaFormProps) {
  const [remesaInput, setRemesaInput] = useState("");
  const [selectedRemesa, setSelectedRemesa] = useState<RemesaResumen | null>(null);
  const [searchError, setSearchError] = useState("");

  const [item, setItem] = useState(1);
  const [tipoCambio, setTipoCambio] = useState("");
  const [motivo, setMotivo] = useState("");
  const [valorNuevo, setValorNuevo] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [formError, setFormError] = useState("");

  const fechaSistema = new Date();
  const tipoConfig = TIPOS_CAMBIO.find((t) => t.value === tipoCambio) || null;
  const valorActual = selectedRemesa && tipoConfig
    ? String(selectedRemesa[tipoConfig.campo] ?? "")
    : "";

  const handleBuscar = () => {
    const termino = remesaInput.trim().toLowerCase();
    if (!termino) {
      setSearchError("Ingrese el número de remesa a buscar.");
      return;
    }
    const encontrada = remesas.find(
      (r) => r.numero.toLowerCase() === termino
    );
    if (!encontrada) {
      setSelectedRemesa(null);
      setSearchError(
        `No se encontró la remesa "${remesaInput.trim()}". Verifique el número e intente de nuevo.`
      );
      return;
    }
    setSearchError("");
    setSelectedRemesa(encontrada);
    setItem(1);
    // Reiniciar la novedad al cambiar de remesa
    setTipoCambio("");
    setMotivo("");
    setValorNuevo("");
    setFormError("");
  };

  const handleTipoCambio = (value: string) => {
    setTipoCambio(value);
    setMotivo("");
    setFormError("");
    const cfg = TIPOS_CAMBIO.find((t) => t.value === value);
    // Precargar el valor actual para resaltar el reemplazo
    if (cfg && selectedRemesa) {
      setValorNuevo(String(selectedRemesa[cfg.campo] ?? ""));
    } else {
      setValorNuevo("");
    }
  };

  const handleGuardar = () => {
    if (!selectedRemesa) {
      setFormError("Primero busque y seleccione una remesa válida.");
      return;
    }
    if (!tipoConfig) {
      setFormError("Seleccione el tipo de cambio a registrar.");
      return;
    }
    if (!valorNuevo.trim()) {
      setFormError("Ingrese el nuevo valor para el campo a corregir.");
      return;
    }
    if (valorNuevo.trim() === valorActual.trim()) {
      setFormError(
        "El nuevo valor debe ser diferente al valor actual. No se registran correcciones sin cambios."
      );
      return;
    }

    onSave({
      remesaNumero: selectedRemesa.numero,
      item,
      tipoCambio: tipoConfig.label,
      campoAfectado: String(tipoConfig.campo),
      motivoCambio: motivo || "No aplica",
      valorAnteriorRaw: valorActual,
      valorNuevoRaw: valorNuevo.trim(),
      valorAnterior: formatValorCampo(tipoConfig.tipo, valorActual),
      valorNuevo: formatValorCampo(tipoConfig.tipo, valorNuevo.trim()),
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
              Nueva Corrección de Remesa
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

          {/* 1. Búsqueda de remesa */}
          <div className="bg-gradient-to-br from-[#40A095]/5 to-[#99D6CF]/5 rounded-xl p-4 lg:p-6 border border-[#99D6CF]/20">
            <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-3 lg:mb-4 flex items-center gap-2">
              <Search className="w-4 lg:w-5 h-4 lg:h-5 text-[#40A095]" />
              Buscar Remesa
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-4">
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Número de Remesa *
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      list="remesas-disponibles"
                      value={remesaInput}
                      onChange={(e) => setRemesaInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleBuscar()}
                      placeholder="Ej: REM-2026-0125"
                      className={`w-full pl-9 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#40A095] focus:border-transparent ${
                        searchError ? "border-red-500 bg-red-50" : "border-gray-300"
                      }`}
                    />
                    <datalist id="remesas-disponibles">
                      {remesas.map((r) => (
                        <option key={r.numero} value={r.numero} />
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Item
                </label>
                {selectedRemesa && selectedRemesa.items > 1 ? (
                  <select
                    value={item}
                    onChange={(e) => setItem(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#40A095] focus:border-transparent bg-white"
                  >
                    {Array.from({ length: selectedRemesa.items }, (_, i) => i + 1).map(
                      (n) => (
                        <option key={n} value={n}>
                          Item {n}
                        </option>
                      )
                    )}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={selectedRemesa ? `Item ${item}` : ""}
                    disabled
                    placeholder="—"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                  />
                )}
              </div>
            </div>
          </div>

          {/* 2. Tarjeta de resumen (solo lectura) */}
          {selectedRemesa && (
            <div className="bg-white rounded-xl p-4 lg:p-6 border-2 border-[#40A095]/20 shadow-sm">
              <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-3 lg:mb-4 flex items-center gap-2">
                <FileText className="w-4 lg:w-5 h-4 lg:h-5 text-[#40A095]" />
                Resumen de la Remesa
                <span className="ml-auto text-xs font-semibold text-[#40A095] bg-[#40A095]/10 px-2.5 py-1 rounded-full">
                  {selectedRemesa.numero}
                </span>
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
                <div className="flex items-start gap-2">
                  <Building2 className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[10px] lg:text-xs text-gray-500">Cliente</p>
                    <p className="text-xs lg:text-sm font-medium text-gray-900 truncate">
                      {selectedRemesa.cliente}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Hash className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[10px] lg:text-xs text-gray-500">NIT</p>
                    <p className="text-xs lg:text-sm font-medium text-gray-900 truncate">
                      {selectedRemesa.nit}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Truck className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[10px] lg:text-xs text-gray-500">No. Manifiesto</p>
                    <p className="text-xs lg:text-sm font-semibold text-[#40A095] truncate">
                      {selectedRemesa.manifiesto}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <User className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[10px] lg:text-xs text-gray-500">Remitente</p>
                    <p className="text-xs lg:text-sm font-medium text-gray-900 truncate">
                      {selectedRemesa.remitente}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <User className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[10px] lg:text-xs text-gray-500">Destinatario</p>
                    <p className="text-xs lg:text-sm font-medium text-gray-900 truncate">
                      {selectedRemesa.destinatario}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[10px] lg:text-xs text-gray-500">Ruta</p>
                    <p className="text-xs lg:text-sm font-medium text-gray-900 truncate">
                      {selectedRemesa.origen} → {selectedRemesa.destino}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. Datos de la novedad */}
          {selectedRemesa && (
            <div className="bg-gradient-to-br from-orange-50 to-orange-100/30 rounded-xl p-4 lg:p-6 border border-orange-200">
              <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-3 lg:mb-4 flex items-center gap-2">
                <AlertCircle className="w-4 lg:w-5 h-4 lg:h-5 text-orange-600" />
                Datos de la Novedad
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Cambio *
                  </label>
                  <select
                    value={tipoCambio}
                    onChange={(e) => handleTipoCambio(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
                  >
                    <option value="">Seleccione...</option>
                    {TIPOS_CAMBIO.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Motivo del Cambio
                  </label>
                  <select
                    value={motivo}
                    onChange={(e) => setMotivo(e.target.value)}
                    disabled={!tipoConfig}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white disabled:bg-gray-50 disabled:text-gray-400"
                  >
                    <option value="">
                      {tipoConfig ? "Seleccione motivo..." : "Seleccione primero el tipo"}
                    </option>
                    {tipoConfig?.motivos.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Campo dinámico a corregir: valor actual → valor nuevo */}
              {tipoConfig && (
                <div className="mt-3 lg:mt-4 bg-white rounded-lg p-3 lg:p-4 border border-orange-200">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Campo a corregir: <span className="text-orange-700">{tipoConfig.label}</span>
                  </label>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    {/* Valor actual (se está reemplazando) */}
                    <div className="flex-1">
                      <p className="text-[10px] uppercase tracking-wide text-gray-400 mb-1">
                        Valor actual
                      </p>
                      <div className="px-3 py-2 rounded-lg bg-gray-100 border border-gray-200 text-sm text-gray-500 line-through">
                        {formatValorCampo(tipoConfig.tipo, valorActual) || "—"}
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-orange-500 mx-auto sm:mt-5 flex-shrink-0 rotate-90 sm:rotate-0" />
                    {/* Valor nuevo (resaltado) */}
                    <div className="flex-1">
                      <p className="text-[10px] uppercase tracking-wide text-orange-600 mb-1 font-semibold">
                        Nuevo valor
                      </p>
                      {tipoConfig.tipo === "datetime" ? (
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="datetime-local"
                            value={valorNuevo}
                            onChange={(e) => setValorNuevo(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 border-2 border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-orange-50/40"
                          />
                        </div>
                      ) : tipoConfig.tipo === "ciudad" ? (
                        <select
                          value={valorNuevo}
                          onChange={(e) => setValorNuevo(e.target.value)}
                          className="w-full px-3 py-2 border-2 border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-orange-50/40"
                        >
                          <option value="">Seleccione...</option>
                          {CIUDADES.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type="text"
                          value={valorNuevo}
                          onChange={(e) => setValorNuevo(e.target.value)}
                          placeholder="Ingrese el nuevo valor"
                          className="w-full px-3 py-2 border-2 border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-orange-50/40"
                        />
                      )}
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
                  placeholder="Detalle adicional de la corrección (opcional)..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none bg-white"
                />
              </div>
            </div>
          )}

          {/* 4. Metadatos automáticos */}
          {selectedRemesa && (
            <div className="bg-gray-50 rounded-xl p-3 lg:p-4 border border-gray-200">
              <p className="text-[10px] lg:text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Registro automático
              </p>
              <div className="grid grid-cols-3 gap-2 lg:gap-4">
                <div>
                  <p className="text-[10px] lg:text-xs text-gray-500">No. Registro</p>
                  <p className="text-xs lg:text-sm font-bold text-gray-900">
                    #{numeroRegistro}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] lg:text-xs text-gray-500">Fecha</p>
                  <p className="text-xs lg:text-sm font-medium text-gray-900">
                    {fechaSistema.toLocaleDateString("es-CO")}
                  </p>
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] lg:text-xs text-gray-500">Usuario</p>
                  <p className="text-xs lg:text-sm font-medium text-gray-900 truncate">
                    {usuario}
                  </p>
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
            disabled={!selectedRemesa}
            className="w-full lg:w-auto px-4 lg:px-6 py-3 lg:py-2.5 bg-gradient-to-r from-[#40A095] to-[#99D6CF] text-white rounded-lg hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 font-medium order-1 lg:order-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
          >
            <Save className="w-4 h-4" />
            <span>Guardar Corrección</span>
          </button>
        </div>
      </div>
    </div>
  );
}
