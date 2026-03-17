import { useState } from "react";
import { Play, CheckCircle, XCircle, Clock, BarChart3 } from "lucide-react";

interface Process {
  id: string;
  name: string;
  description: string;
  status: "Pendiente" | "En Proceso" | "Completado" | "Error";
  lastRun: string;
  duration: string;
}

const processes: Process[] = [
  {
    id: "1",
    name: "Cierre Mensual",
    description: "Proceso de cierre contable del mes",
    status: "Completado",
    lastRun: "2024-03-01 08:30",
    duration: "15 min",
  },
  {
    id: "2",
    name: "Causación de Nómina",
    description: "Causación contable de la nómina mensual",
    status: "Pendiente",
    lastRun: "2024-02-28 10:00",
    duration: "8 min",
  },
  {
    id: "3",
    name: "Depreciación de Activos",
    description: "Cálculo y registro de depreciaciones",
    status: "En Proceso",
    lastRun: "2024-03-14 14:20",
    duration: "12 min",
  },
  {
    id: "4",
    name: "Conciliación Bancaria",
    description: "Conciliación de cuentas bancarias",
    status: "Completado",
    lastRun: "2024-03-13 09:15",
    duration: "20 min",
  },
  {
    id: "5",
    name: "Generación de Informes Financieros",
    description: "Estados financieros mensuales",
    status: "Pendiente",
    lastRun: "2024-02-29 16:00",
    duration: "10 min",
  },
];

export default function ProcesosContabilidad() {
  const [selectedProcess, setSelectedProcess] = useState<Process | null>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completado":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "En Proceso":
        return <Clock className="w-5 h-5 text-blue-600 animate-spin" />;
      case "Error":
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completado":
        return "bg-green-100 text-green-800";
      case "En Proceso":
        return "bg-blue-100 text-blue-800";
      case "Error":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Procesos Contables
        </h1>
        <p className="text-gray-600 mt-1">
          Automatización y control de procesos contables
        </p>
      </div>

      {/* Process Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {processes.map((process) => (
          <div
            key={process.id}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {process.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {process.description}
                  </p>
                </div>
              </div>
              {getStatusIcon(process.status)}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Estado:</span>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    process.status
                  )}`}
                >
                  {process.status}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Última ejecución:</span>
                <span className="font-medium text-gray-900">{process.lastRun}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Duración:</span>
                <span className="font-medium text-gray-900">{process.duration}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md">
                <Play className="w-4 h-4" />
                <span>Ejecutar</span>
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all">
                Ver Log
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
