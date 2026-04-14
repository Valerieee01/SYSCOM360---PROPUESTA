import { createContext, useContext, useState, ReactNode } from 'react';

// Tipos
export type EstadoDocumento = 'borrador' | 'pendiente' | 'en_proceso' | 'completado' | 'cancelado';

export interface Pedido {
  id: string;
  numero: string;
  fecha: string;
  cliente: string;
  origen: string;
  destino: string;
  mercancia: string;
  peso: number;
  valor: number;
  estado: EstadoDocumento;
  ordenId?: string;
}

export interface Vehiculo {
  id: string;
  placa: string;
  marca: string;
  modelo: string;
  capacidadKg: number;
  disponible: boolean;
  enMantenimiento: boolean;
  conductorAsignadoId?: string;
  documentosVencidos: boolean;
}

export interface Conductor {
  id: string;
  nombre: string;
  cedula: string;
  licencia: string;
  celular: string;
  disponible: boolean;
  vehiculoAsignadoId?: string;
}

export interface OrdenCargue {
  id: string;
  numero: string;
  fecha: string;
  pedidoId: string;
  vehiculoId: string;
  conductorId: string;
  ruta: string;
  estado: EstadoDocumento;
  remesaId?: string;
}

export interface Remesa {
  id: string;
  numero: string;
  fecha: string;
  ordenId: string;
  manifiesto?: string;
  estado: EstadoDocumento;
  manifiestoId?: string;
}

export interface Manifiesto {
  id: string;
  numero: string;
  fecha: string;
  remesaIds: string[];
  conductorId: string;
  vehiculoId: string;
  estado: EstadoDocumento;
  anticipoId?: string;
  cumplidoId?: string;
}

export interface Anticipo {
  id: string;
  numero: string;
  fecha: string;
  manifiestoId: string;
  monto: number;
  estado: EstadoDocumento;
}

export interface Cumplido {
  id: string;
  numero: string;
  fecha: string;
  manifiestoId: string;
  fechaEntrega: string;
  receptor: string;
  observaciones: string;
  estado: EstadoDocumento;
}

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

interface TransportContextType {
  // Estados
  pedidos: Pedido[];
  vehiculos: Vehiculo[];
  conductores: Conductor[];
  ordenes: OrdenCargue[];
  remesas: Remesa[];
  manifiestos: Manifiesto[];
  anticipos: Anticipo[];
  cumplidos: Cumplido[];
  toasts: Toast[];

  // Métodos
  agregarPedido: (pedido: Omit<Pedido, 'id'>) => string;
  actualizarPedido: (id: string, pedido: Partial<Pedido>) => void;
  agregarVehiculo: (vehiculo: Omit<Vehiculo, 'id'>) => string;
  agregarConductor: (conductor: Omit<Conductor, 'id'>) => string;
  crearOrden: (orden: Omit<OrdenCargue, 'id' | 'numero'>) => string;
  crearRemesa: (remesa: Omit<Remesa, 'id' | 'numero'>) => string;
  crearManifiesto: (manifiesto: Omit<Manifiesto, 'id' | 'numero'>) => string;
  crearAnticipo: (anticipo: Omit<Anticipo, 'id' | 'numero'>) => string;
  crearCumplido: (cumplido: Omit<Cumplido, 'id' | 'numero'>) => string;
  mostrarToast: (type: ToastType, message: string, duration?: number) => void;
  ocultarToast: (id: string) => void;
}

const TransportContext = createContext<TransportContextType | undefined>(undefined);

// Datos iniciales
const pedidosIniciales: Pedido[] = [
  {
    id: '1',
    numero: 'PED-2026-001',
    fecha: '2026-04-01',
    cliente: 'Almacenes Éxito',
    origen: 'Cali',
    destino: 'Bogotá',
    mercancia: 'Alimentos no perecederos',
    peso: 15000,
    valor: 45000000,
    estado: 'pendiente'
  },
  {
    id: '2',
    numero: 'PED-2026-002',
    fecha: '2026-04-02',
    cliente: 'Carrefour',
    origen: 'Medellín',
    destino: 'Barranquilla',
    mercancia: 'Electrodomésticos',
    peso: 8000,
    valor: 120000000,
    estado: 'pendiente'
  },
  {
    id: '3',
    numero: 'PED-2026-003',
    fecha: '2026-04-03',
    cliente: 'Homecenter',
    origen: 'Bogotá',
    destino: 'Cali',
    mercancia: 'Materiales de construcción',
    peso: 20000,
    valor: 35000000,
    estado: 'en_proceso',
    ordenId: 'ord-1'
  }
];

