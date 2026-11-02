import React from 'react';
import {
  X,
  Trash2,
  Minus,
  Plus,
  ShoppingBag,
  ArrowRight,
  Scale,
  ShieldCheck,
  Info,
  Building2
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    activeModal,
    setActiveModal,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    totalCartNgn,
    totalCartWeightKg,
    formatPrice,
    currentCurrency
  } = useStore();

  if (activeModal !== 'cart') return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-0" onClick={() => setActiveModal('none')} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl border-l border-gray-100 flex flex-col justify-between relative">

          {/* Header */}
          <div className="p-4 bg-brand-dark text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-gold-400" />
              <h2 className="font-extrabold text-base">Your Shopping Cart</h2>
            </div>
            <button
              onClick={() => setActiveModal('none')}
              className="text-gray-300 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Weight Alert Banner */}
          <div className="bg-emerald-50 border-b border-emerald-100 px-4 py-2.5 flex items-center justify-between text-xs text-brand-900 font-semibold">
            <div className="flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-brand-600" />
              <span>Total Estimated Cargo Weight:</span>
            </div>
            <span className="bg-brand-700 text-white font-extrabold px-2.5 py-0.5 rounded-full">
              {totalCartWeightKg.toFixed(1)} kg
            </span>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="font-bold text-gray-700 text-base">Your cart is empty</p>
                <p className="text-xs text-gray-400">Explore our foodstuffs and export bundles to add items.</p>
                <button
                  onClick={() => setActiveModal('none')}
                  className="mt-2 inline-flex items-center gap-1 bg-brand-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const optLabel = item.selectedWeightOption?.label ?? 'default';
                const priceNgn = item.selectedWeightOption?.priceNgn ?? item.product.priceNgn;
                const weightKg = item.selectedWeightOption?.weightKg ?? item.product.weightKg;

                return (
                  <div key={`${item.product.id}-${optLabel}`} className="flex gap-3 bg-gray-50 p-3 rounded-2xl border border-gray-200/80">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-xl bg-gray-200 shrink-0"
                    />

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-gray-900 text-xs leading-snug line-clamp-1">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.product.id, item.selectedWeightOption?.label)}
                            className="text-gray-400 hover:text-red-600 p-0.5"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {item.selectedWeightOption && (
                          <div className="text-[10px] font-semibold text-brand-700 mt-0.5">
                            Option: {item.selectedWeightOption.label} ({weightKg}kg)
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="font-extrabold text-sm text-brand-900">
                          {formatPrice(priceNgn * item.quantity)}
                        </div>

                        {/* Quantity controls */}
                        <div className="flex items-center border border-gray-300 rounded-lg bg-white overflow-hidden text-xs">
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity - 1, item.selectedWeightOption?.label)}
                            className="px-2 py-1 hover:bg-gray-100 text-gray-700"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 font-bold text-gray-900">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity + 1, item.selectedWeightOption?.label)}
                            className="px-2 py-1 hover:bg-gray-100 text-gray-700"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Subtotal & Checkout */}
          {cart.length > 0 && (
            <div className="p-4 bg-gray-50 border-t border-gray-200 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Cart Subtotal:</span>
                  <span className="font-bold text-gray-900">{formatPrice(totalCartNgn)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping Fee:</span>
                  <span className="text-gray-500 font-medium">Calculated at Checkout</span>
                </div>
                <div className="flex justify-between text-sm font-black text-brand-900 border-t border-gray-200 pt-2">
                  <span>Estimated Total:</span>
                  <span>{formatPrice(totalCartNgn)}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={clearCart}
                  className="px-3 py-2 text-xs font-bold text-gray-500 hover:text-red-600 border border-gray-200 hover:bg-white rounded-xl transition-colors"
                >
                  Clear Cart
                </button>
                <button
                  onClick={() => setActiveModal('checkout')}
                  className="px-4 py-3 text-xs font-extrabold bg-brand-700 hover:bg-brand-800 text-white rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <p className="text-[10px] text-gray-400 text-center flex items-center justify-center gap-1">
                <ShieldCheck className="w-3 h-3 text-brand-600" />
                Supports Nigerian Bank Transfer & Card Payment
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
