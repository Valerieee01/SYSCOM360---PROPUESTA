# Guía de Validaciones de Formularios - Módulo de Transporte

## 📋 Resumen

Se ha implementado un sistema completo de validaciones para los formularios del módulo de transporte de Syscom web, con alertas visuales bonitas y validaciones en tiempo real basadas en los requerimientos del PDF.

## 🎯 Componentes Implementados

### 1. Hook de Validación Personalizado

**Archivo:** `src/app/hooks/useFormValidation.ts`

Un hook React personalizado que maneja:
- ✅ Estado del formulario
- ✅ Errores de validación
- ✅ Campos tocados (touched)
- ✅ Estado de envío (submitting)
- ✅ Validación en tiempo real
- ✅ Validación al perder foco (onBlur)
- ✅ Validación completa al enviar

**Uso:**
```typescript
const form = useFormValidation({
  initialValues: { campo1: "", campo2: 0 },
  validate: (values) => validateFunction(values),
  onSubmit: async (values) => {
    // Guardar datos
  },
});
```

### 2. Componentes de Alertas

**Archivo:** `src/app/components/ValidationAlert.tsx`

#### ValidationAlert
Alerta general con 4 tipos:
- 🔴 **error**: Errores de validación
- 🟢 **success**: Operaciones exitosas
- 🟡 **warning**: Advertencias
- 🔵 **info**: Información

**Características:**
- Iconos animados
- Colores según tipo
- Auto-cierre opcional
- Lista de errores
- Botón de cerrar

```tsx
<ValidationAlert
  type="error"
  title="Campos obligatorios incompletos"
  message="Complete los campos requeridos"
  errors={form.errors}
/>
```

#### FieldError
Error inline para campos individuales:
```tsx
<FieldError 
  error={form.errors.campo} 
  show={form.touched.campo} 
/>
```

#### SuccessMessage
Mensaje de éxito con auto-cierre:
```tsx
<SuccessMessage
  message="Pedido guardado exitosamente"
  onClose={() => setShowSuccess(false)}
/>
```

### 3. Formularios con Validaciones

#### PedidoForm
**Archivo:** `src/app/pages/transport/PedidoForm.tsx`

**Validaciones implementadas:**
- ✅ Tipo de operación requerido (GENERAL, MCIACONSOL, CONTENEDOR, CONT_VACIO)
- ✅ Compañía requerida
- ✅ Tipo de servicio requerido
- ✅ Remitente y sede de origen requeridos
- ✅ Destinatario y sede de destino requeridos
- ✅ Propietario de carga requerido
- ✅ Cantidad y peso deben ser positivos
- ✅ Prioridad requerida

**Características especiales:**
- Botón "Copiar del Remitente" para propietario
- Número de pedido auto-generado
- Estado inicial en BORRADOR
- Deshabilitación de botones durante envío

#### RemesaForm
**Archivo:** `src/app/pages/transport/RemesaForm.tsx`

**Validaciones implementadas:**
- ✅ Validación básica de remesa
- ✅ Validación de guías (mínimo 1 requerida)
- ✅ Validación de contenedores (para tipos CONTENEDOR/CONT_VACIO)
- ✅ Validación de tiempos logísticos
- ✅ Verificación de radicado RNDC (bloquea modificación)
- ✅ Validación de tipo de ruta según municipios

**Características especiales:**
- Advertencia si tiene radicado RNDC
- Agregar/eliminar guías dinámicamente
- Agregar/eliminar contenedores dinámicamente
- Validación de campos de contenedor individual
- Deshabilita guardar si ya está radicado

#### OrdenCargueFormValidated
**Archivo:** `src/app/pages/transport/OrdenCargueFormValidated.tsx`

**Validaciones implementadas:**
- ✅ Validación de vehículo seleccionado
- ✅ SOAT vigente (ODC-1.2)
- ✅ Revisión técnica vigente (ODC-1.3)
- ✅ Licencia de conductor vigente (ODC-1.4)
- ✅ Certificación de carga peligrosa (si aplica) (ODC-1.4)

**Características especiales:**
- 🚨 **Alertas en tiempo real** al seleccionar vehículo/conductor
- ✅ **Indicadores visuales** con CheckCircle/AlertTriangle
- 📊 **Panel informativo** con fechas de vencimiento
- 🔒 **Bloqueo de guardado** si hay advertencias
- ⚠️ **Toggle de carga peligrosa** que valida certificación

**Ejemplo de validación visual:**

Cuando seleccionas un vehículo:
```
┌─────────────────────────────────────┐
│ ⚠️  Advertencias del Vehículo       │
├─────────────────────────────────────┤
│ SOAT vencido                    ❌  │
│ Revisión técnica vigente        ✅  │
└─────────────────────────────────────┘
```

