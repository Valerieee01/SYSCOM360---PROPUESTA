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
  Container,
  FileText,
  Plus,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { useFormValidation } from "../../hooks/useFormValidation";
import { ValidationAlert, FieldError, SuccessMessage } from "../../components/ValidationAlert";
import {
  validateRemesa,
  validateGuias,
  validateContenedores,
  validateLogisticsTimes,
  canModifyRemesa,
} from "../../utils";
import type { Remesa, OperationType, Guia, Contenedor, UserLevel } from "../../types";

interface RemesaFormProps {
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

export default function RemesaForm({
  selectedDocument,
  isCreating,
  onClose,
}: RemesaFormProps) {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [guias, setGuias] = useState<Guia[]>([{ id: "1", numero: "" }]);
  const [contenedores, setContenedores] = useState<Partial<Contenedor>[]>([
    { id: "1", tipo: "", numero: "", tipoPrecinto: "" }
  ]);
  const userLevel: UserLevel = 3; // This would come from auth context

  // Form validation
  const remesaForm = useFormValidation<Partial<Remesa>>({
    initialValues: {
      numero: `REM-2026-${String(Math.floor(Math.random() * 1000)).padStart(6, '0')}`,
      compania: "SYSCOM 360 S.A.S.",
      fecha: new Date(),
      tipoRemesa: "",
      tipoOperacion: "" as OperationType,
      tipoRuta: "INTERURBANO",
      remitenteId: "",
      sedeOrigenId: "",
      destinatarioId: "",
      sedeDestinoId: "",
      propietarioCargaId: "",
      rutaId: "",
      distanciaKm: 0,
      tiempoEstimadoHrs: 0,
      vehiculoId: "",
      conductorPrincipalId: "",
      pactoTiempos: false,
      estado: "BORRADOR",
      creadoPor: "current-user",
      fechaCreacion: new Date(),
    },
    validate: (values) => {
      // First validate basic remesa
      const basicValidation = validateRemesa(values, userLevel);

      if (!basicValidation.valid) {
        return basicValidation;
      }

      // Validate guias
      const guiasValidation = validateGuias(guias);
      if (!guiasValidation.valid) {
        return guiasValidation;
      }

      // Validate contenedores if needed
      if (values.tipoOperacion === 'CONTENEDOR' || values.tipoOperacion === 'CONT_VACIO') {
        const contenedoresValidation = validateContenedores(
          contenedores as Array<{ tipo: string; numero: string; tipoPrecinto: string }>,
          values.tipoOperacion
        );
        if (!contenedoresValidation.valid) {
          return contenedoresValidation;
        }
      }

      // Validate logistics times if set
      if (values.companiaParaCargue && values.companiaParaDescargue) {
        const timesValidation = validateLogisticsTimes(
          values.companiaParaCargue,
          values.companiaParaDescargue,
          values.pactoTiempos || false,
          values.tiempoTotalCargueHrs,
          values.tiempoTotalDescargueHrs
        );
        if (!timesValidation.valid) {
          return timesValidation;
        }
      }

      // Check if can modify (if has radicado)
      const modifyCheck = canModifyRemesa(values.radicadoRNDC);
      if (!modifyCheck.valid) {
        return modifyCheck;
      }

      return { valid: true, errors: {} };
    },
    onSubmit: async (values) => {
      console.log("Guardando remesa...", {
        ...values,
        guias,
        contenedores,
      });
      setShowSuccessMessage(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    },
  });

  const agregarGuia = () => {
    setGuias([...guias, { id: String(guias.length + 1), numero: "" }]);
  };

  const eliminarGuia = (id: string) => {
    if (guias.length > 1) {
      setGuias(guias.filter((g) => g.id !== id));
    }
  };

  const updateGuia = (id: string, numero: string) => {
    setGuias(guias.map((g) => g.id === id ? { ...g, numero } : g));
  };

  const agregarContenedor = () => {
    setContenedores([
      ...contenedores,
      { id: String(contenedores.length + 1), tipo: "", numero: "", tipoPrecinto: "" }
    ]);
  };

  const eliminarContenedor = (id: string) => {
    if (contenedores.length > 1) {
      setContenedores(contenedores.filter((c) => c.id !== id));
    }
  };

  const updateContenedor = (id: string, field: string, value: string) => {
    setContenedores(contenedores.map((c) =>
      c.id === id ? { ...c, [field]: value } : c
    ));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Success Message */}
      {showSuccessMessage && (
        <SuccessMessage
          message="Remesa guardada exitosamente"
          onClose={() => setShowSuccessMessage(false)}
        />
      )}

      {/* Validation Alert */}
      {remesaForm.hasErrors && (
        <ValidationAlert
          type="error"
          title="Campos obligatorios incompletos"
          message="Por favor complete todos los campos marcados con asterisco (*) antes de guardar."
          errors={remesaForm.errors}
        />
      )}

      {/* RNDC Lock Warning */}
      {remesaForm.values.radicadoRNDC && (
        <ValidationAlert
          type="warning"
          title="Remesa radicada en RNDC"
          message="Esta remesa ha sido radicada en el RNDC y no puede ser modificada."
        />
      )}

      {/* 1. Datos Básicos / Encabezado de Remesa */}
      <div className="bg-gradient-to-br from-purple-50 to-purple-100/30 rounded-xl p-6 border border-purple-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-purple-600" />
          Datos Básicos de la Remesa
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="hidden lg:block">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              No. Remesa
            </label>
            <input
              type="text"
              value={remesaForm.values.numero}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
            />
          </div>
          <div className="hidden lg:block">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Compañía (Cía)
            </label>
            <select
              value={remesaForm.values.compania}
              onChange={(e) => remesaForm.handleChange("compania", e.target.value)}
              onBlur={() => remesaForm.handleBlur("compania")}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                remesaForm.errors.compania ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
            >
              <option value="SYSCOM 360 S.A.S.">SYSCOM 360 S.A.S.</option>
              <option value="Transporte Nacional">Transporte Nacional</option>
              <option value="Logística Express">Logística Express</option>
            </select>
            <FieldError error={remesaForm.errors.compania} show={remesaForm.touched.compania} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              No. Pedido
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white">
              <option>Seleccione pedido...</option>
              <option>PED-2024-001</option>
              <option>PED-2024-002</option>
              <option>PED-2024-003</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              No. Orden
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white">
              <option>Seleccione orden...</option>
              <option>OC-2024-001</option>
              <option>OC-2024-002</option>
              <option>OC-2024-003</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Remesa
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white">
              <option>Remesa Normal</option>
              <option>Remesa Internacional</option>
              <option>Remesa Express</option>
              <option>Remesa Consolidada</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Operación
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white">
              <option>Nacional</option>
              <option>Internacional</option>
              <option>Urbano</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Ruta
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white">
              <option>Directa</option>
              <option>Con escalas</option>
              <option>Distribución</option>
            </select>
          </div>
          <div className="hidden lg:block">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Origen Transbordo *
            </label>
            <input
              type="text"
              placeholder="Ciudad de origen del transbordo"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lugar Transbordo
            </label>
            <input
              type="text"
              placeholder="Ubicación del transbordo"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
            />
          </div>
          <div className="hidden lg:block">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lugar Pago Flete
            </label>
            <input
              type="text"
              placeholder="Ciudad donde se paga el flete"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
            />
          </div>
        </div>
      </div>

      {/* 2. Datos del Remitente */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100/30 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-blue-600" />
          Datos del Remitente
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Remitente *
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
              NIT / Cédula
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
              Dirección Sede Origen
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

      {/* 3. Datos del Destinatario */}
      <div className="bg-gradient-to-br from-green-50 to-green-100/30 rounded-xl p-6 border border-green-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-green-600" />
          Datos del Destinatario
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Destinatario *
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white">
              <option>Seleccione destinatario...</option>
              <option>Distribuidora XYZ - 900987654</option>
              <option>Almacenes ABC - 800876543</option>
              <option>Super Mercados 123 - 700765432</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sede Destino *
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white">
              <option>Seleccione sede...</option>
              <option>Centro Distribución - Barranquilla</option>
              <option>Sucursal Caribe - Cartagena</option>
              <option>Almacén Norte - Santa Marta</option>
            </select>
          </div>
          <div className="md:col-span-2 hidden lg:block">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dirección Sede Destino
            </label>
            <input
              type="text"
              placeholder="Se autocompleta al seleccionar sede"
              defaultValue={selectedDocument.destino}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
              disabled
            />
          </div>
        </div>
      </div>

      {/* 4. Datos de la Carga / Propietario */}
      <div className="bg-gradient-to-br from-amber-50 to-amber-100/30 rounded-xl p-6 border border-amber-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-amber-600" />
          Propietario de la Carga (RNDC)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Propietario de la Carga
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
              Identificación Propietario
            </label>
            <input
              type="text"
              placeholder="NIT o Cédula"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white"
            />
          </div>
        </div>
      </div>

      {/* 5. Datos de Ruta */}
      <div className="bg-gradient-to-br from-cyan-50 to-cyan-100/30 rounded-xl p-6 border border-cyan-200 hidden lg:block">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Route className="w-5 h-5 text-cyan-600" />
          Datos de Ruta
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

      {/* 6. Datos del Vehículo y Conductor */}
      <div className="bg-gradient-to-br from-indigo-50 to-indigo-100/30 rounded-xl p-6 border border-indigo-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Truck className="w-5 h-5 text-indigo-600" />
          Datos del Vehículo y Conductor
        </h3>
        
        {/* Vehículo Principal */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-indigo-700 mb-3">Vehículo Principal</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vehículo *
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white">
                <option>Seleccione vehículo...</option>
                <option>ABC-123 (Tractocamión)</option>
                <option>DEF-456 (Camión Sencillo)</option>
                <option>GHI-789 (Dobletroque)</option>
              </select>
            </div>
            <div className="hidden lg:block">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Remolque *
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
                Nombre Conductor *
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white">
                <option>Seleccione conductor...</option>
                <option>Juan Pérez</option>
                <option>María García</option>
                <option>Carlos Rodríguez</option>
              </select>
            </div>
            <div className="hidden lg:block">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Documento Conductor Principal
              </label>
              <input
                type="text"
                placeholder="Se autocompleta"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                disabled
              />
            </div>
          </div>
        </div>

        {/* Vehículo Secundario */}
        <div className="pt-4 border-t border-indigo-200 hidden lg:block">
          <h4 className="text-sm font-semibold text-indigo-700 mb-3">Vehículo Secundario (Opcional)</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vehículo
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white">
                <option>Ninguno</option>
                <option>ABC-123 (Tractocamión)</option>
                <option>DEF-456 (Camión Sencillo)</option>
                <option>GHI-789 (Dobletroque)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Remolque
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white">
                <option>Sin remolque</option>
                <option>REM-111 (Furgón 40 pies)</option>
                <option>REM-222 (Contenedor 20 pies)</option>
                <option>REM-333 (Plataforma)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre Conductor
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white">
                <option>Ninguno</option>
                <option>Juan Pérez</option>
                <option>María García</option>
                <option>Carlos Rodríguez</option>
              </select>
            </div>
            <div>
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
          </div>
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
              Código Mercancía *
            </label>
            <input
              type="text"
              placeholder="MERC-001"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Código INVÍAS *
            </label>
            <input
              type="text"
              placeholder="Código INVÍAS"
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
              Peso Neto *
            </label>
            <input
              type="number"
              placeholder="5000"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
            />
          </div>
          <div className="hidden lg:block">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ud. Medida
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white">
              <option>Kilogramos (kg)</option>
              <option>Toneladas (ton)</option>
              <option>Libras (lb)</option>
              <option>Unidades</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tarifa Tabla *
            </label>
            <input
              type="number"
              placeholder="150000"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Unidad Medida Tarifa Tabla
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white">
              <option>COP</option>
              <option>USD</option>
              <option>EUR</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tarifa Cobro
            </label>
            <input
              type="number"
              placeholder="200000"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Unidad Medida Tarifa Cobro
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white">
              <option>COP</option>
              <option>USD</option>
              <option>EUR</option>
            </select>
          </div>
        </div>

        {/* Detalle Logístico Adicional */}
        <div className="mt-4 pt-4 border-t border-orange-200">
          <h4 className="text-sm font-semibold text-orange-700 mb-3">Detalle Logístico</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Unidades
              </label>
              <input
                type="number"
                placeholder="10"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Unidad Medida Volumen
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white">
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Empaque
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white">
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

        {/* Mercancía Peligrosa */}
        <div className="mt-4 pt-4 border-t border-orange-200">
          <h4 className="text-sm font-semibold text-orange-700 mb-3 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            Mercancía Peligrosa (si aplica)
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="hidden lg:block">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Naturaleza
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white">
                <option>N/A</option>
                <option>Explosivos</option>
                <option>Gases</option>
                <option>Líquidos inflamables</option>
                <option>Sólidos inflamables</option>
                <option>Sustancias tóxicas</option>
                <option>Corrosivos</option>
              </select>
            </div>
            <div className="hidden lg:block">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Código UN
              </label>
              <input
                type="text"
                placeholder="UN####"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
              />
            </div>
            <div className="md:col-span-2 hidden lg:block">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción Residuo Peligroso
              </label>
              <textarea
                rows={2}
                placeholder="Descripción del residuo peligroso (si aplica)"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none bg-white"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Código Residuos *
              </label>
              <input
                type="text"
                placeholder="Código de corriente"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Código Desagregación *
              </label>
              <input
                type="text"
                placeholder="Desagregación"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 8. Contenedores */}
      <div className="bg-gradient-to-br from-teal-50 to-teal-100/30 rounded-xl p-6 border border-teal-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Container className="w-5 h-5 text-teal-600" />
            Contenedores
          </h3>
          <button
            onClick={agregarContenedor}
            className="flex items-center gap-2 px-3 py-1.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            Agregar Contenedor
          </button>
        </div>
        <div className="space-y-3">
          {contenedores.map((contenedor, index) => (
            <div
              key={contenedor.id}
              className="grid grid-cols-1 md:grid-cols-4 gap-3 p-3 bg-white rounded-lg border border-teal-200"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo Contenedor *
                </label>
                <select
                  value={contenedor.tipo}
                  onChange={(e) => updateContenedor(contenedor.id!, "tipo", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm ${
                    remesaForm.errors[`contenedor_tipo_${index}`] ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                >
                  <option value="">Seleccione...</option>
                  <option value="20' Standard">20' Standard</option>
                  <option value="40' Standard">40' Standard</option>
                  <option value="40' High Cube">40' High Cube</option>
                  <option value="Refrigerado 20'">Refrigerado 20'</option>
                  <option value="Refrigerado 40'">Refrigerado 40'</option>
                </select>
                <FieldError error={remesaForm.errors[`contenedor_tipo_${index}`]} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  No. Contenedor *
                </label>
                <input
                  type="text"
                  value={contenedor.numero}
                  onChange={(e) => updateContenedor(contenedor.id!, "numero", e.target.value)}
                  placeholder="CONT-123456"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm ${
                    remesaForm.errors[`contenedor_numero_${index}`] ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                />
                <FieldError error={remesaForm.errors[`contenedor_numero_${index}`]} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo Precinto *
                </label>
                <select
                  value={contenedor.tipoPrecinto}
                  onChange={(e) => updateContenedor(contenedor.id!, "tipoPrecinto", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm ${
                    remesaForm.errors[`contenedor_precinto_${index}`] ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                >
                  <option value="">Seleccione...</option>
                  <option value="Precinto de Seguridad">Precinto de Seguridad</option>
                  <option value="Precinto Aduanero">Precinto Aduanero</option>
                  <option value="Precinto Electrónico">Precinto Electrónico</option>
                  <option value="Precinto Metálico">Precinto Metálico</option>
                </select>
                <FieldError error={remesaForm.errors[`contenedor_precinto_${index}`]} />
              </div>
              <div className="flex items-end">
                {contenedores.length > 1 && (
                  <button
                    type="button"
                    onClick={() => eliminarContenedor(contenedor.id!)}
                    className="w-full px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors text-sm flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Eliminar
                  </button>
                )}
              </div>
            </div>
          ))}
          {remesaForm.errors.contenedores && (
            <FieldError error={remesaForm.errors.contenedores} />
          )}
        </div>
      </div>

      {/* 9. Guías */}
      <div className="bg-gradient-to-br from-pink-50 to-pink-100/30 rounded-xl p-6 border border-pink-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-pink-600" />
            Guías de Transporte
          </h3>
          <button
            onClick={agregarGuia}
            className="flex items-center gap-2 px-3 py-1.5 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            Agregar Guía
          </button>
        </div>
        <div className="space-y-3">
          {guias.map((guia, index) => (
            <div
              key={guia.id}
              className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 bg-white rounded-lg border border-pink-200"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  No. Guía * {index > 0 && <span className="text-gray-500 text-xs">(Guía {index + 1})</span>}
                </label>
                <input
                  type="text"
                  value={guia.numero}
                  onChange={(e) => updateGuia(guia.id, e.target.value)}
                  placeholder="GUIA-2024-001"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                    remesaForm.errors[`guia_${index}`] ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                />
                <FieldError error={remesaForm.errors[`guia_${index}`]} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Compañía
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white text-sm">
                  <option>SYSCOM 360 S.A.S.</option>
                  <option>Transporte Nacional</option>
                  <option>Logística Express</option>
                </select>
              </div>
              <div className="flex items-end">
                {guias.length > 1 && (
                  <button
                    type="button"
                    onClick={() => eliminarGuia(guia.id)}
                    className="w-full px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors text-sm flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Eliminar Guía
                  </button>
                )}
              </div>
            </div>
          ))}
          {remesaForm.errors.guias && (
            <FieldError error={remesaForm.errors.guias} />
          )}
        </div>
      </div>

      {/* 10. Tiempos Logísticos */}
      <div className="bg-gradient-to-br from-violet-50 to-violet-100/30 rounded-xl p-6 border border-violet-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-violet-600" />
          Tiempos Logísticos
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha y Hora Cita Cargue *
            </label>
            <input
              type="datetime-local"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha y Hora Cita Descargue *
            </label>
            <input
              type="datetime-local"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white"
            />
          </div>
          <div className="hidden lg:block">
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4 text-violet-600 rounded" />
              Pactó Tiempos
            </label>
          </div>
          <div className="hidden lg:block"></div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tiempo Total Cargue (hrs)
            </label>
            <input
              type="number"
              step="0.5"
              placeholder="2.5"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tiempo Total Descargue (hrs)
            </label>
            <input
              type="number"
              step="0.5"
              placeholder="3.0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white"
            />
          </div>
        </div>
      </div>

      {/* 11. Totales y Comentarios */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100/30 rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-gray-600" />
          Totales y Comentarios
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Observaciones
            </label>
            <textarea
              rows={4}
              placeholder="Instrucciones especiales, requerimientos de manejo, observaciones..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent resize-none bg-white"
            ></textarea>
          </div>
          <div className="md:col-span-2 hidden lg:block">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Información Adicional
            </label>
            <textarea
              rows={4}
              placeholder="Información adicional relevante para la remesa..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent resize-none bg-white"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Trayecto Vacío 1
            </label>
            <input
              type="number"
              placeholder="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Trayecto Vacío 2
            </label>
            <input
              type="number"
              placeholder="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-white"
            />
          </div>
          <div className="flex items-end hidden lg:block">
            <div className="w-full p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm font-semibold text-blue-900 mb-2">Totales Calculados</p>
              <div className="space-y-1 text-sm text-blue-800">
                <div className="flex justify-between">
                  <span>Peso Total:</span>
                  <span className="font-bold">0 kg</span>
                </div>
                <div className="flex justify-between">
                  <span>Volumen Total:</span>
                  <span className="font-bold">0 m³</span>
                </div>
                <div className="flex justify-between">
                  <span>Valor Total:</span>
                  <span className="font-bold">$0 COP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Botones de Acción */}
      <div className="sticky bottom-0 left-0 right-0 bg-white lg:bg-transparent flex flex-col lg:flex-row items-stretch lg:items-center justify-end gap-2 lg:gap-3 p-4 lg:p-0 lg:pt-4 border-t border-gray-200 -mx-4 lg:mx-0 -mb-4 lg:mb-0 shadow-lg lg:shadow-none">
        <button
          type="button"
          onClick={onClose}
          disabled={remesaForm.isSubmitting}
          className="w-full lg:w-auto px-4 lg:px-6 py-3 lg:py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 active:scale-95 transition-all flex items-center justify-center gap-2 font-medium order-3 lg:order-1 disabled:opacity-50"
        >
          <X className="w-4 h-4" />
          <span>Cancelar</span>
        </button>
        <button
          type="button"
          onClick={() => remesaForm.handleSubmit()}
          disabled={remesaForm.isSubmitting || !!remesaForm.values.radicadoRNDC}
          className="w-full lg:w-auto px-4 lg:px-6 py-3 lg:py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 font-medium order-1 lg:order-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save className="w-4 h-4" />
          <span className="hidden lg:inline">
            {remesaForm.isSubmitting ? "Guardando..." : "Guardar Remesa"}
          </span>
          <span className="lg:hidden">
            {remesaForm.isSubmitting ? "Guardando..." : "Guardar"}
          </span>
        </button>
      </div>
    </div>
  );
}
