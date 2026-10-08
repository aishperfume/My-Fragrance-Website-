import React from 'react';
import { useNavigation } from '../context/NavigationContext';

export const AboutView: React.FC = () => {
  const { navigateTo } = useNavigation();

  return (
    <div className="flex flex-col w-full bg-surface">
      {/* Hero Banner */}
      <section className="w-full border-b border-[#c4c7c7] px-6 lg:px-12 py-16 lg:py-24 bg-surface-container-low">
        <div className="max-w-4xl">
          <span className="font-mono-label text-xs uppercase text-secondary font-bold tracking-widest block mb-3">
            [ ETHOS &amp; PROVENANCE ]
          </span>
          <h1 className="font-headline-lg text-3xl sm:text-5xl lg:text-6xl uppercase text-primary font-light tracking-wide leading-tight">
            BIOLOGICAL SOPHISTICATION.<br />RADICAL PURITY.
          </h1>
          <p className="font-body-lg text-lg text-on-surface-variant max-w-2xl mt-6 font-light leading-relaxed">
            Khawaja was created in Amsterdam and refined with a single resolute mission: create the world's most luxurious, non-toxic perfumes using 100% natural plant chemistry and fermentation biotechnology.
          </p>
        </div>
      </section>

      {/* 2-Column Split: The Science & The Craft */}
      <section className="w-full border-b border-[#c4c7c7]">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column */}
          <div className="lg:col-span-6 p-8 lg:p-16 border-b lg:border-b-0 lg:border-r border-[#c4c7c7] space-y-6">
            <span className="font-mono-label text-xs uppercase text-outline tracking-wider">
              01 · ZERO PETROCHEMICALS
            </span>
            <h2 className="font-headline-lg text-3xl uppercase text-primary font-light">
              Why 100% Naturals Matter
            </h2>
            <p className="font-body-sm text-on-surface-variant leading-relaxed">
              Standard commercial perfumes use up to 95% synthetic petrochemical molecules—synthetic polycyclic musks, phthalate fixatives, and benzene compounds that accumulate in the body and marine ecosystems.
            </p>
            <p className="font-body-sm text-on-surface-variant leading-relaxed">
              At Khawaja, we reject synthetic shortcuts. Every formula is constructed from supercritical CO₂ botanical extractions, food-grade grain alcohol, and renewable yeast fermentation isolates that adapt harmoniously to your personal body chemistry.
            </p>
            <div className="pt-4">
              <span className="font-mono-spec text-xs text-primary font-bold uppercase block">
                ✦ 1% FOR THE PLANET CERTIFIED · VEGAN &amp; CRUELTY-FREE
              </span>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-6 p-8 lg:p-16 bg-surface-container-low space-y-6">
            <span className="font-mono-label text-xs uppercase text-outline tracking-wider">
              02 · MASTER PERFUMER
            </span>
            <h2 className="font-headline-lg text-3xl uppercase text-primary font-light">
              Isaac Sinclair [ MASTER PERFUMER ]
            </h2>
            <p className="font-body-sm text-on-surface-variant leading-relaxed">
              Trained in Milan and Paris under the world’s legendary noses, Isaac Sinclair brings uncompromising haute perfumery standards to natural plant compounds. Natural ingredients possess subtle chemical micro-facets that artificial laboratory synthetics simply cannot mimic.
            </p>
            <p className="font-body-sm text-on-surface-variant leading-relaxed">
              "Working with 100% naturals is infinitely more demanding, like painting with living light rather than digital pixels. The result is a scent that lives, breathes, and blooms uniquely with your skin."
            </p>
            <div className="pt-4">
              <button
                onClick={() => navigateTo('shop')}
                className="px-6 py-3 bg-primary text-on-primary font-button-text text-xs uppercase tracking-widest hover:bg-[#333333] transition-colors"
              >
                EXPLORE MASTER FORMULATIONS →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Full Transparency INCI Guarantee */}
      <section className="w-full p-8 lg:p-20 bg-surface text-center space-y-6 border-b border-[#c4c7c7]">
        <div className="max-w-2xl mx-auto space-y-4">
          <span className="font-mono-label text-xs uppercase text-secondary font-bold tracking-widest block">
            [ REGULATORY INTEGRITY ]
          </span>
          <h2 className="font-headline-lg text-3xl uppercase text-primary font-light">
            Full Disclosure INCI Policy
          </h2>
          <p className="font-body-sm text-on-surface-variant leading-relaxed">
            By global perfume law, brands are permitted to print the word "Parfum" to conceal toxic trade secrets. We disclose 100% of our ingredients on our boxes and online down to 0.001% concentration.
          </p>
        </div>
      </section>
    </div>
  );
};
