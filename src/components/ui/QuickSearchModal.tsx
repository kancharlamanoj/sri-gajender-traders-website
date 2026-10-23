import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Compass, Search, X } from 'lucide-react';
import {
  BRAND_PROFILES,
  PRODUCTS,
  ProductItem,
  STORE_INFO,
} from '../../data/catalogData';
import { NavigateFn } from '../../types/navigation';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: NavigateFn;
  onSelectProduct: (product: ProductItem) => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 60);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  const matchedProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PRODUCTS.slice(0, 5);
    return PRODUCTS.filter((p) =>
      `${p.name} ${p.brandName} ${p.model} ${p.categoryLabel} ${p.tagline}`
        .toLowerCase()
        .includes(q)
    ).slice(0, 6);
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Quick Search Flagship Index"
          className="fixed inset-0 z-[105] flex items-start justify-center pt-16 sm:pt-24 px-4"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#303033]/30 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.19, 1, 0.22, 1] }}
            className="relative z-10 w-full max-w-2xl overflow-hidden rounded-3xl bg-[#FDFDFD] border border-[#B8202A]/45 studio-shadow"
          >
            {/* Search Input Header */}
            <div className="flex items-center gap-3 border-b border-[#303033]/10 px-5 py-4 bg-white">
              <Search className="h-4 w-4 text-[#B8202A] shrink-0" />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search models, brands, or specs (e.g. Nirvana Ion, Hikvision, SoundDrum)..."
                className="flex-1 bg-transparent text-sm text-[#303033] placeholder:text-[#777271] focus:outline-none"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close quick search"
                className="rounded-full p-1.5 text-[#777271] hover:bg-[#F5F3F2] hover:text-[#303033]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-[68vh] overflow-y-auto p-5 space-y-5">
              {/* Brand Pills */}
              <div>
                <div className="font-tech text-[9px] uppercase tracking-[0.22em] text-[#777271] mb-2.5">
                  JUMP TO BRAND HOUSE
                </div>
                <div className="flex flex-wrap gap-2">
                  {BRAND_PROFILES.map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => {
                        onClose();
                        onNavigate({ page: 'brands', brand: b.id });
                      }}
                      className="rounded-full bg-[#F5F3F2] border border-[#303033]/10 px-3 py-1 text-xs font-medium text-[#303033] hover:border-[#B8202A]"
                    >
                      {b.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Matched Products */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="font-tech text-[9px] uppercase tracking-[0.22em] text-[#777271]">
                    {query.trim() ? 'MATCHING HARDWARE' : 'CURATED MODELS'}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onNavigate({
                        page: 'catalogue',
                        searchQuery: query.trim(),
                        category: 'all',
                        brand: 'all',
                      });
                    }}
                    className="font-tech text-[10px] text-[#B8202A] hover:underline"
                  >
                    Open Full Catalogue →
                  </button>
                </div>

                {matchedProducts.length === 0 ? (
                  <p className="py-4 text-xs text-[#777271]">
                    No direct match for “{query}”. Try searching by brand or open the full
                    catalogue.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {matchedProducts.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          onClose();
                          onSelectProduct(item);
                        }}
                        className="w-full flex items-center justify-between gap-3 rounded-2xl bg-white border border-[#303033]/8 p-3 text-left transition hover:border-[#B8202A]"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={item.primaryImage}
                            alt={item.name}
                            className="h-12 w-12 rounded-xl object-cover shrink-0"
                          />
                          <div className="min-w-0">
                            <div className="font-tech text-[9px] text-[#777271]">
                              {item.brandName} · MODEL: {item.model}
                            </div>
                            <div className="truncate font-editorial text-xl font-medium text-[#303033]">
                              {item.name}
                            </div>
                          </div>
                        </div>
                        <ArrowUpRight className="h-4 w-4 text-[#777271] shrink-0" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Directions Footer */}
              <div className="pt-3 border-t border-[#303033]/10 flex items-center justify-between text-xs text-[#777271]">
                <span className="truncate">{STORE_INFO.fullAddress}</span>
                <a
                  href={STORE_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center gap-1 font-medium text-[#B8202A]"
                >
                  <Compass className="h-3.5 w-3.5" />
                  <span>Maps</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
