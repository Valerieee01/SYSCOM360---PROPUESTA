import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  RotateCcw,
  ArrowRight,
  Eye,
  X,
  ClipboardList,
  ClipboardCheck,
  CalendarClock,
  Truck,
  FileText,
  User,
  Hash,
  AlertCircle,
} from "lucide-react";
import { useTransport } from "../../context/TransportContext";
import type { CorreccionRemesa } from "../../types/transport";
import {
  REMESAS_MOCK,
  TIPOS_CAMBIO,
  getUsuarioActual,
  type RemesaResumen,
} from "./correccionesRemesaData";
import CorreccionRemesaForm, { type CorreccionPayload } from "./CorreccionRemesaForm";

// Correcciones sembradas para que el listado no inicie vacío (prototipo)
const correccionesIniciales: CorreccionRemesa[] = [
  {
    id: "corr-seed-1",
    numeroRegistro: 1001,
    remesaNumero: "REM-2026-0125",
    item: 1,
    tipoCambio: "Cambio de cita de cargue",
    campoAfectado: "citaCargue",
    motivoCambio: "Solicitud del cliente",
    valorAnterior: "09-07-2025 10:59",
    valorNuevo: "15-07-2025 08:00",
    observaciones: "El cliente reprogramó el cargue por disponibilidad de bodega.",
    usuario: "Admin User",
    fecha: new Date("2025-07-07T09:15:00"),
  },
  {
    id: "corr-seed-2",
    numeroRegistro: 1002,
    remesaNumero: "REM-2026-0127",
    item: 2,
    tipoCambio: "Cambio de destino",
    campoAfectado: "destino",
    motivoCambio: "Redireccionamiento del cliente",
    valorAnterior: "Cali",
    valorNuevo: "Pereira",
    observaciones: "",
    usuario: "María López",
    fecha: new Date("2025-07-06T16:40:00"),
  },
];

