import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types/product';
import { INITIAL_PRODUCTS } from '../data/products';

export type Currency = 'PKR' | 'USD' | 'EUR' | 'GBP';

interface CurrencyRate {
  symbol: string;
  rate: number;
}

export const CURRENCIES: Record<Currency, CurrencyRate> = {
  PKR: { symbol: 'PKR', rate: 1.0 },
  USD: { symbol: '$', rate: 0.0036 },
  EUR: { symbol: '€', rate: 0.0033 },
  GBP: { symbol: '£', rate: 0.0028 },
};

interface ProductContextType {
  products: Product[];
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (amount: number, discountPercent?: number) => string;
  getRawPrice: (amount: number, discountPercent?: number) => number;
  getProduct: (id: string) => Product | undefined;
  updateProduct: (updated: Product) => void;
  updatePrice: (id: string, price50ml: number, price6ml?: number) => void;
  updateDiscount: (id: string, discountPercent: number) => void;
  updateImage: (id: string, imageField: 'main' | 'atomizer' | 'ingredients' | 'lifestyle', url: string) => void;
  addProduct: (product: Omit<Product, 'id'>) => Product;
  deleteProduct: (id: string) => void;
  resetToDefaults: () => void;
  exportProductsJson: () => string;
  importProductsJson: (jsonStr: string) => boolean;
}

const STORAGE_KEY = 'khawaja_fragrances_catalog_v7';

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      // Purge legacy storage keys so obsolete prices/paths/badges are not retained
      ['khawaja_fragrances_catalog_v1', 'khawaja_fragrances_catalog_v2', 'khawaja_fragrances_catalog_v3', 'khawaja_fragrances_catalog_v4', 'khawaja_fragrances_catalog_v5', 'khawaja_fragrances_catalog_v6'].forEach((k) => {
        try {
          localStorage.removeItem(k);
        } catch {
          // ignore
        }
      });

      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: Product[] = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Smart merge: always prioritize the latest updated PKR prices, badges, and images from INITIAL_PRODUCTS
          const merged = INITIAL_PRODUCTS.map((initial) => {
            const existing = parsed.find((p) => p.id === initial.id);
            if (!existing) return initial;
            return {
              ...existing,
              badge: initial.badge,
              price50ml: initial.price50ml,
              price6ml: initial.price6ml,
              currency: 'PKR',
              images: initial.images,
              altTexts: initial.altTexts || existing.altTexts,
            };
          });

          // Retain custom admin-added products
          const customProducts = parsed.filter(
            (p) => !INITIAL_PRODUCTS.some((init) => init.id === p.id)
          );
          return [...merged, ...customProducts];
        }
      }
    } catch (e) {
      console.error('Error reading products from localStorage:', e);
    }
    return INITIAL_PRODUCTS;
  });

  const [currency, setCurrency] = useState<Currency>('PKR');

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
      console.error('Error saving products to localStorage:', e);
    }
  }, [products]);

  const getProduct = (id: string) => products.find((p) => p.id === id);

  const getRawPrice = (amount: number, discountPercent = 0): number => {
    const discounted = discountPercent > 0 ? amount * (1 - discountPercent / 100) : amount;
    return Math.round(discounted);
  };

  const formatPrice = (amount: number, discountPercent = 0): string => {
    const finalAmount = getRawPrice(amount, discountPercent);
    return `PKR ${finalAmount.toLocaleString('en-PK')}`;
  };

  const updateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  const updatePrice = (id: string, price50ml: number, price6ml?: number) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            price50ml,
            ...(price6ml !== undefined ? { price6ml } : {}),
          };
        }
        return p;
      })
    );
  };

  const updateDiscount = (id: string, discountPercent: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, discountPercent } : p))
    );
  };

  const updateImage = (
    id: string,
    imageField: 'main' | 'atomizer' | 'ingredients' | 'lifestyle',
    url: string
  ) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            images: {
              ...p.images,
              [imageField]: url,
            },
          };
        }
        return p;
      })
    );
  };

  const addProduct = (newProdData: Omit<Product, 'id'>): Product => {
    const id = newProdData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newProduct: Product = {
      ...newProdData,
      id: id || `fragrance-${Date.now()}`,
    };
    setProducts((prev) => [newProduct, ...prev]);
    return newProduct;
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const resetToDefaults = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.removeItem(STORAGE_KEY);
  };

  const exportProductsJson = (): string => {
    return JSON.stringify(products, null, 2);
  };

  const importProductsJson = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (Array.isArray(parsed) && parsed.length > 0) {
        setProducts(parsed);
        return true;
      }
    } catch (e) {
      console.error('Invalid products JSON import:', e);
    }
    return false;
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        currency,
        setCurrency,
        formatPrice,
        getRawPrice,
        getProduct,
        updateProduct,
        updatePrice,
        updateDiscount,
        updateImage,
        addProduct,
        deleteProduct,
        resetToDefaults,
        exportProductsJson,
        importProductsJson,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProducts must be used within ProductProvider');
  return context;
};
