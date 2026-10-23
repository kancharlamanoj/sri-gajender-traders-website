import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import {
  CATEGORIES,
  CategorySlug,
  PRODUCTS,
  ProductItem,
} from '../../data/catalogData';
import { getStoredProducts } from '../../utils/adminStore';
import { NavigateFn } from '../../types/navigation';
import { ProductCard } from '../catalogue/ProductCard';
import { MaskTextReveal } from '../ui/MicroInteractions';

interface FeaturedShowcaseSectionProps {
  onNavigate: NavigateFn;
  onSelectProduct: (product: ProductItem) => void;
  onEnquireProduct: (product: ProductItem) => void;
}

export const FeaturedShowcaseSection: React.FC<FeaturedShowcaseSectionProps> = ({
  onNavigate,
  onSelectProduct,
  onEnquireProduct,
}) => {
  const [filterCat, setFilterCat] = useState<'featured' | CategorySlug>('featured');
  const [allProducts, setAllProducts] = useState<ProductItem[]>(() => getStoredProducts());

  useEffect(() => {
    const onDataChange = () => setAllProducts(getStoredProducts());
    window.addEventListener('sgt-data-update', onDataChange);
    return () => window.removeEventListener('sgt-data-update', onDataChange);
  }, []);

  const visibleProducts =
    filterCat === 'featured'
      ? allProducts.filter((p) => p.featured).slice(0, 6)
      : allProducts.filter((p) => p.category === filterCat).slice(0, 6);

  return (
    <section
      aria-label="Featured Hardware Showcase"
      className="relative bg-[#FDFDFD] py-24 sm:py-32 border-t border-[#303033]/8"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10">
          <div>
            <div className="font-tech text-[11px] uppercase tracking-[0.24em] text-[#B8202A] mb-3">
              03 // CURATED INDEX SELECTION
            </div>
            <MaskTextReveal
              lines={['Verified Models.', 'Precision Specifications.']}
              className="font-editorial text-4xl sm:text-6xl lg:text-[4.25rem] font-normal leading-[0.96] tracking-tight text-[#303033]"
            />
          </div>

          <button
            type="button"
            onClick={() => onNavigate({ page: 'catalogue', category: 'all', brand: 'all' })}
            className="self-start lg:self-end group inline-flex items-center gap-2.5 rounded-full border border-[#303033]/18 bg-[#F5F3F2] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#303033] transition hover:border-[#B8202A] hover:bg-[#B8202A] hover:text-[#FDFDFD]"
          >
            <span>Open Complete 16-Model Catalogue</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Interactive Filter Ribbon */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          <button
            type="button"
            onClick={() => setFilterCat('featured')}
            className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium transition ${
              filterCat === 'featured'
                ? 'bg-[#303033] text-[#FDFDFD]'
                : 'bg-[#F5F3F2] text-[#777271] hover:text-[#303033]'
            }`}
          >
            Curator’s Selection
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => setFilterCat(cat.slug)}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium transition ${
                filterCat === cat.slug
                  ? 'bg-[#303033] text-[#FDFDFD]'
                  : 'bg-[#F5F3F2] text-[#777271] hover:text-[#303033]'
              }`}
            >
              {cat.shortTitle}
            </button>
          ))}
        </div>

        {/* Product Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              variant="featured"
              onSelectProduct={onSelectProduct}
              onEnquireProduct={onEnquireProduct}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
