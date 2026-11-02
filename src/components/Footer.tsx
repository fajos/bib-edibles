import React from 'react';
import {
  ShieldCheck,
  Building2,
  Phone,
  Mail,
  MapPin,
  Globe2,
  CreditCard,
  MessageCircle,
  Sparkles,
  UserCheck,
  PackageCheck,
  FileText
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { COMPANY_INFO, BANK_DETAILS } from '../data/initialData';

export const Footer: React.FC = () => {
  const { setActiveModal, setSelectedCategory } = useStore();

  return (
    <footer className="bg-brand-dark text-white border-t border-brand-800 pt-12 pb-8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Col 1: Brand & Regulatory Credentials */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo.jpeg"
                alt="BIB EDIBLES 'N' MART LIMITED Logo"
                className="w-12 h-12 object-cover bg-white rounded-full p-0.5 border border-gold-400"
              />
              <div>
                <h3 className="font-extrabold text-lg text-white leading-none">
                  BIB EDIBLES <span className="text-gold-400">'N' MART</span>
                </h3>
                <p className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider mt-0.5">
                  LIMITED
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 bg-emerald-950 px-3 py-1 rounded-full border border-gold-500/30 text-xs font-bold text-gold-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              CAC RC NUMBER: {COMPANY_INFO.rcNumber}
            </div>

            <p className="text-xs text-emerald-100/80 leading-relaxed">
              Deals in all kinds of sales, supply, retail and exportation of foodstuffs, beverages, and related agricultural items worldwide.
            </p>
          </div>

          {/* Col 2: Company Locations */}
          <div className="space-y-3 text-xs text-emerald-100">
            <h4 className="font-extrabold text-white text-sm uppercase tracking-wider text-gold-400 flex items-center gap-1.5">
              <Building2 className="w-4 h-4" />
              Our Addresses
            </h4>

            <div className="space-y-2">
              <div>
                <strong className="text-white block text-[11px]">Head Office & Depot:</strong>
                <p className="text-emerald-200/90">{COMPANY_INFO.headOfficeAddress}</p>
              </div>
              <div>
                <strong className="text-white block text-[11px]">Registered Address:</strong>
                <p className="text-emerald-200/90">{COMPANY_INFO.registeredAddress}</p>
              </div>
            </div>
          </div>

          {/* Col 3: Direct Contact Details */}
          <div className="space-y-3 text-xs text-emerald-100">
            <h4 className="font-extrabold text-white text-sm uppercase tracking-wider text-gold-400 flex items-center gap-1.5">
              <Phone className="w-4 h-4" />
              Contact & Order Hotline
            </h4>

            <div className="space-y-2">
              <a href={`tel:${COMPANY_INFO.phone1}`} className="flex items-center gap-2 hover:text-gold-400 transition-colors">
                <Phone className="w-3.5 h-3.5 text-gold-400" />
                <span>{COMPANY_INFO.phone1}</span>
              </a>
              <a href={`tel:${COMPANY_INFO.phone2}`} className="flex items-center gap-2 hover:text-gold-400 transition-colors">
                <Phone className="w-3.5 h-3.5 text-gold-400" />
                <span>{COMPANY_INFO.phone2}</span>
              </a>
              <a href={`mailto:${COMPANY_INFO.email}`} className="flex items-center gap-2 hover:text-gold-400 transition-colors break-all">
                <Mail className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                <span>{COMPANY_INFO.email}</span>
              </a>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setActiveModal('pricing_proposal')}
                className="inline-flex items-center gap-1.5 bg-gold-500 hover:bg-gold-600 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-xs transition-all shadow-md"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Website Proposal & Pricing
              </button>
            </div>
          </div>

          {/* Col 4: Quick Nav & Payment Logos */}
          <div className="space-y-3 text-xs text-emerald-100">
            <h4 className="font-extrabold text-white text-sm uppercase tracking-wider text-gold-400">
              Quick Navigation
            </h4>

            <ul className="space-y-1.5">
              <li>
                <button onClick={() => { setSelectedCategory('Export Bundles'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-gold-400">
                  • Diaspora Export Bundles
                </button>
              </li>
              <li>
                <button onClick={() => setActiveModal('order_tracking')} className="hover:text-gold-400">
                  • Track Order Status
                </button>
              </li>
              <li>
                <button onClick={() => setActiveModal('about_us')} className="hover:text-gold-400">
                  • Corporate Information & Registration
                </button>
              </li>
              <li>
                <button onClick={() => setActiveModal('admin')} className="hover:text-gold-400">
                  • Staff Management Portal
                </button>
              </li>
            </ul>

            <div className="pt-2">
              <span className="text-[10px] font-bold text-gray-400 block mb-1">Supported Payment Methods:</span>
              <div className="flex flex-wrap gap-1.5 text-[10px] font-bold text-slate-900">
                <span className="bg-white px-2 py-1 rounded border border-gray-200">Zenith Bank Transfer</span>
                <span className="bg-emerald-200 px-2 py-1 rounded">Visa</span>
                <span className="bg-gold-400 px-2 py-1 rounded">Mastercard</span>
                <span className="bg-white px-2 py-1 rounded">Verve</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="border-t border-brand-800/80 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-emerald-300/70 gap-2">
          <div>
            © {new Date().getFullYear()} <strong>BIB EDIBLES 'N' MART LIMITED</strong>. All rights reserved. RC 7324268.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <button onClick={() => setActiveModal('about_us')} className="hover:underline">Terms & Conditions</button>
            <button onClick={() => setActiveModal('about_us')} className="hover:underline">Export Regulations</button>
            <button onClick={() => setActiveModal('pricing_proposal')} className="hover:underline text-gold-400 font-bold">Proposal PDF</button>
          </div>
        </div>

      </div>

      {/* Floating WhatsApp Quick-Chat Button */}
      <a
        href={`https://wa.me/${COMPANY_INFO.whatsapp.replace('+', '')}?text=Hello%20BIB%20Edibles%2C%20I%20would%20like%20to%20place%20an%20order%20for%20foodstuffs.`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-emerald-600 hover:bg-emerald-500 text-white p-3.5 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 border-2 border-white animate-bounce"
        title="Chat with Us on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-current" />
      </a>
    </footer>
  );
};
