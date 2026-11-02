import React from 'react';
import {
  Sparkles,
  X,
  DollarSign,
  ShieldCheck,
  Building2,
  Globe2,
  CheckCircle2,
  FileText,
  CreditCard,
  Printer,
  Scale
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { COMPANY_INFO } from '../data/initialData';

export const PricingProposalModal: React.FC = () => {
  const { activeModal, setActiveModal, formatPrice } = useStore();

  if (activeModal !== 'pricing_proposal') return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm p-4 flex items-center justify-center animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-gray-100 my-8">

        {/* Modal Top Header */}
        <div className="bg-brand-dark text-white p-6 relative flex items-center justify-between border-b border-brand-800">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-gold-500/20 text-gold-400 font-bold text-xs px-3 py-1 rounded-full border border-gold-500/40 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Official Website & Export Pricing Proposal
            </div>
            <h2 className="text-xl sm:text-2xl font-black">
              E-Commerce Website Development & Pricing Strategy
            </h2>
            <p className="text-xs text-emerald-200 mt-0.5">
              Prepared for: <strong>BIB EDIBLES 'N' MART LIMITED (RC 7324268)</strong>
            </p>
          </div>

          <button
            onClick={() => setActiveModal('none')}
            className="text-gray-300 hover:text-white p-2 rounded-lg"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Proposal Content */}
        <div className="p-6 space-y-8 text-xs text-gray-700 max-h-[75vh] overflow-y-auto" id="printable-proposal">

          {/* Executive Overview */}
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl space-y-2">
            <h3 className="font-extrabold text-brand-900 text-sm flex items-center gap-2">
              <Building2 className="w-4 h-4 text-brand-700" />
              Client Overview & Technical Scope
            </h3>
            <p className="text-xs text-gray-700 leading-relaxed">
              This proposal outlines the technical cost breakdown for designing, developing, and deploying a modern e-commerce platform for <strong>BIB EDIBLES 'N' MART LIMITED</strong> (Head Office in Lugbe, Abuja). It includes native support for <strong>Nigerian Bank Transfers</strong> and <strong>Online Card Payments</strong> (Paystack/Flutterwave), multi-currency switching (NGN, USD, GBP, EUR), international cargo weight calculators, and an admin management portal.
            </p>
          </div>

          {/* SECTION 1: WEBSITE DEVELOPMENT COST BREAKDOWN */}
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-2 flex justify-between items-end">
              <h3 className="font-black text-gray-900 text-base text-brand-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-gold-500" />
                Section 1: Website Development & Setup Cost Breakdown
              </h3>
              <span className="text-[11px] font-bold text-gray-500">Quotes in NGN (₦) & USD ($)</span>
            </div>

            {/* Pricing Packages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Option A: Standard MVP Package */}
              <div className="bg-white border-2 border-brand-200 p-5 rounded-2xl shadow-sm space-y-3 relative">
                <div className="bg-brand-100 text-brand-900 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md inline-block">
                  RECOMMENDED MVP PACKAGE
                </div>
                <h4 className="font-extrabold text-gray-900 text-base">Standard Export E-Commerce MVP</h4>

                <div className="text-2xl font-black text-brand-900">
                  ₦850,000 <span className="text-xs font-semibold text-gray-500">($565 USD)</span>
                </div>
                <p className="text-[11px] text-gray-500">One-time development & deployment fee.</p>

                <ul className="space-y-2 text-xs text-gray-600 border-t border-gray-100 pt-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                    <span><strong>Responsive Web App:</strong> Mobile-first UI for Foodstuffs & Export Bundles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                    <span><strong>Dual Payment Gateway:</strong> Direct Nigerian Bank Transfer receipt upload + Paystack Inline Card Processing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                    <span><strong>Multi-Currency Converter:</strong> Real-time switcher for NGN, USD, GBP, and EUR</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                    <span><strong>International Cargo Freight Calculator:</strong> Automatic weight-based shipping rates for UK, USA, Canada, and EU</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                    <span><strong>Admin Dashboard:</strong> Order approval, bank receipt verification, product & price manager</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                    <span><strong>CAC Compliance Integration:</strong> Verification badge & corporate trust footer</span>
                  </li>
                </ul>
              </div>

              {/* Option B: Premium Enterprise Suite */}
              <div className="bg-gray-50 border border-gray-200 p-5 rounded-2xl space-y-3 relative">
                <div className="bg-gray-200 text-gray-800 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md inline-block">
                  ENTERPRISE EXPORTATION SUITE
                </div>
                <h4 className="font-extrabold text-gray-900 text-base">Full Enterprise & Logistics Suite</h4>

                <div className="text-2xl font-black text-gray-900">
                  ₦1,450,000 <span className="text-xs font-semibold text-gray-500">($965 USD)</span>
                </div>
                <p className="text-[11px] text-gray-500">Includes advanced automated logistics API sync & multi-currency automated banking.</p>

                <ul className="space-y-2 text-xs text-gray-600 border-t border-gray-200 pt-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                    <span>Everything in Standard MVP Package</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                    <span><strong>Automated Courier API Sync:</strong> Live DHL / FedEx / GIG Logistics tracking API integration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                    <span><strong>Automated Bank Recon:</strong> Virtual NGN accounts generation per order for instant transfer verification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                    <span><strong>Customer SMS / WhatsApp Alerts:</strong> Automated SMS alerts on dispatch & delivery</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                    <span><strong>Custom Mobile App Version:</strong> Android PWA installable app</span>
                  </li>
                </ul>
              </div>

            </div>

            {/* Recurring Maintenance & Hosting Expenses Table */}
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-2xl space-y-3">
              <h4 className="font-extrabold text-gray-900 text-xs">Annual Domain, Hosting & Maintenance Schedule:</h4>
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-gray-100 font-bold uppercase text-[10px] text-gray-600 border-b border-gray-200">
                    <tr>
                      <th className="p-2.5">Item / Service</th>
                      <th className="p-2.5">Billing Cycle</th>
                      <th className="p-2.5 text-right">Cost (NGN)</th>
                      <th className="p-2.5 text-right">Cost (USD)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 text-[11px]">
                    <tr>
                      <td className="p-2.5 font-semibold">Custom .com / .ng Domain Name (e.g. bibedibles.com)</td>
                      <td className="p-2.5 text-gray-500">Annual</td>
                      <td className="p-2.5 text-right font-bold">₦25,000</td>
                      <td className="p-2.5 text-right">$17</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-semibold">SSL Security Certificate & High-Speed Cloud Hosting</td>
                      <td className="p-2.5 text-gray-500">Annual</td>
                      <td className="p-2.5 text-right font-bold">₦95,000</td>
                      <td className="p-2.5 text-right">$63</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-semibold">Technical Support, Exchange Rate Adjustments & Backups</td>
                      <td className="p-2.5 text-gray-500">Monthly (Optional)</td>
                      <td className="p-2.5 text-right font-bold">₦40,000 / mo</td>
                      <td className="p-2.5 text-right">$27 / mo</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* SECTION 2: PRODUCT CATALOG & INTERNATIONAL EXPORT PRICING STRATEGY */}
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-2 flex justify-between items-end">
              <h3 className="font-black text-gray-900 text-base text-brand-900 flex items-center gap-2">
                <Globe2 className="w-5 h-5 text-brand-700" />
                Section 2: Recommended Product Pricing & Export Margin Strategy
              </h3>
              <span className="text-[11px] font-bold text-gray-500">Nigerian Retail vs Worldwide Diaspora Pricing</span>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">
              Because BIB EDIBLES 'N' MART LIMITED exports foodstuffs internationally, we recommend a <strong>Dual-Tier Pricing Model</strong>:
              <br />
              • <strong>Tier 1 (Domestic Nigerian Orders):</strong> Base local retail market prices in Naira (₦).
              <br />
              • <strong>Tier 2 (International Export Bundles):</strong> Priced in USD/GBP/EUR with an embedded <strong>25% - 35% Export Preparation Margin</strong> to cover vacuum seal packaging, moisture control bags, phytosanitary clearance certificates, and cargo handling fees.
            </p>

            {/* Recommended Product Pricing Table */}
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-brand-900 text-white font-bold uppercase text-[10px] border-b border-brand-800">
                  <tr>
                    <th className="p-2.5">Product Name</th>
                    <th className="p-2.5">Standard Pack</th>
                    <th className="p-2.5 text-right">Local NGN Price</th>
                    <th className="p-2.5 text-right">USD Export Price</th>
                    <th className="p-2.5 text-right">GBP Export Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-[11px]">
                  <tr>
                    <td className="p-2.5 font-bold text-gray-900">Handpicked Egusi (Melon Seeds)</td>
                    <td className="p-2.5 text-gray-600">2kg Vacuum Pack</td>
                    <td className="p-2.5 text-right font-extrabold text-brand-900">₦14,500</td>
                    <td className="p-2.5 text-right font-extrabold text-gray-900">$12.50</td>
                    <td className="p-2.5 text-right font-extrabold text-gray-900">£9.80</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-gray-900">Pure Red Palm Oil (Nsukka Grade)</td>
                    <td className="p-2.5 text-gray-600">4 Liter Sealed Keg</td>
                    <td className="p-2.5 text-right font-extrabold text-brand-900">₦12,000</td>
                    <td className="p-2.5 text-right font-extrabold text-gray-900">$10.50</td>
                    <td className="p-2.5 text-right font-extrabold text-gray-900">£8.20</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-gray-900">Dehydrated Oron Crayfish</td>
                    <td className="p-2.5 text-gray-600">1kg Export Bag</td>
                    <td className="p-2.5 text-right font-extrabold text-brand-900">₦9,500</td>
                    <td className="p-2.5 text-right font-extrabold text-gray-900">$8.50</td>
                    <td className="p-2.5 text-right font-extrabold text-gray-900">£6.50</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-gray-900">Smoked Catfish & Stockfish Cuts</td>
                    <td className="p-2.5 text-gray-600">1.5kg Moisture Proof Box</td>
                    <td className="p-2.5 text-right font-extrabold text-brand-900">₦18,500</td>
                    <td className="p-2.5 text-right font-extrabold text-gray-900">$15.50</td>
                    <td className="p-2.5 text-right font-extrabold text-gray-900">£12.00</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-gray-900">Diaspora Kitchen Export Crate</td>
                    <td className="p-2.5 text-gray-600">15kg Starter Crate</td>
                    <td className="p-2.5 text-right font-extrabold text-brand-900">₦125,000</td>
                    <td className="p-2.5 text-right font-extrabold text-gray-900">$95.00</td>
                    <td className="p-2.5 text-right font-extrabold text-gray-900">£72.00</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-[11px] text-amber-900">
              <strong>Note on Freight Costs:</strong> International air cargo freight fees are calculated separately during checkout based on destination country and total parcel weight (e.g. UK Air Freight: ~₦4,500/kg; USA/Canada Express: ~₦5,500/kg).
            </div>
          </div>

        </div>

        {/* Modal Action Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold text-xs rounded-xl flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4" />
            Print Proposal PDF
          </button>

          <button
            onClick={() => setActiveModal('none')}
            className="px-5 py-2.5 bg-brand-700 hover:bg-brand-800 text-white font-extrabold text-xs rounded-xl shadow-md"
          >
            Close Proposal
          </button>
        </div>

      </div>
    </div>
  );
};
