import React from 'react';
import {
  ArrowUpRight,
  Clock,
  Compass,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Tag,
} from 'lucide-react';
import {
  getLiveStoreStatus,
  STORE_INFO,
  STUDIO_ASSETS,
} from '../../data/catalogData';
import { NavigateFn } from '../../types/navigation';

interface TirupatiAtelierBannerProps {
  onNavigate: NavigateFn;
  onOpenConcierge: (mode?: 'retail' | 'wholesale' | 'warranty') => void;
}

export const TirupatiAtelierBanner: React.FC<TirupatiAtelierBannerProps> = ({
  onNavigate,
  onOpenConcierge,
}) => {
  const status = getLiveStoreStatus();

  return (
    <section
      aria-label="Tirupati Showroom & Visitor Concierge"
      className="relative bg-gradient-to-b from-[#FDFDFD] to-[#F5F3F2] py-20 sm:py-28 border-t border-[#B8202A]/30"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        {/* Showroom Architectural Card */}
        <div className="overflow-hidden rounded-[2.5rem] bg-[#FDFDFD] border border-[#B8202A]/40 studio-shadow">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Editorial Info */}
            <div className="lg:col-span-6 p-7 sm:p-11 lg:p-14 flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#F5F3F2] border border-[#B8202A]/35 px-3.5 py-1.5 font-tech text-[10px] uppercase tracking-[0.18em] text-[#B8202A]">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      status.isOpen ? 'bg-[#B8202A] animate-pulse' : 'bg-[#B8202A]'
                    }`}
                  />
                  <span>{status.label}</span>
                </div>

                <h2 className="font-editorial text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.02] text-[#303033]">
                  Visit Our Flagship Floor on <span className="italic text-[#B8202A]">Sarojini Devi Road.</span>
                </h2>

                <p className="text-sm sm:text-base text-[#777271] leading-relaxed">
                  Experience our curated electronics, personal grooming appliances, optical CCTV
                  systems, and commercial equipment in person at Nehru Nagar, Tirupati.
                </p>

                <div className="rounded-2xl bg-[#F5F3F2]/75 p-4 border border-[#303033]/8 space-y-2.5 text-xs">
                  <div className="flex items-start gap-2.5 text-[#303033] font-medium">
                    <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-[#B8202A]" />
                    <span>{STORE_INFO.fullAddress}</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-[#777271]">
                    <Clock className="h-4 w-4 shrink-0 mt-0.5 text-[#B8202A]" />
                    <span>
                      Mon, Wed–Sat: 9:30 AM – 9:30 PM &nbsp;·&nbsp;{' '}
                      <strong className="text-[#B8202A]">Tuesday: Open 24 Hours</strong> &nbsp;·&nbsp;
                      Sun: 9:30 AM – 2:00 PM
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={STORE_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#B8202A] px-6 py-3.5 text-xs font-medium uppercase tracking-[0.12em] text-[#FDFDFD] transition hover:bg-[#961923]"
                >
                  <Compass className="h-4 w-4" />
                  <span>Open Directions</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <button
                  type="button"
                  onClick={() => onNavigate({ page: 'about' })}
                  className="inline-flex items-center gap-2 rounded-full border border-[#303033]/16 bg-white px-6 py-3.5 text-xs font-medium uppercase tracking-[0.12em] text-[#303033] transition hover:border-[#B8202A]"
                >
                  <span>Read Our Heritage</span>
                </button>
              </div>
            </div>

            {/* Right Sunlit Showroom Gallery Visual (Cropped to right sunlit vitrines) */}
            <div className="lg:col-span-6 relative min-h-[320px] sm:min-h-[420px] overflow-hidden bg-[#E8E5E3]">
              <img
                src={STUDIO_ASSETS.showroomTirupatiEditorial}
                alt="Sunlit luxury electronics showroom vitrines and travertine display plinths"
                loading="lazy"
                className="h-full w-full object-cover object-[92%_55%] scale-[1.36]"
              />
              <div className="glass-porcelain absolute bottom-5 left-5 right-5 sm:left-auto sm:w-80 rounded-2xl p-4">
                <div className="font-tech text-[9px] uppercase tracking-[0.2em] text-[#777271]">
                  ATELIER COORDINATES
                </div>
                <div className="mt-1 font-editorial text-xl text-[#303033]">
                  1st Floor · 5-1-6 Nehru Nagar
                </div>
                <div className="font-tech text-[10px] text-[#B8202A] mt-0.5">
                  {STORE_INFO.coordinates}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Direct Visitor Intent Concierge Cards: Pricing, Warranty Assistance, Directions */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            type="button"
            onClick={() => onOpenConcierge('retail')}
            className="group text-left rounded-[2rem] bg-[#FDFDFD] border border-[#303033]/10 p-6 sm:p-7 transition hover:border-[#B8202A] studio-shadow-soft"
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#F5F3F2] text-[#B8202A]">
                <Tag className="h-4 w-4" />
              </span>
              <ArrowUpRight className="h-4 w-4 text-[#777271] group-hover:text-[#B8202A] transition" />
            </div>
            <h3 className="mt-5 font-editorial text-2xl sm:text-3xl text-[#303033]">
              Specific Product Pricing
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[#777271] leading-relaxed">
              Request live retail or multi-unit wholesale quotations for any Portronics, boAt,
              Zebronics, Boult, Hikvision, or Bombay Shaving Company model.
            </p>
            <div className="mt-4 inline-flex items-center gap-1.5 font-tech text-[10px] uppercase tracking-[0.16em] text-[#B8202A]">
              <MessageCircle className="h-3.5 w-3.5" />
              <span>Request Price on WhatsApp</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onOpenConcierge('warranty')}
            className="group text-left rounded-[2rem] bg-[#FDFDFD] border border-[#303033]/10 p-6 sm:p-7 transition hover:border-[#B8202A] studio-shadow-soft"
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#F5F3F2] text-[#B8202A]">
                <ShieldCheck className="h-4 w-4" />
              </span>
              <ArrowUpRight className="h-4 w-4 text-[#777271] group-hover:text-[#B8202A] transition" />
            </div>
            <h3 className="mt-5 font-editorial text-2xl sm:text-3xl text-[#303033]">
              Warranty Assistance
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[#777271] leading-relaxed">
              Need guidance on manufacturer service centers or purchase verification? Share your
              product and invoice details for prompt support guidance.
            </p>
            <div className="mt-4 inline-flex items-center gap-1.5 font-tech text-[10px] uppercase tracking-[0.16em] text-[#B8202A]">
              <span>Open Warranty Concierge</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onNavigate({ page: 'contact' })}
            className="group text-left rounded-[2rem] bg-[#FDFDFD] border border-[#303033]/10 p-6 sm:p-7 transition hover:border-[#B8202A] studio-shadow-soft"
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#F5F3F2] text-[#B8202A]">
                <Compass className="h-4 w-4" />
              </span>
              <ArrowUpRight className="h-4 w-4 text-[#777271] group-hover:text-[#B8202A] transition" />
            </div>
            <h3 className="mt-5 font-editorial text-2xl sm:text-3xl text-[#303033]">
              Showroom Directions &amp; Hours
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[#777271] leading-relaxed">
              Plan your visit to 1st Floor, 5-1-6 Sarojini Devi Rd, Nehru Nagar, Tirupati—including
              continuous 24-hour Tuesday access.
            </p>
            <div className="mt-4 inline-flex items-center gap-1.5 font-tech text-[10px] uppercase tracking-[0.16em] text-[#B8202A]">
              <span>View Schedule &amp; Route</span>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};
