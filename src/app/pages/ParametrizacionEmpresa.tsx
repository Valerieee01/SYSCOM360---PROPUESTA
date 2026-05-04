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
  Shield,
  Database,
  Cloud,
  QrCode,
} from "lucide-react";
import logoFull from "figma:asset/0638760b416ee7488ca6ef20ea955dc946a587db.png";

type TransportTab = "webservice" | "rndc" | "qr";

export default function ParametrizacionEmpresa() {
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeTransportTab, setActiveTransportTab] = useState<TransportTab>("webservice");

  // Estados para Usuario 1: Monitoreo
  const [monitoreoUser, setMonitoreoUser] = useState("");
  const [monitoreoPassword, setMonitoreoPassword] = useState("");
  const [monitoreoFrecuencia, setMonitoreoFrecuencia] = useState("00:00");
  const [monitoreoConsultaAuto, setMonitoreoConsultaAuto] = useState(false);
  const [monitoreoParametrizarDias, setMonitoreoParametrizarDias] = useState(false);
  const [monitoreoDias, setMonitoreoDias] = useState(1);

  // Estados para Usuario 2: Facturación
  const [facturacionUser, setFacturacionUser] = useState("");
  const [facturacionPassword, setFacturacionPassword] = useState("");
  const [facturacionFechaInicio, setFacturacionFechaInicio] = useState("2026-05-04");
  const [facturacionMercanciaConsolidada, setFacturacionMercanciaConsolidada] = useState(false);

  // Estados para Usuario 3: Web Service
  const [webServiceUser, setWebServiceUser] = useState("user");
  const [webServicePassword, setWebServicePassword] = useState("user");
  const [webServiceFechaInicio, setWebServiceFechaInicio] = useState("2026-05-04");
  const [webServiceIntervalo, setWebServiceIntervalo] = useState(30);
  const [webServiceGPS, setWebServiceGPS] = useState(false);
  const [webServiceOrdenServicio, setWebServiceOrdenServicio] = useState(false);
  const [webServiceNITMonitoreo, setWebServiceNITMonitoreo] = useState(false);

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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Logo de la Empresa
              </label>
              <div className="flex items-center gap-4">
                <div className="bg-white border-2 border-gray-200 rounded-lg p-4 flex items-center justify-center">
                  <img src={logoFull} alt="SYSCOM Logo" className="h-16" />
                </div>
                <button
                  type="button"
                  className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 active:scale-95 transition-all"
                >
                  <Upload className="w-4 h-4" />
                  <span>Cambiar Logo</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-2">
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
                defaultValue="Syscom web"
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="lg:col-span-2">
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
                defaultValue="info@syscomweb.com"
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
                defaultValue="https://www.syscomweb.com"
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

        {/* Configuración Ministerio de Transporte */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex items-center gap-3 p-6 border-b border-gray-200">
            <div className="w-10 h-10 bg-gradient-to-br from-[#F03D26] to-[#F03D26]/80 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Configuración Ministerio de Transporte
              </h2>
              <p className="text-sm text-gray-600">
                Parámetros de integración y configuración
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 bg-gray-50">
            <div className="flex overflow-x-auto scrollbar-hide">
              <button
                onClick={() => setActiveTransportTab("webservice")}
                className={`flex items-center gap-2 px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                  activeTransportTab === "webservice"
                    ? "border-[#2DB39E] text-[#2DB39E] bg-white"
                    : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <Cloud className="w-4 h-4" />
                Web Service
              </button>
              <button
                onClick={() => setActiveTransportTab("rndc")}
                className={`flex items-center gap-2 px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                  activeTransportTab === "rndc"
                    ? "border-[#2DB39E] text-[#2DB39E] bg-white"
                    : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <Shield className="w-4 h-4" />
                RNDC
              </button>
              <button
                onClick={() => setActiveTransportTab("qr")}
                className={`flex items-center gap-2 px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                  activeTransportTab === "qr"
                    ? "border-[#2DB39E] text-[#2DB39E] bg-white"
                    : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <QrCode className="w-4 h-4" />
                QR Manifiesto
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTransportTab === "webservice" && (
              <div className="space-y-8">
                {/* USUARIO 3: WEB SERVICE */}
                <div className="border border-gray-200 rounded-xl p-6 bg-gray-50">
                  <h3 className="text-lg font-bold text-[#2DB39E] mb-6">Usuario 3: Web Service</h3>

                  {/* Credenciales */}
                  <div className="mb-6">
                    <h4 className="text-sm font-bold text-gray-700 mb-4 uppercase">Credenciales</h4>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Usuario de Web Service
                        </label>
                        <input
                          type="text"
                          value={webServiceUser}
                          onChange={(e) => setWebServiceUser(e.target.value)}
                          className="w-full max-w-[280px] px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2DB39E] bg-white"
                          placeholder="user"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Contraseña
                        </label>
                        <input
                          type="password"
                          value={webServicePassword}
                          onChange={(e) => setWebServicePassword(e.target.value)}
                          className="w-full max-w-[280px] px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2DB39E] bg-white"
                          placeholder="user"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Parámetros */}
                  <div className="mb-6">
                    <h4 className="text-sm font-bold text-gray-700 mb-4 uppercase">Parámetros</h4>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Fecha inicio de cargue
                        </label>
                        <input
                          type="date"
                          value={webServiceFechaInicio}
                          onChange={(e) => setWebServiceFechaInicio(e.target.value)}
                          className="w-full max-w-[280px] px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2DB39E] bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Intervalo (Minutos)
                        </label>
                        <input
                          type="number"
                          value={webServiceIntervalo}
                          onChange={(e) => setWebServiceIntervalo(parseInt(e.target.value) || 30)}
                          min="1"
                          className="w-full max-w-[280px] px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2DB39E] bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Opciones de envío al RNDC */}
                  <div>
                    <h4 className="text-sm font-bold text-gray-700 mb-4 uppercase">Opciones de envío al RNDC</h4>
                    <div className="space-y-3">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={webServiceGPS}
                          onChange={(e) => setWebServiceGPS(e.target.checked)}
                          className="mt-1 w-4 h-4 text-[#2DB39E] bg-white border-gray-300 rounded focus:ring-[#2DB39E]"
                        />
                        <span className="text-sm text-gray-700">
                          <strong>GPS</strong> — enviar NumIdGPS de la remesa al RNDC (proceso 3)
                        </span>
                      </label>
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={webServiceOrdenServicio}
                          onChange={(e) => setWebServiceOrdenServicio(e.target.checked)}
                          className="mt-1 w-4 h-4 text-[#2DB39E] bg-white border-gray-300 rounded focus:ring-[#2DB39E]"
                        />
                        <span className="text-sm text-gray-700">
                          <strong>Orden de Servicio</strong> — enviar OrdenServicio de la remesa al RNDC
                        </span>
                      </label>
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={webServiceNITMonitoreo}
                          onChange={(e) => setWebServiceNITMonitoreo(e.target.checked)}
                          className="mt-1 w-4 h-4 text-[#2DB39E] bg-white border-gray-300 rounded focus:ring-[#2DB39E]"
                        />
                        <span className="text-sm text-gray-700">
                          <strong>NIT Monitoreo Flota</strong> — enviar NIT GPS del vehículo al RNDC (proceso 4)
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTransportTab === "rndc" && (
              <div className="space-y-8">
                {/* USUARIO 1: MONITOREO */}
                <div className="border border-gray-200 rounded-xl p-6 bg-gray-50">
                  <h3 className="text-lg font-bold text-[#2DB39E] mb-6">Usuario 1: Monitoreo</h3>

                  {/* Credenciales */}
                  <div className="mb-6">
                    <h4 className="text-sm font-bold text-gray-700 mb-4 uppercase">Credenciales</h4>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Usuario de Monitoreo
                        </label>
                        <input
                          type="text"
                          value={monitoreoUser}
                          onChange={(e) => setMonitoreoUser(e.target.value)}
                          className="w-full max-w-[280px] px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2DB39E] bg-white"
                          placeholder="Ingrese usuario"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Contraseña
                        </label>
                        <input
                          type="password"
                          value={monitoreoPassword}
                          onChange={(e) => setMonitoreoPassword(e.target.value)}
                          className="w-full max-w-[280px] px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2DB39E] bg-white"
                          placeholder="Ingrese contraseña"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Ejecución */}
                  <div className="mb-6">
                    <h4 className="text-sm font-bold text-gray-700 mb-4 uppercase">Ejecución</h4>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Frecuencia de consulta
                        </label>
                        <input
                          type="time"
                          value={monitoreoFrecuencia}
                          onChange={(e) => setMonitoreoFrecuencia(e.target.value)}
                          className="w-full max-w-[280px] px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2DB39E] bg-white"
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={monitoreoConsultaAuto}
                              onChange={(e) => setMonitoreoConsultaAuto(e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#2DB39E] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2DB39E]"></div>
                          </div>
                          <span className="text-sm font-medium text-gray-700">Activar consulta automática</span>
                        </label>
                        <div className="mt-2">
                          <span className={`inline-block px-3 py-1 rounded-md text-xs font-medium ${
                            monitoreoConsultaAuto ? "bg-green-100 text-green-800" : "bg-gray-200 text-gray-700"
                          }`}>
                            {monitoreoConsultaAuto ? "Consulta automática activada" : "Consulta automática"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Parámetros de Consulta */}
                  <div>
                    <h4 className="text-sm font-bold text-gray-700 mb-4 uppercase">Parámetros de Consulta</h4>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div>
                        <label className="flex items-center gap-3 cursor-pointer mb-3">
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={monitoreoParametrizarDias}
                              onChange={(e) => setMonitoreoParametrizarDias(e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#2DB39E] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2DB39E]"></div>
                          </div>
                          <span className="text-sm font-medium text-gray-700">Parametrizar días</span>
                        </label>
                        <input
                          type="number"
                          value={monitoreoDias}
                          onChange={(e) => setMonitoreoDias(parseInt(e.target.value) || 1)}
                          min="1"
                          className="w-full max-w-[280px] px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2DB39E] bg-white"
                        />
                      </div>
                      <div className="flex items-end">
                        <span className={`inline-block px-3 py-1 rounded-md text-xs font-medium ${
                          monitoreoParametrizarDias ? "bg-green-100 text-green-800" : "bg-gray-200 text-gray-700"
                        }`}>
                          {monitoreoParametrizarDias ? `Días parametrizados: ${monitoreoDias}` : "Días automáticos desactivados"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* USUARIO 2: FACTURACIÓN */}
                <div className="border border-gray-200 rounded-xl p-6 bg-gray-50">
                  <h3 className="text-lg font-bold text-[#2DB39E] mb-6">Usuario 2: Facturación</h3>

                  {/* Credenciales */}
                  <div className="mb-6">
                    <h4 className="text-sm font-bold text-gray-700 mb-4 uppercase">Credenciales</h4>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Usuario de Facturación
                        </label>
                        <input
                          type="text"
                          value={facturacionUser}
                          onChange={(e) => setFacturacionUser(e.target.value)}
                          className="w-full max-w-[280px] px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2DB39E] bg-white"
                          placeholder="Ingrese usuario"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Contraseña
                        </label>
                        <input
                          type="password"
                          value={facturacionPassword}
                          onChange={(e) => setFacturacionPassword(e.target.value)}
                          className="w-full max-w-[280px] px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2DB39E] bg-white"
                          placeholder="Ingrese contraseña"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Ejecución */}
                  <div className="mb-6">
                    <h4 className="text-sm font-bold text-gray-700 mb-4 uppercase">Ejecución</h4>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Fecha inicio de cargue
                        </label>
                        <input
                          type="date"
                          value={facturacionFechaInicio}
                          onChange={(e) => setFacturacionFechaInicio(e.target.value)}
                          className="w-full max-w-[280px] px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2DB39E] bg-white"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Fecha actual: <span className="px-2 py-0.5 bg-gray-200 text-gray-700 rounded text-xs">Hoy</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Ejecución Segunda */}
                  <div>
                    <h4 className="text-sm font-bold text-gray-700 mb-4 uppercase">Opciones</h4>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={facturacionMercanciaConsolidada}
                          onChange={(e) => setFacturacionMercanciaConsolidada(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#2DB39E] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2DB39E]"></div>
                      </div>
                      <span className="text-sm font-medium text-gray-700">Activar transporte de mercancía consolidada</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTransportTab === "qr" && (
              <div className="space-y-4">
                <p className="text-gray-600">Configuración de QR Manifiesto - En desarrollo</p>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="sticky bottom-0 left-0 right-0 bg-white lg:bg-transparent flex flex-col lg:flex-row items-stretch lg:items-center justify-end gap-2 lg:gap-3 p-4 lg:p-0 border-t border-gray-200 lg:border-t-0 -mx-6 lg:mx-0 -mb-6 lg:mb-0 shadow-lg lg:shadow-none">
          <button
            type="button"
            className="w-full lg:w-auto px-4 lg:px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 active:scale-95 transition-all font-medium order-2 lg:order-1"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="w-full lg:w-auto flex items-center justify-center gap-2 px-4 lg:px-6 py-3 bg-gradient-to-r from-[#40A095] to-[#99D6CF] text-white rounded-lg hover:from-[#99D6CF] hover:to-[#40A095] active:scale-95 transition-all shadow-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed order-1 lg:order-2"
          >
            {isSaving ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span className="hidden lg:inline">Guardando...</span>
                <span className="lg:hidden">Guardando...</span>
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span className="hidden lg:inline">Guardar Cambios</span>
                <span className="lg:hidden">Guardar</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}