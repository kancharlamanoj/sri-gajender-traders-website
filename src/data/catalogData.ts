import heroSculpturalAudio from '../assets/images/hero-sculptural-audio.jpg';
import heroSpeakerSculpture from '../assets/images/hero-speaker-sculpture.jpg';
import heroGroomingSecurity from '../assets/images/hero-grooming-security.jpg';
import collectionWirelessEarbuds from '../assets/images/collection-wireless-earbuds.jpg';
import collectionPartySpeakers from '../assets/images/collection-party-speakers.jpg';
import collectionAccessories from '../assets/images/collection-accessories.jpg';
import collectionGrooming from '../assets/images/collection-grooming.jpg';
import collectionSecurity from '../assets/images/collection-security.jpg';
import collectionBusiness from '../assets/images/collection-business.jpg';
import showroomTirupatiEditorial from '../assets/images/showroom-tirupati-editorial.jpg';

export const STUDIO_ASSETS = {
  heroSculpturalAudio,
  heroSpeakerSculpture,
  heroGroomingSecurity,
  collectionWirelessEarbuds,
  collectionPartySpeakers,
  collectionAccessories,
  collectionGrooming,
  collectionSecurity,
  collectionBusiness,
  showroomTirupatiEditorial,
};

export type CategorySlug =
  | 'audio-wireless'
  | 'speakers-entertainment'
  | 'accessories'
  | 'grooming'
  | 'cctv-security'
  | 'business-equipment';

export type BrandId =
  | 'portronics'
  | 'boat'
  | 'zebronics'
  | 'boult'
  | 'hikvision'
  | 'bombay-shaving-company'
  | 'commercial-hardware';

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductItem {
  id: string;
  indexCode: string;
  name: string;
  brandId: BrandId;
  brandName: string;
  model: string;
  category: CategorySlug;
  categoryLabel: string;
  tagline: string;
  editorialSummary: string;
  primaryImage: string;
  secondaryImage: string;
  imageCropClass?: string;
  verifiedSpecs: ProductSpec[];
  keyHighlights: string[];
  featured?: boolean;
}

export interface CategoryInfo {
  slug: CategorySlug;
  index: string;
  name: string;
  shortTitle: string;
  editorialTitle: string;
  subtitle: string;
  technicalAnnotation: string;
  image: string;
  brandsIncluded: string[];
}

export interface BrandProfile {
  id: Exclude<BrandId, 'commercial-hardware'>;
  index: string;
  name: string;
  monogram: string;
  originNote: string;
  categoryFocus: string;
  editorialHeadline: string;
  description: string;
  heroImage: string;
  accentTone: string;
  signatureCapabilities: string[];
}

export interface StoreHour {
  day: string;
  hours: string;
  highlight: boolean;
}

export interface StoreInfo {
  name: string;
  flagshipTitle: string;
  roleStatement: string;
  phone: string;
  displayPhone: string;
  addressLine1: string;
  addressLine2: string;
  fullAddress: string;
  coordinates: string;
  locality: string;
  instagramUrl: string;
  instagramHandle: string;
  googleMapsUrl: string;
  hours: StoreHour[];
  regionalHeritageNote: string;
}

export const STORE_INFO: StoreInfo = {
  name: 'Sri Gajender Traders',
  flagshipTitle: 'The Future, Curated.',
  roleStatement:
    'Andhra Pradesh regional supplier & retail flagship carrying consumer audio, personal grooming, workspace peripherals, optical surveillance, and commercial equipment.',
  phone: '+91 8179106524',
  displayPhone: '8179106524',
  addressLine1: '1st Floor, 5-1-6, Sarojini Devi Rd',
  addressLine2: 'Nehru Nagar, Tirupati, Andhra Pradesh 517501',
  fullAddress: '1st floor, 5-1-6, Sarojini Devi Rd, Nehru Nagar, Tirupati, Andhra Pradesh 517501',
  coordinates: '13.6288° N · 79.4192° E',
  locality: 'Nehru Nagar · Sarojini Devi Road · Tirupati',
  instagramUrl: 'https://www.instagram.com/gajender_traders/',
  instagramHandle: '@gajender_traders',
  googleMapsUrl:
    'https://www.google.com/maps/search/?api=1&query=1st+floor+5-1-6+Sarojini+Devi+Rd+Nehru+Nagar+Tirupati+Andhra+Pradesh+517501',
  hours: [
    { day: 'Monday', hours: '9:30 AM – 9:30 PM', highlight: false },
    { day: 'Tuesday', hours: 'Open 24 Hours', highlight: true },
    { day: 'Wednesday', hours: '9:30 AM – 9:30 PM', highlight: false },
    { day: 'Thursday', hours: '9:30 AM – 9:30 PM', highlight: false },
    { day: 'Friday', hours: '9:30 AM – 9:30 PM', highlight: false },
    { day: 'Saturday', hours: '9:30 AM – 9:30 PM', highlight: false },
    { day: 'Sunday', hours: '9:30 AM – 2:00 PM', highlight: false },
  ],
  regionalHeritageNote:
    'Rooted in Tirupati’s commercial heart on Sarojini Devi Road, Sri Gajender Traders bridges modern consumer technology, optical security, and business hardware alongside enduring regional wholesale trade—including traditional coconut supply across Andhra Pradesh.',
};

