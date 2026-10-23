import { BrandId, CategorySlug } from '../data/catalogData';

export type PageRoute =
  | 'home'
  | 'catalogue'
  | 'product'
  | 'brands'
  | 'wholesale'
  | 'about'
  | 'contact'
  | 'admin';

export interface RouteState {
  page: PageRoute;
  productId?: string;
  category?: CategorySlug | 'all';
  brand?: BrandId | 'all';
  searchQuery?: string;
}

export type NavigateFn = (next: Partial<RouteState> & { page: PageRoute }) => void;
