/**
 * TypeScript types for transport module
 * Based on RequerimientosFuncionalesTransporte.pdf specifications
 */

// PED-1.1: Operation types
export type OperationType = 'GENERAL' | 'MCIACONSOL' | 'CONTENEDOR' | 'CONT_VACIO';

// REM-1: Route types
export type RouteType = 'INTERURBANO' | 'REMESA_MUNICIPAL' | 'LOCAL';

// Document states
export type DocumentState = 'BORRADOR' | 'ACTIVO' | 'ANULADO' | 'RADICADO';

// User permission levels
export type UserLevel = 1 | 2 | 3 | 4;

// Tercero (third party) interface
export interface Tercero {
  id: string;
  nombre: string;
  nit: string;
  telefono: string;
  email?: string;
  direccion: string;
  ciudad: string;
  departamento: string;
  municipio: string;
  // PED-1.2: Coordinates are required
  latitud: number;
  longitud: number;
}

// Sede (branch/location) interface
export interface Sede {
  id: string;
  terceroId: string;
  nombre: string;
  direccion: string;
  ciudad: string;
  departamento: string;
  municipio: string;
  latitud: number;
  longitud: number;
  telefono: string;
}

// PED-1.4: Dangerous cargo interface
export interface DangerousCargo {
  isEnabled: boolean;
  unCode?: string; // UN code (e.g., UN1234)
  chapter?: string; // Capítulo
  partition?: string; // Partición
  productState?: string; // Estado del producto
  packagingGroup?: string; // Grupo de embalaje
  descripcionResiduo?: string;
  corrienteResiduos?: string;
  desagregacionCorrientes?: string;
}

// Merchandise/Product interface
export interface Mercancia {
  id?: string;
  codigo: string;
  codigoINVIAS: string;
  descripcion: string;
  pesoNeto: number;
  unidadMedida: string;
  tarifaTabla: number;
  unidadTarifaTabla: string;
  valorCobro?: number;
  unidadTarifaCobro?: string;
  unidades?: number;
  volumen?: number;
  unidadMedidaVolumen?: string;
  referencia1?: string;
  empaque?: string;
  dangerousCargo?: DangerousCargo;
}

// Vehicle interface
export interface Vehiculo {
  id: string;
  placa: string;
  tipo: string;
  soatVencimiento: Date;
  revisionTecnicaVencimiento: Date;
  capacidadCarga: number;
}

// Driver (Conductor) interface
export interface Conductor {
  id: string;
  nombre: string;
  documento: string;
  licenciaVencimiento: Date;
  telefono: string;
  // ODC-1.4: Dangerous cargo certification
  certificacionCargaPeligrosaVencimiento?: Date;
}

// Pedido (Order) interface - PED-1
export interface Pedido {
  id: string;
  numero: string; // PED-1: Consecutive number
  compania: string;
  fecha: Date;
  tipoOperacion: OperationType; // PED-1.1
  tipoServicio: string;
  estado: DocumentState;

  // Remitente (Sender)
  remitenteId: string;
  sedeOrigenId: string;

  // Destinatario (Recipient)
  destinatarioId: string;
  sedeDestinoId: string;

  // Propietario de la carga (Cargo owner)
  propietarioCargaId: string;

  // Mercancía
  mercancia: Mercancia;

  // Logística
  cantidad: number;
  peso: number;
  volumen?: number;
  valorDeclarado?: number;

  // Observaciones
  observaciones?: string;
  prioridad: 'Baja' | 'Media' | 'Alta' | 'Urgente';
  fechaProgramadaCargue?: Date;

  // Audit fields - PED-4
  creadoPor: string;
  fechaCreacion: Date;
  modificadoPor?: string;
  fechaModificacion?: Date;
}

// Orden de Cargue (Loading Order) interface - ODC-1
export interface OrdenCargue extends Pedido {
  // Additional fields specific to Orden de Cargue
  vehiculoId: string;
  remolqueId?: string;
  conductorPrincipalId: string;

  // Secondary vehicle (optional)
  vehiculoSecundarioId?: string;
  remolqueSecundarioId?: string;
  conductorSecundarioId?: string;
}

// Guía (Waybill) interface
export interface Guia {
  id: string;
  numero: string;
}

// Contenedor (Container) interface
export interface Contenedor {
  id: string;
  tipo: string;
  numero: string;
  tipoPrecinto: string;
  numeroPrecinto?: string;
}

// Remesa (Shipment) interface - REM-1
export interface Remesa {
  id: string;
  numero: string;
  compania: string;
  fecha: Date;

  // Can link to existing pedido or orden
  pedidoId?: string;
  ordenCargueId?: string;

  tipoRemesa: string;
  tipoOperacion: OperationType;
  tipoRuta: RouteType; // REM-1: Determined by municipalities

  // Terceros
  remitenteId: string;
  sedeOrigenId: string;
  destinatarioId: string;
  sedeDestinoId: string;
  propietarioCargaId: string;

  // Ruta
  rutaId: string;
  distanciaKm: number;
  tiempoEstimadoHrs: number;
  origenTransbordo?: string;
  lugarTransbordo?: string;
  lugarPagoFlete?: string;

  // Vehículo y conductor
  vehiculoId: string;
  remolqueId?: string;
  conductorPrincipalId: string;
  vehiculoSecundarioId?: string;
  remolqueSecundarioId?: string;
  conductorSecundarioId?: string;

