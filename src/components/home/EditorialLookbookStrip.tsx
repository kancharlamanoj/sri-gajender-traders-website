import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { STUDIO_ASSETS } from '../../data/catalogData';
import { NavigateFn } from '../../types/navigation';

interface EditorialLookbookStripProps {
  onNavigate: NavigateFn;
}

const LOOKBOOK_PLATES = [
  {
    plate: 'PLATE 01',
    title: 'Nirvana ANC Silhouette',
    caption: 'boAt · Up to 32dB Active Noise Cancellation · 120H Playback',
    aspect: 'w-[290px] sm:w-[370px] aspect-[4/4.6]',
    image: STUDIO_ASSETS.heroSculpturalAudio,
    action: { page: 'product' as const, productId: 'boat-nirvana-ion-anc' },
  },
  {
    plate: 'PLATE 02',
    title: 'Fluted Acoustic Projection',
    caption: 'Portronics SoundDrum 1 & Zebronics Sound Feast · TWS Stereo',
    aspect: 'w-[340px] sm:w-[480px] aspect-[16/11]',
    image: STUDIO_ASSETS.collectionPartySpeakers,
    action: { page: 'catalogue' as const, category: 'speakers-entertainment' as const },
  },
  {
    plate: 'PLATE 03',
    title: 'Cordless Stainless Ritual',
    caption: 'Bombay Shaving Company · Power Play NXT · 90-Min Runtime',
    aspect: 'w-[280px] sm:w-[340px] aspect-[3/4]',
    image: STUDIO_ASSETS.collectionGrooming,
    action: { page: 'product' as const, productId: 'bsc-power-play-nxt' },
  },
  {
    plate: 'PLATE 04',
    title: 'Workspace Tactility',
    caption: 'Zebronics Companion 202 & Portronics Toad 23 / Adapto 20W PD',
    aspect: 'w-[340px] sm:w-[470px] aspect-[16/10.5]',
    image: STUDIO_ASSETS.collectionAccessories,
    action: { page: 'catalogue' as const, category: 'accessories' as const },
  },
  {
    plate: 'PLATE 05',
    title: 'Coaxial Optical Vigilance',
    caption: 'Hikvision DS-2CE76D0T-ITPFS & DS-2CE16D0T-ITPFS · 1080p Smart IR',
    aspect: 'w-[300px] sm:w-[390px] aspect-[4/4.2]',
    image: STUDIO_ASSETS.collectionSecurity,
    action: { page: 'catalogue' as const, category: 'cctv-security' as const },
  },
  {
    plate: 'PLATE 06',
    title: 'Executive Cash-Desk Precision',
    caption: 'Automated Loose-Note Commercial Currency Counters · Tirupati B2B',
    aspect: 'w-[330px] sm:w-[440px] aspect-[16/11]',
    image: STUDIO_ASSETS.collectionBusiness,
    action: { page: 'product' as const, productId: 'commercial-currency-counter' },
  },
];

export const EditorialLookbookStrip: React.FC<EditorialLookbookStripProps> = ({
  onNavigate,
}) => {
  const prefersReduced = useReducedMotion();
  const wrapperRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start end', 'end start'],
  });

  const gentleDrift = useTransform(scrollYProgress, [0, 1], ['2%', '-6%']);

  const scrollTrack = (dir: -1 | 1) => {
    if (!trackRef.current) return;
    trackRef.current.scrollBy({
      left: dir * 420,
      behavior: 'smooth',
    });
  };

  return (
    <section
      ref={wrapperRef}
      aria-label="Horizontal Editorial Lookbook"
      className="relative bg-[#F5F3F2] py-20 sm:py-28 border-y border-[#B8202A]/30 overflow-hidden"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <div className="font-tech text-[11px] uppercase tracking-[0.24em] text-[#B8202A] mb-2">
            EDITORIAL FILMSTRIP // PLATES 01–06
          </div>
          <h2 className="font-editorial text-4xl sm:text-5xl text-[#303033] leading-none">
            Campaign <span className="italic text-[#B8202A]">Lookbook.</span>
          </h2>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => scrollTrack(-1)}
            aria-label="Scroll lookbook left"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#303033]/15 bg-[#FDFDFD] text-[#303033] transition hover:border-[#B8202A] hover:bg-[#B8202A] hover:text-[#FDFDFD]"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollTrack(1)}
            aria-label="Scroll lookbook right"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#303033]/15 bg-[#FDFDFD] text-[#303033] transition hover:border-[#B8202A] hover:bg-[#B8202A] hover:text-[#FDFDFD]"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Varied-Aspect Editorial Gallery */}
      <motion.div style={prefersReduced ? undefined : { x: gentleDrift }}>
        <div
          ref={trackRef}
          className="flex items-end gap-6 sm:gap-8 overflow-x-auto px-4 sm:px-8 lg:px-12 pb-6 snap-x snap-mandatory"
        >
          {LOOKBOOK_PLATES.map((item) => (
            <div
              key={item.plate}
              onClick={() => onNavigate(item.action)}
              data-cursor="VIEW"
              className="group shrink-0 snap-start cursor-pointer"
            >
              <div
                className={`relative overflow-hidden rounded-[2rem] border border-white bg-[#FDFDFD] studio-shadow ${item.aspect}`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 rounded-full bg-[#FDFDFD]/90 backdrop-blur-md px-3 py-1 font-tech text-[9px] uppercase tracking-[0.18em] text-[#303033]">
                  {item.plate}
                </div>
                <div className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#FDFDFD]/90 text-[#303033] transition group-hover:bg-[#B8202A] group-hover:text-[#FDFDFD]">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>

              <div className="mt-4 max-w-[340px]">
                <h3 className="font-editorial text-2xl text-[#303033] group-hover:text-[#B8202A] transition-colors">
                  {item.title}
                </h3>
                <p className="mt-0.5 font-tech text-[10px] uppercase tracking-[0.12em] text-[#777271]">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
