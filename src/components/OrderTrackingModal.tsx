import React, { useState } from 'react';
import {
  Search,
  X,
  PackageCheck,
  Clock,
  CheckCircle2,
  Truck,
  Plane,
  Building2,
  AlertCircle,
  Upload,
  ShieldCheck
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Order, OrderStatus } from '../types';

export const OrderTrackingModal: React.FC = () => {
  const {
    orders,
    activeModal,
    setActiveModal,
    formatPrice,
    uploadBankReceipt
  } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [notFound, setNotFound] = useState(false);

  const [transferRefInput, setTransferRefInput] = useState('');
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [uploadedSuccess, setUploadedSuccess] = useState(false);

  if (activeModal !== 'order_tracking') return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim().toUpperCase();
    const found = orders.find(
      o => o.id.toUpperCase() === query || o.shippingAddress.email.toUpperCase() === query
    );

    if (found) {
      setSearchedOrder(found);
      setNotFound(false);
    } else {
      setSearchedOrder(null);
      setNotFound(true);
    }
  };

  const handleUploadReceiptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchedOrder) return;

    const refText = transferRefInput || `REF-UP-${Math.floor(1000 + Math.random() * 9000)}`;
    const receiptName = receiptFile ? receiptFile.name : 'proof_receipt.jpg';

    uploadBankReceipt(searchedOrder.id, receiptName, refText);
    setUploadedSuccess(true);
    setTimeout(() => setUploadedSuccess(false), 3000);
  };

  const getStepStatus = (orderStatus: OrderStatus, step: number) => {
    const stepsOrder: OrderStatus[] = [
      'pending_payment',
      'payment_verified',
      'processing',
      'shipped',
      'delivered'
    ];

    const currentIndex = stepsOrder.indexOf(orderStatus);
    if (currentIndex >= step) return 'completed';
    if (currentIndex === step - 1) return 'current';
    return 'upcoming';
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm p-4 flex items-center justify-center animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-gray-100 my-8">

        {/* Header */}
        <div className="bg-brand-dark text-white p-4 flex items-center justify-between border-b border-brand-800">
          <div className="flex items-center gap-2">
            <PackageCheck className="w-5 h-5 text-gold-400" />
            <h2 className="font-extrabold text-base">Track Your Food Order & Cargo Shipment</h2>
          </div>
          <button
            onClick={() => setActiveModal('none')}
            className="text-gray-300 hover:text-white p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">

          {/* Search Box */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter Order ID (e.g. BIB-73821) or Email Address"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold focus:bg-white focus:border-brand-500 focus:outline-none"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
            <button
              type="submit"
              className="px-5 py-3 bg-brand-700 hover:bg-brand-800 text-white font-extrabold text-xs rounded-xl shadow-md"
            >
              Search
            </button>
          </form>

          {notFound && (
            <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>No order found with ID or Email: <strong>{searchQuery}</strong>. Please verify and try again.</span>
            </div>
          )}

          {/* Searched Order Pipeline Details */}
          {searchedOrder && (
            <div className="space-y-6 text-xs border-t border-gray-100 pt-4">

              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 flex flex-col sm:flex-row justify-between gap-3">
                <div>
                  <div className="text-[10px] text-gray-400 uppercase font-bold">Order ID</div>
                  <div className="text-base font-black text-brand-900">{searchedOrder.id}</div>
                  <div className="text-gray-500 text-[11px] mt-0.5">
                    Placed on: {new Date(searchedOrder.createdAt).toLocaleDateString()}
                  </div>
                </div>

                <div className="sm:text-right">
                  <div className="text-[10px] text-gray-400 uppercase font-bold">Payment Status</div>
                  <span className={`inline-block px-2.5 py-0.5 rounded-full font-bold text-[11px] uppercase ${
                    searchedOrder.paymentStatus === 'verified'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {searchedOrder.paymentStatus}
                  </span>
                  <div className="text-sm font-black text-gray-900 mt-1">
                    {formatPrice(searchedOrder.totalNgn)}
                  </div>
                </div>
              </div>

              {/* Status Pipeline Timeline */}
              <div className="space-y-3">
                <h4 className="font-extrabold text-gray-900 text-xs">Fulfillment Timeline:</h4>

                <div className="space-y-2">
                  {[
                    { title: "Order Submitted", desc: "Order received in BIB Edibles database", step: 0 },
                    { title: "Payment Verified", desc: "Bank transfer or card payment confirmed by admin", step: 1 },
                    { title: "Packaging & Phytosanitary Cert", desc: "Vacuum sealing and export documentation prepared", step: 2 },
                    { title: "Dispatched / Cargo Flight", desc: "Handed over to local courier or international airline cargo", step: 3 },
                    { title: "Delivered", desc: "Package delivered to customer address", step: 4 }
                  ].map((s) => {
                    const st = getStepStatus(searchedOrder.orderStatus, s.step);
                    return (
                      <div key={s.step} className="flex items-start gap-3 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 ${
                          st === 'completed'
                            ? 'bg-brand-700 text-white'
                            : st === 'current'
                            ? 'bg-amber-500 text-white animate-pulse'
                            : 'bg-gray-100 text-gray-400'
                        }`}>
                          {st === 'completed' ? <CheckCircle2 className="w-4 h-4" /> : s.step + 1}
                        </div>
                        <div>
                          <div className={`font-bold ${st === 'completed' ? 'text-brand-900' : 'text-gray-800'}`}>
                            {s.title}
                          </div>
                          <div className="text-[11px] text-gray-500">{s.desc}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Upload Receipt Option if pending payment */}
              {searchedOrder.paymentStatus === 'pending' && (
                <form onSubmit={handleUploadReceiptSubmit} className="bg-amber-50/90 border border-amber-200 p-4 rounded-2xl space-y-3">
                  <div className="font-bold text-amber-900 flex items-center gap-1.5">
                    <Upload className="w-4 h-4 text-amber-700" />
                    Upload Bank Transfer Proof / Receipt
                  </div>

                  {uploadedSuccess ? (
                    <div className="p-2 bg-green-100 text-green-800 font-bold rounded-xl text-center">
                      ✓ Receipt submitted successfully for admin verification!
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={transferRefInput}
                          onChange={(e) => setTransferRefInput(e.target.value)}
                          placeholder="Bank Reference / Depositor Name"
                          className="p-2 bg-white border border-amber-300 rounded-xl text-xs"
                        />
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          onChange={(e) => setReceiptFile(e.target.files?.[0] || null)}
                          className="text-xs file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-amber-200 file:text-amber-900"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-sm"
                      >
                        Submit Receipt for Approval
                      </button>
                    </>
                  )}
                </form>
              )}

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
