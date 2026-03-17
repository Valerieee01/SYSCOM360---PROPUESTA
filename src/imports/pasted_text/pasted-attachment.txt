Campos obligatorios del Manifiesto (mínimos)

Estos son los únicos que realmente deberían ser obligatorios para crear el manifiesto.

Datos básicos

No. Manifiesto (autogenerado)

Cia

Tipo manifiesto

Cantidad de viajes

Remesas asociadas

El manifiesto se genera a partir de remesas.

Campos obligatorios:

No. Remesa

Esto se hace mediante:

Agregar remesas al manifiesto

Una vez agregadas, el sistema hereda:

mercancía

peso

unidades

cliente

origen

destino

Ruta

Ruta

Pero debería heredarse automáticamente de:

Orden de cargue
Vehículo

Vehículo (Placa)

Remolque (Placa)

Conductor principal

Estos datos deben venir automáticamente desde la orden de cargue.

Totales del viaje

Municipio ICA

Costo del viaje

Estos dos son necesarios para cálculos tributarios.

2️⃣ Campos que deben heredarse automáticamente

Para cumplir tu objetivo de automatización, el manifiesto debería tomar automáticamente:

Desde el Pedido

Cliente

Remitente

Destinatario

Tipo operación

Desde la Orden de Cargue

Vehículo

Remolque

Conductor

Ruta

Tipo de ruta

Lugar pago flete

Desde las Remesas

Código mercancía

Descripción mercancía

Peso total

Unidades

Tarifas

3️⃣ Campos que el sistema debe calcular automáticamente

Estos no deberían ser editables.

Costos

Costo trayecto 1

Costo trayecto 2

Costo trayecto vacío 1

Costo trayecto vacío 2

Totales

Total bruto a pagar

Retención en la fuente

ICA

Total neto a pagar

Peso total

Total unidades

Información del sistema

Fecha creación

Usuario creación

Estado del manifiesto

4️⃣ Campos opcionales

Solo si aplica:

Trayectos vacíos

Municipio origen

Municipio destino

Transbordo

Check de transbordo

Comentarios

Comentarios

Firma electrónica

Manifiesto firmado electrónicamente

5️⃣ Flujo automatizado ideal (tu objetivo)

En Syscom360 el flujo debería ser así:

Pedido
   ↓
Orden de cargue
   ↓
Remesa
   ↓
MANIFIESTO (automático)

Cuando el usuario llegue al manifiesto el sistema debería:

1️⃣ Traer vehículo, conductor y ruta
2️⃣ Cargar automáticamente remesas asociadas
3️⃣ Calcular pesos y valores
4️⃣ Calcular retenciones
5️⃣ Generar el manifiesto listo para enviar

El usuario solo debería:

Verificar → Guardar → Enviar

Cumpliendo la regla de 3 clics.

6️⃣ Campos mínimos reales para crear manifiesto

Si quieres un sistema ultra automatizado, el manifiesto solo debería necesitar:

No Remesa(s)
Ruta
Municipio ICA
Costo del viaje

Todo lo demás lo calcula el sistema.