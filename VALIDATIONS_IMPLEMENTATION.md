# Transport Module Validations Implementation

This document describes the validation system implemented for the Syscom web transport module, based on the requirements from `RequerimientosFuncionalesTransporte.pdf`.

## Overview

The validation system provides comprehensive validation for all transport documents:
- **Pedido** (PED-1)
- **Orden de Cargue** (ODC-1)
- **Remesa** (REM-1)
- **Manifiesto** (MAN-1)
- **Cumplido** (CUM-1)
- **Anticipo** (ANT-1)

## File Structure

```
src/app/
├── types/
│   ├── transport.ts          # TypeScript type definitions
│   └── index.ts              # Type exports
├── utils/
│   ├── validation.ts         # General validation functions
│   ├── pedidoValidations.ts  # Pedido-specific validations
│   ├── ordenCargueValidations.ts  # Orden de Cargue validations
│   ├── remesaValidations.ts  # Remesa-specific validations
│   ├── manifiestoValidations.ts   # Manifiesto validations
│   ├── cumplidoValidations.ts     # Cumplido validations
│   ├── auditLog.ts           # Audit logging (PED-4)
│   ├── databaseExport.ts     # DBMUC/RNDC export utilities
│   └── index.ts              # Utility exports
```

## Key Features

### 1. Type Safety (TypeScript)

All transport entities have strongly-typed interfaces:
- `Pedido`, `OrdenCargue`, `Remesa`, `Manifiesto`, `Cumplido`, `Anticipo`
- `Tercero`, `Sede`, `Vehiculo`, `Conductor`
- `Mercancia`, `DangerousCargo`, `Guia`, `Contenedor`
- `LogSysEntry` (for audit trail)

### 2. Validation Functions

