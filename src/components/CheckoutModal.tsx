import React, { useState } from 'react';
import {
  X,
  CreditCard,
  Building,
  Truck,
  Plane,
  ShieldCheck,
  CheckCircle2,
  Upload,
  Copy,
  Check,
  ArrowLeft,
  Lock,
  Building2,
  FileText
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PaymentMethod, ShippingAddress, Order } from '../types';
import { BANK_DETAILS, COMPANY_INFO, ESTIMATED_SHIPPING_RATES } from '../data/initialData';

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    activeModal,
    setActiveModal,
    totalCartNgn,
    totalCartWeightKg,
    formatPrice,
    currentCurrency,
    currencies,
    addOrder
  } = useStore();

  if (activeModal !== 'checkout') return null;

  // State
  const [shippingType, setShippingType] = useState<'local' | 'international'>('local');
  const [selectedLocalRegion, setSelectedLocalRegion] = useState<'abuja' | 'lagos' | 'portHarcourt' | 'otherStates'>('abuja');
  const [selectedIntlRegion, setSelectedIntlRegion] = useState<'uk' | 'usaCanada' | 'europe' | 'restOfWorld'>('uk');

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('bank_transfer');
  const [transferRef, setTransferRef] = useState('');
  const [receiptFileName, setReceiptFileName] = useState('');
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Address form
  const [formData, setFormData] = useState<ShippingAddress>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: 'Abuja',
    state: 'FCT',
    country: 'Nigeria',
    postalCode: '',
    deliveryNotes: ''
  });

  // Calculate Shipping Cost
  let shippingCostNgn = 0;
  if (shippingType === 'local') {
    shippingCostNgn = ESTIMATED_SHIPPING_RATES.local[selectedLocalRegion].feeNgn;
  } else {
    const intl = ESTIMATED_SHIPPING_RATES.international[selectedIntlRegion];
    shippingCostNgn = intl.baseFeeNgn + Math.ceil(totalCartWeightKg) * intl.perKgNgn;
  }

  const grandTotalNgn = totalCartNgn + shippingCostNgn;
  const currentRate = currencies[currentCurrency]?.rate || 1;
  const grandTotalInCurrency = grandTotalNgn * currentRate;

  const handleCopyBankDetails = () => {
    navigator.clipboard.writeText(`${BANK_DETAILS.bankName} - ${BANK_DETAILS.accountNumber} - ${BANK_DETAILS.accountName}`);
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setReceiptFileName(e.target.files[0].name);
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone || !formData.address) {
      alert('Please fill out all required shipping address fields.');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const orderId = `BIB-${Math.floor(10000 + Math.random() * 90000)}`;

      const newOrder: Order = {
        id: orderId,
        createdAt: new Date().toISOString(),
        items: [...cart],
        shippingAddress: { ...formData },
        shippingType,
        shippingCostNgn,
        subtotalNgn: totalCartNgn,
        totalNgn: grandTotalNgn,
        currencyCode: currentCurrency,
        totalInCurrency: grandTotalInCurrency,
        paymentMethod,
        paymentStatus: paymentMethod === 'card_payment' ? 'verified' : 'pending',
        orderStatus: paymentMethod === 'card_payment' ? 'payment_verified' : 'pending_payment',
        transferReference: transferRef || `REF-${Math.floor(100000 + Math.random() * 900000)}`,
        bankReceiptUrl: receiptFileName ? `uploaded_${receiptFileName}` : undefined
      };

      setIsProcessing(false);
      addOrder(newOrder);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/75 backdrop-blur-sm p-4 flex items-center justify-center animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-gray-100 my-8">

        {/* Modal Header */}
        <div className="bg-brand-dark text-white p-4 flex items-center justify-between border-b border-brand-800">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-gold-400" />
            <div>
              <h2 className="font-extrabold text-base">Secure Express Checkout</h2>
              <p className="text-[11px] text-emerald-200">BIB EDIBLES 'N' MART LIMITED • RC {COMPANY_INFO.rcNumber}</p>
            </div>
          </div>
          <button
            onClick={() => setActiveModal('none')}
            className="text-gray-300 hover:text-white p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmitOrder} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Left Column: Delivery Address & Shipping Calculator */}
            <div className="space-y-4">
              <h3 className="font-extrabold text-gray-900 text-sm flex items-center gap-2 border-b border-gray-200 pb-2">
                <Truck className="w-4 h-4 text-brand-700" />
                1. Delivery & Shipping Details
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Chief Simon Sunday"
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-brand-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. simonsunday378@gmail.com"
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-brand-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 07019884524"
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-brand-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Street Address *</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="e.g. House 14, Jedo Estate, Lugbe"
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-brand-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">City / Town *</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-brand-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Country *</label>
                    <input
                      type="text"
                      required
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-brand-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Local vs International Shipping Toggle */}
                <div className="pt-2">
                  <label className="font-bold text-gray-800 block mb-1.5">Shipping Destination:</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => { setShippingType('local'); setFormData({ ...formData, country: 'Nigeria' }); }}
                      className={`p-2.5 rounded-xl border font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                        shippingType === 'local'
                          ? 'bg-brand-50 border-brand-600 text-brand-900 ring-2 ring-brand-500/20'
                          : 'bg-gray-50 border-gray-200 text-gray-600'
                      }`}
                    >
                      <Truck className="w-4 h-4 text-brand-700" />
                      Within Nigeria
                    </button>
                    <button
                      type="button"
                      onClick={() => { setShippingType('international'); setFormData({ ...formData, country: 'United Kingdom' }); }}
                      className={`p-2.5 rounded-xl border font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                        shippingType === 'international'
                          ? 'bg-brand-50 border-brand-600 text-brand-900 ring-2 ring-brand-500/20'
                          : 'bg-gray-50 border-gray-200 text-gray-600'
                      }`}
                    >
                      <Plane className="w-4 h-4 text-gold-500" />
                      Worldwide Cargo
                    </button>
                  </div>
                </div>

                {/* Region Selectors */}
                {shippingType === 'local' ? (
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Local Region:</label>
                    <select
                      value={selectedLocalRegion}
                      onChange={(e) => setSelectedLocalRegion(e.target.value as any)}
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-semibold text-xs"
                    >
                      {Object.entries(ESTIMATED_SHIPPING_RATES.local).map(([key, val]) => (
                        <option key={key} value={key}>
                          {val.name} — {formatPrice(val.feeNgn)}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Destination Country / Air Freight Region:</label>
                    <select
                      value={selectedIntlRegion}
                      onChange={(e) => setSelectedIntlRegion(e.target.value as any)}
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-semibold text-xs"
                    >
                      {Object.entries(ESTIMATED_SHIPPING_RATES.international).map(([key, val]) => (
                        <option key={key} value={key}>
                          {val.name}
                        </option>
                      ))}
                    </select>
                    <p className="text-[10px] text-gray-500 mt-1">
                      Calculated on total parcel weight of <strong>{totalCartWeightKg.toFixed(1)} kg</strong>. Includes export clearance and moisture seal.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Payment Method & Order Summary */}
            <div className="space-y-4">
              <h3 className="font-extrabold text-gray-900 text-sm flex items-center gap-2 border-b border-gray-200 pb-2">
                <CreditCard className="w-4 h-4 text-brand-700" />
                2. Select Payment Method
              </h3>

              {/* Payment Method Selector */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('bank_transfer')}
                  className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                    paymentMethod === 'bank_transfer'
                      ? 'bg-brand-50 border-brand-600 text-brand-900 ring-2 ring-brand-500/20'
                      : 'bg-gray-50 border-gray-200 text-gray-600'
                  }`}
                >
                  <Building className="w-5 h-5 text-brand-700 mb-2" />
                  <div>
                    <div className="font-extrabold text-gray-900">Bank Transfer</div>
                    <div className="text-[10px] text-gray-500">Direct NGN Deposit</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card_payment')}
                  className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                    paymentMethod === 'card_payment'
                      ? 'bg-brand-50 border-brand-600 text-brand-900 ring-2 ring-brand-500/20'
                      : 'bg-gray-50 border-gray-200 text-gray-600'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-brand-700 mb-2" />
                  <div>
                    <div className="font-extrabold text-gray-900">Card Payment</div>
                    <div className="text-[10px] text-gray-500">Paystack / Visa / Mastercard</div>
                  </div>
                </button>
              </div>

              {/* Payment Details Box */}
              {paymentMethod === 'bank_transfer' ? (
                <div className="bg-amber-50/80 border border-amber-200 p-3.5 rounded-2xl text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-900 flex items-center gap-1">
                      <Building2 className="w-4 h-4 text-amber-700" />
                      Official Company Bank Account:
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyBankDetails}
                      className="text-[11px] text-amber-800 font-bold hover:underline flex items-center gap-1"
                    >
                      {copiedAccount ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
                      {copiedAccount ? 'Copied' : 'Copy'}
                    </button>
                  </div>

                  <div className="bg-white p-2.5 rounded-xl border border-amber-200 space-y-1 font-mono text-gray-800">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Bank:</span>
                      <strong className="text-gray-900">{BANK_DETAILS.bankName}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Account Name:</span>
                      <strong className="text-gray-900">{BANK_DETAILS.accountName}</strong>
                    </div>
                    <div className="flex justify-between text-brand-800 text-sm font-black">
                      <span className="text-gray-500 text-xs">Account No:</span>
                      <span>{BANK_DETAILS.accountNumber}</span>
                    </div>
                  </div>

                  <div className="pt-1 space-y-2">
                    <div>
                      <label className="font-bold text-amber-950 block mb-1">Transfer Reference / Depositor Name (Optional):</label>
                      <input
                        type="text"
                        value={transferRef}
                        onChange={(e) => setTransferRef(e.target.value)}
                        placeholder="e.g. Bank Ref or Depositor Name"
                        className="w-full p-2 bg-white border border-amber-300 rounded-lg text-xs"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-amber-950 block mb-1">Upload Receipt Image / Screenshot (Optional):</label>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={handleFileChange}
                        className="w-full text-xs text-gray-600 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-amber-200 file:text-amber-900 hover:file:bg-amber-300"
                      />
                      {receiptFileName && (
                        <p className="text-[10px] text-emerald-700 font-bold mt-1">Attached: {receiptFileName}</p>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-2xl text-xs space-y-2">
                  <div className="font-bold text-brand-900 flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    Instant Online Card Checkout
                  </div>
                  <p className="text-gray-600 text-[11px] leading-relaxed">
                    You will be prompted with our integrated Paystack secure modal to pay via Visa, Mastercard, Verve or USSD.
                  </p>
                </div>
              )}

              {/* Summary Breakdown */}
              <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-200 space-y-2 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Items Subtotal:</span>
                  <span className="font-bold text-gray-900">{formatPrice(totalCartNgn)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping Freight ({totalCartWeightKg.toFixed(1)}kg):</span>
                  <span className="font-bold text-gray-900">{formatPrice(shippingCostNgn)}</span>
                </div>
                <div className="flex justify-between text-sm font-black text-brand-900 border-t border-gray-200 pt-2">
                  <span>Total Amount Payable:</span>
                  <div className="text-right">
                    <div>{formatPrice(grandTotalNgn)}</div>
                    {currentCurrency !== 'NGN' && (
                      <div className="text-[10px] font-medium text-gray-400">
                        (₦{grandTotalNgn.toLocaleString('en-NG')})
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 bg-brand-700 hover:bg-brand-800 text-white font-extrabold text-sm rounded-xl shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-gold-400" />
                    Confirm & Place Order ({formatPrice(grandTotalNgn)})
                  </>
                )}
              </button>
            </div>

          </div>
        </form>

      </div>
    </div>
  );
};
