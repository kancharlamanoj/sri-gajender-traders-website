import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Crosshair, Radio, ShieldCheck, Sliders, Volume2 } from 'lucide-react';
import { CATEGORIES, STUDIO_ASSETS } from '../../data/catalogData';
import { NavigateFn } from '../../types/navigation';
import { MaskTextReveal, TiltSurface } from '../ui/MicroInteractions';

interface ImmersiveCollectionsProps {
  onNavigate: NavigateFn;
}

export const ImmersiveCollections: React.FC<ImmersiveCollectionsProps> = ({
  onNavigate,
}) => {
  return (
    <section
      aria-label="Immersive Product Collections"
      className="relative bg-[#FDFDFD] py-24 sm:py-32 overflow-hidden"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-14 border-b border-[#303033]/10">
          <div>
            <div className="font-tech text-[11px] uppercase tracking-[0.24em] text-[#B8202A] mb-3">
              02 // SIX CURATED DISCIPLINES
            </div>
            <MaskTextReveal
              lines={['The Collections,', 'Architecturally Composed.']}
              className="font-editorial text-4xl sm:text-6xl lg:text-[4.4rem] font-normal leading-[0.96] tracking-tight text-[#303033]"
            />
          </div>

          <div className="flex flex-wrap gap-2 max-w-xl">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                type="button"
                onClick={() => onNavigate({ page: 'catalogue', category: cat.slug })}
                className="rounded-full border border-[#303033]/14 bg-[#F5F3F2]/70 px-3.5 py-1.5 font-tech text-[10px] uppercase tracking-[0.14em] text-[#303033] transition hover:border-[#B8202A] hover:bg-[#B8202A] hover:text-[#FDFDFD]"
              >
                {cat.index} · {cat.shortTitle}
              </button>
            ))}
          </div>
        </div>

        {/* 01 // AUDIO & WIRELESS — Floating Sculptural Arrangement */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          className="mt-16 sm:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
        >
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3 font-tech text-xs uppercase tracking-[0.2em] text-[#777271]">
              <span className="text-[#B8202A] font-medium">COLLECTION 01</span>
              <span className="h-[1px] w-10 bg-[#B8202A]" />
              <span>BOAT · BOULT · PORTRONICS</span>
            </div>
            <h3 className="font-editorial text-5xl sm:text-6xl font-normal leading-[0.96] text-[#303033]">
              Audio &amp; <span className="italic text-[#B8202A]">Wireless.</span>
            </h3>
            <p className="text-sm sm:text-base leading-relaxed text-[#777271]">
              True wireless earbuds suspended between acoustic silence and dynamic clarity—led by
              boAt Nirvana Ion ANC (up to 32dB ANC, 120H playback), Boult Z40 Pro (100H playtime,
              Zen™ Quad-Mic ENC), and Portronics Harmonics Twins S5.
            </p>
            <div className="rounded-2xl bg-[#F5F3F2] p-4 border border-[#B8202A]/30 font-tech text-[11px] text-[#303033] flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Radio className="h-3.5 w-3.5 text-[#B8202A]" />
                <span>20Hz–20kHz · BT 5.2 / 5.3 · ANC &amp; ENC</span>
              </span>
              <span className="text-[#777271]">IDX 01–04</span>
            </div>
            <button
              type="button"
              onClick={() => onNavigate({ page: 'catalogue', category: 'audio-wireless' })}
              className="group inline-flex items-center gap-3 rounded-full bg-[#303033] px-6 py-3.5 text-xs font-medium uppercase tracking-[0.14em] text-[#FDFDFD] transition hover:bg-[#B8202A]"
            >
              <span>Enter Audio Gallery</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          <div className="lg:col-span-7 relative">
            <TiltSurface
              cursorLabel="AUDIO"
              onClick={() => onNavigate({ page: 'catalogue', category: 'audio-wireless' })}
              className="cursor-pointer"
            >
              <div className="grid grid-cols-12 gap-4 items-end">
                <div className="col-span-8 overflow-hidden rounded-t-[9rem] rounded-b-[2rem] border border-white bg-[#F5F3F2] studio-shadow">
                  <img
                    src={STUDIO_ASSETS.collectionWirelessEarbuds}
                    alt="Sculptural arrangement of wireless earbuds on porcelain and aluminum"
                    loading="lazy"
                    className="aspect-[4/4.3] w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div className="col-span-4 space-y-4">
                  <div className="overflow-hidden rounded-full border-2 border-white studio-shadow aspect-square">
                    <img
                      src={STUDIO_ASSETS.heroSculpturalAudio}
                      alt="boAt Nirvana Ion ANC floating studio view"
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="rounded-2xl bg-[#F5F3F2] p-4 border border-[#B8202A]/35">
                    <div className="font-tech text-[9px] uppercase tracking-[0.18em] text-[#777271]">
                      PEAK ENDURANCE
                    </div>
                    <div className="mt-1 font-editorial text-2xl sm:text-3xl font-semibold text-[#303033]">
                      120 Hours
                    </div>
                    <div className="font-tech text-[9px] text-[#B8202A]">Nirvana Ion Series</div>
                  </div>
                </div>
              </div>
            </TiltSurface>
          </div>
        </motion.div>

        {/* 02 // SPEAKERS & ENTERTAINMENT — Architectural Sound-Wave Installation */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          className="mt-24 sm:mt-32 rounded-[2.5rem] bg-gradient-to-br from-[#F5F3F2] via-[#FDFDFD] to-[#E8E5E3] border border-[#B8202A]/35 p-6 sm:p-10 lg:p-14 studio-shadow-soft"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div
              onClick={() => onNavigate({ page: 'catalogue', category: 'speakers-entertainment' })}
              data-cursor="SOUND"
              className="lg:col-span-7 relative overflow-hidden rounded-[2rem] border border-white cursor-pointer group"
            >
              <img
                src={STUDIO_ASSETS.collectionPartySpeakers}
                alt="Wireless speaker against fluted architectural sound-wave ribs"
                loading="lazy"
                className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              {/* Architectural Acoustic Rib Overlay */}
              <div className="glass-porcelain absolute bottom-4 left-4 right-4 rounded-2xl px-4 py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <Volume2 className="h-4 w-4 text-[#B8202A]" />
                  <span className="font-tech text-[10px] uppercase tracking-[0.16em] text-[#303033]">
                    ACOUSTIC PROJECTION // 12W DRUMS TO 90W PARTY TOWERS
                  </span>
                </div>
                {/* Animated SVG Sound Wave Bars */}
                <div className="hidden sm:flex items-end gap-1 h-5" aria-hidden="true">
                  {[45, 85, 60, 100, 70, 90, 50, 75, 40].map((h, i) => (
                    <span
                      key={i}
                      style={{ height: `${h}%` }}
                      className="w-1 rounded-full bg-[#B8202A] transition-all duration-300 group-hover:bg-[#B8202A]"
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-5">
              <div className="font-tech text-xs uppercase tracking-[0.2em] text-[#B8202A]">
                COLLECTION 02 // SOUND ARCHITECTURE
              </div>
              <h3 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal leading-[0.98] text-[#303033]">
                Speakers &amp; <span className="italic">Entertainment.</span>
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-[#777271]">
                Portronics SoundDrum 1, boAt Stone 1200 Pro (60W), PartyPal 230 (90W), and Zebronics
                Sound Feast 200—curated for intimate interiors and open-air celebrations alike.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() =>
                    onNavigate({ page: 'catalogue', category: 'speakers-entertainment' })
                  }
                  className="group inline-flex items-center gap-2.5 rounded-full border border-[#303033]/20 bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#303033] transition hover:border-[#B8202A] hover:bg-[#B8202A] hover:text-[#FDFDFD]"
                >
                  <span>Explore Speakers</span>
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 03 & 04 // ASYMMETRIC EDITORIAL DUO: ACCESSORIES (SWISS GRID) + GROOMING (MAGAZINE PASSE-PARTOUT) */}
        <div className="mt-24 sm:mt-32 grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* 03 // Mobile & Computer Accessories */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.75 }}
            className="lg:col-span-7 flex flex-col justify-between rounded-[2.25rem] border border-[#303033]/10 bg-white p-6 sm:p-9 architectural-grid studio-shadow-soft"
          >
            <div>
              <div className="flex items-center justify-between font-tech text-[10px] uppercase tracking-[0.2em] text-[#777271] pb-4 border-b border-[#303033]/10">
                <span>COLLECTION 03 // PRECISION INTERFACES</span>
                <span className="flex items-center gap-1 text-[#B8202A]">
                  <Sliders className="h-3.5 w-3.5" />
                  PORTRONICS · ZEBRONICS
                </span>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <h3 className="font-editorial text-4xl sm:text-5xl text-[#303033] leading-none">
                  Mobile &amp; Computer <span className="italic">Accessories.</span>
                </h3>
                <button
                  type="button"
                  onClick={() => onNavigate({ page: 'catalogue', category: 'accessories' })}
                  className="shrink-0 inline-flex items-center gap-1.5 font-tech text-xs uppercase tracking-[0.14em] text-[#B8202A] editorial-underline"
                >
                  <span>View Suite</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>

              <p className="mt-4 max-w-xl text-sm text-[#777271] leading-relaxed">
                Zebronics Companion 202 wireless desktop ensembles, Portronics Toad 23 ergonomic
                optical mice (up to 1600 DPI), and BIS-certified Adapto 20W USB-C Power Delivery
                modules.
              </p>
            </div>

            <div
              onClick={() => onNavigate({ page: 'catalogue', category: 'accessories' })}
              data-cursor="EXPLORE"
              className="mt-7 overflow-hidden rounded-2xl border border-[#303033]/10 cursor-pointer group"
            >
              <img
                src={STUDIO_ASSETS.collectionAccessories}
                alt="Minimalist silver-white wireless keyboard, mouse, and USB-C adapter"
                loading="lazy"
                className="aspect-[16/9] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3 pt-4 border-t border-[#303033]/10 font-tech text-[10px] text-[#777271]">
              <div>2.4GHz RF NANO</div>
              <div className="text-center">800–1600 DPI</div>
              <div className="text-right">20W USB-C PD</div>
            </div>
          </motion.div>

          {/* 04 // Grooming & Personal Care — Editorial Passe-Partout Still Life */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.75, delay: 0.1 }}
            onClick={() => onNavigate({ page: 'catalogue', category: 'grooming' })}
            data-cursor="RITUAL"
            className="lg:col-span-5 cursor-pointer group rounded-[2.25rem] bg-[#F5F3F2] border border-[#B8202A]/40 p-7 sm:p-9 flex flex-col justify-between studio-shadow-soft"
          >
            <div className="flex items-center justify-between font-tech text-[10px] uppercase tracking-[0.2em] text-[#777271]">
              <span>COLLECTION 04</span>
              <span>BOMBAY SHAVING CO.</span>
            </div>

            {/* Passe-Partout Museum Mat */}
            <div className="my-6 rounded-2xl bg-[#FDFDFD] p-4 border border-white shadow-inner">
              <div className="overflow-hidden rounded-xl">
                <img
                  src={STUDIO_ASSETS.collectionGrooming}
                  alt="Precision stainless steel beard trimmer on cream travertine pedestal"
                  loading="lazy"
                  className="aspect-[4/4.2] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            <div>
              <h3 className="font-editorial text-4xl text-[#303033] leading-tight">
                Grooming &amp; <span className="italic text-[#B8202A]">Personal Care.</span>
              </h3>
              <p className="mt-2 text-sm text-[#777271] leading-relaxed">
                Cordless stainless-steel trimmers engineered for 90-minute uninterrupted runtime and
                universal Type-C travel charging.
              </p>
              <div className="mt-5 inline-flex items-center gap-2 font-tech text-[11px] uppercase tracking-[0.15em] text-[#B8202A]">
                <span className="editorial-underline">Inspect Grooming Edition</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* 05 // CCTV & SECURITY — Architectural Diagram & Optical Reticle */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
          className="mt-24 sm:mt-32 rounded-[2.5rem] bg-[#F5F3F2] border border-[#303033]/12 p-6 sm:p-10 lg:p-14 relative overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1 border border-[#303033]/10 font-tech text-[10px] uppercase tracking-[0.18em] text-[#B8202A]">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>COLLECTION 05 // OPTICAL SECURITY</span>
              </div>
              <h3 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#303033] leading-[0.98]">
                CCTV &amp; <span className="italic">Surveillance.</span>
              </h3>
              <p className="text-sm sm:text-base text-[#777271] leading-relaxed">
                Hikvision 2MP coaxial-audio turret &amp; IP67 mini-bullet cameras alongside Zebronics
                smart 3MP 4G cameras—delivering wide-angle CMOS clarity and EXIR infrared night
                vision.
              </p>

              {/* Clean Architectural Optical Schematic SVG */}
              <div className="rounded-2xl bg-white p-4 border border-[#303033]/10">
                <div className="flex items-center justify-between font-tech text-[10px] text-[#777271] mb-2">
                  <span>OPTICAL FOV DIAGRAM // 2.8mm LENS</span>
                  <span className="text-[#B8202A]">106.4° H-FOV · 25m EXIR</span>
                </div>
                <svg
                  viewBox="0 0 360 90"
                  className="w-full h-20 text-[#303033]"
                  aria-label="Optical camera field of view schematic"
                >
                  <circle cx="28" cy="45" r="7" fill="#B8202A" />
                  <circle cx="28" cy="45" r="13" fill="none" stroke="#B8202A" strokeWidth="1" />
                  <path
                    d="M 28 45 L 335 8 A 190 190 0 0 1 335 82 Z"
                    fill="rgba(184, 32, 42, 0.08)"
                    stroke="#B8202A"
                    strokeWidth="1"
                    strokeDasharray="4 3"
                  />
                  <line x1="28" y1="45" x2="342" y2="45" stroke="#303033" strokeOpacity="0.25" strokeWidth="1" />
                  <text x="165" y="40" className="font-tech text-[9px]" fill="#777271">
                    COAXIAL AUDIO + SMART IR RANGE (20m–30m)
                  </text>
                </svg>
              </div>

              <button
                type="button"
                onClick={() => onNavigate({ page: 'catalogue', category: 'cctv-security' })}
                className="inline-flex items-center gap-2.5 rounded-full bg-[#303033] px-6 py-3.5 text-xs font-medium uppercase tracking-[0.14em] text-[#FDFDFD] transition hover:bg-[#B8202A]"
              >
                <span>Inspect Security Hardware</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>

            <div
              onClick={() => onNavigate({ page: 'catalogue', category: 'cctv-security' })}
              data-cursor="OPTICS"
              className="lg:col-span-7 relative overflow-hidden rounded-[2rem] border border-white bg-white studio-shadow cursor-pointer group"
            >
              <img
                src={STUDIO_ASSETS.collectionSecurity}
                alt="Hikvision style matte-white dome and bullet optical surveillance cameras"
                loading="lazy"
                className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute top-4 right-4 rounded-full bg-white/90 backdrop-blur-md px-3 py-1.5 border border-[#303033]/10 flex items-center gap-1.5 font-tech text-[10px] text-[#303033]">
                <Crosshair className="h-3.5 w-3.5 text-[#B8202A]" />
                <span>HIKVISION · ZEBRONICS</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 06 // BUSINESS EQUIPMENT — Sophisticated Executive Studio Scene */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          className="mt-20 sm:mt-28 rounded-[2.5rem] bg-[#FDFDFD] border border-[#B8202A]/45 p-6 sm:p-10 lg:p-12 studio-shadow-soft"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div
              onClick={() => onNavigate({ page: 'catalogue', category: 'business-equipment' })}
              data-cursor="COMMERCIAL"
              className="lg:col-span-6 overflow-hidden rounded-2xl border border-[#303033]/10 cursor-pointer group"
            >
              <img
                src={STUDIO_ASSETS.collectionBusiness}
                alt="Modern digital currency note counting machine on ivory limestone desk"
                loading="lazy"
                className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            <div className="lg:col-span-6 space-y-5 lg:pl-6">
              <div className="font-tech text-[11px] uppercase tracking-[0.2em] text-[#777271]">
                COLLECTION 06 // COMMERCIAL COUNTER HARDWARE
              </div>
              <h3 className="font-editorial text-4xl sm:text-5xl text-[#303033] leading-tight">
                Business Equipment &amp; <span className="italic text-[#B8202A]">Note Counters.</span>
              </h3>
              <p className="text-sm sm:text-base text-[#777271] leading-relaxed">
                Automated currency note counting machines tailored for retail cash counters,
                hospitality desks, and wholesale trade across Tirupati and Chittoor district.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate({ page: 'catalogue', category: 'business-equipment' })}
                  className="inline-flex items-center gap-2 rounded-full bg-[#B8202A] px-6 py-3 text-xs font-medium uppercase tracking-[0.14em] text-[#FDFDFD] transition hover:bg-[#961923]"
                >
                  <span>View Business Equipment</span>
                  <ArrowUpRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate({ page: 'wholesale' })}
                  className="inline-flex items-center gap-2 rounded-full border border-[#303033]/18 bg-white px-5 py-3 text-xs font-medium uppercase tracking-[0.14em] text-[#303033] transition hover:border-[#B8202A]"
                >
                  <span>Bulk B2B Enquiry</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
