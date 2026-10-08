import React, { useState, useEffect, useRef } from 'react';
import { useProducts } from '../context/ProductContext';
import { useNavigation } from '../context/NavigationContext';

export const SearchModal: React.FC = () => {
  const { products, formatPrice } = useProducts();
  const { isSearchOpen, setIsSearchOpen, navigateTo } = useNavigation();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  const filtered = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.accordsSummary.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.pyramid.top.toLowerCase().includes(query.toLowerCase()) ||
          p.pyramid.heart.toLowerCase().includes(query.toLowerCase()) ||
          p.pyramid.base.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div
      className={`fixed inset-0 z-[80] flex items-start justify-center pt-20 px-4 transition-all duration-300 ease-out ${
        isSearchOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none delay-300'
      }`}
    >
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-primary/70 backdrop-blur-md transition-opacity duration-300 ease-out ${
          isSearchOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={() => setIsSearchOpen(false)}
        aria-hidden="true"
      />

      <div
        className={`relative z-10 w-full max-w-2xl bg-surface border border-primary shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isSearchOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 -translate-y-4'
        }`}
      >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-6 border-b border-[#c4c7c7] flex items-center gap-4 bg-surface-container-lowest">
          <span className="material-symbols-outlined text-[24px] text-primary">search</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="SEARCH BY FRAGRANCE, ACCORD OR BOTANICAL NOTE..."
            className="flex-1 bg-transparent border-0 font-mono-spec text-sm sm:text-base text-primary uppercase placeholder:text-outline focus:outline-none"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="w-8 h-8 flex items-center justify-center text-primary hover:text-on-surface-variant transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Search Results */}
        <div data-lenis-prevent className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 bg-surface">
          {query.trim() === '' ? (
            <div className="py-8 text-center space-y-4">
              <span className="font-mono-label text-xs uppercase text-outline tracking-widest block">
                Popular Olfactory Inquiries
              </span>
              <div className="flex flex-wrap justify-center gap-2">
                {['CYAN NORI', 'BLACK ANISE', 'CEDARWOOD', 'STAR ANISE', 'AMBER', 'MATCHA TEA'].map(
                  (tag) => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="px-3 py-1.5 bg-surface-container border border-[#e2e0d8] font-mono-spec text-xs uppercase hover:border-primary transition-colors"
                    >
                      {tag}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <p className="font-headline-sm uppercase text-base text-primary">
                No Formulations Found
              </p>
              <p className="font-body-sm text-on-surface-variant text-xs">
                Try searching for botanical ingredients such as "Neroli", "Sandalwood", or "Tonka".
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <span className="font-mono-label text-xs uppercase text-outline tracking-wider block mb-2">
                {filtered.length} FORMULATION RESULTS
              </span>
              {filtered.map((prod) => (
                <button
                  key={prod.id}
                  onClick={() => {
                    setIsSearchOpen(false);
                    navigateTo('product', prod.id);
                  }}
                  className="w-full p-3 sm:p-4 bg-surface-container-low hover:bg-surface-container-lowest border border-[#e2e0d8] hover:border-primary flex items-center justify-between text-left transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-14 bg-surface-container p-1 border border-[#e2e0d8] flex items-center justify-center flex-shrink-0">
                      <img
                        src={prod.images.main}
                        alt={prod.name}
                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-headline-sm uppercase text-sm tracking-wide text-primary">
                          {prod.name}
                        </h4>
                        {prod.badge && (
                          <span className="font-mono-label text-[9px] text-secondary">
                            {prod.badge}
                          </span>
                        )}
                      </div>
                      <p className="font-mono-label text-[10px] text-outline uppercase tracking-wider mt-0.5">
                        {prod.accordsSummary}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-mono-spec text-sm font-semibold text-primary block">
                      {formatPrice(prod.price50ml, prod.discountPercent)}
                    </span>
                    <span className="font-mono-label text-[9px] text-outline uppercase">
                      50ML FLACON
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