#### General Validations (`validation.ts`)
- `validatePhone()` - PED-1.2: Phone must be ≥10 digits
- `validateCoordinates()` - PED-1.2: Geographic coordinates required
- `validateDifferentAddresses()` - PED-1.2: Origin/destination must differ
- `validateSOAT()` - ODC-1.2: SOAT must be current
- `validateTechnicalInspection()` - ODC-1.3: Tech inspection must be current
- `validateDriverLicense()` - ODC-1.4: Driver license must be valid
- `validateDangerousCargoCertification()` - ODC-1.4: Dangerous cargo cert
- `validateUNCode()` - PED-1.4: UN code format (UN####)
- `validateFechaEntregaDocumentos()` - CUM-1.7: Document delivery date
- `validateNIT()` - Colombian NIT format
- `determineRouteType()` - REM-1: INTERURBANO, REMESA_MUNICIPAL, or LOCAL

#### Pedido Validations (`pedidoValidations.ts`)
- `validateConsecutiveNumber()` - PED-1: Format PED-YYYY-NNNNNN
- `validateOperationType()` - PED-1.1: GENERAL, MCIACONSOL, CONTENEDOR, CONT_VACIO
- `validateTercero()` - PED-1.2: Complete third-party validation
- `validateOriginDestinationAddresses()` - PED-1.2: Different addresses
- `validateMercancia()` - PED-1.3: Merchandise information
- `validateDangerousCargo()` - PED-1.4: Dangerous cargo fields
- `validatePedido()` - Complete pedido validation
- `generateConsecutiveNumber()` - Generate next pedido number

#### Orden de Cargue Validations (`ordenCargueValidations.ts`)
- `validateConsecutiveNumber()` - ODC-1: Format OC-YYYY-NNNNNN
- `validateVehicleSOAT()` - ODC-1.2: Vehicle SOAT validation
- `validateVehicleTechnicalInspection()` - ODC-1.3: Technical inspection
- `validateConductorLicense()` - ODC-1.4: Driver license validation
- `validateConductorDangerousCargoCert()` - ODC-1.4: Dangerous cargo cert
- `validateVehiculo()` - Complete vehicle validation
- `validateConductor()` - Complete driver validation
- `validateOrdenCargue()` - Complete orden de cargue validation

#### Remesa Validations (`remesaValidations.ts`)
- `validateConsecutiveNumber()` - REM-1: Format REM-YYYY-NNNNNN
- `validateRouteType()` - REM-1: Route type based on municipalities
- `canModifyRemesa()` - REM-1.11: Cannot modify after RNDC submission
- `shouldExportToRNDC()` - REM-1: LOCAL type doesn't export
- `validateLevel3Permissions()` - REM-1: Level 3 user permissions
- `validateRates()` - REM-1: Non-zero rates (unless level 3)
- `validateGuias()` - REM-1: At least one guide required
- `validateContenedores()` - REM-1: Container validation for CONTENEDOR types
- `validateLogisticsTimes()` - REM-1: Logistics time validation
- `validateRemesa()` - Complete remesa validation

#### Manifiesto Validations (`manifiestoValidations.ts`)
- `validateConsecutiveNumber()` - MAN-1: Format MAN-YYYY-NNNNNN
- `validateRemesas()` - MAN-1: At least one remesa required
- `validateAnticipo()` - MAN-1: Anticipo percentage limits
- `validateOperationType()` - MAN-1: Ida y Regreso, Multiparada, Varios Viajes
- `validateRemesasForExport()` - MAN-1: Remesas must have radicado & IngresoID=1
- `validateManifiesto()` - Complete manifiesto validation

#### Cumplido Validations (`cumplidoValidations.ts`)
- `validateConsecutiveNumber()` - CUM-1: Format CUM-YYYY-NNNNNN
- `validateLogisticsTimeSequence()` - CUM-1: Time sequence validation
- `validateDocumentDeliveryDate()` - CUM-1.7: Document delivery date rules
- `validateRemesasRadicado()` - CUM-1.5: All remesas must have radicado
- `canCancelCumplido()` - ACUM-1.2: Cannot cancel if linked to invoice/orden pago
- `validateCumplido()` - Complete cumplido validation

### 3. Audit Logging (`auditLog.ts`)

Implements PED-4 requirement for audit trail to LogSys table:
- `logInsert()` - Log INSERT operations
- `logUpdate()` - Log UPDATE operations
- `logDelete()` - Log DELETE operations
- `createAuditLog()` - Create audit log entry
- `getAuditLog()` - Retrieve audit logs for a record
- `detectChanges()` - Detect changes between old and new data

### 4. Database Export (`databaseExport.ts`)

Implements REM-1 and MAN-1 export requirements:
- `shouldExportRemesa()` - Determine if remesa should export to DBMUC/RNDC
- `exportRemesaToDBMUC()` - Export remesa to DBMUC database
- `generateRNDCXML()` - Generate XML for RNDC submission
- `submitToRNDC()` - Submit remesa to RNDC and get radicado
- `exportManifiestoToDBMUC()` - Export manifiesto to DBMUC
- `validateIngresoIDForExport()` - Validate IngresoID = 1 for export

## Usage Examples

### Example 1: Validate a Pedido

```typescript
import { validatePedido, validateDangerousCargo } from '@/app/utils';
import type { Pedido } from '@/app/types';

const pedido: Partial<Pedido> = {
  compania: 'SYSCOM S.A.S.',
  tipoOperacion: 'GENERAL',
  tipoServicio: 'Carga Completa',
  remitenteId: 'TER-001',
  // ... other fields
};

const validation = validatePedido(pedido);

if (!validation.valid) {
  console.error('Validation errors:', validation.errors);
  // Display errors to user
} else {
  // Save pedido
}
```

### Example 2: Validate Dangerous Cargo

```typescript
import { validateDangerousCargo } from '@/app/utils';

const validation = validateDangerousCargo(
  true, // isDangerous
  'UN1234', // unCode
  'Clase 3', // chapter
  'Partición A', // partition
  'Líquido', // productState
  'Grupo II' // packagingGroup
);

if (!validation.valid) {
  // Show validation errors
  Object.entries(validation.errors).forEach(([field, error]) => {
    console.error(`${field}: ${error}`);
  });
}
```

### Example 3: Audit Logging

```typescript
import { logInsert, logUpdate } from '@/app/utils';

// Log new pedido creation
await logInsert(
  'Pedidos', // tabla
  'PED-2026-000123', // registro
  'user@syscomweb.com', // usuario
  pedidoData, // datos
  '192.168.1.100' // ip
);

// Log pedido update
await logUpdate(
  'Pedidos',
  'PED-2026-000123',
  'user@syscomweb.com',
  oldPedidoData,
  newPedidoData,
  '192.168.1.100'
);
```

### Example 4: RNDC Export

```typescript
import { shouldExportRemesa, submitToRNDC } from '@/app/utils';

if (shouldExportRemesa(remesa.tipoRuta)) {
  const radicado = await submitToRNDC(remesa);
  // Update remesa with radicado number
  remesa.radicadoRNDC = radicado;
}
```

### Example 5: Level 3 User Permissions

```typescript
import { validateLevel3Permissions, validateRates } from '@/app/utils';

const userLevel = 3; // Level 3 user

// Check if user can modify rates
if (validateLevel3Permissions(userLevel, 'MODIFY_RATES')) {
  // Allow rate modification
}

// Validate rates with user level
const ratesValidation = validateRates(
  tarifaTabla,
  valorCobro,
  userLevel
);
```

## Validation Rules Summary

### Pedido (PED-1)
- ✅ Consecutive numbering format: PED-YYYY-NNNNNN
- ✅ Operation type: GENERAL, MCIACONSOL, CONTENEDOR, CONT_VACIO
- ✅ Tercero validation: coordinates required, phone ≥10 digits, different addresses
- ✅ Merchandise information with dangerous cargo fields
- ✅ UN code format validation for dangerous cargo
- ✅ Audit trail to LogSys table

### Orden de Cargue (ODC-1)
- ✅ Extends Pedido validations
- ✅ Vehicle SOAT must be current
- ✅ Technical inspection must be current
- ✅ Driver license must be valid
- ✅ Dangerous cargo requires valid certification

### Remesa (REM-1)
- ✅ Can link to existing pedido/orden
- ✅ Route type validation based on municipalities
- ✅ Cannot modify after RNDC submission
- ✅ LOCAL type doesn't export to DBMUC/RNDC
- ✅ Level 3 user special permissions
- ✅ Container validation for CONTENEDOR types
- ✅ Logistics times validation
- ✅ Export to DBMUC and XML to RNDC

### Manifiesto (MAN-1)
- ✅ Associates multiple remesas
- ✅ Operation types: Ida y Regreso, Multiparada, Varios Viajes
- ✅ Vehicle and driver document validation
- ✅ Anticipo percentage limits
- ✅ Export to DBMUC when remesas have radicado and IngresoID=1

### Cumplido (CUM-1)
- ✅ Dual document structure (Remesa + Manifiesto)
- ✅ Logistics times sequence validation
- ✅ Document delivery date validation (not before cumplido, max 1 day after)
- ✅ All remesas must have radicado
- ✅ Cannot cancel if linked to invoice/orden pago

## Next Steps

1. **Form Integration**: Integrate these validations into the existing form components
2. **Backend Integration**: Connect audit logging to actual DBSLOG database
3. **RNDC Integration**: Implement actual RNDC API connection
4. **DBMUC Export**: Implement actual database export to DBMUC
5. **User Permissions**: Implement user level system and permission checks
6. **Testing**: Create comprehensive test suite for all validations

## Documentation

All validation functions include:
- JSDoc comments
- Type safety with TypeScript
- Clear error messages
- Reference to PDF requirement (e.g., PED-1.2, REM-1.11)

## Performance Considerations

- Validations are synchronous for immediate feedback
- Database operations (audit logging, exports) are async
- Validation results include both `valid` boolean and `errors` object
- Errors are keyed by field name for easy display in forms
