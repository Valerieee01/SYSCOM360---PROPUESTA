/**
 * SIMULACIÓN — Tres subprocesos de la tarjeta "Cumplidos".
 *
 * Demuestra la escalabilidad del registro `SUBPROCESOS`: cada componente solo
 * cumple el contrato { embedded, onBack } y se monta en el panel genérico.
 * El scaffold `SubprocesoScaffold` es el molde mínimo para crear uno nuevo rápido.
 */
import { useState, type ReactNode } from "react";
import {
  X,
  Search,
  Save,
  ClipboardCheck,
  Ban,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  type LucideIcon,
} from "lucide-react";
import { useTransport } from "../../context/TransportContext";
import type { SubprocesoComponentProps } from "./subprocesos";
import { getUsuarioActual } from "./correccionesRemesaData";

// ── Molde reutilizable para el panel de un subproceso ──────────────────────
function SubprocesoScaffold({
  title,
  description,
  icon: Icon,
  onBack,
  children,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
  onBack?: () => void;
  children: ReactNode;
}) {
  return (
    <div className="p-4 lg:p-6 space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <div className="p-2 rounded-lg bg-[#40A095]/10 flex-shrink-0">
            <Icon className="w-5 h-5 text-[#40A095]" />
          </div>
          <div className="min-w-0">
            <h1 className="text-lg sm:text-xl font-bold text-gray-900">{title}</h1>
            <p className="text-xs sm:text-sm text-gray-600">{description}</p>
          </div>
        </div>
        {onBack && (
          <button
            onClick={onBack}
            aria-label="Cerrar"
            className="p-2.5 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 hover:text-gray-700 active:scale-95 transition-all flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

// Buscador de cumplido reutilizable (input con ícono)
function BuscarCumplido({
  value,
  onChange,
  placeholder = "Ej: CUM-2026-045",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#40A095]"
      />
    </div>
  );
}

// ── 1) Revisión / Aprobación de cumplidos ──────────────────────────────────
const cumplidosPendientes = [
  { numero: "CUM-2026-045", manifiesto: "MAN-2026-0089-01", fecha: "14/07/2025" },
  { numero: "CUM-2026-046", manifiesto: "MAN-2026-0090-01", fecha: "14/07/2025" },
  { numero: "CUM-2026-047", manifiesto: "MAN-2026-0091-01", fecha: "13/07/2025" },
];

export function RevisionCumplido({ onBack }: SubprocesoComponentProps) {
  const { mostrarToast } = useTransport();
  const [revisados, setRevisados] = useState<string[]>([]);

  const aprobar = (numero: string) => {
    setRevisados((prev) => [...prev, numero]);
    mostrarToast("success", `Cumplido ${numero} aprobado por ${getUsuarioActual()}.`);
  };

  return (
    <SubprocesoScaffold
      title="Revisión de Cumplidos"
      description="Aprueba los cumplidos pendientes antes de su radicación"
      icon={ClipboardCheck}
      onBack={onBack}
    >
      <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
        {cumplidosPendientes.map((c) => {
          const aprobado = revisados.includes(c.numero);
          return (
            <div key={c.numero} className="flex items-center justify-between p-3 sm:p-4 gap-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#40A095]">{c.numero}</p>
                <p className="text-xs text-gray-500 truncate">
                  {c.manifiesto} · {c.fecha}
                </p>
              </div>
              {aprobado ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 flex-shrink-0">
                  <CheckCircle className="w-3.5 h-3.5" /> Aprobado
                </span>
              ) : (
                <button
                  onClick={() => aprobar(c.numero)}
                  className="px-3 py-1.5 bg-gradient-to-r from-[#40A095] to-[#99D6CF] text-white rounded-lg text-xs font-medium active:scale-95 transition-all flex-shrink-0"
                >
                  Aprobar
                </button>
              )}
            </div>
          );
        })}
      </div>
    </SubprocesoScaffold>
  );
}

// ── 2) Anulación de cumplido ───────────────────────────────────────────────
const MOTIVOS_ANULACION = [
  "Error en datos del cumplido",
  "Cumplido duplicado",
  "Solicitud del cliente",
  "Ajuste administrativo",
];

export function AnulacionCumplido({ onBack }: SubprocesoComponentProps) {
  const { mostrarToast } = useTransport();
  const [numero, setNumero] = useState("");
  const [motivo, setMotivo] = useState("");
  const [error, setError] = useState("");

  const anular = () => {
    if (!numero.trim()) return setError("Ingrese el número de cumplido a anular.");
    if (!motivo) return setError("Seleccione el motivo de anulación.");
    setError("");
    mostrarToast("warning", `Cumplido ${numero.trim()} anulado (${motivo}).`);
    onBack?.();
  };

  return (
    <SubprocesoScaffold
      title="Anulación de Cumplido"
      description="Anula un cumplido registrado dejando trazabilidad del motivo"
      icon={Ban}
      onBack={onBack}
    >
      <div className="bg-gradient-to-br from-red-50 to-orange-50/40 rounded-xl p-4 border border-red-200 space-y-3">
        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-3 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-red-800 font-medium">{error}</p>
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Número de Cumplido *</label>
          <BuscarCumplido value={numero} onChange={setNumero} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Motivo de Anulación *</label>
          <select
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
          >
            <option value="">Seleccione...</option>
            {MOTIVOS_ANULACION.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
        <button
          onClick={anular}
          className="w-full px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 active:scale-95 transition-all font-medium text-sm flex items-center justify-center gap-2"
        >
          <Ban className="w-4 h-4" /> Anular cumplido
        </button>
      </div>
    </SubprocesoScaffold>
  );
}

// ── 3) Reapertura de cumplido ──────────────────────────────────────────────
export function ReaperturaCumplido({ onBack }: SubprocesoComponentProps) {
  const { mostrarToast } = useTransport();
  const [numero, setNumero] = useState("");
  const [justificacion, setJustificacion] = useState("");
  const [error, setError] = useState("");

  const reabrir = () => {
    if (!numero.trim()) return setError("Ingrese el número de cumplido a reabrir.");
    if (justificacion.trim().length < 10)
      return setError("La justificación debe tener al menos 10 caracteres.");
    setError("");
    mostrarToast("info", `Cumplido ${numero.trim()} reabierto por ${getUsuarioActual()}.`);
    onBack?.();
  };

  return (
    <SubprocesoScaffold
      title="Reapertura de Cumplido"
      description="Reabre un cumplido cerrado para corregir información"
      icon={RotateCcw}
      onBack={onBack}
    >
      <div className="bg-white rounded-xl p-4 border border-gray-200 space-y-3">
        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-3 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-red-800 font-medium">{error}</p>
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Número de Cumplido *</label>
          <BuscarCumplido value={numero} onChange={setNumero} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Justificación *</label>
          <textarea
            rows={3}
            value={justificacion}
            onChange={(e) => setJustificacion(e.target.value)}
            placeholder="Explique por qué se reabre el cumplido..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#40A095] resize-none"
          />
        </div>
        <button
          onClick={reabrir}
          className="w-full px-4 py-2.5 bg-gradient-to-r from-[#40A095] to-[#99D6CF] text-white rounded-lg hover:shadow-lg active:scale-95 transition-all font-medium text-sm flex items-center justify-center gap-2"
        >
          <Save className="w-4 h-4" /> Reabrir cumplido
        </button>
      </div>
    </SubprocesoScaffold>
  );
}
