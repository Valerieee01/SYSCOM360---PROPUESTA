# Ajustes a pantalla "Gestión de Documentos"

## Contexto
La pantalla ya está implementada pero difiere ligeramente del diseño de referencia (imagen adjunta). Se necesita ajustar 3 partes: **cards superiores**, **fila de filtros**, y **tabla de resultados** (textos, columnas y acciones).

---

## 1. Cards de documentos (fila superior)

Cada card debe tener, en este orden:
- Icono representativo del tipo de documento (color e ícono propio por tipo).
- Título del tipo de documento (ej. "Pedidos", "Órdenes de cargue", "Remesas", "Manifiestos", "Anticipos", "Cumplidos").
- **Etiqueta "Hoy"** en forma de pill/badge pequeño con ícono de calendario, seguida del número de documentos creados hoy para ese tipo (ej: `📅 Hoy   50`).
- Botón de acción ancho completo, color distintivo por tipo, con ícono "+" y texto "Crear [tipo en singular]" (ej: "+ Crear pedido", "+ Crear remesa").

**Verificar:** que la etiqueta "Hoy" esté presente y visualmente separada del título (no pegada), con el mismo estilo de pill en las 6 cards.

---

## 2. Fila de filtros

Campos exactos, en este orden, en una sola fila:

| Campo | Tipo | Placeholder / valor ejemplo |
|---|---|---|
| Tipo Documento | Select/dropdown | "Todos" (valor por defecto) |
| Documento | Input de texto | "Ej: 10" |
| Compañía | Input de texto | "01" |
| Fecha Inicio | Date picker | formato DD-MM-YYYY |
| Fecha Fin | Date picker | formato DD-MM-YYYY |

Botones alineados a la derecha, debajo de los campos:
- **Limpiar** (botón secundario/outline)
- **Buscar** (botón primario, color verde, con ícono de lupa)

---

## 3. Tabla de resultados

### Encabezados de columna (texto exacto, en mayúsculas)
`TIPO DOCUMENTO` | `NÚMERO DOCUMENTO` | `FECHA CREACIÓN` | `CLIENTE` | `RUTA` | `VEHÍCULO` | `ESTADO` | `ACCIONES`

### Columna "TIPO DOCUMENTO"
Mostrar como badge/pill de color, uno distinto por tipo:
- Remesa → morado
- Órden → amarillo/dorado
- Manifiesto → naranja
- Pedido → azul
- Cumplido → cian
- Anticipo → cian claro

### Columna "ESTADO"
Badge de color:
- Pendiente → amarillo
- Anulado → morado

### Columna "RUTA"
Formato: `ORIGEN _ DESTINO [número]` (ej: `BARRANQUILLA _ CALI 0067`)

### Columna "ACCIONES"
**Los íconos disponibles varían según el tipo de documento** (verificar este comportamiento contra la imagen de referencia y confirmar si aplica la misma regla de negocio):

| Tipo de documento | Íconos visibles |
|---|---|
| Pedido | Editar, Duplicar, Ver, Descargar |
| Órden | Editar, Duplicar, Ver, Descargar |
| Remesa | Duplicar, Ver, Descargar (sin editar) |
| Manifiesto | Ver, Descargar (sin editar, sin duplicar) |
| Cumplido | Ver, Descargar (sin editar, sin duplicar) |
| Anticipo | Ver, Descargar (sin editar, sin duplicar) |

> ⚠️ **Punto a confirmar con negocio:** en la imagen de referencia, una fila de "Órden" con estado "Anulado" también muestra el ícono de editar. Verificar si un documento anulado debería o no permitir edición — si no debería, ajustar la regla para ocultar "Editar" cuando `estado = Anulado`, sin importar el tipo de documento.

### Paginación
- Texto "Mostrando X-Y de Z registros" arriba a la izquierda de la tabla.
- Selector "Mostrar: [10]" arriba a la derecha.
- Controles de paginación abajo: primera página («), anterior (‹), números de página, siguiente (›), última (»), y campo "Ir a: [número]".

---

## Instrucción para Claude Code
Comparar la implementación actual contra la imagen de referencia adjunta y ajustar específicamente:
1. Que las 6 cards muestren la etiqueta "Hoy" con el mismo estilo de pill.
2. Que la fila de filtros tenga exactamente los 5 campos + botones Limpiar/Buscar como en la imagen.
3. Que los encabezados y el formato de texto de la tabla coincidan (mayúsculas, formato de ruta, badges de color por tipo/estado).
4. Que los íconos de acciones se muestren condicionalmente según el tipo de documento y su estado, según la tabla de arriba (confirmando antes la regla del caso "Anulado" señalada).
