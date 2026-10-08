import React, { useState, useEffect } from 'react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useNavigation } from '../context/NavigationContext';
import { asset } from '../data/products';

const HERO_SLIDES = [
  {
    id: '01',
    image: asset('/images/hero-slide-1.jpg'),
    badge: 'BATCH 088 · 100% CLINICAL BOTANICAL',
    note: 'HARMONIC EXTRACTIONS & RAW AMBER',
    alt: 'Golden amber luxury flacon resting on architectural raw stone and warm botanicals',
  },
  {
    id: '02',
    image: asset('/images/hero-slide-2.jpg'),
    badge: 'NOCTURNE SERIES · DEEP OBSIDIAN & SPICE',
    note: 'SUPERCRITICAL CO₂ RESINS & RAW BOTANICALS',
    alt: 'Moody dark luxury perfume flacon glowing with warm interior amber radiance',
  },
  {
    id: '03',
    image: asset('/images/hero-slide-3.jpg'),
    badge: 'ATELIER BOTANICA · TRAVERTINE & COASTAL CEDAR',
    note: 'ORGANIC GRAIN SPIRITS & LIVING ACCORDS',
    alt: 'Dewy morning botanical stems and travertine stone with minimalist fragrance flacon',
  },
];

export const HomeView: React.FC = () => {
  const { products, formatPrice } = useProducts();
  const { addToCart } = useCart();
  const { navigateTo } = useNavigation();

  const [activeFilter, setActiveFilter] = useState<string>('best-sellers');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHeroHovered, setIsHeroHovered] = useState(false);

  // Fast responsive cycle: 2.8s per scene with fast 500ms transition
  useEffect(() => {
    if (isHeroHovered) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [isHeroHovered]);

  // Filter products for the matrix: default to Best Sellers (4 flagship perfumes)
  const filteredProducts = products.filter((p) => {
    if (activeFilter === 'best-sellers') return p.badge?.includes('BEST');
    if (activeFilter === 'all') return true;
    if (activeFilter === 'fresh' || activeFilter === 'citrus') return p.category === 'fresh';
    if (activeFilter === 'floral') return p.category === 'floral';
    if (activeFilter === 'woody') return p.category === 'woody';
    if (activeFilter === 'spicy') return p.category === 'spicy';
    if (activeFilter === 'amber') return p.category === 'amber' || p.category === 'woody';
    return true;
  });

  return (
    <div className="flex flex-col w-full">

      {/* HERO SECTION: Fits viewport height perfectly without cropping */}
      <section
        onMouseEnter={() => setIsHeroHovered(true)}
        onMouseLeave={() => setIsHeroHovered(false)}
        className="relative w-full h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] min-h-[560px] max-h-[920px] overflow-hidden bg-primary"
      >

        {/* Layered Cinematic Visuals with Fast Snappy Transition */}
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = currentSlide === idx;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-500 ease-out ${
                isActive
                  ? 'opacity-100 scale-100 brightness-[1.03] contrast-[1.03] z-0'
                  : 'opacity-0 scale-[0.98] pointer-events-none z-0'
              }`}
              style={{
                backgroundImage: `url('${slide.image}')`,
              }}
              role="img"
              aria-label={slide.alt}
            />
          );
        })}

        {/* Soft Ambient Scrim for Base Button Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none z-[1]" />

        {/* Hidden Accessible H1 for SEO */}
        <h1 className="sr-only">Khawaja Fragrance - 100% Natural Haute Parfumerie</h1>

        {/* Fast Interactive Slide Indicator Dots */}
        <div className="absolute bottom-24 sm:bottom-28 left-0 right-0 z-20 flex justify-center items-center gap-2">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer focus:outline-none ${
                currentSlide === idx ? 'w-8 bg-white shadow-sm' : 'w-2.5 bg-white/40 hover:bg-white/80'
              }`}
              aria-label={`Jump to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Minimalist Professional Floating CTA at Bottom */}
        <div className="absolute bottom-8 sm:bottom-12 left-0 right-0 z-20 flex justify-center items-center px-4 pointer-events-auto">
          <button
            onClick={() => navigateTo('shop')}
            className="group px-8 sm:px-12 py-3.5 sm:py-4 bg-[#faf9f6]/95 hover:bg-white text-primary backdrop-blur-md font-button-text text-xs uppercase tracking-[0.25em] transition-all duration-300 border border-[#c4c7c7] hover:border-primary shadow-xl hover:shadow-2xl active:scale-[0.98] flex items-center gap-3"
          >
            <span>SHOP NOW</span>
            <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1.5 transition-transform duration-300">
              arrow_forward
            </span>
          </button>
        </div>

      </section>

      {/* INFINITE MARQUEE TICKER (Left to Right Non-Stop Loop) */}
      <div className="w-full bg-surface-container-low border-b border-[#c4c7c7] py-3.5 sm:py-4 overflow-hidden select-none">
        <div className="flex animate-marquee-ltr whitespace-nowrap">
          {[0, 1, 2, 3].map((setIndex) => (
            <div
              key={setIndex}
              className="flex items-center gap-8 sm:gap-12 shrink-0 pr-8 sm:pr-12 font-mono-label text-mono-label uppercase text-on-surface-variant tracking-widest text-xs"
            >
              <span className="flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 bg-secondary"></span>
                100% BOTANICAL REVOLUTION
              </span>
              <span className="text-outline-variant">/</span>
              <span className="flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 bg-[#008fcb]"></span>
                FULLY DISCLOSED INCI FORMULAS
              </span>
              <span className="text-outline-variant">/</span>
              <span className="flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 bg-secondary"></span>
                LOW WASTE CLINICAL REFILLS
              </span>
              <span className="text-outline-variant">/</span>
              <span className="flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 bg-[#008fcb]"></span>
                1% FOR THE PLANET CERTIFIED
              </span>
              <span className="text-outline-variant">/</span>
            </div>
          ))}
        </div>
      </div>

      {/* THE MANIFESTO: Structural 12-Column Split */}
      <section className="w-full bg-surface border-b border-[#c4c7c7]">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">

          {/* Left Column: Big Statement */}
          <div className="lg:col-span-6 p-8 sm:p-12 lg:p-20 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#c4c7c7] bg-surface">
            <div className="space-y-6">
              <span className="font-mono-label text-mono-label uppercase text-secondary tracking-widest block">
                [ MANIFESTO 01 ]
              </span>
              <h2 className="font-headline-lg text-3xl sm:text-4xl lg:text- headline-lg uppercase text-primary font-light tracking-wide leading-tight">
                NOT SCENT ALONE.<br />
                A MOLECULAR<br />
                SYMBIOSIS.
              </h2>
            </div>

            <div className="pt-12 space-y-4 max-w-lg">
              <p className="font-body-lg text-body-lg text-on-surface-variant font-light">
                Founded in Amsterdam and perfected in pure coastal tranquility. Khawaja was conceived with an uncompromising ambition: create the world's most refined luxury fragrances utilizing only 100% natural compounds and non-toxic biotechnological isolations.
              </p>
              <p className="font-mono-spec text-mono-spec text-outline uppercase tracking-wider text-xs">
                NO PETROCHEMICALS · NO SYNTHETIC MUSKS · ZERO PARABENS
              </p>
            </div>
          </div>

          {/* Right Column: Visual Science Still Life & Spec Data */}
          <div className="lg:col-span-6 flex flex-col">
            <div
              className="w-full h-72 sm:h-80 lg:h-96 bg-cover bg-center border-b border-[#c4c7c7] transition-all duration-700 hover:scale-[1.01]"
              style={{
                backgroundImage: `url('${asset('/images/hero-slide-2.jpg')}')`,
              }}
            />

            <div className="p-8 lg:p-12 flex-1 flex flex-col justify-between bg-surface-container-low">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <span className="font-mono-label text-mono-label text-outline uppercase tracking-wider block">
                    BIO-EXTRACTION
                  </span>
                  <p className="font-headline-sm text-headline-sm uppercase text-primary font-normal">
                    Supercritical CO₂
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Low-temperature solventless extraction preserving intact olfactive facets.
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="font-mono-label text-mono-label text-outline uppercase tracking-wider block">
                    ETHICAL CARRIER
                  </span>
                  <p className="font-headline-sm text-headline-sm uppercase text-primary font-normal">
                    Organic Grain
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Food-grade certified organic alcohol derived from regenerative Italian grain crops.
                  </p>
                </div>
              </div>

              <div className="pt-8 mt-6 border-t border-[#c4c7c7] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <span className="font-mono-label text-mono-label text-primary uppercase tracking-widest text-xs">
                  MASTER PERFUMER: ISAAC SINCLAIR
                </span>
                <span className="font-mono-spec text-mono-spec text-secondary uppercase text-xs">
                  [ HAUTE PARFUMERIE ]
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* FRAGRANCE CATALOG MATRIX: Vitrine Shelving Layout */}
      <section className="w-full bg-surface border-b border-[#c4c7c7]" id="fragrance-catalog">

        {/* Header Bar with Filter Segmented Controller */}
        <div className="w-full px-6 lg:px-12 py-10 lg:py-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#c4c7c7]">
          <div>
            <span className="font-mono-label text-mono-label uppercase text-outline tracking-widest block mb-2">
              [ SELECTION MATRIX ]
            </span>
            <h3 className="font-headline-lg text-3xl sm:text-4xl uppercase text-primary font-light tracking-wide">
              EAUX DE PARFUM
            </h3>
          </div>

          {/* Filter Controller: Single-line horizontal bar */}
          <div className="flex items-center flex-nowrap overflow-x-auto no-scrollbar border border-[#c4c7c7] bg-surface-container-lowest max-w-full">
            {[
              { id: 'best-sellers', label: '[ BEST SELLERS ]' },
              { id: 'fresh', label: 'FRESH' },
              { id: 'floral', label: 'FLORAL' },
              { id: 'woody', label: 'WOODY' },
              { id: 'spicy', label: 'SPICY' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 sm:px-6 py-2.5 font-mono-spec text-mono-spec uppercase text-xs transition-colors shrink-0 whitespace-nowrap border-r last:border-r-0 border-[#c4c7c7] ${
                  activeFilter === tab.id
                    ? 'bg-primary text-on-primary font-bold'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid (1 column on mobile, 2 on tablet, 4 on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-[#c4c7c7]">
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              className="group relative flex flex-col bg-surface hover:bg-surface-container-lowest transition-colors duration-200 border-r border-b border-[#c4c7c7]"
            >
              {/* Card Header Badge */}
              <div className="p-4 flex items-center justify-between border-b border-[#c4c7c7] font-mono-label text-mono-label text-on-surface-variant text-xs">
                <span className="text-[#008fcb] tracking-wider truncate max-w-[70%]">
                  {product.badge || '[ FORMULA ]'}
                </span>
                <span>{product.number}</span>
              </div>

              {/* Product Visual */}
              <div
                onClick={() => navigateTo('product', product.id)}
                className="relative w-full aspect-[4/5] overflow-hidden bg-white flex items-center justify-center p-8 sm:p-10 cursor-pointer"
              >
                <img
                  src={product.images.main}
                  alt={product.altTexts.main}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>

              {/* Information & Actions */}
              <div className="p-6 flex-1 flex flex-col justify-between border-t border-[#c4c7c7] space-y-4 sm:space-y-6">
                <div className="space-y-2">
                  <div
                    onClick={() => navigateTo('product', product.id)}
                    className="flex items-center justify-between cursor-pointer"
                  >
                    <h4 className="font-headline-sm text-headline-sm uppercase text-primary font-normal tracking-wide group-hover:text-secondary transition-colors text-lg sm:text-xl">
                      {product.name}
                    </h4>
                    <span className="font-mono-spec text-mono-spec text-primary font-semibold text-sm sm:text-base">
                      {formatPrice(product.price50ml, product.discountPercent)}
                    </span>
                  </div>
                  <p className="font-mono-label text-mono-label text-outline uppercase tracking-wider text-[11px]">
                    {product.accordsSummary}
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant pt-1 text-xs sm:text-sm">
                    {product.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#c4c7c7] flex items-center justify-between gap-3">
                  <span className="font-mono-spec text-mono-spec text-on-surface-variant text-xs">
                    50ML FLACON
                  </span>
                  <button
                    type="button"
                    onClick={() => navigateTo('product', product.id)}
                    className="border border-primary px-5 py-2.5 font-button-text text-button-text uppercase tracking-widest text-xs hover:bg-primary hover:text-on-primary transition-colors active:scale-95"
                  >
                    VIEW PRODUCT
                  </button>
                </div>
              </div>

            </article>
          ))}
        </div>

        {/* View All Collection Bar */}
        <div className="p-6 bg-surface-container-low border-t border-[#c4c7c7] flex items-center justify-center">
          <button
            onClick={() => navigateTo('shop')}
            className="px-8 py-3 bg-transparent border border-primary text-primary font-button-text text-xs uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-colors"
          >
            EXPLORE COMPLETE COLLECTION ({products.length} FORMULATIONS) →
          </button>
        </div>

      </section>

      {/* ACCORD TECHNICAL SPECIFICATION & FULL DISCLOSURE INCI */}
      <section className="w-full bg-surface-container-low border-b border-[#c4c7c7] py-16 lg:py-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Left: Statement */}
          <div className="lg:col-span-5 space-y-6">
            <span className="font-mono-label text-mono-label uppercase text-secondary tracking-widest block">
              [ TRANSPARENCY REGISTRY ]
            </span>
            <h3 className="font-headline-lg text-3xl sm:text-4xl uppercase text-primary font-light leading-snug">
              100% INGREDIENT<br />DISCLOSURE
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md">
              Most perfume houses legally conceal their formulations behind the single ambiguous word "Fragrance" or "Parfum". We do not hide behind loopholes. Every single isolate, botanical distillation, and essential oil is printed on our cartons and verified online.
            </p>
            <div className="pt-4">
              <button
                onClick={() => navigateTo('about')}
                className="inline-flex items-center gap-2 font-mono-spec text-mono-spec text-primary uppercase border-b border-primary pb-1 hover:text-secondary hover:border-secondary transition-colors text-xs"
              >
                <span>Explore Complete INCI Database</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Right: Two-Column Accord Table */}
          <div className="lg:col-span-7 flex flex-col justify-center border-t border-[#c4c7c7]">
            {/* Row 1 */}
            <div className="py-5 border-b border-[#c4c7c7] grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline">
              <div className="md:col-span-3 font-mono-label text-mono-label uppercase text-outline tracking-wider text-xs">
                TOP ACCORDS
              </div>
              <div className="md:col-span-9 font-mono-spec text-mono-spec text-primary text-xs sm:text-sm">
                Italian Green Mandarin oil · Bitter Almond essential oil · Pink Pepper CO₂ (Madagascar)
              </div>
            </div>

            {/* Row 2 */}
            <div className="py-5 border-b border-[#c4c7c7] grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline">
              <div className="md:col-span-3 font-mono-label text-mono-label uppercase text-outline tracking-wider text-xs">
                HEART ACCORDS
              </div>
              <div className="md:col-span-9 font-mono-spec text-mono-spec text-primary text-xs sm:text-sm">
                Tunisian Neroli flower oil · Egyptian Jasmine Grandiflorum absolute · Bio-Matcha Tea infusion
              </div>
            </div>

            {/* Row 3 */}
            <div className="py-5 border-b border-[#c4c7c7] grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline">
              <div className="md:col-span-3 font-mono-label text-mono-label uppercase text-outline tracking-wider text-xs">
                BASE ACCORDS
              </div>
              <div className="md:col-span-9 font-mono-spec text-mono-spec text-primary text-xs sm:text-sm">
                New Caledonian Sandalwood heartwood · Plant-derived Ambroxan · Venezuelan Tonka Bean absolute
              </div>
            </div>

            {/* Row 4 */}
            <div className="py-5 border-b border-[#c4c7c7] grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline bg-surface-container-high/40 px-3">
              <div className="md:col-span-3 font-mono-label text-mono-label uppercase text-secondary tracking-wider text-xs font-bold">
                PURITY RATING
              </div>
              <div className="md:col-span-9 font-mono-spec text-mono-spec text-on-surface font-bold text-xs sm:text-sm">
                100% NATURALLY DERIVED · NON-GENETICALLY MODIFIED · CRUELTY-FREE
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* DISCOVERY SAMPLER SET CALLOUT: Full bleed split banner */}
      <section className="w-full bg-primary-container text-on-primary">
        <div className="grid grid-cols-1 lg:grid-cols-12">

          {/* Visual Half */}
          <div
            className="lg:col-span-6 min-h-[380px] lg:min-h-[460px] bg-cover bg-center border-b lg:border-b-0 lg:border-r border-[#c4c7c7]/30"
            style={{
              backgroundImage: `url('${asset('/images/perfume-discovery-set.jpg')}')`,
            }}
          />

          {/* Content Half */}
          <div className="lg:col-span-6 p-8 sm:p-12 lg:p-20 flex flex-col justify-between space-y-8 bg-primary">
            <div className="space-y-4">
              <span className="font-mono-label text-mono-label uppercase text-[#008fcb] tracking-widest block text-xs">
                [ ZERO RISK IMMERSION ]
              </span>
              <h3 className="font-headline-lg text-3xl sm:text-4xl uppercase text-on-primary font-light leading-snug">
                THE DISCOVERY<br />EXPERIENCE
              </h3>
              <p className="font-body-lg text-body-lg text-inverse-primary max-w-md text-sm sm:text-base">
                Perfume reacts distinctively to each wearer's skin chemistry and natural heat signatures. Explore our entire library of seven eaux de parfum in convenient 2ml atomizer vials.
              </p>
              <div className="pt-2">
                <span className="font-mono-spec text-mono-spec text-surface-container-lowest tracking-wider block text-xs">
                  INCLUDES PKR 5,000 DIGITAL CREDIT TOWARDS YOUR FIRST FULL 50ML BOTTLE.
                </span>
              </div>
            </div>

            <div className="pt-6 border-t border-outline-variant/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="font-mono-label text-mono-label text-outline uppercase block text-xs">
                  SET OF 7 X 2ML
                </span>
                <span className="font-headline-sm text-headline-sm text-on-primary text-xl">
                  {formatPrice(6000)}
                </span>
              </div>
              <button
                type="button"
                onClick={() =>
                  addToCart({
                    id: 'discovery-set-sample',
                    productId: 'discovery-set',
                    name: 'The Discovery Set',
                    size: 'sample-set',
                    price: 6000,
                    image: asset('/images/perfume-discovery-set.jpg'),
                  })
                }
                className="w-full sm:w-auto bg-surface text-primary font-button-text text-button-text uppercase tracking-widest px-8 py-4 text-center hover:bg-surface-variant transition-colors text-xs active:scale-98"
              >
                CLAIM DISCOVERY SET
              </button>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
