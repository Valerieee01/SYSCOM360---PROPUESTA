/**
 * Remesa-specific validations based on REM-1 requirements
 */

import {
  validatePhone,
  validateCoordinates,
  validateNIT,
  isRequired,
  isPositiveNumber,
  validateNonZeroRate,
} from './validation';
import type { Remesa, RouteType, ValidationResult, UserLevel } from '../types/transport';

// REM-1: Validate consecutive number format
export function validateConsecutiveNumber(numero: string): boolean {
  // Format: REM-YYYY-NNNNNN
  const pattern = /^REM-\d{4}-\d{6}$/;
  return pattern.test(numero);
}

// REM-1: Validate route type based on municipalities
export function validateRouteType(
  origenMunicipio: string,
  destinoMunicipio: string,
  routeType: RouteType
): ValidationResult {
  const errors: { [field: string]: string } = {};

  const origen = origenMunicipio.trim().toLowerCase();
  const destino = destinoMunicipio.trim().toLowerCase();

  if (routeType === 'INTERURBANO') {
    // For INTERURBANO, municipalities must be different
    if (origen === destino) {
      errors.tipoRuta = 'Para tipo INTERURBANO, los municipios deben ser diferentes';
    }
  } else if (routeType === 'REMESA_MUNICIPAL') {
    // For REMESA_MUNICIPAL, municipalities must be the same
    if (origen !== destino) {
      errors.tipoRuta = 'Para tipo REMESA_MUNICIPAL, los municipios deben ser iguales';
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

// REM-1.11: Cannot modify if already submitted to RNDC
export function canModifyRemesa(radicadoRNDC?: string): ValidationResult {
  const errors: { [field: string]: string } = {};

  if (radicadoRNDC) {
    errors.modificacion = 'No se puede modificar la remesa después de radicarla en el RNDC';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

// REM-1: Validate that LOCAL type doesn't export to DBMUC/RNDC
export function shouldExportToRNDC(tipoRuta: RouteType): boolean {
  return tipoRuta !== 'LOCAL';
}

// REM-1: Level 3 user permission validations
export function validateLevel3Permissions(
  userLevel: UserLevel,
  action: 'MODIFY_CONDUCTOR' | 'MODIFY_RATES' | 'ALLOW_EXPIRED_DOCS' | 'ALLOW_CLIENT_ARREARS' | 'SAVE_ZERO_RATES'
): boolean {
  return userLevel >= 3;
}

// REM-1: Validate rates (must be non-zero unless level 3 user)
export function validateRates(
  tarifaTabla: number,
  valorCobro: number,
  userLevel: UserLevel
): ValidationResult {
  const errors: { [field: string]: string } = {};

  if (!validateNonZeroRate(tarifaTabla, userLevel)) {
    errors.tarifaTabla = 'La tarifa tabla debe ser mayor a cero (solo usuarios nivel 3 pueden guardar con tarifa cero)';
  }

  if (!validateNonZeroRate(valorCobro, userLevel)) {
    errors.valorCobro = 'El valor de cobro debe ser mayor a cero (solo usuarios nivel 3 pueden guardar con valor cero)';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

// REM-1: Validate guías (at least one is required)
export function validateGuias(guias: Array<{ numero: string }>): ValidationResult {
  const errors: { [field: string]: string } = {};

  if (!guias || guias.length === 0) {
    errors.guias = 'Debe agregar al menos una guía de transporte';
  }

  // Validate each guía has a number
  guias.forEach((guia, index) => {
    if (!isRequired(guia.numero)) {
      errors[`guia_${index}`] = `La guía ${index + 1} debe tener un número`;
    }
  });

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

// REM-1: Validate contenedores (for CONTENEDOR operation type)
export function validateContenedores(
  contenedores: Array<{ tipo: string; numero: string; tipoPrecinto: string }>,
  tipoOperacion: string
): ValidationResult {
  const errors: { [field: string]: string } = {};

  if (tipoOperacion === 'CONTENEDOR' || tipoOperacion === 'CONT_VACIO') {
    if (!contenedores || contenedores.length === 0) {
      errors.contenedores = 'Para operaciones de tipo CONTENEDOR o CONT_VACIO debe agregar al menos un contenedor';
    }

    // Validate each contenedor
    contenedores.forEach((contenedor, index) => {
      if (!isRequired(contenedor.tipo)) {
        errors[`contenedor_tipo_${index}`] = `El contenedor ${index + 1} debe tener un tipo`;
      }
      if (!isRequired(contenedor.numero)) {
        errors[`contenedor_numero_${index}`] = `El contenedor ${index + 1} debe tener un número`;
      }
      if (!isRequired(contenedor.tipoPrecinto)) {
        errors[`contenedor_precinto_${index}`] = `El contenedor ${index + 1} debe tener un tipo de precinto`;
      }
    });
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

// REM-1: Validate logistics times
export function validateLogisticsTimes(
  companiaParaCargue: Date,
  companiaParaDescargue: Date,
  pactoTiempos: boolean,
  tiempoTotalCargueHrs?: number,
  tiempoTotalDescargueHrs?: number
): ValidationResult {
  const errors: { [field: string]: string } = {};

  if (!companiaParaCargue) {
    errors.companiaParaCargue = 'La fecha/hora de compañía para cargue es requerida';
  }

  if (!companiaParaDescargue) {
    errors.companiaParaDescargue = 'La fecha/hora de compañía para descargue es requerida';
  }

  if (companiaParaCargue && companiaParaDescargue) {
    if (companiaParaDescargue <= companiaParaCargue) {
      errors.companiaParaDescargue = 'La fecha de descargue debe ser posterior a la de cargue';
    }
  }

  if (pactoTiempos) {
    if (!tiempoTotalCargueHrs || !isPositiveNumber(tiempoTotalCargueHrs)) {
      errors.tiempoTotalCargueHrs = 'Si se pactaron tiempos, debe especificar el tiempo total de cargue';
    }
    if (!tiempoTotalDescargueHrs || !isPositiveNumber(tiempoTotalDescargueHrs)) {
      errors.tiempoTotalDescargueHrs = 'Si se pactaron tiempos, debe especificar el tiempo total de descargue';
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

// REM-1: Complete Remesa validation
export function validateRemesa(remesa: Partial<Remesa>, userLevel: UserLevel): ValidationResult {
  const errors: { [field: string]: string } = {};

  // Basic fields
  if (!isRequired(remesa.compania)) {
    errors.compania = 'La compañía es requerida';
  }

  if (!isRequired(remesa.tipoRemesa)) {
    errors.tipoRemesa = 'El tipo de remesa es requerido';
  }

  if (!isRequired(remesa.tipoOperacion)) {
    errors.tipoOperacion = 'El tipo de operación es requerido';
  }

  // Terceros
  if (!isRequired(remesa.remitenteId)) {
    errors.remitenteId = 'El remitente es requerido';
  }

  if (!isRequired(remesa.sedeOrigenId)) {
    errors.sedeOrigenId = 'La sede de origen es requerida';
  }

  if (!isRequired(remesa.destinatarioId)) {
    errors.destinatarioId = 'El destinatario es requerido';
  }

  if (!isRequired(remesa.sedeDestinoId)) {
    errors.sedeDestinoId = 'La sede de destino es requerida';
  }

  // Ruta
  if (!isRequired(remesa.rutaId)) {
    errors.rutaId = 'La ruta es requerida';
  }

  // Vehículo y conductor
  if (!isRequired(remesa.vehiculoId)) {
    errors.vehiculoId = 'El vehículo es requerido';
  }

  if (!isRequired(remesa.conductorPrincipalId)) {
    errors.conductorPrincipalId = 'El conductor principal es requerido';
  }

  // Mercancía
  if (!remesa.mercancia) {
    errors.mercancia = 'La información de mercancía es requerida';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

// Generate next consecutive number for Remesa
export function generateConsecutiveNumber(year: number, lastNumber: number): string {
  const nextNumber = (lastNumber + 1).toString().padStart(6, '0');
  return `REM-${year}-${nextNumber}`;
}