const vehiculosIniciales: Vehiculo[] = [
  {
    id: 'v1',
    placa: 'ABC-123',
    marca: 'Freightliner',
    modelo: 'Cascadia 2024',
    capacidadKg: 18000,
    disponible: true,
    enMantenimiento: false,
    documentosVencidos: false
  },
  {
    id: 'v2',
    placa: 'DEF-456',
    marca: 'Kenworth',
    modelo: 'T680 2023',
    capacidadKg: 22000,
    disponible: true,
    enMantenimiento: false,
    documentosVencidos: false
  },
  {
    id: 'v3',
    placa: 'GHI-789',
    marca: 'Volvo',
    modelo: 'FH16 2023',
    capacidadKg: 25000,
    disponible: false,
    enMantenimiento: true,
    documentosVencidos: false
  },
  {
    id: 'v4',
    placa: 'JKL-012',
    marca: 'Scania',
    modelo: 'R450 2022',
    capacidadKg: 20000,
    disponible: false,
    enMantenimiento: false,
    conductorAsignadoId: 'c1',
    documentosVencidos: true
  }
];

const conductoresIniciales: Conductor[] = [
  {
    id: 'c1',
    nombre: 'Juan Carlos Pérez',
    cedula: '1234567890',
    licencia: 'C2',
    celular: '300-123-4567',
    disponible: false,
    vehiculoAsignadoId: 'v4'
  },
  {
    id: 'c2',
    nombre: 'María López García',
    cedula: '0987654321',
    licencia: 'C2',
    celular: '301-987-6543',
    disponible: true
  },
  {
    id: 'c3',
    nombre: 'Carlos Rodríguez',
    cedula: '1122334455',
    licencia: 'C3',
    celular: '302-555-1234',
    disponible: true
  },
  {
    id: 'c4',
    nombre: 'Ana Martínez',
    cedula: '5544332211',
    licencia: 'C2',
    celular: '310-444-5678',
    disponible: true
  }
];

