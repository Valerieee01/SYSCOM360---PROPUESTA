import { useState } from "react";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Globe,
  FileText,
  DollarSign,
  Save,
  Upload,
  CheckCircle,
} from "lucide-react";
import logoFull from "../../assets/0638760b416ee7488ca6ef20ea955dc946a587db.png";

export default function ParametrizacionEmpresa() {
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // Simulación de guardado
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Parametrización de Empresa
          </h1>
          <p className="text-gray-600 mt-1">
            Configura la información general de tu empresa
          </p>
        </div>
        {showSuccess && (
          <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-lg border border-green-200">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Cambios guardados exitosamente</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Información General */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-[#40A095] to-[#99D6CF] rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Información General
              </h2>
              <p className="text-sm text-gray-600">Datos básicos de la empresa</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Logo de la Empresa
              </label>
              <div className="flex items-center gap-4">
                <div className="bg-white border-2 border-gray-200 rounded-lg p-4 flex items-center justify-center">
                  <img src={logoFull} alt="SYSCOM Logo" className="h-16" />
                </div>
                <button
                  type="button"
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
                >
                  <Upload className="w-4 h-4" />
                  <span>Cambiar Logo</span>
                </button>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Razón Social *
              </label>
              <input
                type="text"
                defaultValue="SYSCOM - Sistemas Comerciales S.A.S."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#40A095]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                NIT *
              </label>
              <input
                type="text"
                defaultValue="900.123.456-7"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre Comercial
              </label>
              <input
                type="text"
                defaultValue="Syscom360"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Empresa
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Sociedad por Acciones Simplificada (S.A.S.)</option>
                <option>Sociedad Limitada (LTDA)</option>
                <option>Sociedad Anónima (S.A.)</option>
                <option>Persona Natural</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Régimen Tributario
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Responsable de IVA - Régimen Común</option>
                <option>No responsable de IVA</option>
                <option>Régimen Simple de Tributación</option>
              </select>
            </div>
          </div>
        </div>

        {/* Información de Contacto */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-[#99D6CF] to-[#40A095] rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Información de Contacto
              </h2>
              <p className="text-sm text-gray-600">Ubicación y contacto</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dirección Principal *
              </label>
              <input
                type="text"
                defaultValue="Calle 100 # 20-30, Oficina 501"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ciudad *
              </label>
              <input
                type="text"
                defaultValue="Bogotá D.C."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Departamento *
              </label>
              <input
                type="text"
                defaultValue="Cundinamarca"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4 inline mr-1" />
                Teléfono Principal *
              </label>
              <input
                type="tel"
                defaultValue="(601) 123-4567"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4 inline mr-1" />
                Celular / WhatsApp
              </label>
              <input
                type="tel"
                defaultValue="(+57) 300 123 4567"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-1" />
                Email Corporativo *
              </label>
              <input
                type="email"
                defaultValue="info@syscom360.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Globe className="w-4 h-4 inline mr-1" />
                Sitio Web
              </label>
              <input
                type="url"
                defaultValue="https://www.syscom360.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Configuración Contable */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Configuración Contable y Fiscal
              </h2>
              <p className="text-sm text-gray-600">Parámetros contables</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Moneda Principal
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Peso Colombiano (COP)</option>
                <option>Dólar Estadounidense (USD)</option>
                <option>Euro (EUR)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Año Fiscal
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>2024</option>
                <option>2025</option>
                <option>2026</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Período Contable
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Mensual</option>
                <option>Bimestral</option>
                <option>Trimestral</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                IVA por Defecto
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>19%</option>
                <option>5%</option>
                <option>0% (Exento)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Resolución de Facturación DIAN
              </label>
              <input
                type="text"
                defaultValue="18764050123456"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prefijo de Facturación
              </label>
              <input
                type="text"
                defaultValue="SETP"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rango de Facturación (Desde)
              </label>
              <input
                type="number"
                defaultValue="1000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rango de Facturación (Hasta)
              </label>
              <input
                type="number"
                defaultValue="10000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Configuración de Transporte (RNDC) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-[#F03D26] to-[#F03D26]/80 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Configuración de Transporte (RNDC)
              </h2>
              <p className="text-sm text-gray-600">
                Parámetros para el Registro Nacional de Despacho de Carga
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Código RNDC
              </label>
              <input
                type="text"
                defaultValue="RNDC-2024-001"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Habilitar Validación RNDC
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Sí (Recomendado)</option>
                <option>No</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL API RNDC
              </label>
              <input
                type="url"
                defaultValue="https://api.rndc.gov.co/v1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Token de Autenticación
              </label>
              <input
                type="password"
                defaultValue="••••••••••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tiempo de Espera (segundos)
              </label>
              <input
                type="number"
                defaultValue="30"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#40A095] to-[#99D6CF] text-white rounded-lg hover:from-[#99D6CF] hover:to-[#40A095] transition-all shadow-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Guardando...</span>
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span>Guardar Cambios</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}