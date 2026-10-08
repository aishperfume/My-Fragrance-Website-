export interface ScentPyramid {
  top: string;
  heart: string;
  base: string;
}

export interface Product {
  id: string;
  number: string; // e.g. "NO. 01"
  name: string;
  tagline: string;
  category: 'fresh' | 'floral' | 'spicy' | 'amber' | 'woody';
  badge?: string; // e.g. "[ BEST SELLER ]", "NEW", "CLASSIC", "[ NIGHT PROFILE ]"
  price50ml: number;
  price6ml?: number;
  discountPercent?: number; // e.g. 10 for 10% off
  currency: string;
  volume: string;
  description: string;
  extendedDescription?: string;
  accordsSummary: string;
  pyramid: ScentPyramid;
  inci: string;
  images: {
    main: string;
    atomizer?: string;
    ingredients?: string;
    lifestyle?: string;
  };
  altTexts: {
    main: string;
    atomizer?: string;
    ingredients?: string;
  };
  inStock: boolean;
  rating?: number;
  reviewsCount?: number;
}

export interface CartItem {
  id: string; // product id + size
  productId: string;
  name: string;
  size: '50ml' | '6ml' | 'sample-set';
  price: number;
  quantity: number;
  image: string;
}