export function TransportProvider({ children }: { children: ReactNode }) {
  const [pedidos, setPedidos] = useState<Pedido[]>(pedidosIniciales);
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>(vehiculosIniciales);
  const [conductores, setConductores] = useState<Conductor[]>(conductoresIniciales);
  const [ordenes, setOrdenes] = useState<OrdenCargue[]>([]);
  const [remesas, setRemesas] = useState<Remesa[]>([]);
  const [manifiestos, setManifiestos] = useState<Manifiesto[]>([]);
  const [anticipos, setAnticipos] = useState<Anticipo[]>([]);
  const [cumplidos, setCumplidos] = useState<Cumplido[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const agregarPedido = (pedido: Omit<Pedido, 'id'>) => {
    const id = `ped-${Date.now()}`;
    setPedidos(prev => [...prev, { ...pedido, id }]);
    return id;
  };

  const actualizarPedido = (id: string, pedidoActualizado: Partial<Pedido>) => {
    setPedidos(prev => prev.map(p => p.id === id ? { ...p, ...pedidoActualizado } : p));
  };

  const agregarVehiculo = (vehiculo: Omit<Vehiculo, 'id'>) => {
    const id = `veh-${Date.now()}`;
    setVehiculos(prev => [...prev, { ...vehiculo, id }]);
    return id;
  };

  const agregarConductor = (conductor: Omit<Conductor, 'id'>) => {
    const id = `cond-${Date.now()}`;
    setConductores(prev => [...prev, { ...conductor, id }]);
    return id;
  };

  const crearOrden = (orden: Omit<OrdenCargue, 'id' | 'numero'>) => {
    const id = `ord-${Date.now()}`;
    const numero = `ORD-${new Date().getFullYear()}-${String(ordenes.length + 1).padStart(3, '0')}`;
    const nuevaOrden = { ...orden, id, numero };
    setOrdenes(prev => [...prev, nuevaOrden]);

    // Actualizar estado del pedido
    actualizarPedido(orden.pedidoId, { estado: 'en_proceso', ordenId: id });

    // Actualizar disponibilidad del vehículo y conductor
    setVehiculos(prev => prev.map(v =>
      v.id === orden.vehiculoId ? { ...v, disponible: false, conductorAsignadoId: orden.conductorId } : v
    ));
    setConductores(prev => prev.map(c =>
      c.id === orden.conductorId ? { ...c, disponible: false, vehiculoAsignadoId: orden.vehiculoId } : c
    ));

    return id;
  };

  const crearRemesa = (remesa: Omit<Remesa, 'id' | 'numero'>) => {
    const id = `rem-${Date.now()}`;
    const numero = `REM-${new Date().getFullYear()}-${String(remesas.length + 1).padStart(3, '0')}`;
    const nuevaRemesa = { ...remesa, id, numero };
    setRemesas(prev => [...prev, nuevaRemesa]);

    // Actualizar orden
    setOrdenes(prev => prev.map(o =>
      o.id === remesa.ordenId ? { ...o, remesaId: id } : o
    ));

    return id;
  };

  const crearManifiesto = (manifiesto: Omit<Manifiesto, 'id' | 'numero'>) => {
    const id = `man-${Date.now()}`;
    const numero = `MAN-${new Date().getFullYear()}-${String(manifiestos.length + 1).padStart(3, '0')}`;
    const nuevoManifiesto = { ...manifiesto, id, numero };
    setManifiestos(prev => [...prev, nuevoManifiesto]);

    // Actualizar remesas
    setRemesas(prev => prev.map(r =>
      manifiesto.remesaIds.includes(r.id) ? { ...r, manifiestoId: id, manifiesto: numero } : r
    ));

    return id;
  };

  const crearAnticipo = (anticipo: Omit<Anticipo, 'id' | 'numero'>) => {
    const id = `ant-${Date.now()}`;
    const numero = `ANT-${new Date().getFullYear()}-${String(anticipos.length + 1).padStart(3, '0')}`;
    const nuevoAnticipo = { ...anticipo, id, numero };
    setAnticipos(prev => [...prev, nuevoAnticipo]);

    // Actualizar manifiesto
    setManifiestos(prev => prev.map(m =>
      m.id === anticipo.manifiestoId ? { ...m, anticipoId: id } : m
    ));

    return id;
  };

  const crearCumplido = (cumplido: Omit<Cumplido, 'id' | 'numero'>) => {
    const id = `cum-${Date.now()}`;
    const numero = `CUM-${new Date().getFullYear()}-${String(cumplidos.length + 1).padStart(3, '0')}`;
    const nuevoCumplido = { ...cumplido, id, numero };
    setCumplidos(prev => [...prev, nuevoCumplido]);

    // Actualizar manifiesto a completado
    setManifiestos(prev => prev.map(m =>
      m.id === cumplido.manifiestoId ? { ...m, cumplidoId: id, estado: 'completado' } : m
    ));

    // Liberar vehículo y conductor
    const manifiesto = manifiestos.find(m => m.id === cumplido.manifiestoId);
    if (manifiesto) {
      setVehiculos(prev => prev.map(v =>
        v.id === manifiesto.vehiculoId ? { ...v, disponible: true, conductorAsignadoId: undefined } : v
      ));
      setConductores(prev => prev.map(c =>
        c.id === manifiesto.conductorId ? { ...c, disponible: true, vehiculoAsignadoId: undefined } : c
      ));
    }

    return id;
  };

  const mostrarToast = (type: ToastType, message: string, duration = 5000) => {
    const id = `toast-${Date.now()}`;
    const newToast: Toast = { id, type, message, duration };
    setToasts(prev => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        ocultarToast(id);
      }, duration);
    }
  };

  const ocultarToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <TransportContext.Provider
      value={{
        pedidos,
        vehiculos,
        conductores,
        ordenes,
        remesas,
        manifiestos,
        anticipos,
        cumplidos,
        toasts,
        agregarPedido,
        actualizarPedido,
        agregarVehiculo,
        agregarConductor,
        crearOrden,
        crearRemesa,
        crearManifiesto,
        crearAnticipo,
        crearCumplido,
        mostrarToast,
        ocultarToast
      }}
    >
      {children}
    </TransportContext.Provider>
  );
}

export function useTransport() {
  const context = useContext(TransportContext);
  if (!context) {
    throw new Error('useTransport debe ser usado dentro de TransportProvider');
  }
  return context;
}
