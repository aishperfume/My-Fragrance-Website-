import React, { createContext, useContext, useState, useEffect } from 'react';

export type ViewType = 'home' | 'shop' | 'product' | 'sample' | 'finder' | 'about' | 'journal';

interface NavigationContextType {
  currentView: ViewType;
  selectedProductId: string;
  navigateTo: (view: ViewType, productId?: string) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedProductId, setSelectedProductId] = useState<string>('black-anise');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Sync hash routing
  useEffect(() => {
    const parseHash = () => {
      const hash = window.location.hash.replace('#', '').trim();
      if (!hash) {
        setCurrentView('home');
        return;
      }
      if (hash.startsWith('product-')) {
        const prodId = hash.replace('product-', '');
        setSelectedProductId(prodId);
        setCurrentView('product');
      } else if (['shop', 'sample', 'finder', 'about', 'journal'].includes(hash)) {
        setCurrentView(hash as ViewType);
      } else {
        setCurrentView('home');
      }
    };

    parseHash();
    window.addEventListener('hashchange', parseHash);
    return () => window.removeEventListener('hashchange', parseHash);
  }, []);

  const navigateTo = (view: ViewType, productId?: string) => {
    if (view === 'product' && productId) {
      setSelectedProductId(productId);
      window.location.hash = `product-${productId}`;
    } else if (view === 'home') {
      window.location.hash = '';
    } else {
      window.location.hash = view;
    }
    setCurrentView(view);
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    if ((window as any).__lenis) {
      (window as any).__lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  };

  return (
    <NavigationContext.Provider
      value={{
        currentView,
        selectedProductId,
        navigateTo,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) throw new Error('useNavigation must be used within NavigationProvider');
  return context;
};
