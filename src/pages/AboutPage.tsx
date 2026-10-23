import React from 'react';
import {
  ArrowUpRight,
  Building,
  Compass,
  Layers,
  MapPin,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { STORE_INFO, STUDIO_ASSETS } from '../data/catalogData';
import { NavigateFn } from '../types/navigation';
import { MaskTextReveal } from '../components/ui/MicroInteractions';

interface AboutPageProps {
  onNavigate: NavigateFn;
  onOpenConcierge: (mode?: 'retail' | 'wholesale' | 'warranty') => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigate,
  onOpenConcierge,
}) => {
  return (
    <div className="min-h-screen bg-[#FDFDFD] pt-28 sm:pt-36 pb-24">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        {/* Hero Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-16 border-b border-[#303033]/10 items-end">
          <div className="lg:col-span-8">
            <div className="font-tech text-[11px] uppercase tracking-[0.24em] text-[#B8202A] mb-3">
              ATELIER PROVENANCE // NEHRU NAGAR, TIRUPATI
            </div>
            <MaskTextReveal
              as="h1"
              lines={['Where Regional Trust Meets', 'Curated Technology.']}
              className="font-editorial text-4xl sm:text-6xl lg:text-[4.7rem] font-normal leading-[0.95] tracking-tight text-[#303033]"
            />
          </div>

          <div className="lg:col-span-4 space-y-3 border-l border-[#B8202A]/50 pl-6">
            <div className="font-tech text-[10px] uppercase tracking-[0.2em] text-[#777271]">
              ESTABLISHED LOCATION
            </div>
            <p className="text-sm font-medium text-[#303033]">{STORE_INFO.fullAddress}</p>
            <p className="font-tech text-xs text-[#B8202A]">{STORE_INFO.coordinates}</p>
          </div>
        </div>

        {/* Visual Editorial Composition */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 overflow-hidden rounded-[2.5rem] border border-white bg-[#E8E5E3] studio-shadow">
            <img
              src={STUDIO_ASSETS.showroomTirupatiEditorial}
              alt="Sunlit interior vitrines and travertine display pedestals"
              className="aspect-[16/10] w-full object-cover object-[92%_55%] scale-[1.36]"
            />
          </div>

          <div className="lg:col-span-5 space-y-6 lg:pl-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#F5F3F2] px-3.5 py-1.5 font-tech text-[10px] uppercase tracking-[0.18em] text-[#B8202A]">
              <Sparkles className="h-3.5 w-3.5 text-[#B8202A]" />
              <span>“The Future, Curated.”</span>
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#303033] leading-tight">
              An Andhra Hub for Consumer Audio, Grooming, Security &amp; Business Hardware.
            </h2>
            <p className="text-sm sm:text-base text-[#777271] leading-relaxed">
              Operating from the 1st floor at 5-1-6 Sarojini Devi Road in Nehru Nagar, Tirupati,
              Sri Gajender Traders serves both discerning individual buyers and regional retail
              counters across Andhra Pradesh.
            </p>
            <p className="text-sm text-[#777271] leading-relaxed">
              Our curated floor brings together wireless acoustics and party speakers from{' '}
              <strong>Portronics</strong>, <strong>boAt</strong>, <strong>Zebronics</strong>, and{' '}
              <strong>Boult</strong>; cordless grooming instruments from{' '}
              <strong>Bombay Shaving Company</strong>; surveillance systems from{' '}
              <strong>Hikvision</strong>; and commercial currency counting machines.
            </p>
          </div>
        </div>

        {/* Three Architectural Pillars + Regional Roots */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="rounded-[2rem] bg-[#F5F3F2] border border-[#B8202A]/35 p-7 sm:p-8 space-y-4">
            <Layers className="h-6 w-6 text-[#B8202A]" />
            <h3 className="font-editorial text-3xl text-[#303033]">Multi-Category Depth</h3>
            <p className="text-xs sm:text-sm text-[#777271] leading-relaxed">
              Rather than limiting buyers to a single vertical, we pair personal audio, desktop IT
              peripherals, personal grooming appliances, optical CCTV security, and cash-counter
              hardware in one accessible Tirupati location.
            </p>
          </div>

          <div className="rounded-[2rem] bg-[#F5F3F2] border border-[#B8202A]/35 p-7 sm:p-8 space-y-4">
            <ShieldCheck className="h-6 w-6 text-[#B8202A]" />
            <h3 className="font-editorial text-3xl text-[#303033]">Verified Specifications</h3>
            <p className="text-xs sm:text-sm text-[#777271] leading-relaxed">
              Every product carried is presented transparently with authentic model identifiers and
              direct price &amp; availability confirmation—whether you need a single unit or a
              wholesale carton.
            </p>
          </div>

          <div className="rounded-[2rem] bg-[#F5F3F2] border border-[#B8202A]/35 p-7 sm:p-8 space-y-4">
            <Building className="h-6 w-6 text-[#B8202A]" />
            <h3 className="font-editorial text-3xl text-[#303033]">Enduring Tirupati Trade</h3>
            <p className="text-xs sm:text-sm text-[#777271] leading-relaxed">
              {STORE_INFO.regionalHeritageNote}
            </p>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-20 rounded-[2.5rem] bg-white border border-[#B8202A]/45 p-8 sm:p-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8 studio-shadow-soft">
          <div className="space-y-2 max-w-xl">
            <div className="font-tech text-[10px] uppercase tracking-[0.22em] text-[#B8202A]">
              EXPERIENCE THE COLLECTION
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#303033]">
              Visit us in Nehru Nagar—or connect directly via WhatsApp.
            </h2>
            <p className="text-sm text-[#777271] flex items-center gap-2 pt-1">
              <MapPin className="h-4 w-4 text-[#B8202A] shrink-0" />
              <span>{STORE_INFO.fullAddress}</span>
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onNavigate({ page: 'catalogue', category: 'all', brand: 'all' })}
              className="inline-flex items-center gap-2 rounded-full bg-[#303033] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#FDFDFD] hover:bg-[#B8202A]"
            >
              <span>Browse Catalogue</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => onOpenConcierge('wholesale')}
              className="inline-flex items-center gap-2 rounded-full bg-[#B8202A] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#FDFDFD] hover:bg-[#961923]"
            >
              <span>Wholesale Enquiry</span>
            </button>
            <a
              href={STORE_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#303033]/16 px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#303033] hover:border-[#B8202A]"
            >
              <Compass className="h-4 w-4 text-[#B8202A]" />
              <span>Directions</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
