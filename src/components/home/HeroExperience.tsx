import React, { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { ArrowDown, ArrowUpRight, Compass, Sparkles } from 'lucide-react';
import { STUDIO_ASSETS, STORE_INFO } from '../../data/catalogData';
import { NavigateFn } from '../../types/navigation';
import { MagneticButton } from '../ui/MicroInteractions';

interface HeroExperienceProps {
  onNavigate: NavigateFn;
}

export const HeroExperience: React.FC<HeroExperienceProps> = ({ onNavigate }) => {
  const prefersReduced = useReducedMotion();
  const heroRef = useRef<HTMLElement | null>(null);

  // Pointer parallax motion values (-0.5 to +0.5)
  const rawPointerX = useMotionValue(0);
  const rawPointerY = useMotionValue(0);
  const smoothX = useSpring(rawPointerX, { stiffness: 110, damping: 24, mass: 0.7 });
  const smoothY = useSpring(rawPointerY, { stiffness: 110, damping: 24, mass: 0.7 });

  // Multi-depth pointer transforms
  const depth1X = useTransform(smoothX, [-0.5, 0.5], [-22, 22]);
  const depth1Y = useTransform(smoothY, [-0.5, 0.5], [-16, 16]);
  const depth2X = useTransform(smoothX, [-0.5, 0.5], [18, -18]);
  const depth2Y = useTransform(smoothY, [-0.5, 0.5], [14, -14]);
  const depth3X = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const depth3Y = useTransform(smoothY, [-0.5, 0.5], [12, -12]);
  const bgPrismX = useTransform(smoothX, [-0.5, 0.5], [28, -28]);
  const bgPrismY = useTransform(smoothY, [-0.5, 0.5], [20, -20]);

  // Scroll-driven seamless transformation into Section 02
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.88], [1, 0.25]);
  const stageParallaxY = useTransform(scrollYProgress, [0, 1], [0, -85]);
  const ringRotate = useTransform(scrollYProgress, [0, 1], [0, 42]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (prefersReduced || !heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    rawPointerX.set(nx);
    rawPointerY.set(ny);
  };

  const handleMouseLeave = () => {
    rawPointerX.set(0);
    rawPointerY.set(0);
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="Flagship Hero Installation"
      className="relative min-h-[100svh] w-full overflow-hidden bg-gradient-to-b from-[#FDFDFD] via-[#FDFDFD] to-[#F5F3F2] pt-24 sm:pt-28 pb-16 flex flex-col justify-between"
    >
      {/* Subtle Architectural Grid & Volumetric Light Cones */}
      <div className="architectural-grid pointer-events-none absolute inset-0 opacity-75" />

      <motion.div
        aria-hidden="true"
        style={prefersReduced ? undefined : { x: bgPrismX, y: bgPrismY }}
        className="pointer-events-none absolute -top-24 right-[6%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.95)_0%,rgba(184,32,42,0.12)_42%,rgba(253,253,253,0)_72%)] blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[28%] -left-24 h-[440px] w-[440px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.9)_0%,rgba(212,207,205,0.35)_48%,transparent_75%)] blur-2xl"
      />

      {/* Sculptural Champagne Orbital Ring */}
      <motion.div
        aria-hidden="true"
        style={prefersReduced ? undefined : { rotate: ringRotate }}
        className="pointer-events-none absolute top-[18%] right-[8%] hidden lg:block h-[540px] w-[540px] rounded-full border border-[#B8202A]/25"
      >
        <div className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border border-[#B8202A] bg-[#FDFDFD]" />
        <div className="absolute inset-8 rounded-full border border-dashed border-[#303033]/8" />
      </motion.div>

      <motion.div
        style={prefersReduced ? undefined : { scale: heroScale, opacity: heroOpacity }}
        className="relative z-10 mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 flex-1 flex flex-col justify-center"
      >
        {/* Top Editorial Index Row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
          className="mb-6 sm:mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-[#303033]/10 pb-4"
        >
          <div className="flex items-center gap-2.5">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#B8202A]/10 text-[#B8202A]">
              <Sparkles className="h-3 w-3" />
            </span>
            <span className="font-tech text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-[#777271]">
              EDITION 02 // “THE FUTURE, CURATED.”
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6 font-tech text-[10px] uppercase tracking-[0.2em] text-[#777271]">
            <span>SAROJINI DEVI RD · NEHRU NAGAR · TIRUPATI</span>
            <span className="h-1 w-1 rounded-full bg-[#B8202A]" />
            <span>{STORE_INFO.coordinates}</span>
          </div>
        </motion.div>

        {/* Enormous Viewport-Spanning Editorial Headline with Clipping Reveal */}
        <div className="relative z-20">
          <h1 className="font-editorial font-normal tracking-[-0.028em] text-[#303033] leading-[0.92]">
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span
                initial={prefersReduced ? { opacity: 1 } : { y: '108%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.95, ease: [0.19, 1, 0.22, 1] }}
                className="block text-[13vw] sm:text-[10.2vw] lg:text-[7.4rem] xl:text-[8.5rem]"
              >
                Beyond Ordinary.
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.08em] sm:pl-[6vw] lg:pl-[9vw]">
              <motion.span
                initial={prefersReduced ? { opacity: 1 } : { y: '108%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.95, delay: 0.14, ease: [0.19, 1, 0.22, 1] }}
                className="block text-[13vw] sm:text-[10.2vw] lg:text-[7.4rem] xl:text-[8.5rem]"
              >
                Into <span className="italic font-light text-[#B8202A]">Extraordinary.</span>
              </motion.span>
            </span>
          </h1>
        </div>

        {/* Asymmetric Multi-Depth Product Installation + Editorial Copy */}
        <div className="mt-8 lg:mt-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Supporting Copy, CTAs & Provenance Index */}
          <motion.div
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.28, ease: [0.19, 1, 0.22, 1] }}
            className="lg:col-span-5 space-y-7 relative z-20"
          >
            <div className="space-y-3">
              <p className="font-editorial text-2xl sm:text-3xl text-[#303033] leading-snug">
                Curated technology. Exceptional possibilities.
              </p>
              <p className="max-w-md text-sm sm:text-[15px] leading-relaxed text-[#777271]">
                From Tirupati’s Nehru Nagar atelier to retailers and homes across Andhra Pradesh—discover
                sculpted personal acoustics, spatial speakers, precision grooming, and optical surveillance
                across six celebrated brands.
              </p>
            </div>

            {/* Primary & Secondary Magnetic CTAs */}
            <div className="flex flex-wrap items-center gap-3.5">
              <MagneticButton
                onClick={() => onNavigate({ page: 'catalogue', category: 'all', brand: 'all' })}
                cursorLabel="EXPLORE"
                className="group inline-flex items-center gap-3 rounded-full bg-[#B8202A] px-7 py-4 text-xs sm:text-sm font-medium tracking-[0.03em] text-[#FDFDFD] shadow-[0_18px_38px_-14px_rgba(184,32,42,0.35)] transition hover:bg-[#961923]"
              >
                <span>Explore the Collection</span>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </MagneticButton>

              <MagneticButton
                onClick={() => onNavigate({ page: 'brands' })}
                cursorLabel="BRANDS"
                className="inline-flex items-center gap-2.5 rounded-full border border-[#303033]/18 bg-[#FDFDFD]/85 backdrop-blur-md px-6 py-4 text-xs sm:text-sm font-medium text-[#303033] transition hover:border-[#B8202A] hover:bg-white"
              >
                <span>Discover Our Brands</span>
                <Compass className="h-4 w-4 text-[#B8202A]" />
              </MagneticButton>
            </div>

            {/* Fine Technical Index Strip */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#303033]/10 max-w-md">
              <div>
                <div className="font-tech text-[10px] uppercase tracking-[0.18em] text-[#777271]">
                  BRANDS
                </div>
                <div className="mt-0.5 font-editorial text-2xl font-semibold text-[#303033]">
                  06 Houses
                </div>
              </div>
              <div>
                <div className="font-tech text-[10px] uppercase tracking-[0.18em] text-[#777271]">
                  DISCIPLINES
                </div>
                <div className="mt-0.5 font-editorial text-2xl font-semibold text-[#303033]">
                  06 Series
                </div>
              </div>
              <div>
                <div className="font-tech text-[10px] uppercase tracking-[0.18em] text-[#777271]">
                  TUESDAYS
                </div>
                <div className="mt-0.5 font-editorial text-2xl font-semibold text-[#B8202A]">
                  24H Open
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Layered Floating Product Installation */}
          <motion.div
            style={prefersReduced ? undefined : { y: stageParallaxY }}
            className="lg:col-span-7 relative min-h-[420px] sm:min-h-[500px] lg:min-h-[540px] flex items-center justify-center"
          >
            {/* Sculptural Translucent Ivory Plinth Backplate */}
            <div
              aria-hidden="true"
              className="absolute inset-x-6 sm:inset-x-14 top-8 bottom-8 rounded-[2.5rem] bg-gradient-to-br from-white/80 via-[#F5F3F2]/70 to-[#E8E5E3]/50 border border-white/90 shadow-[0_40px_90px_-30px_rgba(48,48,51,0.1)]"
            />

            {/* Primary Depth Layer (Center-Right): Sculptural Wireless ANC Audio */}
            <motion.div
              style={prefersReduced ? undefined : { x: depth1X, y: depth1Y }}
              initial={
                prefersReduced
                  ? { opacity: 1 }
                  : { opacity: 0, clipPath: 'inset(18% 12% 18% 12% round 28px)', scale: 1.06 }
              }
              animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 28px)', scale: 1 }}
              transition={{ duration: 1.05, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
              onClick={() => onNavigate({ page: 'product', productId: 'boat-nirvana-ion-anc' })}
              data-cursor="INSPECT"
              className="relative z-20 w-[78%] sm:w-[64%] lg:w-[62%] cursor-pointer group"
            >
              <div className="overflow-hidden rounded-[28px] border border-white/95 bg-[#FDFDFD] studio-shadow">
                <img
                  src={STUDIO_ASSETS.heroSculpturalAudio}
                  alt="Floating pearl-ivory wireless ANC earbuds on sculpted travertine plinth"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </div>

              {/* Technical Callout Pill 01 */}
              <div className="glass-porcelain absolute -top-4 left-4 sm:left-6 rounded-full px-3.5 py-1.5 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#B8202A]" />
                <span className="font-tech text-[9px] sm:text-[10px] uppercase tracking-[0.16em] text-[#303033]">
                  REF 01 // NIRVANA ION ANC · 32dB
                </span>
              </div>
            </motion.div>

            {/* Secondary Depth Layer (Bottom-Left): Floating Acoustic Speaker Sculpture */}
            <motion.div
              style={prefersReduced ? undefined : { x: depth2X, y: depth2Y }}
              initial={
                prefersReduced
                  ? { opacity: 1 }
                  : { opacity: 0, clipPath: 'inset(25% 0% 0% 25% round 22px)', y: 28 }
              }
              animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 22px)', y: 0 }}
              transition={{ duration: 1.05, delay: 0.38, ease: [0.19, 1, 0.22, 1] }}
              onClick={() => onNavigate({ page: 'catalogue', category: 'speakers-entertainment' })}
              data-cursor="ACOUSTICS"
              className="absolute -bottom-2 left-0 sm:left-2 z-30 w-[46%] sm:w-[40%] cursor-pointer group"
            >
              <div className="overflow-hidden rounded-[22px] border border-white bg-[#FDFDFD] studio-shadow">
                <img
                  src={STUDIO_ASSETS.heroSpeakerSculpture}
                  alt="Sculptural wireless speaker and soundbar installation"
                  className="aspect-[5/4] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#FDFDFD]/90 border border-[#B8202A]/35 px-3 py-1 shadow-xs">
                <span className="font-tech text-[9px] uppercase tracking-[0.16em] text-[#777271]">
                  REF 02 // SPATIAL AUDIO · 60W–90W
                </span>
              </div>
            </motion.div>

            {/* Tertiary Depth Layer (Top-Right): Grooming & Optical Security Still Life */}
            <motion.div
              style={prefersReduced ? undefined : { x: depth3X, y: depth3Y }}
              initial={
                prefersReduced
                  ? { opacity: 1 }
                  : { opacity: 0, clipPath: 'inset(0% 25% 25% 0% round 22px)', y: -24 }
              }
              animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 22px)', y: 0 }}
              transition={{ duration: 1.05, delay: 0.5, ease: [0.19, 1, 0.22, 1] }}
              onClick={() => onNavigate({ page: 'catalogue', category: 'cctv-security' })}
              data-cursor="OPTICS"
              className="absolute -top-3 right-0 sm:right-2 z-30 w-[40%] sm:w-[33%] cursor-pointer group"
            >
              <div className="overflow-hidden rounded-[22px] border border-white bg-[#FDFDFD] studio-shadow">
                <img
                  src={STUDIO_ASSETS.heroGroomingSecurity}
                  alt="Precision metallic trimmer and optical dome surveillance lens"
                  className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="glass-ivory absolute bottom-3 left-3 right-3 rounded-xl px-2.5 py-1.5">
                <span className="block font-tech text-[8px] sm:text-[9px] uppercase tracking-[0.15em] text-[#303033] truncate">
                  REF 03 // HIKVISION &amp; GROOMING
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Architectural Bar & Elegant Vertical Scroll Indicator */}
      <div className="relative z-20 mx-auto mt-10 w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 flex items-end justify-between">
        <div className="hidden sm:flex items-center gap-4 font-tech text-[10px] uppercase tracking-[0.2em] text-[#777271]">
          <span>PORTRONICS</span>
          <span className="text-[#B8202A]">/</span>
          <span>BOAT</span>
          <span className="text-[#B8202A]">/</span>
          <span>ZEBRONICS</span>
          <span className="text-[#B8202A]">/</span>
          <span>BOULT</span>
          <span className="text-[#B8202A]">/</span>
          <span>HIKVISION</span>
          <span className="text-[#B8202A]">/</span>
          <span>BOMBAY SHAVING CO.</span>
        </div>

        <a
          href="#narrative-transition"
          aria-label="Scroll to Signature Narrative"
          className="ml-auto flex items-center gap-3 group"
        >
          <span className="font-tech text-[10px] uppercase tracking-[0.22em] text-[#777271] group-hover:text-[#303033] transition-colors">
            Scroll to Unfold
          </span>
          <div className="relative flex h-12 w-6 items-start justify-center rounded-full border border-[#B8202A]/60 bg-[#FDFDFD]/80 p-1">
            <motion.span
              animate={prefersReduced ? undefined : { y: [0, 18, 0], opacity: [0.9, 0.35, 0.9] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              className="block h-2.5 w-1 rounded-full bg-[#B8202A]"
            />
          </div>
          <ArrowDown className="h-3.5 w-3.5 text-[#777271] hidden sm:block" />
        </a>
      </div>
    </section>
  );
};
