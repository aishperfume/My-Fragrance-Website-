import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useNavigation } from '../context/NavigationContext';
import { asset } from '../data/products';

export const ProductDetailView: React.FC = () => {
  const { products, formatPrice } = useProducts();
  const { addToCart } = useCart();
  const { selectedProductId, navigateTo } = useNavigation();

  // Find active product or fallback to black-anise
  const product = products.find((p) => p.id === selectedProductId) || products[0];

  const [selectedSize, setSelectedSize] = useState<'50ml' | '6ml'>('50ml');
  const [activeThumbIndex, setActiveThumbIndex] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  // Accordion states
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    scent: false,
    switch: false,
    ingredients: false,
    sustainability: false,
  });

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Gallery images array
  const galleryImages = [
    {
      src: product.images.main,
      alt: product.altTexts.main,
      label: 'Flacon Front View',
    },
    {
      src: product.images.atomizer || asset('/images/atomizer-travel-spray.jpg'),
      alt: product.altTexts.atomizer || 'Pocket Atomiser & Recycled Box',
      label: 'Pocket Atomiser (6ml)',
    },
    {
      src: product.images.lifestyle || asset('/images/hero-slide-3.jpg'),
      alt: 'Botanical Formula Campaign',
      label: 'Botanical Formula Campaign',
    },
  ];

  const activeImage = galleryImages[activeThumbIndex] || galleryImages[0];

  const currentPrice = selectedSize === '50ml' ? product.price50ml : (product.price6ml || 7500);

  const handleAdd = () => {
    setIsAdded(true);
    addToCart({
      id: `${product.id}-${selectedSize}`,
      productId: product.id,
      name: product.name,
      size: selectedSize,
      price: currentPrice,
      image: product.images.main,
    });
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="w-full bg-surface">
      
      {/* Back breadcrumb for mobile */}
      <div className="lg:hidden px-4 py-3 border-b border-[#c4c7c7] flex items-center justify-between bg-surface-container-low">
        <button
          onClick={() => navigateTo('shop')}
          className="flex items-center gap-1 font-mono-label text-xs uppercase text-primary"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Return to Collection</span>
        </button>
        <span className="font-mono-label text-[10px] text-outline uppercase tracking-wider">
          {product.number}
        </span>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-80px)]">
        
        {/* LEFT PANE: Studio Photography Canvas & Gallery Thumbnails */}
        <div className="lg:col-span-6 xl:col-span-7 bg-surface-container-lowest flex flex-col justify-between items-center px-6 sm:px-12 lg:px-16 pt-8 pb-12 relative overflow-hidden border-b lg:border-b-0 lg:border-r border-[#c4c7c7]">
          
          {/* Top Badge / Botanical Batch Spec */}
          <div className="w-full flex items-center justify-between font-mono-label text-mono-label uppercase text-on-surface-variant/70 text-xs">
            <span className="tracking-widest">{product.number} · DISPATCH ARCHIVE</span>
            <span className="tracking-widest">100% CLINICAL BOTANICAL</span>
          </div>

          {/* Main Display Bottle Viewport */}
          <div className="w-full max-w-lg my-auto py-10 flex flex-col items-center justify-center relative">
            <div className="relative w-full aspect-[4/5] flex items-center justify-center">
              <img
                src={activeImage.src}
                alt={activeImage.alt}
                className="w-full h-full object-contain drop-shadow-md transition-opacity duration-300 select-none"
              />
            </div>
          </div>

          {/* Gallery Thumbnail Matrix (3 Thumbs) */}
          <div className="w-full flex items-center justify-center gap-3 pt-4">
            {galleryImages.map((thumb, index) => (
              <button
                key={index}
                onClick={() => setActiveThumbIndex(index)}
                aria-label={thumb.label}
                className={`gallery-thumb group relative w-16 h-20 sm:w-20 sm:h-24 bg-surface-container-low transition-all duration-150 p-1.5 focus:outline-none border ${
                  activeThumbIndex === index ? 'border-primary' : 'border-transparent hover:border-[#c4c7c7]'
                }`}
                type="button"
              >
                <div className="w-full h-full overflow-hidden flex items-center justify-center">
                  <img
                    src={thumb.src}
                    alt={thumb.label}
                    className="w-full h-full object-contain"
                  />
                </div>
                {activeThumbIndex === index && (
                  <span className="active-indicator absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-primary" />
                )}
              </button>
            ))}
          </div>

        </div>

        {/* RIGHT PANE: Product Editorial & Architectural Formulation Spec */}
        <div className="lg:col-span-6 xl:col-span-5 bg-surface flex flex-col justify-between px-6 sm:px-12 lg:px-14 xl:px-16 py-12 lg:py-16">
          
          <div className="space-y-8 sm:space-y-10">
            
            {/* Header Group: Title, Classification & Micro-Rating */}
            <div className="space-y-3">
              <h1 className="font-headline-lg text-3xl sm:text-4xl lg:text-5xl uppercase text-primary font-light tracking-wide leading-none">
                {product.name}
              </h1>
              
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono-label text-mono-label uppercase text-on-surface-variant text-xs">
                <span className="tracking-widest">{product.category.toUpperCase()}, NOIR</span>
                <span className="text-[#c4c7c7]">·</span>
                <span className="flex items-center gap-1 text-primary">
                  <span className="text-secondary tracking-normal">★</span>
                  <span className="font-mono-spec text-mono-spec font-bold">
                    {product.rating || 4.93}
                  </span>
                  <span className="text-on-surface-variant">({product.reviewsCount || 41})</span>
                </span>
                <span className="text-[#c4c7c7]">·</span>
                <span className="text-outline">EAU DE PARFUM</span>
              </div>
            </div>

            {/* Editorial Scent Narrative */}
            <div className="space-y-4 max-w-xl text-on-surface-variant">
              <p className="font-body-lg text-body-lg font-light text-on-surface leading-relaxed text-base sm:text-lg">
                {product.description}
              </p>
              <p className="font-body-sm text-body-sm leading-relaxed text-on-surface-variant text-xs sm:text-sm">
                {product.extendedDescription ||
                  'With a heady opening of natural botanicals, dynamic notes unfold in the heart before settling into a long-lasting biological dry down.'}
              </p>
            </div>

            {/* Olfactory Pyramid Table / Technical Specification Grid */}
            <div className="pt-4">
              <div className="bg-surface-container-low p-6 space-y-4 border border-[#e2e0d8]">
                <div className="flex items-center justify-between pb-3 border-b border-[#c4c7c7]">
                  <span className="font-mono-label text-mono-label uppercase tracking-widest text-primary font-medium text-xs">
                    OLFACTORY ACCORD SPECIFICATION
                  </span>
                  <span className="font-mono-label text-mono-label uppercase text-outline text-xs">
                    EDP CONCENTRATION
                  </span>
                </div>

                {/* Top Note */}
                <div className="grid grid-cols-12 gap-4 items-baseline py-2 border-b border-[#efeeeb]">
                  <span className="col-span-3 font-mono-spec text-mono-spec text-outline uppercase tracking-widest text-xs">
                    TOP
                  </span>
                  <span className="col-span-9 font-body-sm text-body-sm text-on-surface tracking-wide text-xs sm:text-sm font-medium">
                    {product.pyramid.top}
                  </span>
                </div>

                {/* Heart Note */}
                <div className="grid grid-cols-12 gap-4 items-baseline py-2 border-b border-[#efeeeb]">
                  <span className="col-span-3 font-mono-spec text-mono-spec text-outline uppercase tracking-widest text-xs">
                    HEART
                  </span>
                  <span className="col-span-9 font-body-sm text-body-sm text-on-surface tracking-wide text-xs sm:text-sm font-medium">
                    {product.pyramid.heart}
                  </span>
                </div>

                {/* Base Note */}
                <div className="grid grid-cols-12 gap-4 items-baseline py-2">
                  <span className="col-span-3 font-mono-spec text-mono-spec text-outline uppercase tracking-widest text-xs">
                    BASE
                  </span>
                  <span className="col-span-9 font-body-sm text-body-sm text-on-surface tracking-wide text-xs sm:text-sm font-medium">
                    {product.pyramid.base}
                  </span>
                </div>
              </div>
            </div>

            {/* Sizing & Purchase Interaction Block */}
            <div className="space-y-4 pt-2">
              
              {/* Segmented Volume Selector */}
              <div className="grid grid-cols-2 w-full bg-surface-container-low p-1 border border-[#c4c7c7]">
                <button
                  type="button"
                  onClick={() => setSelectedSize('6ml')}
                  className={`w-full py-3.5 px-4 font-mono-label text-mono-label uppercase transition-colors text-center text-xs ${
                    selectedSize === '6ml'
                      ? 'bg-surface-container-lowest text-primary font-bold shadow-sm'
                      : 'text-on-surface-variant hover:text-primary'
                  }`}
                >
                  {selectedSize === '6ml' ? '[ 6ml Travel ]' : '6ml Travel'}
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedSize('50ml')}
                  className={`w-full py-3.5 px-4 font-mono-label text-mono-label uppercase transition-colors text-center text-xs ${
                    selectedSize === '50ml'
                      ? 'bg-surface-container-lowest text-primary font-bold shadow-sm'
                      : 'text-on-surface-variant hover:text-primary'
                  }`}
                >
                  {selectedSize === '50ml' ? '[ 50ml Flacon ]' : '50ml Flacon'}
                </button>
              </div>

              {/* Primary CTA Button */}
              <button
                type="button"
                onClick={handleAdd}
                className="w-full py-5 px-6 bg-primary text-on-primary font-button-text text-button-text uppercase tracking-widest hover:bg-[#333333] transition-colors flex items-center justify-center gap-3 active:scale-[0.99] text-xs"
              >
                <span>
                  {isAdded
                    ? 'ADDED TO BAG'
                    : `ADD TO BAG — ${formatPrice(currentPrice, product.discountPercent)}`}
                </span>
                <span
                  className={`material-symbols-outlined text-[18px] text-[#008fcb] transition-opacity ${
                    isAdded ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  check_circle
                </span>
              </button>

              {/* Micro-guarantee metadata */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between font-mono-label text-mono-label text-outline px-1 pt-1 text-[10px] gap-1">
                <span>INCLUDES COMPLIMENTARY 2ML VIAL FOR SAMPLING</span>
                <span>RADICAL TRANSPARENCY GUARANTEE</span>
              </div>
            </div>

            {/* Accordion Disclosures */}
            <div className="space-y-0 pt-4 border-t border-[#c4c7c7]">
              
              {/* Accordion 1: Scent Profile */}
              <div className="border-b border-[#efeeeb] py-1">
                <button
                  type="button"
                  onClick={() => toggleAccordion('scent')}
                  className="w-full py-4 flex items-center justify-between text-left font-mono-label text-mono-label uppercase tracking-widest text-primary hover:text-on-surface-variant transition-colors text-xs"
                >
                  <span>SCENT PROFILE &amp; EVOLUTION</span>
                  <span className="font-mono-spec text-sm leading-none">
                    {openAccordions.scent ? '—' : '+'}
                  </span>
                </button>
                {openAccordions.scent && (
                  <div className="pb-5 pt-1 space-y-3 font-body-sm text-body-sm text-on-surface-variant leading-relaxed text-xs">
                    <p>
                      {product.name} defies classical synthetic perfumery boundaries. It weaves natural fermentation isolates with therapeutic-grade botanical absolutes to create a resinous, magnetic aura that lingers close to warm pulse points.
                    </p>
                    <p className="font-mono-spec text-mono-spec text-outline">
                      SUGGESTED LAYER: Pair with Cyan Nori for an ozonic marine juxtaposition.
                    </p>
                  </div>
                )}
              </div>

              {/* Accordion 2: Synthetic Switch */}
              <div className="border-b border-[#efeeeb] py-1">
                <button
                  type="button"
                  onClick={() => toggleAccordion('switch')}
                  className="w-full py-4 flex items-center justify-between text-left font-mono-label text-mono-label uppercase tracking-widest text-primary hover:text-on-surface-variant transition-colors text-xs"
                >
                  <span>SYNTHETIC SWITCH (BIOTECH SCIENCE)</span>
                  <span className="font-mono-spec text-sm leading-none">
                    {openAccordions.switch ? '—' : '+'}
                  </span>
                </button>
                {openAccordions.switch && (
                  <div className="pb-5 pt-1 space-y-3 font-body-sm text-body-sm text-on-surface-variant leading-relaxed text-xs">
                    <p>
                      Conventional fragrances rely heavily on petroleum-derived benzene musk, synthetic coumarin, and phthalate fixatives. Khawaja replaces every single component with renewable biotechnology: non-GMO sugar cane ethanol, botanical isolates, and clean fermentation science.
                    </p>
                  </div>
                )}
              </div>

              {/* Accordion 3: Ingredients */}
              <div className="border-b border-[#efeeeb] py-1">
                <button
                  type="button"
                  onClick={() => toggleAccordion('ingredients')}
                  className="w-full py-4 flex items-center justify-between text-left font-mono-label text-mono-label uppercase tracking-widest text-primary hover:text-on-surface-variant transition-colors text-xs"
                >
                  <span>INGREDIENTS (100% FULL INCI)</span>
                  <span className="font-mono-spec text-sm leading-none">
                    {openAccordions.ingredients ? '—' : '+'}
                  </span>
                </button>
                {openAccordions.ingredients && (
                  <div className="pb-5 pt-1 space-y-3 font-body-sm text-body-sm text-on-surface-variant leading-relaxed text-xs">
                    <p className="font-mono-spec text-mono-spec uppercase text-outline">
                      COMPLETE 100% INCI DECLARATION:
                    </p>
                    <p className="font-mono-spec text-mono-spec text-on-surface leading-normal text-xs bg-surface-container-low p-3 border border-[#e2e0d8]">
                      {product.inci}
                    </p>
                  </div>
                )}
              </div>

              {/* Accordion 4: Sustainability & Packaging */}
              <div className="border-b border-[#efeeeb] py-1">
                <button
                  type="button"
                  onClick={() => toggleAccordion('sustainability')}
                  className="w-full py-4 flex items-center justify-between text-left font-mono-label text-mono-label uppercase tracking-widest text-primary hover:text-on-surface-variant transition-colors text-xs"
                >
                  <span>SUSTAINABILITY &amp; CIRCULAR PACKAGING</span>
                  <span className="font-mono-spec text-sm leading-none">
                    {openAccordions.sustainability ? '—' : '+'}
                  </span>
                </button>
                {openAccordions.sustainability && (
                  <div className="pb-5 pt-1 space-y-3 font-body-sm text-body-sm text-on-surface-variant leading-relaxed text-xs">
                    <p>
                      Bottled in lightweight, infinitely recyclable glass. The cap is engineered from agricultural cornstarch and potato starch waste. Boxes are produced from FSC-certified post-consumer recycled paperboard printed exclusively with vegetable-based inks. 1% of all revenue is channeled directly to restorative ecological programs.
                    </p>
                  </div>
                )}
              </div>

            </div>

          </div>

          {/* Footer Micro-Metadata */}
          <div className="pt-12 mt-12 flex items-center justify-between font-mono-label text-mono-label uppercase text-outline text-xs border-t border-[#efeeeb]">
            <span>KHAWAJA HAUTE PARFUMERIE</span>
            <span>FORMULA VERIFIED B-CORP</span>
          </div>

        </div>

      </div>

    </div>
  );
};
