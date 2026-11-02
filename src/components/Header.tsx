import React, { useState } from 'react';
import {
  ShoppingBag,
  Search,
  Phone,
  Globe2,
  ShieldCheck,
  UserCheck,
  Menu,
  X,
  PackageCheck,
  FileText,
  Building2,
  Sparkles
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CurrencyCode, Category } from '../types';
import { COMPANY_INFO } from '../data/initialData';

export const Header: React.FC = () => {
  const {
    cart,
    currencies,
    currentCurrency,
    setCurrency,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    setActiveModal,
    isAdminLoggedIn,
    logoutAdmin,
    totalCartNgn,
    formatPrice
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories: Category[] = [
    'All',
    'Local Foodstuffs',
    'Export Bundles',
    'Grains & Flours',
    'Spices & Oils',
    'Dried Fish & Meat',
    'Beverages & Snacks'
  ];

  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-100">
      {/* Top Banner - Company Credentials & Currency Switcher */}
      <div className="bg-brand-dark text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          {/* Left: Registration & Contact */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 justify-center md:justify-start">
            <span className="inline-flex items-center gap-1 font-semibold text-gold-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-gold-500/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              CAC RC: {COMPANY_INFO.rcNumber}
            </span>
            <span className="hidden sm:inline-block text-emerald-200/60">•</span>
            <span className="text-emerald-100 flex items-center gap-1">
              <Building2 className="w-3 h-3 text-gold-400" />
              Head Office: Lugbe, Abuja, Nigeria
            </span>
            <span className="hidden sm:inline-block text-emerald-200/60">•</span>
            <a href={`tel:${COMPANY_INFO.phone1}`} className="hover:text-gold-400 transition-colors flex items-center gap-1">
              <Phone className="w-3 h-3 text-emerald-300" />
              {COMPANY_INFO.phone1}
            </a>
          </div>

          {/* Right: Currency Switcher & Website Proposal Link */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveModal('pricing_proposal')}
              className="inline-flex items-center gap-1 bg-gold-500 hover:bg-gold-600 text-slate-900 font-bold px-2.5 py-0.5 rounded-full text-xs transition-all shadow-sm animate-pulse"
            >
              <Sparkles className="w-3 h-3" />
              Website Proposal & Pricing
            </button>

            <div className="flex items-center gap-1.5 bg-emerald-900/60 px-2 py-0.5 rounded-md border border-emerald-700/50">
              <Globe2 className="w-3.5 h-3.5 text-gold-400" />
              <span className="text-emerald-200 hidden sm:inline">Currency:</span>
              <select
                value={currentCurrency}
                onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                className="bg-transparent text-white font-bold cursor-pointer focus:outline-none text-xs"
              >
                {Object.keys(currencies).map((code) => (
                  <option key={code} value={code} className="bg-slate-800 text-white">
                    {code} ({currencies[code as CurrencyCode].symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-4">

          {/* Official Logo & Brand Name */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
          >
            {/* Client's Actual Logo Image */}
            <img
              src="/logo.jpeg"
              alt="BIB EDIBLES 'N' MART LIMITED Logo"
              className="w-12 h-12 sm:w-14 sm:h-14 object-cover shadow-md rounded-full border-2 border-gold-400 group-hover:scale-105 transition-transform"
            />
            <div>
              <h1 className="font-extrabold text-lg sm:text-2xl tracking-tight text-brand-900 leading-none flex items-center gap-1">
                BIB EDIBLES <span className="text-gold-500 font-black">'N' MART</span>
              </h1>
              <p className="text-[10px] sm:text-[11px] font-extrabold text-brand-700 uppercase tracking-wider mt-0.5">
                Healthy foodstuffs at their best
              </p>
            </div>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search egusi, crayfish, palm oil, export bundles..."
                className="w-full pl-10 pr-4 py-2 bg-gray-100 hover:bg-gray-50 focus:bg-white rounded-full border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 text-sm transition-all outline-none"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Action Navigation Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Track Order Button */}
            <button
              onClick={() => setActiveModal('order_tracking')}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-gray-700 hover:text-brand-700 hover:bg-brand-50 rounded-lg transition-colors border border-gray-200"
            >
              <PackageCheck className="w-4 h-4 text-brand-600" />
              Track Order
            </button>

            {/* About Us / Company Profile */}
            <button
              onClick={() => setActiveModal('about_us')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-gray-700 hover:text-brand-700 hover:bg-brand-50 rounded-lg transition-colors border border-gray-200"
            >
              <FileText className="w-4 h-4 text-gold-500" />
              About & RC Details
            </button>

            {/* Admin Toggle */}
            {isAdminLoggedIn ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveModal('admin')}
                  className="inline-flex items-center gap-1 px-3 py-2 text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 rounded-lg hover:bg-amber-200 transition-colors"
                >
                  <UserCheck className="w-4 h-4 text-amber-700" />
                  Admin Portal
                </button>
                <button
                  onClick={logoutAdmin}
                  className="text-xs text-red-600 hover:underline"
                >
                  Exit
                </button>
              </div>
            ) : (
              <button
                onClick={() => setActiveModal('admin')}
                className="p-2 text-gray-500 hover:text-brand-700 hover:bg-gray-100 rounded-lg transition-colors"
                title="Admin Staff Login"
              >
                <UserCheck className="w-5 h-5" />
              </button>
            )}

            {/* Cart Button */}
            <button
              onClick={() => setActiveModal('cart')}
              className="relative inline-flex items-center gap-2 bg-brand-700 hover:bg-brand-800 text-white px-3.5 py-2 rounded-xl font-bold text-sm shadow-md transition-all active:scale-95"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden sm:inline">Cart</span>
              {cartItemCount > 0 && (
                <span className="bg-gold-500 text-slate-950 font-black text-xs w-5 h-5 rounded-full flex items-center justify-center -ml-1">
                  {cartItemCount}
                </span>
              )}
              {totalCartNgn > 0 && (
                <span className="hidden lg:inline border-l border-brand-500 pl-2 text-xs font-semibold text-brand-100">
                  {formatPrice(totalCartNgn)}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg md:hidden"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="mt-2 lg:hidden">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search egusi, crayfish, palm oil, export bundles..."
              className="w-full pl-9 pr-4 py-2 bg-gray-100 rounded-lg border border-gray-200 text-sm focus:bg-white focus:border-brand-500 focus:outline-none"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="bg-gray-50 border-t border-gray-200 overflow-x-auto scrollbar-none py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-2 min-w-max">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider pr-2 border-r border-gray-300">
            Categories:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-brand-700 text-white shadow-sm'
                  : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3 space-y-2 shadow-lg">
          <button
            onClick={() => { setActiveModal('order_tracking'); setMobileMenuOpen(false); }}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded-lg"
          >
            <PackageCheck className="w-4 h-4 text-brand-600" />
            Track Your Order
          </button>
          <button
            onClick={() => { setActiveModal('about_us'); setMobileMenuOpen(false); }}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded-lg"
          >
            <FileText className="w-4 h-4 text-gold-500" />
            Company Registration & Address
          </button>
          <button
            onClick={() => { setActiveModal('pricing_proposal'); setMobileMenuOpen(false); }}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm font-bold text-brand-800 bg-brand-50 rounded-lg"
          >
            <Sparkles className="w-4 h-4 text-gold-500" />
            Client Website Development Proposal & Pricing
          </button>
        </div>
      )}
    </header>
  );
};
