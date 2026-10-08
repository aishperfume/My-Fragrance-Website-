import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useNavigation } from '../context/NavigationContext';
import { Product } from '../types/product';

export const ShopView: React.FC = () => {
  const { products, formatPrice } = useProducts();
  const { addToCart, openCart } = useCart();
  const { navigateTo } = useNavigation();

  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [desktopView, setDesktopView] = useState<'3-col' | '4-col' | '2-col'>('3-col');
  const [mobileView, setMobileView] = useState<'1-col' | '2-col'>('2-col');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [quickViewSize, setQuickViewSize] = useState<'50ml' | '6ml'>('50ml');

  // Filter & Sort logic: All products by default, with Best Sellers sorted first
  const filteredProducts = [...products]
    .filter((p) => {
      if (activeFilter === 'all') return true;
      if (activeFilter === 'best-sellers') return p.badge?.includes('BEST') || p.badge === 'NEW';
      if (activeFilter === 'fresh') return p.category === 'fresh';
      if (activeFilter === 'floral') return p.category === 'floral';
      if (activeFilter === 'spicy') return p.category === 'spicy';
      if (activeFilter === 'amber') return p.category === 'amber' || p.category === 'woody';
      return true;
    })
    .sort((a, b) => {
      const aBest = a.badge?.includes('BEST') ? 1 : 0;
      const bBest = b.badge?.includes('BEST') ? 1 : 0;
      return bBest - aBest; // Best sellers show first
    });

  // Dynamic grid columns based on view selection (defaults to 2 columns on mobile)
  const gridClasses = `grid ${
    mobileView === '2-col' ? 'grid-cols-2' : 'grid-cols-1'
  } ${
    desktopView === '4-col'
      ? 'lg:grid-cols-4 md:grid-cols-2'
      : desktopView === '2-col'
      ? 'lg:grid-cols-2 md:grid-cols-2'
      : 'lg:grid-cols-3 md:grid-cols-2'
  } border-t border-l border-[#c4c7c7]`;

  return (
    <div className="flex flex-col w-full">
      
      {/* COLLECTION HEADER BAR */}
      <section className="w-full border-b border-[#c4c7c7] bg-surface px-6 lg:px-12 py-8 lg:py-10 transition-colors">
        <div className="pb-6 border-b border-[#c4c7c7]">
          <span className="font-mono-label text-mono-label text-outline uppercase tracking-widest block mb-1 text-xs">
            Category — Eaux de Parfum ({products.length} Formulations)
          </span>
          <h1 className="font-headline-lg text-3xl sm:text-4xl lg:text-5xl uppercase text-primary font-light tracking-wide m-0">
            The Fragrance Collection
          </h1>
        </div>

        {/* Scent Accord Filter Bar */}
        <div className="pt-6">
          <nav aria-label="Fragrance Filters" className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              onClick={() => setActiveFilter('all')}
              className={`filter-btn font-mono-label text-mono-label uppercase tracking-wider transition-colors px-3 py-1.5 border text-xs ${
                activeFilter === 'all'
                  ? 'border-primary bg-primary text-on-primary font-bold'
                  : 'border-[#c4c7c7] text-on-surface-variant hover:text-primary bg-surface'
              }`}
            >
              ALL ({products.length})
            </button>
            <button
              onClick={() => setActiveFilter('best-sellers')}
              className={`filter-btn font-mono-label text-mono-label uppercase tracking-wider transition-colors px-3 py-1.5 border text-xs ${
                activeFilter === 'best-sellers'
                  ? 'border-primary bg-primary text-on-primary font-bold'
                  : 'border-[#c4c7c7] text-on-surface-variant hover:text-primary bg-surface'
              }`}
            >
              [ BEST SELLERS ]
            </button>
            <button
              onClick={() => setActiveFilter('fresh')}
              className={`filter-btn font-mono-label text-mono-label uppercase tracking-wider transition-colors px-3 py-1.5 border text-xs ${
                activeFilter === 'fresh'
                  ? 'border-primary bg-primary text-on-primary font-bold'
                  : 'border-[#c4c7c7] text-on-surface-variant hover:text-primary bg-surface'
              }`}
            >
              FRESH
            </button>
            <button
              onClick={() => setActiveFilter('floral')}
              className={`filter-btn font-mono-label text-mono-label uppercase tracking-wider transition-colors px-3 py-1.5 border text-xs ${
                activeFilter === 'floral'
                  ? 'border-primary bg-primary text-on-primary font-bold'
                  : 'border-[#c4c7c7] text-on-surface-variant hover:text-primary bg-surface'
              }`}
            >
              FLORAL
            </button>
            <button
              onClick={() => setActiveFilter('spicy')}
              className={`filter-btn font-mono-label text-mono-label uppercase tracking-wider transition-colors px-3 py-1.5 border text-xs ${
                activeFilter === 'spicy'
                  ? 'border-primary bg-primary text-on-primary font-bold'
                  : 'border-[#c4c7c7] text-on-surface-variant hover:text-primary bg-surface'
              }`}
            >
              SPICY
            </button>
            <button
              onClick={() => setActiveFilter('amber')}
              className={`filter-btn font-mono-label text-mono-label uppercase tracking-wider transition-colors px-3 py-1.5 border text-xs ${
                activeFilter === 'amber'
                  ? 'border-primary bg-primary text-on-primary font-bold'
                  : 'border-[#c4c7c7] text-on-surface-variant hover:text-primary bg-surface'
              }`}
            >
              AMBER &amp; WOOD
            </button>
          </nav>
        </div>

        {/* Toolbar Under Filter: Product Count on Left, Icon Style View Buttons on Right */}
        <div className="pt-6 mt-6 border-t border-[#c4c7c7] flex items-center justify-between">
          <span className="font-mono-label text-xs uppercase text-on-surface-variant tracking-wider">
            Showing {filteredProducts.length} of {products.length} Fragrances
          </span>

          {/* Icon Style View Buttons Under Filter on the Right Side */}
          <div className="flex items-center gap-2">
            {/* Desktop (PC) View Icons */}
            <div className="hidden lg:flex items-center gap-1.5">
              <span className="font-mono-label text-[10px] uppercase text-outline mr-1 tracking-wider">
                View:
              </span>

              {/* 2-Column Icon */}
              <button
                type="button"
                onClick={() => setDesktopView('2-col')}
                title="2 Columns (Editorial Showcase)"
                aria-label="2 Columns View"
                className={`w-8 h-8 flex items-center justify-center border transition-all ${
                  desktopView === '2-col'
                    ? 'border-primary bg-primary text-on-primary shadow-sm'
                    : 'border-[#c4c7c7] bg-surface text-on-surface-variant hover:text-primary hover:border-primary'
                }`}
              >
                <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
                  <rect x="1" y="2" width="6" height="12" />
                  <rect x="9" y="2" width="6" height="12" />
                </svg>
              </button>

              {/* 3-Column Icon */}
              <button
                type="button"
                onClick={() => setDesktopView('3-col')}
                title="3 Columns (Standard Vitrine)"
                aria-label="3 Columns View"
                className={`w-8 h-8 flex items-center justify-center border transition-all ${
                  desktopView === '3-col'
                    ? 'border-primary bg-primary text-on-primary shadow-sm'
                    : 'border-[#c4c7c7] bg-surface text-on-surface-variant hover:text-primary hover:border-primary'
                }`}
              >
                <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
                  <rect x="1" y="2" width="3.5" height="12" />
                  <rect x="6.25" y="2" width="3.5" height="12" />
                  <rect x="11.5" y="2" width="3.5" height="12" />
                </svg>
              </button>

              {/* 4-Column Icon */}
              <button
                type="button"
                onClick={() => setDesktopView('4-col')}
                title="4 Columns (Compact Catalog Grid)"
                aria-label="4 Columns View"
                className={`w-8 h-8 flex items-center justify-center border transition-all ${
                  desktopView === '4-col'
                    ? 'border-primary bg-primary text-on-primary shadow-sm'
                    : 'border-[#c4c7c7] bg-surface text-on-surface-variant hover:text-primary hover:border-primary'
                }`}
              >
                <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
                  <rect x="1" y="2" width="2.5" height="12" />
                  <rect x="5" y="2" width="2.5" height="12" />
                  <rect x="9" y="2" width="2.5" height="12" />
                  <rect x="13" y="2" width="2.5" height="12" />
                </svg>
              </button>
            </div>

            {/* Mobile View Icons */}
            <div className="flex lg:hidden items-center gap-1.5">
              <span className="font-mono-label text-[10px] uppercase text-outline mr-1 tracking-wider">
                View:
              </span>

              {/* 1-Column Single Large Card Icon */}
              <button
                type="button"
                onClick={() => setMobileView('1-col')}
                title="1 Column (Full Detail Card)"
                aria-label="1 Column View"
                className={`w-8 h-8 flex items-center justify-center border transition-all ${
                  mobileView === '1-col'
                    ? 'border-primary bg-primary text-on-primary shadow-sm'
                    : 'border-[#c4c7c7] bg-surface text-on-surface-variant hover:text-primary hover:border-primary'
                }`}
              >
                <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
                  <rect x="1.5" y="2" width="13" height="12" />
                </svg>
              </button>

              {/* 2-Column Grid Icon */}
              <button
                type="button"
                onClick={() => setMobileView('2-col')}
                title="2 Columns (Compact Grid)"
                aria-label="2 Columns View"
                className={`w-8 h-8 flex items-center justify-center border transition-all ${
                  mobileView === '2-col'
                    ? 'border-primary bg-primary text-on-primary shadow-sm'
                    : 'border-[#c4c7c7] bg-surface text-on-surface-variant hover:text-primary hover:border-primary'
                }`}
              >
                <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
                  <rect x="1" y="2" width="6" height="12" />
                  <rect x="9" y="2" width="6" height="12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT MATRIX GRID */}
      <section className="w-full border-b border-[#c4c7c7] bg-surface">
        <div className={gridClasses}>
          {filteredProducts.map((product) => {
            const isCompactMobile = mobileView === '2-col';
            return (
              <article
                key={product.id}
                className="product-card group flex flex-col bg-surface hover:bg-surface-container-low transition-colors duration-300 relative border-r border-b border-[#c4c7c7]"
              >
                {/* Product Visual */}
                <div
                  onClick={() => navigateTo('product', product.id)}
                  className={`relative w-full aspect-[4/5] overflow-hidden bg-white flex items-center justify-center cursor-pointer ${
                    isCompactMobile ? 'p-4 sm:p-6' : 'p-6 sm:p-10'
                  }`}
                >
                  {/* Badges */}
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-5 z-20 pointer-events-none">
                    <span className="font-mono-label text-[9px] sm:text-[10px] uppercase tracking-widest text-primary font-bold bg-white/95 px-2 py-0.5 sm:px-2.5 sm:py-1 border border-[#c4c7c7]">
                      {product.badge || 'EDP'}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-5 z-20 pointer-events-none text-right">
                    <span className="font-mono-label text-[9px] sm:text-[10px] uppercase tracking-widest text-on-surface-variant font-medium bg-white/95 px-2 py-0.5 sm:px-2.5 sm:py-1 border border-[#c4c7c7]">
                      50ML
                    </span>
                  </div>

                  <img
                    src={product.images.main}
                    alt={product.altTexts.main}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
                  />

                  {/* Quick View Button Hover Overlay */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center p-4">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuickViewSize('50ml');
                        setQuickViewProduct(product);
                      }}
                      className="px-4 py-2.5 bg-surface/95 text-primary font-mono-label text-[11px] uppercase tracking-wider border border-[#c4c7c7] shadow-md hover:bg-primary hover:text-on-primary transition-colors flex items-center gap-1.5 pointer-events-auto"
                    >
                      <span className="material-symbols-outlined text-[15px]">visibility</span>
                      <span>QUICK VIEW</span>
                    </button>
                  </div>

                  {/* Bottom Name Snippet */}
                  <div className="absolute bottom-3 left-0 right-0 flex justify-center pointer-events-none">
                    <span className="font-mono-label text-[10px] sm:text-[11px] uppercase tracking-widest text-primary font-semibold bg-white/95 px-2.5 py-0.5 sm:px-3 sm:py-1 border border-[#c4c7c7]/60 shadow-sm truncate max-w-[85%]">
                      {product.name}
                    </span>
                  </div>
                </div>

                {/* Product Details & Standard Action Buttons */}
                <div
                  className={`flex flex-col flex-grow items-center text-center justify-between border-t border-[#c4c7c7] ${
                    isCompactMobile ? 'p-4 sm:p-6' : 'p-6 lg:p-8'
                  }`}
                >
                  <div className="space-y-1.5 mb-6 w-full">
                    <h2
                      onClick={() => navigateTo('product', product.id)}
                      className={`font-headline-sm uppercase text-primary font-normal tracking-wide m-0 cursor-pointer hover:text-secondary transition-colors ${
                        isCompactMobile ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'
                      }`}
                    >
                      {product.name}
                    </h2>
                    
                    {!isCompactMobile && (
                      <p className="font-body-sm text-body-sm text-on-surface-variant italic text-xs sm:text-sm line-clamp-1">
                        {product.tagline}
                      </p>
                    )}
                    
                    {/* Notes snippet */}
                    <div className="pt-1 font-mono-label text-[10px] text-outline uppercase tracking-wider truncate">
                      {product.accordsSummary}
                    </div>

                    <p className="font-mono-spec text-mono-spec text-primary font-bold pt-1 text-sm sm:text-base">
                      {formatPrice(product.price50ml, product.discountPercent)}
                    </p>
                  </div>

                  {/* Single VIEW PRODUCT Action */}
                  <div className="w-full pt-2 border-t border-[#c4c7c7]/50">
                    <button
                      type="button"
                      onClick={() => navigateTo('product', product.id)}
                      className="w-full py-3.5 bg-primary text-on-primary font-button-text text-button-text uppercase tracking-widest hover:bg-[#333333] transition-all duration-150 focus:outline-none active:scale-[0.99] text-[11px] sm:text-xs flex items-center justify-center gap-2 shadow-sm"
                    >
                      <span>VIEW PRODUCT</span>
                      <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                    </button>
                  </div>
                </div>

              </article>
            );
          })}
        </div>
      </section>

      {/* QUICK VIEW POPUP MODAL (Standard Luxury Detail Overlay) */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
          <div
            className="fixed inset-0"
            onClick={() => setQuickViewProduct(null)}
          />
          <div className="relative w-full max-w-2xl bg-surface border border-[#c4c7c7] shadow-2xl z-10 overflow-hidden flex flex-col md:flex-row max-h-[90vh] overflow-y-auto">
            {/* Modal Image Section */}
            <div className="w-full md:w-1/2 bg-white p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-[#c4c7c7]">
              <img
                src={quickViewProduct.images.main}
                alt={quickViewProduct.altTexts.main}
                className="w-full max-h-72 object-contain"
              />
              <span className="font-mono-label text-[10px] text-outline uppercase tracking-wider pt-3">
                100% Natural Formulation · Hand-Poured
              </span>
            </div>

            {/* Modal Info Section */}
            <div className="w-full md:w-1/2 p-6 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-[#c4c7c7]">
                  <span className="font-mono-label text-[10px] uppercase tracking-widest text-primary font-bold">
                    [ {quickViewProduct.badge || 'EDP'} · {quickViewProduct.category.toUpperCase()} ]
                  </span>
                  <button
                    onClick={() => setQuickViewProduct(null)}
                    className="text-on-surface-variant hover:text-primary p-1"
                    aria-label="Close Quick View"
                  >
                    <span className="material-symbols-outlined text-[20px]">close</span>
                  </button>
                </div>

                <h3 className="font-headline-sm text-2xl uppercase text-primary font-light pt-2">
                  {quickViewProduct.name}
                </h3>
                <p className="font-body-sm text-xs text-on-surface-variant italic pt-0.5">
                  {quickViewProduct.tagline}
                </p>

                {/* Scent Pyramid Accords */}
                <div className="pt-3 space-y-1 text-xs">
                  <div className="flex justify-between border-b border-[#efeeeb] py-1 font-mono-spec">
                    <span className="text-outline uppercase text-[10px]">Top Notes</span>
                    <span className="text-primary truncate max-w-[60%] text-right">{quickViewProduct.pyramid.top}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#efeeeb] py-1 font-mono-spec">
                    <span className="text-outline uppercase text-[10px]">Heart Notes</span>
                    <span className="text-primary truncate max-w-[60%] text-right">{quickViewProduct.pyramid.heart}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#efeeeb] py-1 font-mono-spec">
                    <span className="text-outline uppercase text-[10px]">Base Notes</span>
                    <span className="text-primary truncate max-w-[60%] text-right">{quickViewProduct.pyramid.base}</span>
                  </div>
                </div>

                {/* Volume Selector in Quick View */}
                <div className="pt-4 space-y-2">
                  <span className="font-mono-label text-[10px] text-outline uppercase tracking-wider block">
                    Select Size:
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setQuickViewSize('50ml')}
                      className={`p-2 text-xs font-mono-spec border text-center transition-colors ${
                        quickViewSize === '50ml'
                          ? 'border-primary bg-primary text-on-primary font-bold'
                          : 'border-[#c4c7c7] text-on-surface-variant hover:text-primary bg-surface'
                      }`}
                    >
                      50ml Flacon<br />
                      <span className="font-bold">{formatPrice(quickViewProduct.price50ml)}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setQuickViewSize('6ml')}
                      className={`p-2 text-xs font-mono-spec border text-center transition-colors ${
                        quickViewSize === '6ml'
                          ? 'border-primary bg-primary text-on-primary font-bold'
                          : 'border-[#c4c7c7] text-on-surface-variant hover:text-primary bg-surface'
                      }`}
                    >
                      6ml Travel<br />
                      <span className="font-bold">{formatPrice(quickViewProduct.price6ml || 7500)}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Actions in Quick View */}
              <div className="space-y-2 pt-2 border-t border-[#c4c7c7]">
                <button
                  type="button"
                  onClick={() => {
                    const price = quickViewSize === '50ml' ? quickViewProduct.price50ml : (quickViewProduct.price6ml || 7500);
                    addToCart({
                      id: `${quickViewProduct.id}-${quickViewSize}`,
                      productId: quickViewProduct.id,
                      name: quickViewProduct.name,
                      size: quickViewSize,
                      price,
                      image: quickViewProduct.images.main,
                    });
                    setQuickViewProduct(null);
                    openCart();
                  }}
                  className="w-full py-3.5 bg-primary text-on-primary font-button-text uppercase tracking-widest text-xs hover:bg-[#333333] transition-colors flex items-center justify-center gap-2"
                >
                  <span>PURCHASE NOW</span>
                  <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const id = quickViewProduct.id;
                    setQuickViewProduct(null);
                    navigateTo('product', id);
                  }}
                  className="w-full py-2.5 border border-primary text-primary font-button-text uppercase tracking-widest text-xs hover:bg-surface-container transition-colors flex items-center justify-center gap-2"
                >
                  <span>VIEW FULL FORMULATION DOSSIER</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TECHNICAL SPEC & PROTOCOL BANNER: Matches design */}
      <section className="w-full bg-surface-container-low px-6 lg:px-12 py-16 border-b border-[#c4c7c7]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          <div className="space-y-2">
            <p className="font-mono-label text-mono-label text-outline uppercase tracking-widest text-xs">
              Protocol 01
            </p>
            <h3 className="font-headline-sm text-headline-sm uppercase text-primary font-normal text-lg">
              100% NATURALS
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant text-sm">
              Zero synthetic petrochemical musks or phthalates. Every single ingredient disclosed down to 0.001% concentration.
            </p>
          </div>

          <div className="space-y-2">
            <p className="font-mono-label text-mono-label text-outline uppercase tracking-widest text-xs">
              Protocol 02
            </p>
            <h3 className="font-headline-sm text-headline-sm uppercase text-primary font-normal text-lg">
              BIOTECH MOLECULES
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant text-sm">
              Upcycled botanicals created through advanced yeast fermentation, minimizing agricultural pressure and land exhaustion.
            </p>
          </div>

          <div className="space-y-2">
            <p className="font-mono-label text-mono-label text-outline uppercase tracking-widest text-xs">
              Protocol 03
            </p>
            <h3 className="font-headline-sm text-headline-sm uppercase text-primary font-normal text-lg">
              SKIN CHEMISTRY
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant text-sm">
              Designed to evolve dynamically with your individual body temperature and natural dermal microbiome over an 8-hour dry down.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
