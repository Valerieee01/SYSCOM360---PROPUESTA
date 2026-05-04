/**
 * Manifiesto-specific validations based on MAN-1 requirements
 */

import {
  isRequired,
  isPositiveNumber,
  validateAnticipoPorcentaje,
} from './validation';
import type { Manifiesto, ValidationResult } from '../types/transport';

// MAN-1: Validate consecutive number format
export function validateConsecutiveNumber(numero: string): boolean {
  // Format: MAN-YYYY-NNNNNN
  const pattern = /^MAN-\d{4}-\d{6}$/;
  return pattern.test(numero);
}

// MAN-1: Validate that at least one remesa is associated
export function validateRemesas(remesas: string[]): ValidationResult {
  const errors: { [field: string]: string } = {};

  if (!remesas || remesas.length === 0) {
    errors.remesas = 'El manifiesto debe asociar al menos una remesa';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

// MAN-1: Validate anticipo percentage limits
export function validateAnticipo(
  anticipoPorcentaje?: number,
  minimo: number = 0,
  maximo: number = 100
): ValidationResult {
  const errors: { [field: string]: string } = {};

  if (anticipoPorcentaje !== undefined && anticipoPorcentaje !== null) {
    if (!validateAnticipoPorcentaje(anticipoPorcentaje, minimo, maximo)) {
      errors.anticipoPorcentaje = `El porcentaje de anticipo debe estar entre ${minimo}% y ${maximo}%`;
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

// MAN-1: Validate operation type
export function validateOperationType(
  tipoOperacion: 'Ida y Regreso' | 'Multiparada' | 'Varios Viajes'
): ValidationResult {
  const errors: { [field: string]: string } = {};
  const validTypes = ['Ida y Regreso', 'Multiparada', 'Varios Viajes'];

  if (!validTypes.includes(tipoOperacion)) {
    errors.tipoOperacion = 'Tipo de operación inválido';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

// MAN-1: Validate that all remesas have radicado and IngresoID
// (for DBMUC export)
export function validateRemesasForExport(
  remesas: Array<{ radicado?: string; ingresoId?: number }>
): ValidationResult {
  const errors: { [field: string]: string } = {};

  remesas.forEach((remesa, index) => {
    if (!remesa.radicado) {
      errors[`remesa_${index}_radicado`] = `La remesa ${index + 1} debe tener número de radicado`;
    }
    if (remesa.ingresoId !== 1) {
      errors[`remesa_${index}_ingreso`] = `La remesa ${index + 1} debe tener IngresoID = 1 para exportar`;
    }
  });

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

// MAN-1: Complete Manifiesto validation
export function validateManifiesto(manifiesto: Partial<Manifiesto>): ValidationResult {
  const errors: { [field: string]: string } = {};

  // Basic fields
  if (!isRequired(manifiesto.fecha)) {
    errors.fecha = 'La fecha es requerida';
  }

  if (!isRequired(manifiesto.tipoOperacion)) {
    errors.tipoOperacion = 'El tipo de operación es requerido';
  }

  // Validate remesas
  const remesasValidation = validateRemesas(manifiesto.remesas || []);
  if (!remesasValidation.valid) {
    Object.assign(errors, remesasValidation.errors);
  }

  // Vehicle and driver
  if (!isRequired(manifiesto.vehiculoId)) {
    errors.vehiculoId = 'El vehículo es requerido';
  }

  if (!isRequired(manifiesto.conductorId)) {
    errors.conductorId = 'El conductor es requerido';
  }

  // Validate anticipo if present
  if (manifiesto.anticipoPorcentaje !== undefined) {
    const anticipoValidation = validateAnticipo(manifiesto.anticipoPorcentaje);
    if (!anticipoValidation.valid) {
      Object.assign(errors, anticipoValidation.errors);
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

// Generate next consecutive number for Manifiesto
export function generateConsecutiveNumber(year: number, lastNumber: number): string {
  const nextNumber = (lastNumber + 1).toString().padStart(6, '0');
  return `MAN-${year}-${nextNumber}`;
}
