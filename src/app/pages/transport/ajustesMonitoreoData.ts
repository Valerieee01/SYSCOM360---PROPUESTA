/**
 * Configuración y datos de apoyo para el subproceso de Ajustes a Monitoreo de
 * Manifiestos (MAN-2). Centraliza puestos de control, motivos, manifiestos de
 * ejemplo (con su monitoreo por puesto) y helpers.
 */

// Helpers genéricos reutilizados del subproceso de correcciones de remesa
// (una sola fuente de verdad para formato de fecha/hora y usuario autenticado).
export { formatDateTime, getUsuarioActual } from "./correccionesRemesaData";

// Puestos de control configurados (peajes, básculas, puntos de monitoreo)
export interface PuestoControl {
  id: string;
  label: string;
}

export const PUESTOS_CONTROL: PuestoControl[] = [
  { id: "peaje-loboguerrero", label: "Peaje Loboguerrero" },
  { id: "bascula-buga", label: "Báscula Buga" },
  { id: "peaje-la-paila", label: "Peaje La Paila" },
  { id: "monitoreo-ibague", label: "Punto Monitoreo Ibagué" },
  { id: "peaje-la-linea", label: "Peaje La Línea" },
  { id: "peaje-chinauta", label: "Peaje Chinauta" },
];

// Catálogo de motivos de ajuste
export const MOTIVOS_AJUSTE = [
  "Corrección de digitación",
  "Falla en dispositivo GPS",
  "Reporte tardío del conductor",
  "Zona sin cobertura de señal",
  "Verificación con puesto de control",
  "Otro",
];

// Registro de monitoreo por puesto: llegada/salida (formato datetime-local)
export interface MonitoreoPuesto {
  llegada: string;
  salida: string;
}

// Resumen de un manifiesto + su monitoreo actual por puesto de control.
export interface ManifiestoResumen {
  numero: string; // incluye consecutivo, ej. MAN-2026-0089-01
  origen: string;
  destino: string;
  transportador: string;
  placa: string;
  conductor: string;
  // Monitoreo actual indexado por id de puesto de control
  monitoreo: Record<string, MonitoreoPuesto>;
}

export const MANIFIESTOS_MOCK: ManifiestoResumen[] = [
  {
    numero: "MAN-2026-0089-01",
    origen: "Cali",
    destino: "Bogotá",
    transportador: "Transportes del Sur S.A.S",
    placa: "ABC-123",
    conductor: "Juan Pérez",
    monitoreo: {
      "peaje-loboguerrero": { llegada: "2025-07-09T12:30", salida: "2025-07-09T12:45" },
      "bascula-buga": { llegada: "2025-07-09T14:10", salida: "2025-07-09T14:35" },
    },
  },
  {
    numero: "MAN-2026-0090-01",
    origen: "Medellín",
    destino: "Barranquilla",
    transportador: "Carga Pesada SAS",
    placa: "DEF-456",
    conductor: "María López",
    monitoreo: {
      "peaje-la-paila": { llegada: "2025-07-11T08:05", salida: "2025-07-11T08:20" },
    },
  },
  {
    numero: "MAN-2026-0091-01",
    origen: "Bogotá",
    destino: "Cali",
    transportador: "Logística Andina Ltda",
    placa: "GHI-789",
    conductor: "Carlos Gómez",
    monitoreo: {
      "peaje-la-linea": { llegada: "2025-07-08T16:40", salida: "2025-07-08T17:05" },
      "monitoreo-ibague": { llegada: "2025-07-08T19:15", salida: "2025-07-08T19:30" },
    },
  },
];
