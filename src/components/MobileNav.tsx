import React from 'react';
import { useNavigation } from '../context/NavigationContext';
import { useCart } from '../context/CartContext';

export const MobileNav: React.FC = () => {
  const { currentView, navigateTo } = useNavigation();
  const { totalCount, toggleCart } = useCart();

  return (
    <nav className="xl:hidden fixed bottom-0 left-0 w-full z-40 pb-safe bg-surface/90 backdrop-blur-xl border-t border-[#c4c7c7] shadow-[0_-1px_8px_rgba(0,0,0,0.03)]">
      <div className="h-16 px-4 flex items-center justify-around">
        {/* Explore / Home */}
        <button
          onClick={() => navigateTo('home')}
          className={`flex flex-col items-center justify-center gap-1 w-16 h-12 transition-colors ${
            currentView === 'home' ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">apps</span>
          <span className="font-mono-label text-[10px] uppercase tracking-widest">Explore</span>
        </button>

        {/* Accords / Shop */}
        <button
          onClick={() => navigateTo('shop')}
          className={`flex flex-col items-center justify-center gap-1 w-16 h-12 transition-colors ${
            currentView === 'shop' || currentView === 'product'
              ? 'text-primary font-bold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">science</span>
          <span className="font-mono-label text-[10px] uppercase tracking-widest">Shop</span>
        </button>

        {/* Sets / Sample */}
        <button
          onClick={() => navigateTo('sample')}
          className={`flex flex-col items-center justify-center gap-1 w-16 h-12 transition-colors ${
            currentView === 'sample' ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">dataset</span>
          <span className="font-mono-label text-[10px] uppercase tracking-widest">Sets</span>
        </button>

        {/* Bag / Cart */}
        <button
          onClick={toggleCart}
          className="relative flex flex-col items-center justify-center gap-1 w-16 h-12 text-on-surface-variant hover:text-on-surface transition-colors"
        >
          <div className="relative">
            <span className="material-symbols-outlined text-[20px]">local_mall</span>
            {totalCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-primary text-on-primary font-mono-label text-[9px] w-4 h-4 rounded-full flex items-center justify-center leading-none">
                {totalCount}
              </span>
            )}
          </div>
          <span className="font-mono-label text-[10px] uppercase tracking-widest">Bag</span>
        </button>
      </div>
    </nav>
  );
};
