import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, CheckCircle2, MessageCircle } from 'lucide-react';
import {
  BRAND_PROFILES,
  BrandProfile,
  PRODUCTS,
  ProductItem,
} from '../../data/catalogData';
import { NavigateFn } from '../../types/navigation';
import { BrandWordmark } from '../ui/BrandWordmark';
import { MaskTextReveal } from '../ui/MicroInteractions';

interface BrandUniverseSectionProps {
  onNavigate: NavigateFn;
  onSelectProduct: (product: ProductItem) => void;
  onEnquireProduct: (product: ProductItem) => void;
  initialBrandId?: BrandProfile['id'];
  isFullPage?: boolean;
}

export const BrandUniverseSection: React.FC<BrandUniverseSectionProps> = ({
  onNavigate,
  onSelectProduct,
  onEnquireProduct,
  initialBrandId = 'boat',
  isFullPage = false,
}) => {
  const [selectedBrandId, setSelectedBrandId] = useState<BrandProfile['id']>(
    initialBrandId
  );

  React.useEffect(() => {
    if (initialBrandId) {
      setSelectedBrandId(initialBrandId);
    }
  }, [initialBrandId]);

  const activeBrand =
    BRAND_PROFILES.find((b) => b.id === selectedBrandId) || BRAND_PROFILES[0];

  const brandProducts = PRODUCTS.filter((p) => p.brandId === activeBrand.id);

  return (
    <section
      aria-label="The Brand Universe"
      className={`relative overflow-hidden ${
        isFullPage
          ? 'bg-[#FDFDFD] pt-32 pb-24 sm:pt-36'
          : 'bg-gradient-to-b from-[#F5F3F2] via-[#FDFDFD] to-[#F5F3F2] py-24 sm:py-32 border-y border-[#B8202A]/30'
      }`}
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 border-b border-[#303033]/10">
          <div>
            <div className="font-tech text-[11px] uppercase tracking-[0.24em] text-[#B8202A] mb-3">
              04 // THE BRAND UNIVERSE
            </div>
            <MaskTextReveal
              as={isFullPage ? 'h1' : 'h2'}
              lines={['Six Celebrated Houses.', 'One Curated Destination.']}
              className="font-editorial text-4xl sm:text-6xl lg:text-[4.3rem] font-normal leading-[0.96] tracking-tight text-[#303033]"
            />
          </div>

          <p className="max-w-md text-xs sm:text-sm leading-relaxed text-[#777271]">
            Brands supplied and carried at Sri Gajender Traders, Nehru Nagar, Tirupati. Select any
            brand below to inspect its verified catalogue lineup and technical focus.
          </p>
        </div>

        {/* Interactive Split Editorial Brand Selector + Live Showcase */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left: Large Editorial Brand Selector */}
          <div className="lg:col-span-5 space-y-2" role="tablist" aria-label="Select a Brand">
            {BRAND_PROFILES.map((brand) => {
              const isSelected = brand.id === activeBrand.id;
              const count = PRODUCTS.filter((p) => p.brandId === brand.id).length;

              return (
                <button
                  key={brand.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedBrandId(brand.id)}
                  className={`group relative w-full rounded-2xl px-5 py-4 sm:px-6 sm:py-5 text-left transition-all duration-400 border ${
                    isSelected
                      ? 'bg-[#FDFDFD] border-[#B8202A]/60 studio-shadow-soft'
                      : 'bg-transparent border-transparent hover:bg-[#FDFDFD]/65 hover:border-[#303033]/8'
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="brand-selector-bar"
                      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                      className="absolute left-0 top-4 bottom-4 w-[3px] rounded-r-full bg-[#B8202A]"
                    />
                  )}
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <span className="block font-tech text-[9px] uppercase tracking-[0.2em] text-[#777271]">
                        {brand.index} · {brand.originNote}
                      </span>
                      <span
                        className={`mt-1 block font-editorial text-2xl sm:text-3xl transition-colors ${
                          isSelected
                            ? 'font-semibold text-[#303033]'
                            : 'font-normal text-[#777271] group-hover:text-[#303033]'
                        }`}
                      >
                        {brand.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-[#F5F3F2] px-2.5 py-1 font-tech text-[10px] text-[#777271]">
                        0{count} Models
                      </span>
                      <ArrowUpRight
                        className={`h-4 w-4 transition-transform duration-300 ${
                          isSelected
                            ? 'text-[#B8202A] translate-x-0.5 -translate-y-0.5'
                            : 'text-[#777271]'
                        }`}
                      />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Animated Brand Presentation & Verified Product Previews */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeBrand.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.42, ease: [0.19, 1, 0.22, 1] }}
                className="rounded-[2.25rem] bg-[#FDFDFD] border border-[#B8202A]/40 p-6 sm:p-9 studio-shadow"
              >
                {/* Animated Wordmark & Category Tag */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#303033]/10">
                  <BrandWordmark brandId={activeBrand.id} size="lg" />
                  <span className="rounded-full bg-[#F5F3F2] border border-[#B8202A]/30 px-3.5 py-1.5 font-tech text-[10px] uppercase tracking-[0.16em] text-[#303033]">
                    {activeBrand.categoryFocus}
                  </span>
                </div>

                {/* Editorial Banner */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                  <div className="sm:col-span-7 space-y-3">
                    <h3 className="font-editorial text-3xl sm:text-4xl text-[#303033] leading-tight">
                      {activeBrand.editorialHeadline}
                    </h3>
                    <p className="text-sm text-[#777271] leading-relaxed">
                      {activeBrand.description}
                    </p>
                    <ul className="space-y-1.5 pt-2">
                      {activeBrand.signatureCapabilities.map((cap) => (
                        <li
                          key={cap}
                          className="flex items-start gap-2 text-xs text-[#303033]"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5 shrink-0 mt-0.5 text-[#B8202A]" />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="sm:col-span-5 overflow-hidden rounded-2xl border border-white shadow-md">
                    <img
                      src={activeBrand.heroImage}
                      alt={`${activeBrand.name} studio showcase`}
                      loading="lazy"
                      className="aspect-[4/3.6] w-full object-cover"
                    />
                  </div>
                </div>

                {/* Verified Products from Selected Brand */}
                <div className="mt-8 pt-6 border-t border-[#303033]/10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-tech text-[10px] uppercase tracking-[0.2em] text-[#777271]">
                      VERIFIED {activeBrand.name.toUpperCase()} LINEUP ({brandProducts.length})
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        onNavigate({ page: 'catalogue', brand: activeBrand.id, category: 'all' })
                      }
                      className="inline-flex items-center gap-1 font-tech text-[11px] uppercase tracking-[0.14em] text-[#B8202A] editorial-underline"
                    >
                      <span>Filter in Catalogue</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {brandProducts.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => onSelectProduct(item)}
                        className="group cursor-pointer rounded-2xl border border-[#303033]/10 bg-[#F5F3F2]/60 p-3.5 transition hover:border-[#B8202A] hover:bg-white flex items-center gap-3.5"
                      >
                        <img
                          src={item.primaryImage}
                          alt={item.name}
                          loading="lazy"
                          className="h-16 w-16 shrink-0 rounded-xl object-cover border border-white"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="font-tech text-[9px] uppercase tracking-[0.14em] text-[#777271]">
                            MODEL: {item.model}
                          </div>
                          <div className="truncate font-editorial text-xl font-medium text-[#303033] group-hover:text-[#B8202A]">
                            {item.name}
                          </div>
                          <div className="mt-1 flex items-center gap-3">
                            <span className="font-tech text-[10px] text-[#B8202A]">
                              Inspect Specs
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onEnquireProduct(item);
                              }}
                              className="inline-flex items-center gap-1 font-tech text-[10px] text-[#777271] hover:text-[#303033]"
                            >
                              <MessageCircle className="h-3 w-3 text-[#B8202A]" />
                              <span>Enquire</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
