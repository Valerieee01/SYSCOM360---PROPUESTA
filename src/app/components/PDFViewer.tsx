import { X, Download, Printer } from "lucide-react";

interface PDFViewerProps {
  documentData: any;
  documentType: string;
  onClose: () => void;
}

export default function PDFViewer({ documentData, documentType, onClose }: PDFViewerProps) {
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    alert(`Descargando ${documentData.numero}.pdf`);
  };

  // Función para renderizar el contenido del PDF según el tipo de documento
  const renderPDFContent = () => {
    switch (documentType) {
      case "Pedidos":
        return renderPedidoPDF();
      case "Órdenes de Cargue":
        return renderOrdenCarguePDF();
      case "Remesas":
        return renderRemesaPDF();
      case "Manifiestos":
        return renderManifiestoPDF();
      case "Anticipos":
        return renderAnticipoPDF();
      case "Cumplidos":
        return renderCumplidoPDF();
      default:
        return <div>Tipo de documento no reconocido</div>;
    }
  };

  const renderPedidoPDF = () => (
    <div className="space-y-6">
      {/* Header del Documento */}
      <div className="border-b-4 border-teal-600 pb-4">
        <div className="flex justify-between items-start">
          <div>
            <img src="https://via.placeholder.com/150x50/40A095/FFFFFF?text=SYSCOM360" alt="Logo" className="h-12 mb-2" />
            <p className="text-xs text-gray-600">NIT: 900.123.456-7</p>
            <p className="text-xs text-gray-600">Transporte de Carga Nacional</p>
          </div>
          <div className="text-right">
            <h1 className="text-2xl font-bold text-teal-600">PEDIDO</h1>
            <p className="text-lg font-bold text-gray-900">{documentData.numero}</p>
            <p className="text-sm text-gray-600">Fecha: {documentData.fecha}</p>
          </div>
        </div>
      </div>

      {/* Información del Cliente */}
      <div>
        <h3 className="text-sm font-bold text-gray-700 mb-2 bg-gray-100 p-2">INFORMACIÓN DEL CLIENTE</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Cliente:</p>
            <p className="font-semibold text-gray-900">{documentData.cliente}</p>
          </div>
          <div>
            <p className="text-gray-600">NIT/CC:</p>
            <p className="font-semibold text-gray-900">800.456.789-1</p>
          </div>
        </div>
      </div>

      {/* Detalles del Servicio */}
      <div>
        <h3 className="text-sm font-bold text-gray-700 mb-2 bg-gray-100 p-2">DETALLES DEL SERVICIO</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Origen:</p>
            <p className="font-semibold text-gray-900">{documentData.origen}</p>
          </div>
          <div>
            <p className="text-gray-600">Destino:</p>
            <p className="font-semibold text-gray-900">{documentData.destino}</p>
          </div>
          <div>
            <p className="text-gray-600">Tipo de Carga:</p>
            <p className="font-semibold text-gray-900">Carga General</p>
          </div>
          <div>
            <p className="text-gray-600">Peso Estimado:</p>
            <p className="font-semibold text-gray-900">8,500 kg</p>
          </div>
        </div>
      </div>

      {/* Valores */}
      <div>
        <h3 className="text-sm font-bold text-gray-700 mb-2 bg-gray-100 p-2">VALORES</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Valor del Servicio:</span>
            <span className="font-semibold text-gray-900">${documentData.valor?.toLocaleString("es-CO")}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">IVA (0%):</span>
            <span className="font-semibold text-gray-900">$0</span>
          </div>
          <div className="flex justify-between border-t-2 border-gray-300 pt-2">
            <span className="font-bold text-gray-900">TOTAL:</span>
            <span className="font-bold text-teal-600 text-lg">${documentData.valor?.toLocaleString("es-CO")}</span>
          </div>
        </div>
      </div>

      {/* Estado */}
      <div className="border-t-2 border-gray-200 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-600">Estado del Pedido:</p>
            <p className="font-bold text-lg text-green-600">{documentData.estado}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Generado por: Sistema Syscom360</p>
            <p className="text-xs text-gray-500">Fecha de impresión: {new Date().toLocaleString("es-CO")}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOrdenCarguePDF = () => (
    <div className="space-y-6">
      <div className="border-b-4 border-green-600 pb-4">
        <div className="flex justify-between items-start">
          <div>
            <img src="https://via.placeholder.com/150x50/40A095/FFFFFF?text=SYSCOM360" alt="Logo" className="h-12 mb-2" />
            <p className="text-xs text-gray-600">NIT: 900.123.456-7</p>
          </div>
          <div className="text-right">
            <h1 className="text-2xl font-bold text-green-600">ORDEN DE CARGUE</h1>
            <p className="text-lg font-bold text-gray-900">{documentData.numero}</p>
            <p className="text-sm text-gray-600">Fecha: {documentData.fecha}</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-gray-700 mb-2 bg-gray-100 p-2">INFORMACIÓN DE CARGUE</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Punto de Cargue:</p>
            <p className="font-semibold text-gray-900">{documentData.origen}</p>
            <p className="text-xs text-gray-500">Calle 123 #45-67, Bodega 5</p>
          </div>
          <div>
            <p className="text-gray-600">Fecha/Hora de Cargue:</p>
            <p className="font-semibold text-gray-900">{documentData.fecha} 08:00 AM</p>
          </div>
          <div>
            <p className="text-gray-600">Responsable de Cargue:</p>
            <p className="font-semibold text-gray-900">Juan Pérez</p>
          </div>
          <div>
            <p className="text-gray-600">Vehículo Asignado:</p>
            <p className="font-semibold text-gray-900">ABC-123</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-gray-700 mb-2 bg-gray-100 p-2">DETALLE DE MERCANCÍA</h3>
        <table className="w-full text-sm border border-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="border border-gray-300 p-2 text-left">Item</th>
              <th className="border border-gray-300 p-2 text-left">Descripción</th>
              <th className="border border-gray-300 p-2 text-right">Cantidad</th>
              <th className="border border-gray-300 p-2 text-right">Peso (kg)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2">1</td>
              <td className="border border-gray-300 p-2">Mercancía General</td>
              <td className="border border-gray-300 p-2 text-right">50</td>
              <td className="border border-gray-300 p-2 text-right">8,500</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="border-t-2 border-gray-200 pt-4">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <p className="text-xs text-gray-600 mb-8">Firma Responsable de Cargue:</p>
            <div className="border-t border-gray-400 pt-2">
              <p className="text-xs text-center">___________________________</p>
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-8">Firma Conductor:</p>
            <div className="border-t border-gray-400 pt-2">
              <p className="text-xs text-center">___________________________</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRemesaPDF = () => (
    <div className="space-y-6">
      <div className="border-b-4 border-purple-600 pb-4">
        <div className="flex justify-between items-start">
          <div>
            <img src="https://via.placeholder.com/150x50/40A095/FFFFFF?text=SYSCOM360" alt="Logo" className="h-12 mb-2" />
            <p className="text-xs text-gray-600">NIT: 900.123.456-7</p>
          </div>
          <div className="text-right">
            <h1 className="text-2xl font-bold text-purple-600">REMESA</h1>
            <p className="text-lg font-bold text-gray-900">{documentData.numero}</p>
            <p className="text-sm text-gray-600">Fecha: {documentData.fecha}</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-gray-700 mb-2 bg-gray-100 p-2">DATOS DE LA REMESA</h3>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Remitente:</p>
            <p className="font-semibold text-gray-900">{documentData.cliente}</p>
          </div>
          <div>
            <p className="text-gray-600">Origen:</p>
            <p className="font-semibold text-gray-900">{documentData.origen}</p>
          </div>
          <div>
            <p className="text-gray-600">Destino:</p>
            <p className="font-semibold text-gray-900">{documentData.destino}</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-gray-700 mb-2 bg-gray-100 p-2">DESCRIPCIÓN DE MERCANCÍA</h3>
        <table className="w-full text-sm border border-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="border border-gray-300 p-2 text-left">Descripción</th>
              <th className="border border-gray-300 p-2 text-right">Cantidad</th>
              <th className="border border-gray-300 p-2 text-right">Peso (kg)</th>
              <th className="border border-gray-300 p-2 text-right">Valor Declarado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2">Mercancía General - Electrodomésticos</td>
              <td className="border border-gray-300 p-2 text-right">25 cajas</td>
              <td className="border border-gray-300 p-2 text-right">8,500</td>
              <td className="border border-gray-300 p-2 text-right">${documentData.valor?.toLocaleString("es-CO")}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-yellow-50 border border-yellow-300 p-4 rounded-lg">
        <p className="text-xs font-bold text-yellow-800 mb-2">INSTRUCCIONES ESPECIALES:</p>
        <p className="text-xs text-yellow-700">Mercancía frágil - Manejar con cuidado</p>
      </div>
    </div>
  );

  const renderManifiestoPDF = () => (
    <div className="space-y-6">
      <div className="border-b-4 border-orange-600 pb-4">
        <div className="flex justify-between items-start">
          <div>
            <img src="https://via.placeholder.com/150x50/40A095/FFFFFF?text=SYSCOM360" alt="Logo" className="h-12 mb-2" />
            <p className="text-xs text-gray-600">NIT: 900.123.456-7</p>
          </div>
          <div className="text-right">
            <h1 className="text-2xl font-bold text-orange-600">MANIFIESTO DE CARGA</h1>
            <p className="text-lg font-bold text-gray-900">{documentData.numero}</p>
            <p className="text-sm text-gray-600">Fecha: {documentData.fecha}</p>
            <p className="text-xs text-green-600 font-semibold mt-1">RNDC: 88745623</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-gray-700 mb-2 bg-gray-100 p-2">DATOS DEL CONDUCTOR</h3>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Nombre:</p>
            <p className="font-semibold text-gray-900">Juan Pérez Gómez</p>
          </div>
          <div>
            <p className="text-gray-600">Cédula:</p>
            <p className="font-semibold text-gray-900">CC 1.234.567</p>
          </div>
          <div>
            <p className="text-gray-600">Licencia:</p>
            <p className="font-semibold text-gray-900">C2 - 12345678</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-gray-700 mb-2 bg-gray-100 p-2">DATOS DEL VEHÍCULO</h3>
        <div className="grid grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Placa:</p>
            <p className="font-semibold text-gray-900">ABC-123</p>
          </div>
          <div>
            <p className="text-gray-600">Tipo:</p>
            <p className="font-semibold text-gray-900">Tractocamión</p>
          </div>
          <div>
            <p className="text-gray-600">Remolque:</p>
            <p className="font-semibold text-gray-900">XYZ-456</p>
          </div>
          <div>
            <p className="text-gray-600">SOAT:</p>
            <p className="font-semibold text-gray-900">Vigente</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-gray-700 mb-2 bg-gray-100 p-2">REMESAS ASOCIADAS</h3>
        <table className="w-full text-sm border border-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="border border-gray-300 p-2 text-left">Remesa</th>
              <th className="border border-gray-300 p-2 text-left">Origen</th>
              <th className="border border-gray-300 p-2 text-left">Destino</th>
              <th className="border border-gray-300 p-2 text-right">Peso (kg)</th>
              <th className="border border-gray-300 p-2 text-right">Valor</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2">REM-2024-128</td>
              <td className="border border-gray-300 p-2">{documentData.origen}</td>
              <td className="border border-gray-300 p-2">{documentData.destino}</td>
              <td className="border border-gray-300 p-2 text-right">8,500</td>
              <td className="border border-gray-300 p-2 text-right">${documentData.valor?.toLocaleString("es-CO")}</td>
            </tr>
            <tr className="bg-gray-50 font-bold">
              <td colSpan={3} className="border border-gray-300 p-2 text-right">TOTALES:</td>
              <td className="border border-gray-300 p-2 text-right">8,500</td>
              <td className="border border-gray-300 p-2 text-right">${documentData.valor?.toLocaleString("es-CO")}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-green-50 border border-green-300 p-4 rounded-lg">
        <p className="text-xs font-bold text-green-800">✓ Validado y enviado al RNDC exitosamente</p>
        <p className="text-xs text-green-700 mt-1">Código RNDC: 88745623 | Fecha: {documentData.fecha}</p>
      </div>
    </div>
  );

  const renderAnticipoPDF = () => (
    <div className="space-y-6">
      <div className="border-b-4 border-emerald-600 pb-4">
        <div className="flex justify-between items-start">
          <div>
            <img src="https://via.placeholder.com/150x50/40A095/FFFFFF?text=SYSCOM360" alt="Logo" className="h-12 mb-2" />
            <p className="text-xs text-gray-600">NIT: 900.123.456-7</p>
          </div>
          <div className="text-right">
            <h1 className="text-2xl font-bold text-emerald-600">ANTICIPO</h1>
            <p className="text-lg font-bold text-gray-900">{documentData.numero}</p>
            <p className="text-sm text-gray-600">Fecha: {documentData.fecha}</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-gray-700 mb-2 bg-gray-100 p-2">DATOS DEL ANTICIPO</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Beneficiario:</p>
            <p className="font-semibold text-gray-900">Juan Pérez Gómez</p>
            <p className="text-xs text-gray-500">CC 1.234.567</p>
          </div>
          <div>
            <p className="text-gray-600">Manifiesto Asociado:</p>
            <p className="font-semibold text-gray-900">MAN-2024-089</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-gray-700 mb-2 bg-gray-100 p-2">DETALLE FINANCIERO</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Valor Total del Viaje:</span>
            <span className="font-semibold text-gray-900">${(documentData.valor * 1.5)?.toLocaleString("es-CO")}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Porcentaje de Anticipo:</span>
            <span className="font-semibold text-gray-900">65%</span>
          </div>
          <div className="flex justify-between border-t-2 border-gray-300 pt-2">
            <span className="font-bold text-gray-900">VALOR DEL ANTICIPO:</span>
            <span className="font-bold text-emerald-600 text-xl">${documentData.valor?.toLocaleString("es-CO")}</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-gray-700 mb-2 bg-gray-100 p-2">FORMA DE PAGO</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Método:</p>
            <p className="font-semibold text-gray-900">Transferencia Bancaria</p>
          </div>
          <div>
            <p className="text-gray-600">Banco:</p>
            <p className="font-semibold text-gray-900">Bancolombia</p>
          </div>
          <div>
            <p className="text-gray-600">Cuenta:</p>
            <p className="font-semibold text-gray-900">****-****-4567</p>
          </div>
          <div>
            <p className="text-gray-600">Fecha de Pago:</p>
            <p className="font-semibold text-gray-900">{documentData.fecha}</p>
          </div>
        </div>
      </div>

      <div className="border-t-2 border-gray-200 pt-4">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <p className="text-xs text-gray-600 mb-8">Firma Autorización:</p>
            <div className="border-t border-gray-400 pt-2">
              <p className="text-xs text-center">___________________________</p>
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-8">Firma Beneficiario:</p>
            <div className="border-t border-gray-400 pt-2">
              <p className="text-xs text-center">___________________________</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCumplidoPDF = () => (
    <div className="space-y-6">
      <div className="border-b-4 border-teal-600 pb-4">
        <div className="flex justify-between items-start">
          <div>
            <img src="https://via.placeholder.com/150x50/40A095/FFFFFF?text=SYSCOM360" alt="Logo" className="h-12 mb-2" />
            <p className="text-xs text-gray-600">NIT: 900.123.456-7</p>
          </div>
          <div className="text-right">
            <h1 className="text-2xl font-bold text-teal-600">CUMPLIDO</h1>
            <p className="text-lg font-bold text-gray-900">{documentData.numero}</p>
            <p className="text-sm text-gray-600">Fecha: {documentData.fecha}</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-gray-700 mb-2 bg-gray-100 p-2">DATOS DEL VIAJE</h3>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Manifiesto:</p>
            <p className="font-semibold text-gray-900">MAN-2024-089</p>
          </div>
          <div>
            <p className="text-gray-600">Conductor:</p>
            <p className="font-semibold text-gray-900">Juan Pérez Gómez</p>
          </div>
          <div>
            <p className="text-gray-600">Vehículo:</p>
            <p className="font-semibold text-gray-900">ABC-123</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-gray-700 mb-2 bg-gray-100 p-2">FECHAS DE OPERACIÓN</h3>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Fecha Cargue:</p>
            <p className="font-semibold text-gray-900">2024-03-10 08:00</p>
          </div>
          <div>
            <p className="text-gray-600">Fecha Salida:</p>
            <p className="font-semibold text-gray-900">2024-03-10 10:00</p>
          </div>
          <div>
            <p className="text-gray-600">Fecha Llegada:</p>
            <p className="font-semibold text-gray-900">2024-03-11 18:00</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-gray-700 mb-2 bg-gray-100 p-2">LIQUIDACIÓN FINAL</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Valor Total del Servicio:</span>
            <span className="font-semibold text-gray-900">${(documentData.valor * 1.5)?.toLocaleString("es-CO")}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Anticipo Entregado:</span>
            <span className="font-semibold text-red-600">-${documentData.valor?.toLocaleString("es-CO")}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Descuentos/Peajes:</span>
            <span className="font-semibold text-red-600">-$125,000</span>
          </div>
          <div className="flex justify-between border-t-2 border-gray-300 pt-2">
            <span className="font-bold text-gray-900">SALDO A PAGAR:</span>
            <span className="font-bold text-teal-600 text-xl">${((documentData.valor * 1.5) - documentData.valor - 125000)?.toLocaleString("es-CO")}</span>
          </div>
        </div>
      </div>

      <div className="bg-green-50 border border-green-300 p-4 rounded-lg">
        <p className="text-xs font-bold text-green-800">✓ VIAJE COMPLETADO EXITOSAMENTE</p>
        <p className="text-xs text-green-700 mt-1">Sin novedades reportadas - Mercancía entregada en perfecto estado</p>
      </div>

      <div className="border-t-2 border-gray-200 pt-4">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-gray-600 mb-8">Firma Conductor:</p>
            <div className="border-t border-gray-400 pt-2">
              <p className="text-xs text-center">___________________________</p>
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-8">Firma Cliente:</p>
            <div className="border-t border-gray-400 pt-2">
              <p className="text-xs text-center">___________________________</p>
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-8">Vo.Bo. Operaciones:</p>
            <div className="border-t border-gray-400 pt-2">
              <p className="text-xs text-center">___________________________</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Vista Previa de Documento</h2>
            <p className="text-sm text-gray-600 mt-1">{documentType} - {documentData.numero}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              Imprimir
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Descargar PDF
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-all"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>

        {/* PDF Content */}
        <div className="flex-1 overflow-y-auto p-8 bg-gray-50">
          <div className="bg-white p-8 shadow-lg mx-auto" style={{ maxWidth: '210mm' }}>
            {renderPDFContent()}
          </div>
        </div>
      </div>
    </div>
  );
}