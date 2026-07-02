import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  RotateCcw,
  ArrowRight,
  Eye,
  X,
  ClipboardList,
  MapPin,
  Truck,
  User,
  CalendarClock,
  AlertCircle,
  LogIn,
  LogOut,
} from "lucide-react";
import { useTransport } from "../../context/TransportContext";
import type { AjusteMonitoreoManifiesto as AjusteType } from "../../types/transport";
import {
  MANIFIESTOS_MOCK,
  PUESTOS_CONTROL,
  getUsuarioActual,
  type ManifiestoResumen,
} from "./ajustesMonitoreoData";
import AjusteMonitoreoForm, { type AjustePayload } from "./AjusteMonitoreoForm";

// Ajustes sembrados para que el listado no inicie vacío (prototipo)
const ajustesIniciales: AjusteType[] = [
  {
    id: "aju-seed-1",
    numeroRegistro: 2001,
    manifiestoNumero: "MAN-2026-0089-01",
    puestoControl: "Peaje Loboguerrero",
    motivoAjuste: "Falla en dispositivo GPS",
    llegadaAnterior: "09-07-2025 12:30",
    llegadaNueva: "09-07-2025 12:10",
    salidaAnterior: "09-07-2025 12:45",
    salidaNueva: "09-07-2025 12:40",
    observaciones: "El GPS reportó con retraso; se corrige con registro del puesto.",
    usuario: "Admin User",
    fecha: new Date("2025-07-09T18:20:00"),
  },
  {
    id: "aju-seed-2",
    numeroRegistro: 2002,
    manifiestoNumero: "MAN-2026-0091-01",
    puestoControl: "Peaje La Línea",
    motivoAjuste: "Zona sin cobertura de señal",
    llegadaAnterior: "08-07-2025 16:40",
    llegadaNueva: "08-07-2025 16:55",
    salidaAnterior: "08-07-2025 17:05",
    salidaNueva: "08-07-2025 17:20",
    observaciones: "",
    usuario: "María López",
    fecha: new Date("2025-07-08T20:05:00"),
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

interface AjustesMonitoreoManifiestoProps {
  /** Handler para cerrar el panel (X). Se muestra cuando se abre como modal. */
  onBack?: () => void;
  /** Modo compacto para uso dentro de un modal/panel: oculta los KPIs. */
  embedded?: boolean;
}

export default function AjustesMonitoreoManifiesto({
  onBack,
  embedded,
}: AjustesMonitoreoManifiestoProps) {
  const { mostrarToast } = useTransport();

  // Manifiestos en estado local para aplicar el cambio real sobre el monitoreo
  const [manifiestos, setManifiestos] = useState<ManifiestoResumen[]>(MANIFIESTOS_MOCK);
  const [ajustes, setAjustes] = useState<AjusteType[]>(ajustesIniciales);

  const [showForm, setShowForm] = useState(false);
  const [detalle, setDetalle] = useState<AjusteType | null>(null);

  // Filtros
  const [buscarManifiesto, setBuscarManifiesto] = useState("");
  const [filtroPuesto, setFiltroPuesto] = useState("Todos");
  const [filtroUsuario, setFiltroUsuario] = useState("Todos");
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");

  const usuarioActual = getUsuarioActual();
  const nextRegistro = ajustes.reduce((max, a) => Math.max(max, a.numeroRegistro), 2000) + 1;

  const usuarios = useMemo(
    () => Array.from(new Set(ajustes.map((a) => a.usuario))),
    [ajustes]
  );

  const ajustesFiltrados = useMemo(() => {
    return ajustes.filter((a) => {
      const matchManifiesto = a.manifiestoNumero
        .toLowerCase()
        .includes(buscarManifiesto.trim().toLowerCase());
      const matchPuesto = filtroPuesto === "Todos" || a.puestoControl === filtroPuesto;
      const matchUsuario = filtroUsuario === "Todos" || a.usuario === filtroUsuario;
      const ymd = toYMD(a.fecha);
      const matchDesde = !fechaDesde || ymd >= fechaDesde;
      const matchHasta = !fechaHasta || ymd <= fechaHasta;
      return matchManifiesto && matchPuesto && matchUsuario && matchDesde && matchHasta;
    });
  }, [ajustes, buscarManifiesto, filtroPuesto, filtroUsuario, fechaDesde, fechaHasta]);

  const limpiarFiltros = () => {
    setBuscarManifiesto("");
    setFiltroPuesto("Todos");
    setFiltroUsuario("Todos");
    setFechaDesde("");
    setFechaHasta("");
  };

  const hoyYMD = toYMD(new Date());
  const stats = {
    total: ajustes.length,
    hoy: ajustes.filter((a) => toYMD(a.fecha) === hoyYMD).length,
    manifiestos: new Set(ajustes.map((a) => a.manifiestoNumero)).size,
    puestos: new Set(ajustes.map((a) => a.puestoControl)).size,
  };

  const handleSave = (payload: AjustePayload) => {
    const registro: AjusteType = {
      id: `aju-${Date.now()}`,
      numeroRegistro: nextRegistro,
      manifiestoNumero: payload.manifiestoNumero,
      puestoControl: payload.puestoControl,
      motivoAjuste: payload.motivoAjuste,
      llegadaAnterior: payload.llegadaAnterior,
      llegadaNueva: payload.llegadaNueva,
      salidaAnterior: payload.salidaAnterior,
      salidaNueva: payload.salidaNueva,
      observaciones: payload.observaciones,
      usuario: usuarioActual,
      fecha: new Date(),
    };

    // 1) Aplicar el cambio real sobre el monitoreo del manifiesto
    setManifiestos((prev) =>
      prev.map((m) =>
        m.numero === payload.manifiestoNumero
          ? {
              ...m,
              monitoreo: {
                ...m.monitoreo,
                [payload.puestoId]: {
                  llegada: payload.llegadaNuevaRaw,
                  salida: payload.salidaNuevaRaw,
                },
              },
            }
          : m
      )
    );
    // 2) Dejar el registro histórico (más reciente arriba)
    setAjustes((prev) => [registro, ...prev]);

    mostrarToast(
      "success",
      `Ajuste #${registro.numeroRegistro} registrado en ${payload.puestoControl} (${payload.manifiestoNumero}).`
    );
    setShowForm(false);
  };

  return (
    <div className={embedded ? "p-4 lg:p-6 space-y-4" : "p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-6"}>
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h1 className={`font-bold text-gray-900 ${embedded ? "text-lg sm:text-xl" : "text-xl sm:text-2xl md:text-3xl"}`}>
            Ajustes de Monitoreo
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Subproceso de los manifiestos · corrige llegada/salida por puesto de control
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center justify-center gap-2 px-3 lg:px-5 py-2.5 bg-gradient-to-r from-[#40A095] to-[#99D6CF] text-white rounded-lg hover:shadow-lg active:scale-95 transition-all shadow-sm font-medium text-sm"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Nuevo ajuste</span>
            <span className="sm:hidden">Nuevo</span>
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
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-teal-900">{stats.total}</p>
            <p className="text-[10px] sm:text-xs font-medium text-teal-700 mt-0.5 sm:mt-1">Total ajustes</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-blue-200 sm:border-2">
            <div className="p-1.5 sm:p-2 bg-blue-600 rounded-md sm:rounded-lg w-fit mb-1 sm:mb-2">
              <CalendarClock className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
            </div>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-900">{stats.hoy}</p>
            <p className="text-[10px] sm:text-xs font-medium text-blue-700 mt-0.5 sm:mt-1">Registrados hoy</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-purple-200 sm:border-2">
            <div className="p-1.5 sm:p-2 bg-purple-600 rounded-md sm:rounded-lg w-fit mb-1 sm:mb-2">
              <Truck className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
            </div>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-900">{stats.manifiestos}</p>
            <p className="text-[10px] sm:text-xs font-medium text-purple-700 mt-0.5 sm:mt-1">Manifiestos</p>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-orange-200 sm:border-2">
            <div className="p-1.5 sm:p-2 bg-orange-600 rounded-md sm:rounded-lg w-fit mb-1 sm:mb-2">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
            </div>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-900">{stats.puestos}</p>
            <p className="text-[10px] sm:text-xs font-medium text-orange-700 mt-0.5 sm:mt-1">Puestos ajustados</p>
          </div>
        </div>
      )}

      {/* Filtros */}
      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={buscarManifiesto}
              onChange={(e) => setBuscarManifiesto(e.target.value)}
              placeholder="Buscar manifiesto..."
              className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#40A095]"
            />
          </div>
          <select
            value={filtroPuesto}
            onChange={(e) => setFiltroPuesto(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#40A095] bg-white"
          >
            <option value="Todos">Todos los puestos</option>
            {PUESTOS_CONTROL.map((p) => (
              <option key={p.id} value={p.label}>
                {p.label}
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
                <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">No. Reg.</th>
                <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">Manifiesto</th>
                <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">Puesto</th>
                <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">Motivo</th>
                <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">Llegada</th>
                <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">Salida</th>
                <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">Usuario</th>
                <th className="text-center py-4 px-4 text-sm font-medium text-gray-600">Acción</th>
              </tr>
            </thead>
            <tbody>
              {ajustesFiltrados.map((a) => (
                <tr key={a.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4 text-sm font-bold text-gray-900">#{a.numeroRegistro}</td>
                  <td className="py-4 px-4 text-sm font-semibold text-[#40A095]">{a.manifiestoNumero}</td>
                  <td className="py-4 px-4 text-sm text-gray-700">{a.puestoControl}</td>
                  <td className="py-4 px-4">
                    <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                      {a.motivoAjuste}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1.5 text-xs whitespace-nowrap">
                      <span className="text-gray-400 line-through">{a.llegadaAnterior || "—"}</span>
                      <ArrowRight className="w-3 h-3 text-orange-500 flex-shrink-0" />
                      <span className="font-semibold text-gray-900">{a.llegadaNueva || "—"}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1.5 text-xs whitespace-nowrap">
                      <span className="text-gray-400 line-through">{a.salidaAnterior || "—"}</span>
                      <ArrowRight className="w-3 h-3 text-orange-500 flex-shrink-0" />
                      <span className="font-semibold text-gray-900">{a.salidaNueva || "—"}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-700">{a.usuario}</td>
                  <td className="py-4 px-4 text-center">
                    <button
                      onClick={() => setDetalle(a)}
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
          {ajustesFiltrados.map((a) => (
            <div key={a.id} className="p-4 hover:bg-gray-50 active:bg-gray-100 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div className="min-w-0">
                  <p className="text-xs font-bold text-gray-900">#{a.numeroRegistro}</p>
                  <p className="text-sm font-semibold text-[#40A095]">{a.manifiestoNumero}</p>
                  <p className="text-[10px] text-gray-500">{a.puestoControl}</p>
                </div>
                <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium bg-orange-100 text-orange-700 flex-shrink-0">
                  {a.motivoAjuste}
                </span>
              </div>
              <div className="bg-gray-50 rounded-lg p-2.5 mb-2 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs flex-wrap">
                  <LogIn className="w-3 h-3 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-400 line-through">{a.llegadaAnterior || "—"}</span>
                  <ArrowRight className="w-3 h-3 text-orange-500 flex-shrink-0" />
                  <span className="font-semibold text-gray-900">{a.llegadaNueva || "—"}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs flex-wrap">
                  <LogOut className="w-3 h-3 text-green-600 flex-shrink-0" />
                  <span className="text-gray-400 line-through">{a.salidaAnterior || "—"}</span>
                  <ArrowRight className="w-3 h-3 text-orange-500 flex-shrink-0" />
                  <span className="font-semibold text-gray-900">{a.salidaNueva || "—"}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-[10px] text-gray-500">
                  {formatFechaHora(a.fecha)} · {a.usuario}
                </div>
                <button
                  onClick={() => setDetalle(a)}
                  className="flex items-center gap-1 text-xs text-[#40A095] font-medium active:scale-95 transition-all"
                >
                  <Eye className="w-4 h-4" />
                  <span>Detalle</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {ajustesFiltrados.length === 0 && (
          <div className="py-12 text-center px-4">
            <ClipboardList className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-sm sm:text-lg">No hay ajustes registrados</p>
            <p className="text-gray-400 text-xs sm:text-sm mt-1 sm:mt-2">
              Ajusta los filtros o registra un nuevo ajuste de monitoreo
            </p>
          </div>
        )}

        {ajustesFiltrados.length > 0 && (
          <div className="px-4 sm:px-6 py-3 border-t border-gray-200 bg-gray-50">
            <p className="text-xs sm:text-sm text-gray-600">
              Mostrando {ajustesFiltrados.length} de {ajustes.length} ajustes
            </p>
          </div>
        )}
      </div>

      {/* Modal: nuevo ajuste */}
      {showForm && (
        <AjusteMonitoreoForm
          manifiestos={manifiestos}
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
                Detalle de Ajuste #{detalle.numeroRegistro}
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
                    <p className="text-xs text-gray-500">Manifiesto</p>
                    <p className="text-sm font-semibold text-[#40A095]">{detalle.manifiestoNumero}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500">Puesto de control</p>
                    <p className="text-sm font-medium text-gray-900">{detalle.puestoControl}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 col-span-2">
                  <AlertCircle className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500">Motivo</p>
                    <p className="text-sm font-medium text-gray-900">{detalle.motivoAjuste}</p>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 space-y-2">
                <p className="text-xs font-semibold text-orange-700 uppercase tracking-wide">
                  Cambios aplicados
                </p>
                <div className="flex items-center gap-2 flex-wrap text-sm">
                  <LogIn className="w-4 h-4 text-blue-600" />
                  <span className="text-xs text-gray-500 w-14">Llegada</span>
                  <span className="px-2 py-1 rounded bg-gray-100 text-gray-500 line-through text-xs">
                    {detalle.llegadaAnterior || "—"}
                  </span>
                  <ArrowRight className="w-4 h-4 text-orange-500" />
                  <span className="px-2 py-1 rounded bg-white border border-orange-300 font-semibold text-gray-900 text-xs">
                    {detalle.llegadaNueva || "—"}
                  </span>
                </div>
                <div className="flex items-center gap-2 flex-wrap text-sm">
                  <LogOut className="w-4 h-4 text-green-600" />
                  <span className="text-xs text-gray-500 w-14">Salida</span>
                  <span className="px-2 py-1 rounded bg-gray-100 text-gray-500 line-through text-xs">
                    {detalle.salidaAnterior || "—"}
                  </span>
                  <ArrowRight className="w-4 h-4 text-orange-500" />
                  <span className="px-2 py-1 rounded bg-white border border-orange-300 font-semibold text-gray-900 text-xs">
                    {detalle.salidaNueva || "—"}
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
