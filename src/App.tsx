import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  BrandId,
  CategorySlug,
  PRODUCTS,
  ProductItem,
} from './data/catalogData';
import { NavigateFn, PageRoute, RouteState } from './types/navigation';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroExperience } from './components/home/HeroExperience';
import { ScrollNarrativeSection } from './components/home/ScrollNarrativeSection';
import { ImmersiveCollections } from './components/home/ImmersiveCollections';
import { EditorialLookbookStrip } from './components/home/EditorialLookbookStrip';
import { FeaturedShowcaseSection } from './components/home/FeaturedShowcaseSection';
import { BrandUniverseSection } from './components/home/BrandUniverseSection';
import { WholesaleServiceSection } from './components/home/WholesaleServiceSection';
import { TirupatiAtelierBanner } from './components/home/TirupatiAtelierBanner';
import { CataloguePage } from './pages/CataloguePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { BrandsPage } from './pages/BrandsPage';
import { WholesalePage } from './pages/WholesalePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';
import { EnquiryModal } from './components/ui/EnquiryModal';
import { QuickSearchModal } from './components/ui/QuickSearchModal';
import {
  LuxuryDesktopCursor,
  ScrollProgressBar,
} from './components/ui/MicroInteractions';

function parseHashToRoute(): RouteState {
  if (typeof window === 'undefined') return { page: 'home' };
  const raw = window.location.hash.replace(/^#/, '');
  if (!raw) return { page: 'home' };

  const [pathPart, queryPart] = raw.split('?');
  const params = new URLSearchParams(queryPart || '');

  if (pathPart.startsWith('product/')) {
    const productId = pathPart.replace('product/', '');
    return { page: 'product', productId };
  }

  const validPages: PageRoute[] = [
    'home',
    'catalogue',
    'product',
    'brands',
    'wholesale',
    'about',
    'contact',
    'admin',
  ];
  const page = validPages.includes(pathPart as PageRoute)
    ? (pathPart as PageRoute)
    : 'home';

  return {
    page,
    category: (params.get('category') as CategorySlug | 'all') || 'all',
    brand: (params.get('brand') as BrandId | 'all') || 'all',
    searchQuery: params.get('q') || '',
    productId: params.get('id') || undefined,
  };
}

function serializeRouteToHash(route: RouteState): string {
  if (route.page === 'home') return '#home';
  if (route.page === 'product' && route.productId) {
    return `#product/${route.productId}`;
  }
  const params = new URLSearchParams();
  if (route.category && route.category !== 'all') {
    params.set('category', route.category);
  }
  if (route.brand && route.brand !== 'all') {
    params.set('brand', route.brand);
  }
  if (route.searchQuery) {
    params.set('q', route.searchQuery);
  }
  const qs = params.toString();
  return `#${route.page}${qs ? `?${qs}` : ''}`;
}

export default function App() {
  const [route, setRoute] = useState<RouteState>(() => parseHashToRoute());
  const [conciergeOpen, setConciergeOpen] = useState(false);
  const [quickSearchOpen, setQuickSearchOpen] = useState(false);
  const [conciergeProduct, setConciergeProduct] = useState<ProductItem | null>(
    null
  );
  const [conciergeMode, setConciergeMode] = useState<
    'retail' | 'wholesale' | 'warranty'
  >('retail');

  // Sync browser Back/Forward navigation + Global Cmd+K / Ctrl+K shortcut
  useEffect(() => {
    const onHashChange = () => {
      setRoute(parseHashToRoute());
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setQuickSearchOpen((v) => !v);
      }
    };
    window.addEventListener('hashchange', onHashChange);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('hashchange', onHashChange);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const navigate: NavigateFn = useCallback((next) => {
    const merged: RouteState = {
      page: next.page,
      productId: next.productId,
      category: next.category ?? 'all',
      brand: next.brand ?? 'all',
      searchQuery: next.searchQuery ?? '',
    };
    setRoute(merged);
    const nextHash = serializeRouteToHash(merged);
    if (window.location.hash !== nextHash) {
      window.history.pushState(null, '', nextHash);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSelectProduct = useCallback(
    (product: ProductItem) => {
      navigate({ page: 'product', productId: product.id });
    },
    [navigate]
  );

  const handleEnquireProduct = useCallback((product: ProductItem) => {
    setConciergeProduct(product);
    setConciergeMode('retail');
    setConciergeOpen(true);
  }, []);

  const handleOpenConcierge = useCallback(
    (mode: 'retail' | 'wholesale' | 'warranty' = 'retail') => {
      setConciergeProduct(null);
      setConciergeMode(mode);
      setConciergeOpen(true);
    },
    []
  );

  // Dynamic SEO document title per view
  useEffect(() => {
    const base = 'Sri Gajender Traders — Tirupati';
    if (route.page === 'product' && route.productId) {
      const prod = PRODUCTS.find((p) => p.id === route.productId);
      if (prod) {
        document.title = `${prod.name} (${prod.model}) | ${base}`;
        return;
      }
    }
    const pageTitles: Record<PageRoute, string> = {
      home: 'Sri Gajender Traders — The Future, Curated | Electronics Flagship, Tirupati',
      catalogue: `Product Catalogue | ${base}`,
      product: `Product Specification | ${base}`,
      brands: `Brands Carried — Portronics, boAt, Zebronics, Boult, Hikvision | ${base}`,
      wholesale: `Wholesale & Business Supply | ${base}`,
      about: `Tirupati Atelier & Provenance | ${base}`,
      contact: `Showroom Hours, Warranty Help & Directions | ${base}`,
      admin: `Operations & Content Management Console | ${base}`,
    };
    document.title = pageTitles[route.page] || base;
  }, [route]);

  const activeProduct =
    PRODUCTS.find((p) => p.id === route.productId) || PRODUCTS[0];

  const isAdminView = route.page === 'admin';

  return (
    <div
      className={`relative ${
        isAdminView ? 'h-screen overflow-hidden' : 'min-h-screen overflow-x-clip'
      } bg-[#FDFDFD] text-[#303033] selection:bg-[#B8202A] selection:text-[#FDFDFD]`}
    >
      {/* Subtle Print Materiality Grain */}
      {!isAdminView && (
        <div
          aria-hidden="true"
          className="luxury-grain pointer-events-none fixed inset-0 z-[50] opacity-[0.032]"
        />
      )}

      <ScrollProgressBar />

      {route.page !== 'admin' && (
        <Navbar
          currentPage={route.page}
          onNavigate={navigate}
          onOpenConcierge={handleOpenConcierge}
          onOpenQuickSearch={() => setQuickSearchOpen(true)}
        />
      )}

      <main id="main-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${route.page}-${route.productId || ''}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {route.page === 'home' && (
              <>
                <HeroExperience onNavigate={navigate} />
                <ScrollNarrativeSection onNavigate={navigate} />
                <ImmersiveCollections onNavigate={navigate} />
                <EditorialLookbookStrip onNavigate={navigate} />
                <FeaturedShowcaseSection
                  onNavigate={navigate}
                  onSelectProduct={handleSelectProduct}
                  onEnquireProduct={handleEnquireProduct}
                />
                <BrandUniverseSection
                  onNavigate={navigate}
                  onSelectProduct={handleSelectProduct}
                  onEnquireProduct={handleEnquireProduct}
                />
                <WholesaleServiceSection />
                <TirupatiAtelierBanner
                  onNavigate={navigate}
                  onOpenConcierge={handleOpenConcierge}
                />
              </>
            )}

            {route.page === 'catalogue' && (
              <CataloguePage
                initialCategory={route.category}
                initialBrand={route.brand}
                initialSearch={route.searchQuery}
                onSelectProduct={handleSelectProduct}
                onEnquireProduct={handleEnquireProduct}
                onOpenConcierge={handleOpenConcierge}
              />
            )}

            {route.page === 'product' && (
              <ProductDetailPage
                product={activeProduct}
                onNavigate={navigate}
                onSelectProduct={handleSelectProduct}
                onEnquireProduct={handleEnquireProduct}
              />
            )}

            {route.page === 'brands' && (
              <BrandsPage
                initialBrand={route.brand}
                onNavigate={navigate}
                onSelectProduct={handleSelectProduct}
                onEnquireProduct={handleEnquireProduct}
                onOpenConcierge={handleOpenConcierge}
              />
            )}

            {route.page === 'wholesale' && (
              <WholesalePage onNavigate={navigate} />
            )}

            {route.page === 'about' && (
              <AboutPage
                onNavigate={navigate}
                onOpenConcierge={handleOpenConcierge}
              />
            )}

            {route.page === 'contact' && (
              <ContactPage
                onNavigate={navigate}
                onOpenConcierge={handleOpenConcierge}
              />
            )}

            {route.page === 'admin' && (
              <AdminPage onNavigate={navigate} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {route.page !== 'admin' && (
        <Footer onNavigate={navigate} onOpenConcierge={handleOpenConcierge} />
      )}

      <EnquiryModal
        isOpen={conciergeOpen}
        onClose={() => setConciergeOpen(false)}
        product={conciergeProduct}
        initialMode={conciergeMode}
      />

      <QuickSearchModal
        isOpen={quickSearchOpen}
        onClose={() => setQuickSearchOpen(false)}
        onNavigate={navigate}
        onSelectProduct={handleSelectProduct}
      />
    </div>
  );
}
