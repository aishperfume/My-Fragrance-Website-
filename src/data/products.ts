import { Product } from '../types/product';

export const ASSET_VERSION = '20261008';

export const asset = (path: string): string => {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('data:')) return path;
  const sep = path.includes('?') ? '&' : '?';
  return `${path}${sep}v=${ASSET_VERSION}`;
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'black-anise',
    number: 'NO. 04',
    name: 'Black Anise',
    tagline: 'Sultry, Smoky Star Anise with Raw Cacao',
    category: 'spicy',
    badge: '[ BEST SELLER ]',
    price50ml: 27500,
    price6ml: 7500,
    discountPercent: 0,
    currency: 'PKR',
    volume: '50ml Flacon',
    description: 'Black Anise Eau de Parfum is a vibrant, smoky amber inspired by late-night luminescence.',
    extendedDescription: 'With a heady opening of star anise, dynamic notes of juicy blackcurrant and rich cacao unfold in the heart. A base of tobacco lends a smoky sweetness reminiscent of late nights spent dancing.',
    accordsSummary: 'STAR ANISE · BLACKCURRANT · CACAO',
    pyramid: {
      top: 'Star Anise (Illicium Verum)',
      heart: 'Cacao seed extract, Blackcurrant bud absolute',
      base: 'Cured Tobacco leaf extract, Amber resins'
    },
    inci: 'Organic Grain Alcohol (Certified Non-GMO), Parfum (100% Natural Fragrance Compounds), Illicium Verum (Star Anise) Fruit Oil, Theobroma Cacao (Cocoa) Seed Extract, Ribes Nigrum (Blackcurrant) Bud Absolute, Nicotiana Tabacum (Tobacco) Leaf Extract, Limonene*, Linalool*, Eugenol*, Benzyl Benzoate*. (*Natural components of essential oils).',
    images: {
      main: asset('/images/perfume-black-anise.jpg'),
      atomizer: asset('/images/atomizer-travel-spray.jpg'),
      ingredients: asset('/images/hero-slide-2.jpg')
    },
    altTexts: {
      main: 'Khawaja Black Anise luxury perfume bottle centered with rich dark amber reflections and black obsidian backdrop in an architectural gallery setting.',
      atomizer: 'Khawaja pocket size travel spray atomiser 6ml slim cylinder beside minimalist botanical recycled carton packaging on pale stone surface.',
      ingredients: 'Editorial macro still-life composition of ripe dark glossy blackcurrants bathed in violet juice and whole star anise pods on wet alabaster surface.'
    },
    inStock: true,
    rating: 4.93,
    reviewsCount: 41
  },
  {
    id: 'cyan-nori',
    number: 'NO. 01',
    name: 'Cyan Nori',
    tagline: 'A Sweet, Salty Musk with Solar Marine Facets',
    category: 'fresh',
    badge: '[ BEST SELLER ]',
    price50ml: 27500,
    price6ml: 7500,
    discountPercent: 0,
    currency: 'PKR',
    volume: '50ml Flacon',
    description: 'A sweet, salty, radiant rush of oceanic nori paired with solar citrus energy.',
    extendedDescription: 'Cyan Nori blends the ozone freshness of deep water algae with sweet tangerine and bio-fermented plant musk, creating a buoyant and addictive skin scent that changes with body temperature.',
    accordsSummary: 'SALTY OCEANIC · TANGERINE · BIO-MUSK',
    pyramid: {
      top: 'Italian Tangerine, White Peach',
      heart: 'Plant-derived Salty Nori Algae isolate',
      base: 'Ambrette seed Bio-Musk, Clean Cedarwood'
    },
    inci: 'Certified Organic Grain Alcohol, Natural Parfum (Plant Extracts & Isolate Blends), Citrus Reticulata (Tangerine) Peel Oil, Porphyra Umbilicalis (Nori) Extract, Hibiscus Abelmoschus (Ambrette) Seed Extract, Limonene*, Citral*, Linalool*. (*From 100% natural essential oils).',
    images: {
      main: asset('/images/perfume-cyan-nori.jpg'),
      lifestyle: asset('/images/hero-slide-3.jpg')
    },
    altTexts: {
      main: 'Khawaja Cyan Nori perfume flacon bottle positioned on warm minimalist sandy limestone plinth with gentle coastal atmospheric backlight and marine mist tones.',
      atomizer: 'Cyan Nori 6ml travel atomizer',
      ingredients: 'Oceanic nori seaweed isolate and sun-ripened Italian tangerine'
    },
    inStock: true,
    rating: 4.96,
    reviewsCount: 58
  },
  {
    id: 'golden-neroli',
    number: 'NO. 02',
    name: 'Golden Neroli',
    tagline: 'A Lush, Honeyed Floral with Matcha Tea',
    category: 'floral',
    badge: '[ BEST SELLER ]',
    price50ml: 27500,
    price6ml: 7500,
    discountPercent: 0,
    currency: 'PKR',
    volume: '50ml Flacon',
    description: 'A lush floral tea accord anchored by creamy, sacred New Caledonian sandalwood.',
    extendedDescription: 'Sun-drenched orange blossom neroli sparkles over a heart of powdered ceremonial matcha tea and night-blooming jasmine, finishing in the serene embrace of sustainably harvested New Caledonian sandalwood.',
    accordsSummary: 'NEROLI · MATCHA TEA · SANDALWOOD',
    pyramid: {
      top: 'Tunisian Neroli flower oil, Petitgrain',
      heart: 'Ceremonial Bio-Matcha Tea, Egyptian Jasmine Grandiflorum',
      base: 'New Caledonian Sandalwood, Raw Vanilla Infusion'
    },
    inci: 'Organic Food-Grade Grain Alcohol, 100% Pure Natural Essential Oils & Isolates, Citrus Aurantium (Neroli) Flower Oil, Camellia Sinensis (Green Tea) Extract, Santalum Austrocaledonicum (Sandalwood) Wood Oil, Farnesol*, Geraniol*, Linalool*.',
    images: {
      main: asset('/images/perfume-golden-neroli.jpg'),
      lifestyle: asset('/images/hero-slide-1.jpg')
    },
    altTexts: {
      main: 'Khawaja Golden Neroli perfume bottle standing on polished natural raw timber surface with warm amber sunset light casting rich golden shadows.',
      atomizer: 'Golden Neroli pocket spray with recycled outer pack',
      ingredients: 'Organic neroli blossom petals, matcha leaves, and raw sandalwood'
    },
    inStock: true,
    rating: 4.89,
    reviewsCount: 34
  },
  {
    id: 'cobalt-amber',
    number: 'NO. 03',
    name: 'Cobalt Amber',
    tagline: 'An Oriental Reimagined: Luminous Pink Pepper & Tonka',
    category: 'amber',
    badge: '[ EDITORIAL PICK ]',
    price50ml: 27500,
    price6ml: 7500,
    discountPercent: 0,
    currency: 'PKR',
    volume: '50ml Flacon',
    description: 'An oriental reimagined: luminous pink pepper blooming into deep, resinous tonka.',
    extendedDescription: 'A captivating balance of radiant top spices with rich subterranean warmth. Luminous pink pepper and juniper cut across opulent Venezuelan tonka bean and labdanum amber resin.',
    accordsSummary: 'PINK PEPPER · TONKA BEAN · AMBER',
    pyramid: {
      top: 'Pink Pepper CO₂ (Madagascar), Juniper Berry',
      heart: 'Cacao Blanc, Ambergris Bio-isolate',
      base: 'Venezuelan Tonka Bean absolute, Rockrose Labdanum'
    },
    inci: 'Regenerative Italian Grain Alcohol, Natural Parfum (100% Non-Petrochemical Aromatics), Schinus Terebinthifolia (Pink Pepper) Extract, Dipteryx Odorata (Tonka Bean) Seed Extract, Cistus Ladaniferus (Labdanum) Resin, Coumarin*, Limonene*.',
    images: {
      main: asset('/images/perfume-cobalt-amber.jpg'),
      lifestyle: asset('/images/hero-slide-2.jpg')
    },
    altTexts: {
      main: 'Khawaja Cobalt Amber perfume bottle shot against dark moody basalt stone with warm glowing caramel resin droplets, high contrast studio lighting.',
      atomizer: 'Cobalt Amber pocket atomizer',
      ingredients: 'Pink peppercorn cluster and raw tonka bean'
    },
    inStock: true,
    rating: 4.91,
    reviewsCount: 29
  },
  {
    id: 'laundry-day',
    number: 'NO. 05',
    name: 'Laundry Day',
    tagline: 'A Verdant, Sun-Filled Citrus with Solar Linen Energy',
    category: 'fresh',
    badge: 'NEW',
    price50ml: 27500,
    price6ml: 7500,
    discountPercent: 0,
    currency: 'PKR',
    volume: '50ml Flacon',
    description: 'A verdant, sun-filled citrus evoking fresh cut grass and crisp solar linen.',
    extendedDescription: 'Captures the pure sensation of opening crisp white linen in bright morning air. Dewy green grass notes fuse with tart passionfruit and airy neroli for unmatched daytime uplift.',
    accordsSummary: 'CUT GRASS · NEROLI · PASSIONFRUIT',
    pyramid: {
      top: 'Fresh Cut Grass, Lemon Verbena',
      heart: 'Neroli, Passionfruit, Aldehydic botanicals',
      base: 'Clean Vetiver, White Bamboo'
    },
    inci: 'Organic Ethanol from Fermented Wheat, 100% Natural Essential Oils & Botanical Isolates, Passiflora Edulis (Passionfruit) Extract, Citrus Aurantium (Neroli) Oil, Vetiveria Zizanoides (Vetiver) Root Oil, Citral*, Geraniol*.',
    images: {
      main: asset('/images/perfume-laundry-day.jpg')
    },
    altTexts: {
      main: 'Minimalist luxury glass perfume bottle labeled LAUNDRY DAY resting upon crumpled ecru and warm beige washed linen bedsheets in soft morning sunlight.'
    },
    inStock: true,
    rating: 4.98,
    reviewsCount: 22
  },
  {
    id: 'green-cedar',
    number: 'NO. 06',
    name: 'Green Cedar',
    tagline: 'A Velvety, Rich Wood Sourced from Wild Atlas Mountains',
    category: 'woody',
    badge: '[ BEST SELLER ]',
    price50ml: 27500,
    price6ml: 7500,
    discountPercent: 0,
    currency: 'PKR',
    volume: '50ml Flacon',
    description: 'A velvety, rich wood combining fresh mountain spices with grounding cedar heartwood.',
    extendedDescription: 'Two unique varieties of cedarwood—wild harvest Atlas cedar and Texas cedar—mingle with exotic cardamom and magnolia blossom, creating a tactile and deeply grounding botanical sillage.',
    accordsSummary: 'CEDARWOOD · CARDAMOM · MAGNOLIA',
    pyramid: {
      top: 'Cardamom, Magnolia Blossom',
      heart: 'Cypriol, Angelica Root',
      base: 'Wild Atlas Cedarwood, Texas Cedarwood'
    },
    inci: 'Organic Grain Alcohol, 100% Natural Fragrance, Cedrus Atlantica (Atlas Cedar) Bark Oil, Juniperus Mexicana (Texas Cedar) Oil, Elettaria Cardamomum Seed Oil, Linalool*, Limonene*.',
    images: {
      main: asset('/images/perfume-green-cedar.jpg')
    },
    altTexts: {
      main: 'Editorial visual of luxury Khawaja Green Cedar perfume flacon centered against an ancient sun-dappled mossy forest tree and vibrant wild meadow grass.'
    },
    inStock: true,
    rating: 4.94,
    reviewsCount: 37
  },
  {
    id: 'pause',
    number: 'NO. 07',
    name: 'Pause',
    tagline: 'A Restorative, Complex Floral for Grounding & Balance',
    category: 'floral',
    badge: '[ AWARD WINNER ]',
    price50ml: 27500,
    price6ml: 7500,
    discountPercent: 0,
    currency: 'PKR',
    volume: '50ml Flacon',
    description: 'A restorative, complex floral crafted to bring harmony and grounding.',
    extendedDescription: 'Formulated to inspire calm and equilibrium through holistic aromatherapy. Violet leaf opens into golden mimosa and French narcissus, cushioned by sun-cured hay and soft cedar.',
    accordsSummary: 'VIOLET LEAF · MIMOSA · NARCISSUS',
    pyramid: {
      top: 'Violet Leaf, Pink Grapefruit',
      heart: 'Mimosa absolute, French Narcissus',
      base: 'Sun-Cured Hay absolute, Clear Cedar'
    },
    inci: 'Organic Neutral Alcohol, Natural Fragrance Blend, Acacia Decurrens (Mimosa) Extract, Viola Odorata (Violet) Leaf Extract, Narcissus Poeticus Extract, Limonene*, Eugenol*.',
    images: {
      main: asset('/images/perfume-pause.jpg')
    },
    altTexts: {
      main: 'Modernist luxury fragrance flacon standing poised against delicate botanical mimosa branches and raw cast concrete stone tablet in soft morning sunlight.'
    },
    inStock: true,
    rating: 4.92,
    reviewsCount: 18
  },
  {
    id: 'discovery-set',
    number: 'SET 01',
    name: 'The Discovery Set',
    tagline: '7 x 2ml Atomizer Sample Vials + PKR 5,000 Digital Credit',
    category: 'fresh',
    badge: '[ ZERO RISK IMMERSION ]',
    price50ml: 6000,
    discountPercent: 0,
    currency: 'PKR',
    volume: 'Set of 7 x 2ml',
    description: 'Explore our complete olfactory library. Includes a PKR 5,000 digital credit toward your first full 50ml flacon.',
    extendedDescription: 'Natural perfume behaves uniquely on each person’s skin chemistry. Our 7-piece discovery sampler lets you test every formula over an 8-hour circadian dry-down in the intimacy of your everyday routine.',
    accordsSummary: 'COMPLETE 7 NATURAL FORMULATION REPERTORY',
    pyramid: {
      top: '7 Miniature Glass Atomizers (2ml each)',
      heart: 'Full Olfactory Spectrum (Fresh, Floral, Woody, Amber)',
      base: 'Includes PKR 5,000 Digital Flacon Credit Code'
    },
    inci: 'Assorted 100% natural botanical formulations. Packaged in FSC recycled uncoated paperboard cartons printed with solventless soy ink.',
    images: {
      main: asset('/images/perfume-discovery-set.jpg')
    },
    altTexts: {
      main: 'Editorial close up of Khawaja Discovery Set with miniature sample vials nestled in crisp paperboard packaging with warm studio lighting and organic botanical accents.'
    },
    inStock: true,
    rating: 4.99,
    reviewsCount: 124
  }
];
