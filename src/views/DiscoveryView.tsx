import React from 'react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { asset } from '../data/products';

export const DiscoveryView: React.FC = () => {
  const { addToCart } = useCart();
  const { formatPrice } = useProducts();

  return (
    <div className="flex flex-col w-full bg-surface">
      {/* Header */}
      <section className="w-full border-b border-[#c4c7c7] px-6 lg:px-12 py-12 lg:py-16">
        <span className="font-mono-label text-mono-label text-outline uppercase tracking-widest block mb-2 text-xs">
          Category — Discovery Sets &amp; Layering Kits
        </span>
        <h1 className="font-headline-lg text-3xl sm:text-5xl uppercase text-primary font-light tracking-wide m-0">
          THE DISCOVERY EXPERIENCE
        </h1>
        <p className="font-body-lg text-on-surface-variant max-w-2xl mt-4">
          Skin chemistry is uniquely personal. Our discovery sets and layering vials allow you to experience 100% natural biotechnology perfume in the intimate rhythms of your daily life.
        </p>
      </section>

      {/* Featured Discovery Set */}
      <section className="w-full border-b border-[#c4c7c7]">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[540px]">
          <div
            className="lg:col-span-6 min-h-[350px] lg:min-h-[500px] bg-cover bg-center border-b lg:border-b-0 lg:border-r border-[#c4c7c7]"
            style={{
              backgroundImage: `url('${asset('/images/perfume-discovery-set.jpg')}')`,
            }}
          />

          <div className="lg:col-span-6 p-8 lg:p-16 flex flex-col justify-between space-y-8 bg-surface-container-low">
            <div className="space-y-4">
              <span className="font-mono-label text-mono-label text-secondary uppercase tracking-widest block text-xs font-bold">
                [ BEST SELLER · ZERO RISK IMMERSION ]
              </span>
              <h2 className="font-headline-lg text-3xl uppercase text-primary font-light">
                Complete Discovery Set (7 x 2ml)
              </h2>
              <p className="font-body-sm text-on-surface-variant leading-relaxed">
                Contains our entire seven-fragrance library in premium 2ml glass atomizer vials: Cyan Nori, Green Cedar, Golden Neroli, Cobalt Amber, Laundry Day, Pause, and Black Anise.
              </p>
              
              <div className="p-4 bg-surface border border-[#c4c7c7] space-y-2">
                <span className="font-mono-label text-xs uppercase text-primary font-bold block">
                  ✦ PKR 5,000 Digital Flacon Voucher Included
                </span>
                <p className="font-body-sm text-xs text-on-surface-variant">
                  Every discovery set includes an enclosed voucher code redeemable for PKR 5,000 toward any full 50ml flacon.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-[#c4c7c7] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="font-mono-label text-xs uppercase text-outline block">
                  INCLUDES 7 VIALS + VOUCHER
                </span>
                <span className="font-headline-sm text-2xl text-primary font-bold">
                  {formatPrice(6000)}
                </span>
              </div>
              <button
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
                className="w-full sm:w-auto px-8 py-4 bg-primary text-on-primary font-button-text uppercase tracking-widest text-xs hover:bg-[#333333] transition-colors"
              >
                + ADD DISCOVERY SET TO BAG
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Layering Duos Section */}
      <section className="w-full p-6 lg:p-12 border-b border-[#c4c7c7]">
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-12">
          <span className="font-mono-label text-xs uppercase text-outline tracking-widest">
            [ CURATED SYMBIOSIS ]
          </span>
          <h2 className="font-headline-lg text-3xl uppercase text-primary font-light">
            Complementary Layering Duos
          </h2>
          <p className="font-body-sm text-on-surface-variant max-w-xl mx-auto">
            Because Khawaja perfumes are 100% natural, they harmonize without competing. Layer ozonic fresh with sultry resins to invent your private signature.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Duo 1 */}
          <div className="p-8 bg-surface-container-low border border-[#c4c7c7] flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="font-mono-label text-xs uppercase text-secondary font-bold">
                [ DUO 01 · OCEAN &amp; SMOKE ]
              </span>
              <h3 className="font-headline-sm text-xl uppercase text-primary">
                Cyan Nori + Black Anise
              </h3>
              <p className="font-body-sm text-on-surface-variant text-sm">
                A captivating tension of salty ozone marine citrus melting into deep, smoky star anise and raw velvety cacao.
              </p>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-[#c4c7c7]">
              <span className="font-mono-spec font-bold text-primary">
                {formatPrice(14000)} (2 x 6ml)
              </span>
              <button
                onClick={() => {
                  addToCart({
                    id: 'duo-ocean-smoke',
                    productId: 'cyan-nori',
                    name: 'Duo: Cyan Nori + Black Anise',
                    size: '6ml',
                    price: 14000,
                    image: asset('/images/perfume-cyan-nori.jpg'),
                  });
                }}
                className="px-5 py-2.5 bg-primary text-on-primary font-button-text text-xs uppercase tracking-wider hover:bg-[#333333] transition-colors"
              >
                + ADD DUO
              </button>
            </div>
          </div>

          {/* Duo 2 */}
          <div className="p-8 bg-surface-container-low border border-[#c4c7c7] flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="font-mono-label text-xs uppercase text-secondary font-bold">
                [ DUO 02 · WOOD &amp; SOLAR FLORAL ]
              </span>
              <h3 className="font-headline-sm text-xl uppercase text-primary">
                Green Cedar + Golden Neroli
              </h3>
              <p className="font-body-sm text-on-surface-variant text-sm">
                Lush honeyed orange blossoms anchored by ancient New Caledonian and Atlas cedarwood.
              </p>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-[#c4c7c7]">
              <span className="font-mono-spec font-bold text-primary">
                {formatPrice(14000)} (2 x 6ml)
              </span>
              <button
                onClick={() => {
                  addToCart({
                    id: 'duo-wood-solar',
                    productId: 'golden-neroli',
                    name: 'Duo: Green Cedar + Golden Neroli',
                    size: '6ml',
                    price: 14000,
                    image: asset('/images/perfume-golden-neroli.jpg'),
                  });
                }}
                className="px-5 py-2.5 bg-primary text-on-primary font-button-text text-xs uppercase tracking-wider hover:bg-[#333333] transition-colors"
              >
                + ADD DUO
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
