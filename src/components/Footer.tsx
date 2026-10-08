import React, { useState } from 'react';
import { useNavigation } from '../context/NavigationContext';

export const Footer: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 3000);
  };

  return (
    <footer className="w-full bg-surface-container-low border-t border-[#c4c7c7]">
      <div className="w-full px-6 lg:px-12 py-16 lg:py-24">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-[#c4c7c7]">
          
          {/* Brand Ethos & Newsletter */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <p className="font-mono-label text-mono-label uppercase text-outline tracking-widest">
                Ethos &amp; Commitment
              </p>
              <h3 className="font-headline-sm text-headline-sm uppercase tracking-wider text-primary font-normal leading-snug">
                100% Natural Perfume + Biotechnology
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md">
                Born in Amsterdam, perfected in Wellington. Radical transparency meets biological sophistication. Non-toxic, clean clinical formulations using pure botanical extracts and supercritical CO₂ isolations.
              </p>
            </div>

            {/* Email Dispatch Form */}
            <div className="space-y-3">
              <p className="font-mono-label text-mono-label uppercase text-primary tracking-widest">
                Stay Connected
              </p>
              <form onSubmit={handleSubscribe} className="flex w-full max-w-md">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ENTER EMAIL FOR DISPATCHES"
                  className="w-full bg-surface-container-lowest border border-[#c4c7c7] px-4 py-3 font-mono-label text-mono-label text-on-surface placeholder:text-outline focus:outline-none focus:border-primary"
                />
                <button
                  type="submit"
                  className="bg-primary text-on-primary px-6 py-3 font-button-text text-button-text uppercase tracking-widest hover:bg-[#333333] transition-colors whitespace-nowrap"
                >
                  {subscribed ? 'JOINED' : 'JOIN'}
                </button>
              </form>
              {subscribed && (
                <p className="font-mono-label text-[10px] text-secondary uppercase tracking-widest">
                  ✦ Welcome to the Khawaja Olfactory Dispatch. Check your inbox.
                </p>
              )}
            </div>
          </div>

          {/* Nav Directory Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            
            {/* Fragrances Column */}
            <div className="space-y-4">
              <p className="font-mono-label text-mono-label uppercase text-outline tracking-widest">
                Fragrances
              </p>
              <ul className="space-y-2.5">
                <li>
                  <button
                    onClick={() => navigateTo('shop')}
                    className="font-mono-spec text-mono-spec text-on-surface-variant hover:text-primary transition-colors text-left"
                  >
                    Eaux de Parfum
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo('sample')}
                    className="font-mono-spec text-mono-spec text-on-surface-variant hover:text-primary transition-colors text-left"
                  >
                    Discovery Sets
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo('sample')}
                    className="font-mono-spec text-mono-spec text-on-surface-variant hover:text-primary transition-colors text-left"
                  >
                    Layering Duos
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo('finder')}
                    className="font-mono-spec text-mono-spec text-on-surface-variant hover:text-primary transition-colors text-left"
                  >
                    Accord Profiler
                  </button>
                </li>
              </ul>
            </div>

            {/* Sustainability Column */}
            <div className="space-y-4">
              <p className="font-mono-label text-mono-label uppercase text-outline tracking-widest">
                Sustainability
              </p>
              <ul className="space-y-2.5">
                <li>
                  <button
                    onClick={() => navigateTo('about')}
                    className="font-mono-spec text-mono-spec text-on-surface-variant hover:text-primary transition-colors text-left"
                  >
                    1% For The Planet
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo('about')}
                    className="font-mono-spec text-mono-spec text-on-surface-variant hover:text-primary transition-colors text-left"
                  >
                    Biotechnology Sourcing
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo('about')}
                    className="font-mono-spec text-mono-spec text-on-surface-variant hover:text-primary transition-colors text-left"
                  >
                    Full Disclosure INCI
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo('about')}
                    className="font-mono-spec text-mono-spec text-on-surface-variant hover:text-primary transition-colors text-left"
                  >
                    Refill Program
                  </button>
                </li>
              </ul>
            </div>

            {/* Client Care Column */}
            <div className="space-y-4">
              <p className="font-mono-label text-mono-label uppercase text-outline tracking-widest">
                Client Care
              </p>
              <ul className="space-y-2.5">
                <li>
                  <span className="font-mono-spec text-mono-spec text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
                    Shipping &amp; Returns
                  </span>
                </li>
                <li>
                  <span className="font-mono-spec text-mono-spec text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
                    Global Stockists
                  </span>
                </li>
                <li>
                  <span className="font-mono-spec text-mono-spec text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
                    Concierge Inquiries
                  </span>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo('journal')}
                    className="font-mono-spec text-mono-spec text-on-surface-variant hover:text-primary transition-colors text-left"
                  >
                    Journal Dispatches
                  </button>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom Sub-bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono-label text-mono-label text-outline uppercase text-xs">
            © 2024 KHAWAJA LTD. ALL FORMULATIONS PRESERVED.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <span className="font-mono-label text-mono-label uppercase text-outline hover:text-primary transition-colors cursor-pointer text-xs">
              Privacy Policy
            </span>
            <span className="font-mono-label text-mono-label uppercase text-outline hover:text-primary transition-colors cursor-pointer text-xs">
              Terms of Service
            </span>
            <span className="font-mono-label text-mono-label uppercase text-outline hover:text-primary transition-colors cursor-pointer text-xs">
              Transparency Registry
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
