import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowUpRight,
  Compass,
  Menu,
  MessageCircle,
  Search,
  ShieldCheck,
  X,
} from 'lucide-react';
import { getLiveStoreStatus, STORE_INFO } from '../../data/catalogData';
import { NavigateFn, PageRoute } from '../../types/navigation';
import { MagneticButton } from '../ui/MicroInteractions';

interface NavbarProps {
  currentPage: PageRoute;
  onNavigate: NavigateFn;
  onOpenConcierge: (mode?: 'retail' | 'wholesale' | 'warranty') => void;
  onOpenQuickSearch: () => void;
}

const NAV_ITEMS: { id: PageRoute; label: string; index: string }[] = [
  { id: 'home', label: 'Flagship', index: '01' },
  { id: 'catalogue', label: 'Collection', index: '02' },
  { id: 'brands', label: 'Brands', index: '03' },
  { id: 'wholesale', label: 'Wholesale', index: '04' },
  { id: 'about', label: 'Atelier', index: '05' },
  { id: 'contact', label: 'Visit & Assist', index: '06' },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenConcierge,
  onOpenQuickSearch,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const storeStatus = getLiveStoreStatus();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 28);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [currentPage]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${
          scrolled ? 'py-2.5' : 'py-4 sm:py-5'
        }`}
      >
        <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
          <div
            className={`flex items-center justify-between rounded-full px-4 sm:px-6 py-2.5 transition-all duration-500 ${
              scrolled
                ? 'glass-porcelain border border-[#B8202A]/30 shadow-[0_14px_40px_-16px_rgba(48,48,51,0.1)]'
                : 'bg-[#FDFDFD]/65 backdrop-blur-md border border-white/80'
            }`}
          >
            {/* Brand Emblem */}
            <button
              type="button"
              onClick={() => onNavigate({ page: 'home' })}
              className="group flex items-center gap-3 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B8202A]"
            >
              <div className="relative flex h-9 w-9 items-center justify-center rounded-full border border-[#B8202A]/55 bg-[#FDFDFD] shadow-xs transition-transform duration-500 group-hover:scale-105">
                <span className="font-editorial text-lg font-semibold tracking-tight text-[#303033]">
                  SG
                </span>
                <span
                  aria-hidden="true"
                  className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-[#B8202A] ring-2 ring-[#FDFDFD]"
                />
              </div>
              <div className="leading-none">
                <span className="block font-editorial text-lg sm:text-xl font-semibold tracking-[0.02em] text-[#303033]">
                  Sri Gajender Traders
                </span>
                <span className="mt-0.5 hidden sm:block font-tech text-[9px] uppercase tracking-[0.22em] text-[#777271]">
                  Tirupati · The Future, Curated
                </span>
              </div>
            </button>

            {/* Center Compact Navigation */}
            <nav aria-label="Primary Navigation" className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const active =
                  currentPage === item.id ||
                  (item.id === 'catalogue' && currentPage === 'product');
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onNavigate({ page: item.id })}
                    className={`relative rounded-full px-3.5 py-1.5 text-xs font-medium tracking-[0.04em] transition-colors ${
                      active
                        ? 'text-[#303033]'
                        : 'text-[#777271] hover:text-[#303033]'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-pill-active"
                        transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                        className="absolute inset-0 -z-10 rounded-full bg-[#F5F3F2] border border-[#B8202A]/35"
                      />
                    )}
                    <span className="font-tech text-[9px] text-[#777271] mr-1">
                      {item.index}
                    </span>
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onNavigate({ page: 'contact' })}
                title={storeStatus.sublabel}
                className="hidden xl:inline-flex items-center gap-2 rounded-full border border-[#303033]/10 bg-[#FDFDFD]/90 px-3 py-1.5 text-[11px] text-[#303033] transition hover:border-[#B8202A]/60"
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    storeStatus.isOpen ? 'bg-[#B8202A] animate-pulse' : 'bg-[#B8202A]'
                  }`}
                />
                <span className="font-tech text-[10px] tracking-[0.08em]">
                  {storeStatus.isOpen ? 'OPEN · TIRUPATI' : 'NEHRU NAGAR'}
                </span>
              </button>

              <button
                type="button"
                onClick={onOpenQuickSearch}
                aria-label="Quick Search Collection (⌘K)"
                title="Quick Search (⌘K)"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#303033]/12 bg-[#FDFDFD] text-[#303033] transition hover:border-[#B8202A] hover:bg-[#F5F3F2]"
              >
                <Search className="h-3.5 w-3.5" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate({ page: 'admin' })}
                aria-label="Admin Operations Console"
                title="Admin Operations Console"
                className={`flex h-9 w-9 items-center justify-center rounded-full border transition ${
                  currentPage === 'admin'
                    ? 'border-[#B8202A] bg-[#B8202A] text-white shadow-sm'
                    : 'border-[#303033]/12 bg-[#FDFDFD] text-[#303033] hover:border-[#B8202A] hover:bg-[#F5F3F2]'
                }`}
              >
                <ShieldCheck className="h-4 w-4" />
              </button>

              <MagneticButton
                onClick={() => onOpenConcierge('retail')}
                cursorLabel="ENQUIRE"
                className="hidden sm:inline-flex items-center gap-2 rounded-full bg-[#B8202A] px-4 py-2 text-xs font-medium text-[#FDFDFD] shadow-xs transition hover:bg-[#961923]"
              >
                <MessageCircle className="h-3.5 w-3.5 text-[#F5F3F2]" />
                <span>Price Concierge</span>
              </MagneticButton>

              <button
                type="button"
                onClick={() => setMobileOpen((v) => !v)}
                aria-expanded={mobileOpen}
                aria-label="Toggle Menu"
                className="flex lg:hidden h-9 w-9 items-center justify-center rounded-full border border-[#303033]/15 bg-[#FDFDFD] text-[#303033]"
              >
                {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Porcelain Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.32, ease: [0.19, 1, 0.22, 1] }}
            className="fixed inset-0 z-[55] flex flex-col justify-between bg-[#FDFDFD] px-6 pt-24 pb-8 overflow-y-auto lg:hidden"
          >
            <div className="space-y-2">
              <div className="font-tech text-[10px] uppercase tracking-[0.22em] text-[#777271] mb-4">
                Navigation Directory // 01–06
              </div>
              {NAV_ITEMS.map((item, i) => (
                <motion.button
                  key={item.id}
                  type="button"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.045 }}
                  onClick={() => onNavigate({ page: item.id })}
                  className="flex w-full items-baseline justify-between border-b border-[#303033]/10 py-3.5 text-left"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-tech text-xs text-[#B8202A]">{item.index}</span>
                    <span className="font-editorial text-3xl font-medium text-[#303033]">
                      {item.label}
                    </span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-[#777271]" />
                </motion.button>
              ))}

              <motion.button
                type="button"
                onClick={() => onNavigate({ page: 'admin' })}
                className="flex w-full items-baseline justify-between border-b border-[#303033]/10 py-3.5 text-left text-[#B8202A]"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-tech text-xs text-[#B8202A]">ADM</span>
                  <span className="font-editorial text-3xl font-medium">
                    Admin Console
                  </span>
                </div>
                <ShieldCheck className="h-4 w-4 text-[#B8202A]" />
              </motion.button>
            </div>

            <div className="mt-8 rounded-2xl bg-[#F5F3F2] p-5 border border-[#B8202A]/30 space-y-4">
              <div className="flex items-center gap-2 text-xs font-medium text-[#B8202A]">
                <span className="h-2 w-2 rounded-full bg-[#B8202A]" />
                <span>{storeStatus.label}</span>
              </div>
              <p className="text-xs text-[#777271] leading-relaxed">
                {STORE_INFO.fullAddress}
              </p>
              <div className="flex flex-wrap gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    onOpenConcierge('retail');
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#B8202A] px-4 py-2.5 text-xs font-medium text-[#FDFDFD]"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  <span>WhatsApp Enquiry</span>
                </button>
                <a
                  href={STORE_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[#303033]/15 bg-white px-4 py-2.5 text-xs font-medium text-[#303033]"
                >
                  <Compass className="h-3.5 w-3.5 text-[#B8202A]" />
                  <span>Directions</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
