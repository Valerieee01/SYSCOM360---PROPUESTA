/**
 * Configuración y datos de apoyo para el módulo de Correcciones de Remesa (REM-2).
 * Centraliza los tipos de cambio, ciudades, remesas de ejemplo y helpers de formato
 * para que el formulario y el listado compartan una sola fuente de verdad.
 */

// Ciudades disponibles para cambios de origen/destino
export const CIUDADES = [
  "Bogotá",
  "Medellín",
  "Cali",
  "Barranquilla",
  "Cartagena",
  "Pereira",
  "Bucaramanga",
  "Cúcuta",
  "Manizales",
  "Ibagué",
];

// Tipo de input que se muestra según el tipo de cambio seleccionado
export type CampoTipo = "datetime" | "ciudad" | "texto";

export interface TipoCambioConfig {
  value: string; // clave interna
  label: string; // etiqueta legible (se persiste en el registro)
  campo: keyof RemesaResumen; // campo real de la remesa que se corrige
  tipo: CampoTipo; // control a renderizar
  motivos: string[]; // motivos dependientes de este tipo de cambio
}

// Catálogo de tipos de cambio soportados. Cada uno define qué campo real de la
// remesa modifica, qué control mostrar y sus motivos configurables.
export const TIPOS_CAMBIO: TipoCambioConfig[] = [
  {
    value: "cita_cargue",
    label: "Cambio de cita de cargue",
    campo: "citaCargue",
    tipo: "datetime",
    motivos: [
      "No aplica",
      "Solicitud del cliente",
      "Disponibilidad del vehículo",
      "Reprogramación de bodega",
    ],
  },
  {
    value: "cita_descargue",
    label: "Cambio de cita de descargue",
    campo: "citaDescargue",
    tipo: "datetime",
    motivos: [
      "No aplica",
      "Solicitud del destinatario",
      "Congestión en punto de entrega",
      "Novedad en ruta",
    ],
  },
  {
    value: "destino",
    label: "Cambio de destino",
    campo: "destino",
    tipo: "ciudad",
    motivos: ["No aplica", "Redireccionamiento del cliente", "Error de digitación"],
  },
  {
    value: "destinatario",
    label: "Cambio de destinatario",
    campo: "destinatario",
    tipo: "texto",
    motivos: ["No aplica", "Cambio comercial", "Error de digitación"],
  },
  {
    value: "observaciones",
    label: "Cambio de observaciones",
    campo: "observaciones",
    tipo: "texto",
    motivos: ["No aplica", "Instrucción adicional de entrega"],
  },
];

// Resumen de una remesa: campos de solo lectura + campos editables por corrección.
export interface RemesaResumen {
  numero: string;
  cliente: string;
  nit: string;
  remitente: string;
  destinatario: string;
  origen: string;
  destino: string;
  manifiesto: string;
  items: number;
  // Campos corregibles (valores actuales)
  citaCargue: string; // formato datetime-local: yyyy-MM-ddTHH:mm
  citaDescargue: string;
  observaciones: string;
}

// Remesas de ejemplo sobre las que se pueden registrar correcciones (prototipo).
export const REMESAS_MOCK: RemesaResumen[] = [
  {
    numero: "REM-2026-0125",
    cliente: "Almacenes Éxito",
    nit: "890.900.608-9",
    remitente: "Bodega Central Cali",
    destinatario: "CD Éxito Bogotá",
    origen: "Cali",
    destino: "Bogotá",
    manifiesto: "MAN-2026-0089",
    items: 1,
    citaCargue: "2025-07-09T10:59",
    citaDescargue: "2025-07-10T08:00",
    observaciones: "Entregar en horario AM",
  },
  {
    numero: "REM-2026-0126",
    cliente: "Carrefour Colombia",
    nit: "900.017.447-1",
    remitente: "Planta Medellín",
    destinatario: "CD Carrefour Barranquilla",
    origen: "Medellín",
    destino: "Barranquilla",
    manifiesto: "MAN-2026-0090",
    items: 3,
    citaCargue: "2025-07-11T06:30",
    citaDescargue: "2025-07-12T14:00",
    observaciones: "Carga refrigerada, cadena de frío",
  },
  {
    numero: "REM-2026-0127",
    cliente: "Homecenter",
    nit: "800.242.106-2",
    remitente: "Bodega Bogotá Norte",
    destinatario: "Tienda Homecenter Cali",
    origen: "Bogotá",
    destino: "Cali",
    manifiesto: "MAN-2026-0091",
    items: 2,
    citaCargue: "2025-07-08T09:00",
    citaDescargue: "2025-07-09T11:30",
    observaciones: "Material de construcción",
  },
];

/**
 * Formatea un valor datetime-local (yyyy-MM-ddTHH:mm) a dd-MM-yyyy HH:mm.
 * Los valores que no sean fecha se devuelven tal cual.
 */
export function formatDateTime(value: string): string {
  if (!value) return "";
  const d = new Date(value);
  if (isNaN(d.getTime())) return value;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(d.getDate())}-${pad(d.getMonth() + 1)}-${d.getFullYear()} ${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`;
}

/** Formatea el valor de un campo para mostrarlo/persistirlo según su tipo. */
export function formatValorCampo(tipo: CampoTipo, value: string): string {
  return tipo === "datetime" ? formatDateTime(value) : value;
}

/** Nombre del usuario autenticado (desde localStorage), con fallback. */
export function getUsuarioActual(): string {
  try {
    const raw = localStorage.getItem("user");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed?.name) return parsed.name as string;
    }
  } catch {
    // ignorar parseo inválido
  }
  return "Admin User";
}
