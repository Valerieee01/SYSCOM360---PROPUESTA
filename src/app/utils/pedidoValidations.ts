/**
 * Pedido-specific validations based on PED-1 requirements
 */

import {
  validatePhone,
  validateCoordinates,
  validateDifferentAddresses,
  validateUNCode,
  validateNIT,
  isRequired,
  isPositiveNumber,
} from './validation';
import type { Pedido, Tercero, OperationType, ValidationResult } from '../types/transport';

// PED-1: Validate consecutive number format
export function validateConsecutiveNumber(numero: string): boolean {
  // Format: PED-YYYY-NNNNNN
  const pattern = /^PED-\d{4}-\d{6}$/;
  return pattern.test(numero);
}

// PED-1.1: Validate operation type
export function validateOperationType(tipo: OperationType): boolean {
  const validTypes: OperationType[] = ['GENERAL', 'MCIACONSOL', 'CONTENEDOR', 'CONT_VACIO'];
  return validTypes.includes(tipo);
}

// PED-1.2: Validate Tercero (complete validation)
export function validateTercero(tercero: Tercero): ValidationResult {
  const errors: { [field: string]: string } = {};

  // Nombre is required
  if (!isRequired(tercero.nombre)) {
    errors.nombre = 'El nombre del tercero es requerido';
  }

  // NIT is required and must be valid
  if (!isRequired(tercero.nit)) {
    errors.nit = 'El NIT es requerido';
  } else if (!validateNIT(tercero.nit)) {
    errors.nit = 'El NIT debe tener entre 6 y 10 dígitos';
  }

  // Phone is required and must be at least 10 digits
  if (!isRequired(tercero.telefono)) {
    errors.telefono = 'El teléfono es requerido';
  } else if (!validatePhone(tercero.telefono)) {
    errors.telefono = 'El teléfono debe tener al menos 10 dígitos';
  }

  // Address is required
  if (!isRequired(tercero.direccion)) {
    errors.direccion = 'La dirección es requerida';
  }

  // City and department are required
  if (!isRequired(tercero.ciudad)) {
    errors.ciudad = 'La ciudad es requerida';
  }

  if (!isRequired(tercero.departamento)) {
    errors.departamento = 'El departamento es requerido';
  }

  // Coordinates are required - PED-1.2
  if (!validateCoordinates(tercero.latitud, tercero.longitud)) {
    errors.coordenadas = 'Las coordenadas son requeridas y deben ser válidas para Colombia';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

// PED-1.2: Validate that origin and destination addresses are different
export function validateOriginDestinationAddresses(
  direccionOrigen: string,
  direccionDestino: string
): ValidationResult {
  const errors: { [field: string]: string } = {};

  if (!validateDifferentAddresses(direccionOrigen, direccionDestino)) {
    errors.direcciones = 'Las direcciones de origen y destino deben ser diferentes';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

// PED-1.3: Validate merchandise/product information
export function validateMercancia(
  descripcion: string,
  peso: number,
  operationType: OperationType
): ValidationResult {
  const errors: { [field: string]: string } = {};

  if (!isRequired(descripcion)) {
    errors.descripcion = 'La descripción de la mercancía es requerida';
  }

  if (!isPositiveNumber(peso)) {
    errors.peso = 'El peso debe ser un número positivo';
  }

  // For CONTENEDOR and CONT_VACIO types, additional validations may apply
  if (operationType === 'CONTENEDOR' || operationType === 'CONT_VACIO') {
    // Container-specific validations would go here
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

// PED-1.4: Validate dangerous cargo information
export function validateDangerousCargo(
  isDangerous: boolean,
  unCode?: string,
  chapter?: string,
  partition?: string,
  productState?: string,
  packagingGroup?: string
): ValidationResult {
  const errors: { [field: string]: string } = {};

  if (!isDangerous) {
    return { valid: true, errors: {} };
  }

  // If dangerous cargo is enabled, UN code is required
  if (!isRequired(unCode)) {
    errors.unCode = 'El código UN es requerido para carga peligrosa';
  } else if (!validateUNCode(unCode!)) {
    errors.unCode = 'El código UN debe tener el formato UN#### (4 dígitos)';
  }

  // Chapter is required for dangerous cargo
  if (!isRequired(chapter)) {
    errors.chapter = 'El capítulo es requerido para carga peligrosa';
  }

  // Partition is required for dangerous cargo
  if (!isRequired(partition)) {
    errors.partition = 'La partición es requerida para carga peligrosa';
  }

  // Product state is required for dangerous cargo
  if (!isRequired(productState)) {
    errors.productState = 'El estado del producto es requerido para carga peligrosa';
  }

  // Packaging group is required for dangerous cargo
  if (!isRequired(packagingGroup)) {
    errors.packagingGroup = 'El grupo de embalaje es requerido para carga peligrosa';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

// PED-1: Complete Pedido validation
export function validatePedido(pedido: Partial<Pedido>): ValidationResult {
  const errors: { [field: string]: string } = {};

  // Basic fields
  if (!isRequired(pedido.compania)) {
    errors.compania = 'La compañía es requerida';
  }

  if (!isRequired(pedido.tipoOperacion)) {
    errors.tipoOperacion = 'El tipo de operación es requerido';
  } else if (!validateOperationType(pedido.tipoOperacion!)) {
    errors.tipoOperacion = 'Tipo de operación inválido. Debe ser: GENERAL, MCIACONSOL, CONTENEDOR o CONT_VACIO';
  }

  if (!isRequired(pedido.tipoServicio)) {
    errors.tipoServicio = 'El tipo de servicio es requerido';
  }

  // Terceros
  if (!isRequired(pedido.remitenteId)) {
    errors.remitenteId = 'El remitente es requerido';
  }

  if (!isRequired(pedido.sedeOrigenId)) {
    errors.sedeOrigenId = 'La sede de origen es requerida';
  }

  if (!isRequired(pedido.destinatarioId)) {
    errors.destinatarioId = 'El destinatario es requerido';
  }

  if (!isRequired(pedido.sedeDestinoId)) {
    errors.sedeDestinoId = 'La sede de destino es requerida';
  }

  if (!isRequired(pedido.propietarioCargaId)) {
    errors.propietarioCargaId = 'El propietario de la carga es requerido';
  }

  // Logistics
  if (!isPositiveNumber(pedido.cantidad || 0)) {
    errors.cantidad = 'La cantidad debe ser un número positivo';
  }

  if (!isPositiveNumber(pedido.peso || 0)) {
    errors.peso = 'El peso debe ser un número positivo';
  }

  // Priority
  if (!isRequired(pedido.prioridad)) {
    errors.prioridad = 'La prioridad es requerida';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

// Generate next consecutive number for Pedido
export function generateConsecutiveNumber(year: number, lastNumber: number): string {
  const nextNumber = (lastNumber + 1).toString().padStart(6, '0');
  return `PED-${year}-${nextNumber}`;
}
