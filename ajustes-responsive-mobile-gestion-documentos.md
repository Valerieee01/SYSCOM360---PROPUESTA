# Ajustes Responsive (Mobile) — Gestión de Documentos

## Contexto
La pantalla de "Gestión de Documentos" ya existe en desktop (ver brief `ajustes-gestion-documentos.md`). Se necesita que en mobile no sea simplemente la misma tabla comprimida, sino que se adapte a un layout tipo app: **cards en grid de 2 columnas** y la tabla se convierte en una **lista de tarjetas apiladas**, tomando como referencia la imagen adjunta — pero mejorando la densidad visual y la jerarquía de información.

---

## 1. Cards de documentos en mobile

- Grid de **2 columnas** (en vez de 1 fila de 6 como en desktop).
- Cada card mantiene: ícono, título, etiqueta "Hoy" + contador.
- **Regla nueva a confirmar con negocio:** en la imagen de referencia, algunas cards muestran botón **"+ Crear"** (Órdenes de cargue, Manifiestos, Remesas) y otras muestran una etiqueta de solo lectura **"ⓘ Solo visualización"** (Pedidos, Anticipos, Cumplidos) en vez de botón de acción.
  > ⚠️ Confirmar: ¿esto es intencional (esos tipos de documento no se crean desde esta vista/rol en mobile) o es un placeholder incompleto del diseño? Si es intencional, debe ser configurable por permisos de usuario, no hardcodeado por tipo de documento.

---

## 2. Tabs de estado de sincronización

Debajo de las cards, agregar tabs:
- **Sincronizados** (activo por defecto)
- **Pendientes**

Esto filtra la lista de documentos según si ya se sincronizaron con el servidor/backend o están pendientes (relevante si la app tiene comportamiento offline-first / PWA).

> Confirmar si esta distinción "Sincronizados/Pendientes" aplica a tu arquitectura actual (por ejemplo, si el módulo maneja registro offline) o si se puede omitir esta sección si no aplica.

---

## 3. Filtros en mobile

En vez de mostrar los 5 campos de filtro siempre visibles (como en desktop), colapsar en:
- Botón **"Filtros de Búsqueda"** con ícono de embudo (verde), que abre un modal/bottom-sheet con los mismos campos del desktop (Tipo Documento, Documento, Compañía, Fecha Inicio, Fecha Fin, Limpiar/Buscar).

---

## 4. Lista de documentos (reemplaza la tabla en mobile)

Cada documento se muestra como una **tarjeta/fila compacta** con:
- Badge de tipo de documento (mismo color que en desktop) + número de documento.
- Punto de color de estado (●) a la derecha + flecha ">" para ver detalle.
- Línea secundaria: fecha de creación • placa del vehículo.
- Fila de íconos de acción debajo: **Editar, Descargar, Anular**.

> ⚠️ **Diferencia a confirmar con el set de acciones de desktop:** en desktop las acciones eran Editar/Duplicar/Ver/Descargar (variables según tipo). En este diseño mobile aparecen Editar/Descargar/**Anular** (ícono nuevo, círculo rojo con X) y desaparecen Duplicar y Ver. Definir explícitamente:
> - ¿Debe existir la acción "Anular" también en desktop?
> - ¿"Ver" se reemplaza por el tap sobre la tarjeta completa (que lleva al detalle), en vez de un ícono aparte?
> - ¿Debe mantenerse la misma regla condicional de desktop (qué tipos permiten editar) aquí también?

### Leyenda de estado
Al final de la lista, mostrar leyenda fija:
`● Pendiente` (amarillo) `● Aplicado` (verde) `● Anulado` (rojo)

> Nota: "Aplicado" es un estado nuevo que no aparecía en la tabla de desktop (donde solo se veía "Pendiente" y "Anulado"). Confirmar si es el mismo estado con otro nombre o un estado adicional del flujo.

---

## 5. Paginación simplificada

En vez de la paginación numerada completa de desktop, usar versión compacta:
- Texto: "1-5 de 20" y "Página 1 de 4".
- Botones **"Anterior"** / **"Siguiente"**.

---

## 6. Navegación inferior (bottom nav)

Barra fija inferior con accesos: **Inicio** y **Menú** (ícono hamburguesa), consistente con el resto de la app si ya existe un patrón de navegación mobile.

---

## Instrucción para Claude Code
1. Implementar breakpoints responsive para que, por debajo de cierto ancho (ej. `md` / 768px), el layout cambie automáticamente:
   - Cards: de fila de 6 a grid de 2 columnas.
   - Tabla: de tabla HTML a lista de tarjetas apiladas.
   - Filtros: de fila visible a modal/bottom-sheet activado por botón.
   - Paginación: de numerada a "Anterior/Siguiente" con contador de página.
2. Reutilizar los mismos datos, colores de badges y lógica de negocio ya definidos en el brief de desktop — **no duplicar lógica**, solo cambiar la presentación según el tamaño de pantalla.
3. Antes de implementar las acciones "Anular" y el estado "Aplicado", validar con negocio los puntos marcados con ⚠️ arriba, ya que no coinciden exactamente con lo ya definido para desktop.
