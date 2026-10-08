import React, { useEffect } from 'react';
import { ProductProvider } from './context/ProductContext';
import { CartProvider, useCart } from './context/CartContext';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { SmoothScrollProvider, useSmoothScroll } from './context/SmoothScrollContext';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MobileDrawer } from './components/MobileDrawer';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { QuickAddToast } from './components/QuickAddToast';

import { HomeView } from './views/HomeView';
import { ShopView } from './views/ShopView';
import { ProductDetailView } from './views/ProductDetailView';
import { DiscoveryView } from './views/DiscoveryView';
import { FragranceFinderView } from './views/FragranceFinderView';
import { AboutView } from './views/AboutView';
import { JournalView } from './views/JournalView';

const AppContent: React.FC = () => {
  const { currentView, selectedProductId, isMobileMenuOpen, isSearchOpen } = useNavigation();
  const { isOpen: isCartOpen } = useCart();
  const { stop, start } = useSmoothScroll();

  // Freeze background page scroll when any modal or drawer is open
  useEffect(() => {
    if (isMobileMenuOpen || isCartOpen || isSearchOpen) {
      stop();
    } else {
      start();
    }
  }, [isMobileMenuOpen, isCartOpen, isSearchOpen, stop, start]);

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      {/* Fixed Luxury Header */}
      <Header />

      {/* Main Dynamic View Content */}
      <main className="flex-1 w-full pt-16 md:pt-20">
        <div
          key={currentView + (currentView === 'product' ? `-${selectedProductId}` : '')}
          className="animate-view-fade"
        >
          {currentView === 'home' && <HomeView />}
          {currentView === 'shop' && <ShopView />}
          {currentView === 'product' && <ProductDetailView />}
          {currentView === 'sample' && <DiscoveryView />}
          {currentView === 'finder' && <FragranceFinderView />}
          {currentView === 'about' && <AboutView />}
          {currentView === 'journal' && <JournalView />}
        </div>
      </main>

      {/* Full Luxury Footer */}
      <Footer />

      {/* Global Interactive Overlays & Modals */}
      <MobileDrawer />
      <CartDrawer />
      <SearchModal />
      <QuickAddToast />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ProductProvider>
      <CartProvider>
        <NavigationProvider>
          <SmoothScrollProvider>
            <AppContent />
          </SmoothScrollProvider>
        </NavigationProvider>
      </CartProvider>
    </ProductProvider>
  );
};

export default App;