export function getLiveStoreStatus(): {
  isOpen: boolean;
  label: string;
  sublabel: string;
} {
  try {
    const now = new Date();
    const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
    const istDate = new Date(utcMs + 5.5 * 3600 * 1000);
    const day = istDate.getDay(); // 0 = Sun, 1 = Mon, 2 = Tue...
    const minutes = istDate.getHours() * 60 + istDate.getMinutes();

    if (day === 2) {
      return {
        isOpen: true,
        label: 'Open Now · 24-Hour Tuesday Atelier',
        sublabel: 'Open continuously all Tuesday in Tirupati (IST)',
      };
    }

    if (day === 0) {
      const openMin = 9 * 60 + 30;
      const closeMin = 14 * 60;
      if (minutes >= openMin && minutes < closeMin) {
        return {
          isOpen: true,
          label: 'Open Now · Sunday Hours',
          sublabel: 'Open today until 2:00 PM IST',
        };
      }
      return {
        isOpen: false,
        label: 'Showroom Currently Closed',
        sublabel: 'Reopens Monday at 9:30 AM IST',
      };
    }

    // Mon, Wed, Thu, Fri, Sat: 9:30 AM - 9:30 PM
    const openMin = 9 * 60 + 30;
    const closeMin = 21 * 60 + 30;
    if (minutes >= openMin && minutes < closeMin) {
      return {
        isOpen: true,
        label: 'Open Now · Nehru Nagar Atelier',
        sublabel: 'Open today until 9:30 PM IST',
      };
    }

    return {
      isOpen: false,
      label: 'Showroom Currently Closed',
      sublabel: day === 1 && minutes >= closeMin ? 'Opens Tuesday (24 Hours) IST' : 'Opens at 9:30 AM IST',
    };
  } catch {
    return {
      isOpen: true,
      label: 'Tirupati Flagship · Nehru Nagar',
      sublabel: 'Mon, Wed–Sat 9:30 AM–9:30 PM · Tue 24h · Sun 9:30 AM–2:00 PM',
    };
  }
}

