import {
  ClipboardList,
  User,
  MapPin,
  Building2,
  Route,
  Truck,
  Package as PackageIcon,
  BarChart3,
  AlertCircle,
  Clock,
  MessageSquare,
  Calendar,
  X,
  Save,
  Send,
} from "lucide-react";

interface OrdenCargueFormProps {
  selectedDocument: {
    numero: string;
    fecha: string;
    origen: string;
    destino: string;
    valor: number;
  };
  isCreating: boolean;
  onClose: () => void;
}

export default function OrdenCargueForm({
  selectedDocument,
  isCreating,
  onClose,
}: OrdenCargueFormProps) {
  return (
    <div className="p-6 space-y-6">
      {/* 1. Datos Básicos */}
      <div className="bg-gradient-to-br from-green-50 to-green-100/30 rounded-xl p-6 border border-green-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-green-600" />
          Datos Básicos
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="hidden lg:block">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              No. Orden *
            </label>
            <input
              type="text"
              defaultValue={selectedDocument.numero || "OC-2024-001"}
              disabled={!isCreating}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Compañía (Cia) *
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white">
              <option>SYSCOM 360 S.A.S.</option>
              <option>Transporte Nacional</option>
              <option>Logística Express</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              No. Pedido *
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white">
              <option>Seleccione pedido...</option>
              <option>PED-2024-001</option>
              <option>PED-2024-002</option>
              <option>PED-2024-003</option>
            </select>
          </div>
          <div className="hidden lg:block">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cia Pedido
            </label>
            <input
              type="text"
              placeholder="Compañía del pedido"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Operación *
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white">
              <option>Nacional</option>
              <option>Internacional</option>
              <option>Urbano</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Ruta *
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white">
              <option>Directa</option>
              <option>Con escalas</option>
              <option>Distribución</option>
            </select>
          </div>
          <div className="md:col-span-2 hidden lg:block">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lugar Pago Flete
            </label>
            <input
              type="text"
              placeholder="Ciudad donde se paga el flete"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
            />
          </div>
          <div className="hidden lg:block">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estado Orden
            </label>
            <select
              disabled
              defaultValue="Pendiente"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
            >
              <option>Pendiente</option>
              <option>Asignada</option>
              <option>En tránsito</option>
              <option>Entregada</option>
            </select>
          </div>
        </div>
      </div>

      {/* 2. Información del Remitente */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100/30 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-blue-600" />
          Información del Remitente
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Remitente (Nombre o NIT) *
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
              <option>Seleccione remitente...</option>
              <option>ACME Corporation - 900123456</option>
              <option>TechCo S.A. - 800234567</option>
              <option>Global Logistics Ltd - 700345678</option>
            </select>
          </div>
          <div className="hidden lg:block">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              NIT / Cédula Remitente *
            </label>
            <input
              type="text"
              placeholder="900.123.456-7"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sede Origen *
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
              <option>Seleccione sede...</option>
              <option>Sede Principal - Bogotá</option>
              <option>Bodega Norte - Medellín</option>
              <option>Almacén Sur - Cali</option>
            </select>
          </div>
          <div className="hidden lg:block">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dirección Sede Origen *
            </label>
            <input
              type="text"
              placeholder="Calle 123 #45-67"
              defaultValue={selectedDocument.origen}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            />
          </div>
        </div>
      </div>

      {/* 3. Información del Destinatario */}
      <div className="bg-gradient-to-br from-purple-50 to-purple-100/30 rounded-xl p-6 border border-purple-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-purple-600" />
          Información del Destinatario
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Destinatario (Nombre o NIT) *
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white">
              <option>Seleccione destinatario...</option>
              <option>Distribuidora XYZ - 900987654</option>
              <option>Almacenes ABC - 800876543</option>
              <option>Super Mercados 123 - 700765432</option>
            </select>
          </div>
          <div className="hidden lg:block">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              NIT / Cédula Destinatario *
            </label>
            <input
              type="text"
              placeholder="900.987.654-3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sede Destino *
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white">
              <option>Seleccione sede...</option>
              <option>Centro Distribución - Barranquilla</option>
              <option>Sucursal Caribe - Cartagena</option>
              <option>Almacén Norte - Santa Marta</option>
            </select>
          </div>
          <div className="hidden lg:block">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dirección Destino
            </label>
            <input
              type="text"
              placeholder="Se autocompleta al seleccionar sede"
              defaultValue={selectedDocument.destino}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
              disabled
            />
          </div>
          <div className="hidden lg:block">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ciudad Destino
            </label>
            <input
              type="text"
              placeholder="Se autocompleta al seleccionar sede"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
              disabled
            />
          </div>
        </div>
      </div>

      {/* 4. Propietario de la Carga / Generador - OCULTO EN MÓVIL */}
      <div className="bg-gradient-to-br from-amber-50 to-amber-100/30 rounded-xl p-6 border border-amber-200 hidden lg:block">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-amber-600" />
          Propietario de la Carga (RNDC)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Generador de Carga *
            </label>
            <select
              defaultValue="remitente"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white"
            >
              <option value="remitente">Remitente</option>
              <option value="propietario">Propietario (Otro)</option>
              <option value="destinatario">Destinatario</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Identificación Propietario *
            </label>
            <input
              type="text"
              placeholder="NIT o Cédula"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white"
            />
          </div>
        </div>
        <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm text-amber-800 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>
              Esta información es requerida para el reporte al RNDC (Registro
              Nacional de Despacho de Carga)
            </span>
          </p>
        </div>
      </div>

      {/* 5. Ruta - OCULTO EN MÓVIL */}
      <div className="bg-gradient-to-br from-cyan-50 to-cyan-100/30 rounded-xl p-6 border border-cyan-200 hidden lg:block">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Route className="w-5 h-5 text-cyan-600" />
          Ruta de Transporte
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ruta *
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white">
              <option>Seleccione ruta...</option>
              <option>Bogotá - Medellín (Autopista Norte)</option>
              <option>Cali - Barranquilla (Costa Atlántica)</option>
              <option>Medellín - Pereira - Cali (Eje Cafetero)</option>
              <option>Crear ruta personalizada...</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Distancia (km)
            </label>
            <input
              type="number"
              placeholder="450"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tiempo Estimado (hrs)
            </label>
            <input
              type="text"
              placeholder="8:30"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
              disabled
            />
          </div>
        </div>
      </div>

      {/* 6. Información del Vehículo */}
      <div className="bg-gradient-to-br from-indigo-50 to-indigo-100/30 rounded-xl p-6 border border-indigo-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Truck className="w-5 h-5 text-indigo-600" />
          Información del Vehículo
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vehículo (Placa) *
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white">
              <option>Seleccione vehículo...</option>
              <option>ABC-123 (Tractocamión - Disponible)</option>
              <option>DEF-456 (Camión Sencillo - En ruta)</option>
              <option>GHI-789 (Dobletroque - Disponible)</option>
            </select>
          </div>
          <div className="hidden lg:block">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Remolque (Placa)
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white">
              <option>Sin remolque</option>
              <option>REM-111 (Furgón 40 pies)</option>
              <option>REM-222 (Contenedor 20 pies)</option>
              <option>REM-333 (Plataforma)</option>
            </select>
          </div>
          <div className="hidden lg:block">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Conductor *
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white">
              <option>Seleccione conductor...</option>
              <option>Juan Pérez - CC 1234567</option>
              <option>María García - CC 2345678</option>
              <option>Carlos Rodríguez - CC 3456789</option>
            </select>
          </div>
          <div className="hidden lg:block">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Documento Conductor
            </label>
            <input
              type="text"
              placeholder="Se autocompleta"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
              disabled
            />
          </div>
          <div className="md:col-span-2 hidden lg:block">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre Completo del Conductor
            </label>
            <input
              type="text"
              placeholder="Se autocompleta al seleccionar conductor"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
              disabled
            />
          </div>
        </div>
        <div className="mt-3 p-3 bg-indigo-50 border border-indigo-200 rounded-lg hidden lg:block">
          <p className="text-sm text-indigo-800">
            <strong>Estado del vehículo:</strong>{" "}
            <span className="text-green-600">✓ Disponible</span> •{" "}
            <strong>SOAT:</strong> Vigente hasta 2026-12-31 •{" "}
            <strong>Revisión Técnico-Mecánica:</strong> Vigente
          </p>
        </div>
      </div>

      {/* 7. Detalle de la Mercancía */}
      <div className="bg-gradient-to-br from-orange-50 to-orange-100/30 rounded-xl p-6 border border-orange-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <PackageIcon className="w-5 h-5 text-orange-600" />
          Detalle de la Mercancía
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Código de la Mercancía
            </label>
            <input
              type="text"
              placeholder="MERC-001"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
            />
          </div>
          <div className="hidden lg:block">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Código INVÍAS
            </label>
            <input
              type="text"
              placeholder="Código INVÍAS (opcional)"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
            />
          </div>
          <div className="md:col-span-2 hidden lg:block">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción de la Mercancía *
            </label>
            <textarea
              rows={3}
              placeholder="Descripción detallada de la mercancía..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none bg-white"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Peso Neto (kg) *
            </label>
            <input
              type="number"
              placeholder="5000"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Unidad de Medida *
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white">
              <option>Kilogramos (kg)</option>
              <option>Toneladas (ton)</option>
              <option>Libras (lb)</option>
              <option>Unidades</option>
            </select>
          </div>
        </div>
      </div>

      {/* 8. Detalle Logístico Adicional */}
      <div className="bg-gradient-to-br from-teal-50 to-teal-100/30 rounded-xl p-6 border border-teal-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-teal-600" />
          Detalle Logístico Adicional
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Unidades
            </label>
            <input
              type="number"
              placeholder="10"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Volumen
            </label>
            <input
              type="number"
              step="0.01"
              placeholder="12.5"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Unidad Medida Volumen
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white">
              <option>Metros cúbicos (m³)</option>
              <option>Pies cúbicos (ft³)</option>
              <option>Litros (L)</option>
            </select>
          </div>
          <div className="hidden lg:block">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Referencia 1
            </label>
            <input
              type="text"
              placeholder="Referencia interna"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Empaque
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white">
              <option>Caja</option>
              <option>Pallet</option>
              <option>Contenedor</option>
              <option>Granel</option>
              <option>Bulto</option>
              <option>Barril</option>
            </select>
          </div>
        </div>
      </div>

      {/* 9. Mercancía Peligrosa (Opcional) - OCULTO EN MÓVIL */}
      <div className="bg-gradient-to-br from-red-50 to-red-100/30 rounded-xl p-6 border border-red-200 hidden lg:block">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            Mercancía Peligrosa (si aplica)
          </h3>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4 text-red-600 rounded" />
            <span className="text-sm font-medium text-gray-700">
              Mercancía peligrosa
            </span>
          </label>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Naturaleza
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white">
              <option>N/A</option>
              <option>Explosivos</option>
              <option>Gases</option>
              <option>Líquidos inflamables</option>
              <option>Sólidos inflamables</option>
              <option>Sustancias tóxicas</option>
              <option>Corrosivos</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Código UN
            </label>
            <input
              type="text"
              placeholder="UN####"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción Residuo Peligroso
            </label>
            <textarea
              rows={2}
              placeholder="Descripción del residuo peligroso (si aplica)"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none bg-white"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Corrientes de Residuos Peligrosos
            </label>
            <input
              type="text"
              placeholder="Código de corriente"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Desagregación de Corrientes
            </label>
            <input
              type="text"
              placeholder="Desagregación"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white"
            />
          </div>
        </div>
      </div>

      {/* 10. Tiempos */}
      <div className="bg-gradient-to-br from-pink-50 to-pink-100/30 rounded-xl p-6 border border-pink-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-pink-600" />
          Tiempos de Cargue y Descargue
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha y hora cita cargue *
            </label>
            <input
              type="datetime-local"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha y hora cita descargue
            </label>
            <input
              type="datetime-local"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white"
            />
          </div>
        </div>
        <div className="mt-3 p-3 bg-pink-50 border border-pink-200 rounded-lg hidden lg:block">
          <p className="text-sm text-pink-800">
            📅 Formato: dd-mm-aaaa hh:mm • Las citas programadas se envían
            automáticamente al conductor y al cliente
          </p>
        </div>
      </div>

      {/* 11. Comentarios */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100/30 rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-gray-600" />
          Comentarios e Información Adicional
        </h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Observaciones
          </label>
          <textarea
            rows={4}
            placeholder="Instrucciones especiales, requerimientos de manejo, observaciones..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent resize-none bg-white"
          ></textarea>
        </div>
      </div>

      {/* Botones de Acción */}
      <div className="sticky bottom-0 left-0 right-0 bg-white lg:bg-transparent flex flex-col lg:flex-row items-stretch lg:items-center justify-end gap-2 lg:gap-3 p-4 lg:p-0 lg:pt-4 border-t border-gray-200 -mx-4 lg:mx-0 -mb-4 lg:mb-0 shadow-lg lg:shadow-none">
        <button
          onClick={onClose}
          className="w-full lg:w-auto px-4 lg:px-6 py-3 lg:py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 active:scale-95 transition-all flex items-center justify-center gap-2 font-medium order-3 lg:order-1"
        >
          <X className="w-4 h-4" />
          <span>Cancelar</span>
        </button>
        <button className="w-full lg:w-auto px-4 lg:px-6 py-3 lg:py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 active:scale-95 transition-all flex items-center justify-center gap-2 font-medium order-2 lg:order-2">
          <Save className="w-4 h-4" />
          <span className="hidden lg:inline">Guardar Borrador</span>
          <span className="lg:hidden">Guardar</span>
        </button>
        <button className="w-full lg:w-auto px-4 lg:px-6 py-3 lg:py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 font-medium order-1 lg:order-3">
          <Send className="w-4 h-4" />
          <span className="hidden lg:inline">Guardar y Asignar Vehículo</span>
          <span className="lg:hidden">Asignar Vehículo</span>
        </button>
      </div>
    </div>
  );
}
