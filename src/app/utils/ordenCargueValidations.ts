/**
 * Orden de Cargue specific validations based on ODC-1 requirements
 */

import {
  validateSOAT,
  validateTechnicalInspection,
  validateDriverLicense,
  validateDangerousCargoCertification,
  isRequired,
} from './validation';
import type { OrdenCargue, Vehiculo, Conductor, ValidationResult } from '../types/transport';

// ODC-1: Validate consecutive number format
export function validateConsecutiveNumber(numero: string): boolean {
  // Format: ODC-YYYY-NNNNNN or OC-YYYY-NNNNNN
  const pattern = /^O(D)?C-\d{4}-\d{6}$/;
  return pattern.test(numero);
}

// ODC-1.2: Validate vehicle SOAT
export function validateVehicleSOAT(vehiculo: Vehiculo): ValidationResult {
  const errors: { [field: string]: string } = {};

  if (!vehiculo.soatVencimiento) {
    errors.soat = 'La fecha de vencimiento del SOAT es requerida';
  } else if (!validateSOAT(vehiculo.soatVencimiento)) {
    errors.soat = 'El SOAT del vehículo está vencido';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

// ODC-1.3: Validate vehicle technical inspection
export function validateVehicleTechnicalInspection(vehiculo: Vehiculo): ValidationResult {
  const errors: { [field: string]: string } = {};

  if (!vehiculo.revisionTecnicaVencimiento) {
    errors.revisionTecnica = 'La fecha de vencimiento de la revisión técnica es requerida';
  } else if (!validateTechnicalInspection(vehiculo.revisionTecnicaVencimiento)) {
    errors.revisionTecnica = 'La revisión técnica del vehículo está vencida';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

// ODC-1.4: Validate driver license
export function validateConductorLicense(conductor: Conductor): ValidationResult {
  const errors: { [field: string]: string } = {};

  if (!conductor.licenciaVencimiento) {
    errors.licencia = 'La fecha de vencimiento de la licencia es requerida';
  } else if (!validateDriverLicense(conductor.licenciaVencimiento)) {
    errors.licencia = 'La licencia del conductor está vencida';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

// ODC-1.4: Validate dangerous cargo certification for driver
export function validateConductorDangerousCargoCert(
  conductor: Conductor,
  isDangerousCargo: boolean
): ValidationResult {
  const errors: { [field: string]: string } = {};

  if (!validateDangerousCargoCertification(
    isDangerousCargo,
    conductor.certificacionCargaPeligrosaVencimiento || null
  )) {
    errors.certificacionCargaPeligrosa =
      'El conductor debe tener certificación vigente de curso de carga peligrosa';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

// ODC-1: Complete vehicle validation
export function validateVehiculo(vehiculo: Vehiculo): ValidationResult {
  const errors: { [field: string]: string } = {};

  if (!isRequired(vehiculo.placa)) {
    errors.placa = 'La placa del vehículo es requerida';
  }

  if (!isRequired(vehiculo.tipo)) {
    errors.tipo = 'El tipo de vehículo es requerido';
  }

  // Validate SOAT
  const soatValidation = validateVehicleSOAT(vehiculo);
  if (!soatValidation.valid) {
    Object.assign(errors, soatValidation.errors);
  }

  // Validate technical inspection
  const technicalValidation = validateVehicleTechnicalInspection(vehiculo);
  if (!technicalValidation.valid) {
    Object.assign(errors, technicalValidation.errors);
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

// ODC-1: Complete driver validation
export function validateConductor(conductor: Conductor, isDangerousCargo: boolean): ValidationResult {
  const errors: { [field: string]: string } = {};

  if (!isRequired(conductor.nombre)) {
    errors.nombre = 'El nombre del conductor es requerido';
  }

  if (!isRequired(conductor.documento)) {
    errors.documento = 'El documento del conductor es requerido';
  }

  if (!isRequired(conductor.telefono)) {
    errors.telefono = 'El teléfono del conductor es requerido';
  }

  // Validate license
  const licenseValidation = validateConductorLicense(conductor);
  if (!licenseValidation.valid) {
    Object.assign(errors, licenseValidation.errors);
  }

  // Validate dangerous cargo certification if applicable
  if (isDangerousCargo) {
    const certValidation = validateConductorDangerousCargoCert(conductor, isDangerousCargo);
    if (!certValidation.valid) {
      Object.assign(errors, certValidation.errors);
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

// ODC-1: Complete Orden de Cargue validation
export function validateOrdenCargue(orden: Partial<OrdenCargue>): ValidationResult {
  const errors: { [field: string]: string } = {};

  // Basic pedido fields (inherited)
  if (!isRequired(orden.compania)) {
    errors.compania = 'La compañía es requerida';
  }

  if (!isRequired(orden.tipoOperacion)) {
    errors.tipoOperacion = 'El tipo de operación es requerido';
  }

  // Terceros
  if (!isRequired(orden.remitenteId)) {
    errors.remitenteId = 'El remitente es requerido';
  }

  if (!isRequired(orden.destinatarioId)) {
    errors.destinatarioId = 'El destinatario es requerido';
  }

  // Vehicle and driver (specific to Orden de Cargue)
  if (!isRequired(orden.vehiculoId)) {
    errors.vehiculoId = 'El vehículo es requerido';
  }

  if (!isRequired(orden.conductorPrincipalId)) {
    errors.conductorPrincipalId = 'El conductor principal es requerido';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

// Generate next consecutive number for Orden de Cargue
export function generateConsecutiveNumber(year: number, lastNumber: number): string {
  const nextNumber = (lastNumber + 1).toString().padStart(6, '0');
  return `OC-${year}-${nextNumber}`;
}
