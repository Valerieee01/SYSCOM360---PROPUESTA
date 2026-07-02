---
name: syscom-design
description: >
  Sistema de diseño de SYSCOM 360 (ERP de transporte/logística). Úsalo SIEMPRE que
  construyas o modifiques UI en este proyecto — páginas, dashboards, formularios, modales,
  tablas, tarjetas KPI, badges de estado, navegación o cualquier componente visual. Define
  la paleta de marca (turquesa #40A095 → #99D6CF, acento #F03D26), el gradiente característico,
  la estructura de layout (sidebar + topbar + bottom-nav móvil), y los patrones de tarjetas,
  formularios validados, tablas dual desktop/móvil, badges semánticos y feedback (toasts).
  Dispara con: "crea una página", "nuevo dashboard", "formulario", "tabla", "tarjeta",
  "badge", "modal", "componente", "estilo", "diseño", "responsive", "KPI".
---

# Sistema de Diseño — SYSCOM 360

ERP web de transporte y logística (React 18 + Vite + Tailwind v4 + shadcn/ui + lucide-react + recharts, react-router). Español (es-CO). **Mobile-first** con render dual desktop/móvil.

Regla de oro: **replica los patrones existentes, no inventes nuevos**. Antes de crear algo, busca una página análoga en `src/app/pages/` y cópiala. Usa Tailwind por defecto (flexbox/grid), evita posicionamiento absoluto salvo overlays/marcadores.

---

## 1. Paleta y colores

### Marca (chrome, navegación, acciones de identidad)
| Token | Hex | Uso |
|---|---|---|
| `--syscom-primary` | `#40A095` | Turquesa oscuro — principal |
| `--syscom-primary-light` | `#99D6CF` | Turquesa claro — secundario |
| `--syscom-accent` | `#F03D26` | Rojo/naranja — acento, alertas, badge de notificación |
| `--syscom-dark` | `#4E4E4D` | Texto/gris oscuro (foreground) |
| grises | `#5B5B5A`→`#DBDBDB` | jerarquía de grises |

**El gradiente de marca es la firma visual del producto.** Aplícalo en: topbar, header de sidebar, item de navegación activo, avatares de usuario, botones de paginación activos en móvil, headers de modales en móvil.

```jsx
// Gradiente lineal (barras, botones, texto)
className="bg-gradient-to-r from-[#40A095] to-[#99D6CF]"
// Gradiente diagonal suave (fondos de panel, tiles activos)
className="bg-gradient-to-br from-[#40A095]/5 to-[#99D6CF]/10"
// Texto con gradiente (títulos de marca)
className="bg-gradient-to-r from-[#40A095] to-[#99D6CF] bg-clip-text text-transparent"
```

Tokens shadcn ya mapeados en `src/styles/theme.css`: `primary`, `secondary`, `accent`, `destructive`, `muted`, `ring` (todos → paleta SYSCOM). `--radius: 0.625rem`. Prefiere clases de token (`bg-primary`, `text-muted-foreground`) en componentes shadcn; usa los hex `[#40A095]` cuando necesites el gradiente literal.

### Paleta semántica de estados (datos, badges, KPIs, gráficas)
Cada estado del dominio tiene un color fijo. Respétalo en todo el sistema:

| Semántica | Color Tailwind | Ejemplos de estado |
|---|---|---|
| Info / en tránsito / neutral-activo | `blue` | En tránsito, Aprobado |
| Éxito / completado | `green` | Cumplido, Completado, Entregado |
| Advertencia / pendiente | `orange` · `amber` | Pendiente, En cargue, por vencer |
| Error / crítico | `red` | Con novedad, Cancelado, Alta prioridad |
| En proceso | `purple` | En proceso, En descargue |
| Secundario logístico | `teal` · `indigo` · `emerald` | Remesas, Manifiestos, Anticipos |
| Inactivo / bajo | `gray` | Detenido, Baja prioridad |

> ⚠️ Nota de consistencia: en algunas páginas los botones primarios usan `bg-blue-600`. Para **UI nueva**, prefiere el gradiente de marca o `bg-primary`; reserva `blue` para semántica de datos. Mantén coherencia dentro de cada pantalla.

---

## 2. Estructura de layout

Todo el app cuelga de `MainLayout.tsx` (rutas protegidas dentro). No lo reconstruyas; el contenido de página va dentro de `<Outlet/>`.

- **Sidebar** (`w-64`, `bg-white`, `border-r border-gray-200`, `fixed lg:static`): header con logo sobre gradiente suave + título con gradiente de texto; nav con items expandibles (subitems con `border-l-2 pl-4`); sección de usuario abajo. Item activo = gradiente de marca + `text-white shadow-md`; hover = `hover:bg-[#99D6CF]/10 hover:text-[#40A095]`.
- **Topbar** (`bg-gradient-to-r from-[#40A095] to-[#99D6CF] shadow-lg`): logo+datos de empresa, fecha/hora en vivo (`bg-white/10 backdrop-blur-sm`), campana de notificaciones con punto `bg-[#F03D26]`.
- **Bottom-nav móvil** (`lg:hidden fixed bottom-0`, `grid grid-cols-5`): 4 accesos + botón "Menú". Activo = icono en tile con gradiente + label `text-[#40A095]`.
- **Overlays**: `fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden`.

### Contenedor de página (patrón estándar)
```jsx
<div className="p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-6">
  {/* Header de página */}
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
    <div>
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Título</h1>
      <p className="text-xs sm:text-sm text-gray-600 mt-1">Subtítulo descriptivo</p>
    </div>
    <button className="w-full lg:w-auto flex items-center justify-center gap-2 px-4 lg:px-6 py-3 bg-gradient-to-r from-[#40A095] to-[#99D6CF] text-white rounded-lg hover:shadow-lg active:scale-95 transition-all shadow-sm font-medium">
      <Plus className="w-5 h-5" /><span>Acción principal</span>
    </button>
  </div>
  {/* ...secciones... */}
</div>
```

---

## 3. Tarjetas y superficies

**Tarjeta base** (contenedor de sección/panel):
```jsx
<div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4 md:p-6 hover:shadow-md transition-shadow">
```

**Tile KPI de color** (grid de métricas superiores — `grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-3 md:gap-4`):
```jsx
<div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-blue-200 sm:border-2">
  <div className="flex items-center justify-between mb-1 sm:mb-2">
    <div className="p-1.5 sm:p-2 bg-blue-600 rounded-md sm:rounded-lg">
      <Navigation className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
    </div>
  </div>
  <p className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-900">8</p>
  <p className="text-[10px] sm:text-xs font-medium text-blue-700 mt-0.5 sm:mt-1">En Curso</p>
</div>
```
Regla del tile: fondo `from-{c}-50 to-{c}-100`, borde `{c}-200`, icono en caja sólida `{c}-600`, número `{c}-900`, label `{c}-700`. Cambia `{c}` según la semántica de la sección 1.

`KPICard.tsx` es la variante blanca con tendencia (↑/↓ verde/rojo) — úsala para KPIs con comparativa.

---

## 4. Botones

Componente `ui/button.tsx` (shadcn, CVA): variantes `default | destructive | outline | secondary | ghost | link`, tamaños `default | sm | lg | icon`. Úsalo para acciones estándar.

Para botones inline con estilo del proyecto:
- **Primario**: gradiente de marca `bg-gradient-to-r from-[#40A095] to-[#99D6CF] text-white ... hover:shadow-lg` (o `bg-blue-600 hover:bg-blue-700` en páginas existentes).
- **Secundario**: `border border-gray-300 hover:bg-gray-50`.
- **Icon-action** (en tablas): `p-1.5 sm:p-2 text-{color}-600 hover:bg-{color}-50 rounded-lg`.
- **Firma obligatoria en interactivos**: `active:scale-95 transition-all`. En móvil, targets ≥44px (ya forzado por CSS global para `button/a/[role=button]`).

---

## 5. Badges de estado

`inline-flex ... rounded-full text-xs font-medium` con `bg-{c}-100 text-{c}-700`. Centraliza el mapeo en una función `getEstadoColor`/`getEstadoBadge`:
```jsx
const getEstadoBadge = (estado) => ({
  Pendiente:  "bg-orange-100 text-orange-700",
  Aprobado:   "bg-blue-100 text-blue-700",
  "En Proceso":"bg-purple-100 text-purple-700",
  Completado: "bg-green-100 text-green-700",
  Cancelado:  "bg-red-100 text-red-700",
}[estado]);

<span className={`inline-flex px-3 py-1.5 rounded-full text-sm font-medium ${getEstadoBadge(estado)}`}>{estado}</span>
```
Variante con icono + borde (dashboards): añade `items-center gap-1 border ${...border-{c}-200}` y un icono lucide dentro.

---

## 6. Tablas — patrón dual desktop/móvil

**Siempre** renderiza tabla en desktop y tarjetas apiladas en móvil (no scroll horizontal de tabla completa). Envuelve en la tarjeta base.

```jsx
{/* Desktop */}
<div className="hidden lg:block overflow-x-auto">
  <table className="w-full">
    <thead className="bg-gray-50 border-b border-gray-200">
      <tr><th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Columna</th>…</tr>
    </thead>
    <tbody>
      <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">…</tr>
    </tbody>
  </table>
</div>

{/* Móvil: tarjetas */}
<div className="lg:hidden divide-y divide-gray-200">
  <div className="p-4 hover:bg-gray-50 active:bg-gray-100 transition-colors">…</div>
</div>
```
Incluye buscador (`Search` icon absoluto + input con `focus:ring-2`), filtros, paginación (desktop numerada / móvil Anterior·1·Siguiente), y **estado vacío**: icono `w-16 h-16 text-gray-300`, mensaje `text-gray-500`, hint `text-gray-400`.

---

## 7. Formularios y modales

Modal a pantalla completa en móvil, centrado en desktop:
```jsx
<div className="fixed inset-0 bg-white/30 backdrop-blur-sm z-50 lg:flex lg:items-center lg:justify-center lg:p-4">
  <div className="bg-white lg:rounded-xl shadow-xl lg:max-w-4xl w-full h-full lg:h-auto lg:max-h-[90vh] overflow-y-auto">
    {/* Header sticky: gradiente en móvil, blanco en desktop */}
    <div className="sticky top-0 bg-gradient-to-r from-[#40A095] to-[#99D6CF] lg:bg-white lg:border-b border-gray-200 px-4 lg:px-6 py-4 flex items-center justify-between z-10">
      <h2 className="text-xl lg:text-2xl font-bold text-white lg:text-gray-900">Título</h2>
      <button className="text-white lg:text-gray-400 p-2 rounded-lg hover:bg-white/10 lg:hover:bg-gray-100 active:scale-95 transition-all"><X className="w-6 h-6"/></button>
    </div>
    <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">…</div>
  </div>
</div>
```

**Secciones de formulario**: panel `bg-gradient-to-br from-[#40A095]/5 to-[#99D6CF]/5 rounded-xl p-4 lg:p-6 border border-[#99D6CF]/20`, con `<h3>` + icono lucide `text-[#40A095]`, y grid `grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-4`.

**Campos**:
```jsx
<label className="block text-sm font-medium text-gray-700 mb-2">Etiqueta *</label>
<input className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#40A095] focus:border-transparent ${
  errors.campo ? "border-red-500 bg-red-50" : "border-gray-300"}`} />
