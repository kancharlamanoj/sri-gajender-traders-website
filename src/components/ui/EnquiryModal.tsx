import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowUpRight,
  Check,
  Copy,
  MapPin,
  MessageCircle,
  Sparkles,
  X,
} from 'lucide-react';
import {
  buildWhatsAppEnquiryUrl,
  ProductItem,
  STORE_INFO,
} from '../../data/catalogData';
import { logNewInquiry } from '../../utils/adminStore';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: ProductItem | null;
  initialMode?: 'retail' | 'wholesale' | 'warranty';
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  product,
  initialMode = 'retail',
}) => {
  const [mode, setMode] = useState<'retail' | 'wholesale' | 'warranty'>(initialMode);
  const [customerName, setCustomerName] = useState('');
  const [quantity, setQuantity] = useState('1 Unit');
  const [notes, setNotes] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMode(initialMode);
    if (initialMode === 'wholesale') {
      setQuantity('10+ Units (Bulk Requirement)');
    } else {
      setQuantity('1 Unit');
    }
  }, [initialMode, product]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const composeMessage = () => {
    const header = `Hello Sri Gajender Traders (Nehru Nagar, Tirupati),`;
    const intentMap = {
      retail: 'I would like to enquire about current pricing & availability:',
      wholesale: 'I am reaching out regarding a Business / Wholesale requirement:',
      warranty: 'I would like assistance regarding manufacturer warranty / service guidance:',
    };

    const lines: string[] = [header, '', intentMap[mode]];
    if (product) {
      lines.push(`• Product: ${product.name}`);
      lines.push(`• Brand: ${product.brandName}`);
      lines.push(`• Model: ${product.model}`);
      lines.push(`• Category: ${product.categoryLabel}`);
    } else {
      lines.push(`• Category / Brand Enquiry: General Flagship Catalogue`);
    }

    if (mode !== 'warranty' && quantity.trim()) {
      lines.push(`• Estimated Quantity: ${quantity.trim()}`);
    }
    if (customerName.trim()) {
      lines.push(`• Name / Business: ${customerName.trim()}`);
    }
    if (notes.trim()) {
      lines.push(`• Note: ${notes.trim()}`);
    }
    lines.push('', 'Please share current details at your convenience.');
    return lines.join('\n');
  };

  const formattedMessage = composeMessage();
  const whatsappHref = buildWhatsAppEnquiryUrl(formattedMessage);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formattedMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="enquiry-modal-title"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#303033]/35 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.38, ease: [0.19, 1, 0.22, 1] }}
            className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#FDFDFD] border border-[#B8202A]/35 studio-shadow p-6 sm:p-8"
          >
            <div className="flex items-start justify-between gap-4 border-b border-[#303033]/10 pb-5">
              <div>
                <div className="flex items-center gap-2 font-tech text-[11px] uppercase tracking-[0.2em] text-[#B8202A]">
                  <Sparkles className="h-3.5 w-3.5 text-[#B8202A]" />
                  <span>Direct Price &amp; Availability Concierge</span>
                </div>
                <h3
                  id="enquiry-modal-title"
                  className="mt-1.5 font-editorial text-3xl sm:text-4xl font-medium text-[#303033]"
                >
                  {product ? product.name : 'Enquire with Sri Gajender Traders'}
                </h3>
                {product && (
                  <p className="mt-1 font-tech text-xs text-[#777271]">
                    BRAND: {product.brandName.toUpperCase()} &nbsp;//&nbsp; MODEL: {product.model}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close enquiry modal"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#303033]/12 bg-[#F5F3F2] text-[#303033] transition hover:border-[#B8202A] hover:bg-[#B8202A] hover:text-[#FDFDFD]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {product && (
              <div className="mt-5 flex items-center gap-4 rounded-2xl bg-[#F5F3F2]/85 p-3.5 border border-[#B8202A]/25">
                <img
                  src={product.primaryImage}
                  alt={product.name}
                  className="h-16 w-16 rounded-xl object-cover border border-white"
                />
                <div className="min-w-0 flex-1">
                  <div className="font-tech text-[10px] uppercase tracking-[0.18em] text-[#777271]">
                    {product.indexCode} · {product.categoryLabel}
                  </div>
                  <div className="truncate font-medium text-sm text-[#303033]">
                    {product.tagline}
                  </div>
                  <div className="mt-1 text-xs text-[#B8202A] font-medium">
                    Enquire for Current Price &amp; Live Store Availability
                  </div>
                </div>
              </div>
            )}

            {/* Mode Selector */}
            <div className="mt-5 grid grid-cols-3 gap-2 rounded-2xl bg-[#F5F3F2] p-1.5">
              {(
                [
                  { id: 'retail', label: 'Retail Price' },
                  { id: 'wholesale', label: 'Wholesale / Bulk' },
                  { id: 'warranty', label: 'Warranty Help' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setMode(tab.id);
                    if (tab.id === 'wholesale') setQuantity('10+ Units');
                    if (tab.id === 'retail') setQuantity('1 Unit');
                  }}
                  className={`rounded-xl py-2 px-3 text-xs font-medium transition ${
                    mode === tab.id
                      ? 'bg-[#FDFDFD] text-[#303033] shadow-sm border border-[#B8202A]/35'
                      : 'text-[#777271] hover:text-[#303033]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Form Inputs */}
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-tech text-[10px] uppercase tracking-[0.16em] text-[#777271] mb-1.5">
                  Your Name or Business (Optional)
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Karthik / Tirupati Retail"
                  className="w-full rounded-xl border border-[#303033]/14 bg-white px-3.5 py-2.5 text-sm text-[#303033] placeholder:text-[#777271]/70 focus:border-[#B8202A] focus:outline-none"
                />
              </div>

              {mode !== 'warranty' ? (
                <div>
                  <label className="block font-tech text-[10px] uppercase tracking-[0.16em] text-[#777271] mb-1.5">
                    Estimated Quantity
                  </label>
                  <input
                    type="text"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="e.g. 1 Unit or 25 Units"
                    className="w-full rounded-xl border border-[#303033]/14 bg-white px-3.5 py-2.5 text-sm text-[#303033] placeholder:text-[#777271]/70 focus:border-[#B8202A] focus:outline-none"
                  />
                </div>
              ) : (
                <div>
                  <label className="block font-tech text-[10px] uppercase tracking-[0.16em] text-[#777271] mb-1.5">
                    Purchase / Invoice Reference
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Invoice date or brand service query"
                    className="w-full rounded-xl border border-[#303033]/14 bg-white px-3.5 py-2.5 text-sm text-[#303033] placeholder:text-[#777271]/70 focus:border-[#B8202A] focus:outline-none"
                  />
                </div>
              )}
            </div>

            {mode !== 'warranty' && (
              <div className="mt-4">
                <label className="block font-tech text-[10px] uppercase tracking-[0.16em] text-[#777271] mb-1.5">
                  Specific Requirement Note (Optional)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Preferred color, delivery in Tirupati, or multi-model quote..."
                  className="w-full rounded-xl border border-[#303033]/14 bg-white px-3.5 py-2.5 text-sm text-[#303033] placeholder:text-[#777271]/70 focus:border-[#B8202A] focus:outline-none"
                />
              </div>
            )}

            {/* Live Message Preview */}
            <div className="mt-5 rounded-2xl border border-[#303033]/10 bg-[#F5F3F2]/60 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-tech text-[10px] uppercase tracking-[0.18em] text-[#777271]">
                  Generated WhatsApp Dispatch Preview
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 font-tech text-[11px] text-[#B8202A] hover:underline"
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Text'}</span>
                </button>
              </div>
              <pre className="whitespace-pre-wrap font-sans-precision text-xs leading-relaxed text-[#303033]">
                {formattedMessage}
              </pre>
            </div>

            {/* Primary Actions */}
            <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  try {
                    logNewInquiry({
                      type: mode,
                      customerName: customerName.trim() || 'Website Visitor',
                      productName: product ? `${product.name} (${product.model})` : undefined,
                      quantity: quantity || undefined,
                      notes: notes.trim() || undefined,
                    });
                  } catch {
                    // ignore
                  }
                }}
                className="flex-1 inline-flex items-center justify-center gap-2.5 rounded-full bg-[#B8202A] px-6 py-3.5 text-sm font-medium text-[#FDFDFD] transition hover:bg-[#961923] shadow-md"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Send WhatsApp Enquiry</span>
                <ArrowUpRight className="h-4 w-4 opacity-80" />
              </a>

              <a
                href={STORE_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#303033]/16 bg-white px-5 py-3.5 text-xs font-medium text-[#303033] transition hover:border-[#B8202A]"
              >
                <span>{STORE_INFO.instagramHandle}</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-[#777271]" />
              </a>

              <a
                href={STORE_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[#303033]/16 bg-white px-4 py-3.5 text-xs font-medium text-[#303033] transition hover:border-[#B8202A]"
                title="Directions to Nehru Nagar, Tirupati"
              >
                <MapPin className="h-3.5 w-3.5 text-[#B8202A]" />
                <span>Directions</span>
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
