import React from 'react';
import {
  Building2,
  X,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Award,
  Plane,
  CheckCircle2
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { COMPANY_INFO } from '../data/initialData';

export const AboutUsModal: React.FC = () => {
  const { activeModal, setActiveModal } = useStore();

  if (activeModal !== 'about_us') return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm p-4 flex items-center justify-center animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-gray-100 my-8">

        {/* Top Header */}
        <div className="bg-brand-dark text-white p-6 relative">
          <button
            onClick={() => setActiveModal('none')}
            className="absolute top-4 right-4 text-gray-300 hover:text-white p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 bg-gold-500/20 text-gold-400 font-bold text-xs px-3 py-1 rounded-full border border-gold-500/40 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            CAC RC NUMBER: {COMPANY_INFO.rcNumber}
          </div>

          <h2 className="text-2xl font-black">{COMPANY_INFO.name}</h2>
          <p className="text-xs text-emerald-200 mt-1">
            Registered Private Company Limited by Shares • Active Registration
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 text-xs text-gray-700">

          {/* Mission & Activities */}
          <div className="space-y-2">
            <h3 className="font-extrabold text-gray-900 text-sm flex items-center gap-2">
              <Award className="w-4 h-4 text-brand-700" />
              Corporate Profile & Activities
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {COMPANY_INFO.principalActivity}. We specialize in sourcing unadulterated Nigerian agricultural food items, hygienic vacuum packaging, and air cargo delivery to domestic customers and Nigerians in the diaspora across the UK, USA, Canada, Europe, and Asia.
            </p>
          </div>

          {/* Official Registration Details Table */}
          <div className="bg-gray-50 border border-gray-200 p-4 rounded-2xl space-y-2 font-medium">
            <h4 className="font-extrabold text-gray-900 text-xs uppercase text-brand-900">
              CAC Corporate Credentials
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <span className="text-gray-400 block text-[10px] font-bold">COMPANY NAME</span>
                <span className="font-bold text-gray-900">{COMPANY_INFO.name}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px] font-bold">RC NUMBER</span>
                <span className="font-bold text-gray-900">{COMPANY_INFO.rcNumber}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px] font-bold">DATE OF REGISTRATION</span>
                <span className="font-bold text-gray-900">{COMPANY_INFO.registrationDate}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px] font-bold">STATUS</span>
                <span className="font-bold text-emerald-700">{COMPANY_INFO.status}</span>
              </div>
            </div>
          </div>

          {/* Addresses & Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl space-y-1.5">
              <div className="font-bold text-brand-900 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-brand-700" />
                Head Office Address
              </div>
              <p className="text-gray-700 font-semibold">{COMPANY_INFO.headOfficeAddress}</p>
            </div>

            <div className="bg-gray-50 border border-gray-200 p-4 rounded-2xl space-y-1.5">
              <div className="font-bold text-gray-900 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-brand-700" />
                Registered Address
              </div>
              <p className="text-gray-700 font-semibold">{COMPANY_INFO.registeredAddress}</p>
            </div>
          </div>

          {/* Contact Direct */}
          <div className="bg-brand-900 text-white p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="space-y-1">
              <div className="font-bold text-gold-400">Direct Customer Lines:</div>
              <div className="text-xs space-x-3">
                <span className="inline-flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {COMPANY_INFO.phone1}</span>
                <span className="inline-flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {COMPANY_INFO.phone2}</span>
              </div>
            </div>

            <a
              href={`https://wa.me/${COMPANY_INFO.whatsapp.replace('+', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gold-500 hover:bg-gold-600 text-slate-950 font-extrabold text-xs rounded-xl transition-all"
            >
              Chat on WhatsApp →
            </a>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 text-right">
          <button
            onClick={() => setActiveModal('none')}
            className="px-5 py-2.5 bg-brand-700 text-white font-extrabold text-xs rounded-xl shadow-md"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
