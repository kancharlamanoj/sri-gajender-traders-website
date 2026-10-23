import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Package,
  Layers,
  Award,
  Settings,
  Inbox,
  Plus,
  Trash2,
  Edit3,
  Search,
  Check,
  X,
  RefreshCw,
  LogOut,
  Lock,
  ArrowUpRight,
  TrendingUp,
  Eye,
  Store,
  Phone,
  Clock,
  Sparkles,
  Download,
  Upload,
  ArrowLeft,
  ChevronRight,
  Filter,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Info,
} from 'lucide-react';
import {
  ProductItem,
  CategoryInfo,
  BrandProfile,
  CategorySlug,
  BrandId,
} from '../data/catalogData';
import {
  getStoredProducts,
  saveStoredProducts,
  getStoredCategories,
  saveStoredCategories,
  getStoredBrands,
  saveStoredBrands,
  getStoredSettings,
  saveStoredSettings,
  getStoredInquiries,
  saveStoredInquiries,
  resetToFactoryDefaults,
  isAdminAuthenticated,
  setAdminAuthenticated,
  InboundInquiry,
  AdminSettings,
} from '../utils/adminStore';
import { NavigateFn } from '../types/navigation';

interface AdminPageProps {
  onNavigate: NavigateFn;
}

type TabKey = 'dashboard' | 'products' | 'categories' | 'brands' | 'inquiries' | 'settings';

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(isAdminAuthenticated());
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState<TabKey>('dashboard');

  // Stored state
  const [products, setProducts] = useState<ProductItem[]>(getStoredProducts());
  const [categories, setCategories] = useState<CategoryInfo[]>(getStoredCategories());
  const [brands, setBrands] = useState<BrandProfile[]>(getStoredBrands());
  const [settings, setSettings] = useState<AdminSettings>(getStoredSettings());
  const [inquiries, setInquiries] = useState<InboundInquiry[]>(getStoredInquiries());

  // Search & Filter in Products Tab
  const [prodSearch, setProdSearch] = useState('');
  const [prodCategoryFilter, setProdCategoryFilter] = useState<string>('all');
  const [prodBrandFilter, setProdBrandFilter] = useState<string>('all');

  // Modals
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  const [editingCategory, setEditingCategory] = useState<CategoryInfo | null>(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const [editingBrand, setEditingBrand] = useState<BrandProfile | null>(null);
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);

  // Quick feedback banner / toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const reloadAll = () => {
    setProducts(getStoredProducts());
    setCategories(getStoredCategories());
    setBrands(getStoredBrands());
    setSettings(getStoredSettings());
    setInquiries(getStoredInquiries());
  };

  useEffect(() => {
    const handleDataUpdate = () => reloadAll();
    window.addEventListener('sgt-data-update', handleDataUpdate);
    return () => window.removeEventListener('sgt-data-update', handleDataUpdate);
  }, []);

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const allowed = ['admin', 'admin123', 'gajender', 'gajender2026', 'tirupati'];
    if (allowed.includes(passcode.trim().toLowerCase())) {
      setAdminAuthenticated(true);
      setIsAuthenticated(true);
      setAuthError('');
      showToast('Welcome back, Admin!');
    } else {
      setAuthError('Incorrect passcode. Try "admin123"');
    }
  };

  const handleLogout = () => {
    setAdminAuthenticated(false);
    setIsAuthenticated(false);
    showToast('Signed out successfully');
  };

  // Product Actions
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    if (!editingProduct.name.trim() || !editingProduct.model.trim()) {
      alert('Please fill in Product Name and Model Code');
      return;
    }

    const exists = products.some((p) => p.id === editingProduct.id);
    let updated: ProductItem[];

    if (exists) {
      updated = products.map((p) => (p.id === editingProduct.id ? editingProduct : p));
      showToast(`Saved changes for "${editingProduct.name}"`);
    } else {
      updated = [editingProduct, ...products];
      showToast(`Added new product "${editingProduct.name}"`);
    }

    setProducts(updated);
    saveStoredProducts(updated);
    setIsProductModalOpen(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id: string, name: string) => {
    if (window.confirm(`Delete "${name}" from store catalogue?`)) {
      const updated = products.filter((p) => p.id !== id);
      setProducts(updated);
      saveStoredProducts(updated);
      showToast(`Removed "${name}"`);
    }
  };

  const handleToggleFeatured = (id: string) => {
    const updated = products.map((p) =>
      p.id === id ? { ...p, featured: !p.featured } : p
    );
    setProducts(updated);
    saveStoredProducts(updated);
    showToast('Updated homepage featured badge');
  };

  const openNewProductModal = () => {
    const randId = `prod-${Date.now().toString(36)}`;
    const newProd: ProductItem = {
      id: randId,
      indexCode: `IDX // ${(products.length + 1).toString().padStart(2, '0')}`,
      name: '',
      brandId: 'portronics',
      brandName: 'Portronics',
      model: '',
      category: 'audio-wireless',
      categoryLabel: 'Audio & Wireless',
      tagline: '',
      editorialSummary: '',
      primaryImage:
        'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1000&q=80',
      secondaryImage:
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80',
      verifiedSpecs: [
        { label: 'Warranty', value: '1 Year Brand Warranty' },
        { label: 'Condition', value: 'Brand New Sealed' },
      ],
      keyHighlights: ['Brand Genuine', 'Fast Delivery in Tirupati', 'Best Price'],
      featured: false,
    };
    setEditingProduct(newProd);
    setIsProductModalOpen(true);
  };

  // Inquiry Status
  const handleUpdateInquiryStatus = (
    id: string,
    status: 'new' | 'contacted' | 'resolved'
  ) => {
    const updated = inquiries.map((inq) =>
      inq.id === id ? { ...inq, status } : inq
    );
    setInquiries(updated);
    saveStoredInquiries(updated);
    showToast(`Inquiry status updated to ${status}`);
  };

  const handleDeleteInquiry = (id: string) => {
    const updated = inquiries.filter((inq) => inq.id !== id);
    setInquiries(updated);
    saveStoredInquiries(updated);
    showToast('Inquiry removed');
  };

  // Backup & Restore
  const handleExportJSON = () => {
    const payload = {
      products,
      categories,
      brands,
      settings,
      inquiries,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sri-gajender-data-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    showToast('Backup file downloaded');
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const parsed = JSON.parse(evt.target?.result as string);
        if (parsed.products) saveStoredProducts(parsed.products);
        if (parsed.categories) saveStoredCategories(parsed.categories);
        if (parsed.brands) saveStoredBrands(parsed.brands);
        if (parsed.settings) saveStoredSettings(parsed.settings);
        if (parsed.inquiries) saveStoredInquiries(parsed.inquiries);
        reloadAll();
        showToast('Backup restored successfully');
      } catch {
        alert('Invalid file format. Please upload a valid JSON backup.');
      }
    };
    reader.readAsText(file);
  };

  // Filter products
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(prodSearch.toLowerCase()) ||
      p.model.toLowerCase().includes(prodSearch.toLowerCase()) ||
      p.brandName.toLowerCase().includes(prodSearch.toLowerCase());
    const matchesCat =
      prodCategoryFilter === 'all' || p.category === prodCategoryFilter;
    const matchesBrand =
      prodBrandFilter === 'all' || p.brandId === prodBrandFilter;
    return matchesSearch && matchesCat && matchesBrand;
  });

  const newInquiriesCount = inquiries.filter((i) => i.status === 'new').length;

  // -------------------------------------------------------------
  // LOGIN SCREEN: Clean, Modern, Simple
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-slate-100">
          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-lg shadow-red-600/30 mb-4">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800">
              Store Admin Login
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Sri Gajender Traders · Operations Control
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-600 tracking-wider mb-2">
                Admin Passcode
              </label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode (e.g. admin123)"
                className="w-full px-4 py-3 text-sm rounded-xl bg-slate-50 border border-slate-300 text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                autoFocus
              />
            </div>

            {authError && (
              <div className="flex items-center gap-2 text-xs font-medium text-red-600 bg-red-50 p-3 rounded-xl border border-red-200">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-red-600 text-white font-semibold text-sm hover:bg-red-700 transition shadow-md shadow-red-600/25 active:scale-[0.99]"
            >
              Log In to Admin
            </button>

            <button
              type="button"
              onClick={() => onNavigate({ page: 'home' })}
              className="w-full py-2.5 text-xs font-medium text-slate-500 hover:text-slate-800 transition flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Customer Website</span>
            </button>
          </form>

          <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <span>Default demo password:</span>
            <span className="font-mono font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-100">
              admin123
            </span>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // AUTHENTICATED ADMIN PANEL: Premium Clean Dashboard UI
  // -------------------------------------------------------------
  return (
    <div className="h-screen w-full bg-slate-50 text-slate-800 font-sans flex flex-col md:flex-row overflow-hidden">
      {/* Toast Popup Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 right-6 z-[150] bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-sm font-medium border border-slate-700"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* LEFT VERTICAL SIDEBAR: CONSTANT & FIXED                   */}
      {/* ========================================================= */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 flex flex-col shrink-0 h-auto md:h-screen z-40 select-none">
        {/* Brand / Logo Top */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
              SG
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 leading-tight">
                Sri Gajender
              </div>
              <div className="text-xs font-semibold text-red-600">
                Admin Console
              </div>
            </div>
          </div>

          <span className="md:hidden text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
            Online
          </span>
        </div>

        {/* Vertical Navigation Menu */}
        <div className="p-3 flex-1 overflow-y-auto space-y-1">
          <div className="px-3 pt-2 pb-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Navigation
          </div>

          {[
            { id: 'dashboard', label: 'Dashboard', icon: TrendingUp, count: null },
            { id: 'products', label: 'Products', icon: Package, count: products.length },
            { id: 'categories', label: 'Categories', icon: Layers, count: categories.length },
            { id: 'brands', label: 'Brands', icon: Award, count: brands.length },
            {
              id: 'inquiries',
              label: 'Customer Inquiries',
              icon: Inbox,
              count: newInquiriesCount,
              alert: newInquiriesCount > 0,
            },
            { id: 'settings', label: 'Store Settings', icon: Settings, count: null },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabKey)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-red-600 text-white font-semibold shadow-md shadow-red-600/20'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </div>
                {tab.count !== null && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : tab.alert
                        ? 'bg-red-600 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Sidebar Footer Controls */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/60 space-y-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate({ page: 'home' })}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 transition shadow-2xs"
              title="Open public website in client view"
            >
              <Eye className="w-3.5 h-3.5 text-slate-500" />
              <span>View Site</span>
            </button>

            <button
              onClick={handleExportJSON}
              className="inline-flex items-center justify-center p-2 rounded-lg text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 transition shadow-2xs"
              title="Download backup file"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
            </button>

            <label
              className="inline-flex items-center justify-center p-2 rounded-lg text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 transition shadow-2xs cursor-pointer"
              title="Restore from backup file"
            >
              <Upload className="w-3.5 h-3.5 text-slate-500" />
              <input
                type="file"
                accept=".json"
                onChange={handleImportJSON}
                className="hidden"
              />
            </label>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Out Admin</span>
          </button>
        </div>
      </aside>

      {/* ========================================================= */}
      {/* RIGHT SIDE MAIN WORKSPACE: INDEPENDENT SCROLL             */}
      {/* ========================================================= */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Header Strip in Content Area: Fixed */}
        <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shrink-0 z-30 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Section
            </span>
            <span className="text-slate-300">/</span>
            <span className="text-sm font-bold text-slate-900 capitalize">
              {activeTab === 'inquiries' ? 'Customer Inquiries' : activeTab}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Nehru Nagar Showroom Active</span>
            </div>

            <button
              onClick={openNewProductModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Product</span>
            </button>
          </div>
        </div>

        {/* MAIN CONTENT AREA: ONLY THIS SCROLLS */}
        <main className="p-6 sm:p-8 flex-1 overflow-y-auto">
        {/* ========================================================= */}
        {/* TAB 1: DASHBOARD OVERVIEW                                  */}
        {/* ========================================================= */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Metric Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div
                onClick={() => setActiveTab('products')}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-red-300 hover:shadow-md transition cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Total Products
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Package className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-4 text-3xl font-extrabold text-slate-900">
                  {products.length}
                </div>
                <div className="mt-2 text-xs text-slate-500 flex items-center gap-1 group-hover:text-red-600 font-medium">
                  <span>Manage catalogue models</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>

              <div
                onClick={() => setActiveTab('inquiries')}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-red-300 hover:shadow-md transition cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    New Inquiries
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                    <Inbox className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-4 text-3xl font-extrabold text-red-600">
                  {newInquiriesCount}
                </div>
                <div className="mt-2 text-xs text-slate-500 flex items-center gap-1 group-hover:text-red-600 font-medium">
                  <span>Pending customer quotes</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>

              <div
                onClick={() => setActiveTab('brands')}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-red-300 hover:shadow-md transition cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Partner Brands
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                    <Award className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-4 text-3xl font-extrabold text-slate-900">
                  {brands.length}
                </div>
                <div className="mt-2 text-xs text-slate-500 flex items-center gap-1 group-hover:text-red-600 font-medium">
                  <span>boAt, Portronics, Hikvision...</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>

              <div
                onClick={() => setActiveTab('settings')}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-red-300 hover:shadow-md transition cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    WhatsApp Routing
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Phone className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-4 text-base font-bold text-slate-900 truncate">
                  {settings.customWhatsAppNumber || '+91 8179106524'}
                </div>
                <div className="mt-2 text-xs text-slate-500 flex items-center gap-1 group-hover:text-red-600 font-medium">
                  <span>Showroom address & contact</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Quick Action Banner */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-lg shadow-red-600/20">
              <div className="space-y-1">
                <div className="text-xs uppercase tracking-wider text-red-200 font-bold">
                  Quick Management
                </div>
                <h2 className="text-xl sm:text-2xl font-bold">
                  Need to add a new product or update prices?
                </h2>
                <p className="text-sm text-red-100 max-w-xl">
                  Add products with 1 click. They immediately show up on your website's catalogue and search modal.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={openNewProductModal}
                  className="px-5 py-3 rounded-xl bg-white text-red-600 text-sm font-bold shadow-md hover:bg-red-50 transition flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Product</span>
                </button>
                <button
                  onClick={() => setActiveTab('inquiries')}
                  className="px-5 py-3 rounded-xl bg-red-800 text-white text-sm font-semibold hover:bg-red-900 transition flex items-center gap-2"
                >
                  <Inbox className="w-4 h-4" />
                  <span>Check Customer Leads</span>
                </button>
              </div>
            </div>

            {/* Recent Leads Preview */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Recent Inbound Inquiries
                  </h3>
                  <p className="text-xs text-slate-500">
                    Direct inquiries from customers visiting your website
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('inquiries')}
                  className="text-xs font-semibold text-red-600 hover:text-red-700 hover:underline flex items-center gap-1"
                >
                  <span>View All Leads ({inquiries.length})</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="text-slate-400 uppercase text-[11px] font-bold border-b border-slate-100">
                      <th className="py-2.5">Date</th>
                      <th className="py-2.5">Customer / Firm</th>
                      <th className="py-2.5">Requirement</th>
                      <th className="py-2.5">Type</th>
                      <th className="py-2.5">Status</th>
                      <th className="py-2.5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {inquiries.slice(0, 5).map((inq) => (
                      <tr key={inq.id} className="hover:bg-slate-50">
                        <td className="py-3 text-slate-500 whitespace-nowrap text-xs">
                          {new Date(inq.timestamp).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </td>
                        <td className="py-3 font-semibold text-slate-800">
                          <div>{inq.customerName}</div>
                          {inq.phone && (
                            <div className="text-xs font-normal text-slate-500">
                              {inq.phone}
                            </div>
                          )}
                        </td>
                        <td className="py-3 text-slate-600 max-w-xs truncate">
                          {inq.productName || inq.quantity || inq.notes || 'General enquiry'}
                        </td>
                        <td className="py-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[11px] font-bold uppercase ${
                              inq.type === 'wholesale'
                                ? 'bg-blue-100 text-blue-800'
                                : inq.type === 'warranty'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {inq.type}
                          </span>
                        </td>
                        <td className="py-3">
                          <span
                            className={`px-2 py-0.5 rounded-md text-[11px] font-semibold capitalize ${
                              inq.status === 'new'
                                ? 'bg-red-100 text-red-700'
                                : inq.status === 'contacted'
                                ? 'bg-amber-100 text-amber-700'
                                : 'bg-emerald-100 text-emerald-700'
                            }`}
                          >
                            {inq.status}
                          </span>
                        </td>
                        <td className="py-3 text-right">
                          <button
                            onClick={() => setActiveTab('inquiries')}
                            className="text-xs font-semibold text-slate-700 hover:text-red-600"
                          >
                            Manage →
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: PRODUCTS MANAGEMENT                                 */}
        {/* ========================================================= */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            {/* Header + Add Product Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Products & Catalogue
                </h2>
                <p className="text-sm text-slate-500">
                  Add, edit, delete, or feature products across your website
                </p>
              </div>

              <button
                onClick={openNewProductModal}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm shadow-md shadow-red-600/20 transition"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Product</span>
              </button>
            </div>

            {/* Filter and Search Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3 flex-1">
                <div className="relative min-w-[260px] flex-1 sm:flex-none">
                  <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type="text"
                    value={prodSearch}
                    onChange={(e) => setProdSearch(e.target.value)}
                    placeholder="Search by product name, model..."
                    className="w-full pl-10 pr-4 py-2 text-sm rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <select
                  value={prodCategoryFilter}
                  onChange={(e) => setProdCategoryFilter(e.target.value)}
                  className="px-3.5 py-2 text-sm rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none"
                >
                  <option value="all">All Categories</option>
                  {categories.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>

                <select
                  value={prodBrandFilter}
                  onChange={(e) => setProdBrandFilter(e.target.value)}
                  className="px-3.5 py-2 text-sm rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none"
                >
                  <option value="all">All Brands</option>
                  {brands.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>

                {(prodSearch || prodCategoryFilter !== 'all' || prodBrandFilter !== 'all') && (
                  <button
                    onClick={() => {
                      setProdSearch('');
                      setProdCategoryFilter('all');
                      setProdBrandFilter('all');
                    }}
                    className="text-xs font-semibold text-red-600 hover:underline"
                  >
                    Reset filters
                  </button>
                )}
              </div>

              <div className="text-xs text-slate-500 font-medium">
                Showing {filteredProducts.length} of {products.length} products
              </div>
            </div>

            {/* Clean Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    {/* Image Header with Featured Badge */}
                    <div className="relative h-48 bg-slate-100 overflow-hidden">
                      <img
                        src={prod.primaryImage}
                        alt={prod.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=400&q=80';
                        }}
                      />
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-xs font-bold text-slate-800 shadow-xs">
                        {prod.brandName}
                      </div>

                      <button
                        onClick={() => handleToggleFeatured(prod.id)}
                        className={`absolute top-3 right-3 px-2.5 py-1 rounded-md text-xs font-bold transition shadow-xs ${
                          prod.featured
                            ? 'bg-amber-400 text-slate-900'
                            : 'bg-white/80 text-slate-600 hover:bg-white'
                        }`}
                        title="Click to toggle featured on homepage"
                      >
                        {prod.featured ? '★ Featured' : '☆ Not Featured'}
                      </button>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 space-y-2">
                      <div className="text-xs font-mono font-medium text-slate-400">
                        {prod.model} · {prod.categoryLabel}
                      </div>
                      <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-1">
                        {prod.name}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {prod.tagline || prod.editorialSummary}
                      </p>

                      <div className="pt-2 flex flex-wrap gap-1">
                        {prod.keyHighlights.slice(0, 3).map((hl, hIdx) => (
                          <span
                            key={hIdx}
                            className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded"
                          >
                            {hl}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => {
                        setEditingProduct(JSON.parse(JSON.stringify(prod)));
                        setIsProductModalOpen(true);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-800 bg-white border border-slate-200 hover:bg-slate-100 transition shadow-2xs"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-slate-500" />
                      <span>Edit Details</span>
                    </button>

                    <button
                      onClick={() => handleDeleteProduct(prod.id, prod.name)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 transition"
                      title="Delete this product"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
                <Package className="w-10 h-10 mx-auto text-slate-300 mb-3" />
                <div className="font-bold text-slate-800">No products match your search</div>
                <div className="text-xs text-slate-400 mt-1">Try resetting your filters or search keywords</div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: CATEGORIES                                          */}
        {/* ========================================================= */}
        {activeTab === 'categories' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Categories & Collections
              </h2>
              <p className="text-sm text-slate-500">
                Manage product collections displayed on your website
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {categories.map((cat) => (
                <div
                  key={cat.slug}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between"
                >
                  <div className="h-40 bg-slate-100 overflow-hidden">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-mono text-red-600 font-bold mb-1">
                        INDEX // {cat.index}
                      </div>
                      <h3 className="text-base font-bold text-slate-900 mb-1">
                        {cat.name}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 mb-3">
                        {cat.subtitle}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-mono text-slate-400">/{cat.slug}</span>
                      <button
                        onClick={() => {
                          setEditingCategory(JSON.parse(JSON.stringify(cat)));
                          setIsCategoryModalOpen(true);
                        }}
                        className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit Category</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: BRANDS                                              */}
        {/* ========================================================= */}
        {activeTab === 'brands' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Authorized Brand Profiles
              </h2>
              <p className="text-sm text-slate-500">
                Edit brand partner headlines and capability highlights
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {brands.map((b) => (
                <div
                  key={b.id}
                  className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-base text-white shadow-sm"
                        style={{ backgroundColor: b.accentTone || '#B8202A' }}
                      >
                        {b.monogram}
                      </div>
                      <div>
                        <div className="text-xs font-mono text-slate-400">
                          {b.index}
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">
                          {b.name}
                        </h3>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setEditingBrand(JSON.parse(JSON.stringify(b)));
                        setIsBrandModalOpen(true);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 flex items-center gap-1.5 transition"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                  </div>

                  <div>
                    <div className="text-xs font-semibold text-red-600 mb-1">
                      {b.editorialHeadline}
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {b.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 space-y-1">
                    <div className="text-[11px] font-bold uppercase text-slate-400">
                      Product Lineups Carried
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {b.signatureCapabilities.map((sig, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-xs bg-slate-50 border border-slate-200 px-2.5 py-0.5 rounded text-slate-700"
                        >
                          {sig}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: INBOUND INQUIRIES                                   */}
        {/* ========================================================= */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Customer & Dealer Inquiries
                </h2>
                <p className="text-sm text-slate-500">
                  Track quote requests, wholesale dealer leads, and warranty support queries
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold bg-slate-200 px-3 py-1 rounded-full text-slate-700">
                  Total: {inquiries.length} leads
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {inquiries.map((inq) => (
                <div
                  key={inq.id}
                  className={`bg-white p-5 rounded-2xl border shadow-xs transition ${
                    inq.status === 'new'
                      ? 'border-red-400 ring-2 ring-red-100'
                      : inq.status === 'contacted'
                      ? 'border-amber-300'
                      : 'border-slate-200 opacity-80'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase ${
                            inq.type === 'wholesale'
                              ? 'bg-blue-100 text-blue-800'
                              : inq.type === 'warranty'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {inq.type}
                        </span>

                        <span className="text-xs text-slate-400 font-mono">
                          {new Date(inq.timestamp).toLocaleString('en-IN')}
                        </span>

                        <span
                          className={`px-2 py-0.5 rounded-md text-xs font-bold capitalize ${
                            inq.status === 'new'
                              ? 'bg-red-600 text-white'
                              : inq.status === 'contacted'
                              ? 'bg-amber-500 text-white'
                              : 'bg-emerald-600 text-white'
                          }`}
                        >
                          {inq.status}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900">
                        {inq.customerName}{' '}
                        {inq.phone && (
                          <span className="font-normal text-xs text-slate-500">
                            · {inq.phone}
                          </span>
                        )}
                      </h3>

                      {inq.productName && (
                        <div className="text-xs font-bold text-red-600">
                          Product: {inq.productName}
                        </div>
                      )}

                      {inq.quantity && (
                        <div className="text-xs text-slate-700">
                          <span className="font-bold">Quantity / Volume:</span> {inq.quantity}
                        </div>
                      )}

                      {inq.notes && (
                        <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                          "{inq.notes}"
                        </p>
                      )}
                    </div>

                    {/* Action Controls */}
                    <div className="flex md:flex-col items-center md:items-end gap-2 shrink-0">
                      <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                        <button
                          onClick={() => handleUpdateInquiryStatus(inq.id, 'new')}
                          className={`px-2.5 py-1 text-xs rounded-lg font-bold transition ${
                            inq.status === 'new'
                              ? 'bg-white text-red-600 shadow-xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          New
                        </button>
                        <button
                          onClick={() => handleUpdateInquiryStatus(inq.id, 'contacted')}
                          className={`px-2.5 py-1 text-xs rounded-lg font-bold transition ${
                            inq.status === 'contacted'
                              ? 'bg-white text-amber-600 shadow-xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          Contacted
                        </button>
                        <button
                          onClick={() => handleUpdateInquiryStatus(inq.id, 'resolved')}
                          className={`px-2.5 py-1 text-xs rounded-lg font-bold transition ${
                            inq.status === 'resolved'
                              ? 'bg-white text-emerald-600 shadow-xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          Resolved
                        </button>
                      </div>

                      {inq.phone && (
                        <a
                          href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition shadow-xs"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>Chat on WhatsApp</span>
                        </a>
                      )}

                      <button
                        onClick={() => handleDeleteInquiry(inq.id)}
                        className="text-xs text-red-600 hover:underline pt-1"
                      >
                        Remove record
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {inquiries.length === 0 && (
                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
                  <Inbox className="w-10 h-10 mx-auto text-slate-300 mb-3" />
                  <div className="font-bold text-slate-800">No inquiries yet</div>
                  <div className="text-xs text-slate-400 mt-1">
                    When visitors submit the WhatsApp Concierge modal, they will show up here.
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 6: SETTINGS                                            */}
        {/* ========================================================= */}
        {activeTab === 'settings' && (
          <div className="space-y-6 max-w-3xl">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Store Settings & Info
              </h2>
              <p className="text-sm text-slate-500">
                Configure your WhatsApp phone number, store address, and global banner
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Store Display Name
                </label>
                <input
                  type="text"
                  value={settings.storeInfo.name}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      storeInfo: { ...settings.storeInfo, name: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  WhatsApp Contact Phone Number (with Country Code)
                </label>
                <input
                  type="text"
                  value={settings.customWhatsAppNumber}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      customWhatsAppNumber: e.target.value,
                    })
                  }
                  placeholder="+91 8179106524"
                  className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500 font-mono"
                />
                <p className="text-xs text-slate-500 mt-1">
                  All customer clicks on "Send WhatsApp Enquiry" will route directly to this WhatsApp number.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Physical Store Address (Nehru Nagar, Tirupati)
                </label>
                <textarea
                  rows={2}
                  value={settings.storeInfo.fullAddress}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      storeInfo: {
                        ...settings.storeInfo,
                        fullAddress: e.target.value,
                      },
                    })
                  }
                  className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Announcement Banner */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-sm text-slate-900">
                      Website Announcement Ribbon
                    </div>
                    <div className="text-xs text-slate-500">
                      Show an announcement at the top of the storefront
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.enableAnnouncement}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        enableAnnouncement: e.target.checked,
                      })
                    }
                    className="w-5 h-5 accent-red-600 cursor-pointer"
                  />
                </div>

                {settings.enableAnnouncement && (
                  <input
                    type="text"
                    value={settings.announcementText}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        announcementText: e.target.value,
                      })
                    }
                    placeholder="e.g. Special festive discounts across boAt & Portronics this week!"
                    className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                )}
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  onClick={() => {
                    saveStoredSettings(settings);
                    showToast('Settings saved successfully');
                  }}
                  className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md shadow-red-600/20 transition"
                >
                  Save Changes
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Reset all demo data back to initial factory setup?')) {
                      resetToFactoryDefaults();
                      reloadAll();
                      showToast('Store reset to factory presets');
                    }
                  }}
                  className="text-xs font-semibold text-slate-400 hover:text-red-600 transition"
                >
                  Restore Factory Defaults
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      </div>

      {/* ========================================================= */}
      {/* PRODUCT EDIT / ADD MODAL                                  */}
      {/* ========================================================= */}
      <AnimatePresence>
        {isProductModalOpen && editingProduct && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {products.some((p) => p.id === editingProduct.id)
                      ? `Edit Product: ${editingProduct.name}`
                      : 'Add New Hardware Model'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Fill in product details to show in your store catalogue
                  </p>
                </div>
                <button
                  onClick={() => setIsProductModalOpen(false)}
                  className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingProduct.name}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, name: e.target.value })
                      }
                      placeholder="e.g. boAt Nirvana Ion ANC"
                      className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                      Model Number *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingProduct.model}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, model: e.target.value })
                      }
                      placeholder="e.g. Nirvana Ion ANC"
                      className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                      Brand
                    </label>
                    <select
                      value={editingProduct.brandId}
                      onChange={(e) => {
                        const bId = e.target.value as BrandId;
                        const bObj = brands.find((b) => b.id === bId);
                        setEditingProduct({
                          ...editingProduct,
                          brandId: bId,
                          brandName: bObj ? bObj.name : bId,
                        });
                      }}
                      className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none"
                    >
                      {brands.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.name}
                        </option>
                      ))}
                      <option value="commercial-hardware">Commercial Hardware</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                      Category
                    </label>
                    <select
                      value={editingProduct.category}
                      onChange={(e) => {
                        const catSlug = e.target.value as CategorySlug;
                        const cObj = categories.find((c) => c.slug === catSlug);
                        setEditingProduct({
                          ...editingProduct,
                          category: catSlug,
                          categoryLabel: cObj ? cObj.name : catSlug,
                        });
                      }}
                      className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none"
                    >
                      {categories.map((c) => (
                        <option key={c.slug} value={c.slug}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                    Tagline (Short Summary)
                  </label>
                  <input
                    type="text"
                    value={editingProduct.tagline}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, tagline: e.target.value })
                    }
                    placeholder="e.g. 120-hour playback with up to 32dB active noise cancellation."
                    className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                    Full Description
                  </label>
                  <textarea
                    rows={3}
                    value={editingProduct.editorialSummary}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        editorialSummary: e.target.value,
                      })
                    }
                    placeholder="Describe build quality, audio drivers, battery, warranty..."
                    className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                      Image URL
                    </label>
                    <input
                      type="text"
                      value={editingProduct.primaryImage}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          primaryImage: e.target.value,
                        })
                      }
                      placeholder="https://..."
                      className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                      Key Highlights (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={editingProduct.keyHighlights.join(', ')}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          keyHighlights: e.target.value
                            .split(',')
                            .map((s) => s.trim())
                            .filter(Boolean),
                        })
                      }
                      placeholder="e.g. 120H Battery, Quad Mic ENC, 45ms Latency"
                      className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="featuredModalCheckbox"
                    checked={!!editingProduct.featured}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        featured: e.target.checked,
                      })
                    }
                    className="w-5 h-5 accent-red-600 cursor-pointer"
                  />
                  <label
                    htmlFor="featuredModalCheckbox"
                    className="text-sm font-semibold text-slate-700 cursor-pointer"
                  >
                    Feature on Homepage Showcase (Section 03)
                  </label>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsProductModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-bold shadow-md shadow-red-600/20"
                  >
                    Save Product
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* CATEGORY EDIT MODAL                                       */}
      {/* ========================================================= */}
      <AnimatePresence>
        {isCategoryModalOpen && editingCategory && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 sm:p-8"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <h3 className="text-lg font-bold text-slate-900">
                  Edit Category: {editingCategory.name}
                </h3>
                <button
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                    Category Name
                  </label>
                  <input
                    type="text"
                    value={editingCategory.name}
                    onChange={(e) =>
                      setEditingCategory({ ...editingCategory, name: e.target.value })
                    }
                    className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                    Subtitle / Summary
                  </label>
                  <textarea
                    rows={3}
                    value={editingCategory.subtitle}
                    onChange={(e) =>
                      setEditingCategory({
                        ...editingCategory,
                        subtitle: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 border border-slate-200"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => setIsCategoryModalOpen(false)}
                    className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      const updated = categories.map((c) =>
                        c.slug === editingCategory.slug ? editingCategory : c
                      );
                      setCategories(updated);
                      saveStoredCategories(updated);
                      setIsCategoryModalOpen(false);
                      showToast('Category updated');
                    }}
                    className="px-5 py-2 rounded-xl bg-red-600 text-white text-sm font-bold"
                  >
                    Save Category
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* BRAND EDIT MODAL                                          */}
      {/* ========================================================= */}
      <AnimatePresence>
        {isBrandModalOpen && editingBrand && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 sm:p-8"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <h3 className="text-lg font-bold text-slate-900">
                  Edit Brand: {editingBrand.name}
                </h3>
                <button
                  onClick={() => setIsBrandModalOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                    Headline
                  </label>
                  <input
                    type="text"
                    value={editingBrand.editorialHeadline}
                    onChange={(e) =>
                      setEditingBrand({
                        ...editingBrand,
                        editorialHeadline: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                    Brand Description
                  </label>
                  <textarea
                    rows={4}
                    value={editingBrand.description}
                    onChange={(e) =>
                      setEditingBrand({
                        ...editingBrand,
                        description: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                    Signature Lineups (comma separated)
                  </label>
                  <input
                    type="text"
                    value={editingBrand.signatureCapabilities.join(', ')}
                    onChange={(e) =>
                      setEditingBrand({
                        ...editingBrand,
                        signatureCapabilities: e.target.value
                          .split(',')
                          .map((s) => s.trim())
                          .filter(Boolean),
                      })
                    }
                    className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 border border-slate-200"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => setIsBrandModalOpen(false)}
                    className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      const updated = brands.map((b) =>
                        b.id === editingBrand.id ? editingBrand : b
                      );
                      setBrands(updated);
                      saveStoredBrands(updated);
                      setIsBrandModalOpen(false);
                      showToast('Brand profile updated');
                    }}
                    className="px-5 py-2 rounded-xl bg-red-600 text-white text-sm font-bold"
                  >
                    Save Brand
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
