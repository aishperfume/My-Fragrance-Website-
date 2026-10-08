import React from 'react';
import { useNavigation } from '../context/NavigationContext';

export const JournalView: React.FC = () => {
  const { navigateTo } = useNavigation();

  const articles = [
    {
      id: 'supercritical-co2',
      tag: 'BIOTECH SCIENCE',
      title: 'The Chemistry of Supercritical CO₂ Extraction',
      date: 'SEPTEMBER 2024 · DISPATCH 42',
      excerpt:
        'Traditional solvent extraction uses petroleum hexane that heats and burns delicate floral oils. Our low-temperature supercritical CO₂ cycle captures intact volatile facets at near ambient temperatures.',
    },
    {
      id: 'black-anise-dossier',
      tag: 'OLFACTORY STUDY',
      title: 'Black Anise: The Midnight Symbiosis of Star Anise and Cacao',
      date: 'AUGUST 2024 · DISPATCH 41',
      excerpt:
        'A comprehensive formulation dossier into our darkest creation. Exploring how French raw star anise reacts with fermented raw cocoa seed extract over an eight-hour skin evolution.',
    },
    {
      id: 'synthetic-musk-crisis',
      tag: 'ENVIRONMENTAL DOSSIER',
      title: 'Why Synthetic Petrochemical Musks Never Leave the Biosphere',
      date: 'JULY 2024 · DISPATCH 40',
      excerpt:
        'Polycyclic musks do not degrade naturally in water or soil. Khawaja uses biodegradable plant-derived ambrette seed and bio-fermented yeast musks that dissolve gracefully without environmental persistence.',
    },
  ];

  return (
    <div className="flex flex-col w-full bg-surface">
      <section className="w-full border-b border-[#c4c7c7] px-6 lg:px-12 py-12 lg:py-16 bg-surface-container-low">
        <span className="font-mono-label text-xs uppercase text-outline tracking-widest block mb-2">
          Khawaja Journal · Scientific &amp; Olfactory Dispatches
        </span>
        <h1 className="font-headline-lg text-3xl sm:text-5xl uppercase text-primary font-light tracking-wide m-0">
          JOURNAL DISPATCHES
        </h1>
        <p className="font-body-sm text-on-surface-variant max-w-xl mt-3">
          Explorations in plant biochemistry, olfactory architecture, transparent formulation, and sustainability.
        </p>
      </section>

      <div className="w-full px-6 lg:px-12 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {articles.map((art) => (
          <article
            key={art.id}
            className="p-6 bg-surface-container-low border border-[#c4c7c7] hover:border-primary transition-all flex flex-col justify-between space-y-6"
          >
            <div className="space-y-3">
              <span className="font-mono-label text-[10px] text-secondary font-bold tracking-widest uppercase">
                [ {art.tag} ]
              </span>
              <h3 className="font-headline-sm text-lg uppercase text-primary leading-snug">
                {art.title}
              </h3>
              <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                {art.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-[#c4c7c7] flex items-center justify-between font-mono-label text-[10px] text-outline">
              <span>{art.date}</span>
              <button
                onClick={() => navigateTo('shop')}
                className="text-primary hover:text-secondary uppercase tracking-wider flex items-center gap-1 font-bold"
              >
                <span>Read Dossier</span>
                <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
