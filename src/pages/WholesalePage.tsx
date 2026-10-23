import React from 'react';
import { ArrowUpRight, Building2, Hotel, Shield, Store } from 'lucide-react';
import { WholesaleServiceSection } from '../components/home/WholesaleServiceSection';
import { CATEGORIES } from '../data/catalogData';
import { NavigateFn } from '../types/navigation';

interface WholesalePageProps {
  onNavigate: NavigateFn;
}

export const WholesalePage: React.FC<WholesalePageProps> = ({ onNavigate }) => {
  const SECTORS = [
    {
      icon: Store,
      title: 'Mobile & Electronics Retailers',
      body: 'Regular supply of fast-moving TWS earbuds, portable Bluetooth speakers, wireless mice, keyboards, and PD chargers.',
    },
    {
      icon: Hotel,
      title: 'Hospitality & Guest Houses',
      body: 'CCTV turret/bullet camera units, cash-desk currency note counters, and room/event audio hardware across Tirupati.',
    },
    {
      icon: Building2,
      title: 'Offices & Educational Campuses',
      body: 'Zebronics wireless desktop combos, Portronics computer peripherals, and multi-camera surveillance hardware.',
    },
    {
      icon: Shield,
      title: 'Security Integrators & Salons',
      body: 'Hikvision coaxial-audio cameras for installers, plus Bombay Shaving Company cordless trimmers for personal care counters.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      <WholesaleServiceSection isStandalonePage />

      <section className="bg-[#F5F3F2] py-20 sm:py-28 border-t border-[#B8202A]/35">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
          <div className="max-w-2xl mb-12">
            <div className="font-tech text-[11px] uppercase tracking-[0.22em] text-[#B8202A]">
              COMMERCIAL SECTORS SERVED
            </div>
            <h2 className="mt-2 font-editorial text-4xl sm:text-5xl text-[#303033]">
              Tailored Supply Across Andhra Pradesh
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SECTORS.map((sec) => {
              const Icon = sec.icon;
              return (
                <div
                  key={sec.title}
                  className="rounded-[2rem] bg-[#FDFDFD] border border-[#303033]/10 p-7 space-y-3 studio-shadow-soft"
                >
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#F5F3F2] text-[#B8202A]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-editorial text-2xl font-medium text-[#303033]">
                    {sec.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#777271] leading-relaxed">{sec.body}</p>
                </div>
              );
            })}
          </div>

          {/* Quick Category B2B Index */}
          <div className="mt-14 rounded-[2rem] bg-[#FDFDFD] border border-[#B8202A]/35 p-6 sm:p-8">
            <div className="font-tech text-[10px] uppercase tracking-[0.2em] text-[#777271] mb-4">
              INSPECT WHOLESALE ASSORTMENTS BY DISCIPLINE
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => onNavigate({ page: 'catalogue', category: cat.slug })}
                  className="flex items-center justify-between rounded-xl border border-[#303033]/10 bg-[#F5F3F2]/60 px-4 py-3 text-left transition hover:border-[#B8202A] hover:bg-white"
                >
                  <div>
                    <div className="font-tech text-[9px] text-[#777271]">
                      SERIES {cat.index}
                    </div>
                    <div className="text-sm font-medium text-[#303033]">{cat.name}</div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-[#B8202A]" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
