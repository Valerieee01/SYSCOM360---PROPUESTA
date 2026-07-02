# Brief: Módulo de Ajustes a Monitoreo de Manifiestos

## Contexto
Este es un **subproceso dentro del módulo de Manifiestos** (no del módulo de remesas). Permite registrar ajustes sobre el monitoreo de un manifiesto ya existente — por ejemplo, correcciones a la fecha/hora real de llegada o salida en un puesto de control — manteniendo trazabilidad de quién y cuándo hizo el ajuste.

**Importante:** Revisa la estructura del módulo de Manifiestos ya existente (tablas, componentes, convenciones de nombres) y ubica este subproceso como una sección/pestaña dentro de la vista de un manifiesto, o como una entrada de submenú bajo "Manifiestos", según cómo esté organizada la navegación actual.

---

## Objetivo de UX
Igual que en el módulo de correcciones de remesa, evitar el patrón de pestañas separadas ("Ajuste / Manifiestos / Listado") y usar un patrón **maestro-detalle**:
- Vista principal = listado de ajustes registrados para el manifiesto (o global, con filtro por manifiesto).
- Botón **"+ Nuevo ajuste"** que abre un panel lateral/modal con el formulario.
- Al buscar el número de manifiesto, se autocompleta la información relevante del manifiesto en una tarjeta de solo lectura.
- Al guardar, el modal se cierra y el listado se actualiza sin recargar la página.

### Diferencia clave con el módulo de remesas
Aquí el "ajuste" no es sobre un solo campo dinámico, sino sobre **dos posibles datos de monitoreo por puesto de control**: fecha/hora de llegada y fecha/hora de salida. Ambos pueden mostrarse editables a la vez (no es necesario ocultar uno según el tipo, ya que ambos son parte del mismo evento de monitoreo).

---

## Campos del formulario "Nuevo ajuste"

### Búsqueda inicial
| Campo | Tipo | Comportamiento |
|---|---|---|
| Número de manifiesto | Input con autocompletar/búsqueda | Al escribir o seleccionar, trae los datos del manifiesto. Incluye sufijo/consecutivo (ej. "01"). Si no existe, error inline. |

### Tarjeta de resumen (solo lectura, autogenerada tras la búsqueda)
Datos generales del manifiesto (origen, destino, transportador, placa, etc. — según lo que ya maneje tu módulo de manifiestos).

### Datos del ajuste
| Campo | Tipo | Notas |
|---|---|---|
| Puesto de Control | Select | Lista de puntos de control configurados (ej. peajes, básculas, puntos de monitoreo en ruta). |
| Motivo de Ajuste | Select | Catálogo de motivos configurables. |
| Fecha/Hora Llegada | Input datetime | Precargar el valor actual si ya existe un registro previo de monitoreo en ese puesto. |
| Fecha/Hora Salida | Input datetime | Igual que el anterior. |
| Observaciones | Textarea | Opcional. |

### Metadatos automáticos (no editables por el usuario)
- No. de registro (consecutivo autogenerado)
- Fecha del sistema
- Usuario autenticado que hace el ajuste

---

## Vista "Listado de ajustes"
Tabla con columnas sugeridas:
- No. de registro
- No. de manifiesto
- Puesto de control
- Motivo de ajuste
- Llegada anterior → Llegada nueva
- Salida anterior → Salida nueva
- Usuario
- Fecha del ajuste

Filtros sugeridos: por número de manifiesto, por puesto de control, por rango de fechas, por usuario.

---

## Modelo de datos sugerido (adaptar a tu esquema actual)

```sql
ajustes_monitoreo_manifiesto (
  id                  serial primary key,
  numero_registro     integer not null, -- consecutivo
  manifiesto_id       integer references manifiestos(id) not null,
  puesto_control_id   integer references puestos_control(id) not null,
  motivo_ajuste       varchar not null,
  llegada_anterior    timestamp,
  llegada_nueva       timestamp,
  salida_anterior     timestamp,
  salida_nueva        timestamp,
  observaciones       text,
  usuario_id          integer references usuarios(id) not null,
  fecha               timestamp default now()
)
```

Si ya existe una tabla de monitoreo (ej. `monitoreo_manifiesto` con llegada/salida por puesto de control), el ajuste debe **actualizar ese registro real** y **dejar el histórico** en `ajustes_monitoreo_manifiesto` — igual que en el módulo de remesas, no basta con guardar el historial sin aplicar el cambio.

---

## Lógica de negocio / flujo
1. Usuario busca el manifiesto por número → sistema valida que exista y trae sus datos.
2. Usuario selecciona el puesto de control → si ya existe un registro de monitoreo para ese puesto, se precargan llegada/salida actuales.
3. Usuario selecciona motivo de ajuste y modifica llegada y/o salida.
4. Al guardar:
   - Se valida que al menos uno de los dos campos (llegada/salida) haya cambiado.
   - Se valida que salida sea posterior a llegada si ambas están presentes.
   - Se actualiza el registro real de monitoreo.
   - Se crea el registro de auditoría en `ajustes_monitoreo_manifiesto`.
   - Se genera el consecutivo automáticamente.
5. El listado se refresca mostrando el ajuste más reciente arriba.

---

## Criterios de aceptación
- [ ] El subproceso vive dentro del módulo de Manifiestos, accesible desde la vista de detalle de un manifiesto o desde un submenú.
- [ ] Se puede registrar un ajuste sin salir del listado (modal/drawer).
- [ ] Buscar un manifiesto inexistente muestra error claro sin romper el formulario.
- [ ] Al elegir un puesto de control con monitoreo previo, se precargan llegada/salida actuales.
- [ ] Se valida que la fecha de salida no sea anterior a la de llegada.
- [ ] Cada ajuste guarda: usuario, fecha y consecutivo automáticamente.
- [ ] El listado permite filtrar por manifiesto, puesto de control, fecha y usuario.
- [ ] El cambio se refleja tanto en el historial como en el dato real de monitoreo del manifiesto.
