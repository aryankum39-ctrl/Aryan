import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, 
  Shield, 
  Info, 
  ChevronRight, 
  Sparkles, 
  Bookmark, 
  Trash2, 
  RotateCcw, 
  ShoppingBag, 
  Plus, 
  Layers, 
  CheckCircle2,
  BookmarkCheck
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CustomSofaDesign } from '../types';

const CUSTOMIZATION_OPTIONS = {
  upholstery: [
    // Bouclé Collection
    { id: 'boucle-ivory', name: 'Italian Bouclé (Alabaster)', type: 'boucle', color: '#F3EFE6', priceOffset: 4500, quality: 'Cloud Loop Weave', description: 'Plush tactile bouclé with rich looped yarns and cozy warmth.' },
    { id: 'boucle-terracotta', name: 'Tuscan Terracotta Bouclé', type: 'boucle', color: '#B85D43', priceOffset: 4500, quality: 'Architectural Warmth', description: 'Warm earthen terracotta looped bouclé with dimensional depth.' },
    { id: 'boucle-charcoal', name: 'Nordic Charcoal Bouclé', type: 'boucle', color: '#33373B', priceOffset: 4500, quality: 'Modern Heavy Weave', description: 'Textured graphite boucle with subtle flecks of ivory and slate.' },

    // Royal Velvet Collection
    { id: 'velvet-royal', name: 'Royal Velvet (Forest)', type: 'velvet', color: '#4A5D23', priceOffset: 5000, quality: 'Premium Softness', description: 'Ultra-plush, stain-resistant velvet with a subtle sheen.' },
    { id: 'velvet-emerald', name: 'Imperial Emerald Velvet', type: 'velvet', color: '#0B4F3A', priceOffset: 6000, quality: 'Jewel-Tone Luster', description: 'Deep cut velvet with high optical luster and liquid silk drape.' },
    { id: 'velvet-midnight', name: 'Midnight Blue Velvet', type: 'velvet', color: '#191970', priceOffset: 5000, quality: 'Luxurious Depth', description: 'Deep, rich blue velvet that adds a touch of royalty to any room.' },
    { id: 'velvet-ruby', name: 'Ruby Red Velvet', type: 'velvet', color: '#8B0000', priceOffset: 5000, quality: 'Bold Statement', description: 'Vibrant red velvet for a striking, sophisticated look.' },
    { id: 'velvet-rose', name: 'Dusty Rose Silk Velvet', type: 'velvet', color: '#A86B77', priceOffset: 5500, quality: 'Romantic Elegance', description: 'Understated rose hue with subtle silver sheen and feather softness.' },

    // Italian Leather Collection
    { id: 'leather-cognac', name: 'Vintage Cognac Saddle', type: 'leather', color: '#8E4A23', priceOffset: 13500, quality: 'Aged Hand-Rubbed Patina', description: 'Full aniline Italian pull-up leather that matures gracefully.' },
    { id: 'leather-tan', name: 'Top-Grain Leather (Tan)', type: 'leather', color: '#5C4033', priceOffset: 12000, quality: 'Lifetime Durability', description: 'Genuine Italian leather that develops a rich patina over time.' },
    { id: 'leather-caramel', name: 'Honey Caramel Calfskin', type: 'leather', color: '#C28243', priceOffset: 13000, quality: 'Buttery Smooth Grain', description: 'Ultra-supple, velvety smooth calfskin with natural grain markings.' },
    { id: 'leather-black', name: 'Obsidian Black Leather', type: 'leather', color: '#1A1A1A', priceOffset: 12000, quality: 'Sleek & Professional', description: 'Premium black leather for a modern, high-end executive feel.' },
    { id: 'leather-burgundy', name: 'Oxblood Leather', type: 'leather', color: '#480607', priceOffset: 12000, quality: 'Vintage Luxury', description: 'Deep burgundy leather with a classic antique finish.' },

    // Pure Linen Collection
    { id: 'linen-sage', name: 'Pistachio Sage Slub Linen', type: 'linen', color: '#7E917A', priceOffset: 3500, quality: 'Breathable Botanical', description: 'Pre-washed artisan flax linen offering breezy natural texture.' },
    { id: 'linen-tan', name: 'Classic Linen (Tan)', type: 'linen', color: '#D2B48C', priceOffset: 3000, quality: 'Breathable & Durable', description: 'Natural linen weave that stays cool and ages beautifully.' },
    { id: 'linen-charcoal', name: 'Charcoal Grey Linen', type: 'linen', color: '#36454F', priceOffset: 3000, quality: 'Modern Minimalist', description: 'Versatile grey linen that hides stains well and looks sharp.' },
    { id: 'linen-olive', name: 'Olive Green Linen', type: 'linen', color: '#556B2F', priceOffset: 3000, quality: 'Earth Tones', description: 'Organic olive green linen for a grounded, natural feel.' },

    // Woven Cotton & Chenille
    { id: 'cotton-beige', name: 'Organic Cotton (Beige)', type: 'cotton', color: '#F5F5DC', priceOffset: 0, quality: 'Hypoallergenic', description: 'Soft, eco-friendly cotton weave for sensitive skin.' },
    { id: 'cotton-indigo', name: 'Nordic Indigo Chenille', type: 'cotton', color: '#22384D', priceOffset: 2000, quality: 'Tactile Woven Weft', description: 'Rich woven chenille with deep navy depth and snag-resistant yarn.' },
    { id: 'cotton-mustard', name: 'Mustard Yellow Cotton', type: 'cotton', color: '#E1AD01', priceOffset: 1000, quality: 'Warm & Inviting', description: 'Bright, cheerful cotton weave to light up your space.' },
    { id: 'cotton-teal', name: 'Teal Cotton Weave', type: 'cotton', color: '#008080', priceOffset: 1000, quality: 'Vibrant & Fresh', description: 'Modern teal cotton that adds a pop of color to any interior.' },
  ],
  sofaFoam: [
    { id: 'sleepwell-resitec', name: 'Sleepwell Resitec®', priceOffset: 3000, quality: 'High Resilience', description: 'Sleepwell\'s premium HR foam for superior bounce and longevity.' },
    { id: 'sleepwell-nexa', name: 'Sleepwell Nexa®', priceOffset: 4500, quality: 'Smart Recovery', description: 'Advanced responsive foam that adapts to your body movements.' },
    { id: 'sleepwell-impressions', name: 'Sleepwell Impressions', priceOffset: 5000, quality: 'Memory Comfort', description: 'Authentic Sleepwell memory foam for pressure-free relaxation.' },
    { id: 'hd-foam', name: 'Standard HD Foam', priceOffset: 0, quality: 'Firm Support', description: 'Reliable high-density foam for everyday use.' },
  ],
  bedFoam: [
    { id: 'sleepwell-spinetech', name: 'Sleepwell Spinetec®', priceOffset: 3500, quality: 'Orthopedic Support', description: 'Specially engineered for spinal alignment and back health.' },
    { id: 'sleepwell-cocoon', name: 'Sleepwell Cocoon', priceOffset: 4500, quality: 'Luxury Plush', description: 'Multi-layered foam for a hotel-like sleeping experience.' },
    { id: 'sleepwell-dual', name: 'Sleepwell Dual Comfort', priceOffset: 2500, quality: 'Reversible', description: 'Soft on one side, firm on the other. Versatile for all sleepers.' },
  ],
  structure: [
    { id: 'solid-wood', name: 'Solid Teak Wood', priceOffset: 8000, quality: 'Premium Durability', description: 'Hand-crafted solid teak frame for lifetime stability.' },
    { id: 'plywood', name: 'Engineered Plywood', priceOffset: 2500, quality: 'Moisture Resistant', description: 'High-grade marine plywood for a lightweight yet strong structure.' },
    { id: 'metal', name: 'Reinforced Steel', priceOffset: 4000, quality: 'Industrial Strength', description: 'Powder-coated steel frame for a modern, indestructible build.' },
  ],
  legs: [
    { id: 'oak', name: 'Solid Oak', priceOffset: 1500, image: 'https://images.unsplash.com/photo-1581141849291-1125c7b692b5?auto=format&fit=crop&q=80&w=200' },
    { id: 'walnut', name: 'Dark Walnut', priceOffset: 2000, image: 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&q=80&w=200' },
    { id: 'steel', name: 'Polished Steel', priceOffset: 1200, image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=200' },
    { id: 'black', name: 'Matte Black', priceOffset: 800, image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&q=80&w=200' },
    { id: 'gold', name: 'Brushed Gold', priceOffset: 2500, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=200' },
    { id: 'teak', name: 'Tapered Teak', priceOffset: 1800, image: 'https://images.unsplash.com/photo-1581141849291-1125c7b692b5?auto=format&fit=crop&q=80&w=200' },
    { id: 'acrylic', name: 'Acrylic Clear', priceOffset: 3000, image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=200' },
    { id: 'iron', name: 'Cast Iron Claw', priceOffset: 3500, image: 'https://images.unsplash.com/photo-1506898667547-42e22a46e125?auto=format&fit=crop&q=80&w=200' },
  ],
  pillows: [
    { id: 'matching', name: 'Matching Fabric', count: 2, priceOffset: 1000 },
    { id: 'contrast', name: 'Contrast Patterns', count: 4, priceOffset: 2500 },
    { id: 'minimal', name: 'No Pillows', count: 0, priceOffset: 0 },
  ],
  covers: [
    { id: 'quilted', name: 'Quilted Protector', quality: 'Waterproof', priceOffset: 1800, description: 'Extra layer of protection against spills and pets.' },
    { id: 'stretch', name: 'Stretch Fit', quality: 'Easy Wash', priceOffset: 1200, description: 'Removable and machine washable for easy maintenance.' },
    { id: 'none', name: 'No Cover', quality: 'Natural Feel', priceOffset: 0, description: 'Enjoy the raw texture of your selected fabric.' },
  ],
  pillowCovers: [
    { id: 'matching', name: 'Matching Fabric', priceOffset: 0, description: 'Covers made from the same premium fabric as your sofa.' },
    { id: 'contrast', name: 'Contrast Patterns', priceOffset: 1200, description: 'Bold, artistic patterns that create a striking visual contrast.' },
    { id: 'minimalist', name: 'Minimalist Style', priceOffset: 800, description: 'Clean, solid colors with subtle textures for a modern look.' },
  ]
};

const SAVED_DESIGNS_STORAGE_KEY = 'akshara_saved_custom_designs';

const SofaCustomizer: React.FC = () => {
  const { addToCart, setIsCartOpen } = useCart();
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null);

  // Active selections
  const [selections, setSelections] = useState({
    upholstery: CUSTOMIZATION_OPTIONS.upholstery[0],
    sofaFoam: CUSTOMIZATION_OPTIONS.sofaFoam[0],
    bedFoam: CUSTOMIZATION_OPTIONS.bedFoam[0],
    structure: CUSTOMIZATION_OPTIONS.structure[0],
    legs: CUSTOMIZATION_OPTIONS.legs[0],
    pillows: CUSTOMIZATION_OPTIONS.pillows[0],
    covers: CUSTOMIZATION_OPTIONS.covers[0],
    pillowCovers: CUSTOMIZATION_OPTIONS.pillowCovers[0],
  });

  const [activeTab, setActiveTab] = useState<
    'upholstery' | 'sofaFoam' | 'bedFoam' | 'structure' | 'legs' | 'pillows' | 'covers' | 'pillowCovers'
  >('upholstery');

  const [selectedFabricType, setSelectedFabricType] = useState<string>('All');

  // Stored multiple custom sofa variations
  const [savedDesigns, setSavedDesigns] = useState<CustomSofaDesign[]>(() => {
    try {
      const stored = localStorage.getItem(SAVED_DESIGNS_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to load saved designs', e);
    }
    return [
      {
        id: 'initial-sample-design',
        name: 'Bespoke Royal Forest Lounge',
        price: '₹48,500',
        savedAt: 'Curated Preset',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600',
        selections: {
          upholstery: CUSTOMIZATION_OPTIONS.upholstery[0],
          sofaFoam: CUSTOMIZATION_OPTIONS.sofaFoam[0],
          bedFoam: CUSTOMIZATION_OPTIONS.bedFoam[0],
          structure: CUSTOMIZATION_OPTIONS.structure[0],
          legs: CUSTOMIZATION_OPTIONS.legs[0],
          pillows: CUSTOMIZATION_OPTIONS.pillows[0],
          covers: CUSTOMIZATION_OPTIONS.covers[0],
          pillowCovers: CUSTOMIZATION_OPTIONS.pillowCovers[0],
        }
      }
    ];
  });

  // Persist saved designs to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(SAVED_DESIGNS_STORAGE_KEY, JSON.stringify(savedDesigns));
    } catch (e) {
      console.error('Failed to persist saved designs', e);
    }
  }, [savedDesigns]);

  // Calculate dynamic price based on selected materials
  const calculatePrice = (currentSelections = selections): number => {
    const base = 32000;
    const fabricOffset = currentSelections.upholstery.priceOffset || 0;
    const structureOffset = currentSelections.structure.priceOffset || 0;
    const foamOffset = currentSelections.sofaFoam.priceOffset || 0;
    const legsOffset = currentSelections.legs.priceOffset || 0;
    const pillowsOffset = currentSelections.pillows.priceOffset || 0;
    const pillowCoversOffset = currentSelections.pillowCovers.priceOffset || 0;
    const coversOffset = currentSelections.covers.priceOffset || 0;

    return base + fabricOffset + structureOffset + foamOffset + legsOffset + pillowsOffset + pillowCoversOffset + coversOffset;
  };

  const currentPriceFormatted = `₹${calculatePrice().toLocaleString('en-IN')}`;

  /**
   * Modify handleSaveDesign to allow users to save multiple distinct custom designs:
   * 1. Generates a completely unique ID for every saved variation.
   * 2. Appends to the savedDesigns list in state and localStorage.
   * 3. Appends the custom design directly into the user's cart as a separate, distinct item.
   * 4. Shows confirmation feedback with the custom configuration name.
   */
  const handleSaveDesign = (customName?: string) => {
    const designIndex = savedDesigns.length + 1;
    const fabricKeyword = selections.upholstery.name.split(' ')[0];
    const generatedName = customName || `Bespoke ${fabricKeyword} Sofa #${designIndex}`;
    
    // Unique identifier for this distinct customization
    const uniqueId = `custom-sofa-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const formattedPrice = currentPriceFormatted;
    const now = new Date();
    const formattedTime = now.toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const newDesign: CustomSofaDesign = {
      id: uniqueId,
      name: generatedName,
      price: formattedPrice,
      savedAt: formattedTime,
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1200',
      selections: { ...selections }
    };

    // Add to saved designs collection
    setSavedDesigns(prev => [newDesign, ...prev]);

    // Add as a distinct item to cart with complete custom options
    addToCart({
      id: uniqueId,
      name: generatedName,
      category: 'Sofas',
      price: formattedPrice,
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1200',
      description: `Custom configuration: ${selections.upholstery.name}, ${selections.sofaFoam.name}, ${selections.structure.name}, ${selections.legs.name} legs, ${selections.pillowCovers.name} pillow covers.`,
      rating: 5.0,
      customOptions: {
        upholstery: selections.upholstery.name,
        structure: selections.structure.name,
        sofaFoam: selections.sofaFoam.name,
        legs: selections.legs.name,
        pillowCovers: selections.pillowCovers.name,
        covers: selections.covers.name,
        pillows: `${selections.pillows.count} (${selections.pillows.name})`
      }
    });

    // Provide visual feedback
    setSaveSuccessMessage(`"${generatedName}" saved to your collection & added to cart!`);
    setTimeout(() => {
      setSaveSuccessMessage(null);
    }, 4500);
  };

  // Restore a saved design back into active customization controls
  const handleLoadSavedDesign = (design: CustomSofaDesign) => {
    setSelections(design.selections);
    setSaveSuccessMessage(`Loaded "${design.name}" into customizer!`);
    setTimeout(() => setSaveSuccessMessage(null), 3000);
    // Smooth scroll to customizer preview
    const elem = document.getElementById('customize-preview');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Delete a saved design
  const handleDeleteSavedDesign = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedDesigns(prev => prev.filter(d => d.id !== id));
  };

  // Add an existing saved design into the cart again with a fresh unique ID
  const handleAddSavedToCart = (design: CustomSofaDesign, e: React.MouseEvent) => {
    e.stopPropagation();
    const uniqueCartId = `custom-sofa-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    addToCart({
      id: uniqueCartId,
      name: design.name,
      category: 'Sofas',
      price: design.price,
      image: design.image,
      description: `Bespoke design: ${design.selections.upholstery.name}, ${design.selections.structure.name}, ${design.selections.legs.name}.`,
      rating: 5.0,
      customOptions: {
        upholstery: design.selections.upholstery.name,
        structure: design.selections.structure.name,
        sofaFoam: design.selections.sofaFoam.name,
        legs: design.selections.legs.name,
        pillowCovers: design.selections.pillowCovers.name,
        covers: design.selections.covers.name,
      }
    });
    setSaveSuccessMessage(`"${design.name}" added to cart!`);
    setIsCartOpen(true);
    setTimeout(() => setSaveSuccessMessage(null), 3000);
  };

  // Curated inspiration variations
  const inspirationVariations = [
    {
      name: 'The Scandinavian Minimalist',
      upholstery: CUSTOMIZATION_OPTIONS.upholstery[10], // Organic Cotton Beige
      structure: CUSTOMIZATION_OPTIONS.structure[0], // Solid Teak
      legs: CUSTOMIZATION_OPTIONS.legs[3], // Matte Black
      sofaFoam: CUSTOMIZATION_OPTIONS.sofaFoam[0],
      price: '₹41,800',
      tag: 'Nordic Clean'
    },
    {
      name: 'The Royal Sovereign',
      upholstery: CUSTOMIZATION_OPTIONS.upholstery[0], // Royal Forest Velvet
      structure: CUSTOMIZATION_OPTIONS.structure[0], // Solid Teak
      legs: CUSTOMIZATION_OPTIONS.legs[4], // Brushed Gold
      sofaFoam: CUSTOMIZATION_OPTIONS.sofaFoam[1],
      price: '₹52,500',
      tag: 'Opulent Luxury'
    },
    {
      name: 'The Executive Leather',
      upholstery: CUSTOMIZATION_OPTIONS.upholstery[7], // Obsidian Leather
      structure: CUSTOMIZATION_OPTIONS.structure[2], // Reinforced Steel
      legs: CUSTOMIZATION_OPTIONS.legs[2], // Polished Steel
      sofaFoam: CUSTOMIZATION_OPTIONS.sofaFoam[2],
      price: '₹59,200',
      tag: 'Executive Suite'
    }
  ];

  return (
    <section className="py-24 bg-off-white overflow-hidden" id="customize">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16"
          >
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-wood mb-4 block">
              Bespoke Furniture Studio
            </span>
            <h2 className="text-4xl md:text-5xl font-serif mb-6">Create Your Custom Sofa</h2>
            <p className="text-charcoal/60 max-w-2xl mx-auto leading-relaxed">
              Craft multiple distinct sofa variations tailored to your living space. Select upholstery fabrics, Sleepwell® foam, internal framing, and turned leg designs, then save each custom piece directly to your collection and cart.
            </p>
          </motion.div>

          {/* Success Banner */}
          <AnimatePresence>
            {saveSuccessMessage && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-8 p-4 bg-emerald-800 text-white rounded-xl shadow-lg flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-emerald-300" />
                  <span className="text-xs font-bold uppercase tracking-wider">{saveSuccessMessage}</span>
                </div>
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="px-4 py-2 bg-white text-emerald-900 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-emerald-50 transition-colors flex items-center gap-1.5"
                >
                  <ShoppingBag size={14} />
                  Open Cart
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Customizer Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" 
            id="customize-preview"
          >
            {/* Visual Live Preview */}
            <div className="lg:col-span-7 space-y-8">
              <div className="relative aspect-[16/10] bg-white rounded-2xl overflow-hidden shadow-2xl border border-charcoal/5">
                <motion.img
                  key={selections.upholstery.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1200"
                  alt="Sofa Custom Preview"
                  className="w-full h-full object-cover"
                  style={{ filter: `sepia(0.18) saturate(1.2)` }}
                  referrerPolicy="no-referrer"
                />
                
                {/* Dynamic Color Overlay */}
                <div 
                  className="absolute inset-0 mix-blend-multiply opacity-30 transition-colors duration-500"
                  style={{ backgroundColor: selections.upholstery.color }}
                />

                {/* Overlaid Badges */}
                <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                  <span className="bg-charcoal/85 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    {selections.structure.name}
                  </span>
                  <span className="bg-wood/90 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    {selections.legs.name} Legs
                  </span>
                </div>

                <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
                  <div className="bg-white/95 backdrop-blur-md p-5 rounded-xl shadow-lg border border-white/20 max-w-sm">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Shield size={14} className="text-wood" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-charcoal/60">
                        {selections.upholstery.quality}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold mb-1 text-charcoal">{selections.upholstery.name}</h4>
                    <p className="text-xs text-charcoal/60 leading-relaxed">{selections.upholstery.description}</p>
                  </div>

                  <div className="flex flex-col items-end gap-1.5 bg-charcoal/90 backdrop-blur-md text-white px-4 py-3 rounded-xl">
                    <span className="text-[9px] uppercase tracking-widest text-white/60">Calculated Estimate</span>
                    <span className="text-xl font-serif font-bold text-wood">{currentPriceFormatted}</span>
                  </div>
                </div>
              </div>

              {/* Quality Badges */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-xl border border-charcoal/5 text-center">
                  <div className="w-9 h-9 bg-wood/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Shield size={18} className="text-wood" />
                  </div>
                  <h5 className="text-[11px] font-bold uppercase tracking-wider mb-1">Durability</h5>
                  <p className="text-[10px] text-charcoal/60">50,000+ Martindale Rubs</p>
                </div>
                <div className="bg-white p-5 rounded-xl border border-charcoal/5 text-center">
                  <div className="w-9 h-9 bg-wood/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Layers size={18} className="text-wood" />
                  </div>
                  <h5 className="text-[11px] font-bold uppercase tracking-wider mb-1">Cushion Core</h5>
                  <p className="text-[10px] text-charcoal/60">{selections.sofaFoam.name}</p>
                </div>
                <div className="bg-white p-5 rounded-xl border border-charcoal/5 text-center">
                  <div className="w-9 h-9 bg-wood/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Check size={18} className="text-wood" />
                  </div>
                  <h5 className="text-[11px] font-bold uppercase tracking-wider mb-1">Frame Warranty</h5>
                  <p className="text-[10px] text-charcoal/60">5-Year Structural Replacement</p>
                </div>
              </div>
            </div>

            {/* Customization Selector Controls */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 md:p-10 shadow-xl border border-charcoal/5">
              {/* Tab Navigation */}
              <div className="flex border-b border-charcoal/10 mb-8 overflow-x-auto no-scrollbar pb-1">
                {(['upholstery', 'structure', 'sofaFoam', 'legs', 'pillowCovers', 'pillows', 'covers'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 min-w-[90px] pb-3 text-[10px] font-bold uppercase tracking-wider transition-all relative whitespace-nowrap px-2 ${
                      activeTab === tab ? 'text-wood' : 'text-charcoal/40 hover:text-charcoal'
                    }`}
                  >
                    {tab === 'upholstery' ? 'Fabric' 
                      : tab === 'sofaFoam' ? 'Sofa Foam' 
                      : tab === 'structure' ? 'Structure'
                      : tab === 'pillowCovers' ? 'Pillows'
                      : tab === 'legs' ? 'Legs' 
                      : tab}
                    {activeTab === tab && (
                      <motion.div 
                        layoutId="customizerActiveTab" 
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-wood" 
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Option Panels */}
              <div className="min-h-[380px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    {/* Upholstery Fabrics */}
                    {activeTab === 'upholstery' && (
                      <div className="space-y-4">
                        {/* Fabric Category Filter */}
                        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                          {[
                            { id: 'All', label: 'All Fabrics' },
                            { id: 'boucle', label: 'Bouclé' },
                            { id: 'velvet', label: 'Velvet' },
                            { id: 'leather', label: 'Leather' },
                            { id: 'linen', label: 'Linen' },
                            { id: 'cotton', label: 'Chenille/Cotton' },
                          ].map((cat) => (
                            <button
                              key={cat.id}
                              type="button"
                              onClick={() => setSelectedFabricType(cat.id)}
                              className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold transition-all whitespace-nowrap ${
                                selectedFabricType === cat.id
                                  ? 'bg-charcoal text-white shadow-sm'
                                  : 'bg-charcoal/5 text-charcoal/60 hover:bg-charcoal/10'
                              }`}
                            >
                              {cat.label}
                            </button>
                          ))}
                        </div>

                        {/* Swatches Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[380px] overflow-y-auto pr-1">
                          {CUSTOMIZATION_OPTIONS.upholstery
                            .filter(f => selectedFabricType === 'All' || f.type === selectedFabricType)
                            .map((f) => {
                              const isSelected = selections.upholstery.id === f.id;
                              return (
                                <button
                                  key={f.id}
                                  onClick={() => setSelections({ ...selections, upholstery: f })}
                                  className={`p-3 rounded-xl border-2 transition-all text-left group relative flex flex-col justify-between ${
                                    isSelected ? 'border-wood bg-wood/5 ring-1 ring-wood/30' : 'border-charcoal/5 hover:border-charcoal/20 bg-white'
                                  }`}
                                >
                                  <div>
                                    <div 
                                      className="w-full aspect-square rounded-lg mb-2 shadow-inner relative overflow-hidden flex items-center justify-center border border-black/5"
                                      style={{ backgroundColor: f.color }}
                                    >
                                      {/* Tactile Material Texture Overlay */}
                                      {f.type === 'velvet' && (
                                        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-black/25 opacity-70" />
                                      )}
                                      {f.type === 'leather' && (
                                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/25 via-transparent to-black/40 opacity-80" />
                                      )}
                                      {f.type === 'boucle' && (
                                        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:4px_4px]" />
                                      )}
                                      {f.type === 'linen' && (
                                        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,#000_25%,transparent_25%),linear-gradient(-45deg,#000_25%,transparent_25%)] [background-size:6px_6px]" />
                                      )}

                                      {isSelected && (
                                        <div className="w-6 h-6 rounded-full bg-white/95 text-charcoal shadow-md flex items-center justify-center z-10">
                                          <Check size={14} className="stroke-[3]" />
                                        </div>
                                      )}
                                    </div>
                                    <h5 className="text-[10px] font-bold leading-tight mb-0.5 text-charcoal">{f.name}</h5>
                                    <p className="text-[9px] text-charcoal/50 leading-tight">{f.quality}</p>
                                  </div>

                                  {f.priceOffset > 0 ? (
                                    <span className="text-[8px] font-bold text-wood block mt-1.5">
                                      +₹{f.priceOffset.toLocaleString('en-IN')}
                                    </span>
                                  ) : (
                                    <span className="text-[8px] font-medium text-charcoal/40 block mt-1.5">
                                      Standard
                                    </span>
                                  )}
                                </button>
                              );
                            })}
                        </div>
                      </div>
                    )}

                    {/* Structure Frame */}
                    {activeTab === 'structure' && (
                      <div className="space-y-3">
                        {CUSTOMIZATION_OPTIONS.structure.map((s) => (
                          <button
                            key={s.id}
                            onClick={() => setSelections({ ...selections, structure: s })}
                            className={`w-full p-4 rounded-xl border-2 transition-all text-left flex items-center justify-between ${
                              selections.structure.id === s.id ? 'border-wood bg-wood/5' : 'border-charcoal/5 hover:border-charcoal/20'
                            }`}
                          >
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h5 className="text-xs font-bold">{s.name}</h5>
                                <span className="text-[9px] px-2 py-0.5 bg-charcoal/5 rounded font-medium text-charcoal/60">
                                  {s.quality}
                                </span>
                              </div>
                              <p className="text-xs text-charcoal/60">{s.description}</p>
                              {s.priceOffset > 0 && (
                                <span className="text-[10px] font-semibold text-wood block mt-1">
                                  +₹{s.priceOffset.toLocaleString('en-IN')}
                                </span>
                              )}
                            </div>
                            {selections.structure.id === s.id && <Check className="text-wood flex-shrink-0" size={20} />}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Sofa Foam (Sleepwell Range) */}
                    {activeTab === 'sofaFoam' && (
                      <div className="space-y-3">
                        <div className="p-3 bg-wood/5 rounded-lg border border-wood/10 flex items-center gap-2 text-wood text-xs font-bold">
                          <Sparkles size={14} />
                          <span>Genuine Sleepwell® Comfort Cores</span>
                        </div>
                        {CUSTOMIZATION_OPTIONS.sofaFoam.map((fo) => (
                          <button
                            key={fo.id}
                            onClick={() => setSelections({ ...selections, sofaFoam: fo })}
                            className={`w-full p-4 rounded-xl border-2 transition-all text-left flex items-center justify-between ${
                              selections.sofaFoam.id === fo.id ? 'border-wood bg-wood/5' : 'border-charcoal/5 hover:border-charcoal/20'
                            }`}
                          >
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h5 className="text-xs font-bold">{fo.name}</h5>
                                <span className="text-[9px] px-2 py-0.5 bg-wood/10 text-wood rounded font-bold uppercase">
                                  {fo.quality}
                                </span>
                              </div>
                              <p className="text-xs text-charcoal/60">{fo.description}</p>
                            </div>
                            {selections.sofaFoam.id === fo.id && <Check className="text-wood flex-shrink-0" size={20} />}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Sofa Legs */}
                    {activeTab === 'legs' && (
                      <div className="grid grid-cols-2 gap-3">
                        {CUSTOMIZATION_OPTIONS.legs.map((l) => (
                          <button
                            key={l.id}
                            onClick={() => setSelections({ ...selections, legs: l })}
                            className={`p-3 rounded-xl border-2 transition-all text-left ${
                              selections.legs.id === l.id ? 'border-wood bg-wood/5' : 'border-charcoal/5 hover:border-charcoal/20'
                            }`}
                          >
                            <img 
                              src={l.image} 
                              alt={l.name} 
                              className="w-full aspect-square object-cover rounded-lg mb-2" 
                              referrerPolicy="no-referrer" 
                            />
                            <div className="flex justify-between items-center">
                              <h5 className="text-xs font-bold">{l.name}</h5>
                              {l.priceOffset > 0 && (
                                <span className="text-[9px] text-wood font-medium">
                                  +₹{l.priceOffset}
                                </span>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Pillow Covers */}
                    {activeTab === 'pillowCovers' && (
                      <div className="space-y-3">
                        {CUSTOMIZATION_OPTIONS.pillowCovers.map((pc) => (
                          <button
                            key={pc.id}
                            onClick={() => setSelections({ ...selections, pillowCovers: pc })}
                            className={`w-full p-4 rounded-xl border-2 transition-all text-left flex items-center justify-between ${
                              selections.pillowCovers.id === pc.id ? 'border-wood bg-wood/5' : 'border-charcoal/5 hover:border-charcoal/20'
                            }`}
                          >
                            <div>
                              <h5 className="text-xs font-bold mb-1">{pc.name}</h5>
                              <p className="text-xs text-charcoal/60">{pc.description}</p>
                            </div>
                            {selections.pillowCovers.id === pc.id && <Check className="text-wood flex-shrink-0" size={20} />}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Pillows count */}
                    {activeTab === 'pillows' && (
                      <div className="space-y-3">
                        {CUSTOMIZATION_OPTIONS.pillows.map((p) => (
                          <button
                            key={p.id}
                            onClick={() => setSelections({ ...selections, pillows: p })}
                            className={`w-full p-4 rounded-xl border-2 transition-all text-left flex items-center justify-between ${
                              selections.pillows.id === p.id ? 'border-wood bg-wood/5' : 'border-charcoal/5 hover:border-charcoal/20'
                            }`}
                          >
                            <div>
                              <h5 className="text-xs font-bold mb-1">{p.name}</h5>
                              <p className="text-xs text-charcoal/60">{p.count} pillows included</p>
                            </div>
                            {selections.pillows.id === p.id && <Check className="text-wood flex-shrink-0" size={20} />}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Protective Covers */}
                    {activeTab === 'covers' && (
                      <div className="space-y-3">
                        {CUSTOMIZATION_OPTIONS.covers.map((c) => (
                          <button
                            key={c.id}
                            onClick={() => setSelections({ ...selections, covers: c })}
                            className={`w-full p-4 rounded-xl border-2 transition-all text-left flex items-center justify-between ${
                              selections.covers.id === c.id ? 'border-wood bg-wood/5' : 'border-charcoal/5 hover:border-charcoal/20'
                            }`}
                          >
                            <div>
                              <h5 className="text-xs font-bold mb-1">{c.name}</h5>
                              <p className="text-xs text-charcoal/60">{c.description}</p>
                            </div>
                            {selections.covers.id === c.id && <Check className="text-wood flex-shrink-0" size={20} />}
                          </button>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom Actions: Save Multiple Designs */}
              <div className="mt-8 pt-6 border-t border-charcoal/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-charcoal/40 mb-0.5">Estimated Handcrafting</p>
                  <p className="text-xs font-serif text-charcoal font-semibold">14 - 21 Business Days</p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button 
                    onClick={() => handleSaveDesign()}
                    className="flex-1 sm:flex-initial bg-charcoal text-white px-7 py-3.5 text-xs font-bold uppercase tracking-wider hover:bg-wood transition-colors flex items-center justify-center gap-2 rounded-xl shadow-md"
                  >
                    <Bookmark size={15} />
                    Save Design
                    <ChevronRight size={15} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* DEDICATED SECTION: Your Saved Custom Designs */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-20 pt-16 border-t border-charcoal/10" 
            id="saved-designs-list"
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-wood mb-2 block">
                  Your Bespoke Portfolio
                </span>
                <h3 className="text-2xl md:text-3xl font-serif">
                  Saved Custom Designs ({savedDesigns.length})
                </h3>
              </div>
              <p className="text-xs text-charcoal/60 max-w-md">
                All your tailored configurations are preserved here. Switch between them, reload any design to refine it, or add multiple custom pieces directly to your cart.
              </p>
            </div>

            {savedDesigns.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-2xl border border-charcoal/10">
                <Bookmark className="mx-auto mb-3 text-charcoal/20" size={32} />
                <h4 className="text-sm font-bold text-charcoal mb-1">No Saved Designs Yet</h4>
                <p className="text-xs text-charcoal/50 max-w-sm mx-auto mb-4">
                  Configure your sofa above and tap "Save Design" to store distinct variations and explore multiple looks.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedDesigns.map((design, idx) => (
                  <motion.div
                    key={design.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white rounded-2xl overflow-hidden border border-charcoal/10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
                  >
                    {/* Visual Card Header */}
                    <div className="relative aspect-[16/9] bg-cream overflow-hidden">
                      <img 
                        src={design.image} 
                        alt={design.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        style={{ filter: `sepia(0.2) saturate(1.2)` }}
                        referrerPolicy="no-referrer"
                      />
                      <div 
                        className="absolute inset-0 mix-blend-multiply opacity-35"
                        style={{ backgroundColor: design.selections.upholstery.color }}
                      />
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-charcoal/85 backdrop-blur-md text-white rounded-full text-[9px] font-bold uppercase tracking-wider">
                        <span 
                          className="w-2.5 h-2.5 rounded-full inline-block border border-white/50" 
                          style={{ backgroundColor: design.selections.upholstery.color }}
                        />
                        <span>{design.selections.upholstery.name.split(' ')[0]}</span>
                      </div>
                      <div className="absolute top-3 right-3">
                        <button
                          onClick={(e) => handleDeleteSavedDesign(design.id, e)}
                          title="Remove design"
                          className="p-1.5 bg-white/80 hover:bg-white text-charcoal/60 hover:text-red-600 rounded-full transition-colors shadow-sm"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                      <div className="absolute bottom-2 right-3 text-[10px] font-bold text-white bg-charcoal/70 px-2 py-0.5 rounded backdrop-blur-sm">
                        {design.savedAt}
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 flex-grow flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-sm font-bold text-charcoal leading-snug">{design.name}</h4>
                        <span className="text-sm font-serif font-bold text-wood ml-2 flex-shrink-0">{design.price}</span>
                      </div>

                      {/* Attribute Pills */}
                      <div className="space-y-1 mb-4 text-[10px] text-charcoal/70">
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-charcoal/40 uppercase">Fabric:</span>
                          <span className="truncate">{design.selections.upholstery.name}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-charcoal/40 uppercase">Frame:</span>
                          <span className="truncate">{design.selections.structure.name}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-charcoal/40 uppercase">Foam:</span>
                          <span className="truncate">{design.selections.sofaFoam.name}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-charcoal/40 uppercase">Legs:</span>
                          <span className="truncate">{design.selections.legs.name}</span>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="mt-auto pt-3 border-t border-charcoal/10 flex gap-2">
                        <button
                          onClick={() => handleLoadSavedDesign(design)}
                          className="flex-1 py-2 px-3 border border-charcoal/20 hover:border-charcoal text-charcoal text-[10px] font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-1.5"
                        >
                          <RotateCcw size={12} />
                          Load Design
                        </button>
                        <button
                          onClick={(e) => handleAddSavedToCart(design, e)}
                          className="flex-1 py-2 px-3 bg-charcoal hover:bg-wood text-white text-[10px] font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                        >
                          <ShoppingBag size={12} />
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Curated Varieties / Inspiration Section */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-20"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-wood mb-1 block">
                  Studio Suggestions
                </span>
                <h3 className="text-2xl font-serif">Signature Preset Styles</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {inspirationVariations.map((v, i) => (
                <div
                  key={v.name}
                  className="bg-white rounded-2xl overflow-hidden border border-charcoal/5 shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-widest text-wood bg-wood/10 px-2.5 py-0.5 rounded block mb-2 w-max">
                        {v.tag}
                      </span>
                      <h4 className="text-base font-serif font-bold text-charcoal">{v.name}</h4>
                    </div>
                    <span className="text-sm font-bold text-wood">{v.price}</span>
                  </div>

                  <p className="text-xs text-charcoal/60 mb-4 leading-relaxed">
                    Pre-matched with {v.upholstery.name}, {v.structure.name}, and {v.legs.name} legs.
                  </p>

                  <div className="mt-auto flex gap-2">
                    <button
                      onClick={() => {
                        setSelections({
                          ...selections,
                          upholstery: v.upholstery,
                          structure: v.structure,
                          legs: v.legs,
                          sofaFoam: v.sofaFoam
                        });
                        setSaveSuccessMessage(`Applied preset "${v.name}" to customizer!`);
                        setTimeout(() => setSaveSuccessMessage(null), 3000);
                        const elem = document.getElementById('customize-preview');
                        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="flex-1 py-2.5 border border-charcoal/15 text-charcoal hover:bg-charcoal/5 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-colors"
                    >
                      Apply Preset
                    </button>
                    <button
                      onClick={() => {
                        handleSaveDesign(v.name);
                      }}
                      className="flex-1 py-2.5 bg-charcoal text-white hover:bg-wood text-[10px] font-bold uppercase tracking-wider rounded-lg transition-colors shadow-sm"
                    >
                      Save & Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default SofaCustomizer;
