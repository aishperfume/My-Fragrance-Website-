import React from 'react';
import { useNavigation } from '../context/NavigationContext';
import { useCart } from '../context/CartContext';

export const Header: React.FC = () => {
  const { currentView, navigateTo, isMobileMenuOpen, setIsMobileMenuOpen, setIsSearchOpen } = useNavigation();
  const { totalCount, toggleCart } = useCart();

  return (
    <header className="fixed top-0 left-0 w-full z-[70] bg-[#faf9f6]/95 backdrop-blur-md border-b border-[#c4c7c7] transition-all duration-300">
      <div className="h-16 md:h-20 w-full px-4 sm:px-6 lg:px-12 flex items-center justify-between">
        
        {/* Left: Mobile Menu Trigger + Brand + Main Nav */}
        <div className="flex items-center gap-4 sm:gap-8 lg:gap-10">
          {/* Mobile Animated Hamburger Button with Beautiful 3-Line Transition */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden w-10 h-10 -ml-2 rounded-full flex flex-col items-center justify-center gap-[5px] text-primary hover:bg-black/5 active:scale-95 focus:outline-none transition-all duration-200 group relative cursor-pointer"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {/* Top Line */}
            <span
              className={`block h-[1.5px] w-5 bg-current rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center ${
                isMobileMenuOpen
                  ? 'translate-y-[6.5px] rotate-45'
                  : 'translate-y-0 rotate-0'
              }`}
            />
            {/* Middle Line */}
            <span
              className={`block h-[1.5px] bg-current rounded-full transition-all duration-250 ease-out origin-center ${
                isMobileMenuOpen
                  ? 'w-0 opacity-0 -translate-x-2'
                  : 'w-3.5 group-hover:w-5 opacity-100 translate-x-0'
              }`}
            />
            {/* Bottom Line */}
            <span
              className={`block h-[1.5px] w-5 bg-current rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center ${
                isMobileMenuOpen
                  ? '-translate-y-[6.5px] -rotate-45'
                  : 'translate-y-0 rotate-0'
              }`}
            />
          </button>

          {/* Master Brandmark */}
          <button
            onClick={() => navigateTo('home')}
            className="flex items-baseline gap-1 text-left focus:outline-none group"
          >
            <span className="font-brandmark text-3xl md:text-4xl text-primary tracking-tight font-normal lowercase select-none group-hover:opacity-80 transition-opacity">
              khawaja
            </span>
          </button>

          {/* Desktop Primary Nav */}
          <nav className="hidden xl:flex items-center gap-7">
            <button
              onClick={() => navigateTo('shop')}
              className={`font-button-text text-button-text uppercase tracking-widest py-1 transition-colors ${
                currentView === 'shop'
                  ? 'text-primary font-bold border-b border-primary'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Shop
            </button>
            <button
              onClick={() => navigateTo('sample')}
              className={`font-button-text text-button-text uppercase tracking-widest py-1 transition-colors ${
                currentView === 'sample'
                  ? 'text-primary font-bold border-b border-primary'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Sample
            </button>
            <button
              onClick={() => navigateTo('sample')}
              className="font-button-text text-button-text uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors py-1"
            >
              Sets
            </button>
            <button
              onClick={() => navigateTo('finder')}
              className={`font-button-text text-button-text uppercase tracking-widest py-1 transition-colors ${
                currentView === 'finder'
                  ? 'text-primary font-bold border-b border-primary'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Fragrance Finder
            </button>
          </nav>
        </div>

        {/* Right Nav & Functional Utilities */}
        <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
          {/* Secondary Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 border-r border-[#c4c7c7] pr-8">
            <button
              onClick={() => navigateTo('about')}
              className={`font-button-text text-button-text uppercase tracking-widest py-1 transition-colors ${
                currentView === 'about'
                  ? 'text-primary font-bold border-b border-primary'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              About
            </button>
            <button
              onClick={() => navigateTo('journal')}
              className={`font-button-text text-button-text uppercase tracking-widest py-1 transition-colors ${
                currentView === 'journal'
                  ? 'text-primary font-bold border-b border-primary'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Journal
            </button>
          </nav>

          {/* Interactive Utilities: Search, Cart */}
          <div className="flex items-center gap-3 sm:gap-5">

            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search Fragrances"
              className="text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center p-1.5 focus:outline-none"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">search</span>
            </button>

            {/* Cart Trigger */}
            <button
              onClick={toggleCart}
              aria-label="Shopping Bag"
              className="text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center p-1.5 focus:outline-none"
              type="button"
            >
              <div className="relative flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                <span className="absolute -top-1.5 -right-2 bg-primary text-on-primary font-mono-label text-[9px] w-4 h-4 rounded-full flex items-center justify-center leading-none">
                  {totalCount}
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