export function buildWhatsAppEnquiryUrl(message: string, customPhone?: string): string {
  let targetNumber = customPhone?.replace(/[^0-9]/g, '') || '';
  if (!targetNumber && typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem('sgt_admin_settings_v1');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.customWhatsAppNumber) {
          targetNumber = parsed.customWhatsAppNumber.replace(/[^0-9]/g, '');
        }
      }
    } catch {
      // ignore
    }
  }
  // Hardcoded verified store default: 8179106524
  if (!targetNumber) {
    targetNumber = '918179106524';
  }
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${targetNumber}?text=${encoded}`;
}

export function formatProductWhatsAppMessage(product: ProductItem, quantityNote?: string): string {
  const lines = [
    `Hello Sri Gajender Traders (Tirupati),`,
    ``,
    `I would like to enquire about pricing and current availability for:`,
    `• Product: ${product.name}`,
    `• Brand: ${product.brandName}`,
    `• Model: ${product.model}`,
    `• Category: ${product.categoryLabel}`,
  ];
  if (quantityNote && quantityNote.trim()) {
    lines.push(`• Requirement / Quantity: ${quantityNote.trim()}`);
  }
  lines.push(``, `Please share applicable retail/wholesale details.`);
  return lines.join('\n');
}

export const CATEGORIES: CategoryInfo[] = [
  {
    slug: 'audio-wireless',
    index: '01',
    name: 'Audio & Wireless',
    shortTitle: 'Personal Acoustics',
    editorialTitle: 'Sculpted Silence & Intimate Sound.',
    subtitle:
      'Active noise cancellation, high-efficiency dynamic drivers, and multi-day endurance across boAt, Boult, and Portronics true wireless silhouettes.',
    technicalAnnotation: 'FREQ 20Hz–20kHz · ANC UP TO 32dB · BT 5.2 / 5.3',
    image: collectionWirelessEarbuds,
    brandsIncluded: ['boAt', 'Boult', 'Portronics'],
  },
  {
    slug: 'speakers-entertainment',
    index: '02',
    name: 'Speakers & Entertainment',
    shortTitle: 'Spatial Projection',
    editorialTitle: 'Architectural Presence. Room-Filling Resonance.',
    subtitle:
      'From compact cylindrical acoustic drums to high-output party towers engineered with dual passive radiators and TWS stereo pairing.',
    technicalAnnotation: 'OUTPUT 12W–90W RMS · TWS LINK · MULTI-INPUT',
    image: collectionPartySpeakers,
    brandsIncluded: ['Portronics', 'boAt', 'Zebronics'],
  },
  {
    slug: 'accessories',
    index: '03',
    name: 'Mobile & Computer Accessories',
    shortTitle: 'Precision Interfaces',
    editorialTitle: 'Tactile Instruments for the Modern Desk.',
    subtitle:
      'Ergonomic optical peripherals, silent wireless keyswitches, and intelligent USB-C Power Delivery charging modules.',
    technicalAnnotation: '2.4GHz RF · 1600 DPI OPTICAL · 20W USB-C PD',
    image: collectionAccessories,
    brandsIncluded: ['Portronics', 'Zebronics'],
  },
  {
    slug: 'grooming',
    index: '04',
    name: 'Grooming & Personal Care',
    shortTitle: 'Personal Ritual',
    editorialTitle: 'Metallurgy Meets Everyday Ritual.',
    subtitle:
      'Precision stainless-steel trimming blades, quiet rotary endurance, and universal Type-C charging from Bombay Shaving Company.',
    technicalAnnotation: 'STAINLESS BLADES · 90 MIN RUNTIME · USB-C FAST CHARGE',
    image: collectionGrooming,
    brandsIncluded: ['Bombay Shaving Company'],
  },
  {
    slug: 'cctv-security',
    index: '05',
    name: 'CCTV & Security',
    shortTitle: 'Optical Vigilance',
    editorialTitle: 'Unblinking Optical Clarity, Day and Night.',
    subtitle:
      'Hikvision Turbo HD coaxial-audio dome and bullet cameras alongside Zebronics smart 3MP surveillance optics built for residences, retail counters, and institutions.',
    technicalAnnotation: '1080P / 3MP CMOS · EXIR 25m IR · IP67 WEATHERPROOF',
    image: collectionSecurity,
    brandsIncluded: ['Hikvision', 'Zebronics'],
  },
  {
    slug: 'business-equipment',
    index: '06',
    name: 'Business Equipment',
    shortTitle: 'Commercial Precision',
    editorialTitle: 'Engineered for High-Trust Commerce.',
    subtitle:
      'Automated currency note counting equipment with optical sensor bays for retail counters, hospitality desks, and commercial enterprises across Andhra Pradesh.',
    technicalAnnotation: 'HIGH-SPEED HOPPER · OPTICAL NOTE SENSING · DIGITAL DISPLAY',
    image: collectionBusiness,
    brandsIncluded: ['Commercial Hardware'],
  },
];

export const BRAND_PROFILES: BrandProfile[] = [
  {
    id: 'portronics',
    index: 'B · 01',
    name: 'Portronics',
    monogram: 'POR',
    originNote: 'Portable Electronics & Smart Accessories',
    categoryFocus: 'Speakers · True Wireless · Charging & Peripherals',
    editorialHeadline: 'Portable Ingenuity for Fluid Living.',
    description:
      'Supplied by Sri Gajender Traders across Tirupati and Andhra Pradesh, Portronics brings compact acoustic speakers, TWS earbuds, wireless optical mice, and intelligent Power Delivery chargers designed for everyday versatility.',
    heroImage: collectionAccessories,
    accentTone: '#B8202A',
    signatureCapabilities: [
      'SoundDrum portable Bluetooth speaker series',
      'Harmonics Twins true wireless audio lineup',
      'Toad wireless optical mice & Adapto PD fast chargers',
    ],
  },
  {
    id: 'boat',
    index: 'B · 02',
    name: 'boAt',
    monogram: 'boAt',
    originNote: 'Consumer Acoustics & Lifestyle Audio',
    categoryFocus: 'Nirvana ANC Earbuds · Stone & PartyPal Speakers',
    editorialHeadline: 'High-Energy Acoustics, Tuned for Endurance.',
    description:
      'From the flagship Nirvana Ion ANC true wireless earbuds featuring Crystal Bionic Sound to Stone portable speakers and PartyPal event towers, boAt anchors high-impact personal and social sound.',
    heroImage: heroSculpturalAudio,
    accentTone: '#B8202A',
    signatureCapabilities: [
      'Nirvana Ion ANC with up to 32dB Active Noise Cancellation',
      'Crystal Bionic Sound & Quad-Mic ENx™ voice clarity',
      'Stone & PartyPal wireless speaker architectures',
    ],
  },
  {
    id: 'zebronics',
    index: 'B · 03',
    name: 'Zebronics',
    monogram: 'ZEB',
    originNote: 'Audio, IT Peripherals & Smart Surveillance',
    categoryFocus: 'Sound Feast Speakers · Companion Combos · Smart Cameras',
    editorialHeadline: 'Comprehensive Hardware Across Sound, Desk & Security.',
    description:
      'Zebronics spans portable wireless speakers, ergonomic wireless keyboard-and-mouse ensembles, and weather-resistant smart surveillance cameras suitable for homes and commercial interiors.',
    heroImage: heroSpeakerSculpture,
    accentTone: '#8C7A5B',
    signatureCapabilities: [
      'Sound Feast portable TWS-capable speaker range',
      'Companion wireless desktop keyboard & mouse combos',
      '3MP smart bullet & dome surveillance cameras',
    ],
  },
  {
    id: 'boult',
    index: 'B · 04',
    name: 'Boult',
    monogram: 'BLT',
    originNote: 'Acoustic Engineering & True Wireless',
    categoryFocus: 'Z-Series True Wireless · Low-Latency Audio',
    editorialHeadline: 'Sculpted Ergonomics & Marathon Playback.',
    description:
      'Engineered around BoomX™ dynamic drivers, Zen™ Environmental Noise Cancellation microphones, and extended Type-C fast-charging cases, Boult delivers expressive wireless audio.',
    heroImage: collectionWirelessEarbuds,
    accentTone: '#A6895A',
    signatureCapabilities: [
      'Z40 Pro & AirBass Z40 marathon-battery TWS earbuds',
      'Zen™ Mode ENC microphone clarity for calls',
      '45ms ultra-low-latency gaming & media sync',
    ],
  },
  {
    id: 'hikvision',
    index: 'B · 05',
    name: 'Hikvision',
    monogram: 'HIK',
    originNote: 'Optical Security & Surveillance Infrastructure',
    categoryFocus: 'Turbo HD Turret & Bullet Cameras · Coaxial Audio',
    editorialHeadline: 'Architectural Optical Security Systems.',
    description:
      'Sri Gajender Traders supplies Hikvision security cameras for retail shops, commercial offices, warehouses, and residences—delivering crisp 1080p CMOS imaging, EXIR night illumination, and coaxial audio transmission.',
    heroImage: collectionSecurity,
    accentTone: '#2E473B',
    signatureCapabilities: [
      '2MP CMOS 1080p fixed turret & mini-bullet cameras',
      'Built-in microphone with audio-over-coaxial transmission',
      'Smart IR / EXIR 2.0 night vision & IP67 outdoor protection',
    ],
  },
  {
    id: 'bombay-shaving-company',
    index: 'B · 06',
    name: 'Bombay Shaving Company',
    monogram: 'BSC',
    originNote: 'Personal Grooming & Precision Appliances',
    categoryFocus: 'Cordless Beard Trimmers · Men’s Grooming Appliances',
    editorialHeadline: 'Elevated Craftsmanship in Personal Grooming.',
    description:
      'Combining stainless-steel blade geometry, low-noise motors, and modern USB Type-C fast charging, Bombay Shaving Company trimmers bring refined daily grooming to retail and wholesale shelves.',
    heroImage: collectionGrooming,
    accentTone: '#B69460',
    signatureCapabilities: [
      'Corrosion-resistant stainless-steel precision blades',
      '90-minute cordless runtime on Power Play NXT series',
      'Universal USB Type-C travel-ready charging',
    ],
  },
];

export const PRODUCTS: ProductItem[] = [
  {
    id: 'boat-nirvana-ion-anc',
    indexCode: 'IDX // 01',
    name: 'boAt Nirvana Ion ANC',
    brandId: 'boat',
    brandName: 'boAt',
    model: 'Nirvana Ion ANC',
    category: 'audio-wireless',
    categoryLabel: 'Audio & Wireless',
    tagline: 'Up to 32dB Active Noise Cancellation with 120-hour total playback.',
    editorialSummary:
      'Flagship true wireless earbuds carried at Sri Gajender Traders, pairing up to 32dB Active Noise Cancellation with Crystal Bionic Sound powered by HiFi DSP 5 and Dual EQ modes.',
    primaryImage: heroSculpturalAudio,
    secondaryImage:
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    verifiedSpecs: [
      { label: 'Noise Control', value: 'Up to 32dB Active Noise Cancellation (ANC)' },
      { label: 'Total Playback', value: 'Up to 120 Hours (ANC Off) · 24h per charge' },
      { label: 'Acoustic Architecture', value: '10mm Dynamic Drivers · Crystal Bionic Sound (HiFi DSP 5)' },
      { label: 'Call Microphones', value: 'Quad Mics with ENx™ Technology' },
      { label: 'Connectivity & Latency', value: 'Bluetooth v5.2 · BEAST™ Mode (60ms Low Latency)' },
      { label: 'Protection & Interface', value: 'IPX4 Splash Resistant · In-Ear Detection · USB Type-C' },
    ],
    keyHighlights: ['Up to 32dB ANC', '120H Total Playback', 'Crystal Bionic Sound', 'In-Ear Detection'],
    featured: true,
  },
  {
    id: 'boult-z40-pro',
    indexCode: 'IDX // 02',
    name: 'Boult Z40 Pro True Wireless',
    brandId: 'boult',
    brandName: 'Boult',
    model: 'Z40 Pro',
    category: 'audio-wireless',
    categoryLabel: 'Audio & Wireless',
    tagline: '100-hour endurance paired with Zen™ Quad-Mic ENC.',
    editorialSummary:
      'Engineered for marathon listening and crisp voice calls, the Boult Z40 Pro integrates Zen™ Mode Quad-Mic Environmental Noise Cancellation, Bluetooth 5.3, and 45ms low-latency sync.',
    primaryImage: collectionWirelessEarbuds,
    secondaryImage:
      'https://images.pexels.com/photos/3394648/pexels-photo-3394648.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    verifiedSpecs: [
      { label: 'Total Battery Life', value: 'Up to 100 Hours with Charging Case' },
      { label: 'Fast Charge', value: 'Type-C Fast Charge (10 mins = 120 mins playtime)' },
      { label: 'Voice Clarity', value: 'Zen™ Mode Quad-Mic Environmental Noise Cancellation' },
      { label: 'Wireless Standard', value: 'Bluetooth v5.3 · AAC & SBC Codecs' },
      { label: 'Gaming Latency', value: '45ms Ultra-Low Latency Mode' },
      { label: 'Ingress Rating', value: 'IPX5 Sweat & Splash Resistant' },
    ],
    keyHighlights: ['100H Total Playtime', 'Zen™ Quad-Mic ENC', '45ms Low Latency', 'IPX5 Rated'],
    featured: true,
  },
  {
    id: 'portronics-sounddrum-1',
    indexCode: 'IDX // 03',
    name: 'Portronics SoundDrum 1',
    brandId: 'portronics',
    brandName: 'Portronics',
    model: 'POR 1288 / POR 1327',
    category: 'speakers-entertainment',
    categoryLabel: 'Speakers & Entertainment',
    tagline: '12W RMS cylindrical portable Bluetooth speaker with TWS stereo link.',
    editorialSummary:
      'Compact 360-degree cylindrical wireless speaker delivering 12W RMS acoustic output, True Wireless Stereo pairing for dual-speaker setups, and USB playback.',
    primaryImage: collectionPartySpeakers,
    secondaryImage:
      'https://images.pexels.com/photos/15485973/pexels-photo-15485973.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    verifiedSpecs: [
      { label: 'Power Output', value: '12W RMS' },
      { label: 'Connectivity', value: 'Bluetooth v5.3 · USB Drive Support · TWS Mode' },
      { label: 'Bluetooth Profiles', value: 'A2DP & AVRCP' },
      { label: 'Battery Capacity', value: '2000mAh Lithium-ion Rechargeable' },
      { label: 'Dimensions', value: '7.9 × 7.9 × 9.5 cm' },
      { label: 'Product Codes', value: 'POR 1288 / POR 1327' },
    ],
    keyHighlights: ['12W RMS Output', 'TWS Stereo Mode', '2000mAh Battery', 'Compact Drum Form'],
    featured: true,
  },
  {
    id: 'boat-stone-1200-pro',
    indexCode: 'IDX // 04',
    name: 'boAt Stone 1200 Pro',
    brandId: 'boat',
    brandName: 'boAt',
    model: 'Stone 1200 Pro',
    category: 'speakers-entertainment',
    categoryLabel: 'Speakers & Entertainment',
    tagline: '60W portable acoustic powerhouse with dual full-range drivers & passive radiators.',
    editorialSummary:
      'High-output portable wireless speaker delivering 60W signature sound via dual 2.75-inch full-frequency drivers and dual passive radiators inside an IPX6 splash-resistant chassis.',
    primaryImage: heroSpeakerSculpture,
    secondaryImage:
      'https://images.pexels.com/photos/12715509/pexels-photo-12715509.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    verifiedSpecs: [
      { label: 'Output Power', value: '60W RMS' },
      { label: 'Driver Configuration', value: '2 × 2.75" Full-Frequency Drivers + 2 Passive Radiators' },
      { label: 'Battery & Playback', value: '4800mAh · Up to 7.5 Hours (at 50% volume)' },
      { label: 'Frequency Response', value: '60Hz – 20kHz' },
      { label: 'Water Resistance', value: 'IPX6 Splash & Sweat Resistant' },
      { label: 'Dimensions & Weight', value: '290 × 120 × 124.5 mm · 2.25 kg' },
    ],
    keyHighlights: ['60W Output Power', 'Dual Radiators', 'IPX6 Protection', '4800mAh Battery'],
    featured: true,
  },
  {
    id: 'bsc-power-play-nxt',
    indexCode: 'IDX // 05',
    name: 'Bombay Shaving Company Power Play NXT',
    brandId: 'bombay-shaving-company',
    brandName: 'Bombay Shaving Company',
    model: 'PWR_PLAYNXT',
    category: 'grooming',
    categoryLabel: 'Grooming & Personal Care',
    tagline: '90-minute non-stop cordless grooming with stainless-steel blades & Type-C fast charge.',
    editorialSummary:
      'Engineered for clean beard, mustache, and neckline detailing, the Power Play NXT trimmer delivers 90 minutes of continuous runtime from a universal Type-C charge in a lightweight 130g body.',
    primaryImage: collectionGrooming,
    secondaryImage: heroGroomingSecurity,
    verifiedSpecs: [
      { label: 'Blade Metallurgy', value: 'Precision Stainless-Steel Blades' },
      { label: 'Cordless Runtime', value: 'Up to 90 Minutes Continuous Operation' },
      { label: 'Charging Interface', value: 'Universal USB Type-C Fast Charging (90-min charge)' },
      { label: 'Acoustic Profile', value: 'Low-Noise Motor Architecture · Charge Indicator LED' },
      { label: 'Dimensions & Weight', value: '12 × 10 × 7 cm · 130 g Travel-Ready Build' },
      { label: 'Recommended Use', value: 'Beard, Mustache & Neckline Styling' },
    ],
    keyHighlights: ['90-Min Non-Stop Runtime', 'Stainless-Steel Blades', 'Type-C Charging', '130g Ergonomic Build'],
    featured: true,
  },
  {
    id: 'hikvision-ds-2ce76d0t-itpfs',
    indexCode: 'IDX // 06',
    name: 'Hikvision 2MP Audio Indoor Turret Camera',
    brandId: 'hikvision',
    brandName: 'Hikvision',
    model: 'DS-2CE76D0T-ITPFS',
    category: 'cctv-security',
    categoryLabel: 'CCTV & Security',
    tagline: 'Full HD 1080p fixed turret dome camera with coaxial built-in audio & 20m Smart IR.',
    editorialSummary:
      'Compact architectural turret dome camera capturing crisp 1920 × 1080 CMOS video with integrated coaxial audio transmission, switchable 4-in-1 video output, and up to 20m Smart IR illumination.',
    primaryImage: collectionSecurity,
    secondaryImage: heroGroomingSecurity,
    verifiedSpecs: [
      { label: 'Image Sensor & Resolution', value: '2 MP CMOS · 1920 (H) × 1080 (V) Full HD' },
      { label: 'Fixed Lens Options', value: '2.8 mm (106.4° H-FOV) / 3.6 mm (79.6° H-FOV)' },
      { label: 'Night Illumination', value: 'Smart IR up to 20 m · 0.01 Lux @ (F2.0, AGC ON)' },
      { label: 'Integrated Audio', value: 'Built-in Microphone · Audio over Coaxial Cable' },
      { label: 'Signal Output', value: '4-in-1 Switchable (TVI / AHD / CVI / CVBS)' },
      { label: 'Dimensions & Power', value: 'Φ 84.6 mm × 78.9 mm · 140.5 g · 12 VDC (Max 2.7W)' },
    ],
    keyHighlights: ['2MP 1080p CMOS', 'Built-In Coax Mic', '20m Smart IR', '4-in-1 Signal Output'],
    featured: true,
  },
  {
    id: 'hikvision-ds-2ce16d0t-itpfs',
    indexCode: 'IDX // 07',
    name: 'Hikvision 2MP Audio Fixed Mini Bullet Camera',
    brandId: 'hikvision',
    brandName: 'Hikvision',
    model: 'DS-2CE16D0T-ITPFS',
    category: 'cctv-security',
    categoryLabel: 'CCTV & Security',
    tagline: 'IP67 weather-sealed 1080p bullet camera with EXIR 2.0 25m infrared & coaxial mic.',
    editorialSummary:
      'Designed for perimeter and storefront vigilance, this IP67 weather-resistant bullet camera combines Full HD 1080p imaging, EXIR 2.0 25-meter night vision, and built-in coaxial audio.',
    primaryImage: collectionSecurity,
    secondaryImage: collectionAccessories,
    verifiedSpecs: [
      { label: 'Sensor & Resolution', value: '2 MP CMOS · 1920 × 1080 @ 25/30fps' },
      { label: 'Infrared Technology', value: 'EXIR 2.0 Smart IR · Up to 25 m IR Distance' },
      { label: 'Environmental Sealing', value: 'IP67 Water & Dust Resistant (-40°C to 60°C)' },
      { label: 'Audio Capability', value: 'Built-in Microphone over Coaxial Cable' },
      { label: 'Video Interface', value: 'Switchable TVI / AHD / CVI / CVBS' },
      { label: 'Dimensions & Weight', value: '138.8 × 60.9 × 57.9 mm · Approx. 160 g' },
    ],
    keyHighlights: ['IP67 Weatherproof', 'EXIR 2.0 25m IR', 'Built-In Audio Mic', '1080p Full HD'],
  },
  {
    id: 'zebronics-companion-202',
    indexCode: 'IDX // 08',
    name: 'Zebronics Companion 202 Wireless Combo',
    brandId: 'zebronics',
    brandName: 'Zebronics',
    model: 'ZEB-Companion 202',
    category: 'accessories',
    categoryLabel: 'Mobile & Computer Accessories',
    tagline: '104-key wireless keyboard with dedicated Rupee/AI keys & silent ergonomic optical mouse.',
    editorialSummary:
      'Streamlined wireless desktop peripheral suite operating via a single USB nano receiver, pairing a 104-key multimedia keyboard with a silent-click adjustable-DPI optical mouse.',
    primaryImage: collectionAccessories,
    secondaryImage:
      'https://images.pexels.com/photos/4386357/pexels-photo-4386357.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    verifiedSpecs: [
      { label: 'Keyboard Layout', value: '104 Keys · 12 Integrated Multimedia Keys · ₹ & AI Assist Key' },
      { label: 'Mouse Sensor', value: '800 / 1200 / 1600 DPI Optical · 4 Buttons · Silent Operation' },
      { label: 'Interface', value: '2.4GHz USB Plug-and-Play Nano Receiver' },
      { label: 'Switch Endurance', value: '10 Million Keystroke Cycles · 5 Million Mouse Clicks' },
      { label: 'Wireless Range', value: 'Up to 20m (Keyboard) / 10m (Mouse) unobstructed' },
      { label: 'Dimensions', value: 'Keyboard: 43.5 × 18 × 2 cm (593g) · Mouse: 61g' },
    ],
    keyHighlights: ['Single Nano Receiver', 'Silent Optical Mouse', '12 Multimedia Keys', '1600 DPI Adjustable'],
  },
  {
    id: 'portronics-toad-23',
    indexCode: 'IDX // 09',
    name: 'Portronics Toad 23 Wireless Optical Mouse',
    brandId: 'portronics',
    brandName: 'Portronics',
    model: 'POR 1610',
    category: 'accessories',
    categoryLabel: 'Mobile & Computer Accessories',
    tagline: 'Featherlight ambidextrous 2.4GHz wireless mouse rated for 3 million+ clicks.',
    editorialSummary:
      'Sculpted for effortless ambidextrous comfort at the desk or on the move, Toad 23 delivers responsive 2.4GHz wireless tracking, adjustable DPI sensitivity, and intelligent auto power-saving.',
    primaryImage: collectionAccessories,
    secondaryImage:
      'https://images.pexels.com/photos/13211073/pexels-photo-13211073.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    verifiedSpecs: [
      { label: 'Wireless Technology', value: '2.4 GHz USB Nano Dongle (up to 10m range)' },
      { label: 'Optical Sensitivity', value: 'Adjustable DPI (800 – 1600 DPI)' },
      { label: 'Switch Lifespan', value: 'Over 30 Lakhs (3 Million+) Clicks' },
      { label: 'Ergonomics', value: 'Ambidextrous Contour · 4 Buttons with Scroll Wheel' },
      { label: 'Power Management', value: 'Intelligent Auto Power-Saving Mode' },
      { label: 'Product Code', value: 'POR 1610 / POR 1830 / POR 1831' },
    ],
    keyHighlights: ['2.4GHz Nano Dongle', 'Adjustable 1600 DPI', '3M+ Click Lifespan', 'Auto Power-Save'],
  },
  {
    id: 'portronics-adapto-20',
    indexCode: 'IDX // 10',
    name: 'Portronics Adapto 20 USB-C PD Charger',
    brandId: 'portronics',
    brandName: 'Portronics',
    model: 'POR 1238',
    category: 'accessories',
    categoryLabel: 'Mobile & Computer Accessories',
    tagline: 'BIS-certified 20W USB Type-C Power Delivery wall adapter with multi-layer protection.',
    editorialSummary:
      'Compact 20W USB-C Power Delivery charging module built with intelligent over-voltage, over-current, and thermal regulation circuitry for smartphones, tablets, and wireless audio cases.',
    primaryImage: collectionAccessories,
    secondaryImage:
      'https://images.pexels.com/photos/25450654/pexels-photo-25450654.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    verifiedSpecs: [
      { label: 'Maximum Output', value: '20W USB-C Power Delivery (PD)' },
      { label: 'Output Profiles', value: 'DC 5V/3A, 9V/2.22A, 12V/1.67A' },
      { label: 'Certification', value: 'BIS Certified' },
      { label: 'Protection Suite', value: 'Over-Voltage, Over-Temperature & Over-Current IC' },
      { label: 'Port Architecture', value: 'Single High-Speed USB Type-C Port' },
      { label: 'Product Code', value: 'POR 1238' },
    ],
    keyHighlights: ['20W USB-C PD', 'BIS Certified', 'Smart IC Protection', 'Multi-Device Ready'],
  },
  {
    id: 'zebronics-sound-feast-200',
    indexCode: 'IDX // 11',
    name: 'Zebronics Sound Feast 200',
    brandId: 'zebronics',
    brandName: 'Zebronics',
    model: 'ZEB-PSPK 46',
    category: 'speakers-entertainment',
    categoryLabel: 'Speakers & Entertainment',
    tagline: '30W dual-driver wireless party speaker with 10-hour playback & TWS pairing.',
    editorialSummary:
      'Equipped with dual 6.6cm drivers and passive bass reinforcement, Sound Feast 200 offers 30W RMS projection, Bluetooth v5.3, multi-input playback, and splash-resistant portability.',
    primaryImage: collectionPartySpeakers,
    secondaryImage:
      'https://images.pexels.com/photos/39810000/pexels-photo-39810000.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    verifiedSpecs: [
      { label: 'Output Power', value: '30W RMS (15W + 15W)' },
      { label: 'Drivers & Impedance', value: '6.6 cm × 2 Full-Range · 3Ω Impedance' },
      { label: 'Playback Endurance', value: 'Up to 10 Hours · Type-C Charging' },
      { label: 'Connectivity', value: 'Bluetooth v5.3 · USB · mSD (up to 32GB) · AUX · FM' },
      { label: 'Frequency & S/N', value: '80Hz – 12kHz · ≥75dB S/N Ratio' },
      { label: 'Model Identifier', value: 'ZEB-PSPK 46' },
    ],
    keyHighlights: ['30W Dual Drivers', '10H Playback', 'TWS Function', 'BT 5.3 + Multi-Input'],
  },
  {
    id: 'boat-partypal-230',
    indexCode: 'IDX // 12',
    name: 'boAt PartyPal 230 Wireless Speaker',
    brandId: 'boat',
    brandName: 'boAt',
    model: 'PartyPal 230',
    category: 'speakers-entertainment',
    categoryLabel: 'Speakers & Entertainment',
    tagline: '90W event & celebration speaker engineered for bold vocal & bass projection.',
    editorialSummary:
      'Designed for gatherings, showrooms, and celebrations, the boAt PartyPal 230 delivers 90W wireless output over Bluetooth 5.3 with rich low-frequency presence.',
    primaryImage: heroSpeakerSculpture,
    secondaryImage:
      'https://images.pexels.com/photos/11103381/pexels-photo-11103381.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    verifiedSpecs: [
      { label: 'Acoustic Output', value: '90W Signature Sound' },
      { label: 'Driver Unit', value: '101.6 mm High-Excursion Driver' },
      { label: 'Wireless Protocol', value: 'Bluetooth v5.3 (10m Wireless Range)' },
      { label: 'Frequency Response', value: '75 Hz – 20 kHz · ≥85 dB S/N Ratio' },
      { label: 'Battery Backup', value: 'Up to 6 Hours Portable Playtime' },
      { label: 'Form Factor', value: 'Portable Party & Event Speaker' },
    ],
    keyHighlights: ['90W Acoustic Output', 'Bluetooth v5.3', '≥85dB S/N Ratio', '6H Portable Backup'],
  },
  {
    id: 'portronics-harmonics-twins-s5',
    indexCode: 'IDX // 13',
    name: 'Portronics Harmonics Twins S5',
    brandId: 'portronics',
    brandName: 'Portronics',
    model: 'POR 1836 / POR 1837',
    category: 'audio-wireless',
    categoryLabel: 'Audio & Wireless',
    tagline: 'Compact true wireless earbuds with LED battery case display & Type-C charging.',
    editorialSummary:
      'Lightweight everyday TWS earbuds offering intuitive touch controls, voice assistant activation, LED charge indicator case, and IPX4 splash resistance.',
    primaryImage: collectionWirelessEarbuds,
    secondaryImage:
      'https://images.pexels.com/photos/3394653/pexels-photo-3394653.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    verifiedSpecs: [
      { label: 'Total Playtime', value: 'Up to 15 Hours with LED Display Charging Case' },
      { label: 'Wireless Version', value: 'Bluetooth v5.2 / v5.3 Low-Latency Link' },
      { label: 'Charging Port', value: 'USB Type-C Fast Charging' },
      { label: 'Controls', value: 'Capacitive Touch Controls & Voice Assistant Support' },
      { label: 'Water Resistance', value: 'IPX4 Sweat & Splash Resistant' },
      { label: 'Product Codes', value: 'POR 1836 (Black) / POR 1837 (White)' },
    ],
    keyHighlights: ['LED Display Case', 'Type-C Charging', 'IPX4 Splash Resistant', 'Touch Controls'],
  },
  {
    id: 'boult-airbass-z40',
    indexCode: 'IDX // 14',
    name: 'Boult AirBass Z40 Earbuds',
    brandId: 'boult',
    brandName: 'Boult',
    model: 'AirBass Z40',
    category: 'audio-wireless',
    categoryLabel: 'Audio & Wireless',
    tagline: '60-hour battery life with 10mm BoomX™ dynamic drivers & Zen™ ENC.',
    editorialSummary:
      'Balanced everyday wireless earbuds combining 10mm BoomX™ bass drivers, Zen™ Tech Environmental Noise Cancellation, and rapid 10-minute Type-C top-up charging.',
    primaryImage: heroSculpturalAudio,
    secondaryImage:
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    verifiedSpecs: [
      { label: 'Playback Duration', value: 'Up to 60 Hours Total Playback' },
      { label: 'Quick Charge', value: '10 Mins Charge = Up to 100 Mins Playtime (USB-C)' },
      { label: 'Driver Unit', value: '10mm BoomX™ Dynamic Drivers (20Hz – 20kHz)' },
      { label: 'Call Technology', value: 'Zen™ Tech Environmental Noise Cancellation' },
      { label: 'Connectivity', value: 'Bluetooth v5.2 · SBC & AAC · Blink & Pair' },
      { label: 'Ingress Protection', value: 'IPX5 Water & Sweat Resistant' },
    ],
    keyHighlights: ['60H Battery Life', '10mm BoomX™ Drivers', 'Zen™ Tech ENC', 'IPX5 Water Resistant'],
  },
  {
    id: 'zebronics-wfpt3m-camera',
    indexCode: 'IDX // 15',
    name: 'Zebronics Smart 3MP Bullet Camera',
    brandId: 'zebronics',
    brandName: 'Zebronics',
    model: 'ZEB-WFPT3M',
    category: 'cctv-security',
    categoryLabel: 'CCTV & Security',
    tagline: '3MP smart outdoor bullet camera with 4G SIM slot, two-way audio & color night vision.',
    editorialSummary:
      'Standalone smart surveillance camera featuring 2304 × 1296 3MP resolution, 4G SIM connectivity for remote sites, full-duplex two-way audio, and 30m IR / 15m white-LED night vision.',
    primaryImage: collectionSecurity,
    secondaryImage: heroGroomingSecurity,
    verifiedSpecs: [
      { label: 'Sensor & Resolution', value: '1/2.8" CMOS · 3MP (2304 × 1296)' },
      { label: 'Optics & Zoom', value: '4mm Lens (88° D-FOV) · 10× Digital Zoom' },
      { label: 'Night Vision', value: '4 IR/White Array LEDs · 30m IR / 15m Color LED' },
      { label: 'Audio System', value: 'Full-Duplex Two-Way Audio (Built-in Mic & Speaker)' },
      { label: 'Connectivity & Storage', value: '4G SIM Network · MicroSD Slot up to 256GB' },
      { label: 'Smart Detection', value: 'Motion & Human Detection Mobile Alerts · 3D DNR' },
    ],
    keyHighlights: ['3MP 2304×1296 CMOS', '4G SIM Support', 'Two-Way Audio', 'Smart Color Night Vision'],
  },
  {
    id: 'commercial-currency-counter',
    indexCode: 'IDX // 16',
    name: 'Commercial Currency Note Counting Machine',
    brandId: 'commercial-hardware',
    brandName: 'Commercial Hardware',
    model: 'Loose-Note Commercial Counter Series',
    category: 'business-equipment',
    categoryLabel: 'Business Equipment',
    tagline: 'High-speed automated currency counting hardware for retail counters, offices & enterprises.',
    editorialSummary:
      'Supplied by Sri Gajender Traders for retail cash desks, hospitality counters, temples/trust offices, and wholesale businesses in Tirupati. Enquire directly for current machine configurations, batch-counting features, and commercial pricing.',
    primaryImage: collectionBusiness,
    secondaryImage: collectionAccessories,
    verifiedSpecs: [
      { label: 'Equipment Class', value: 'Automated Loose-Note Currency Counting Machine' },
      { label: 'Intended Deployment', value: 'Retail Counters, Wholesale Desks, Hospitality & Offices' },
      { label: 'Operational Modes', value: 'Continuous Count, Batch Preset & Cumulative Add Modes' },
      { label: 'Display Architecture', value: 'Integrated Digital Readout Display' },
      { label: 'Configuration Options', value: 'Multiple commercial models stocked periodically' },
      { label: 'Procurement', value: 'Single-unit retail & multi-unit business supply' },
    ],
    keyHighlights: ['High-Speed Note Hopper', 'Batch & Add Modes', 'Commercial Desk Ready', 'B2B Supply Available'],
    featured: true,
  },
];
