/**
 * Cumplido-specific validations based on CUM-1 requirements
 */

import {
  validateFechaEntregaDocumentos,
  isRequired,
} from './validation';
import type { Cumplido, ValidationResult } from '../types/transport';

// CUM-1: Validate consecutive number format
export function validateConsecutiveNumber(numero: string): boolean {
  // Format: CUM-YYYY-NNNNNN
  const pattern = /^CUM-\d{4}-\d{6}$/;
  return pattern.test(numero);
}

// CUM-1: Validate logistics times sequence
export function validateLogisticsTimeSequence(cumplido: Partial<Cumplido>): ValidationResult {
  const errors: { [field: string]: string } = {};

  // Cargue sequence: Llegada -> Ingreso -> Salida
  if (cumplido.fechaLlegadaCargue && cumplido.fechaIngresoCargue) {
    if (cumplido.fechaIngresoCargue < cumplido.fechaLlegadaCargue) {
      errors.fechaIngresoCargue = 'El ingreso a cargue no puede ser antes de la llegada';
    }
  }

  if (cumplido.fechaIngresoCargue && cumplido.fechaSalidaCargue) {
    if (cumplido.fechaSalidaCargue < cumplido.fechaIngresoCargue) {
      errors.fechaSalidaCargue = 'La salida de cargue no puede ser antes del ingreso';
    }
  }

  // Descargue sequence: Llegada -> Ingreso -> Salida
  if (cumplido.fechaLlegadaDescargue && cumplido.fechaIngresoDescargue) {
    if (cumplido.fechaIngresoDescargue < cumplido.fechaLlegadaDescargue) {
      errors.fechaIngresoDescargue = 'El ingreso a descargue no puede ser antes de la llegada';
    }
  }

  if (cumplido.fechaIngresoDescargue && cumplido.fechaSalidaDescargue) {
    if (cumplido.fechaSalidaDescargue < cumplido.fechaIngresoDescargue) {
      errors.fechaSalidaDescargue = 'La salida de descargue no puede ser antes del ingreso';
    }
  }

  // Descargue should be after cargue
  if (cumplido.fechaSalidaCargue && cumplido.fechaLlegadaDescargue) {
    if (cumplido.fechaLlegadaDescargue < cumplido.fechaSalidaCargue) {
      errors.fechaLlegadaDescargue = 'La llegada a descargue no puede ser antes de la salida de cargue';
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

// CUM-1.7: Validate fecha entrega documentos
export function validateDocumentDeliveryDate(
  fechaCumplido: Date,
  fechaEntrega: Date
): ValidationResult {
  const errors: { [field: string]: string } = {};

  const validation = validateFechaEntregaDocumentos(fechaCumplido, fechaEntrega);

  if (!validation.valid && validation.error) {
    errors.fechaEntregaDocumentos = validation.error;
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

// CUM-1.5: Validate that all remesas have radicado number
export function validateRemesasRadicado(radicadoRemesas?: string[]): ValidationResult {
  const errors: { [field: string]: string } = {};

  if (!radicadoRemesas || radicadoRemesas.length === 0) {
    errors.radicadoRemesas = 'Todas las remesas deben tener número de radicado';
  } else {
    radicadoRemesas.forEach((radicado, index) => {
      if (!radicado || radicado.trim() === '') {
        errors[`radicado_${index}`] = `La remesa ${index + 1} no tiene número de radicado`;
      }
    });
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

// ACUM-1.2: Validate that cumplido can be cancelled
// Cannot cancel if linked to invoice or orden de pago
export function canCancelCumplido(
  facturaId?: string,
  ordenPagoId?: string
): ValidationResult {
  const errors: { [field: string]: string } = {};

  if (facturaId) {
    errors.anulacion = 'No se puede anular el cumplido porque está vinculado a una factura';
  }

  if (ordenPagoId) {
    errors.anulacion = 'No se puede anular el cumplido porque está vinculado a una orden de pago';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

// CUM-1: Complete Cumplido validation
export function validateCumplido(cumplido: Partial<Cumplido>): ValidationResult {
  const errors: { [field: string]: string } = {};

  // Basic fields
  if (!isRequired(cumplido.fecha)) {
    errors.fecha = 'La fecha es requerida';
  }

  if (!isRequired(cumplido.tipo)) {
    errors.tipo = 'El tipo de cumplido es requerido (REMESA o MANIFIESTO)';
  }

  // Validate reference
  if (cumplido.tipo === 'REMESA' && !isRequired(cumplido.remesaId)) {
    errors.remesaId = 'El ID de la remesa es requerido para cumplidos de tipo REMESA';
  }

  if (cumplido.tipo === 'MANIFIESTO' && !isRequired(cumplido.manifiestoId)) {
    errors.manifiestoId = 'El ID del manifiesto es requerido para cumplidos de tipo MANIFIESTO';
  }

  // Validate logistics times
  if (!isRequired(cumplido.fechaLlegadaCargue)) {
    errors.fechaLlegadaCargue = 'La fecha de llegada a cargue es requerida';
  }

  if (!isRequired(cumplido.fechaIngresoCargue)) {
    errors.fechaIngresoCargue = 'La fecha de ingreso a cargue es requerida';
  }

  if (!isRequired(cumplido.fechaSalidaCargue)) {
    errors.fechaSalidaCargue = 'La fecha de salida de cargue es requerida';
  }

  if (!isRequired(cumplido.fechaLlegadaDescargue)) {
    errors.fechaLlegadaDescargue = 'La fecha de llegada a descargue es requerida';
  }

  if (!isRequired(cumplido.fechaIngresoDescargue)) {
    errors.fechaIngresoDescargue = 'La fecha de ingreso a descargue es requerida';
  }

  if (!isRequired(cumplido.fechaSalidaDescargue)) {
    errors.fechaSalidaDescargue = 'La fecha de salida de descargue es requerida';
  }

  if (!isRequired(cumplido.fechaEntregaDocumentos)) {
    errors.fechaEntregaDocumentos = 'La fecha de entrega de documentos es requerida';
  }

  // Validate time sequence
  const sequenceValidation = validateLogisticsTimeSequence(cumplido);
  if (!sequenceValidation.valid) {
    Object.assign(errors, sequenceValidation.errors);
  }

  // Validate document delivery date
  if (cumplido.fecha && cumplido.fechaEntregaDocumentos) {
    const deliveryValidation = validateDocumentDeliveryDate(
      cumplido.fecha,
      cumplido.fechaEntregaDocumentos
    );
    if (!deliveryValidation.valid) {
      Object.assign(errors, deliveryValidation.errors);
    }
  }

  // Validate radicado remesas
  if (cumplido.tipo === 'MANIFIESTO') {
    const radicadoValidation = validateRemesasRadicado(cumplido.radicadoRemesas);
    if (!radicadoValidation.valid) {
      Object.assign(errors, radicadoValidation.errors);
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

// Generate next consecutive number for Cumplido
export function generateConsecutiveNumber(year: number, lastNumber: number): string {
  const nextNumber = (lastNumber + 1).toString().padStart(6, '0');
  return `CUM-${year}-${nextNumber}`;
}
