import { createBrowserRouter, Navigate } from "react-router";
import MainLayout from "./components/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import TransporteMain from "./pages/transport/TransporteMain";
import Maestros from "./pages/transport/Maestros";
import ContabilidadDashboard from "./pages/contabilidad/ContabilidadDashboard";
import DocumentosContabilidad from "./pages/contabilidad/DocumentosContabilidad";
import ProcesosContabilidad from "./pages/contabilidad/ProcesosContabilidad";
import NominaDashboard from "./pages/nomina/NominaDashboard";
import DocumentosNomina from "./pages/nomina/DocumentosNomina";
import ProcesosNomina from "./pages/nomina/ProcesosNomina";
import EDSDashboard from "./pages/eds/EDSDashboard";
import DocumentosEDS from "./pages/eds/DocumentosEDS";
import ProcesosEDS from "./pages/eds/ProcesosEDS";
import ParametrizacionEmpresa from "./pages/ParametrizacionEmpresa";

// Wrapper component for protected routes
const ProtectedLayout = () => (
  <ProtectedRoute>
    <MainLayout />
  </ProtectedRoute>
);

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    Component: ProtectedLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "transporte", Component: TransporteMain },
      { path: "transporte/maestros", Component: Maestros },
      { path: "contabilidad", Component: ContabilidadDashboard },
      { path: "contabilidad/documentos", Component: DocumentosContabilidad },
      { path: "contabilidad/procesos", Component: ProcesosContabilidad },
      { path: "nomina", Component: NominaDashboard },
      { path: "nomina/documentos", Component: DocumentosNomina },
      { path: "nomina/procesos", Component: ProcesosNomina },
      { path: "eds", Component: EDSDashboard },
      { path: "eds/documentos", Component: DocumentosEDS },
      { path: "eds/procesos", Component: ProcesosEDS },
      { path: "parametrizacion", Component: ParametrizacionEmpresa },
    ],
  },
]);