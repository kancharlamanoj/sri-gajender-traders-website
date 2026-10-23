import React, { useState } from 'react';
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
  buildWhatsAppEnquiryUrl,
  getLiveStoreStatus,
  PRODUCTS,
  STORE_INFO,
} from '../data/catalogData';
import { NavigateFn } from '../types/navigation';
import { MaskTextReveal } from '../components/ui/MicroInteractions';

interface ContactPageProps {
  onNavigate: NavigateFn;
  onOpenConcierge: (mode?: 'retail' | 'wholesale' | 'warranty') => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onNavigate,
  onOpenConcierge,
}) => {
  const status = getLiveStoreStatus();
  const [activeAssistTab, setActiveAssistTab] = useState<
    'pricing' | 'warranty' | 'directions'
  >('pricing');
  const [selectedProductId, setSelectedProductId] = useState(PRODUCTS[0].id);
  const [visitorNote, setVisitorNote] = useState('');

  const chosenProduct =
    PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];

  const pricingWhatsappUrl = buildWhatsAppEnquiryUrl(
    [
      `Hello Sri Gajender Traders (Tirupati),`,
      ``,
      `I am looking for specific product pricing & availability:`,
      `• Product: ${chosenProduct.name}`,
      `• Brand: ${chosenProduct.brandName}`,
      `• Model: ${chosenProduct.model}`,
      visitorNote.trim() ? `• Note: ${visitorNote.trim()}` : '',
      ``,
      `Please share current details.`,
    ]
      .filter(Boolean)
      .join('\n')
  );

  const warrantyWhatsappUrl = buildWhatsAppEnquiryUrl(
    [
      `Hello Sri Gajender Traders (Nehru Nagar, Tirupati),`,
      ``,
      `I need assistance regarding manufacturer warranty / service guidance:`,
      `• Brand / Product: ${chosenProduct.brandName} — ${chosenProduct.name} (${chosenProduct.model})`,
      visitorNote.trim() ? `• Issue / Invoice Ref: ${visitorNote.trim()}` : '',
      ``,
      `Please advise on the applicable manufacturer service process.`,
    ]
      .filter(Boolean)
      .join('\n')
  );

  return (
    <div className="min-h-screen bg-[#FDFDFD] pt-28 sm:pt-36 pb-24">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="border-b border-[#303033]/10 pb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <div className="font-tech text-[11px] uppercase tracking-[0.24em] text-[#B8202A] mb-3">
              SHOWROOM CONCIERGE // TIRUPATI 517501
            </div>
            <MaskTextReveal
              as="h1"
              lines={['Visit, Enquire &', 'Showroom Assistance.']}
              className="font-editorial text-4xl sm:text-6xl lg:text-[4.5rem] font-normal leading-[0.95] tracking-tight text-[#303033]"
            />
          </div>

          <div className="inline-flex items-center gap-2.5 self-start lg:self-end rounded-full bg-[#F5F3F2] border border-[#B8202A]/45 px-4 py-2 text-xs font-medium text-[#B8202A]">
            <span
              className={`h-2 w-2 rounded-full ${
                status.isOpen ? 'bg-[#B8202A] animate-pulse' : 'bg-[#B8202A]'
              }`}
            />
            <span>{status.label}</span>
          </div>
        </div>

        {/* Interactive Visitor Intent Concierge: Pricing, Warranty, Directions */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left 7 Cols: Interactive Concierge Hub */}
          <div className="lg:col-span-7 rounded-[2.25rem] bg-white border border-[#B8202A]/40 p-6 sm:p-10 studio-shadow space-y-6">
            <div>
              <div className="font-tech text-[10px] uppercase tracking-[0.2em] text-[#777271]">
                HOW CAN WE ASSIST YOU TODAY?
              </div>
              <h2 className="mt-1 font-editorial text-3xl sm:text-4xl text-[#303033]">
                Pricing, Warranty Guidance &amp; Directions
              </h2>
            </div>

            {/* 3 Intent Tabs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 rounded-2xl bg-[#F5F3F2] p-1.5">
              <button
                type="button"
                onClick={() => setActiveAssistTab('pricing')}
                className={`flex items-center justify-center gap-2 rounded-xl py-3 px-3 text-xs font-medium transition ${
                  activeAssistTab === 'pricing'
                    ? 'bg-[#FDFDFD] text-[#303033] shadow-xs border border-[#B8202A]/40'
                    : 'text-[#777271] hover:text-[#303033]'
                }`}
              >
                <Tag className="h-3.5 w-3.5 text-[#B8202A]" />
                <span>Product Pricing</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveAssistTab('warranty')}
                className={`flex items-center justify-center gap-2 rounded-xl py-3 px-3 text-xs font-medium transition ${
                  activeAssistTab === 'warranty'
                    ? 'bg-[#FDFDFD] text-[#303033] shadow-xs border border-[#B8202A]/40'
                    : 'text-[#777271] hover:text-[#303033]'
                }`}
              >
                <ShieldCheck className="h-3.5 w-3.5 text-[#B8202A]" />
                <span>Warranty Help</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveAssistTab('directions')}
                className={`flex items-center justify-center gap-2 rounded-xl py-3 px-3 text-xs font-medium transition ${
                  activeAssistTab === 'directions'
                    ? 'bg-[#FDFDFD] text-[#303033] shadow-xs border border-[#B8202A]/40'
                    : 'text-[#777271] hover:text-[#303033]'
                }`}
              >
                <Compass className="h-3.5 w-3.5 text-[#B8202A]" />
                <span>Visit Directions</span>
              </button>
            </div>

            {activeAssistTab === 'pricing' && (
              <div className="space-y-5 pt-2">
                <p className="text-sm text-[#777271] leading-relaxed">
                  Select a verified product from our catalogue below (or mention any specific model
                  you are searching for) to request current retail or wholesale pricing on WhatsApp.
                </p>

                <div>
                  <label
                    htmlFor="assist-model"
                    className="block font-tech text-[10px] uppercase tracking-[0.16em] text-[#777271] mb-1.5"
                  >
                    Select Catalogue Model
                  </label>
                  <select
                    id="assist-model"
                    value={selectedProductId}
                    onChange={(e) => setSelectedProductId(e.target.value)}
                    className="w-full rounded-xl border border-[#303033]/15 bg-[#FDFDFD] px-4 py-3 text-sm text-[#303033] focus:border-[#B8202A] focus:outline-none"
                  >
                    {PRODUCTS.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.brandName} — {p.name} (Model: {p.model})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="assist-note"
                    className="block font-tech text-[10px] uppercase tracking-[0.16em] text-[#777271] mb-1.5"
                  >
                    Quantity or Other Model Query (Optional)
                  </label>
                  <input
                    id="assist-note"
                    type="text"
                    value={visitorNote}
                    onChange={(e) => setVisitorNote(e.target.value)}
                    placeholder="e.g. 1 Unit retail price, or bulk carton rate..."
                    className="w-full rounded-xl border border-[#303033]/15 bg-[#FDFDFD] px-4 py-3 text-sm text-[#303033] focus:border-[#B8202A] focus:outline-none"
                  />
                </div>

                <div className="flex flex-wrap gap-3 pt-1">
                  <a
                    href={pricingWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#B8202A] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.13em] text-[#FDFDFD] hover:bg-[#961923]"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Request Price on WhatsApp</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                  <button
                    type="button"
                    onClick={() =>
                      onNavigate({ page: 'product', productId: chosenProduct.id })
                    }
                    className="rounded-full border border-[#303033]/16 px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.13em] text-[#303033] hover:border-[#B8202A]"
                  >
                    View Model Specs
                  </button>
                </div>
              </div>
            )}

            {activeAssistTab === 'warranty' && (
              <div className="space-y-5 pt-2">
                <div className="rounded-2xl bg-[#F5F3F2]/80 border border-[#B8202A]/35 p-5 space-y-2 text-xs sm:text-sm text-[#303033] leading-relaxed">
                  <div className="font-semibold text-[#303033]">
                    Manufacturer Warranty Guidance
                  </div>
                  <p>
                    Warranty coverage for Portronics, boAt, Zebronics, Boult, Hikvision, and Bombay
                    Shaving Company products is provided per each manufacturer’s official terms.
                    Please keep your purchase bill/invoice and product serial box handy when
                    visiting our Nehru Nagar desk or contacting brand service channels.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="warranty-model"
                    className="block font-tech text-[10px] uppercase tracking-[0.16em] text-[#777271] mb-1.5"
                  >
                    Product / Brand Purchased
                  </label>
                  <select
                    id="warranty-model"
                    value={selectedProductId}
                    onChange={(e) => setSelectedProductId(e.target.value)}
                    className="w-full rounded-xl border border-[#303033]/15 bg-[#FDFDFD] px-4 py-3 text-sm text-[#303033] focus:border-[#B8202A] focus:outline-none"
                  >
                    {PRODUCTS.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.brandName} — {p.name} ({p.model})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="warranty-note"
                    className="block font-tech text-[10px] uppercase tracking-[0.16em] text-[#777271] mb-1.5"
                  >
                    Invoice Date / Support Question
                  </label>
                  <input
                    id="warranty-note"
                    type="text"
                    value={visitorNote}
                    onChange={(e) => setVisitorNote(e.target.value)}
                    placeholder="Share purchase date or issue summary..."
                    className="w-full rounded-xl border border-[#303033]/15 bg-[#FDFDFD] px-4 py-3 text-sm text-[#303033] focus:border-[#B8202A] focus:outline-none"
                  />
                </div>

                <a
                  href={warrantyWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#B8202A] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.13em] text-[#FDFDFD] hover:bg-[#961923]"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Message Warranty Desk on WhatsApp</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            )}

            {activeAssistTab === 'directions' && (
              <div className="space-y-5 pt-2">
                <div className="rounded-2xl bg-[#F5F3F2] border border-[#B8202A]/40 p-5 space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-[#B8202A] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-editorial text-2xl font-medium text-[#303033]">
                        {STORE_INFO.name}
                      </div>
                      <p className="mt-1 text-sm text-[#303033]">{STORE_INFO.fullAddress}</p>
                      <p className="mt-1 font-tech text-[11px] text-[#777271]">
                        Landmark Locality: Sarojini Devi Road · Nehru Nagar · Tirupati 517501
                      </p>
                    </div>
                  </div>
                </div>

                {/* Clean Architectural Location Diagram */}
                <div className="rounded-2xl border border-[#303033]/12 bg-[#FDFDFD] p-5 architectural-grid">
                  <div className="flex items-center justify-between font-tech text-[10px] uppercase tracking-[0.18em] text-[#777271] mb-3">
                    <span>ARCHITECTURAL ROUTE SCHEMATIC</span>
                    <span>{STORE_INFO.coordinates}</span>
                  </div>
                  <svg
                    viewBox="0 0 520 160"
                    className="w-full h-36"
                    aria-label="Schematic map of Sarojini Devi Road, Nehru Nagar, Tirupati"
                  >
                    <line x1="20" y1="95" x2="500" y2="65" stroke="#B8202A" strokeWidth="4" />
                    <line x1="210" y1="12" x2="245" y2="150" stroke="#D4CFCD" strokeWidth="2.5" />
                    <circle cx="290" cy="78" r="18" fill="rgba(184,32,42,0.14)" />
                    <circle cx="290" cy="78" r="7" fill="#B8202A" />
                    <text x="315" y="74" className="font-sans-precision text-[12px] font-semibold" fill="#303033">
                      Sri Gajender Traders (1st Floor)
                    </text>
                    <text x="315" y="92" className="font-tech text-[9px]" fill="#777271">
                      5-1-6, Sarojini Devi Rd, Nehru Nagar
                    </text>
                    <text x="35" y="114" className="font-tech text-[9px]" fill="#777271">
                      SAROJINI DEVI ROAD CORRIDOR · TIRUPATI 517501
                    </text>
                  </svg>
                </div>

                <div className="flex flex-wrap gap-3">
                  <a
                    href={STORE_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#B8202A] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.13em] text-[#FDFDFD] hover:bg-[#961923]"
                  >
                    <Compass className="h-4 w-4" />
                    <span>Launch Google Maps Navigation</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </a>

                  <a
                    href={STORE_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-[#303033]/16 bg-white px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.13em] text-[#303033] hover:border-[#B8202A]"
                  >
                    <span>Instagram {STORE_INFO.instagramHandle}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Right 5 Cols: Complete Verified Operating Hours Ledger */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-[2.25rem] bg-[#F5F3F2] border border-[#B8202A]/45 p-7 sm:p-9 studio-shadow-soft space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-tech text-[11px] uppercase tracking-[0.2em] text-[#B8202A]">
                  <Clock className="h-4 w-4 text-[#B8202A]" />
                  <span>Showroom Hours (IST)</span>
                </div>
                <span className="font-tech text-[10px] text-[#777271]">TIRUPATI</span>
              </div>

              <div className="divide-y divide-[#303033]/8 rounded-2xl bg-[#FDFDFD] p-4 border border-white">
                {STORE_INFO.hours.map((entry) => (
                  <div
                    key={entry.day}
                    className={`flex items-center justify-between py-2.5 px-2 rounded-lg text-xs sm:text-sm ${
                      entry.highlight
                        ? 'bg-[#B8202A]/8 font-semibold text-[#B8202A]'
                        : 'text-[#303033]'
                    }`}
                  >
                    <span>{entry.day}</span>
                    <span className="font-tech text-xs">{entry.hours}</span>
                  </div>
                ))}
              </div>

              <p className="text-xs text-[#777271] leading-relaxed">
                {status.sublabel}. On Tuesdays, Sri Gajender Traders operates continuously 24 hours
                to accommodate regional wholesale dispatches and walk-in buyers.
              </p>

              <button
                type="button"
                onClick={() => onOpenConcierge('retail')}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#303033] px-6 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#FDFDFD] transition hover:bg-[#B8202A]"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Open Instant Price &amp; Visit Concierge</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
