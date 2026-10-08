import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { useNavigation } from '../context/NavigationContext';
import { useCart } from '../context/CartContext';

export const FragranceFinderView: React.FC = () => {
  const { products, formatPrice } = useProducts();
  const { navigateTo } = useNavigation();
  const { addToCart, openCart } = useCart();

  const [step, setStep] = useState(1);
  const [mood, setMood] = useState<string>('');
  const [accord, setAccord] = useState<string>('');
  const [recommendedId, setRecommendedId] = useState<string>('cyan-nori');

  const handleFinish = (_finalIntensity: string) => {

    // Dynamic match algorithm
    if (mood === 'night' || accord === 'spice') {
      setRecommendedId('black-anise');
    } else if (mood === 'fresh' || accord === 'marine') {
      setRecommendedId('cyan-nori');
    } else if (mood === 'earth' || accord === 'wood') {
      setRecommendedId('green-cedar');
    } else if (mood === 'sun' || accord === 'floral') {
      setRecommendedId('golden-neroli');
    } else {
      setRecommendedId('laundry-day');
    }
    setStep(4);
  };

  const matchedProduct = products.find((p) => p.id === recommendedId) || products[0];

  return (
    <div className="w-full bg-surface py-12 px-6 lg:px-12 min-h-[calc(100vh-80px)] flex flex-col justify-center">
      <div className="max-w-3xl mx-auto w-full border border-[#c4c7c7] bg-surface-container-low p-6 sm:p-12 shadow-sm">
        
        {/* Step Progress */}
        <div className="flex items-center justify-between pb-6 border-b border-[#c4c7c7] font-mono-label text-xs uppercase text-outline">
          <span>Olfactive Profiler Algorithm</span>
          <span>STEP 0{Math.min(3, step)} OF 03</span>
        </div>

        {/* Step 1: Mood */}
        {step === 1 && (
          <div className="py-8 space-y-6">
            <span className="font-mono-label text-xs uppercase text-secondary font-bold block">
              [ PARAMETER 01 · ATMOSPHERIC INTENT ]
            </span>
            <h2 className="font-headline-lg text-2xl sm:text-3xl uppercase text-primary font-light">
              What aura or atmosphere do you desire to project?
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {[
                { id: 'fresh', title: 'Solar Oceanic Refreshment', desc: 'Vibrant salty breeze, ripe citrus, and clean morning vitality' },
                { id: 'night', title: 'Late-Night Intoxicating Intrigue', desc: 'Sultry star anise, raw dark cacao, and velvet smoked tobacco' },
                { id: 'earth', title: 'Grounding Wild Botanical Peace', desc: 'Deep mountain cedarwood, ancient roots, and meditative pine' },
                { id: 'sun', title: 'Sunlit Floral Opulence', desc: 'Honeyed Tunisian neroli blossoms, matcha tea, and creamy woods' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setMood(opt.id);
                    setStep(2);
                  }}
                  className="p-5 text-left border border-[#c4c7c7] bg-surface hover:border-primary hover:bg-surface-container-lowest transition-all group"
                >
                  <h4 className="font-headline-sm uppercase text-sm text-primary group-hover:text-secondary">
                    {opt.title}
                  </h4>
                  <p className="font-body-sm text-xs text-on-surface-variant mt-1">
                    {opt.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Accord Preference */}
        {step === 2 && (
          <div className="py-8 space-y-6">
            <span className="font-mono-label text-xs uppercase text-secondary font-bold block">
              [ PARAMETER 02 · BOTANICAL ACCORD FOCUS ]
            </span>
            <h2 className="font-headline-lg text-2xl sm:text-3xl uppercase text-primary font-light">
              Which botanical isolate family speaks to your senses?
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {[
                { id: 'marine', title: 'Salty Ozone & Tangerine', desc: 'Plant-derived algae nori isolate with buoyant citrus' },
                { id: 'spice', title: 'Star Anise & Blackcurrant Noir', desc: 'Dynamic dark fruits with rich licorice spice' },
                { id: 'wood', title: 'Atlas Cedar & Cardamom', desc: 'Regenerative resinous woods and ancient aromatics' },
                { id: 'floral', title: 'Neroli & Ceremonial Matcha', desc: 'Dewy orange blossoms balanced by powdered green tea' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setAccord(opt.id);
                    setStep(3);
                  }}
                  className="p-5 text-left border border-[#c4c7c7] bg-surface hover:border-primary hover:bg-surface-container-lowest transition-all group"
                >
                  <h4 className="font-headline-sm uppercase text-sm text-primary group-hover:text-secondary">
                    {opt.title}
                  </h4>
                  <p className="font-body-sm text-xs text-on-surface-variant mt-1">
                    {opt.desc}
                  </p>
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep(1)}
              className="font-mono-spec text-xs uppercase text-outline hover:text-primary pt-2 flex items-center gap-1"
            >
              ← Back to Parameter 01
            </button>
          </div>
        )}

        {/* Step 3: Intensity */}
        {step === 3 && (
          <div className="py-8 space-y-6">
            <span className="font-mono-label text-xs uppercase text-secondary font-bold block">
              [ PARAMETER 03 · CIRCADIAN EVOLUTION ]
            </span>
            <h2 className="font-headline-lg text-2xl sm:text-3xl uppercase text-primary font-light">
              How do you prefer your fragrance to evolve on skin?
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {[
                { id: 'intimate', title: 'Intimate Second Skin', desc: 'Radiates closely within personal proximity (0.5m)' },
                { id: 'balanced', title: 'Balanced Harmonic Sillage', desc: 'Leaves a delicate, memorable trail over 8 hours' },
                { id: 'magnetic', title: 'Magnetic Dominant Aura', desc: 'Resonant projection amplified by skin heat' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleFinish(opt.id)}
                  className="p-5 text-left border border-[#c4c7c7] bg-surface hover:border-primary hover:bg-surface-container-lowest transition-all group"
                >
                  <h4 className="font-headline-sm uppercase text-sm text-primary group-hover:text-secondary">
                    {opt.title}
                  </h4>
                  <p className="font-body-sm text-xs text-on-surface-variant mt-1">
                    {opt.desc}
                  </p>
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep(2)}
              className="font-mono-spec text-xs uppercase text-outline hover:text-primary pt-2 flex items-center gap-1"
            >
              ← Back to Parameter 02
            </button>
          </div>
        )}

        {/* Step 4: Matched Result */}
        {step === 4 && (
          <div className="py-8 space-y-6">
            <div className="inline-block bg-primary text-on-primary px-3 py-1 font-mono-label text-xs uppercase tracking-widest">
              ✦ OPTIMAL SYMBIOTIC FORMULATION MATCHED
            </div>

            <div className="p-6 bg-surface border border-[#c4c7c7] flex flex-col md:flex-row items-center gap-6">
              <div className="w-36 h-44 bg-surface-container-lowest p-2 border border-[#e2e0d8] flex items-center justify-center flex-shrink-0">
                <img
                  src={matchedProduct.images.main}
                  alt={matchedProduct.name}
                  className="w-full h-full object-contain mix-blend-multiply"
                />
              </div>

              <div className="flex-1 space-y-2 text-left">
                <span className="font-mono-label text-xs text-secondary font-bold uppercase">
                  {matchedProduct.badge} · {matchedProduct.number}
                </span>
                <h3 className="font-headline-lg text-2xl uppercase text-primary">
                  {matchedProduct.name}
                </h3>
                <p className="font-mono-label text-xs text-outline uppercase tracking-wider">
                  {matchedProduct.accordsSummary}
                </p>
                <p className="font-body-sm text-xs text-on-surface-variant pt-1">
                  {matchedProduct.description}
                </p>
                <div className="pt-2 font-mono-spec font-bold text-base text-primary">
                  {formatPrice(matchedProduct.price50ml, matchedProduct.discountPercent)} (50ML EDP)
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => navigateTo('product', matchedProduct.id)}
                className="flex-1 py-4 bg-primary text-on-primary font-button-text text-xs uppercase tracking-widest hover:bg-[#333333] transition-colors"
              >
                VIEW FULL FORMULATION DOSSIER →
              </button>
              <button
                onClick={() => {
                  addToCart({
                    id: `${matchedProduct.id}-50ml`,
                    productId: matchedProduct.id,
                    name: matchedProduct.name,
                    size: '50ml',
                    price: matchedProduct.price50ml,
                    image: matchedProduct.images.main,
                  });
                  openCart();
                }}
                className="flex-1 py-4 border border-primary text-primary font-button-text text-xs uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-colors flex items-center justify-center gap-2"
              >
                <span>PURCHASE NOW</span>
                <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
              </button>
              <button
                onClick={() => setStep(1)}
                className="py-4 px-6 border border-[#c4c7c7] font-mono-spec text-xs uppercase hover:bg-surface-container transition-colors"
              >
                Restart
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
