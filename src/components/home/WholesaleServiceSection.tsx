import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowUpRight,
  Building2,
  CheckCircle2,
  Layers,
  MessageCircle,
  PackageCheck,
  Tag,
} from 'lucide-react';
import { buildWhatsAppEnquiryUrl, CATEGORIES, BRAND_PROFILES } from '../../data/catalogData';
import { MaskTextReveal } from '../ui/MicroInteractions';

interface WholesaleServiceSectionProps {
  isStandalonePage?: boolean;
}

export const WholesaleServiceSection: React.FC<WholesaleServiceSectionProps> = ({
  isStandalonePage = false,
}) => {
  const [form, setForm] = useState({
    name: '',
    businessName: '',
    phone: '',
    productInterest: 'Audio & Wireless (boAt / Boult / Portronics)',
    estimatedQuantity: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!form.name.trim()) nextErrors.name = 'Please enter your name.';
    if (!form.businessName.trim())
      nextErrors.businessName = 'Please enter your store or organisation name.';
    if (!form.phone.trim() || form.phone.replace(/\D/g, '').length < 8)
      nextErrors.phone = 'Please enter a valid contact number.';
    if (!form.estimatedQuantity.trim())
      nextErrors.estimatedQuantity = 'Please share an estimated quantity.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const composeWholesaleMessage = () => {
    return [
      `Hello Sri Gajender Traders (Tirupati Wholesale Desk),`,
      ``,
      `I am submitting a Business / Wholesale Enquiry:`,
      `• Contact Name: ${form.name || '—'}`,
      `• Business / Store Name: ${form.businessName || '—'}`,
      `• Phone: ${form.phone || '—'}`,
      `• Product / Brand Interest: ${form.productInterest}`,
      `• Estimated Quantity: ${form.estimatedQuantity || '—'}`,
      form.message.trim() ? `• Additional Notes: ${form.message.trim()}` : '',
      ``,
      `Please share current availability and applicable wholesale pricing.`,
    ]
      .filter(Boolean)
      .join('\n');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  const whatsappDirectUrl = buildWhatsAppEnquiryUrl(composeWholesaleMessage());

  const PILLARS = [
    {
      icon: PackageCheck,
      title: 'Live Product Availability',
      desc: 'Confirm model readiness across seasonal assortments before placing retail or institutional orders.',
    },
    {
      icon: Layers,
      title: 'Tailored Bulk Requirements',
      desc: 'Multi-unit assortments for electronics dealers, corporate gifting, hotels, and campus deployments.',
    },
    {
      icon: Tag,
      title: 'Applicable Wholesale Pricing',
      desc: 'Structured B2B quotations aligned to order volume, model mix, and recurring trade requirements.',
    },
    {
      icon: Building2,
      title: 'Relevant Brands & Categories',
      desc: 'Portronics, boAt, Zebronics, Boult, Hikvision, Bombay Shaving Company, and currency counters.',
    },
  ];

  return (
    <section
      aria-label="Wholesale Trade & Business Service"
      className={`relative overflow-hidden ${
        isStandalonePage
          ? 'bg-[#FDFDFD] pt-32 pb-24 sm:pt-36'
          : 'bg-[#FDFDFD] py-24 sm:py-32'
      }`}
    >
      {/* Subtle Animated Architectural SVG Lines */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
        preserveAspectRatio="none"
        viewBox="0 0 1440 900"
      >
        <motion.path
          d="M -50 180 C 380 80, 920 340, 1490 140"
          fill="none"
          stroke="#B8202A"
          strokeWidth="0.9"
          initial={{ pathLength: 0.2, opacity: 0.3 }}
          whileInView={{ pathLength: 1, opacity: 0.7 }}
          viewport={{ once: true }}
          transition={{ duration: 2.2, ease: 'easeOut' }}
        />
        <motion.path
          d="M -50 720 C 480 600, 960 820, 1490 660"
          fill="none"
          stroke="#B8202A"
          strokeOpacity="0.22"
          strokeWidth="0.9"
          initial={{ pathLength: 0.2 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2.4, ease: 'easeOut' }}
        />
      </svg>

      <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left Split: Editorial Composition & B2B Pillars */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <div className="font-tech text-[11px] uppercase tracking-[0.24em] text-[#B8202A] mb-3">
                05 // ANDHRA DISTRIBUTION &amp; B2B DESK
              </div>
              <MaskTextReveal
                as={isStandalonePage ? 'h1' : 'h2'}
                lines={['Built for Business.', 'Designed for Possibility.']}
                className="font-editorial text-4xl sm:text-6xl lg:text-[4.25rem] font-normal leading-[0.97] tracking-tight text-[#303033]"
              />
              <p className="mt-5 max-w-xl text-sm sm:text-base leading-relaxed text-[#777271]">
                From independent mobile &amp; electronics retailers across Andhra Pradesh to
                hospitality properties, offices, and institutions in Tirupati, Sri Gajender Traders
                offers responsive commercial supply from Sarojini Devi Road.
              </p>
            </div>

            {/* 4 B2B Capability Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PILLARS.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className="rounded-2xl bg-[#F5F3F2]/85 border border-[#B8202A]/30 p-5 space-y-2.5"
                  >
                    <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#FDFDFD] border border-[#B8202A]/40 text-[#B8202A]">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h3 className="font-editorial text-2xl font-medium text-[#303033]">
                      {pillar.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-[#777271]">{pillar.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Direct WhatsApp Trade Desk Strip */}
            <div className="rounded-2xl bg-[#F5F3F2] border border-[#303033]/10 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="font-tech text-[10px] uppercase tracking-[0.2em] text-[#B8202A]">
                  INSTANT WHOLESALE DISPATCH
                </div>
                <p className="mt-1 text-xs text-[#777271]">
                  Prefer immediate messaging? Launch WhatsApp with your trade requirements.
                </p>
              </div>
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center justify-center gap-2 rounded-full bg-[#B8202A] px-5 py-3 text-xs font-medium text-[#FDFDFD] transition hover:bg-[#961923]"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                <span>Direct WhatsApp CTA</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Right Split: Refined Wholesale Enquiry Panel */}
          <div className="lg:col-span-6">
            <div className="rounded-[2.25rem] bg-white border border-[#B8202A]/45 p-6 sm:p-10 studio-shadow">
              <div className="flex items-center justify-between pb-5 border-b border-[#303033]/10">
                <div>
                  <span className="font-tech text-[10px] uppercase tracking-[0.2em] text-[#777271]">
                    TRADE ENQUIRY DOSSIER
                  </span>
                  <h3 className="mt-1 font-editorial text-3xl text-[#303033]">
                    Request Wholesale Quotation
                  </h3>
                </div>
                <span className="rounded-full bg-[#F5F3F2] px-3 py-1 font-tech text-[10px] text-[#B8202A]">
                  B2B · RETAILERS
                </span>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-8 space-y-5"
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#B8202A]/10 text-[#B8202A]">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h4 className="font-editorial text-3xl text-[#303033]">
                    Wholesale Brief Prepared for {form.businessName}
                  </h4>
                  <p className="text-sm text-[#777271] leading-relaxed">
                    Your trade requirement for <strong>{form.productInterest}</strong> (Qty:{' '}
                    <strong>{form.estimatedQuantity}</strong>) is formatted and ready. Dispatch via
                    WhatsApp below to connect directly with Sri Gajender Traders, Tirupati.
                  </p>
                  <div className="rounded-2xl bg-[#F5F3F2] p-4 font-sans-precision text-xs text-[#303033] whitespace-pre-wrap">
                    {composeWholesaleMessage()}
                  </div>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <a
                      href={whatsappDirectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-[#B8202A] px-6 py-3.5 text-xs font-medium text-[#FDFDFD] transition hover:bg-[#961923]"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>Send Wholesale Brief on WhatsApp</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="rounded-full border border-[#303033]/16 px-5 py-3.5 text-xs font-medium text-[#303033] hover:border-[#B8202A]"
                    >
                      Edit Details
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="ws-name"
                        className="block font-tech text-[10px] uppercase tracking-[0.16em] text-[#777271] mb-1.5"
                      >
                        Your Name *
                      </label>
                      <input
                        id="ws-name"
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Full name"
                        className="w-full rounded-xl border border-[#303033]/15 bg-[#FDFDFD] px-4 py-3 text-sm text-[#303033] focus:border-[#B8202A] focus:bg-white focus:outline-none"
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-red-700">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="ws-business"
                        className="block font-tech text-[10px] uppercase tracking-[0.16em] text-[#777271] mb-1.5"
                      >
                        Business / Store Name *
                      </label>
                      <input
                        id="ws-business"
                        type="text"
                        value={form.businessName}
                        onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                        placeholder="Retail store or enterprise"
                        className="w-full rounded-xl border border-[#303033]/15 bg-[#FDFDFD] px-4 py-3 text-sm text-[#303033] focus:border-[#B8202A] focus:bg-white focus:outline-none"
                      />
                      {errors.businessName && (
                        <p className="mt-1 text-xs text-red-700">{errors.businessName}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="ws-phone"
                        className="block font-tech text-[10px] uppercase tracking-[0.16em] text-[#777271] mb-1.5"
                      >
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        id="ws-phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+91 9XXXXXXXXX"
                        className="w-full rounded-xl border border-[#303033]/15 bg-[#FDFDFD] px-4 py-3 text-sm text-[#303033] focus:border-[#B8202A] focus:bg-white focus:outline-none"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-xs text-red-700">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="ws-qty"
                        className="block font-tech text-[10px] uppercase tracking-[0.16em] text-[#777271] mb-1.5"
                      >
                        Estimated Quantity *
                      </label>
                      <input
                        id="ws-qty"
                        type="text"
                        value={form.estimatedQuantity}
                        onChange={(e) =>
                          setForm({ ...form, estimatedQuantity: e.target.value })
                        }
                        placeholder="e.g. 20 Units / Assorted Carton"
                        className="w-full rounded-xl border border-[#303033]/15 bg-[#FDFDFD] px-4 py-3 text-sm text-[#303033] focus:border-[#B8202A] focus:bg-white focus:outline-none"
                      />
                      {errors.estimatedQuantity && (
                        <p className="mt-1 text-xs text-red-700">
                          {errors.estimatedQuantity}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="ws-interest"
                      className="block font-tech text-[10px] uppercase tracking-[0.16em] text-[#777271] mb-1.5"
                    >
                      Product Category or Brand Interest
                    </label>
                    <select
                      id="ws-interest"
                      value={form.productInterest}
                      onChange={(e) =>
                        setForm({ ...form, productInterest: e.target.value })
                      }
                      className="w-full rounded-xl border border-[#303033]/15 bg-[#FDFDFD] px-4 py-3 text-sm text-[#303033] focus:border-[#B8202A] focus:bg-white focus:outline-none"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c.slug} value={`${c.name} (${c.brandsIncluded.join(', ')})`}>
                          Category: {c.name} ({c.brandsIncluded.join(', ')})
                        </option>
                      ))}
                      {BRAND_PROFILES.map((b) => (
                        <option key={b.id} value={`Brand Lineup: ${b.name}`}>
                          Brand Focus: {b.name} — {b.categoryFocus}
                        </option>
                      ))}
                      <option value="Multi-Brand Retail Store Stocking">
                        Multi-Brand Assortment (All Categories)
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="ws-msg"
                      className="block font-tech text-[10px] uppercase tracking-[0.16em] text-[#777271] mb-1.5"
                    >
                      Requirement Details / Models Needed
                    </label>
                    <textarea
                      id="ws-msg"
                      rows={3}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Specify preferred models, delivery city in Andhra Pradesh, or recurring supply schedule..."
                      className="w-full rounded-xl border border-[#303033]/15 bg-[#FDFDFD] px-4 py-3 text-sm text-[#303033] focus:border-[#B8202A] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      type="submit"
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#303033] px-6 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#FDFDFD] transition hover:bg-[#B8202A]"
                    >
                      <span>Prepare Trade Enquiry</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </button>

                    <a
                      href={whatsappDirectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-[#B8202A] bg-[#F5F3F2] px-5 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#B8202A] transition hover:bg-[#B8202A] hover:text-[#FDFDFD]"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>WhatsApp Desk</span>
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
