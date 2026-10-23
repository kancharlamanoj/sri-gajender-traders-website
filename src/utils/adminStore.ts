import {
  ProductItem,
  CategoryInfo,
  BrandProfile,
  StoreInfo,
  PRODUCTS as INITIAL_PRODUCTS,
  CATEGORIES as INITIAL_CATEGORIES,
  BRAND_PROFILES as INITIAL_BRANDS,
  STORE_INFO as INITIAL_STORE_INFO,
} from '../data/catalogData';

export interface InboundInquiry {
  id: string;
  timestamp: string;
  type: 'retail' | 'wholesale' | 'warranty';
  customerName: string;
  phone?: string;
  productName?: string;
  quantity?: string;
  notes?: string;
  status: 'new' | 'contacted' | 'resolved';
}

export interface AdminSettings {
  storeInfo: StoreInfo;
  customWhatsAppNumber: string;
  enableAnnouncement: boolean;
  announcementText: string;
  maintenanceMode: boolean;
}

const STORAGE_KEYS = {
  PRODUCTS: 'sgt_admin_products_v1',
  CATEGORIES: 'sgt_admin_categories_v1',
  BRANDS: 'sgt_admin_brands_v1',
  SETTINGS: 'sgt_admin_settings_v1',
  INQUIRIES: 'sgt_admin_inquiries_v1',
  AUTH: 'sgt_admin_session_v1',
};

// Initial Sample Inquiries so the admin starts with rich, realistic telemetry
const SEED_INQUIRIES: InboundInquiry[] = [
  {
    id: 'inq-101',
    timestamp: new Date(Date.now() - 1000 * 60 * 38).toISOString(),
    type: 'wholesale',
    customerName: 'Venkatesh Rao (Nellore Retail)',
    phone: '+91 98480 22314',
    productName: 'boAt Nirvana Ion ANC',
    quantity: '25 Units',
    notes: 'Looking for distributor margins and GST invoice delivery to Nellore town.',
    status: 'new',
  },
  {
    id: 'inq-102',
    timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    type: 'retail',
    customerName: 'Kavitha M. (Tirupati)',
    phone: '+91 8179106524',
    productName: 'Portronics SoundDrum P 20W',
    quantity: '1 Unit',
    notes: 'Can I pick this up directly today at Nehru Nagar showroom?',
    status: 'contacted',
  },
  {
    id: 'inq-103',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString(),
    type: 'wholesale',
    customerName: 'Chandrasekhar Infra & Security',
    phone: '+91 91002 88471',
    productName: 'Hikvision 2MP Turbo HD Fixed Turret Camera',
    quantity: '16 Units + 8CH DVR',
    notes: 'Quotation required for commercial office setup in Renigunta.',
    status: 'resolved',
  },
  {
    id: 'inq-104',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
    type: 'warranty',
    customerName: 'Suresh Kumar G.',
    phone: '+91 93930 11982',
    productName: 'Zebronics Companion 107 Wireless Combo',
    quantity: '1 Unit',
    notes: 'USB receiver lost, need guidance on replacement or service center.',
    status: 'contacted',
  },
];

// Product Management
export function getStoredProducts(): ProductItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed reading products from storage:', err);
    return INITIAL_PRODUCTS;
  }
}

export function saveStoredProducts(products: ProductItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    window.dispatchEvent(new Event('sgt-data-update'));
  } catch (err) {
    console.error('Failed saving products to storage:', err);
  }
}

// Category Management
export function getStoredCategories(): CategoryInfo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
      return INITIAL_CATEGORIES;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_CATEGORIES;
  }
}

export function saveStoredCategories(categories: CategoryInfo[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
    window.dispatchEvent(new Event('sgt-data-update'));
  } catch (err) {
    console.error('Failed saving categories:', err);
  }
}

// Brand Profiles Management
export function getStoredBrands(): BrandProfile[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BRANDS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.BRANDS, JSON.stringify(INITIAL_BRANDS));
      return INITIAL_BRANDS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_BRANDS;
  }
}

export function saveStoredBrands(brands: BrandProfile[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.BRANDS, JSON.stringify(brands));
    window.dispatchEvent(new Event('sgt-data-update'));
  } catch (err) {
    console.error('Failed saving brands:', err);
  }
}

// Store & Global Settings Management
export function getStoredSettings(): AdminSettings {
  const defaults: AdminSettings = {
    storeInfo: INITIAL_STORE_INFO,
    customWhatsAppNumber: '+91 8179106524',
    enableAnnouncement: false,
    announcementText: 'Special festive wholesale pricing available across audio and optical surveillance hardware this week!',
    maintenanceMode: false,
  };

  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(defaults));
      return defaults;
    }
    return { ...defaults, ...JSON.parse(raw) };
  } catch {
    return defaults;
  }
}

export function saveStoredSettings(settings: AdminSettings): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    window.dispatchEvent(new Event('sgt-data-update'));
  } catch (err) {
    console.error('Failed saving settings:', err);
  }
}

// Inquiries / Lead Management
export function getStoredInquiries(): InboundInquiry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(SEED_INQUIRIES));
      return SEED_INQUIRIES;
    }
    return JSON.parse(raw);
  } catch {
    return SEED_INQUIRIES;
  }
}

export function saveStoredInquiries(inquiries: InboundInquiry[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
    window.dispatchEvent(new Event('sgt-data-update'));
  } catch (err) {
    console.error('Failed saving inquiries:', err);
  }
}

export function logNewInquiry(inquiry: Omit<InboundInquiry, 'id' | 'timestamp' | 'status'>): void {
  const current = getStoredInquiries();
  const fresh: InboundInquiry = {
    ...inquiry,
    id: `inq-${Date.now().toString(36)}`,
    timestamp: new Date().toISOString(),
    status: 'new',
  };
  saveStoredInquiries([fresh, ...current]);
}

// Admin Authentication State
export function isAdminAuthenticated(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEYS.AUTH) === 'authorized';
  } catch {
    return false;
  }
}

export function setAdminAuthenticated(auth: boolean): void {
  try {
    if (auth) {
      localStorage.setItem(STORAGE_KEYS.AUTH, 'authorized');
    } else {
      localStorage.removeItem(STORAGE_KEYS.AUTH);
    }
    window.dispatchEvent(new Event('sgt-auth-update'));
  } catch (err) {
    console.error('Failed toggling auth state:', err);
  }
}

// Reset everything to factory initial mock data
export function resetToFactoryDefaults(): void {
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
  localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
  localStorage.setItem(STORAGE_KEYS.BRANDS, JSON.stringify(INITIAL_BRANDS));
  localStorage.removeItem(STORAGE_KEYS.SETTINGS);
  localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(SEED_INQUIRIES));
  window.dispatchEvent(new Event('sgt-data-update'));
}
