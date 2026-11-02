import React, { useState } from 'react';
import {
  X,
  UserCheck,
  Package,
  DollarSign,
  Building2,
  Plus,
  Edit3,
  Trash2,
  CheckCircle2,
  Clock,
  Lock,
  Eye,
  RefreshCw,
  Search,
  ExternalLink
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product, OrderStatus, Category, CurrencyCode } from '../types';
import { BANK_DETAILS, COMPANY_INFO } from '../data/initialData';

export const AdminPanel: React.FC = () => {
  const {
    activeModal,
    setActiveModal,
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin,
    orders,
    updateOrderStatus,
    products,
    setProducts,
    currencies,
    updateExchangeRates,
    formatPrice
  } = useStore();

  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState(false);

  const [activeTab, setActiveTab] = useState<'orders' | 'products' | 'currencies' | 'company'>('orders');

  // New product form
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);

  // Currency input state
  const [rateUsd, setRateUsd] = useState(currencies.USD.rate);
  const [rateGbp, setRateGbp] = useState(currencies.GBP.rate);
  const [rateEur, setRateEur] = useState(currencies.EUR.rate);

  if (activeModal !== 'admin') return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(loginPass)) {
      setLoginError(false);
      setLoginPass('');
    } else {
      setLoginError(true);
    }
  };

  // Save or Update Product
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct?.name || !editingProduct?.priceNgn) return;

    if (editingProduct.id) {
      // Update
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? (editingProduct as Product) : p));
    } else {
      // Create
      const newP: Product = {
        id: `p_${Date.now()}`,
        name: editingProduct.name,
        category: (editingProduct.category as Category) || 'Local Foodstuffs',
        description: editingProduct.description || '',
        priceNgn: Number(editingProduct.priceNgn),
        weightKg: Number(editingProduct.weightKg || 1),
        imageUrl: editingProduct.imageUrl || 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=800',
        inStock: editingProduct.inStock ?? true,
        isExportReady: editingProduct.isExportReady ?? true,
        nafdacApproved: editingProduct.nafdacApproved ?? true,
        unit: editingProduct.unit || 'kg'
      };
      setProducts(prev => [newP, ...prev]);
    }
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleSaveRates = (e: React.FormEvent) => {
    e.preventDefault();
    updateExchangeRates({
      USD: Number(rateUsd),
      GBP: Number(rateGbp),
      EUR: Number(rateEur)
    });
    alert('Exchange rates updated successfully!');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm p-4 flex items-center justify-center animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-gray-100 my-8">

        {/* Modal Top Bar */}
        <div className="bg-brand-dark text-white p-4 flex items-center justify-between border-b border-brand-800">
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-gold-400" />
            <div>
              <h2 className="font-extrabold text-base">BIB Edibles Management Portal</h2>
              <p className="text-[11px] text-emerald-200">Admin Control Center • RC {COMPANY_INFO.rcNumber}</p>
            </div>
          </div>
          <button
            onClick={() => setActiveModal('none')}
            className="text-gray-300 hover:text-white p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Password Login Screen if not logged in */}
        {!isAdminLoggedIn ? (
          <div className="p-8 max-w-sm mx-auto text-center space-y-4">
            <div className="w-12 h-12 bg-brand-50 rounded-2xl flex items-center justify-center mx-auto text-brand-700">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-gray-900">Admin Staff Access</h3>
              <p className="text-xs text-gray-500 mt-1">Enter management password to manage orders and products.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-3">
              <input
                type="password"
                value={loginPass}
                onChange={(e) => setLoginPass(e.target.value)}
                placeholder="Enter password (default: admin123)"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-mono focus:bg-white focus:border-brand-500 focus:outline-none"
              />
              {loginError && (
                <p className="text-xs text-red-600 font-bold">Incorrect password. Please try again.</p>
              )}
              <button
                type="submit"
                className="w-full py-3 bg-brand-700 hover:bg-brand-800 text-white font-extrabold text-xs rounded-xl shadow-md"
              >
                Log In to Admin Dashboard
              </button>
            </form>
          </div>
        ) : (
          <div>
            {/* Navigation Tabs */}
            <div className="bg-gray-100 border-b border-gray-200 flex overflow-x-auto text-xs font-bold text-gray-600">
              <button
                onClick={() => setActiveTab('orders')}
                className={`px-4 py-3 border-b-2 flex items-center gap-1.5 ${
                  activeTab === 'orders' ? 'border-brand-700 text-brand-900 bg-white' : 'border-transparent hover:text-gray-900'
                }`}
              >
                <Package className="w-4 h-4 text-brand-600" />
                Customer Orders ({orders.length})
              </button>
              <button
                onClick={() => setActiveTab('products')}
                className={`px-4 py-3 border-b-2 flex items-center gap-1.5 ${
                  activeTab === 'products' ? 'border-brand-700 text-brand-900 bg-white' : 'border-transparent hover:text-gray-900'
                }`}
              >
                <Package className="w-4 h-4 text-gold-500" />
                Manage Products ({products.length})
              </button>
              <button
                onClick={() => setActiveTab('currencies')}
                className={`px-4 py-3 border-b-2 flex items-center gap-1.5 ${
                  activeTab === 'currencies' ? 'border-brand-700 text-brand-900 bg-white' : 'border-transparent hover:text-gray-900'
                }`}
              >
                <DollarSign className="w-4 h-4 text-green-600" />
                Exchange Rates
              </button>
              <button
                onClick={() => setActiveTab('company')}
                className={`px-4 py-3 border-b-2 flex items-center gap-1.5 ${
                  activeTab === 'company' ? 'border-brand-700 text-brand-900 bg-white' : 'border-transparent hover:text-gray-900'
                }`}
              >
                <Building2 className="w-4 h-4 text-blue-600" />
                Company Profile
              </button>
            </div>

            {/* Tab Contents */}
            <div className="p-6 max-h-[70vh] overflow-y-auto text-xs">

              {/* TAB 1: ORDERS */}
              {activeTab === 'orders' && (
                <div className="space-y-4">
                  <h3 className="font-extrabold text-gray-900 text-sm">Customer Orders & Transfers</h3>

                  <div className="space-y-3">
                    {orders.length === 0 ? (
                      <p className="text-gray-400 py-8 text-center">No orders registered yet.</p>
                    ) : (
                      orders.map((ord) => (
                        <div key={ord.id} className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-3">
                          <div className="flex flex-col sm:flex-row justify-between gap-2 border-b border-gray-200 pb-2">
                            <div>
                              <div className="font-black text-brand-900 text-sm">{ord.id}</div>
                              <div className="text-gray-500 text-[10px]">
                                Placed: {new Date(ord.createdAt).toLocaleString()} • {ord.shippingAddress.fullName} ({ord.shippingAddress.phone})
                              </div>
                            </div>
                            <div className="sm:text-right">
                              <div className="font-black text-gray-900 text-sm">{formatPrice(ord.totalNgn)}</div>
                              <div className="text-[10px] uppercase font-bold text-gray-500">
                                Method: {ord.paymentMethod.replace('_', ' ')}
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px]">
                            <div>
                              <strong className="block text-gray-700">Delivery Address:</strong>
                              <span className="text-gray-600">{ord.shippingAddress.address}, {ord.shippingAddress.city}, {ord.shippingAddress.country}</span>
                            </div>
                            <div>
                              <strong className="block text-gray-700">Items:</strong>
                              <span className="text-gray-600">
                                {ord.items.map(i => `${i.quantity}x ${i.product.name} (${i.selectedWeightOption?.label || i.product.unit})`).join(', ')}
                              </span>
                            </div>
                          </div>

                          {/* Bank Receipt Attachment Info */}
                          {ord.transferReference && (
                            <div className="bg-amber-100/70 p-2 rounded-xl text-[11px] text-amber-900 font-mono">
                              Transfer Ref: <strong>{ord.transferReference}</strong>
                              {ord.bankReceiptUrl && <span className="ml-2 font-bold text-emerald-700">(Receipt Uploaded: {ord.bankReceiptUrl})</span>}
                            </div>
                          )}

                          {/* Status Actions */}
                          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-gray-700">Status:</span>
                              <select
                                value={ord.orderStatus}
                                onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                                className="p-1.5 bg-white border border-gray-300 rounded-lg text-xs font-bold"
                              >
                                <option value="pending_payment">Pending Payment</option>
                                <option value="payment_verified">Payment Verified</option>
                                <option value="processing">Processing & Packaged</option>
                                <option value="shipped">Dispatched / Cargo Shipped</option>
                                <option value="delivered">Delivered</option>
                              </select>
                            </div>

                            {ord.paymentStatus === 'pending' && (
                              <button
                                onClick={() => updateOrderStatus(ord.id, 'payment_verified', 'verified')}
                                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg"
                              >
                                Approve Payment ✓
                              </button>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: PRODUCTS */}
              {activeTab === 'products' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-gray-900 text-sm">Product Catalog ({products.length})</h3>
                    <button
                      onClick={() => setEditingProduct({ category: 'Local Foodstuffs', inStock: true, isExportReady: true, unit: 'kg' })}
                      className="px-3 py-2 bg-brand-700 text-white font-bold rounded-xl flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" />
                      Add New Product
                    </button>
                  </div>

                  {/* Add/Edit Product Modal Form */}
                  {editingProduct && (
                    <form onSubmit={handleSaveProduct} className="bg-brand-50 border border-brand-200 p-4 rounded-2xl space-y-3">
                      <h4 className="font-black text-brand-900 text-xs">
                        {editingProduct.id ? 'Edit Product' : 'Add New Product'}
                      </h4>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="font-bold block mb-1">Product Title *</label>
                          <input
                            type="text"
                            required
                            value={editingProduct.name || ''}
                            onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                            className="w-full p-2 bg-white border border-brand-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="font-bold block mb-1">Category *</label>
                          <select
                            value={editingProduct.category || 'Local Foodstuffs'}
                            onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value as Category })}
                            className="w-full p-2 bg-white border border-brand-300 rounded-lg"
                          >
                            <option value="Local Foodstuffs">Local Foodstuffs</option>
                            <option value="Export Bundles">Export Bundles</option>
                            <option value="Grains & Flours">Grains & Flours</option>
                            <option value="Spices & Oils">Spices & Oils</option>
                            <option value="Dried Fish & Meat">Dried Fish & Meat</option>
                            <option value="Beverages & Snacks">Beverages & Snacks</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="font-bold block mb-1">Base Price (₦ NGN) *</label>
                          <input
                            type="number"
                            required
                            value={editingProduct.priceNgn || ''}
                            onChange={(e) => setEditingProduct({ ...editingProduct, priceNgn: Number(e.target.value) })}
                            className="w-full p-2 bg-white border border-brand-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="font-bold block mb-1">Base Weight (kg)</label>
                          <input
                            type="number"
                            step="0.1"
                            value={editingProduct.weightKg || ''}
                            onChange={(e) => setEditingProduct({ ...editingProduct, weightKg: Number(e.target.value) })}
                            className="w-full p-2 bg-white border border-brand-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="font-bold block mb-1">Image URL</label>
                          <input
                            type="text"
                            value={editingProduct.imageUrl || ''}
                            onChange={(e) => setEditingProduct({ ...editingProduct, imageUrl: e.target.value })}
                            className="w-full p-2 bg-white border border-brand-300 rounded-lg"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="font-bold block mb-1">Description</label>
                        <textarea
                          rows={2}
                          value={editingProduct.description || ''}
                          onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                          className="w-full p-2 bg-white border border-brand-300 rounded-lg text-xs"
                        />
                      </div>

                      <div className="flex gap-2">
                        <button type="submit" className="px-4 py-2 bg-brand-700 text-white font-bold rounded-lg">Save Product</button>
                        <button type="button" onClick={() => setEditingProduct(null)} className="px-4 py-2 bg-gray-200 text-gray-700 font-bold rounded-lg">Cancel</button>
                      </div>
                    </form>
                  )}

                  {/* Product Table */}
                  <div className="border border-gray-200 rounded-xl overflow-hidden">
                    <table className="w-full text-left">
                      <thead className="bg-gray-100 text-gray-600 uppercase font-bold border-b border-gray-200 text-[10px]">
                        <tr>
                          <th className="p-2">Item</th>
                          <th className="p-2">Category</th>
                          <th className="p-2">Price (NGN)</th>
                          <th className="p-2">Weight</th>
                          <th className="p-2 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {products.map(p => (
                          <tr key={p.id}>
                            <td className="p-2 font-bold text-gray-900">{p.name}</td>
                            <td className="p-2 text-gray-600">{p.category}</td>
                            <td className="p-2 font-extrabold text-brand-900">{formatPrice(p.priceNgn)}</td>
                            <td className="p-2 text-gray-600">{p.weightKg} kg</td>
                            <td className="p-2 text-right space-x-1">
                              <button onClick={() => setEditingProduct(p)} className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button onClick={() => handleDeleteProduct(p.id)} className="p-1 text-red-600 hover:bg-red-50 rounded">
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 3: CURRENCIES */}
              {activeTab === 'currencies' && (
                <form onSubmit={handleSaveRates} className="space-y-4 max-w-md">
                  <h3 className="font-extrabold text-gray-900 text-sm">International Exchange Rate Configuration</h3>
                  <p className="text-gray-500 text-xs">Set exchange multiplier relative to 1 NGN (Nigerian Naira).</p>

                  <div className="space-y-3">
                    <div>
                      <label className="font-bold block mb-1">USD ($) Exchange Rate (1 NGN in USD):</label>
                      <input
                        type="number"
                        step="0.000001"
                        value={rateUsd}
                        onChange={(e) => setRateUsd(Number(e.target.value))}
                        className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-mono text-xs"
                      />
                    </div>
                    <div>
                      <label className="font-bold block mb-1">GBP (£) Exchange Rate (1 NGN in GBP):</label>
                      <input
                        type="number"
                        step="0.000001"
                        value={rateGbp}
                        onChange={(e) => setRateGbp(Number(e.target.value))}
                        className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-mono text-xs"
                      />
                    </div>
                    <div>
                      <label className="font-bold block mb-1">EUR (€) Exchange Rate (1 NGN in EUR):</label>
                      <input
                        type="number"
                        step="0.000001"
                        value={rateEur}
                        onChange={(e) => setRateEur(Number(e.target.value))}
                        className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-mono text-xs"
                      />
                    </div>
                  </div>

                  <button type="submit" className="px-5 py-2.5 bg-brand-700 text-white font-extrabold text-xs rounded-xl shadow-md">
                    Update Exchange Rates
                  </button>
                </form>
              )}

              {/* TAB 4: COMPANY PROFILE */}
              {activeTab === 'company' && (
                <div className="space-y-4">
                  <h3 className="font-extrabold text-gray-900 text-sm">Corporate Registration Details</h3>
                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-2 text-xs">
                    <div><strong>Company Name:</strong> {COMPANY_INFO.name}</div>
                    <div><strong>RC Number:</strong> {COMPANY_INFO.rcNumber}</div>
                    <div><strong>Registration Date:</strong> {COMPANY_INFO.registrationDate}</div>
                    <div><strong>Registered Address:</strong> {COMPANY_INFO.registeredAddress}</div>
                    <div><strong>Head Office:</strong> {COMPANY_INFO.headOfficeAddress}</div>
                    <div><strong>Official Email:</strong> {COMPANY_INFO.email}</div>
                    <div><strong>Phones:</strong> {COMPANY_INFO.phone1}, {COMPANY_INFO.phone2}</div>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
