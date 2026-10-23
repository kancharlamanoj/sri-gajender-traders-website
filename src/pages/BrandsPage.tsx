import React from 'react';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import {
  BRAND_PROFILES,
  BrandId,
  BrandProfile,
  ProductItem,
} from '../data/catalogData';
import { NavigateFn } from '../types/navigation';
import { BrandUniverseSection } from '../components/home/BrandUniverseSection';
import { BrandWordmark } from '../components/ui/BrandWordmark';

interface BrandsPageProps {
  initialBrand?: BrandId | 'all';
  onNavigate: NavigateFn;
  onSelectProduct: (product: ProductItem) => void;
  onEnquireProduct: (product: ProductItem) => void;
  onOpenConcierge: (mode?: 'retail' | 'wholesale' | 'warranty') => void;
}

export const BrandsPage: React.FC<BrandsPageProps> = ({
  initialBrand,
  onNavigate,
  onSelectProduct,
  onEnquireProduct,
  onOpenConcierge,
}) => {
  const validBrandId: BrandProfile['id'] =
    initialBrand &&
    initialBrand !== 'all' &&
    initialBrand !== 'commercial-hardware'
      ? initialBrand
      : 'boat';

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      <BrandUniverseSection
        isFullPage
        initialBrandId={validBrandId}
        onNavigate={onNavigate}
        onSelectProduct={onSelectProduct}
        onEnquireProduct={onEnquireProduct}
      />

      {/* Complete Architectural Brand Dossier Grid */}
      <section className="bg-[#F5F3F2] py-20 sm:py-28 border-t border-[#B8202A]/35">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
          <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="font-tech text-[11px] uppercase tracking-[0.22em] text-[#B8202A]">
                COMPLETE DIRECTORY // 06 BRAND HOUSES
              </div>
              <h2 className="mt-2 font-editorial text-4xl sm:text-5xl text-[#303033]">
                Explore Every Carried Brand
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onOpenConcierge('wholesale')}
              className="inline-flex items-center gap-2 rounded-full bg-[#B8202A] px-5 py-3 text-xs font-medium text-[#FDFDFD] hover:bg-[#961923]"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              <span>Multi-Brand Wholesale Quote</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {BRAND_PROFILES.map((brand) => (
              <div
                key={brand.id}
                className="flex flex-col justify-between rounded-[2rem] bg-[#FDFDFD] border border-[#303033]/10 p-7 studio-shadow-soft"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-tech text-[10px] uppercase tracking-[0.2em] text-[#777271]">
                      {brand.index}
                    </span>
                    <span className="font-tech text-[10px] text-[#B8202A]">
                      {brand.originNote}
                    </span>
                  </div>
                  <div className="py-2">
                    <BrandWordmark brandId={brand.id} size="md" />
                  </div>
                  <p className="text-xs sm:text-sm text-[#777271] leading-relaxed">
                    {brand.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#303033]/8 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() =>
                      onNavigate({ page: 'catalogue', brand: brand.id, category: 'all' })
                    }
                    className="inline-flex items-center gap-1.5 font-tech text-[11px] uppercase tracking-[0.14em] text-[#B8202A] editorial-underline"
                  >
                    <span>Browse {brand.name}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
