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
  SlidersHorizontal,
  Eye,
  Store,
  Phone,
  Clock,
  Sparkles,
  Download,
  Upload,
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

type TabKey = 'overview' | 'products' | 'categories' | 'brands' | 'inquiries' | 'settings';

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(isAdminAuthenticated());
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState<TabKey>('overview');

  // State caches
  const [products, setProducts] = useState<ProductItem[]>(getStoredProducts());
  const [categories, setCategories] = useState<CategoryInfo[]>(getStoredCategories());
  const [brands, setBrands] = useState<BrandProfile[]>(getStoredBrands());
  const [settings, setSettings] = useState<AdminSettings>(getStoredSettings());
  const [inquiries, setInquiries] = useState<InboundInquiry[]>(getStoredInquiries());

  // Search & Filters in Products
  const [prodSearch, setProdSearch] = useState('');
  const [prodCategoryFilter, setProdCategoryFilter] = useState<string>('all');
  const [prodBrandFilter, setProdBrandFilter] = useState<string>('all');

  // Modal / Editing State for Product
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  // Category Edit State
  const [editingCategory, setEditingCategory] = useState<CategoryInfo | null>(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  // Brand Edit State
  const [editingBrand, setEditingBrand] = useState<BrandProfile | null>(null);
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);

  // Notification Toast
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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default master passcodes: 'admin123', 'gajender2026', or 'tirupati'
    const allowed = ['admin', 'admin123', 'gajender', 'gajender2026', 'tirupati'];
    if (allowed.includes(passcode.trim().toLowerCase())) {
      setAdminAuthenticated(true);
      setIsAuthenticated(true);
      setAuthError('');
      showToast('Admin authorized successfully');
    } else {
      setAuthError('Invalid passcode. Use "admin123" or "gajender2026"');
    }
  };

  const handleLogout = () => {
    setAdminAuthenticated(false);
    setIsAuthenticated(false);
    showToast('Signed out of admin console');
  };

  // Product Actions
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    if (!editingProduct.name.trim() || !editingProduct.model.trim()) {
      alert('Product name and model are required');
      return;
    }

    const exists = products.some((p) => p.id === editingProduct.id);
    let updated: ProductItem[];

    if (exists) {
      updated = products.map((p) => (p.id === editingProduct.id ? editingProduct : p));
      showToast(`Updated "${editingProduct.name}"`);
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
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      const updated = products.filter((p) => p.id !== id);
      setProducts(updated);
      saveStoredProducts(updated);
      showToast(`Deleted "${name}"`);
    }
  };

  const handleToggleFeatured = (id: string) => {
    const updated = products.map((p) =>
      p.id === id ? { ...p, featured: !p.featured } : p
    );
    setProducts(updated);
    saveStoredProducts(updated);
    showToast('Updated featured status');
  };

  // New Blank Product template
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
        { label: 'Warranty', value: '1 Year Manufacturer Official' },
        { label: 'Connectivity', value: 'Bluetooth v5.3' },
      ],
      keyHighlights: ['Brand Genuine', 'High Quality', 'Immediate Dispatch'],
      featured: false,
    };
    setEditingProduct(newProd);
    setIsProductModalOpen(true);
  };

  // Inquiry Status update
  const handleUpdateInquiryStatus = (
    id: string,
    status: 'new' | 'contacted' | 'resolved'
  ) => {
    const updated = inquiries.map((inq) =>
      inq.id === id ? { ...inq, status } : inq
    );
    setInquiries(updated);
    saveStoredInquiries(updated);
    showToast(`Inquiry marked as ${status}`);
  };

  const handleDeleteInquiry = (id: string) => {
    const updated = inquiries.filter((inq) => inq.id !== id);
    setInquiries(updated);
    saveStoredInquiries(updated);
    showToast('Inquiry removed');
  };

  // Export / Import
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
    a.download = `sri-gajender-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    showToast('Database backup downloaded');
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
        showToast('Database imported & restored successfully');
      } catch (err) {
        alert('Invalid JSON backup file');
      }
    };
    reader.readAsText(file);
  };

  // Filtered Products
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

  // If Not Authenticated -> Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-28 pb-20 px-4 flex items-center justify-center bg-[#F5F3F2]">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="w-full max-w-md bg-[#FDFDFD] border border-[#B8202A]/25 rounded-3xl p-8 sm:p-10 studio-shadow-soft"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#B8202A] text-[#FDFDFD] flex items-center justify-center shadow-lg shadow-[#B8202A]/20">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <div className="font-tech text-[10px] tracking-[0.25em] uppercase text-[#B8202A]">
                COMMAND ATELIER
              </div>
              <h1 className="font-editorial text-2xl font-normal text-[#303033]">
                Admin Console
              </h1>
            </div>
          </div>

          <p className="text-xs text-[#777271] mb-6 leading-relaxed">
            Enter the authorized access passcode to manage live catalogue models, brand profiles, showroom timings, WhatsApp routes, and wholesale inquiries.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] font-tech uppercase tracking-wider text-[#777271] mb-2">
                Security Passcode
              </label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode (e.g. admin123)"
                className="w-full px-4 py-3 text-sm rounded-xl bg-[#F5F3F2] border border-[#303033]/15 focus:outline-none focus:border-[#B8202A] transition"
                autoFocus
              />
            </div>

            {authError && (
              <div className="text-xs text-red-600 bg-red-50 p-3 rounded-xl border border-red-200">
                {authError}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-[#B8202A] text-white font-medium text-xs tracking-wider uppercase hover:bg-[#961923] transition shadow-md shadow-[#B8202A]/20"
            >
              Authorize & Enter
            </button>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => onNavigate({ page: 'home' })}
                className="text-xs text-[#777271] hover:text-[#B8202A] transition underline underline-offset-4"
              >
                ← Return to Public Flagship
              </button>
            </div>
          </form>

          <div className="mt-8 pt-4 border-t border-[#303033]/10 text-[11px] text-[#777271] text-center font-tech">
            HINT: Default demo key is <span className="text-[#B8202A] font-semibold">admin123</span>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-24 bg-[#F5F3F2] text-[#303033]">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 right-6 z-[100] bg-[#303033] text-[#FDFDFD] px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-xs"
          >
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-[#303033]/10">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="font-tech text-[10px] tracking-[0.24em] uppercase px-2.5 py-0.5 rounded-full bg-[#B8202A]/10 text-[#B8202A] font-semibold">
                LIVE PRODUCTION CONSOLE
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs text-emerald-700 font-tech">Connected</span>
            </div>
            <h1 className="font-editorial text-3xl sm:text-4xl text-[#303033] font-normal mt-1">
              Store Operations & Content Manager
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => onNavigate({ page: 'home' })}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs rounded-xl bg-[#FDFDFD] border border-[#303033]/15 hover:border-[#B8202A] hover:text-[#B8202A] transition"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>View Live Website</span>
            </button>

            <button
              onClick={handleExportJSON}
              title="Download full database snapshot"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs rounded-xl bg-[#FDFDFD] border border-[#303033]/15 hover:bg-[#F5F3F2] transition"
            >
              <Download className="w-3.5 h-3.5 text-[#777271]" />
              <span>Backup</span>
            </button>

            <label
              title="Restore from JSON backup file"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs rounded-xl bg-[#FDFDFD] border border-[#303033]/15 hover:bg-[#F5F3F2] transition cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5 text-[#777271]" />
              <span>Restore</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImportJSON}
                className="hidden"
              />
            </label>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs rounded-xl bg-red-100 text-red-700 hover:bg-red-200 transition font-medium"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Lock Console</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Ribbon */}
        <div className="flex items-center gap-2 overflow-x-auto py-5 border-b border-[#303033]/10 no-scrollbar">
          {[
            { id: 'overview', label: 'Dashboard Overview', icon: TrendingUp, count: null },
            { id: 'products', label: 'Products & Catalogue', icon: Package, count: products.length },
            { id: 'categories', label: 'Categories', icon: Layers, count: categories.length },
            { id: 'brands', label: 'Brand Profiles', icon: Award, count: brands.length },
            {
              id: 'inquiries',
              label: 'Customer Inquiries',
              icon: Inbox,
              count: inquiries.filter((i) => i.status === 'new').length,
              badgeHighlight: true,
            },
            { id: 'settings', label: 'Store & Timings', icon: Settings, count: null },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabKey)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#B8202A] text-white shadow-md shadow-[#B8202A]/20'
                    : 'bg-[#FDFDFD] text-[#303033] hover:bg-[#FDFDFD]/80 border border-[#303033]/10'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#777271]'}`} />
                <span>{tab.label}</span>
                {tab.count !== null && (
                  <span
                    className={`ml-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : tab.badgeHighlight && tab.count > 0
                        ? 'bg-[#B8202A] text-white'
                        : 'bg-[#F5F3F2] text-[#777271]'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="py-8 space-y-8">
            {/* Top Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#FDFDFD] p-5 rounded-2xl border border-[#303033]/10">
                <div className="flex items-center justify-between text-[#777271] text-xs font-tech">
                  <span>TOTAL CATALOGUE MODELS</span>
                  <Package className="w-4 h-4 text-[#B8202A]" />
                </div>
                <div className="mt-3 font-editorial text-3xl text-[#303033]">
                  {products.length}
                </div>
                <div className="mt-1 text-[11px] text-[#777271]">
                  {products.filter((p) => p.featured).length} featured on homepage showcase
                </div>
              </div>

              <div className="bg-[#FDFDFD] p-5 rounded-2xl border border-[#303033]/10">
                <div className="flex items-center justify-between text-[#777271] text-xs font-tech">
                  <span>PARTNER BRANDS</span>
                  <Award className="w-4 h-4 text-[#B8202A]" />
                </div>
                <div className="mt-3 font-editorial text-3xl text-[#303033]">
                  {brands.length}
                </div>
                <div className="mt-1 text-[11px] text-[#777271]">
                  boAt, Portronics, Zebronics, Boult, Hikvision
                </div>
              </div>

              <div className="bg-[#FDFDFD] p-5 rounded-2xl border border-[#303033]/10">
                <div className="flex items-center justify-between text-[#777271] text-xs font-tech">
                  <span>NEW INQUIRIES</span>
                  <Inbox className="w-4 h-4 text-[#B8202A]" />
                </div>
                <div className="mt-3 font-editorial text-3xl text-[#B8202A]">
                  {inquiries.filter((i) => i.status === 'new').length}
                </div>
                <div className="mt-1 text-[11px] text-[#777271]">
                  Awaiting WhatsApp / phone follow-up
                </div>
              </div>

              <div className="bg-[#FDFDFD] p-5 rounded-2xl border border-[#303033]/10">
                <div className="flex items-center justify-between text-[#777271] text-xs font-tech">
                  <span>SHOWROOM OPERATING STATUS</span>
                  <Store className="w-4 h-4 text-[#B8202A]" />
                </div>
                <div className="mt-3 font-editorial text-xl text-emerald-600 font-medium">
                  Nehru Nagar Flagship
                </div>
                <div className="mt-1 text-[11px] text-[#777271]">
                  Tuesday 24H · Mon/Wed-Sat 9:30AM–9:30PM
                </div>
              </div>
            </div>

            {/* Quick Actions & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Quick Actions */}
              <div className="lg:col-span-4 space-y-4">
                <div className="bg-[#FDFDFD] p-6 rounded-2xl border border-[#303033]/10">
                  <h3 className="font-editorial text-lg text-[#303033] mb-4">
                    Quick Operational Actions
                  </h3>
                  <div className="space-y-2.5">
                    <button
                      onClick={openNewProductModal}
                      className="w-full flex items-center justify-between p-3 rounded-xl bg-[#F5F3F2] hover:bg-[#B8202A] hover:text-white transition group text-xs font-medium"
                    >
                      <span className="flex items-center gap-2">
                        <Plus className="w-4 h-4 text-[#B8202A] group-hover:text-white" />
                        Add New Hardware Model
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                    </button>

                    <button
                      onClick={() => setActiveTab('inquiries')}
                      className="w-full flex items-center justify-between p-3 rounded-xl bg-[#F5F3F2] hover:bg-[#303033] hover:text-white transition group text-xs font-medium"
                    >
                      <span className="flex items-center gap-2">
                        <Inbox className="w-4 h-4 text-[#B8202A] group-hover:text-white" />
                        Review Inbound Quotes ({inquiries.length})
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                    </button>

                    <button
                      onClick={() => setActiveTab('settings')}
                      className="w-full flex items-center justify-between p-3 rounded-xl bg-[#F5F3F2] hover:bg-[#303033] hover:text-white transition group text-xs font-medium"
                    >
                      <span className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-[#B8202A] group-hover:text-white" />
                        Configure WhatsApp Routing Number
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                    </button>

                    <button
                      onClick={() => {
                        if (
                          window.confirm(
                            'Reset all products, brands, and categories to factory default data? Any custom products will be replaced.'
                          )
                        ) {
                          resetToFactoryDefaults();
                          reloadAll();
                          showToast('Factory initial catalogue restored');
                        }
                      }}
                      className="w-full flex items-center justify-between p-3 rounded-xl bg-amber-50 text-amber-800 hover:bg-amber-100 transition group text-xs font-medium border border-amber-200"
                    >
                      <span className="flex items-center gap-2">
                        <RefreshCw className="w-4 h-4" />
                        Restore Original Factory Sample Data
                      </span>
                    </button>
                  </div>
                </div>

                {/* Store Metadata Card */}
                <div className="bg-[#FDFDFD] p-6 rounded-2xl border border-[#303033]/10 text-xs space-y-3">
                  <div className="font-tech text-[10px] tracking-wider uppercase text-[#B8202A]">
                    TIRUPATI SHOWROOM COORDINATES
                  </div>
                  <div className="font-medium text-[#303033]">
                    {settings.storeInfo.name}
                  </div>
                  <p className="text-[#777271] leading-relaxed">
                    {settings.storeInfo.fullAddress}
                  </p>
                  <div className="pt-2 border-t border-[#303033]/10 flex items-center justify-between">
                    <span className="text-[#777271]">Live WhatsApp Route:</span>
                    <span className="font-tech font-semibold text-[#B8202A]">
                      {settings.customWhatsAppNumber}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Recent Inbound Inquiries Table */}
              <div className="lg:col-span-8 bg-[#FDFDFD] p-6 rounded-2xl border border-[#303033]/10">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-editorial text-lg text-[#303033]">
                      Recent Customer & Dealer Inquiries
                    </h3>
                    <p className="text-xs text-[#777271]">
                      Real-time inquiries received via website forms and WhatsApp concierge
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('inquiries')}
                    className="text-xs text-[#B8202A] font-semibold hover:underline"
                  >
                    View All ({inquiries.length}) →
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#303033]/10 text-[#777271] font-tech uppercase text-[10px]">
                        <th className="py-2.5">Date</th>
                        <th className="py-2.5">Customer / Firm</th>
                        <th className="py-2.5">Intent</th>
                        <th className="py-2.5">Product / Requirement</th>
                        <th className="py-2.5">Status</th>
                        <th className="py-2.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#303033]/5">
                      {inquiries.slice(0, 5).map((inq) => (
                        <tr key={inq.id} className="hover:bg-[#F5F3F2]/50">
                          <td className="py-3 text-[#777271] whitespace-nowrap font-tech text-[11px]">
                            {new Date(inq.timestamp).toLocaleDateString('en-IN', {
                              day: '2-digit',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </td>
                          <td className="py-3 font-medium text-[#303033]">
                            <div>{inq.customerName}</div>
                            {inq.phone && (
                              <div className="text-[11px] text-[#777271] font-tech">
                                {inq.phone}
                              </div>
                            )}
                          </td>
                          <td className="py-3">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
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
                          <td className="py-3 text-[#777271] max-w-[200px] truncate">
                            {inq.productName || inq.quantity || inq.notes || 'General enquiry'}
                          </td>
                          <td className="py-3">
                            <span
                              className={`px-2 py-0.5 rounded-md text-[10px] font-medium capitalize ${
                                inq.status === 'new'
                                  ? 'bg-red-100 text-red-700 font-semibold'
                                  : inq.status === 'contacted'
                                  ? 'bg-amber-100 text-amber-700'
                                  : 'bg-emerald-100 text-emerald-700'
                              }`}
                            >
                              {inq.status}
                            </span>
                          </td>
                          <td className="py-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {inq.status !== 'resolved' && (
                                <button
                                  onClick={() =>
                                    handleUpdateInquiryStatus(inq.id, 'resolved')
                                  }
                                  title="Mark as Resolved"
                                  className="p-1 rounded-md hover:bg-emerald-100 text-emerald-700 transition"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                </button>
                              )}
                              <button
                                onClick={() => handleDeleteInquiry(inq.id)}
                                title="Delete Inquiry"
                                className="p-1 rounded-md hover:bg-red-100 text-red-600 transition"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS */}
        {activeTab === 'products' && (
          <div className="py-8 space-y-6">
            {/* Products Toolbar */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#FDFDFD] p-5 rounded-2xl border border-[#303033]/10">
              <div className="flex flex-wrap items-center gap-3">
                {/* Search */}
                <div className="relative min-w-[240px]">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-[#777271]" />
                  <input
                    type="text"
                    value={prodSearch}
                    onChange={(e) => setProdSearch(e.target.value)}
                    placeholder="Search by name, model..."
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-[#F5F3F2] border border-[#303033]/10 focus:outline-none focus:border-[#B8202A]"
                  />
                </div>

                {/* Category Filter */}
                <select
                  value={prodCategoryFilter}
                  onChange={(e) => setProdCategoryFilter(e.target.value)}
                  className="px-3 py-2 text-xs rounded-xl bg-[#F5F3F2] border border-[#303033]/10 focus:outline-none"
                >
                  <option value="all">All Categories ({categories.length})</option>
                  {categories.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>

                {/* Brand Filter */}
                <select
                  value={prodBrandFilter}
                  onChange={(e) => setProdBrandFilter(e.target.value)}
                  className="px-3 py-2 text-xs rounded-xl bg-[#F5F3F2] border border-[#303033]/10 focus:outline-none"
                >
                  <option value="all">All Brands ({brands.length})</option>
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
                    className="text-xs text-[#B8202A] hover:underline"
                  >
                    Clear filters
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-[#777271] font-tech">
                  Showing {filteredProducts.length} of {products.length} models
                </span>
                <button
                  onClick={openNewProductModal}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#B8202A] text-white text-xs font-semibold hover:bg-[#961923] transition shadow-md shadow-[#B8202A]/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Product</span>
                </button>
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-[#FDFDFD] rounded-2xl border border-[#303033]/10 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F5F3F2]/60 border-b border-[#303033]/10">
                    <tr className="text-[#777271] font-tech uppercase text-[10px]">
                      <th className="py-3 px-4">Item</th>
                      <th className="py-3 px-4">Model & Index</th>
                      <th className="py-3 px-4">Brand</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4 text-center">Featured Showcase</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#303033]/5">
                    {filteredProducts.map((prod) => (
                      <tr key={prod.id} className="hover:bg-[#F5F3F2]/50 transition">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={prod.primaryImage}
                              alt={prod.name}
                              className="w-11 h-11 rounded-lg object-cover bg-neutral-100 border border-[#303033]/10"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=300&q=80';
                              }}
                            />
                            <div>
                              <div className="font-semibold text-[#303033] line-clamp-1">
                                {prod.name}
                              </div>
                              <div className="text-[11px] text-[#777271] line-clamp-1 max-w-[280px]">
                                {prod.tagline}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-tech text-xs text-[#303033]">
                            {prod.model}
                          </div>
                          <div className="text-[10px] text-[#777271] font-tech">
                            {prod.indexCode}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-medium text-[#303033]">
                            {prod.brandName}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-tech bg-[#F5F3F2] text-[#303033]">
                            {prod.categoryLabel}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => handleToggleFeatured(prod.id)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-semibold transition ${
                              prod.featured
                                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                : 'bg-neutral-100 text-[#777271] hover:bg-neutral-200'
                            }`}
                          >
                            {prod.featured ? '★ Featured (Home)' : 'Standard'}
                          </button>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => {
                                setEditingProduct(JSON.parse(JSON.stringify(prod)));
                                setIsProductModalOpen(true);
                              }}
                              className="p-1.5 rounded-lg hover:bg-neutral-200 text-[#303033] transition"
                              title="Edit Product"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(prod.id, prod.name)}
                              className="p-1.5 rounded-lg hover:bg-red-100 text-red-600 transition"
                              title="Delete Product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredProducts.length === 0 && (
                <div className="py-12 text-center text-xs text-[#777271]">
                  No products found matching the criteria.
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: CATEGORIES */}
        {activeTab === 'categories' && (
          <div className="py-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-editorial text-2xl text-[#303033]">
                  Hardware Taxonomy & Collections
                </h2>
                <p className="text-xs text-[#777271]">
                  Categories control catalogue navigation filters and homepage editorial spotlights
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat, idx) => (
                <div
                  key={cat.slug}
                  className="bg-[#FDFDFD] rounded-2xl border border-[#303033]/10 overflow-hidden flex flex-col justify-between"
                >
                  <div className="relative h-44 overflow-hidden bg-neutral-100">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-[#303033]/80 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-white font-tech text-[10px]">
                      {cat.index}
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="font-tech text-[10px] uppercase text-[#B8202A] tracking-wider mb-1">
                        {cat.technicalAnnotation}
                      </div>
                      <h3 className="font-editorial text-xl text-[#303033] mb-1">
                        {cat.name}
                      </h3>
                      <p className="text-xs text-[#777271] leading-relaxed line-clamp-3 mb-3">
                        {cat.subtitle}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {cat.brandsIncluded.map((b) => (
                          <span
                            key={b}
                            className="text-[10px] bg-[#F5F3F2] px-2 py-0.5 rounded-md text-[#303033]"
                          >
                            {b}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#303033]/10 flex items-center justify-between">
                      <span className="text-[11px] font-tech text-[#777271]">
                        Slug: /{cat.slug}
                      </span>
                      <button
                        onClick={() => {
                          setEditingCategory(JSON.parse(JSON.stringify(cat)));
                          setIsCategoryModalOpen(true);
                        }}
                        className="inline-flex items-center gap-1 text-xs text-[#B8202A] font-semibold hover:underline"
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

        {/* TAB 4: BRAND PROFILES */}
        {activeTab === 'brands' && (
          <div className="py-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-editorial text-2xl text-[#303033]">
                  Authorized Brand Profiles
                </h2>
                <p className="text-xs text-[#777271]">
                  Official OEM partners represented by Sri Gajender Traders across Tirupati & AP
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {brands.map((b) => (
                <div
                  key={b.id}
                  className="bg-[#FDFDFD] p-6 rounded-2xl border border-[#303033]/10 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center font-editorial text-base font-bold text-white shadow-sm"
                        style={{ backgroundColor: b.accentTone || '#B8202A' }}
                      >
                        {b.monogram}
                      </div>
                      <div>
                        <div className="text-[10px] font-tech text-[#777271]">
                          {b.index}
                        </div>
                        <h3 className="font-editorial text-xl text-[#303033]">
                          {b.name}
                        </h3>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setEditingBrand(JSON.parse(JSON.stringify(b)));
                        setIsBrandModalOpen(true);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F5F3F2] hover:bg-[#303033] hover:text-white transition text-xs"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                  </div>

                  <div>
                    <div className="text-[11px] font-semibold text-[#B8202A] mb-1">
                      {b.editorialHeadline}
                    </div>
                    <p className="text-xs text-[#777271] leading-relaxed line-clamp-3">
                      {b.description}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-[#303033]/10">
                    <div className="text-[10px] font-tech uppercase text-[#777271]">
                      Key Lineups Carried
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {b.signatureCapabilities.map((sig, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[11px] bg-[#F5F3F2] px-2.5 py-1 rounded-md text-[#303033]"
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

        {/* TAB 5: INBOUND INQUIRIES */}
        {activeTab === 'inquiries' && (
          <div className="py-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-editorial text-2xl text-[#303033]">
                  Customer & Commercial Enquiries
                </h2>
                <p className="text-xs text-[#777271]">
                  Track quote requests, wholesale dealer leads, and warranty support queries
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-[#777271]">
                  Total: {inquiries.length} leads
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {inquiries.map((inq) => (
                <div
                  key={inq.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    inq.status === 'new'
                      ? 'bg-[#FDFDFD] border-[#B8202A]/40 shadow-sm'
                      : inq.status === 'contacted'
                      ? 'bg-[#FDFDFD] border-amber-300'
                      : 'bg-[#FDFDFD]/70 border-[#303033]/10 opacity-75'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                            inq.type === 'wholesale'
                              ? 'bg-blue-100 text-blue-800'
                              : inq.type === 'warranty'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {inq.type} Request
                        </span>

                        <span className="font-tech text-xs text-[#777271]">
                          {new Date(inq.timestamp).toLocaleString('en-IN')}
                        </span>

                        <span
                          className={`px-2 py-0.5 rounded-md text-[10px] font-tech font-bold uppercase ${
                            inq.status === 'new'
                              ? 'bg-red-600 text-white animate-pulse'
                              : inq.status === 'contacted'
                              ? 'bg-amber-500 text-white'
                              : 'bg-emerald-600 text-white'
                          }`}
                        >
                          Status: {inq.status}
                        </span>
                      </div>

                      <h3 className="font-editorial text-lg text-[#303033]">
                        {inq.customerName}{' '}
                        {inq.phone && (
                          <span className="font-sans font-normal text-xs text-[#777271]">
                            · {inq.phone}
                          </span>
                        )}
                      </h3>

                      {inq.productName && (
                        <div className="text-xs font-medium text-[#B8202A]">
                          Product: {inq.productName}
                        </div>
                      )}

                      {inq.quantity && (
                        <div className="text-xs text-[#303033]">
                          <span className="text-[#777271]">Volume:</span> {inq.quantity}
                        </div>
                      )}

                      {inq.notes && (
                        <p className="text-xs text-[#777271] bg-[#F5F3F2] p-3 rounded-xl border border-[#303033]/5">
                          "{inq.notes}"
                        </p>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex md:flex-col items-center md:items-end gap-2 shrink-0">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleUpdateInquiryStatus(inq.id, 'new')}
                          className={`px-2.5 py-1 text-[11px] rounded-lg transition ${
                            inq.status === 'new'
                              ? 'bg-red-100 text-red-800 font-bold'
                              : 'bg-[#F5F3F2] text-[#777271] hover:bg-neutral-200'
                          }`}
                        >
                          New
                        </button>
                        <button
                          onClick={() => handleUpdateInquiryStatus(inq.id, 'contacted')}
                          className={`px-2.5 py-1 text-[11px] rounded-lg transition ${
                            inq.status === 'contacted'
                              ? 'bg-amber-100 text-amber-800 font-bold'
                              : 'bg-[#F5F3F2] text-[#777271] hover:bg-neutral-200'
                          }`}
                        >
                          Contacted
                        </button>
                        <button
                          onClick={() => handleUpdateInquiryStatus(inq.id, 'resolved')}
                          className={`px-2.5 py-1 text-[11px] rounded-lg transition ${
                            inq.status === 'resolved'
                              ? 'bg-emerald-100 text-emerald-800 font-bold'
                              : 'bg-[#F5F3F2] text-[#777271] hover:bg-neutral-200'
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
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs hover:bg-emerald-700 transition font-medium"
                        >
                          <Phone className="w-3 h-3" />
                          <span>WhatsApp Lead</span>
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
                <div className="bg-[#FDFDFD] p-12 text-center rounded-2xl border border-[#303033]/10 text-xs text-[#777271]">
                  No inquiries recorded yet. Inquiries will appear automatically when customers submit enquiry forms.
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 6: SETTINGS & STORE TIMINGS */}
        {activeTab === 'settings' && (
          <div className="py-8 space-y-8">
            <div className="bg-[#FDFDFD] p-6 sm:p-8 rounded-2xl border border-[#303033]/10 max-w-3xl space-y-6">
              <div>
                <h2 className="font-editorial text-2xl text-[#303033]">
                  Store & System Configuration
                </h2>
                <p className="text-xs text-[#777271]">
                  Manage store contact details, WhatsApp routing number, hours, and announcements
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-tech uppercase text-[#777271] mb-1.5">
                    Store Flagship Title
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
                    className="w-full px-4 py-2.5 text-xs rounded-xl bg-[#F5F3F2] border border-[#303033]/10 focus:outline-none focus:border-[#B8202A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-tech uppercase text-[#777271] mb-1.5">
                    WhatsApp Routing Target Number (with Country Code)
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
                    placeholder="+91 94401 55920"
                    className="w-full px-4 py-2.5 text-xs rounded-xl bg-[#F5F3F2] border border-[#303033]/10 focus:outline-none focus:border-[#B8202A]"
                  />
                  <p className="text-[11px] text-[#777271] mt-1">
                    All website "Enquire via WhatsApp" and Concierge modal links will automatically route to this phone number.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-tech uppercase text-[#777271] mb-1.5">
                    Physical Showroom Address
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
                    className="w-full px-4 py-2.5 text-xs rounded-xl bg-[#F5F3F2] border border-[#303033]/10 focus:outline-none focus:border-[#B8202A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-tech uppercase text-[#777271] mb-1.5">
                    Instagram Handle / URL
                  </label>
                  <input
                    type="text"
                    value={settings.storeInfo.instagramUrl}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        storeInfo: {
                          ...settings.storeInfo,
                          instagramUrl: e.target.value,
                        },
                      })
                    }
                    className="w-full px-4 py-2.5 text-xs rounded-xl bg-[#F5F3F2] border border-[#303033]/10 focus:outline-none focus:border-[#B8202A]"
                  />
                </div>

                {/* Announcement Banner Toggle */}
                <div className="pt-4 border-t border-[#303033]/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-xs text-[#303033]">
                        Top Announcement Ribbon
                      </div>
                      <div className="text-[11px] text-[#777271]">
                        Show a prominent announcement bar at the top of all pages
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
                      className="w-4 h-4 accent-[#B8202A]"
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
                      placeholder="e.g. Special festive pricing on audio & optical cameras!"
                      className="w-full px-4 py-2.5 text-xs rounded-xl bg-[#F5F3F2] border border-[#303033]/10 focus:outline-none focus:border-[#B8202A]"
                    />
                  )}
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => {
                      saveStoredSettings(settings);
                      showToast('Settings saved successfully');
                    }}
                    className="px-6 py-2.5 rounded-xl bg-[#B8202A] text-white text-xs font-semibold hover:bg-[#961923] transition shadow-md shadow-[#B8202A]/20"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ===================== PRODUCT EDIT MODAL ===================== */}
      <AnimatePresence>
        {isProductModalOpen && editingProduct && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-3xl my-8 bg-[#FDFDFD] rounded-3xl border border-[#303033]/15 p-6 sm:p-8 max-h-[90vh] overflow-y-auto studio-shadow-soft"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#303033]/10 mb-6">
                <div>
                  <div className="font-tech text-[10px] uppercase text-[#B8202A] tracking-wider">
                    CATALOGUE MODEL EDITOR
                  </div>
                  <h2 className="font-editorial text-2xl text-[#303033]">
                    {products.some((p) => p.id === editingProduct.id)
                      ? `Edit: ${editingProduct.name}`
                      : 'Add New Hardware Model'}
                  </h2>
                </div>
                <button
                  onClick={() => setIsProductModalOpen(false)}
                  className="p-2 rounded-full hover:bg-neutral-100 text-[#777271]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-tech uppercase text-[#777271] mb-1">
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
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#F5F3F2] border border-[#303033]/10 focus:outline-none focus:border-[#B8202A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-tech uppercase text-[#777271] mb-1">
                      Model Code *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingProduct.model}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, model: e.target.value })
                      }
                      placeholder="e.g. Nirvana Ion ANC"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#F5F3F2] border border-[#303033]/10 focus:outline-none focus:border-[#B8202A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-tech uppercase text-[#777271] mb-1">
                      Brand Partner
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
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#F5F3F2] border border-[#303033]/10 focus:outline-none"
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
                    <label className="block text-xs font-tech uppercase text-[#777271] mb-1">
                      Category Collection
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
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#F5F3F2] border border-[#303033]/10 focus:outline-none"
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
                  <label className="block text-xs font-tech uppercase text-[#777271] mb-1">
                    Short Tagline
                  </label>
                  <input
                    type="text"
                    value={editingProduct.tagline}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, tagline: e.target.value })
                    }
                    placeholder="e.g. Up to 32dB Active Noise Cancellation with 120-hour total playback."
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#F5F3F2] border border-[#303033]/10 focus:outline-none focus:border-[#B8202A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-tech uppercase text-[#777271] mb-1">
                    Editorial Summary / Description
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
                    placeholder="Describe craftsmanship, acoustic or optical specifications, durability..."
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#F5F3F2] border border-[#303033]/10 focus:outline-none focus:border-[#B8202A]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-tech uppercase text-[#777271] mb-1">
                      Primary Image URL
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
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#F5F3F2] border border-[#303033]/10 focus:outline-none focus:border-[#B8202A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-tech uppercase text-[#777271] mb-1">
                      Secondary Image URL
                    </label>
                    <input
                      type="text"
                      value={editingProduct.secondaryImage}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          secondaryImage: e.target.value,
                        })
                      }
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#F5F3F2] border border-[#303033]/10 focus:outline-none focus:border-[#B8202A]"
                    />
                  </div>
                </div>

                {/* Key Highlights */}
                <div>
                  <label className="block text-xs font-tech uppercase text-[#777271] mb-1">
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
                    placeholder="e.g. 100H Battery, Quad Mic ENC, 45ms Latency, Type-C"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#F5F3F2] border border-[#303033]/10 focus:outline-none focus:border-[#B8202A]"
                  />
                </div>

                {/* Featured Switch */}
                <div className="flex items-center gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="featuredCheckbox"
                    checked={!!editingProduct.featured}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        featured: e.target.checked,
                      })
                    }
                    className="w-4 h-4 accent-[#B8202A]"
                  />
                  <label htmlFor="featuredCheckbox" className="text-xs text-[#303033] font-medium cursor-pointer">
                    Feature in Homepage Showcase Ribbon (Section 03)
                  </label>
                </div>

                <div className="flex items-center justify-end gap-3 pt-6 border-t border-[#303033]/10">
                  <button
                    type="button"
                    onClick={() => setIsProductModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl bg-[#F5F3F2] text-[#303033] text-xs font-medium hover:bg-neutral-200 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#B8202A] text-white text-xs font-semibold hover:bg-[#961923] transition shadow-md shadow-[#B8202A]/20"
                  >
                    Save Hardware Model
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ===================== CATEGORY EDIT MODAL ===================== */}
      <AnimatePresence>
        {isCategoryModalOpen && editingCategory && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-xl bg-[#FDFDFD] rounded-3xl border border-[#303033]/15 p-6 sm:p-8 studio-shadow-soft"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#303033]/10 mb-6">
                <h2 className="font-editorial text-2xl text-[#303033]">
                  Edit Category: {editingCategory.name}
                </h2>
                <button
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="p-2 rounded-full hover:bg-neutral-100 text-[#777271]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-tech uppercase text-[#777271] mb-1">
                    Category Title
                  </label>
                  <input
                    type="text"
                    value={editingCategory.name}
                    onChange={(e) =>
                      setEditingCategory({ ...editingCategory, name: e.target.value })
                    }
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#F5F3F2] border border-[#303033]/10"
                  />
                </div>

                <div>
                  <label className="block text-xs font-tech uppercase text-[#777271] mb-1">
                    Editorial Title
                  </label>
                  <input
                    type="text"
                    value={editingCategory.editorialTitle}
                    onChange={(e) =>
                      setEditingCategory({
                        ...editingCategory,
                        editorialTitle: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#F5F3F2] border border-[#303033]/10"
                  />
                </div>

                <div>
                  <label className="block text-xs font-tech uppercase text-[#777271] mb-1">
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
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#F5F3F2] border border-[#303033]/10"
                  />
                </div>

                <div>
                  <label className="block text-xs font-tech uppercase text-[#777271] mb-1">
                    Technical Annotation
                  </label>
                  <input
                    type="text"
                    value={editingCategory.technicalAnnotation}
                    onChange={(e) =>
                      setEditingCategory({
                        ...editingCategory,
                        technicalAnnotation: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#F5F3F2] border border-[#303033]/10"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#303033]/10">
                  <button
                    type="button"
                    onClick={() => setIsCategoryModalOpen(false)}
                    className="px-5 py-2 text-xs rounded-xl bg-[#F5F3F2] text-[#303033]"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = categories.map((c) =>
                        c.slug === editingCategory.slug ? editingCategory : c
                      );
                      setCategories(updated);
                      saveStoredCategories(updated);
                      setIsCategoryModalOpen(false);
                      showToast('Category updated');
                    }}
                    className="px-6 py-2 text-xs rounded-xl bg-[#B8202A] text-white font-semibold"
                  >
                    Save Category
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ===================== BRAND EDIT MODAL ===================== */}
      <AnimatePresence>
        {isBrandModalOpen && editingBrand && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-xl bg-[#FDFDFD] rounded-3xl border border-[#303033]/15 p-6 sm:p-8 studio-shadow-soft"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#303033]/10 mb-6">
                <h2 className="font-editorial text-2xl text-[#303033]">
                  Edit Brand: {editingBrand.name}
                </h2>
                <button
                  onClick={() => setIsBrandModalOpen(false)}
                  className="p-2 rounded-full hover:bg-neutral-100 text-[#777271]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-tech uppercase text-[#777271] mb-1">
                    Editorial Headline
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
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#F5F3F2] border border-[#303033]/10"
                  />
                </div>

                <div>
                  <label className="block text-xs font-tech uppercase text-[#777271] mb-1">
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
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#F5F3F2] border border-[#303033]/10"
                  />
                </div>

                <div>
                  <label className="block text-xs font-tech uppercase text-[#777271] mb-1">
                    Signature Capabilities (comma separated)
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
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#F5F3F2] border border-[#303033]/10"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#303033]/10">
                  <button
                    type="button"
                    onClick={() => setIsBrandModalOpen(false)}
                    className="px-5 py-2 text-xs rounded-xl bg-[#F5F3F2] text-[#303033]"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = brands.map((b) =>
                        b.id === editingBrand.id ? editingBrand : b
                      );
                      setBrands(updated);
                      saveStoredBrands(updated);
                      setIsBrandModalOpen(false);
                      showToast('Brand profile updated');
                    }}
                    className="px-6 py-2 text-xs rounded-xl bg-[#B8202A] text-white font-semibold"
                  >
                    Save Brand Profile
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
