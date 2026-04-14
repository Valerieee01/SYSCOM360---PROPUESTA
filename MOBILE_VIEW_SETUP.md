# Configuración de Vista Móvil

Se han implementado las siguientes mejoras para asegurar que la vista móvil funcione correctamente:

## ✅ Cambios Realizados

### 1. **Configuración de Viewport**
- Se agregó un componente `MobileViewportFix` que configura automáticamente el viewport meta tag
- Maneja cambios de orientación y redimensionamiento
- Soporta dispositivos con notch (iPhone X+)

### 2. **Estilos CSS para Móvil**
- **mobile-fixes.css**: Nuevo archivo con correcciones específicas para móvil
  - Previene scroll horizontal
  - Optimiza el tamaño de fuentes en inputs (evita zoom en iOS)
  - Maneja safe areas para dispositivos con notch
  - Mejora el scrolling táctil

### 3. **Ajustes en MainLayout**
- Agregadas clases `overflow-hidden`, `w-full`, `max-w-full` para prevenir desbordamiento
- Optimizado para pantallas pequeñas

### 4. **Dashboard de Transporte**
- Completamente responsivo
- KPIs optimizados para móvil
- Tablas que se convierten en cards en móvil
- Gráficos con dimensiones ajustables

## 📱 Cómo Verificar la Vista Móvil

### En el Preview de Figma Make:
1. Abre el preview de la aplicación
2. Usa las herramientas de desarrollador del navegador (F12)
3. Activa el modo de dispositivo móvil (toggle device toolbar)
4. Prueba con diferentes tamaños:
   - iPhone SE (375px)
   - iPhone 12/13/14 (390px)
   - iPhone 14 Pro Max (430px)
   - Android (360px - 414px)

### Breakpoints Configurados:
- **xs**: < 640px - Móviles pequeños
- **sm**: 640px - Móviles grandes
- **md**: 768px - Tablets
- **lg**: 1024px - Laptops
- **xl**: 1280px - Desktop

## 🔧 Características Móviles

### Navegación:
- Sidebar deslizable desde la izquierda
- Bottom navigation bar en móvil
- Panel de notificaciones en pantalla completa en móvil

### Optimizaciones:
- Tamaño mínimo de botones: 44px x 44px (mejor para táctil)
- Prevención de zoom accidental en inputs
- Smooth scrolling optimizado
- Prevención de pull-to-refresh no deseado

## 🎨 Dashboard de Transporte Móvil

### Características:
- **KPIs**: 2 columnas en móvil, texto reducido
- **Mapa**: Altura ajustable, marcadores más pequeños
- **Tabla de viajes**: Se convierte en cards verticales en móvil
- **Gráficos**: Altura de 250px en móvil, fuentes reducidas
- **Alertas**: Espaciado compacto

## 🐛 Solución de Problemas

Si la vista móvil no se ve correctamente:

1. **Limpiar caché del navegador**
2. **Verificar que el viewport esté configurado**:
   ```javascript
   console.log(document.querySelector('meta[name="viewport"]')?.getAttribute('content'))
   ```
3. **Verificar scroll horizontal**:
   ```javascript
   console.log(document.body.scrollWidth, window.innerWidth)
   ```
4. **Revisar elementos con overflow**:
   - Abrir DevTools
   - Inspeccionar elementos con width > viewport

## 📝 Notas Importantes

- No se debe crear un `index.html` manualmente (el sistema lo genera automáticamente)
- El entrypoint es `__figma__entrypoint__.ts` (generado por Figma Make)
- Todos los estilos móviles están en `src/styles/mobile-fixes.css`
- El componente `MobileViewportFix` se ejecuta automáticamente en `App.tsx`

## ✨ Próximos Pasos

Para mejorar aún más la experiencia móvil:
1. Probar en dispositivos reales
2. Verificar gestos táctiles (swipe, pinch, etc.)
3. Optimizar imágenes para móvil
4. Implementar lazy loading si es necesario
