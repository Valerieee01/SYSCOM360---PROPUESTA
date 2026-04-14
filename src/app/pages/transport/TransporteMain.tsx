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
    <div className="h-full flex flex-col">
      {/* Tabs - Optimizado para móvil */}
      <div className="bg-white border-b border-gray-200">
        {/* Desktop Tabs */}
        <div className="hidden lg:flex gap-2 overflow-x-auto px-6">
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

        {/* Mobile Tabs - Horizontal Scroll */}
        <div className="lg:hidden overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 px-4 py-2 min-w-max">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex flex-col items-center justify-center px-4 py-3 rounded-lg font-medium transition-all min-w-[100px] ${
                activeTab === "dashboard"
                  ? "bg-gradient-to-br from-blue-500/10 to-blue-600/10 text-blue-600 shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <LayoutDashboard className="w-6 h-6 mb-1" />
              <span className="text-xs whitespace-nowrap">Dashboard</span>
            </button>
            <button
              onClick={() => setActiveTab("programacion")}
              className={`flex flex-col items-center justify-center px-4 py-3 rounded-lg font-medium transition-all min-w-[100px] ${
                activeTab === "programacion"
                  ? "bg-gradient-to-br from-purple-500/10 to-purple-600/10 text-purple-600 shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Sparkles className="w-6 h-6 mb-1" />
              <span className="text-xs whitespace-nowrap">Prog. IA</span>
            </button>
            <button
              onClick={() => setActiveTab("rndc")}
              className={`flex flex-col items-center justify-center px-4 py-3 rounded-lg font-medium transition-all min-w-[100px] ${
                activeTab === "rndc"
                  ? "bg-gradient-to-br from-blue-500/10 to-blue-600/10 text-blue-600 shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Shield className="w-6 h-6 mb-1" />
              <span className="text-xs whitespace-nowrap">RNDC</span>
            </button>
            <button
              onClick={() => setActiveTab("historial")}
              className={`flex flex-col items-center justify-center px-4 py-3 rounded-lg font-medium transition-all min-w-[100px] ${
                activeTab === "historial"
                  ? "bg-gradient-to-br from-purple-500/10 to-purple-600/10 text-purple-600 shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Clock className="w-6 h-6 mb-1" />
              <span className="text-xs whitespace-nowrap">Historial</span>
            </button>
            <button
              onClick={() => setActiveTab("documentos")}
              className={`flex flex-col items-center justify-center px-4 py-3 rounded-lg font-medium transition-all min-w-[100px] ${
                activeTab === "documentos"
                  ? "bg-gradient-to-br from-blue-500/10 to-blue-600/10 text-blue-600 shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <FileStack className="w-6 h-6 mb-1" />
              <span className="text-xs whitespace-nowrap">Documentos</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {activeTab === "dashboard" && <TransportDashboard />}
        {activeTab === "programacion" && <ProgramacionViajes />}
        {activeTab === "rndc" && <IntegracionRNDC />}
        {activeTab === "historial" && <HistorialViaje />}
        {activeTab === "documentos" && <Transporte />}
      </div>
    </div>
  );
}