## 🎨 Estilos y UX

### Colores por Tipo de Alerta

| Tipo | Color Fondo | Color Borde | Icono |
|------|-------------|-------------|-------|
| Error | `bg-red-50` | `border-red-500` | AlertCircle |
| Success | `bg-green-50` | `border-green-500` | CheckCircle |
| Warning | `bg-yellow-50` | `border-yellow-500` | AlertTriangle |
| Info | `bg-blue-50` | `border-blue-500` | Info |

### Animaciones

- `animate-in slide-in-from-top-2`: Alertas principales
- `animate-in slide-in-from-top-1`: Errores de campo
- `active:scale-95`: Botones al hacer clic
- Transiciones suaves en hover

### Responsive Design

- **Mobile First**: Diseño optimizado para móviles
- **Breakpoints**: sm, md, lg, xl
- **Sticky buttons**: Botones de acción siempre visibles
- **Full screen modals**: En móvil, desktop en modal

## 📝 Ejemplos de Uso

### Validar un Pedido Completo

```typescript
import { useFormValidation } from "../../hooks/useFormValidation";
import { validatePedido } from "../../utils";

const pedidoForm = useFormValidation({
  initialValues: {
    compania: "SYSCOM S.A.S.",
    tipoOperacion: "",
    // ... más campos
  },
  validate: (values) => validatePedido(values),
  onSubmit: async (values) => {
    // Guardar en backend
    await savePedido(values);
  },
});

// En el JSX
<input
  value={pedidoForm.values.compania}
  onChange={(e) => pedidoForm.handleChange("compania", e.target.value)}
  onBlur={() => pedidoForm.handleBlur("compania")}
  className={pedidoForm.errors.compania ? "border-red-500" : ""}
/>
<FieldError error={pedidoForm.errors.compania} />
```

### Validar Vehículo con Advertencias

```typescript
const handleVehicleSelect = (vehicleId: string) => {
  const vehicle = vehicles.find(v => v.id === vehicleId);
  
  if (vehicle) {
    const warnings: string[] = [];
    
    // Validar SOAT
    const soatValidation = validateVehicleSOAT(vehicle);
    if (!soatValidation.valid) {
      warnings.push(soatValidation.errors.soat);
    }
    
    // Validar revisión técnica
    const techValidation = validateVehicleTechnicalInspection(vehicle);
    if (!techValidation.valid) {
      warnings.push(techValidation.errors.revisionTecnica);
    }
    
    setVehicleWarnings(warnings);
  }
};
```

### Mostrar Alertas de Error

```typescript
{form.hasErrors && (
  <ValidationAlert
    type="error"
    title="Campos obligatorios incompletos"
    message="Complete todos los campos antes de guardar"
    errors={form.errors}
  />
)}
```

## 🔧 Funciones de Validación Disponibles