const toYMD = (d: Date) => {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

const formatFechaHora = (d: Date) =>
  `${d.toLocaleDateString("es-CO")} ${d.toLocaleTimeString("es-CO", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;

interface CorreccionesRemesaProps {
  /** Handler para cerrar el panel (X). Se muestra cuando se abre como modal. */
  onBack?: () => void;
  /** Modo compacto para uso dentro de un modal/panel: oculta los KPIs de pantalla completa. */
  embedded?: boolean;
}

export default function CorreccionesRemesa({ onBack, embedded }: CorreccionesRemesaProps) {
  const { mostrarToast } = useTransport();

  // Remesas en estado local para poder aplicar el cambio real sobre el dato
  const [remesas, setRemesas] = useState<RemesaResumen[]>(REMESAS_MOCK);
  const [correcciones, setCorrecciones] = useState<CorreccionRemesa[]>(correccionesIniciales);

  const [showForm, setShowForm] = useState(false);
  const [detalle, setDetalle] = useState<CorreccionRemesa | null>(null);

  // Filtros
  const [buscarRemesa, setBuscarRemesa] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("Todos");
  const [filtroUsuario, setFiltroUsuario] = useState("Todos");
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");

  const usuarioActual = getUsuarioActual();
  const nextRegistro =
    correcciones.reduce((max, c) => Math.max(max, c.numeroRegistro), 1000) + 1;

  const usuarios = useMemo(
    () => Array.from(new Set(correcciones.map((c) => c.usuario))),
    [correcciones]
  );

  const correccionesFiltradas = useMemo(() => {
    return correcciones.filter((c) => {
      const matchRemesa = c.remesaNumero
        .toLowerCase()
        .includes(buscarRemesa.trim().toLowerCase());
      const matchTipo = filtroTipo === "Todos" || c.tipoCambio === filtroTipo;
      const matchUsuario = filtroUsuario === "Todos" || c.usuario === filtroUsuario;
      const ymd = toYMD(c.fecha);
      const matchDesde = !fechaDesde || ymd >= fechaDesde;
      const matchHasta = !fechaHasta || ymd <= fechaHasta;
      return matchRemesa && matchTipo && matchUsuario && matchDesde && matchHasta;
    });
  }, [correcciones, buscarRemesa, filtroTipo, filtroUsuario, fechaDesde, fechaHasta]);

  const limpiarFiltros = () => {
    setBuscarRemesa("");
    setFiltroTipo("Todos");
    setFiltroUsuario("Todos");
    setFechaDesde("");
    setFechaHasta("");
  };

  const hoyYMD = toYMD(new Date());
  const stats = {
    total: correcciones.length,
    hoy: correcciones.filter((c) => toYMD(c.fecha) === hoyYMD).length,
    remesas: new Set(correcciones.map((c) => c.remesaNumero)).size,
    citas: correcciones.filter((c) => c.campoAfectado.startsWith("cita")).length,
  };

  const handleSave = (payload: CorreccionPayload) => {
    const registro: CorreccionRemesa = {
      id: `corr-${Date.now()}`,
      numeroRegistro: nextRegistro,
      remesaNumero: payload.remesaNumero,
      item: payload.item,
      tipoCambio: payload.tipoCambio,
      campoAfectado: payload.campoAfectado,
      motivoCambio: payload.motivoCambio,
      valorAnterior: payload.valorAnterior,
      valorNuevo: payload.valorNuevo,
      observaciones: payload.observaciones,
      usuario: usuarioActual,
      fecha: new Date(),
    };

    // 1) Aplicar el cambio real sobre la remesa
    setRemesas((prev) =>
      prev.map((r) =>
        r.numero === payload.remesaNumero
          ? { ...r, [payload.campoAfectado]: payload.valorNuevoRaw }
          : r
      )
    );
    // 2) Dejar el registro histórico (más reciente arriba)
    setCorrecciones((prev) => [registro, ...prev]);

    mostrarToast(
      "success",
      `Corrección #${registro.numeroRegistro} registrada sobre ${payload.remesaNumero}.`
    );
    setShowForm(false);
  };

  return (
    <div className={embedded ? "p-4 lg:p-6 space-y-4" : "p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-6"}>
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h1 className={`font-bold text-gray-900 ${embedded ? "text-lg sm:text-xl" : "text-xl sm:text-2xl md:text-3xl"}`}>
            Correcciones de Remesa
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Subproceso de los documentos de remesa · trazabilidad completa
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center justify-center gap-2 px-3 lg:px-5 py-2.5 bg-gradient-to-r from-[#40A095] to-[#99D6CF] text-white rounded-lg hover:shadow-lg active:scale-95 transition-all shadow-sm font-medium text-sm"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Nueva corrección</span>
            <span className="sm:hidden">Nueva</span>
          </button>
          {onBack && (
            <button
              onClick={onBack}
              aria-label="Cerrar"
              className="p-2.5 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 hover:text-gray-700 active:scale-95 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* KPIs (solo en pantalla completa) */}
      {!embedded && (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
        <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-teal-200 sm:border-2">
          <div className="p-1.5 sm:p-2 bg-teal-600 rounded-md sm:rounded-lg w-fit mb-1 sm:mb-2">
            <ClipboardList className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
          </div>
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-teal-900">
            {stats.total}
          </p>
          <p className="text-[10px] sm:text-xs font-medium text-teal-700 mt-0.5 sm:mt-1">
            Total correcciones
          </p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-blue-200 sm:border-2">
          <div className="p-1.5 sm:p-2 bg-blue-600 rounded-md sm:rounded-lg w-fit mb-1 sm:mb-2">
            <CalendarClock className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
          </div>
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-900">
            {stats.hoy}
          </p>
          <p className="text-[10px] sm:text-xs font-medium text-blue-700 mt-0.5 sm:mt-1">
            Registradas hoy
          </p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-purple-200 sm:border-2">
          <div className="p-1.5 sm:p-2 bg-purple-600 rounded-md sm:rounded-lg w-fit mb-1 sm:mb-2">
            <Truck className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
          </div>
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-900">
            {stats.remesas}
          </p>
          <p className="text-[10px] sm:text-xs font-medium text-purple-700 mt-0.5 sm:mt-1">
            Remesas afectadas
          </p>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-orange-200 sm:border-2">
          <div className="p-1.5 sm:p-2 bg-orange-600 rounded-md sm:rounded-lg w-fit mb-1 sm:mb-2">
            <ClipboardCheck className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
          </div>
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-900">
            {stats.citas}
          </p>
          <p className="text-[10px] sm:text-xs font-medium text-orange-700 mt-0.5 sm:mt-1">
            Cambios de cita
          </p>
        </div>
      </div>
      )}

      {/* Filtros */}
      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div className="relative lg:col-span-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={buscarRemesa}
              onChange={(e) => setBuscarRemesa(e.target.value)}
              placeholder="Buscar remesa..."
              className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#40A095]"
            />
          </div>
          <select
            value={filtroTipo}
            onChange={(e) => setFiltroTipo(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#40A095] bg-white"
          >
            <option value="Todos">Todos los tipos</option>
            {TIPOS_CAMBIO.map((t) => (
              <option key={t.value} value={t.label}>
                {t.label}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={fechaDesde}
            onChange={(e) => setFechaDesde(e.target.value)}
            aria-label="Fecha desde"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#40A095]"
          />
          <input
            type="date"
            value={fechaHasta}
            onChange={(e) => setFechaHasta(e.target.value)}
            aria-label="Fecha hasta"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#40A095]"
          />
          <div className="flex gap-2">
            <select
              value={filtroUsuario}
              onChange={(e) => setFiltroUsuario(e.target.value)}
              className="flex-1 min-w-0 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#40A095] bg-white"
            >
              <option value="Todos">Usuario</option>
              {usuarios.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
            <button
              onClick={limpiarFiltros}
              title="Limpiar filtros"
              className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 active:scale-95 transition-all flex-shrink-0"
            >
              <RotateCcw className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Listado */}
      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Desktop */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">No. Registro</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">No. Remesa</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Tipo de cambio</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Cambio</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Fecha</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Usuario</th>
                <th className="text-center py-4 px-6 text-sm font-medium text-gray-600">Acción</th>
              </tr>
            </thead>
            <tbody>
              {correccionesFiltradas.map((c) => (
                <tr key={c.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 text-sm font-bold text-gray-900">#{c.numeroRegistro}</td>
                  <td className="py-4 px-6 text-sm font-semibold text-[#40A095]">{c.remesaNumero}</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                      {c.tipoCambio}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-400 line-through">{c.valorAnterior}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />
                      <span className="font-semibold text-gray-900">{c.valorNuevo}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">{formatFechaHora(c.fecha)}</td>
                  <td className="py-4 px-6 text-sm text-gray-700">{c.usuario}</td>
                  <td className="py-4 px-6 text-center">
                    <button
                      onClick={() => setDetalle(c)}
                      className="p-2 text-[#40A095] hover:bg-[#40A095]/10 rounded-lg transition-all active:scale-95"
                      title="Ver detalle"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Móvil */}
        <div className="lg:hidden divide-y divide-gray-200">
          {correccionesFiltradas.map((c) => (
            <div key={c.id} className="p-4 hover:bg-gray-50 active:bg-gray-100 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div className="min-w-0">
                  <p className="text-xs font-bold text-gray-900">#{c.numeroRegistro}</p>
                  <p className="text-sm font-semibold text-[#40A095]">{c.remesaNumero}</p>
                </div>
                <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium bg-orange-100 text-orange-700 flex-shrink-0">
                  {c.tipoCambio}
                </span>
              </div>
              <div className="bg-gray-50 rounded-lg p-2.5 mb-2">
                <div className="flex items-center gap-2 text-xs flex-wrap">
                  <span className="text-gray-400 line-through">{c.valorAnterior}</span>
                  <ArrowRight className="w-3 h-3 text-orange-500 flex-shrink-0" />
                  <span className="font-semibold text-gray-900">{c.valorNuevo}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-[10px] text-gray-500">
                  {formatFechaHora(c.fecha)} · {c.usuario}
                </div>
                <button
                  onClick={() => setDetalle(c)}
                  className="flex items-center gap-1 text-xs text-[#40A095] font-medium active:scale-95 transition-all"
                >
                  <Eye className="w-4 h-4" />
                  <span>Detalle</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {correccionesFiltradas.length === 0 && (
          <div className="py-12 text-center px-4">
            <ClipboardList className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-sm sm:text-lg">No hay correcciones registradas</p>
            <p className="text-gray-400 text-xs sm:text-sm mt-1 sm:mt-2">
              Ajusta los filtros o registra una nueva corrección
            </p>
          </div>
        )}

        {correccionesFiltradas.length > 0 && (
          <div className="px-4 sm:px-6 py-3 border-t border-gray-200 bg-gray-50">
            <p className="text-xs sm:text-sm text-gray-600">
              Mostrando {correccionesFiltradas.length} de {correcciones.length} correcciones
            </p>
          </div>
        )}
      </div>

      {/* Modal: nueva corrección */}
      {showForm && (
        <CorreccionRemesaForm
          remesas={remesas}
          numeroRegistro={nextRegistro}
          usuario={usuarioActual}
          onClose={() => setShowForm(false)}
          onSave={handleSave}
        />
      )}

      {/* Modal: detalle */}
      {detalle && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm z-50 lg:flex lg:items-center lg:justify-center lg:p-4">
          <div className="bg-white lg:rounded-xl shadow-xl lg:max-w-lg w-full h-full lg:h-auto lg:max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-[#40A095] to-[#99D6CF] lg:bg-white lg:border-b border-gray-200 px-4 lg:px-6 py-4 flex items-center justify-between z-10">
              <h2 className="text-lg lg:text-xl font-bold text-white lg:text-gray-900">
                Detalle de Corrección #{detalle.numeroRegistro}
              </h2>
              <button
                onClick={() => setDetalle(null)}
                className="text-white lg:text-gray-400 hover:text-white/80 lg:hover:text-gray-600 p-2 rounded-lg hover:bg-white/10 lg:hover:bg-gray-100 active:scale-95 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 lg:p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-start gap-2">
                  <Truck className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500">No. Remesa</p>
                    <p className="text-sm font-semibold text-[#40A095]">{detalle.remesaNumero}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Hash className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500">Item</p>
                    <p className="text-sm font-medium text-gray-900">{detalle.item ?? "—"}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <FileText className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500">Tipo de cambio</p>
                    <p className="text-sm font-medium text-gray-900">{detalle.tipoCambio}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500">Motivo</p>
                    <p className="text-sm font-medium text-gray-900">{detalle.motivoCambio || "No aplica"}</p>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                <p className="text-xs font-semibold text-orange-700 uppercase tracking-wide mb-2">
                  Cambio aplicado
                </p>
                <div className="flex items-center gap-2 flex-wrap text-sm">
                  <span className="px-2 py-1 rounded bg-gray-100 text-gray-500 line-through">
                    {detalle.valorAnterior}
                  </span>
                  <ArrowRight className="w-4 h-4 text-orange-500" />
                  <span className="px-2 py-1 rounded bg-white border border-orange-300 font-semibold text-gray-900">
                    {detalle.valorNuevo}
                  </span>
                </div>
              </div>

              {detalle.observaciones && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Observaciones</p>
                  <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3 border border-gray-200">
                    {detalle.observaciones}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between pt-3 border-t border-gray-200 text-sm">
                <div className="flex items-center gap-1.5 text-gray-600">
                  <User className="w-4 h-4 text-gray-400" />
                  {detalle.usuario}
                </div>
                <div className="flex items-center gap-1.5 text-gray-600">
                  <CalendarClock className="w-4 h-4 text-gray-400" />
                  {formatFechaHora(detalle.fecha)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
