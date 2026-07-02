/**
 * Registro declarativo de subprocesos de documentos de transporte.
 *
 * ── Punto único de extensión ──────────────────────────────────────────────
 * Para añadir un subproceso a cualquier tarjeta de documento, agrega UNA entrada
 * a `SUBPROCESOS`. No hay que tocar `Transporte.tsx`, ni el estado, ni los modales:
 * la tarjeta lo detecta por `documentType`, el footer se adapta (1 → enlace,
 * ≥2 → menú) y el modal host lo renderiza en modo `embedded`.
 *
 * Ejemplo (si en el futuro "Cumplidos" tuviera 3 subprocesos):
 *   { id: "revision-cumplido",   documentType: "Cumplidos", label: "Revisión",        icon: ClipboardCheck, Component: RevisionCumplido },
 *   { id: "anulacion-cumplido",  documentType: "Cumplidos", label: "Anulación",       icon: Ban,            Component: AnulacionCumplido },
 *   { id: "reapertura-cumplido", documentType: "Cumplidos", label: "Reapertura",      icon: RotateCcw,      Component: ReaperturaCumplido },
 * y la tarjeta de Cumplidos mostrará automáticamente un menú "Procesos (3)".
 */
import type { ComponentType } from "react";
import {
  ClipboardList,
  ClipboardCheck,
  Ban,
  RotateCcw,
  type LucideIcon,
} from "lucide-react";
import CorreccionesRemesa from "./CorreccionesRemesa";
import AjustesMonitoreoManifiesto from "./AjustesMonitoreoManifiesto";
import {
  RevisionCumplido,
  AnulacionCumplido,
  ReaperturaCumplido,
} from "./cumplidoSubprocesos";

// Contrato que debe cumplir todo componente de subproceso para vivir dentro
// del panel/modal genérico.
export interface SubprocesoComponentProps {
  embedded?: boolean;
  onBack?: () => void;
}

export interface SubprocesoDef {
  /** Identificador único y estable del subproceso. */
  id: string;
  /** Nombre del tipo de documento (tarjeta) al que pertenece. */
  documentType: string;
  /** Etiqueta visible en la tarjeta / menú. */
  label: string;
  /** Ícono para el ítem de menú. */
  icon: LucideIcon;
  /** Componente que se monta dentro del panel genérico. */
  Component: ComponentType<SubprocesoComponentProps>;
}

export const SUBPROCESOS: SubprocesoDef[] = [
  {
    id: "correcciones-remesa",
    documentType: "Remesas",
    label: "Correcciones de remesa",
    icon: ClipboardList,
    Component: CorreccionesRemesa,
  },
  {
    id: "ajustes-monitoreo-manifiesto",
    documentType: "Manifiestos",
    label: "Ajustes de monitoreo",
    icon: ClipboardCheck,
    Component: AjustesMonitoreoManifiesto,
  },

  // SIMULACIÓN — La tarjeta "Cumplidos" con tres subprocesos.
  // La card muestra automáticamente el menú "Procesos (3)".
  {
    id: "revision-cumplido",
    documentType: "Cumplidos",
    label: "Revisión de cumplidos",
    icon: ClipboardCheck,
    Component: RevisionCumplido,
  },
  {
    id: "anulacion-cumplido",
    documentType: "Cumplidos",
    label: "Anulación de cumplido",
    icon: Ban,
    Component: AnulacionCumplido,
  },
  {
    id: "reapertura-cumplido",
    documentType: "Cumplidos",
    label: "Reapertura de cumplido",
    icon: RotateCcw,
    Component: ReaperturaCumplido,
  },
];

/** Subprocesos asociados a un tipo de documento (tarjeta). */
export function getSubprocesos(documentType: string): SubprocesoDef[] {
  return SUBPROCESOS.filter((s) => s.documentType === documentType);
}
