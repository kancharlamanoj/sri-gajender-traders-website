import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowUpRight,
  LayoutGrid,
  List,
  MessageCircle,
  RotateCcw,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import {
  BRAND_PROFILES,
  BrandId,
  CATEGORIES,
  CategorySlug,
  PRODUCTS,
  ProductItem,
} from '../data/catalogData';
import { ProductCard } from '../components/catalogue/ProductCard';
import { BrandWordmark } from '../components/ui/BrandWordmark';
import { MaskTextReveal } from '../components/ui/MicroInteractions';

interface CataloguePageProps {
  initialCategory?: CategorySlug | 'all';
  initialBrand?: BrandId | 'all';
  initialSearch?: string;
  onSelectProduct: (product: ProductItem) => void;
  onEnquireProduct: (product: ProductItem) => void;
  onOpenConcierge: (mode?: 'retail' | 'wholesale' | 'warranty') => void;
}

const PAGE_SIZE = 9;

export const CataloguePage: React.FC<CataloguePageProps> = ({
  initialCategory = 'all',
  initialBrand = 'all',
  initialSearch = '',
  onSelectProduct,
  onEnquireProduct,
  onOpenConcierge,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategorySlug | 'all'>(
    initialCategory
  );
  const [selectedBrand, setSelectedBrand] = useState<BrandId | 'all'>(initialBrand);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [viewMode, setViewMode] = useState<'grid' | 'ledger'>('grid');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    setSelectedBrand(initialBrand);
  }, [initialBrand]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [selectedCategory, selectedBrand, searchQuery]);

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return PRODUCTS.filter((item) => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      if (selectedBrand !== 'all' && item.brandId !== selectedBrand) {
        return false;
      }
      if (!q) return true;
      const searchable = [
        item.name,
        item.brandName,
        item.model,
        item.categoryLabel,
        item.tagline,
        ...item.verifiedSpecs.map((s) => `${s.label} ${s.value}`),
      ]
        .join(' ')
        .toLowerCase();
      return searchable.includes(q);
    });
  }, [selectedCategory, selectedBrand, searchQuery]);

  const paginatedProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedBrand('all');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] pt-28 sm:pt-36 pb-24">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        {/* Editorial Catalogue Header */}
        <div className="border-b border-[#303033]/10 pb-10">
          <div className="font-tech text-[11px] uppercase tracking-[0.24em] text-[#B8202A] mb-3">
            CATALOGUE ARCHIVE // TIRUPATI FLAGSHIP
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <MaskTextReveal
              as="h1"
              lines={['The Curated Hardware Index.']}
              className="font-editorial text-4xl sm:text-6xl lg:text-[4.5rem] font-normal leading-[0.95] tracking-tight text-[#303033]"
            />
            <p className="max-w-md text-xs sm:text-sm text-[#777271] leading-relaxed">
              Verified manufacturer specifications across consumer acoustics, grooming appliances,
              workspace peripherals, CCTV optics, and commercial note counters. Select any entry to
              inspect specs or request live pricing.
            </p>
          </div>
        </div>

        {/* Filter & Search Command Console */}
        <div className="mt-8 rounded-[2rem] bg-[#F5F3F2]/85 border border-[#B8202A]/35 p-5 sm:p-6 space-y-5">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-xl">
              <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#777271]" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search model, brand, or spec (e.g. Nirvana Ion, 32dB ANC, Hikvision, Toad 23)..."
                aria-label="Search products"
                className="w-full rounded-full border border-[#303033]/14 bg-[#FDFDFD] pl-11 pr-10 py-3 text-sm text-[#303033] placeholder:text-[#777271] focus:border-[#B8202A] focus:bg-white focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#777271] hover:text-[#303033]"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Count & View Switcher */}
            <div className="flex items-center justify-between lg:justify-end gap-4">
              <span className="font-tech text-[11px] uppercase tracking-[0.16em] text-[#777271]">
                {filteredProducts.length}{' '}
                {filteredProducts.length === 1 ? 'Verified Entry' : 'Verified Entries'}
              </span>

              <div className="inline-flex rounded-full bg-[#FDFDFD] p-1 border border-[#303033]/12">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  aria-label="Editorial Grid View"
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition ${
                    viewMode === 'grid'
                      ? 'bg-[#303033] text-[#FDFDFD]'
                      : 'text-[#777271] hover:text-[#303033]'
                  }`}
                >
                  <LayoutGrid className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Gallery</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('ledger')}
                  aria-label="Technical Ledger View"
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition ${
                    viewMode === 'ledger'
                      ? 'bg-[#303033] text-[#FDFDFD]'
                      : 'text-[#777271] hover:text-[#303033]'
                  }`}
                >
                  <List className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Index</span>
                </button>
              </div>
            </div>
          </div>

          {/* Category Filter Row */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-tech text-[10px] uppercase tracking-[0.2em] text-[#777271]">
              <SlidersHorizontal className="h-3 w-3 text-[#B8202A]" />
              <span>Filter by Discipline</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
                  selectedCategory === 'all'
                    ? 'bg-[#B8202A] text-[#FDFDFD]'
                    : 'bg-[#FDFDFD] text-[#777271] border border-[#303033]/10 hover:border-[#B8202A]'
                }`}
              >
                All Collections
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
                    selectedCategory === cat.slug
                      ? 'bg-[#B8202A] text-[#FDFDFD]'
                      : 'bg-[#FDFDFD] text-[#777271] border border-[#303033]/10 hover:border-[#B8202A]'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Brand Filter Row */}
          <div className="space-y-2 pt-1">
            <div className="font-tech text-[10px] uppercase tracking-[0.2em] text-[#777271]">
              Filter by Brand House
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSelectedBrand('all')}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
                  selectedBrand === 'all'
                    ? 'bg-[#303033] text-[#FDFDFD]'
                    : 'bg-[#FDFDFD] text-[#777271] border border-[#303033]/10 hover:border-[#B8202A]'
                }`}
              >
                All Brands
              </button>
              {BRAND_PROFILES.map((brand) => (
                <button
                  key={brand.id}
                  type="button"
                  onClick={() => setSelectedBrand(brand.id)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
                    selectedBrand === brand.id
                      ? 'bg-[#303033] text-[#FDFDFD]'
                      : 'bg-[#FDFDFD] text-[#777271] border border-[#303033]/10 hover:border-[#B8202A]'
                  }`}
                >
                  {brand.name}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setSelectedBrand('commercial-hardware')}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
                  selectedBrand === 'commercial-hardware'
                    ? 'bg-[#303033] text-[#FDFDFD]'
                    : 'bg-[#FDFDFD] text-[#777271] border border-[#303033]/10 hover:border-[#B8202A]'
                }`}
              >
                Commercial Equipment
              </button>
            </div>
          </div>

          {(selectedCategory !== 'all' || selectedBrand !== 'all' || searchQuery) && (
            <div className="pt-2 border-t border-[#303033]/8 flex items-center justify-between">
              <span className="font-tech text-[10px] text-[#777271]">
                Active filters applied
              </span>
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1.5 font-tech text-[11px] text-[#B8202A] hover:underline"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}
        </div>

        {/* Results Stage */}
        {filteredProducts.length === 0 ? (
          <div className="mt-12 rounded-[2.25rem] border border-[#B8202A]/40 bg-[#F5F3F2]/60 p-10 sm:p-16 text-center space-y-5">
            <div className="font-tech text-xs uppercase tracking-[0.22em] text-[#777271]">
              NO EXACT ARCHIVE MATCH
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#303033]">
              Looking for a specific model or bulk configuration?
            </h2>
            <p className="mx-auto max-w-lg text-sm text-[#777271] leading-relaxed">
              Sri Gajender Traders carries broader seasonal inventory across Portronics, boAt,
              Zebronics, Boult, Hikvision, Bombay Shaving Company, and commercial equipment in
              Tirupati. Reach out directly to verify model availability.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={resetFilters}
                className="rounded-full border border-[#303033]/20 bg-white px-6 py-3 text-xs font-medium text-[#303033]"
              >
                Reset Catalogue Filters
              </button>
              <button
                type="button"
                onClick={() => onOpenConcierge('retail')}
                className="inline-flex items-center gap-2 rounded-full bg-[#B8202A] px-6 py-3 text-xs font-medium text-[#FDFDFD]"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                <span>Ask Our Tirupati Desk on WhatsApp</span>
              </button>
            </div>
          </div>
        ) : viewMode === 'grid' ? (
          <motion.div
            layout
            className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {paginatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={onSelectProduct}
                onEnquireProduct={onEnquireProduct}
              />
            ))}
          </motion.div>
        ) : (
          /* Technical Ledger View */
          <div className="mt-10 divide-y divide-[#303033]/10 rounded-[2rem] border border-[#303033]/12 bg-white overflow-hidden studio-shadow-soft">
            {paginatedProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="group cursor-pointer p-5 sm:p-6 transition hover:bg-[#FDFDFD] flex flex-col md:flex-row md:items-center justify-between gap-5"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <img
                    src={product.primaryImage}
                    alt={product.name}
                    loading="lazy"
                    className="h-18 w-22 rounded-xl object-cover border border-[#303033]/10 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="font-tech text-[10px] text-[#777271]">
                        {product.indexCode}
                      </span>
                      <BrandWordmark brandId={product.brandId} size="sm" />
                      <span className="rounded-full bg-[#F5F3F2] px-2.5 py-0.5 font-tech text-[9px] text-[#777271]">
                        MODEL: {product.model}
                      </span>
                    </div>
                    <h3 className="mt-1 font-editorial text-2xl font-medium text-[#303033] group-hover:text-[#B8202A]">
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#777271] truncate max-w-xl">{product.tagline}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEnquireProduct(product);
                    }}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#B8202A] px-4 py-2 text-xs font-medium text-[#FDFDFD] hover:bg-[#961923]"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    <span>Enquire for Price</span>
                  </button>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#303033]/12 bg-[#F5F3F2]">
                    <ArrowUpRight className="h-4 w-4 text-[#303033]" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Responsive Pagination / Load More */}
        {filteredProducts.length > 0 && (
          <div className="mt-14 flex flex-col items-center justify-center gap-4">
            <div className="font-tech text-[11px] uppercase tracking-[0.2em] text-[#777271]">
              Showing {paginatedProducts.length} of {filteredProducts.length} Verified Entries
            </div>
            <div className="h-1 w-48 rounded-full bg-[#E8E5E3] overflow-hidden">
              <div
                style={{
                  width: `${Math.min(
                    100,
                    (paginatedProducts.length / filteredProducts.length) * 100
                  )}%`,
                }}
                className="h-full bg-[#B8202A] transition-all duration-500"
              />
            </div>
            {hasMore && (
              <button
                type="button"
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                className="mt-2 inline-flex items-center gap-2 rounded-full border border-[#303033]/20 bg-white px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-[#303033] transition hover:border-[#B8202A] hover:bg-[#B8202A] hover:text-[#FDFDFD] shadow-xs"
              >
                <span>Load Remaining ({filteredProducts.length - paginatedProducts.length}) Models</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
