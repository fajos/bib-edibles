import React from 'react';
import {
  Plane,
  ShieldCheck,
  Award,
  Truck,
  Sparkles,
  CreditCard,
  Building2,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { COMPANY_INFO } from '../data/initialData';

export const Hero: React.FC = () => {
  const { setSelectedCategory, setActiveModal } = useStore();

  return (
    <div className="relative overflow-hidden bg-pattern text-white py-12 lg:py-16 px-4 sm:px-6">
      {/* Soft Glow Circles background */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Left Column: Headlines & Call to Action */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">

            {/* Regulatory Badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-900/80 border border-gold-500/40 px-3.5 py-1.5 rounded-full text-xs font-bold text-gold-400 backdrop-blur-sm shadow-inner">
              <ShieldCheck className="w-4 h-4 text-gold-400 animate-pulse" />
              Officially Registered Corporate Enterprise • RC {COMPANY_INFO.rcNumber}
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none">
              Authentic <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-amber-200 to-gold-500">Nigerian Foodstuffs</span> Delivered Anywhere Worldwide.
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-emerald-100 max-w-2xl font-normal leading-relaxed">
              Order premium handpicked <strong className="text-white font-semibold">Egusi, Crayfish, Pure Red Palm Oil, Garri, Smoked Fish</strong>, and ready-to-ship diaspora export crates directly from <strong className="text-white font-semibold">Abuja, Nigeria</strong>.
            </p>

            {/* Key Trust Checkmarks */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-semibold text-emerald-200">
              <div className="flex items-center gap-2 justify-center lg:justify-start bg-white/5 p-2 rounded-lg border border-white/10">
                <Plane className="w-4 h-4 text-gold-400 shrink-0" />
                <span>Worldwide Cargo Air Freight</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start bg-white/5 p-2 rounded-lg border border-white/10">
                <CreditCard className="w-4 h-4 text-gold-400 shrink-0" />
                <span>Bank Transfer & Card</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start bg-white/5 p-2 rounded-lg border border-white/10 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                <span>100% Vacuum Packed</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-4">
              <button
                onClick={() => setSelectedCategory('Export Bundles')}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 text-slate-950 px-6 py-3.5 rounded-xl font-extrabold text-sm sm:text-base shadow-xl hover:shadow-gold-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Sparkles className="w-5 h-5 text-slate-900" />
                Shop Export Crate Bundles
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={() => setSelectedCategory('All')}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all"
              >
                Explore Full Food Catalog
              </button>
            </div>
          </div>

          {/* Right Column: Featured Banner Card / Head Office Highlight */}
          <div className="lg:col-span-5">
            <div className="bg-emerald-950/90 border border-emerald-700/60 rounded-2xl p-6 shadow-2xl backdrop-blur-md relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-emerald-800/80 mb-4">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-gold-400" />
                  <span className="font-extrabold text-sm text-gold-300 uppercase tracking-wide">
                    Head Office & Depot
                  </span>
                </div>
                <span className="bg-emerald-800 text-emerald-200 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                  ACTIVE REGISTRATION
                </span>
              </div>

              <div className="space-y-3 text-sm text-emerald-100">
                <p className="font-bold text-white text-base">
                  BIB EDIBLES 'N' MART LIMITED
                </p>
                <p className="text-xs text-emerald-200">
                  <strong>Head Office Address:</strong> {COMPANY_INFO.headOfficeAddress}
                </p>
                <p className="text-xs text-emerald-200">
                  <strong>Registered Address:</strong> {COMPANY_INFO.registeredAddress}
                </p>

                <div className="bg-emerald-900/60 p-3 rounded-xl border border-emerald-800 mt-3 text-xs space-y-1">
                  <div className="flex justify-between text-emerald-300">
                    <span>Company Status:</span>
                    <strong className="text-emerald-400 font-bold">{COMPANY_INFO.status}</strong>
                  </div>
                  <div className="flex justify-between text-emerald-300">
                    <span>Export Compliance:</span>
                    <strong className="text-gold-400 font-bold">Phytosanitary Certified</strong>
                  </div>
                </div>

                <div className="pt-2 flex justify-between items-center text-xs">
                  <span className="text-emerald-300">Need immediate help?</span>
                  <button
                    onClick={() => setActiveModal('pricing_proposal')}
                    className="text-gold-400 hover:text-gold-300 underline font-semibold"
                  >
                    View Website Proposal & Prices →
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
