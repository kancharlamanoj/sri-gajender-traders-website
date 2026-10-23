import React, { useState } from 'react';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { ProductItem } from '../../data/catalogData';
import { BrandWordmark } from '../ui/BrandWordmark';
import { TiltSurface } from '../ui/MicroInteractions';

interface ProductCardProps {
  product: ProductItem;
  onSelectProduct: (product: ProductItem) => void;
  onEnquireProduct: (product: ProductItem) => void;
  variant?: 'default' | 'featured';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onEnquireProduct,
  variant = 'default',
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <TiltSurface maxTilt={3.5} cursorLabel="INSPECT" className="h-full">
      <article
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => onSelectProduct(product)}
        className={`group relative flex h-full cursor-pointer flex-col justify-between overflow-hidden rounded-[2rem] border border-[#303033]/10 bg-[#FDFDFD] transition-shadow duration-500 hover:shadow-[0_32px_70px_-24px_rgba(48,48,51,0.14)] ${
          variant === 'featured' ? 'p-5 sm:p-6' : 'p-4 sm:p-5'
        }`}
      >
        {/* Top Animated Thin Metallic Indicator */}
        <div
          aria-hidden="true"
          className={`absolute top-0 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-[#B8202A] via-[#B8202A] to-[#F5F3F2] transition-transform duration-500 ease-out ${
            hovered ? 'scale-x-100' : 'scale-x-0'
          }`}
        />

        <div>
          {/* Index & Brand Header */}
          <div className="mb-3.5 flex items-center justify-between gap-2">
            <span className="font-tech text-[10px] uppercase tracking-[0.2em] text-[#777271]">
              {product.indexCode}
            </span>
            <BrandWordmark brandId={product.brandId} size="sm" />
          </div>

          {/* Layered Image Stage with Secondary Hover Crossfade & Technical Overlay */}
          <div className="relative overflow-hidden rounded-2xl bg-[#F5F3F2] aspect-[4/3.6]">
            {/* Primary Studio Image */}
            <img
              src={product.primaryImage}
              alt={`${product.name} (${product.model})`}
              loading="lazy"
              className={`h-full w-full object-cover transition-all duration-700 ease-out ${
                hovered ? 'scale-105 opacity-0' : 'scale-100 opacity-100'
              }`}
            />

            {/* Secondary Perspective Image Fading Into View */}
            <img
              src={product.secondaryImage}
              alt={`${product.name} alternate view`}
              loading="lazy"
              className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out ${
                hovered ? 'scale-105 opacity-100' : 'scale-95 opacity-0'
              }`}
            />

            {/* Model Pill */}
            <div className="absolute top-3 left-3 rounded-full bg-[#FDFDFD]/90 backdrop-blur-md border border-white/80 px-2.5 py-1 font-tech text-[9px] uppercase tracking-[0.14em] text-[#303033]">
              MODEL: {product.model}
            </div>

            {/* Refined Technical Details Overlay on Hover */}
            <div
              className={`pointer-events-none absolute inset-x-3 bottom-3 rounded-xl glass-porcelain p-3 transition-all duration-400 ease-out ${
                hovered
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-3 opacity-0'
              }`}
            >
              <div className="font-tech text-[9px] uppercase tracking-[0.16em] text-[#B8202A] mb-1">
                VERIFIED SPECIFICATIONS
              </div>
              <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                {product.verifiedSpecs.slice(0, 2).map((spec) => (
                  <div key={spec.label} className="min-w-0">
                    <div className="font-tech text-[8px] uppercase text-[#777271] truncate">
                      {spec.label}
                    </div>
                    <div className="text-[11px] font-medium text-[#303033] truncate">
                      {spec.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Product Editorial Copy */}
          <div className="mt-4 space-y-1.5">
            <div className="font-tech text-[10px] uppercase tracking-[0.16em] text-[#777271]">
              {product.categoryLabel}
            </div>
            <h3 className="font-editorial text-2xl sm:text-[1.7rem] font-medium leading-[1.12] text-[#303033] group-hover:text-[#B8202A] transition-colors">
              {product.name}
            </h3>
            <p className="line-clamp-2 text-xs sm:text-[13px] leading-relaxed text-[#777271]">
              {product.tagline}
            </p>
          </div>
        </div>

        {/* Footer Row — Non-Disruptive Enquiry Action Reveal */}
        <div className="mt-5 pt-3.5 border-t border-[#303033]/8 flex items-center justify-between gap-2 min-h-[42px]">
          <div className="font-tech text-[10px] uppercase tracking-[0.16em] text-[#B8202A] font-medium">
            Enquire for Price
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onEnquireProduct(product);
              }}
              aria-label={`Enquire via WhatsApp for ${product.name}`}
              className={`inline-flex items-center gap-1.5 rounded-full bg-[#B8202A] px-3.5 py-1.5 text-[11px] font-medium text-[#FDFDFD] transition-all duration-300 hover:bg-[#961923] ${
                hovered
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-100 sm:opacity-0 sm:translate-x-2 sm:group-focus-within:opacity-100 sm:group-focus-within:translate-x-0'
              }`}
            >
              <MessageCircle className="h-3 w-3" />
              <span>Enquire</span>
            </button>

            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#303033]/12 bg-[#F5F3F2] text-[#303033] transition group-hover:border-[#B8202A] group-hover:bg-white">
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </article>
    </TiltSurface>
  );
};
