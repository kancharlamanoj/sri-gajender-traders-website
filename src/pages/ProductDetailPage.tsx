import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  MapPin,
  MessageCircle,
  ZoomIn,
} from 'lucide-react';
import {
  buildWhatsAppEnquiryUrl,
  formatProductWhatsAppMessage,
  PRODUCTS,
  ProductItem,
  STORE_INFO,
} from '../data/catalogData';
import { NavigateFn } from '../types/navigation';
import { ProductCard } from '../components/catalogue/ProductCard';
import { BrandWordmark } from '../components/ui/BrandWordmark';

interface ProductDetailPageProps {
  product: ProductItem;
  onNavigate: NavigateFn;
  onSelectProduct: (product: ProductItem) => void;
  onEnquireProduct: (product: ProductItem) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onNavigate,
  onSelectProduct,
  onEnquireProduct,
}) => {
  const [activeImgIdx, setActiveImgIdx] = useState<0 | 1>(0);
  const [zoomActive, setZoomActive] = useState(false);
  const [cropOrigin, setCropOrigin] = useState({ x: 50, y: 50 });
  const [qtyNote, setQtyNote] = useState('1 Unit');
  const [openAccordion, setOpenAccordion] = useState<string | null>('procurement');

  useEffect(() => {
    setActiveImgIdx(0);
    setZoomActive(false);
  }, [product.id]);

  const gallery = [product.primaryImage, product.secondaryImage];

  const handleImageMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setCropOrigin({ x, y });
  };

  const whatsappDirect = buildWhatsAppEnquiryUrl(
    formatProductWhatsAppMessage(product, qtyNote)
  );

  const relatedProducts = PRODUCTS.filter(
    (p) =>
      p.id !== product.id &&
      (p.category === product.category || p.brandId === product.brandId)
  ).slice(0, 3);

  const ACCORDION_ITEMS = [
    {
      id: 'procurement',
      title: 'Pricing & Live Availability in Tirupati',
      body:
        'Because Sri Gajender Traders serves both walk-in customers and regional wholesale accounts across Andhra Pradesh, pricing and live stock vary by order volume and current batch arrivals. Click “Enquire for Price” or send the pre-filled WhatsApp message to receive an immediate quote.',
    },
    {
      id: 'wholesale',
      title: 'Retailer & Institutional Bulk Supply',
      body:
        'Planning a multi-unit purchase for an electronics store, office, hotel, or institution? Specify your required quantity above or visit our Wholesale Desk for structured multi-unit quotations.',
    },
    {
      id: 'warranty',
      title: 'Manufacturer Warranty Guidance',
      body:
        'Applicable warranty coverage and service terms are governed by the respective brand manufacturer (' +
        product.brandName +
        '). Retain your original purchase invoice from Sri Gajender Traders and contact our Nehru Nagar desk if you need brand service guidance.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFD] pt-28 sm:pt-34 pb-24">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        {/* Breadcrumb Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-[#303033]/10">
          <div className="flex items-center gap-2 font-tech text-[11px] uppercase tracking-[0.16em] text-[#777271]">
            <button
              type="button"
              onClick={() => onNavigate({ page: 'catalogue', category: 'all', brand: 'all' })}
              className="inline-flex items-center gap-1.5 text-[#303033] hover:text-[#B8202A] transition"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Catalogue</span>
            </button>
            <span>/</span>
            <button
              type="button"
              onClick={() => onNavigate({ page: 'catalogue', category: product.category })}
              className="hover:text-[#303033]"
            >
              {product.categoryLabel}
            </button>
            <span>/</span>
            <span className="text-[#B8202A]">{product.model}</span>
          </div>

          <span className="font-tech text-[10px] uppercase tracking-[0.2em] text-[#777271]">
            {product.indexCode} // VERIFIED DOSSIER
          </span>
        </div>

        {/* Main Split Product Installation */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left: Interactive Crop-Zoom Studio Gallery */}
          <div className="lg:col-span-7 lg:sticky lg:top-28 space-y-4">
            <div
              onMouseMove={handleImageMove}
              onMouseEnter={() => setZoomActive(true)}
              onMouseLeave={() => setZoomActive(false)}
              onClick={() => setZoomActive((z) => !z)}
              data-cursor="ZOOM"
              className="relative overflow-hidden rounded-[2.25rem] border border-white bg-[#F5F3F2] studio-shadow aspect-[4/3.4] cursor-zoom-in"
            >
              <img
                src={gallery[activeImgIdx]}
                alt={`${product.name} — Model ${product.model}`}
                style={{
                  transformOrigin: `${cropOrigin.x}% ${cropOrigin.y}%`,
                  transform: zoomActive ? 'scale(1.6)' : 'scale(1)',
                }}
                className="h-full w-full object-cover transition-transform duration-300 ease-out"
              />

              <div className="pointer-events-none absolute bottom-4 right-4 rounded-full glass-porcelain px-3.5 py-1.5 flex items-center gap-1.5 font-tech text-[10px] uppercase tracking-[0.15em] text-[#303033]">
                <ZoomIn className="h-3.5 w-3.5 text-[#B8202A]" />
                <span>{zoomActive ? 'Interactive Crop Active' : 'Hover to Inspect Detail'}</span>
              </div>
            </div>

            {/* Thumbnail Selector */}
            <div className="flex items-center gap-4">
              {gallery.map((imgUrl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImgIdx(idx as 0 | 1)}
                  className={`relative overflow-hidden rounded-2xl border-2 transition ${
                    activeImgIdx === idx
                      ? 'border-[#B8202A] shadow-sm'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`${product.name} view ${idx + 1}`}
                    className="h-20 w-28 object-cover"
                  />
                </button>
              ))}
              <div className="ml-auto hidden sm:block font-tech text-[10px] uppercase tracking-[0.18em] text-[#777271]">
                STUDIO PERSPECTIVES // 0{activeImgIdx + 1} OF 02
              </div>
            </div>
          </div>

          {/* Right: Editorial Details, Verified Specifications & Enquiry Console */}
          <div className="lg:col-span-5 space-y-7">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-4">
                <BrandWordmark brandId={product.brandId} size="md" />
                <span className="rounded-full bg-[#F5F3F2] border border-[#B8202A]/35 px-3 py-1 font-tech text-[10px] uppercase tracking-[0.16em] text-[#303033]">
                  MODEL: {product.model}
                </span>
              </div>

              <h1 className="font-editorial text-4xl sm:text-5xl font-normal leading-[1.03] text-[#303033]">
                {product.name}
              </h1>

              <p className="text-sm sm:text-base text-[#777271] leading-relaxed">
                {product.editorialSummary}
              </p>
            </div>

            {/* Highlights Pills */}
            <div className="flex flex-wrap gap-2">
              {product.keyHighlights.map((hl) => (
                <span
                  key={hl}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#F5F3F2] px-3 py-1.5 font-tech text-[10px] tracking-[0.08em] text-[#303033]"
                >
                  <CheckCircle2 className="h-3 w-3 text-[#B8202A]" />
                  <span>{hl}</span>
                </span>
              ))}
            </div>

            {/* Luxury Price & WhatsApp Action Box */}
            <div className="rounded-[2rem] bg-[#F5F3F2] border border-[#B8202A]/45 p-6 space-y-4 studio-shadow-soft">
              <div className="flex items-baseline justify-between gap-4">
                <div>
                  <span className="font-tech text-[10px] uppercase tracking-[0.2em] text-[#777271]">
                    RETAIL &amp; TRADE QUOTATION
                  </span>
                  <div className="mt-0.5 font-editorial text-3xl font-medium text-[#303033]">
                    Enquire for Price
                  </div>
                </div>
                <span className="font-tech text-[10px] uppercase tracking-[0.14em] text-[#B8202A]">
                  Tirupati Showroom
                </span>
              </div>

              <div>
                <label
                  htmlFor="detail-qty"
                  className="block font-tech text-[10px] uppercase tracking-[0.16em] text-[#777271] mb-1.5"
                >
                  Desired Quantity / Note for WhatsApp Enquiry
                </label>
                <input
                  id="detail-qty"
                  type="text"
                  value={qtyNote}
                  onChange={(e) => setQtyNote(e.target.value)}
                  placeholder="e.g. 1 Unit or 15 Units (Retailer Bulk)"
                  className="w-full rounded-xl border border-[#303033]/14 bg-white px-3.5 py-2.5 text-sm text-[#303033] focus:border-[#B8202A] focus:outline-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <a
                  href={whatsappDirect}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#B8202A] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#FDFDFD] transition hover:bg-[#961923] shadow-sm"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>WhatsApp Price Enquiry</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>

                <button
                  type="button"
                  onClick={() => onEnquireProduct(product)}
                  className="inline-flex items-center justify-center rounded-full border border-[#303033]/18 bg-white px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#303033] transition hover:border-[#B8202A]"
                >
                  Customise Brief
                </button>
              </div>

              <div className="pt-2 border-t border-[#303033]/8 flex items-center gap-2 text-[11px] text-[#777271]">
                <MapPin className="h-3.5 w-3.5 text-[#B8202A] shrink-0" />
                <span>{STORE_INFO.fullAddress}</span>
              </div>
            </div>

            {/* Verified Technical Specification Matrix */}
            <div className="rounded-[2rem] border border-[#303033]/12 bg-white p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#303033]/10">
                <h2 className="font-tech text-[11px] uppercase tracking-[0.2em] text-[#303033]">
                  Verified Manufacturer Specifications
                </h2>
                <span className="font-tech text-[10px] text-[#777271]">{product.brandName}</span>
              </div>

              <dl className="divide-y divide-[#303033]/8">
                {product.verifiedSpecs.map((spec) => (
                  <div
                    key={spec.label}
                    className="py-3 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 text-xs"
                  >
                    <dt className="sm:col-span-5 font-tech text-[10px] uppercase tracking-[0.12em] text-[#777271]">
                      {spec.label}
                    </dt>
                    <dd className="sm:col-span-7 font-medium text-[#303033]">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Smooth Accordions */}
            <div className="divide-y divide-[#303033]/10 rounded-2xl border border-[#303033]/10 bg-[#FDFDFD] px-5">
              {ACCORDION_ITEMS.map((item) => {
                const isOpen = openAccordion === item.id;
                return (
                  <div key={item.id} className="py-4">
                    <button
                      type="button"
                      onClick={() => setOpenAccordion(isOpen ? null : item.id)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between text-left text-sm font-medium text-[#303033]"
                    >
                      <span>{item.title}</span>
                      <ChevronDown
                        className={`h-4 w-4 text-[#777271] transition-transform duration-300 ${
                          isOpen ? 'rotate-180 text-[#B8202A]' : ''
                        }`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.26 }}
                          className="overflow-hidden"
                        >
                          <p className="pt-2.5 text-xs leading-relaxed text-[#777271]">
                            {item.body}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 pt-16 border-t border-[#303033]/10">
            <div className="flex items-end justify-between gap-4 mb-8">
              <div>
                <div className="font-tech text-[10px] uppercase tracking-[0.22em] text-[#B8202A]">
                  COMPANION HARDWARE
                </div>
                <h2 className="mt-1 font-editorial text-3xl sm:text-4xl text-[#303033]">
                  Related Curated Models
                </h2>
              </div>
              <button
                type="button"
                onClick={() => onNavigate({ page: 'catalogue', category: product.category })}
                className="font-tech text-xs uppercase tracking-[0.14em] text-[#B8202A] editorial-underline"
              >
                View All in Category
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {relatedProducts.map((rel) => (
                <ProductCard
                  key={rel.id}
                  product={rel}
                  onSelectProduct={onSelectProduct}
                  onEnquireProduct={onEnquireProduct}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
