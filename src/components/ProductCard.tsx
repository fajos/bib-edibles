import React, { useState } from 'react';
import {
  ShoppingBag,
  Eye,
  CheckCircle,
  Plane,
  ShieldCheck,
  Scale
} from 'lucide-react';
import { Product, ProductWeightOption } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    formatPrice,
    addToCart,
    setSelectedProductForModal,
    setActiveModal,
    currentCurrency
  } = useStore();

  const [selectedWeight, setSelectedWeight] = useState<ProductWeightOption | undefined>(
    product.weightOptions?.[0]
  );

  const activePriceNgn = selectedWeight ? selectedWeight.priceNgn : product.priceNgn;
  const activeWeightKg = selectedWeight ? selectedWeight.weightKg : product.weightKg;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedWeight, 1);
  };

  const handleOpenDetail = () => {
    setSelectedProductForModal(product);
    setActiveModal('product_detail');
  };

  return (
    <div
      onClick={handleOpenDetail}
      className="group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer transform hover:-translate-y-1"
    >
      <div>
        {/* Image & Badges Header */}
        <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Top Floating Badges */}
          <div className="absolute top-2 left-2 right-2 flex justify-between items-center pointer-events-none">
            {product.isExportReady && (
              <span className="bg-brand-900/90 text-gold-400 font-bold text-[10px] px-2.5 py-1 rounded-full border border-gold-500/40 flex items-center gap-1 backdrop-blur-md shadow-md">
                <Plane className="w-3 h-3 text-gold-400" />
                Export Approved
              </span>
            )}
            {product.nafdacApproved && (
              <span className="bg-emerald-600/90 text-white font-semibold text-[10px] px-2 py-0.5 rounded-full backdrop-blur-md ml-auto">
                100% Organic
              </span>
            )}
          </div>

          {/* Quick View Overlay Button */}
          <button
            onClick={(e) => { e.stopPropagation(); handleOpenDetail(); }}
            className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Card Body */}
        <div className="p-4 space-y-3">
          {/* Category Tag */}
          <div className="flex items-center justify-between text-[11px] text-gray-500 font-semibold uppercase tracking-wider">
            <span>{product.category}</span>
            <span className="flex items-center gap-1 text-gray-400">
              <Scale className="w-3 h-3" />
              {activeWeightKg} kg
            </span>
          </div>

          {/* Product Title */}
          <h3 className="font-bold text-gray-900 text-base leading-snug group-hover:text-brand-700 transition-colors line-clamp-2">
            {product.name}
          </h3>

          {/* Weight Option Selector (if multiple available) */}
          {product.weightOptions && product.weightOptions.length > 0 && (
            <div className="pt-1" onClick={(e) => e.stopPropagation()}>
              <label className="text-[11px] font-semibold text-gray-500 block mb-1">Select Weight Option:</label>
              <select
                value={selectedWeight?.label}
                onChange={(e) => {
                  const opt = product.weightOptions?.find(o => o.label === e.target.value);
                  if (opt) setSelectedWeight(opt);
                }}
                className="w-full text-xs font-semibold bg-gray-50 border border-gray-200 rounded-lg py-1.5 px-2 focus:outline-none focus:border-brand-500"
              >
                {product.weightOptions.map((opt) => (
                  <option key={opt.label} value={opt.label}>
                    {opt.label} — {formatPrice(opt.priceNgn)}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Short Description */}
          <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>

      {/* Card Footer - Price & Add to Cart */}
      <div className="p-4 pt-0 border-t border-gray-50 mt-2 flex items-center justify-between gap-2">
        <div>
          <div className="text-lg font-black text-brand-900">
            {formatPrice(activePriceNgn)}
          </div>
          {currentCurrency !== 'NGN' && (
            <div className="text-[11px] font-semibold text-gray-400">
              (₦{activePriceNgn.toLocaleString('en-NG')})
            </div>
          )}
        </div>

        <button
          onClick={handleQuickAdd}
          className="inline-flex items-center gap-1.5 bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs px-3.5 py-2.5 rounded-xl shadow-md transition-all active:scale-95"
        >
          <ShoppingBag className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};
