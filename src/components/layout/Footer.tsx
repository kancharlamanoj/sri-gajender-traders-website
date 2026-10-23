import React from 'react';
import { ArrowUpRight, Clock, MapPin, MessageCircle } from 'lucide-react';
import {
  BRAND_PROFILES,
  CATEGORIES,
  getLiveStoreStatus,
  STORE_INFO,
} from '../../data/catalogData';
import { NavigateFn } from '../../types/navigation';

interface FooterProps {
  onNavigate: NavigateFn;
  onOpenConcierge: (mode?: 'retail' | 'wholesale' | 'warranty') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenConcierge }) => {
  const status = getLiveStoreStatus();

  return (
    <footer className="relative overflow-hidden bg-[#F5F3F2] border-t border-[#B8202A]/35 pt-20 pb-12 text-[#303033]">
      <div className="metallic-hairline absolute top-0 left-0 right-0 h-[1px]" />

      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        {/* Top Editorial Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-16 border-b border-[#303033]/10">
          <div className="lg:col-span-7 space-y-4">
            <div className="font-tech text-[11px] uppercase tracking-[0.22em] text-[#777271]">
              Sri Gajender Traders · Digital Flagship 2.0
            </div>
            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.04] tracking-tight text-[#303033]">
              The Future, <span className="italic text-[#B8202A]">Curated</span> in Tirupati.
            </h2>
            <p className="max-w-xl text-sm sm:text-base text-[#777271] leading-relaxed">
              {STORE_INFO.roleStatement}
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl bg-[#FDFDFD] p-6 sm:p-8 border border-[#B8202A]/30 studio-shadow-soft">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#F5F3F2] px-3 py-1 text-xs font-medium text-[#B8202A]">
                <span
                  className={`h-2 w-2 rounded-full ${
                    status.isOpen ? 'bg-[#B8202A] animate-pulse' : 'bg-[#B8202A]'
                  }`}
                />
                <span>{status.label}</span>
              </div>
              <div className="flex items-start gap-2.5 pt-1 text-sm text-[#303033]">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-[#B8202A]" />
                <span>{STORE_INFO.fullAddress}</span>
              </div>
              <div className="flex items-center gap-2.5 pt-1 text-sm font-medium text-[#303033]">
                <span className="text-[#B8202A] font-tech text-xs uppercase font-bold">Call / WhatsApp:</span>
                <a href="tel:8179106524" className="font-tech text-[#B8202A] hover:underline font-bold">
                  +91 8179106524
                </a>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onOpenConcierge('retail')}
                className="inline-flex items-center gap-2 rounded-full bg-[#B8202A] px-5 py-2.5 text-xs font-medium text-[#FDFDFD] transition hover:bg-[#961923]"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                <span>Enquire for Pricing</span>
              </button>
              <a
                href={STORE_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-[#303033]/15 bg-white px-4 py-2.5 text-xs font-medium text-[#303033] transition hover:border-[#B8202A]"
              >
                <span>Get Directions</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-[#777271]" />
              </a>
            </div>
          </div>
        </div>

        {/* Directory Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 py-14 border-b border-[#303033]/10">
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-tech text-[10px] uppercase tracking-[0.22em] text-[#777271]">
              01 // Collections
            </h3>
            <ul className="space-y-2.5">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <button
                    type="button"
                    onClick={() => onNavigate({ page: 'catalogue', category: cat.slug })}
                    className="editorial-underline text-sm text-[#303033] hover:text-[#303033] transition-colors text-left"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-tech text-[10px] uppercase tracking-[0.22em] text-[#777271]">
              02 // Brands Carried
            </h3>
            <ul className="space-y-2.5">
              {BRAND_PROFILES.map((brand) => (
                <li key={brand.id}>
                  <button
                    type="button"
                    onClick={() => onNavigate({ page: 'brands', brand: brand.id })}
                    className="editorial-underline text-sm text-[#303033] hover:text-[#303033] transition-colors text-left"
                  >
                    {brand.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-tech text-[10px] uppercase tracking-[0.22em] text-[#777271]">
              03 // Flagship
            </h3>
            <ul className="space-y-2.5">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate({ page: 'home' })}
                  className="editorial-underline text-sm text-[#303033] hover:text-[#303033]"
                >
                  Campaign Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate({ page: 'catalogue', category: 'all', brand: 'all' })}
                  className="editorial-underline text-sm text-[#303033] hover:text-[#303033]"
                >
                  Full Catalogue
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate({ page: 'wholesale' })}
                  className="editorial-underline text-sm text-[#303033] hover:text-[#303033]"
                >
                  Wholesale Service
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate({ page: 'about' })}
                  className="editorial-underline text-sm text-[#303033] hover:text-[#303033]"
                >
                  Tirupati Heritage
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate({ page: 'contact' })}
                  className="editorial-underline text-sm text-[#303033] hover:text-[#303033]"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate({ page: 'admin' })}
                  className="editorial-underline text-sm text-[#B8202A] hover:text-[#961923] font-medium"
                >
                  Admin Operations Console
                </button>
              </li>
              <li>
                <a
                  href={STORE_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 editorial-underline text-sm text-[#B8202A] font-medium"
                >
                  <span>Instagram {STORE_INFO.instagramHandle}</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <h3 className="font-tech text-[10px] uppercase tracking-[0.22em] text-[#777271] flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-[#B8202A]" />
              <span>04 // Showroom Hours (IST)</span>
            </h3>
            <div className="rounded-2xl bg-[#FDFDFD]/85 p-4 border border-[#303033]/8 space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-[#303033]/6">
                <span className="text-[#777271]">Mon, Wed – Sat</span>
                <span className="font-tech text-[#303033]">9:30 AM – 9:30 PM</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#303033]/6 font-medium text-[#B8202A]">
                <span>Tuesday</span>
                <span className="font-tech">Open 24 Hours</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#777271]">Sunday</span>
                <span className="font-tech text-[#303033]">9:30 AM – 2:00 PM</span>
              </div>
            </div>
            <p className="text-[11px] leading-relaxed text-[#777271]">
              All brand names and product models referenced belong to their respective manufacturers.
              Contact Sri Gajender Traders directly for current pricing, live inventory, and applicable
              manufacturer warranty procedures.
            </p>
          </div>
        </div>

        {/* Oversized Architectural Signature */}
        <div className="pt-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="select-none">
            <div className="font-editorial text-[11vw] sm:text-[8.5vw] lg:text-[6.8rem] leading-[0.86] tracking-[-0.03em] text-[#303033]/90">
              SRI GAJENDER
            </div>
            <div className="mt-1 font-tech text-[10px] sm:text-xs uppercase tracking-[0.34em] text-[#777271]">
              SAROJINI DEVI RD · NEHRU NAGAR · TIRUPATI 517501
            </div>
          </div>

          <div className="font-tech text-[11px] text-[#777271] md:text-right space-y-1">
            <div>{STORE_INFO.coordinates}</div>
            <div>© {new Date().getFullYear()} Sri Gajender Traders. All rights reserved.</div>
          </div>
        </div>
      </div>
    </footer>
  );
};
