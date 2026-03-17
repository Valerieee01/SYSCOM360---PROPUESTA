Quiero que para mi sistema Syscom360, específicamente en el módulo de Transporte, me diseñes e implementes un Catálogo de Maestros centralizado que permita administrar todas las entidades necesarias para la operación logística y la creación de documentos de transporte.

El objetivo es que estos maestros sirvan como base de datos principal para alimentar automáticamente los documentos del sistema, como:

Pedidos

Órdenes de cargue

Remesas

Manifiestos

Anticipos

Cumplidos

Quiero que el sistema tenga un módulo llamado "Maestros" o "Catálogos", donde se puedan gestionar todas las entidades necesarias para el transporte.

1. Catálogo de Terceros

Quiero que exista un catálogo principal de Terceros, donde se puedan registrar personas o empresas que participen en la operación logística.

Cada tercero debe poder tener diferentes roles o tipos, por ejemplo:

Cliente

Remitente

Destinatario

Propietario de carga

Proveedor

Conductor

Transportador

El sistema debe permitir que un mismo tercero tenga varios tipos al mismo tiempo.

Campos sugeridos para terceros

Tipo de documento

Número de identificación

Nombre o razón social

Nombre comercial

Dirección

Ciudad

Departamento

Teléfono

Correo electrónico

Estado

Tipo de tercero (uno o varios)

También quiero que se puedan crear sedes de terceros, para manejar diferentes direcciones de origen y destino.

2. Catálogo de Vehículos

Debe existir un catálogo de vehículos que permita registrar toda la flota utilizada en transporte.

Campos sugeridos:

Placa

Tipo de vehículo

Marca

Modelo

Capacidad de carga

Tipo de carrocería

Estado del vehículo

Propietario del vehículo

Empresa transportadora

También debe permitir asociar:

remolques

documentos del vehículo

3. Catálogo de Conductores

Aunque los conductores pueden ser terceros, quiero un catálogo especializado para conductores, donde se manejen datos como:

Identificación

Nombre

Teléfono

Licencia de conducción

Categoría de licencia

Fecha vencimiento licencia

Empresa transportadora

Estado del conductor

4. Catálogo de Rutas

Quiero un catálogo de rutas logísticas, que permita definir rutas frecuentes entre ciudades.

Campos sugeridos:

Nombre de la ruta

Ciudad origen

Ciudad destino

Municipios intermedios

Distancia aproximada

Tiempo estimado de viaje

Estado de la ruta

Este catálogo se usará para sugerir rutas automáticamente cuando se creen pedidos u órdenes de cargue.

5. Catálogo de Mercancías

Quiero un catálogo de mercancías, para estandarizar los productos transportados.

Campos sugeridos:

Código de mercancía

Descripción

Tipo de carga

Naturaleza de la mercancía

Tipo de embalaje

Unidad de medida

Código INVÍAS

Código UN (si aplica)

Clasificación de mercancía peligrosa

Estado

Este catálogo debe alimentar automáticamente:

remesas

órdenes de cargue

manifiestos

6. Catálogo de Bodegas

Quiero un catálogo de bodegas o puntos logísticos.

Campos sugeridos:

Código de bodega

Nombre de bodega

Dirección

Ciudad

Departamento

Tipo de bodega (origen / destino / intermedia)

Empresa asociada

Estado

Las bodegas deben poder utilizarse como:

punto de cargue

punto de descargue

punto intermedio

7. Catálogo de Tipos de Carga

Para clasificar la mercancía.

Ejemplos:

Carga seca

Carga líquida

Carga refrigerada

Carga peligrosa

Contenedores

8. Catálogo de Tarifas de Flete

Quiero un catálogo de tarifas que permita definir:

tarifa por ruta

tarifa por peso

tarifa por cliente

tarifa por tipo de vehículo

Campos sugeridos:

Ruta

Tipo de vehículo

Tipo de carga

Tarifa base

Tarifa por tonelada

Tarifa mínima

9. Integración de los maestros con los documentos

Todos estos catálogos deben integrarse con los documentos del sistema para permitir autocompletado automático.

Ejemplo:

Pedido

Debe sugerir:

cliente

remitente

destinatario

bodegas

mercancía

Orden de cargue

Debe sugerir:

vehículo

conductor

ruta

Remesa

Debe cargar:

mercancía

peso

unidad de medida

Manifiesto

Debe traer automáticamente:

vehículo

conductor

remesas

tarifas

10. Experiencia de usuario

Quiero que el módulo de Maestros tenga:

formularios modernos

tablas con filtros

búsqueda rápida

selección con autocompletado

integración con documentos

También quiero que el sistema permita crear registros desde los formularios, por ejemplo:

Si el usuario está creando un pedido y no existe un cliente, debe poder crear el tercero sin salir del formulario.

11. Objetivo final

El objetivo es que el módulo de Catálogo de Maestros permita que el sistema de transporte funcione de forma automatizada, donde la mayoría de los campos de los documentos se llenen automáticamente utilizando estos catálogos.

Esto hará que Syscom360 sea un sistema logístico moderno, eficiente y fácil de usar.