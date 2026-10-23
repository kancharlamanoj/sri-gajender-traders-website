import React, { useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { STUDIO_ASSETS } from '../../data/catalogData';
import { NavigateFn } from '../../types/navigation';
import { MaskTextReveal } from '../ui/MicroInteractions';

interface ScrollNarrativeSectionProps {
  onNavigate: NavigateFn;
}

const STORY_CHAPTERS = [
  {
    number: 'I',
    code: 'CHAPTER 01 // ACOUSTIC INTIMACY',
    title: 'Engineered for Stillness and Sonic Depth.',
    body:
      'True wireless silhouettes from boAt, Boult, and Portronics merge up to 32dB Active Noise Cancellation, HiFi DSP signal tuning, and 100-to-120-hour charging cases—turning everyday transit into a private listening room.',
    specs: ['32dB ANC Depth', 'HiFi DSP 5 Tuning', 'Up to 120H Endurance'],
    image: STUDIO_ASSETS.collectionWirelessEarbuds,
    actionLabel: 'Explore Audio & Wireless',
    category: 'audio-wireless' as const,
  },
  {
    number: 'II',
    code: 'CHAPTER 02 // PERSONAL & DESK RITUAL',
    title: 'Tactile Precision in Every Daily Gesture.',
    body:
      'From Bombay Shaving Company’s 90-minute cordless stainless-steel trimmers to silent-switch Zebronics ensembles and Portronics 20W PD modules, each object elevates daily routine through disciplined industrial design.',
    specs: ['Stainless Blade Geometry', '20W USB-C Power Delivery', 'Silent Optical Tracking'],
    image: STUDIO_ASSETS.collectionGrooming,
    actionLabel: 'Explore Grooming & Peripherals',
    category: 'grooming' as const,
  },
  {
    number: 'III',
    code: 'CHAPTER 03 // ARCHITECTURAL TRUST',
    title: 'Optical Vigilance & Commercial Certainty.',
    body:
      'Across Tirupati’s retail avenues, offices, and hospitality spaces, Hikvision coaxial-audio cameras, Zebronics 3MP smart optics, and automated currency note counters establish effortless operational confidence.',
    specs: ['1080p & 3MP CMOS', 'IP67 Weather Sealing', 'High-Speed Note Counting'],
    image: STUDIO_ASSETS.collectionSecurity,
    actionLabel: 'Explore Security & Business',
    category: 'cctv-security' as const,
  },
];

export const ScrollNarrativeSection: React.FC<ScrollNarrativeSectionProps> = ({
  onNavigate,
}) => {
  const prefersReduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeChapter, setActiveChapter] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const ribbonLeft = useTransform(scrollYProgress, [0, 1], ['4%', '-14%']);
  const ribbonRight = useTransform(scrollYProgress, [0, 1], ['-10%', '6%']);

  return (
    <section
      id="narrative-transition"
      ref={sectionRef}
      aria-label="Curatorial Story"
      className="relative z-20 -mt-8 rounded-t-[2.75rem] sm:rounded-t-[3.75rem] bg-gradient-to-b from-[#FDFDFD] via-[#F5F3F2] to-[#E8E5E3] border-t border-white pt-16 sm:pt-24 pb-24 sm:pb-32 shadow-[0_-24px_60px_-28px_rgba(48,48,51,0.08)] overflow-hidden"
    >
      {/* Kinetic Opposing Typographic Transition Ribbons */}
      <div className="pointer-events-none select-none overflow-hidden py-4 border-y border-[#303033]/8 bg-[#FDFDFD]/55">
        <motion.div
          style={prefersReduced ? undefined : { x: ribbonLeft }}
          className="whitespace-nowrap font-editorial text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-[#303033]/85"
        >
          ACOUSTIC PURITY &nbsp;·&nbsp; <span className="italic text-[#B8202A]">ARCHITECTURAL OPTICS</span> &nbsp;·&nbsp; PRECISION GROOMING &nbsp;·&nbsp; COMMERCIAL HARDWARE
        </motion.div>
        <motion.div
          style={prefersReduced ? undefined : { x: ribbonRight }}
          className="mt-1 whitespace-nowrap font-tech text-[11px] sm:text-xs uppercase tracking-[0.34em] text-[#777271]"
        >
          SRI GAJENDER TRADERS // SAROJINI DEVI ROAD // NEHRU NAGAR // TIRUPATI 517501 // ANDHRA DISTRIBUTION &amp; RETAIL FLAGSHIP
        </motion.div>
      </div>

      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 pt-16 sm:pt-24">
        {/* Editorial Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16 sm:mb-24">
          <div className="lg:col-span-7">
            <div className="font-tech text-[11px] uppercase tracking-[0.22em] text-[#B8202A] mb-3">
              01 // CURATORIAL MANIFESTO
            </div>
            <MaskTextReveal
              lines={[
                'Not a Warehouse.',
                'A Curated Hardware Anthology.',
              ]}
              className="font-editorial text-4xl sm:text-6xl lg:text-[4.25rem] font-normal leading-[0.98] tracking-tight text-[#303033]"
            />
          </div>
          <div className="lg:col-span-5 lg:pl-8 border-l border-[#B8202A]/45">
            <p className="text-sm sm:text-base leading-relaxed text-[#777271]">
              Situated on the 1st floor at 5-1-6 Sarojini Devi Road, Nehru Nagar, Sri Gajender Traders
              brings together consumer audio, personal care engineering, surveillance optics, and
              commercial counter equipment under one luminous roof in Tirupati.
            </p>
          </div>
        </div>

        {/* Connected Sticky Product Storytelling Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Sticky Visual Transformation Frame (Desktop) */}
          <div className="lg:col-span-6 lg:sticky lg:top-28">
            <div className="relative overflow-hidden rounded-[2rem] border border-white bg-[#FDFDFD] studio-shadow aspect-[4/4.3]">
              {STORY_CHAPTERS.map((ch, idx) => (
                <motion.img
                  key={ch.code}
                  src={ch.image}
                  alt={ch.title}
                  initial={false}
                  animate={{
                    opacity: activeChapter === idx ? 1 : 0,
                    scale: activeChapter === idx ? 1 : 1.06,
                  }}
                  transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ))}

              {/* Translucent Glass Index Overlay */}
              <div className="glass-porcelain absolute bottom-5 left-5 right-5 rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-4">
                <div>
                  <div className="font-tech text-[10px] uppercase tracking-[0.2em] text-[#777271]">
                    {STORY_CHAPTERS[activeChapter].code}
                  </div>
                  <div className="mt-1 font-editorial text-xl sm:text-2xl text-[#303033]">
                    {STORY_CHAPTERS[activeChapter].specs.join(' · ')}
                  </div>
                </div>
                <span className="font-editorial italic text-3xl sm:text-4xl text-[#B8202A]">
                  {STORY_CHAPTERS[activeChapter].number}
                </span>
              </div>
            </div>
          </div>

          {/* Scrolling / Interactive Narrative Chapters */}
          <div className="lg:col-span-6 space-y-8 sm:space-y-12">
            {STORY_CHAPTERS.map((chapter, idx) => {
              const isSelected = activeChapter === idx;
              return (
                <motion.article
                  key={chapter.code}
                  onViewportEnter={() => setActiveChapter(idx)}
                  viewport={{ amount: 0.55 }}
                  onClick={() => setActiveChapter(idx)}
                  className={`cursor-pointer rounded-[2rem] p-7 sm:p-10 transition-all duration-500 border ${
                    isSelected
                      ? 'bg-[#FDFDFD] border-[#B8202A]/55 studio-shadow'
                      : 'bg-[#FDFDFD]/55 border-[#303033]/8 hover:bg-[#FDFDFD]/85'
                  }`}
                >
                  {/* Mobile inline preview */}
                  <div className="mb-6 overflow-hidden rounded-2xl lg:hidden">
                    <img
                      src={chapter.image}
                      alt={chapter.title}
                      loading="lazy"
                      className="aspect-[16/10] w-full object-cover"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="font-tech text-[10px] uppercase tracking-[0.22em] text-[#B8202A]">
                      {chapter.code}
                    </span>
                    <span className="font-editorial italic text-2xl text-[#B8202A]">
                      0{idx + 1} / 03
                    </span>
                  </div>

                  <h3 className="mt-4 font-editorial text-3xl sm:text-4xl font-normal leading-[1.08] text-[#303033]">
                    {chapter.title}
                  </h3>

                  <p className="mt-4 text-sm sm:text-[15px] leading-relaxed text-[#777271]">
                    {chapter.body}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {chapter.specs.map((spec) => (
                      <span
                        key={spec}
                        className="rounded-full bg-[#F5F3F2] border border-[#303033]/8 px-3 py-1 font-tech text-[10px] tracking-[0.08em] text-[#303033]"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  <div className="mt-7 pt-5 border-t border-[#303033]/8 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate({ page: 'catalogue', category: chapter.category });
                      }}
                      className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#B8202A]"
                    >
                      <span className="editorial-underline">{chapter.actionLabel}</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
