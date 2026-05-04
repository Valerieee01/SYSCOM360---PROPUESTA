import {
  X,
  Save,
  Truck,
  User,
  AlertTriangle,
  CheckCircle,
  Calendar,
} from "lucide-react";
import { useState } from "react";
import { useFormValidation } from "../../hooks/useFormValidation";
import { ValidationAlert, FieldError, SuccessMessage } from "../../components/ValidationAlert";
import {
  validateOrdenCargue,
  validateVehicleSOAT,
  validateVehicleTechnicalInspection,
  validateConductorLicense,
  validateConductorDangerousCargoCert,
} from "../../utils";
import type { OrdenCargue, Vehiculo, Conductor } from "../../types";

interface OrdenCargueFormProps {
  onClose: () => void;
  onSuccess?: () => void;
  pedidoId?: string;
}

export default function OrdenCargueFormValidated({ onClose, onSuccess, pedidoId }: OrdenCargueFormProps) {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isDangerousCargo, setIsDangerousCargo] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehiculo | null>(null);
  const [selectedConductor, setSelectedConductor] = useState<Conductor | null>(null);
  const [vehicleWarnings, setVehicleWarnings] = useState<string[]>([]);
  const [conductorWarnings, setConductorWarnings] = useState<string[]>([]);

  // Mock vehicles data (would come from API)
  const vehicles: Vehiculo[] = [
    {
      id: "VEH-001",
      placa: "ABC-123",
      tipo: "Tractocamión",
      soatVencimiento: new Date("2027-06-15"),
      revisionTecnicaVencimiento: new Date("2027-05-20"),
      capacidadCarga: 35000,
    },
    {
      id: "VEH-002",
      placa: "DEF-456",
      tipo: "Camión Sencillo",
      soatVencimiento: new Date("2026-03-01"), // Expired
      revisionTecnicaVencimiento: new Date("2027-08-10"),
      capacidadCarga: 12000,
    },
  ];

  // Mock conductores data (would come from API)
  const conductores: Conductor[] = [
    {
      id: "CON-001",
      nombre: "Juan Pérez",
      documento: "123456789",
      licenciaVencimiento: new Date("2028-12-31"),
      telefono: "3001234567",
      certificacionCargaPeligrosaVencimiento: new Date("2027-06-30"),
    },
    {
      id: "CON-002",
      nombre: "María García",
      documento: "987654321",
      licenciaVencimiento: new Date("2026-03-15"), // About to expire
      telefono: "3009876543",
    },
  ];

  const ordenForm = useFormValidation<Partial<OrdenCargue>>({
    initialValues: {
      numero: `OC-2026-${String(Math.floor(Math.random() * 1000)).padStart(6, '0')}`,
      compania: "SYSCOM S.A.S.",
      tipoOperacion: "GENERAL",
      tipoServicio: "",
      fecha: new Date(),
      pedidoId: pedidoId,
      remitenteId: "",
      sedeOrigenId: "",
      destinatarioId: "",
      sedeDestinoId: "",
      propietarioCargaId: "",
      vehiculoId: "",
      conductorPrincipalId: "",
      cantidad: 0,
      peso: 0,
      prioridad: "Media",
      estado: "BORRADOR",
      creadoPor: "current-user",
      fechaCreacion: new Date(),
    },
    validate: (values) => validateOrdenCargue(values),
    onSubmit: async (values) => {
      console.log("Guardando orden de cargue...", values);
      setShowSuccessMessage(true);
      setTimeout(() => {
        if (onSuccess) onSuccess();
        onClose();
      }, 2000);
    },
  });

  const handleVehicleSelect = (vehicleId: string) => {
    const vehicle = vehicles.find((v) => v.id === vehicleId);
    setSelectedVehicle(vehicle || null);
    ordenForm.handleChange("vehiculoId", vehicleId);

    if (vehicle) {
      const warnings: string[] = [];

      // Validate SOAT
      const soatValidation = validateVehicleSOAT(vehicle);
      if (!soatValidation.valid) {
        warnings.push(soatValidation.errors.soat || "SOAT vencido");
      }

      // Validate technical inspection
      const techValidation = validateVehicleTechnicalInspection(vehicle);
      if (!techValidation.valid) {
        warnings.push(techValidation.errors.revisionTecnica || "Revisión técnica vencida");
      }

      setVehicleWarnings(warnings);
    }
  };

  const handleConductorSelect = (conductorId: string) => {
    const conductor = conductores.find((c) => c.id === conductorId);
    setSelectedConductor(conductor || null);
    ordenForm.handleChange("conductorPrincipalId", conductorId);

    if (conductor) {
      const warnings: string[] = [];

      // Validate license
      const licenseValidation = validateConductorLicense(conductor);
      if (!licenseValidation.valid) {
        warnings.push(licenseValidation.errors.licencia || "Licencia vencida");
      }

      // Validate dangerous cargo certification if needed
      if (isDangerousCargo) {
        const certValidation = validateConductorDangerousCargoCert(conductor, isDangerousCargo);
        if (!certValidation.valid) {
          warnings.push(certValidation.errors.certificacionCargaPeligrosa || "Certificación de carga peligrosa requerida");
        }
      }

      setConductorWarnings(warnings);
    }
  };

  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-sm z-50 lg:flex lg:items-center lg:justify-center lg:p-4">
      <div className="bg-white lg:rounded-xl shadow-xl lg:max-w-4xl w-full h-full lg:h-auto lg:max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 lg:bg-white lg:border-b border-gray-200 px-4 lg:px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-xl lg:text-2xl font-bold text-white lg:text-gray-900">
            Nueva Orden de Cargue
          </h2>
          <button
            onClick={onClose}
            className="text-white lg:text-gray-400 hover:text-white/80 lg:hover:text-gray-600 p-2 rounded-lg hover:bg-white/10 lg:hover:bg-gray-100 active:scale-95 transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
          {/* Success Message */}
          {showSuccessMessage && (
            <SuccessMessage
              message="Orden de cargue guardada exitosamente"
              onClose={() => setShowSuccessMessage(false)}
            />
          )}

          {/* Validation Alert */}
          {ordenForm.hasErrors && (
            <ValidationAlert
              type="error"
              title="Campos obligatorios incompletos"
              message="Por favor complete todos los campos marcados con asterisco (*) y corrija los errores antes de guardar."
              errors={ordenForm.errors}
            />
          )}

          {/* Vehicle Warnings */}
          {vehicleWarnings.length > 0 && (
            <ValidationAlert
              type="warning"
              title="Advertencias del Vehículo"
              message="El vehículo seleccionado tiene los siguientes problemas:"
              errors={vehicleWarnings.reduce((acc, warning, idx) => {
                acc[`warning_${idx}`] = warning;
                return acc;
              }, {} as { [key: string]: string })}
            />
          )}

          {/* Conductor Warnings */}
          {conductorWarnings.length > 0 && (
            <ValidationAlert
              type="warning"
              title="Advertencias del Conductor"
              message="El conductor seleccionado tiene los siguientes problemas:"
              errors={conductorWarnings.reduce((acc, warning, idx) => {
                acc[`warning_${idx}`] = warning;
                return acc;
              }, {} as { [key: string]: string })}
            />
          )}

          {/* Vehículo Selection */}
          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100/30 rounded-xl p-4 lg:p-6 border border-indigo-200">
            <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-3 lg:mb-4 flex items-center gap-2">
              <Truck className="w-4 lg:w-5 h-4 lg:h-5 text-indigo-600" />
              Datos del Vehículo
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vehículo *
                </label>
                <select
                  value={ordenForm.values.vehiculoId}
                  onChange={(e) => handleVehicleSelect(e.target.value)}
                  onBlur={() => ordenForm.handleBlur("vehiculoId")}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                    ordenForm.errors.vehiculoId ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                >
                  <option value="">Seleccione vehículo...</option>
                  {vehicles.map((vehicle) => (
                    <option key={vehicle.id} value={vehicle.id}>
                      {vehicle.placa} - {vehicle.tipo}
                    </option>
                  ))}
                </select>
                <FieldError error={ordenForm.errors.vehiculoId} show={ordenForm.touched.vehiculoId} />
              </div>

              {selectedVehicle && (
                <div className="lg:col-span-2 bg-white p-4 rounded-lg border border-indigo-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Información del Vehículo</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                    <div>
                      <p className="text-gray-600">SOAT:</p>
                      <div className="flex items-center gap-2">
                        {vehicleWarnings.some((w) => w.includes("SOAT")) ? (
                          <AlertTriangle className="w-4 h-4 text-red-500" />
                        ) : (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        )}
                        <p className="font-medium">
                          {selectedVehicle.soatVencimiento.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-600">Revisión Técnica:</p>
                      <div className="flex items-center gap-2">
                        {vehicleWarnings.some((w) => w.includes("Revisión")) ? (
                          <AlertTriangle className="w-4 h-4 text-red-500" />
                        ) : (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        )}
                        <p className="font-medium">
                          {selectedVehicle.revisionTecnicaVencimiento.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-600">Capacidad:</p>
                      <p className="font-medium">{selectedVehicle.capacidadCarga} kg</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Conductor Selection */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100/30 rounded-xl p-4 lg:p-6 border border-purple-200">
            <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-3 lg:mb-4 flex items-center gap-2">
              <User className="w-4 lg:w-5 h-4 lg:h-5 text-purple-600" />
              Datos del Conductor
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Conductor Principal *
                </label>
                <select
                  value={ordenForm.values.conductorPrincipalId}
                  onChange={(e) => handleConductorSelect(e.target.value)}
                  onBlur={() => ordenForm.handleBlur("conductorPrincipalId")}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    ordenForm.errors.conductorPrincipalId ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                >
                  <option value="">Seleccione conductor...</option>
                  {conductores.map((conductor) => (
                    <option key={conductor.id} value={conductor.id}>
                      {conductor.nombre} - {conductor.documento}
                    </option>
                  ))}
                </select>
                <FieldError error={ordenForm.errors.conductorPrincipalId} show={ordenForm.touched.conductorPrincipalId} />
              </div>

              {selectedConductor && (
                <div className="lg:col-span-2 bg-white p-4 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Información del Conductor</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                    <div>
                      <p className="text-gray-600">Licencia:</p>
                      <div className="flex items-center gap-2">
                        {conductorWarnings.some((w) => w.includes("Licencia")) ? (
                          <AlertTriangle className="w-4 h-4 text-red-500" />
                        ) : (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        )}
                        <p className="font-medium">
                          {selectedConductor.licenciaVencimiento.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-600">Teléfono:</p>
                      <p className="font-medium">{selectedConductor.telefono}</p>
                    </div>
                    {isDangerousCargo && (
                      <div>
                        <p className="text-gray-600">Cert. Carga Peligrosa:</p>
                        <div className="flex items-center gap-2">
                          {conductorWarnings.some((w) => w.includes("Certificación")) ? (
                            <AlertTriangle className="w-4 h-4 text-red-500" />
                          ) : selectedConductor.certificacionCargaPeligrosaVencimiento ? (
                            <>
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <p className="font-medium text-xs">
                                {selectedConductor.certificacionCargaPeligrosaVencimiento.toLocaleDateString()}
                              </p>
                            </>
                          ) : (
                            <p className="font-medium text-red-600 text-xs">No certificado</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Dangerous Cargo Toggle */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100/30 rounded-xl p-4 lg:p-6 border border-orange-200">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isDangerousCargo}
                onChange={(e) => {
                  setIsDangerousCargo(e.target.checked);
                  if (selectedConductor) {
                    handleConductorSelect(selectedConductor.id);
                  }
                }}
                className="w-5 h-5 text-orange-600 rounded focus:ring-2 focus:ring-orange-500"
              />
              <div>
                <p className="font-semibold text-gray-900">¿Carga Peligrosa?</p>
                <p className="text-sm text-gray-600">
                  Marque si el pedido incluye mercancía peligrosa
                </p>
              </div>
            </label>
          </div>

          {/* Actions */}
          <div className="sticky bottom-0 left-0 right-0 bg-white lg:bg-transparent flex flex-col lg:flex-row items-stretch lg:items-center justify-end gap-2 lg:gap-3 p-4 lg:p-0 lg:pt-4 border-t border-gray-200 -mx-4 lg:mx-0 -mb-4 lg:mb-0 shadow-lg lg:shadow-none">
            <button
              type="button"
              onClick={onClose}
              disabled={ordenForm.isSubmitting}
              className="w-full lg:w-auto px-4 lg:px-6 py-3 lg:py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 active:scale-95 transition-all flex items-center justify-center gap-2 font-medium order-2 lg:order-1 disabled:opacity-50"
            >
              <X className="w-4 h-4" />
              <span>Cancelar</span>
            </button>
            <button
              type="button"
              onClick={() => ordenForm.handleSubmit()}
              disabled={ordenForm.isSubmitting || vehicleWarnings.length > 0 || conductorWarnings.length > 0}
              className="w-full lg:w-auto px-4 lg:px-6 py-3 lg:py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 font-medium order-1 lg:order-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              <span className="hidden lg:inline">
                {ordenForm.isSubmitting ? "Guardando..." : "Guardar Orden de Cargue"}
              </span>
              <span className="lg:hidden">
                {ordenForm.isSubmitting ? "Guardando..." : "Guardar"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
