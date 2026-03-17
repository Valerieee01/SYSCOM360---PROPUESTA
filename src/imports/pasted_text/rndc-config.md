Quiero que en mi sistema Syscom360, específicamente en el módulo de Transporte, implementes un módulo de parametrización del RNDC (Registro Nacional de Despachos de Carga) que permita configurar todas las credenciales y opciones necesarias para enviar documentos al RNDC y consultar su estado automáticamente.

Este módulo debe llamarse:

Configuración RNDC

y debe permitir administrar dos áreas principales:

Configuración de envío de documentos

Configuración de monitoreo RNDC

1. Configuración de envío RNDC

Debe permitir configurar los siguientes campos:

Parametrizables del usuario

Checkbox:

Enviar por URL2

Enviar orden de servicio (Remesa)

Enviar NIT de monitoreo

Sólo módulo Transporte Mercancía Consolidada (Paqueteo)

Credenciales de envío

Campos:

Usuario Factura Electrónica

Contraseña

Fecha de inicio de envío

Campo:

Fecha de inicio de envío

Este campo define desde qué fecha el sistema empezará a enviar documentos al RNDC.

2. Configuración de monitoreo RNDC

Debe existir una sección para consultar el estado de documentos enviados al RNDC.

Credenciales monitoreo

Campos:

Usuario (Tipo 2)

Contraseña

Configuración consulta

Campos:

Frecuencia de consulta

Consulta automática

Cuando la opción de consulta automática esté habilitada, el sistema debe ejecutar un proceso automático que consulte periódicamente el estado de los documentos enviados al RNDC.

3. NITs de monitoreo

El sistema debe permitir registrar NITs que se desean monitorear.

Debe existir una tabla con los siguientes campos:

ID

NIT

También deben existir las siguientes funciones:

Buscar NIT

Agregar NIT

Eliminar NIT

4. Funcionalidad esperada

Esta parametrización debe permitir que el sistema pueda:

enviar manifiestos al RNDC

enviar remesas al RNDC

validar información antes del envío

consultar el estado de documentos enviados

actualizar automáticamente el estado del manifiesto

registrar respuestas del RNDC

5. Automatización

Si la opción consulta automática está activada, el sistema debe ejecutar un proceso automático que:

consulte el estado de los documentos enviados

actualice el estado del manifiesto

registre errores o rechazos

guarde el historial de respuestas

6. Experiencia de usuario

La pantalla debe ser moderna y organizada, con secciones claras para:

configuración de envío

credenciales

monitoreo

NITs monitoreo

Además debe incluir botones como:

Guardar

Cancelar

Monitoreo

Agregar NIT

Eliminar NIT