import React, { useEffect } from 'react';
import { useNavigation, ViewType } from '../context/NavigationContext';
import { useCart } from '../context/CartContext';

export const MobileDrawer: React.FC = () => {
  const { currentView, isMobileMenuOpen, setIsMobileMenuOpen, navigateTo, setIsSearchOpen } = useNavigation();
  const { totalCount, openCart } = useCart();

  // Prevent background body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen, setIsMobileMenuOpen]);

  const handleNav = (view: ViewType) => {
    navigateTo(view);
    setIsMobileMenuOpen(false);
  };

  const navItems: { label: string; view: ViewType; badge?: string; icon?: string }[] = [
    { label: 'Shop All Fragrances', view: 'shop', badge: '07 Flacons', icon: 'shopping_bag' },
    { label: 'Discovery & Samples', view: 'sample', badge: 'Discovery', icon: 'science' },
    { label: 'Curated Sets', view: 'sample', badge: 'Duos', icon: 'dataset' },
    { label: 'Fragrance Finder', view: 'finder', badge: 'Quiz', icon: 'tune' },
    { label: 'About Atelier', view: 'about', icon: 'info' },
    { label: 'Journal & Olfaction', view: 'journal', icon: 'article' },
  ];

  return (
    <div
      className={`fixed inset-0 z-[60] xl:hidden transition-all duration-300 ease-out ${
        isMobileMenuOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none delay-300'
      }`}
    >
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-primary/50 backdrop-blur-sm transition-opacity duration-300 ease-out ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Slide Drawer */}
      <aside
        className={`relative w-full max-w-[340px] sm:max-w-sm bg-surface h-full flex flex-col justify-between pt-20 pb-8 px-6 z-10 overflow-y-auto border-r border-[#c4c7c7] shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Section Indicator & Quick Close Pill */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#c4c7c7]">
            <span className="font-mono-label text-[10px] text-outline uppercase tracking-widest">
              [ NAVIGATION MATRIX ]
            </span>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-1 font-mono-spec text-[10px] text-on-surface-variant hover:text-primary transition-colors uppercase tracking-wider py-1 px-2 border border-[#c4c7c7] bg-surface-container-low"
              aria-label="Close navigation"
            >
              <span>CLOSE</span>
              <span className="material-symbols-outlined text-[13px]">close</span>
            </button>
          </div>

          {/* Quick Search & Bag Buttons */}
          <div className="grid grid-cols-2 gap-2 pb-4">
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsSearchOpen(true);
              }}
              className="flex items-center justify-center gap-2 py-2.5 px-3 bg-surface-container-low border border-[#c4c7c7] text-primary text-xs font-mono-label uppercase tracking-wider hover:bg-surface-variant transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">search</span>
              <span>Search</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                openCart();
              }}
              className="flex items-center justify-center gap-2 py-2.5 px-3 bg-surface-container-low border border-[#c4c7c7] text-primary text-xs font-mono-label uppercase tracking-wider hover:bg-surface-variant transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
              <span>Bag ({totalCount})</span>
            </button>
          </div>

          {/* Home Link */}
          <button
            type="button"
            onClick={() => handleNav('home')}
            className={`w-full text-left py-3.5 px-3 font-headline-sm text-base uppercase tracking-wider flex items-center justify-between border-b border-[#efeeeb] transition-colors ${
              currentView === 'home'
                ? 'text-primary font-bold bg-surface-container-low/70 border-l-2 border-l-primary'
                : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-low/40'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[18px]">home</span>
              <span>Home</span>
            </span>
            <span className="material-symbols-outlined text-sm text-outline">arrow_forward</span>
          </button>

          {/* Nav Links */}
          <nav className="flex flex-col">
            {navItems.map((item, idx) => {
              const isActive = currentView === item.view;
              return (
                <button
                  type="button"
                  key={`${item.label}-${idx}`}
                  onClick={() => handleNav(item.view)}
                  className={`w-full text-left py-3.5 px-3 font-headline-sm text-base uppercase tracking-wider flex items-center justify-between border-b border-[#efeeeb] transition-colors ${
                    isActive
                      ? 'text-primary font-bold bg-surface-container-low/70 border-l-2 border-l-primary'
                      : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-low/40'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    {item.icon && (
                      <span className="material-symbols-outlined text-[18px] text-outline">
                        {item.icon}
                      </span>
                    )}
                    <span>{item.label}</span>
                  </span>
                  <div className="flex items-center gap-2">
                    {item.badge && (
                      <span className="font-mono-label text-[10px] text-outline uppercase tracking-wider">
                        [{item.badge}]
                      </span>
                    )}
                    <span className="material-symbols-outlined text-sm text-outline">arrow_forward</span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Drawer Metadata */}
        <div className="pt-6 border-t border-[#c4c7c7] space-y-2">
          <p className="font-mono-label text-[10px] text-outline uppercase tracking-wider">
            100% Natural Fragrance · Zero Synthetics
          </p>
          <p className="font-mono-label text-[10px] text-outline uppercase tracking-wider">
            All Prices in PKR · Fast Dispatch Across Pakistan
          </p>
        </div>
      </aside>
    </div>
  );
};
