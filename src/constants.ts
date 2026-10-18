import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '2',
    name: 'Cloud Velvet Couch',
    category: 'Sofas',
    price: '₹28,000',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1000',
    description: 'Ultra-soft velvet upholstery with high-density foam for ultimate lounging comfort.',
    rating: 4.7,
    featured: true,
    dimensions: {
      width: '218 cm (86 in)',
      depth: '94 cm (37 in)',
      height: '84 cm (33 in)',
      seatHeight: '46 cm (18 in)',
      weight: '62 kg',
      seatingCapacity: '3 - 4 Adults'
    },
    materialDetails: {
      primaryMaterial: 'Hydro-repellent Royal Velvet (420 GSM)',
      secondaryMaterial: 'Kiln-Dried Solid Marandi Wood & Plywood',
      finish: 'Matte Natural Walnut Tapered Legs',
      rubCount: '50,000+ Martindale cycles',
      warranty: '5 Year Foam & Frame Replacement',
      assembly: 'Legs attachment only (under 5 mins)',
      careInstructions: 'Spot clean with mild fabric cleaner; vacuum regularly with soft brush.'
    },
    closeUpImages: [
      { label: 'Full Sofa', description: 'Front perspective profile in soft forest velvet', url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1000' },
      { label: 'Velvet Weave', description: '420 GSM plush micro-pile velvet swatch texture', url: 'https://images.unsplash.com/photo-1584589167171-541ce45f1eea?auto=format&fit=crop&q=80&w=800' },
      { label: 'Wood Legs', description: 'Solid turned walnut timber support footing', url: 'https://images.unsplash.com/photo-1581141849291-1125c7b692b5?auto=format&fit=crop&q=80&w=800' },
      { label: 'Cushion Seam', description: 'Double-stitched piping and tailored edge seam', url: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=800' }
    ]
  },
  {
    id: 'sofa-2',
    name: 'Emerald L-Shaped Sectional',
    category: 'Sofas',
    price: '₹42,000',
    image: 'https://images.unsplash.com/photo-1550254478-ead40cc54513?auto=format&fit=crop&q=80&w=1000',
    description: 'Spacious emerald green sectional sofa with modular components and plush cushioning.',
    rating: 4.8,
    featured: true,
    dimensions: {
      width: '275 cm (108 in)',
      depth: '165 cm chaise / 95 cm sofa',
      height: '86 cm (34 in)',
      seatHeight: '45 cm (17.7 in)',
      weight: '94 kg',
      seatingCapacity: '5 - 6 Adults'
    },
    materialDetails: {
      primaryMaterial: 'Heavy-weave Emerald Boucle Velvet',
      secondaryMaterial: 'Reinforced Steel Webbing & Solid Sal Wood',
      finish: 'Brushed Brass Metal Leg Accents',
      rubCount: '65,000 Martindale cycles',
      warranty: '7 Year Frame & Suspension Warranty',
      assembly: 'Tool-free modular interlocking latching',
      careInstructions: 'Professional steam or foam clean recommended.'
    },
    closeUpImages: [
      { label: 'Sectional View', description: 'Expansive L-shape layout with deep corner chaise', url: 'https://images.unsplash.com/photo-1550254478-ead40cc54513?auto=format&fit=crop&q=80&w=1000' },
      { label: 'Boucle Texture', description: 'Tactile loop-pile emerald upholstery close-up', url: 'https://images.unsplash.com/photo-1584589167171-541ce45f1eea?auto=format&fit=crop&q=80&w=800' },
      { label: 'Brass Accent', description: 'Recessed brushed champagne brass metal foundation', url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800' }
    ]
  },
  {
    id: 'sofa-3',
    name: 'Tuscan Leather 3-Seater',
    category: 'Sofas',
    price: '₹38,000',
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=1000',
    description: 'Premium Italian top-grain leather sofa with a vintage tan finish and solid oak legs.',
    rating: 4.6,
    dimensions: {
      width: '210 cm (82.6 in)',
      depth: '92 cm (36.2 in)',
      height: '82 cm (32.3 in)',
      seatHeight: '44 cm (17.3 in)',
      weight: '68 kg',
      seatingCapacity: '3 Adults'
    },
    materialDetails: {
      primaryMaterial: '100% Genuine Italian Semi-Aniline Leather',
      secondaryMaterial: 'FSC-Certified Solid European Oak Frame',
      finish: 'Waxed Patina Leather & Natural Oak',
      rubCount: 'Naturally breathable, ages into vintage patina',
      warranty: '10 Year Leather & Frame Warranty',
      assembly: 'Minimal assembly required',
      careInstructions: 'Clean with leather conditioner once every 6 months.'
    },
    closeUpImages: [
      { label: 'Leather Sofa', description: 'Caramel cognac leather three-seater profile', url: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=1000' },
      { label: 'Leather Grain', description: 'Authentic pebble grain and natural hide markings', url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=800' },
      { label: 'Solid Oak Leg', description: 'Chamfered solid natural white oak joinery', url: 'https://images.unsplash.com/photo-1581141849291-1125c7b692b5?auto=format&fit=crop&q=80&w=800' }
    ]
  },
  {
    id: 'sofa-4',
    name: 'Minimalist Grey Loveseat',
    category: 'Sofas',
    price: '₹18,000',
    image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&q=80&w=1000',
    description: 'Compact and stylish loveseat perfect for modern apartments and cozy corners.',
    rating: 4.5,
    dimensions: {
      width: '155 cm (61 in)',
      depth: '85 cm (33.5 in)',
      height: '80 cm (31.5 in)',
      seatHeight: '43 cm (17 in)',
      weight: '38 kg',
      seatingCapacity: '2 Adults'
    },
    materialDetails: {
      primaryMaterial: 'Textured Heather Grey Cotton-Linen Blend',
      secondaryMaterial: 'Engineered Hardwood Frame with Corner Blocks',
      finish: 'Matte Powder-Coated Charcoal Steel Legs',
      warranty: '3 Year Quality Guarantee',
      assembly: 'Screw-in legs (2 mins)'
    }
  },
  {
    id: 'sofa-5',
    name: 'Chesterfield Classic Sofa',
    category: 'Sofas',
    price: '₹45,000',
    image: 'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?auto=format&fit=crop&q=80&w=1000',
    description: 'Deep button-tufted upholstery with rolled arms and solid wood structure for a timeless look.',
    rating: 4.9,
    dimensions: {
      width: '235 cm (92.5 in)',
      depth: '98 cm (38.5 in)',
      height: '76 cm (30 in)',
      seatHeight: '47 cm (18.5 in)',
      weight: '74 kg',
      seatingCapacity: '3 - 4 Adults'
    },
    materialDetails: {
      primaryMaterial: 'Heritage Vintage Leather / Chesterfield Tufting',
      secondaryMaterial: 'Solid Kiln-Dried Hardwood Frame',
      finish: 'Hand-turned Bun Feet with Castor Wheels',
      warranty: '8 Year Frame Warranty',
      assembly: 'Pre-assembled, unbox and place'
    }
  },
  {
    id: 'sofa-6',
    name: 'Modern Tuxedo Sofa',
    category: 'Sofas',
    price: '₹36,500',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1000',
    description: 'Clean lines and square structure, this tuxedo sofa offers a sophisticated modern silhouette.',
    rating: 4.7,
  },
  {
    id: 'sofa-7',
    name: 'Mid-Century Navy Sofa',
    category: 'Sofas',
    price: '₹32,000',
    image: 'https://images.unsplash.com/photo-1512212621149-107ffe572d2f?auto=format&fit=crop&q=80&w=1000',
    description: 'Classic mid-century design with tapered teak legs and durable navy blue upholstery.',
    rating: 4.8,
  },
  {
    id: 'sofa-8',
    name: 'Scandinavian Daybed',
    category: 'Sofas',
    price: '₹24,500',
    image: 'https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?auto=format&fit=crop&q=80&w=1000',
    description: 'Versatile daybed with a light ash wood frame and minimalist grey linen cushions.',
    rating: 4.6,
  },
  {
    id: 'sofa-9',
    name: 'Industrial Distressed Leather',
    category: 'Sofas',
    price: '₹48,000',
    image: 'https://images.unsplash.com/photo-1506898667547-42e22a46e125?auto=format&fit=crop&q=80&w=1000',
    description: 'Rugged industrial style featuring distressed brown leather and a matte black steel frame.',
    rating: 4.9,
  },
  {
    id: 'sofa-10',
    name: 'Bohemian Rattan Sofa',
    category: 'Sofas',
    price: '₹21,000',
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=1000',
    description: 'Hand-woven natural rattan sofa with plush cream-colored weather-resistant cushions.',
    rating: 4.5,
  },
  {
    id: 'sofa-11',
    name: 'Velvet Curved Statement',
    category: 'Sofas',
    price: '₹52,000',
    image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&q=80&w=1000',
    description: 'A bold curved silhouette in blush pink velvet with a recessed gold-finished base.',
    rating: 4.9,
    featured: true
  },
  {
    id: 'sofa-12',
    name: 'Modular Linen Cloud',
    category: 'Sofas',
    price: '₹65,000',
    image: 'https://images.unsplash.com/photo-1519947486511-46149fa0a254?auto=format&fit=crop&q=80&w=1000',
    description: 'The ultimate lounging experience with extra-deep modular pieces in pure white linen.',
    rating: 5.0,
    featured: true
  },
  {
    id: '3',
    name: 'Zenith King Size Bed',
    category: 'Bedroom',
    price: '₹32,000',
    image: 'https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?auto=format&fit=crop&q=80&w=1000',
    description: 'Low-profile platform bed crafted from solid walnut with a breathable slatted base.',
    rating: 4.8,
    featured: true,
    dimensions: {
      width: '198 cm (78 in)',
      depth: '215 cm (84.6 in)',
      height: '105 cm (41.3 in)',
      weight: '76 kg',
      seatingCapacity: 'King Size (72 x 78 in Mattress)'
    },
    materialDetails: {
      primaryMaterial: 'Solid American Walnut & Seasoned Oak Slats',
      secondaryMaterial: 'Precision Reinforced Steel Joint Brackets',
      finish: 'Satin Natural Walnut Low-Sheen Polish',
      warranty: '10 Year Structural Warranty',
      assembly: 'Quick 15-minute tool-free interlocking assembly'
    },
    closeUpImages: [
      { label: 'Platform Bed Full View', description: 'Low-profile solid wooden platform bed with crisp linen bedding', url: 'https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?auto=format&fit=crop&q=80&w=1000' },
      { label: 'Solid Walnut Grain', description: 'Hand-planed solid natural walnut grain with beveled edges', url: 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&q=80&w=800' },
      { label: 'Bedside & Headboard', description: 'Master suite bedside angle with natural headboard and reading lamp', url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800' }
    ]
  },
  {
    id: 'bed-2',
    name: 'Velvet Tufted Queen Bed',
    category: 'Bedroom',
    price: '₹29,500',
    image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=1000',
    description: 'Luxurious velvet tufted headboard with a sturdy metal frame and reinforced structure.',
    rating: 4.6,
  },
  {
    id: 'bed-3',
    name: 'Nordic Pine Single Bed',
    category: 'Bedroom',
    price: '₹15,000',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=1000',
    description: 'Simple, clean, and durable pine wood bed frame for a minimalist bedroom setup.',
    rating: 4.4,
  },
  {
    id: '4',
    name: 'Heritage 4-Door Wardrobe',
    category: 'Bedroom',
    price: '₹28,000',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=1000',
    description: 'Spacious wardrobe with soft-close doors, integrated LED lighting, and premium veneer finish.',
    rating: 4.7,
    featured: true
  },
  {
    id: '5',
    name: 'Nordic Accent Chair',
    category: 'Living Room',
    price: '₹8,500',
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=1000',
    description: 'Ergonomic design meets minimalist aesthetics in this versatile seating piece.',
    rating: 4.5,
  },
  {
    id: '6',
    name: 'Ethereal Oak Dining Table',
    category: 'Dining',
    price: '₹35,000',
    image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=1000',
    description: 'A 6-seater masterpiece of minimalist design, crafted from sustainably sourced white oak.',
    rating: 4.8,
  },
  {
    id: '7',
    name: 'Minimalist Study Table',
    category: 'Office',
    price: '₹9,500',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=1000',
    description: 'Clean lines and functional cable management for a focused workspace.',
    rating: 4.6,
  },
  {
    id: '8',
    name: 'Symmetry Dressing Table',
    category: 'Bedroom',
    price: '₹14,500',
    image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=1000',
    description: 'Elegant vanity with a large circular mirror and hidden storage compartments.',
    rating: 4.7,
  },
  {
    id: '9',
    name: 'Carrara Marble Coffee Table',
    category: 'Living Room',
    price: '₹12,000',
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=1000',
    description: 'A stunning coffee table featuring a solid Carrara marble top and a minimalist black steel frame.',
    rating: 4.8,
  },
  {
    id: '10',
    name: 'Solomon Live-Edge Teak Dining Set',
    category: 'Dining',
    price: '₹54,000',
    image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&q=80&w=1000',
    description: 'Hand-selected single-slab solid teak dining table with organic live edge, accompanied by matching artisan bench and hand-turned joinery.',
    rating: 4.9,
    featured: true,
    dimensions: {
      width: '240 cm (94.5 in)',
      depth: '100 cm (39.4 in)',
      height: '76 cm (30 in)',
      weight: '110 kg',
      seatingCapacity: '8 Adults'
    },
    materialDetails: {
      primaryMaterial: '100% Grade-A Burma Teak (Single Slab 55mm)',
      secondaryMaterial: 'Matte Black Powder-Coated Cast Iron Spider Base',
      finish: 'Food-safe Organic Hardwax Oil Finish',
      warranty: '15 Year Timber Integrity Warranty',
      assembly: 'White-glove 2-person placement included',
      careInstructions: 'Clean with natural wood soap; avoid abrasive chemicals.'
    },
    closeUpImages: [
      { label: 'Full Set', description: '8-seater live edge setup with matching artisan bench', url: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&q=80&w=1000' },
      { label: 'Organic Edge', description: 'Natural bark line and golden honey teak rings', url: 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&q=80&w=800' },
      { label: 'Iron Base', description: 'Heavy-gauge precision-welded architectural base', url: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=800' }
    ]
  },
  {
    id: '11',
    name: 'Copenhagen Bouclé Swivel Armchair',
    category: 'Living Room',
    price: '₹16,500',
    image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=1000',
    description: 'Sculptural curved statement chair enveloped in high-density alabaster bouclé with an ultra-smooth 360-degree silent concealed swivel base.',
    rating: 4.9,
    featured: true,
    dimensions: {
      width: '88 cm (34.6 in)',
      depth: '85 cm (33.5 in)',
      height: '78 cm (30.7 in)',
      seatHeight: '44 cm (17.3 in)',
      weight: '24 kg',
      seatingCapacity: '1 Adult'
    },
    materialDetails: {
      primaryMaterial: 'Heavy Textured Alabaster Bouclé (500 GSM)',
      secondaryMaterial: 'Precision Bearing Ball Mechanism & Molded Foam Core',
      finish: 'Concealed Brushed Brass Base Trim',
      rubCount: '60,000 Martindale cycles',
      warranty: '5 Year Swivel Mechanism & Upholstery Guarantee',
      assembly: 'Fully assembled'
    },
    closeUpImages: [
      { label: 'Swivel Silhouette', description: 'Organic cocooning curve with 360-degree rotation', url: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=1000' },
      { label: 'Boucle Swatch', description: 'Plush tactile cloud loops with soft natural texture', url: 'https://images.unsplash.com/photo-1584589167171-541ce45f1eea?auto=format&fit=crop&q=80&w=800' }
    ]
  },
  {
    id: '12',
    name: 'Kyoto Fluted Oak Credenza',
    category: 'Living Room',
    price: '₹34,000',
    image: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&q=80&w=1000',
    description: 'Architectural sideboard featuring vertically fluted white oak tambour doors, soft-close brass hardware, and acoustic interior compartments.',
    rating: 4.8,
    dimensions: {
      width: '180 cm (70.8 in)',
      depth: '45 cm (17.7 in)',
      height: '78 cm (30.7 in)',
      weight: '58 kg'
    },
    materialDetails: {
      primaryMaterial: 'FSC-Certified Solid European White Oak & Natural Veneer',
      secondaryMaterial: 'Brushed Champagne Brass Pulls and Leg Ferrules',
      finish: 'Matte Water-Based Natural Oak Lacquer',
      warranty: '7 Year Structural Warranty',
      assembly: 'Pre-assembled, legs easily attach'
    }
  },
  {
    id: '13',
    name: 'Atelier Walnut Executive Desk',
    category: 'Office',
    price: '₹26,500',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1000',
    description: 'Executive workspace with solid American walnut top, dual soft-close dovetailed drawers, hidden magnetic cable route, and leather desk pad inlay.',
    rating: 4.8,
    dimensions: {
      width: '160 cm (63 in)',
      depth: '75 cm (29.5 in)',
      height: '76 cm (30 in)',
      weight: '48 kg'
    },
    materialDetails: {
      primaryMaterial: 'Solid American Walnut with French Polish',
      secondaryMaterial: 'Full-Grain Chestnut Leather Inlay',
      finish: 'Hand-rubbed Satin Wax Finish',
      warranty: '10 Year Joinery Warranty',
      assembly: 'Simple 10-minute leg attachment with tool provided'
    }
  },
  {
    id: '14',
    name: 'Santorini Teak Lounger & Daybed',
    category: 'Outdoor',
    price: '₹42,000',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1000',
    description: 'Luxury resort daybed made with seasoned marine teak wood, multi-position reclining backrest, and water-repellent quick-dry foam.',
    rating: 4.9,
    dimensions: {
      width: '200 cm (78.7 in)',
      depth: '80 cm (31.5 in)',
      height: '38 cm flat / 95 cm reclined',
      weight: '36 kg'
    },
    materialDetails: {
      primaryMaterial: 'Marine-Grade Indonesian Plantation Teak',
      secondaryMaterial: 'Marine Stainless Steel (316 Grade) Fasteners',
      finish: 'Teak Weather-Shield Natural Protective Sealant',
      warranty: '8 Year Outdoor Weatherproof Guarantee',
      assembly: 'Minimal assembly required'
    }
  },
  {
    id: '15',
    name: 'Opulence Wingback Velvet Bed',
    category: 'Bedroom',
    price: '₹39,000',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=1000',
    description: 'Grand architectural wingback headboard with acoustic quilted velvet panels, integrated warm dimmable night-LED channels, and solid frame.',
    rating: 4.9,
    featured: true,
    dimensions: {
      width: '195 cm (76.7 in)',
      depth: '220 cm (86.6 in)',
      height: '135 cm (53 in)',
      weight: '82 kg',
      seatingCapacity: 'King Size (72 x 78 in Mattress)'
    },
    materialDetails: {
      primaryMaterial: 'Acoustic Sound-Softening Royal Velvet (Navy / Forest)',
      secondaryMaterial: 'Reinforced Solid Sal Wood & Hydraulic Lift Mechanism',
      finish: 'Matte Brushed Gold Leg Caps',
      warranty: '10 Year Structural & Gas Lift Guarantee',
      assembly: 'Professional 2-person assembly included'
    }
  }
];

export const CATEGORIES: string[] = ['All', 'Sofas', 'Living Room', 'Bedroom', 'Dining', 'Outdoor', 'Office'];
