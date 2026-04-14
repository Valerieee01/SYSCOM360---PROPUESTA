import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router';
import {
  LayoutDashboard,
  Package,
  FileText,
  Truck,
  MapPin,
  DollarSign,
  CheckCircle,
  Menu,
  X,
  Settings,
  User
} from 'lucide-react';
import { useState } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const menuItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/pedidos', label: 'Pedidos', icon: Package },
  { path: '/ordenes', label: 'Órdenes de Cargue', icon: FileText },
  { path: '/remesas', label: 'Remesas', icon: MapPin },
  { path: '/manifiestos', label: 'Manifiestos', icon: Truck },
  { path: '/anticipos', label: 'Anticipos', icon: DollarSign },
  { path: '/cumplidos', label: 'Cumplidos', icon: CheckCircle },
];

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <h1 className="text-lg font-bold text-blue-600">Syscom web</h1>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <User className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-blue-900 to-blue-800 text-white z-50 transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-blue-700">
          <h1 className="text-2xl font-bold">Syscom web</h1>
          <p className="text-sm text-blue-200 mt-1">Módulo de Transporte</p>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-180px)]">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-white text-blue-900 font-semibold shadow-md'
                    : 'hover:bg-blue-700 text-blue-100'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-blue-700">
          <button className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-700 transition-all w-full text-blue-100">
            <Settings className="w-5 h-5" />
            <span className="text-sm">Configuración</span>
          </button>
        </div>
      </aside>

      {/* Overlay para mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen">
        {children}
      </main>
    </div>
  );
}