<FieldError error={errors.campo} show={touched.campo} />
```
Campos deshabilitados: `bg-gray-50 text-gray-500`. Obligatorios marcados con `*`.

**Validación**: usa el hook `useFormValidation` + los helpers `ValidationAlert`, `FieldError`, `SuccessMessage` (ver `FORMS_VALIDATION_GUIDE.md`). Errores globales al tope con `ValidationAlert type="error"`; animación `animate-shake` en errores.

---

## 8. Feedback (toasts, alertas)

- **Toast** (`components/Toast.tsx` vía `TransportContext`): fijo `top-4 right-4 z-50`, `border-2 shadow-lg`, `animate-slide-in`. Colores por tipo: success=green, error=red, warning=yellow, info=blue (fondo `{c}-50`, borde `{c}-200`, texto `{c}-900`), icono lucide.
- **Panel de notificaciones**: cada item con caja de icono `bg-{c}-100`, título, timestamp `text-gray-500`, y chip de prioridad `rounded-full`.
- Animaciones disponibles en `globals.css`: `animate-shake`, `animate-slide-in`. Transiciones estándar: `transition-all` / `transition-colors` / `transition-shadow`.

---

## 9. Tipografía e iconos

- Base 16px. `h1→text-2xl`, `h2→text-xl`, `h3→text-lg`, `h4/label/button→text-base`, todos `font-weight: 500` (medium). Escalado responsive común: `text-xl sm:text-2xl md:text-3xl` en títulos de página.
- Pesos: números KPI y títulos `font-bold`; labels y acciones `font-medium`.
- Jerarquía de texto: principal `text-gray-900`, secundario `text-gray-600`, terciario/meta `text-gray-500`, mínimos `text-[10px]`/`text-[9px]` en móvil.
- **Iconos**: exclusivamente `lucide-react`, tamaños `w-4 h-4` (inline) / `w-5 h-5` (acciones) / `w-3 h-3` (meta).
- Fechas/horas en `es-CO` (`toLocaleDateString`/`toLocaleTimeString`); moneda COP.

---

## 10. Responsive (mobile-first, no negociable)

- Breakpoints: base=móvil, `sm:` 640, `md:` 768, `lg:` 1024 (frontera desktop/móvil principal), `xl:` 1280.
- **Render dual**: `hidden lg:block` (desktop) + `lg:hidden` (móvil) para tablas y navegación.
- Padding/spacing escalados: `p-3 sm:p-4 md:p-6`, `gap-2 sm:gap-3 md:gap-4`, `space-y-3 sm:space-y-4 md:space-y-6`.
- Móvil: carruseles horizontales con `.scrollbar-hide`, tiles `flex-shrink-0 w-28`, targets ≥44px, sin scroll horizontal de página (`overflow-x-hidden` global), inputs a 16px para evitar zoom iOS.
- Ver `MOBILE_VIEW_SETUP.md` para el detalle del setup móvil.

---

## 11. Gráficas (recharts)

Envuelve en tarjeta base con `<h3>` título. `ResponsiveContainer width="100%" height={250}`. Paleta de series: `#3b82f6` (blue), `#10b981` (green), `#8b5cf6` (purple), `#f59e0b` (orange/amber), `#14b8a6` (teal), `#ef4444` (red). Ejes `stroke="#6b7280"` `fontSize:10px`; grid `strokeDasharray="3 3" stroke="#e5e7eb"`; tooltip `backgroundColor:#fff, border:1px solid #e5e7eb, borderRadius:8px, fontSize:12px`. Barras con `radius={[8,8,0,0]}`. Añade leyenda propia debajo con puntos de color. Da `key` único a cada `<Cell>`/serie. Para paletas de datos más ricas, consulta el skill `dataviz`.

---

## Checklist antes de entregar UI
1. ¿Usé el gradiente de marca en chrome/acciones y la paleta semántica en datos?
2. ¿Contenedor `p-3 sm:p-4 md:p-6 space-y-…` y tarjetas `rounded-lg sm:rounded-xl shadow-sm border`?
3. ¿Tabla con render dual desktop/móvil + estado vacío?
4. ¿`active:scale-95 transition-all` en botones y foco `focus:ring-2 focus:ring-[#40A095]` en inputs?
5. ¿Iconos lucide, textos en español, badges centralizados en función?
6. ¿Probado a 375px (móvil) y ≥1024px (desktop) sin overflow horizontal?