### Validaciones Generales (`src/app/utils/validation.ts`)
- `validatePhone(phone)` - Teléfono ≥10 dígitos
- `validateCoordinates(lat, lng)` - Coordenadas válidas
- `validateDifferentAddresses(addr1, addr2)` - Direcciones diferentes
- `validateNIT(nit)` - Formato NIT colombiano
- `validateSOAT(date)` - SOAT vigente
- `validateTechnicalInspection(date)` - Revisión técnica vigente
- `validateDriverLicense(date)` - Licencia vigente
- `validateDangerousCargoCertification(bool, date)` - Certificación carga peligrosa
- `validateUNCode(code)` - Código UN válido (UN####)
- `isRequired(value)` - Campo requerido
- `isPositiveNumber(value)` - Número positivo

### Validaciones de Pedido (`src/app/utils/pedidoValidations.ts`)
- `validatePedido(pedido)` - Validación completa
- `validateConsecutiveNumber(numero)` - Formato PED-YYYY-NNNNNN
- `validateOperationType(tipo)` - Tipo válido
- `validateTercero(tercero)` - Tercero completo
- `validateMercancia(desc, peso, tipo)` - Mercancía válida
- `validateDangerousCargo(...)` - Carga peligrosa completa

### Validaciones de Remesa (`src/app/utils/remesaValidations.ts`)
- `validateRemesa(remesa, userLevel)` - Validación completa
- `validateRouteType(origen, destino, tipo)` - Tipo de ruta válido
- `canModifyRemesa(radicado)` - Verificar si puede modificar
- `validateGuias(guias)` - Validar guías
- `validateContenedores(contenedores, tipo)` - Validar contenedores
- `validateLogisticsTimes(...)` - Validar tiempos logísticos

### Validaciones de Orden de Cargue (`src/app/utils/ordenCargueValidations.ts`)
- `validateOrdenCargue(orden)` - Validación completa
- `validateVehicleSOAT(vehiculo)` - SOAT del vehículo
- `validateVehicleTechnicalInspection(vehiculo)` - Revisión técnica
- `validateConductorLicense(conductor)` - Licencia conductor
- `validateConductorDangerousCargoCert(conductor, isDangerous)` - Certificación

## 🚀 Características Avanzadas

### 1. Validación en Tiempo Real

Los errores se muestran:
- ✅ Al perder foco (onBlur)
- ✅ Al escribir (si ya había error)
- ✅ Al intentar enviar

### 2. Auto-cierre de Mensajes

```typescript
<SuccessMessage
  message="Guardado exitosamente"
  onClose={() => setShow(false)}
  autoClose={true}      // Auto-cierra
  autoCloseDelay={3000} // Después de 3 segundos
/>
```

### 3. Listas Dinámicas con Validación

Guías y contenedores se validan individualmente:

```typescript
const [guias, setGuias] = useState([{ id: "1", numero: "" }]);

const agregarGuia = () => {
  setGuias([...guias, { id: String(guias.length + 1), numero: "" }]);
};

const updateGuia = (id, numero) => {
  setGuias(guias.map(g => g.id === id ? { ...g, numero } : g));
};
```

### 4. Bloqueo por Radicado RNDC

```typescript
{remesaForm.values.radicadoRNDC && (
  <ValidationAlert
    type="warning"
    title="Remesa radicada en RNDC"
    message="Esta remesa no puede ser modificada"
  />
)}

<button
  disabled={!!remesaForm.values.radicadoRNDC}
  onClick={() => remesaForm.handleSubmit()}
>
  Guardar
</button>
```

## 📱 Soporte Mobile

- ✅ Alertas adaptadas a pantallas pequeñas
- ✅ Botones sticky en parte inferior
- ✅ Texto y espaciado responsivo
- ✅ Modales full-screen en móvil
- ✅ Touch-friendly (botones grandes)

## 🎯 Próximos Pasos

Para completar la implementación:

1. **Conectar con Backend**
   - Reemplazar datos mock con llamadas API
   - Implementar guardado real en base de datos
   - Conectar audit logging con DBSLOG

2. **Integrar RNDC**
   - Implementar envío real a RNDC
   - Manejar respuestas de radicado
   - Generar XML según especificaciones

3. **Agregar Más Validaciones**
   - Manifiesto form completo
   - Cumplido form con doble estructura
   - Anticipo form

4. **Testing**
   - Tests unitarios para validaciones
   - Tests de integración para formularios
   - Tests E2E para flujo completo

## 💡 Tips de Implementación

1. **Siempre usa el hook de validación:**
   ```typescript
   const form = useFormValidation({ ... });
   ```

2. **Muestra errores solo si el campo fue tocado:**
   ```tsx
   <FieldError error={form.errors.campo} show={form.touched.campo} />
   ```

3. **Deshabilita botones durante envío:**
   ```tsx
   <button disabled={form.isSubmitting}>
   ```

4. **Valida arrays con índice:**
   ```typescript
   errors[`guia_${index}`] = "Error en guía"
   ```

5. **Usa ValidationAlert para errores múltiples:**
   ```tsx
   {form.hasErrors && <ValidationAlert errors={form.errors} />}
   ```

## 🎨 Personalización

### Cambiar Colores

Edita `ValidationAlert.tsx`:
```typescript
const config = {
  error: {
    bgColor: 'bg-red-50',   // ← Cambiar aquí
    borderColor: 'border-red-500',
    // ...
  },
};
```

### Cambiar Duración de Auto-cierre

```tsx
<SuccessMessage autoCloseDelay={5000} /> {/* 5 segundos */}
```

### Agregar Nuevas Validaciones

1. Crear función en `src/app/utils/validation.ts`
2. Exportar en `src/app/utils/index.ts`
3. Usar en formulario

```typescript
export function validateCustomField(value: string): boolean {
  return value.length > 0;
}
```

## 📚 Referencias

- Requerimientos: `RequerimientosFuncionalesTransporte.pdf`
- Tipos TypeScript: `src/app/types/transport.ts`
- Validaciones: `src/app/utils/*Validations.ts`
- Componentes: `src/app/components/ValidationAlert.tsx`
- Hook: `src/app/hooks/useFormValidation.ts`

---

**Desarrollado para Syscom web** 🚛✨