  // Mercancía
  mercancia: Mercancia;

  // Contenedores - REM-1: For CONTENEDOR type operations
  contenedores?: Contenedor[];

  // Guías
  guias: Guia[];

  // Tiempos logísticos
  companiaParaCargue: Date;
  companiaParaDescargue: Date;
  pactoTiempos: boolean;
  tiempoTotalCargueHrs?: number;
  tiempoTotalDescargueHrs?: number;

  // Totales y comentarios
  comentarios?: string;
  informacionAdicional?: string;
  trayectosVacios?: number;

  // Estado y RNDC
  estado: DocumentState;
  radicadoRNDC?: string; // REM-1.11: Cannot modify after RNDC submission
  ingresoId?: number; // REM-1.27: For DBMUC export

  // Audit fields
  creadoPor: string;
  fechaCreacion: Date;
  modificadoPor?: string;
  fechaModificacion?: Date;
}

// Manifiesto (Manifest) interface - MAN-1
export interface Manifiesto {
  id: string;
  numero: string;
  fecha: Date;

  // Associates multiple remesas
  remesas: string[]; // Array of remesa IDs

  tipoOperacion: 'Ida y Regreso' | 'Multiparada' | 'Varios Viajes';

  // Vehículo y conductor
  vehiculoId: string;
  conductorId: string;

  // Anticipo
  anticipoId?: string;
  anticipoPorcentaje?: number; // MAN-1: Validates percentage limits

  // Estado
  estado: DocumentState;

  // Audit fields
  creadoPor: string;
  fechaCreacion: Date;
  modificadoPor?: string;
  fechaModificacion?: Date;
}

// Anticipo (Advance payment) interface - ANT-1
export interface Anticipo {
  id: string;
  numero: string;
  fecha: Date;
  manifiestoId: string;
  remesaId: string;
  monto: number;
  porcentaje: number;
  metodoPago: string;
  referencia?: string;
  observaciones?: string;

  // Audit fields
  creadoPor: string;
  fechaCreacion: Date;
}

// Cumplido (Completion) interface - CUM-1
export interface Cumplido {
  id: string;
  numero: string;
  fecha: Date;
  tipo: 'REMESA' | 'MANIFIESTO';

  // Reference to remesa or manifiesto
  remesaId?: string;
  manifiestoId?: string;

  // Logistics times - CUM-1
  // Loading (Cargue)
  fechaLlegadaCargue: Date;
  fechaIngresoCargue: Date;
  fechaSalidaCargue: Date;

  // Unloading (Descargue)
  fechaLlegadaDescargue: Date;
  fechaIngresoDescargue: Date;
  fechaSalidaDescargue: Date;

  // Document delivery - CUM-1.7
  fechaEntregaDocumentos: Date;

  // Estado
  estado: DocumentState;
  radicadoRemesas?: string[]; // CUM-1.5: All remesas must have radicado

  // ACUM-1.2: Linked to invoice or orden de pago
  facturaId?: string;
  ordenPagoId?: string;

  // Audit fields
  creadoPor: string;
  fechaCreacion: Date;
  anuladoPor?: string;
  fechaAnulacion?: Date;
}

// Corrección de Remesa (Shipment correction / novelty) interface - REM-2
// Registra una novedad/corrección sobre una remesa existente manteniendo
// trazabilidad (quién, cuándo, valor anterior → valor nuevo).
export interface CorreccionRemesa {
  id: string;
  numeroRegistro: number; // Consecutivo autogenerado
  remesaNumero: string;
  item?: number;
  tipoCambio: string; // Etiqueta legible, ej: 'Cambio de cita de cargue'
  campoAfectado: string; // Clave del campo, ej: 'citaCargue'
  motivoCambio?: string;
  valorAnterior: string;
  valorNuevo: string;
  observaciones?: string;
  usuario: string;
  fecha: Date;
}

// Ajuste a Monitoreo de Manifiesto (monitoring adjustment) interface - MAN-2
// Registra un ajuste sobre el monitoreo de un manifiesto (llegada/salida en un
// puesto de control) manteniendo trazabilidad (quién, cuándo, valores anterior → nuevo).
export interface AjusteMonitoreoManifiesto {
  id: string;
  numeroRegistro: number; // Consecutivo autogenerado
  manifiestoNumero: string;
  puestoControl: string; // Etiqueta legible del puesto de control
  motivoAjuste: string;
  llegadaAnterior: string;
  llegadaNueva: string;
  salidaAnterior: string;
  salidaNueva: string;
  observaciones?: string;
  usuario: string;
  fecha: Date;
}

// LogSys audit entry interface - PED-4
export interface LogSysEntry {
  id: string;
  tabla: string; // Table name
  registro: string; // Record ID
  operacion: 'INSERT' | 'UPDATE' | 'DELETE';
  usuario: string;
  fecha: Date;
  datosAnteriores?: string; // JSON
  datosNuevos?: string; // JSON
  ip?: string;
}

// User interface with permission levels
export interface User {
  id: string;
  nombre: string;
  email: string;
  nivel: UserLevel; // REM-1: Level 3 users have special permissions
}

// Form validation result
export interface ValidationResult {
  valid: boolean;
  errors: { [field: string]: string };
}
