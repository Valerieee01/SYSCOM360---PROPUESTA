import { useState } from "react";
import { LayoutDashboard, FileStack, Sparkles, Shield, Clock } from "lucide-react";
import TransportDashboard from "./TransportDashboard";
import Transporte from "./Transporte";
import ProgramacionViajes from "./ProgramacionViajes";
import IntegracionRNDC from "./IntegracionRNDC";
import HistorialViaje from "./HistorialViaje";

type TabType = "dashboard" | "documentos" | "programacion" | "rndc" | "historial";

export default function TransporteMain() {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");

  return (
    <div>
      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-6">
        <div className="flex gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex items-center gap-2 px-6 py-4 font-medium transition-all border-b-2 whitespace-nowrap ${
              activeTab === "dashboard"
                ? "text-blue-600 border-blue-600"
                : "text-gray-600 border-transparent hover:text-gray-900"
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard de Seguimiento
          </button>
          <button
            onClick={() => setActiveTab("programacion")}
            className={`flex items-center gap-2 px-6 py-4 font-medium transition-all border-b-2 whitespace-nowrap ${
              activeTab === "programacion"
                ? "text-purple-600 border-purple-600"
                : "text-gray-600 border-transparent hover:text-gray-900"
            }`}
          >
            <Sparkles className="w-5 h-5" />
            Programación IA
          </button>
          <button
            onClick={() => setActiveTab("rndc")}
            className={`flex items-center gap-2 px-6 py-4 font-medium transition-all border-b-2 whitespace-nowrap ${
              activeTab === "rndc"
                ? "text-blue-600 border-blue-600"
                : "text-gray-600 border-transparent hover:text-gray-900"
            }`}
          >
            <Shield className="w-5 h-5" />
            Integración RNDC
          </button>
          <button
            onClick={() => setActiveTab("historial")}
            className={`flex items-center gap-2 px-6 py-4 font-medium transition-all border-b-2 whitespace-nowrap ${
              activeTab === "historial"
                ? "text-purple-600 border-purple-600"
                : "text-gray-600 border-transparent hover:text-gray-900"
            }`}
          >
            <Clock className="w-5 h-5" />
            Historial de Viajes
          </button>
          <button
            onClick={() => setActiveTab("documentos")}
            className={`flex items-center gap-2 px-6 py-4 font-medium transition-all border-b-2 whitespace-nowrap ${
              activeTab === "documentos"
                ? "text-blue-600 border-blue-600"
                : "text-gray-600 border-transparent hover:text-gray-900"
            }`}
          >
            <FileStack className="w-5 h-5" />
            Gestión de Documentos
          </button>
        </div>
      </div>

      {/* Content */}
      <div>
        {activeTab === "dashboard" && <TransportDashboard />}
        {activeTab === "programacion" && <ProgramacionViajes />}
        {activeTab === "rndc" && <IntegracionRNDC />}
        {activeTab === "historial" && <HistorialViaje />}
        {activeTab === "documentos" && <Transporte />}
      </div>
    </div>
  );
}