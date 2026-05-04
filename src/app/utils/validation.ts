/**
 * Validation utilities for transport module
 * Based on RequerimientosFuncionalesTransporte.pdf specifications
 */

// PED-1.2: Tercero validation - Phone must be at least 10 digits
export function validatePhone(phone: string): boolean {
  const digitsOnly = phone.replace(/\D/g, '');
  return digitsOnly.length >= 10;
}

// PED-1.2: Tercero validation - Coordinates are required
export function validateCoordinates(lat: string | number, lng: string | number): boolean {
  const latitude = typeof lat === 'string' ? parseFloat(lat) : lat;
  const longitude = typeof lng === 'string' ? parseFloat(lng) : lng;

  if (isNaN(latitude) || isNaN(longitude)) return false;

  // Basic coordinate ranges for Colombia
  // Latitude: approximately -4 to 13 degrees
  // Longitude: approximately -82 to -66 degrees
  return latitude >= -4 && latitude <= 13 && longitude >= -82 && longitude <= -66;
}

// PED-1.2: Tercero validation - Addresses must be different
export function validateDifferentAddresses(address1: string, address2: string): boolean {
  if (!address1 || !address2) return false;
  return address1.trim().toLowerCase() !== address2.trim().toLowerCase();
}

// REM-1: Route type validation based on municipalities
export function determineRouteType(
  originMunicipality: string,
  destinationMunicipality: string
): 'INTERURBANO' | 'REMESA_MUNICIPAL' | 'LOCAL' {
  const origin = originMunicipality.trim().toLowerCase();
  const destination = destinationMunicipality.trim().toLowerCase();

  if (origin === destination) {
    return 'REMESA_MUNICIPAL'; // Same municipality
  }

  // For now, classify all different municipalities as INTERURBANO
  // LOCAL would require additional business logic
  return 'INTERURBANO';
}

// ODC-1.2: SOAT validation - must be current
export function validateSOAT(expirationDate: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return expirationDate >= today;
}

// ODC-1.3: Technical inspection validation - must be current
export function validateTechnicalInspection(expirationDate: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return expirationDate >= today;
}

// ODC-1.4: Driver license validation - must be valid
export function validateDriverLicense(expirationDate: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return expirationDate >= today;
}

// ODC-1.4: Dangerous cargo certification validation
export function validateDangerousCargoCertification(
  isDangerousCargo: boolean,
  certificationDate: Date | null
): boolean {
  if (!isDangerousCargo) return true;

  if (!certificationDate) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return certificationDate >= today;
}

// PED-1.4: UN code validation for dangerous cargo
export function validateUNCode(unCode: string): boolean {
  // UN codes are typically 4 digits (UN####)
  const unPattern = /^UN\d{4}$/i;
  return unPattern.test(unCode.trim());
}

// CUM-1.7: Fecha entrega documentos validation
// Must not be before cumplido date and not more than 1 day in future
export function validateFechaEntregaDocumentos(
  fechaCumplido: Date,
  fechaEntrega: Date
): { valid: boolean; error?: string } {
  const cumplido = new Date(fechaCumplido);
  cumplido.setHours(0, 0, 0, 0);

  const entrega = new Date(fechaEntrega);
  entrega.setHours(0, 0, 0, 0);

  if (entrega < cumplido) {
    return {
      valid: false,
      error: 'La fecha de entrega de documentos no puede ser anterior a la fecha del cumplido'
    };
  }

  const maxDate = new Date(cumplido);
  maxDate.setDate(maxDate.getDate() + 1);

  if (entrega > maxDate) {
    return {
      valid: false,
      error: 'La fecha de entrega de documentos no puede ser más de 1 día después del cumplido'
    };
  }

  return { valid: true };
}

// NIT/ID validation - Colombian format
export function validateNIT(nit: string): boolean {
  if (!nit) return false;
  const digitsOnly = nit.replace(/\D/g, '');
  return digitsOnly.length >= 6 && digitsOnly.length <= 10;
}

// Email validation
export function validateEmail(email: string): boolean {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email.trim());
}

// Percentage validation for anticipo limits
export function validateAnticipoPorcentaje(
  porcentaje: number,
  minimo: number = 0,
  maximo: number = 100
): boolean {
  return porcentaje >= minimo && porcentaje <= maximo;
}

// General required field validation
export function isRequired(value: any): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (typeof value === 'number') return !isNaN(value);
  if (Array.isArray(value)) return value.length > 0;
  return true;
}

// Validate positive number
export function isPositiveNumber(value: number): boolean {
  return !isNaN(value) && value > 0;
}

// Validate non-negative number
export function isNonNegativeNumber(value: number): boolean {
  return !isNaN(value) && value >= 0;
}

// Client arrears validation (for level 3 permission override)
export function hasClientArrears(clientId: string): boolean {
  // This would typically check against a database
  // Placeholder implementation
  return false;
}

// Validate that rate is not zero (unless overridden by level 3 user)
export function validateNonZeroRate(rate: number, userLevel: number): boolean {
  if (userLevel >= 3) return true; // Level 3 users can save with zero rates
  return rate > 0;
}
