# Brief: Módulo de Correcciones de Remesa

## Contexto
Este módulo se integra dentro del módulo existente de **remesas/pedidos** de la aplicación web. El objetivo es digitalizar y mejorar el flujo actual (basado en un formulario de escritorio) para registrar "novedades" o correcciones sobre una remesa ya existente (ej: cambio de cita de cargue, cambio de destino, etc.), manteniendo trazabilidad de quién y cuándo hizo el cambio.

**Importante:** Antes de implementar, revisa la estructura y convenciones ya usadas en el módulo de remesas/pedidos actual (nombres de tablas, componentes, estilos, patrones de navegación) y sigue esas mismas convenciones para que el nuevo apartado se sienta nativo, no pegado.

---

## Objetivo de UX
Un solo punto de entrada en el menú — **"Correcciones de Remesa"** — que permita, sin saltar de pantalla ni perder contexto:
1. Ver el historial/listado de correcciones ya registradas.
2. Registrar una nueva corrección.

### Patrón de UI recomendado
En vez de replicar el formulario de escritorio (con pestañas separadas "Edición / Remesas / Listado"), usar un patrón más intuitivo para web:

**Vista maestro-detalle (lista + panel lateral/modal):**
- Vista principal = **tabla/listado de correcciones** (la más usada, para consulta rápida).
- Botón fijo **"+ Nueva corrección"** arriba a la derecha de la tabla.
- Al hacer clic, abre un **panel lateral (drawer) o modal** con el formulario de registro — sin navegar a otra URL, sin perder el listado de fondo.
- Al buscar el número de remesa dentro del formulario, se autocompletan los datos de la remesa (cliente, origen, destino, manifiesto) igual que en el sistema actual, pero mostrados como una **tarjeta de resumen de solo lectura**, no como texto plano.
- Al guardar, el modal/drawer se cierra y la tabla se refresca mostrando el nuevo registro arriba (sin recargar la página).

Esto evita el problema del formulario original: mezclar "ver" y "crear" en pestañas separadas obliga a navegar de un lado a otro. Con este patrón el usuario nunca pierde el listado de referencia.

---

## Campos del formulario "Nueva corrección"

### Búsqueda inicial
| Campo | Tipo | Comportamiento |
|---|---|---|
| Número de remesa | Input con autocompletar/búsqueda | Al escribir o seleccionar, dispara la búsqueda y trae los datos de la remesa. Si no existe, mostrar mensaje de error inline (no alert). |
| Item | Numérico | Se autocompleta si la remesa tiene un solo item; si tiene varios, se muestra selector. |

### Tarjeta de resumen (solo lectura, autogenerada tras la búsqueda)
Cliente, NIT, Remitente, Destinatario, Origen, Destino, No. de Manifiesto.

### Datos de la novedad
| Campo | Tipo | Notas |
|---|---|---|
| Tipo de cambio | Select | Ej: "Cambio de cita de cargue", "Cambio de destino", etc. Define qué campo(s) editables se muestran después. |
| Motivo del cambio | Select (dependiente del tipo de cambio) | Ej: "No aplica", u otras razones configurables. |
| Campo(s) a corregir | Dinámico según "Tipo de cambio" | Ej: si es "Cambio de cita de cargue" → mostrar selector de fecha/hora con el valor actual precargado, resaltando visualmente que se está reemplazando. |
| Observaciones | Textarea | Opcional. |

### Metadatos automáticos (no editables por el usuario)
- No. de registro (consecutivo autogenerado)
- Fecha del sistema
- Usuario autenticado que hace el cambio

---

## Vista "Listado de correcciones"
Tabla con columnas sugeridas:
- No. de registro
- No. de remesa
- Tipo de cambio
- Fecha
- Usuario
- Valor anterior → Valor nuevo (mostrar el cambio de forma clara, ej: "09-07-2025 10:59 → 15-07-2025 08:00")
- Acción: ver detalle / observaciones

Incluir filtros básicos: por número de remesa, por tipo de cambio, por rango de fechas, por usuario.

---

## Modelo de datos sugerido (adaptar a tu esquema actual)

```sql
correcciones_remesa (
  id                  serial primary key,
  numero_registro     integer not null, -- consecutivo
  remesa_id           integer references remesas(id) not null,
  item                integer,
  tipo_cambio         varchar not null,
  motivo_cambio       varchar,
  campo_afectado      varchar,      -- ej: 'cita_cargue'
  valor_anterior      text,
  valor_nuevo         text,
  observaciones       text,
  usuario_id          integer references usuarios(id) not null,
  fecha               timestamp default now()
)
```

Si `remesas` ya tiene un campo como `cita_cargue`, la corrección debe **actualizar ese campo en la remesa** y **dejar el registro histórico** en `correcciones_remesa` — no solo guardar el historial sin aplicar el cambio real.

---

## Lógica de negocio / flujo
1. Usuario busca la remesa por número → sistema valida que exista y trae sus datos.
2. Usuario selecciona tipo de cambio → sistema muestra dinámicamente el campo correspondiente con su valor actual.
3. Usuario ingresa el nuevo valor y (opcional) observaciones.
4. Al guardar:
   - Se valida que el nuevo valor sea diferente al actual (evitar registrar "correcciones" vacías).
   - Se actualiza el campo real en la remesa.
   - Se crea el registro de auditoría en `correcciones_remesa`.
   - Se genera el consecutivo de registro automáticamente.
5. El listado se refresca mostrando la corrección más reciente arriba.

---

## Criterios de aceptación
- [ ] El menú tiene una sola entrada "Correcciones de Remesa" (no dos entradas separadas para ver/crear).
- [ ] Se puede registrar una corrección sin salir del listado (modal/drawer).
- [ ] Buscar una remesa inexistente muestra error claro sin romper el formulario.
- [ ] El campo a corregir cambia dinámicamente según el tipo de cambio seleccionado.
- [ ] Cada corrección guarda: usuario, fecha y consecutivo automáticamente.
- [ ] El listado permite filtrar por remesa, tipo de cambio, fecha y usuario.
- [ ] El cambio se refleja tanto en el historial como en el dato real de la remesa.
