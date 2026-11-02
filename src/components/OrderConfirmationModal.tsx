import React, { useState } from 'react';
import {
  CheckCircle2,
  Printer,
  Copy,
  Check,
  X,
  PackageCheck,
  Building2,
  Truck,
  Plane,
  Phone,
  Mail,
  ShieldCheck
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { COMPANY_INFO, BANK_DETAILS } from '../data/initialData';

export const OrderConfirmationModal: React.FC = () => {
  const {
    lastCreatedOrder,
    activeModal,
    setActiveModal,
    formatPrice
  } = useStore();

  const [copiedId, setCopiedId] = useState(false);

  if (activeModal !== 'order_confirmation' || !lastCreatedOrder) return null;

  const order = lastCreatedOrder;

  const handleCopyId = () => {
    navigator.clipboard.writeText(order.id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm p-4 flex items-center justify-center animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-gray-100 my-8">

        {/* Modal Top Header */}
        <div className="bg-brand-900 text-white p-6 text-center relative">
          <button
            onClick={() => setActiveModal('none')}
            className="absolute top-4 right-4 text-gray-300 hover:text-white p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 bg-gold-500/20 rounded-full flex items-center justify-center mx-auto mb-3 border border-gold-500/40">
            <CheckCircle2 className="w-10 h-10 text-gold-400" />
          </div>

          <h2 className="text-2xl font-black tracking-tight">Order Placed Successfully!</h2>
          <p className="text-xs text-emerald-200 mt-1">
            Thank you for shopping with <strong className="text-white">BIB EDIBLES 'N' MART LIMITED</strong>
          </p>

          <div className="mt-4 inline-flex items-center gap-2 bg-emerald-950/80 px-4 py-1.5 rounded-full border border-gold-500/30 text-xs font-mono font-bold text-gold-400">
            <span>ORDER ID: {order.id}</span>
            <button
              onClick={handleCopyId}
              className="text-emerald-300 hover:text-white ml-2 p-1"
              title="Copy Order ID"
            >
              {copiedId ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Printable Order Receipt Content */}
        <div className="p-6 space-y-6 text-xs text-gray-700 max-h-[70vh] overflow-y-auto" id="printable-receipt">

          {/* Company Invoice Header */}
          <div className="border-b border-gray-200 pb-4 flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <h3 className="font-black text-gray-900 text-sm">{COMPANY_INFO.name}</h3>
              <p className="text-[10px] text-gray-500">RC NUMBER: {COMPANY_INFO.rcNumber}</p>
              <p className="text-[10px] text-gray-500 max-w-xs">{COMPANY_INFO.headOfficeAddress}</p>
              <p className="text-[10px] text-gray-500">{COMPANY_INFO.phone1} • {COMPANY_INFO.phone2}</p>
            </div>

            <div className="text-left sm:text-right text-[11px] space-y-0.5">
              <div className="font-bold text-gray-900">Date: {new Date(order.createdAt).toLocaleDateString()}</div>
              <div className="text-gray-500">Payment: <strong className="uppercase text-brand-700">{order.paymentMethod.replace('_', ' ')}</strong></div>
              <div className="text-gray-500">Status: <strong className="uppercase text-amber-600">{order.orderStatus.replace('_', ' ')}</strong></div>
            </div>
          </div>

          {/* Customer & Shipping Details */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h4 className="font-bold text-gray-900 text-xs mb-1">Customer Info:</h4>
              <p className="font-semibold">{order.shippingAddress.fullName}</p>
              <p>{order.shippingAddress.email}</p>
              <p>{order.shippingAddress.phone}</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-xs mb-1">Shipping Destination:</h4>
              <p>{order.shippingAddress.address}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.state}, {order.shippingAddress.country}</p>
            </div>
          </div>

          {/* Items Table */}
          <div>
            <h4 className="font-bold text-gray-900 text-xs mb-2">Ordered Items:</h4>
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-100 text-[10px] font-bold text-gray-600 uppercase border-b border-gray-200">
                  <tr>
                    <th className="p-2.5">Item</th>
                    <th className="p-2.5 text-center">Qty</th>
                    <th className="p-2.5 text-right">Unit Price</th>
                    <th className="p-2.5 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-[11px]">
                  {order.items.map((item, idx) => {
                    const priceNgn = item.selectedWeightOption?.priceNgn ?? item.product.priceNgn;
                    return (
                      <tr key={idx}>
                        <td className="p-2.5 font-medium">
                          {item.product.name}
                          {item.selectedWeightOption && (
                            <span className="block text-[10px] text-brand-700 font-semibold">
                              ({item.selectedWeightOption.label})
                            </span>
                          )}
                        </td>
                        <td className="p-2.5 text-center font-bold">{item.quantity}</td>
                        <td className="p-2.5 text-right">{formatPrice(priceNgn)}</td>
                        <td className="p-2.5 text-right font-bold text-gray-900">{formatPrice(priceNgn * item.quantity)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Payment Note for Bank Transfer */}
          {order.paymentMethod === 'bank_transfer' && order.paymentStatus === 'pending' && (
            <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-xl space-y-1.5">
              <p className="font-bold text-amber-900 text-xs">Payment Instructions for Bank Transfer:</p>
              <p className="text-[11px] text-amber-800">
                Please transfer the total sum of <strong>{formatPrice(order.totalNgn)}</strong> to our official account:
              </p>
              <div className="font-mono bg-white p-2 rounded-lg border border-amber-200 text-[11px]">
                <strong>{BANK_DETAILS.bankName}</strong> | Account No: <strong>{BANK_DETAILS.accountNumber}</strong> | Name: <strong>{BANK_DETAILS.accountName}</strong>
              </div>
              <p className="text-[10px] text-amber-700">
                Include <strong>{order.id}</strong> in your transfer remark or send proof to WhatsApp <strong>{COMPANY_INFO.phone1}</strong>.
              </p>
            </div>
          )}

          {/* Summary */}
          <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 space-y-1 text-right text-xs">
            <div className="flex justify-between">
              <span className="text-gray-500">Subtotal:</span>
              <span className="font-bold">{formatPrice(order.subtotalNgn)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Shipping Freight:</span>
              <span className="font-bold">{formatPrice(order.shippingCostNgn)}</span>
            </div>
            <div className="flex justify-between text-sm font-black text-brand-900 border-t border-gray-200 pt-1.5">
              <span>Grand Total:</span>
              <span>{formatPrice(order.totalNgn)}</span>
            </div>
          </div>

        </div>

        {/* Modal Action Buttons */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold text-xs rounded-xl flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4" />
            Print Invoice
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveModal('order_tracking')}
              className="px-4 py-2 bg-brand-100 text-brand-900 hover:bg-brand-200 font-bold text-xs rounded-xl flex items-center gap-1.5"
            >
              <PackageCheck className="w-4 h-4" />
              Track Status
            </button>
            <button
              onClick={() => setActiveModal('none')}
              className="px-5 py-2.5 bg-brand-700 text-white hover:bg-brand-800 font-extrabold text-xs rounded-xl shadow-md"
            >
              Done & Return Home
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
