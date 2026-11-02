import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { AdminPanel } from './components/AdminPanel';
import { PricingProposalModal } from './components/PricingProposalModal';
import { AboutUsModal } from './components/AboutUsModal';
import { Footer } from './components/Footer';
import { Filter, ShoppingBag, Sparkles, Plane, ShieldCheck } from 'lucide-react';

const MainStoreView: React.FC = () => {
  const {
    products,
    selectedCategory,
    searchQuery,
    setSelectedCategory,
    setSearchQuery,
    setActiveModal
  } = useStore();

  // Filter products by category and search term
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = searchQuery === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Product Catalog Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-6">

          {/* Section Header & Stats */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-md mb-1">
                <Sparkles className="w-3.5 h-3.5 text-gold-500" />
                Unadulterated Premium Quality
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                {selectedCategory === 'All' ? 'All Nigerian Foodstuffs & Export Items' : selectedCategory}
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Showing {filteredProducts.length} items available for immediate local delivery & international air freight.
              </p>
            </div>

            {/* Quick Export Crate Promo Banner */}
            <button
              onClick={() => setSelectedCategory('Export Bundles')}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-900 to-emerald-950 text-white px-4 py-2.5 rounded-xl border border-brand-700 hover:border-gold-400 transition-all text-xs font-bold shadow-sm"
            >
              <Plane className="w-4 h-4 text-gold-400" />
              <span>Diaspora Export Bundles</span>
            </button>
          </div>

          {/* Search Result Feedback */}
          {searchQuery && (
            <div className="bg-brand-50 border border-brand-200 p-3 rounded-xl text-xs flex justify-between items-center">
              <span>Filter results for "<strong>{searchQuery}</strong>" ({filteredProducts.length} items found)</span>
              <button
                onClick={() => setSearchQuery('')}
                className="text-brand-800 font-bold hover:underline"
              >
                Clear Search Filter
              </button>
            </div>
          )}

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 p-8 space-y-3 max-w-md mx-auto my-8">
              <div className="w-16 h-16 bg-brand-50 text-brand-700 rounded-full flex items-center justify-center mx-auto">
                <Filter className="w-8 h-8" />
              </div>
              <h3 className="font-extrabold text-gray-900 text-lg">No products found</h3>
              <p className="text-xs text-gray-500">
                Try searching for another item or choose a different category filter.
              </p>
              <button
                onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                className="mt-2 inline-flex items-center gap-1 bg-brand-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* All Application Modals */}
      <ProductModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderConfirmationModal />
      <OrderTrackingModal />
      <AdminPanel />
      <PricingProposalModal />
      <AboutUsModal />
    </div>
  );
};

export function App() {
  return (
    <StoreProvider>
      <MainStoreView />
    </StoreProvider>
  );
}

export default App;
