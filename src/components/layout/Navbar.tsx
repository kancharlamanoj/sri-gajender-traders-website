import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowUpRight,
  Compass,
  LayoutDashboard,
  Menu,
  MessageCircle,
  Search,
  ShieldCheck,
  UserCheck,
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

const NAV_ITEMS: { id: PageRoute; label: string }[] = [
  { id: 'home', label: 'Flagship' },
  { id: 'catalogue', label: 'Collection' },
  { id: 'brands', label: 'Brands' },
  { id: 'wholesale', label: 'Wholesale' },
  { id: 'about', label: 'About Us' },
  { id: 'contact', label: 'Contact Us' },
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

            {/* Center Modern Clean Navigation (No Numbers) */}
            <nav aria-label="Primary Navigation" className="hidden lg:flex items-center gap-1.5">
              {NAV_ITEMS.map((item) => {
                const active =
                  currentPage === item.id ||
                  (item.id === 'catalogue' && currentPage === 'product');
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onNavigate({ page: item.id })}
                    className={`relative rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-all ${
                      active
                        ? 'text-white bg-[#B8202A] shadow-xs'
                        : 'text-[#303033] hover:text-[#B8202A] hover:bg-[#F5F3F2]'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Right Actions: Search, Admin Portal Pill, Price Concierge */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={onOpenQuickSearch}
                aria-label="Quick Search Collection (⌘K)"
                title="Quick Search (⌘K)"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#303033]/12 bg-[#FDFDFD] text-[#303033] transition hover:border-[#B8202A] hover:bg-[#F5F3F2]"
              >
                <Search className="h-3.5 w-3.5" />
              </button>

              {/* Dedicated Admin Profile & Management Button */}
              <button
                type="button"
                onClick={() => onNavigate({ page: 'admin' })}
                aria-label="Admin Operations Console"
                title="Admin Management Console"
                className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold border transition shadow-xs ${
                  currentPage === 'admin'
                    ? 'border-[#B8202A] bg-[#B8202A] text-white shadow-md shadow-[#B8202A]/20'
                    : 'border-[#303033]/15 bg-white text-[#303033] hover:border-[#B8202A] hover:text-[#B8202A] hover:bg-[#F5F3F2]'
                }`}
              >
                <div className="w-5 h-5 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-[10px] font-bold">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#B8202A]" />
                </div>
                <span>Admin</span>
              </button>

              <MagneticButton
                onClick={() => onOpenConcierge('retail')}
                cursorLabel="ENQUIRE"
                className="hidden sm:inline-flex items-center gap-2 rounded-full bg-[#303033] hover:bg-[#B8202A] px-4 py-2 text-xs font-medium text-[#FDFDFD] shadow-xs transition"
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
                Store Navigation
              </div>
              {NAV_ITEMS.map((item, i) => (
                <motion.button
                  key={item.id}
                  type="button"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.045 }}
                  onClick={() => onNavigate({ page: item.id })}
                  className="flex w-full items-center justify-between border-b border-[#303033]/10 py-3.5 text-left"
                >
                  <span className="font-editorial text-2xl sm:text-3xl font-medium text-[#303033]">
                    {item.label}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-[#777271]" />
                </motion.button>
              ))}

              {/* Mobile Admin Profile Link */}
              <motion.button
                type="button"
                onClick={() => onNavigate({ page: 'admin' })}
                className="flex w-full items-center justify-between border-b border-[#303033]/10 py-4 text-left text-[#B8202A] mt-2 bg-red-50/60 px-3 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xs">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block font-semibold text-sm text-[#303033]">
                      Admin Dashboard
                    </span>
                    <span className="block text-xs text-[#777271]">
                      Store management &amp; settings
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-[#B8202A]" />
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
