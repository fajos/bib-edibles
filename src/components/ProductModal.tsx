import React, { useState } from 'react';
import {
  X,
  ShoppingBag,
  Plane,
  ShieldCheck,
  CheckCircle2,
  Minus,
  Plus,
  Scale,
  Box,
  Truck,
  Building2
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductWeightOption } from '../types';

export const ProductModal: React.FC = () => {
  const {
    selectedProductForModal,
    setSelectedProductForModal,
    setActiveModal,
    addToCart,
    formatPrice,
    currentCurrency
  } = useStore();

  if (!selectedProductForModal) return null;

  const product = selectedProductForModal;

  const [selectedOption, setSelectedOption] = useState<ProductWeightOption | undefined>(
    product.weightOptions?.[0]
  );
  const [quantity, setQuantity] = useState(1);

  const activePriceNgn = selectedOption ? selectedOption.priceNgn : product.priceNgn;
  const activeWeightKg = selectedOption ? selectedOption.weightKg : product.weightKg;

  const handleAddToCart = () => {
    addToCart(product, selectedOption, quantity);
    setSelectedProductForModal(null);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedOption, quantity);
    setSelectedProductForModal(null);
    setActiveModal('checkout');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-gray-100 relative my-8">

        {/* Close Button */}
        <button
          onClick={() => setSelectedProductForModal(null)}
          className="absolute top-3 right-3 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">

          {/* Left Column: Image & Export Badges */}
          <div className="relative bg-gray-100 min-h-[260px] md:min-h-full">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 left-3 right-3 space-y-1">
              {product.isExportReady && (
                <div className="bg-brand-900/90 text-gold-400 font-bold text-xs p-2 rounded-xl backdrop-blur-md border border-gold-500/30 flex items-center gap-2">
                  <Plane className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>Vacuum Packed & Flight Cargo Approved</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Details & Actions */}
          <div className="p-6 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-bold text-brand-700 uppercase tracking-wider bg-brand-50 px-2.5 py-1 rounded-md">
                {product.category}
              </span>

              <h2 className="text-xl font-extrabold text-gray-900 mt-2 leading-snug">
                {product.name}
              </h2>

              {/* Price display */}
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-2xl font-black text-brand-900">
                  {formatPrice(activePriceNgn * quantity)}
                </span>
                {currentCurrency !== 'NGN' && (
                  <span className="text-xs text-gray-400 font-medium">
                    (₦{(activePriceNgn * quantity).toLocaleString('en-NG')})
                  </span>
                )}
              </div>

              {/* Weight option selector */}
              {product.weightOptions && product.weightOptions.length > 0 && (
                <div className="mt-4 space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 flex items-center gap-1">
                    <Scale className="w-3.5 h-3.5 text-brand-600" />
                    Packaging / Weight Size:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {product.weightOptions.map((opt) => (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() => setSelectedOption(opt)}
                        className={`p-2 rounded-xl text-left border text-xs font-bold transition-all ${
                          selectedOption?.label === opt.label
                            ? 'border-brand-600 bg-brand-50 text-brand-900 ring-2 ring-brand-500/20'
                            : 'border-gray-200 hover:border-gray-300 bg-white text-gray-700'
                        }`}
                      >
                        <div>{opt.label}</div>
                        <div className="text-[10px] text-gray-500">{formatPrice(opt.priceNgn)}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="mt-4 space-y-2 text-xs text-gray-600 leading-relaxed">
                <p>{product.description}</p>
                <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100 text-[11px] space-y-1">
                  <div className="flex items-center gap-1.5 text-gray-700 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-600" />
                    <span>Processed & Packaged by BIB EDIBLES 'N' MART LTD</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-700 font-medium">
                    <Box className="w-3.5 h-3.5 text-brand-600" />
                    <span>Sealed moisture-proof bags preventing leakage</span>
                  </div>
                </div>
              </div>

              {/* Quantity Picker */}
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs font-bold text-gray-700">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden bg-gray-50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 hover:bg-gray-200 text-gray-700"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-extrabold text-gray-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 hover:bg-gray-200 text-gray-700"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 grid grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                className="w-full bg-brand-100 hover:bg-brand-200 text-brand-900 font-bold text-xs py-3 rounded-xl transition-all border border-brand-300 flex items-center justify-center gap-1.5"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="w-full bg-brand-700 hover:bg-brand-800 text-white font-extrabold text-xs py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                Checkout Now
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
