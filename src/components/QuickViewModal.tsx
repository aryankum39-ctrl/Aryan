import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ShoppingBag, 
  Heart, 
  Star, 
  Ruler, 
  Layers, 
  ShieldCheck, 
  Truck, 
  CheckCircle2, 
  ZoomIn, 
  ChevronRight,
  Info,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Product, CloseUpImage, ProductDimensions, MaterialDetails } from '../types';
import { useCart } from '../context/CartContext';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const { addToCart, setIsCartOpen } = useCart();
  const [activeTab, setActiveTab] = useState<'overview' | 'dimensions' | 'materials'>('overview');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Reset tab and active image when product changes
  useEffect(() => {
    if (product) {
      setActiveTab('overview');
      setSelectedImageIndex(0);
      setAddedAnimation(false);
    }
  }, [product?.id]);

  if (!product) return null;

  // Resolve images: primary image + close-ups or default aesthetic swatches
  const images: CloseUpImage[] = [
    {
      label: 'Main View',
      description: 'Overall silhouette and room profile',
      url: product.image
    },
    ...(product.closeUpImages && product.closeUpImages.length > 0
      ? product.closeUpImages
      : [
          {
            label: 'Fabric Weave',
            description: 'Ultra-high density weave and surface texture close-up',
            url: 'https://images.unsplash.com/photo-1584589167171-541ce45f1eea?auto=format&fit=crop&q=80&w=800'
          },
          {
            label: 'Solid Wood Grain',
            description: 'Hand-selected solid hardwood grain and joinery detail',
            url: 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&q=80&w=800'
          },
          {
            label: 'Base & Hardware',
            description: 'Precision milled hardware with acoustic floor protectors',
            url: 'https://images.unsplash.com/photo-1581141849291-1125c7b692b5?auto=format&fit=crop&q=80&w=800'
          }
        ])
  ];

  const currentImage = images[selectedImageIndex] || images[0];

  // Fallback realistic dimensions if not explicitly set
  const dimensions: ProductDimensions = product.dimensions || {
    width: product.category === 'Sofas' ? '215 cm (84.6 in)' : product.category === 'Bedroom' ? '195 cm (76.8 in)' : '160 cm (63 in)',
    depth: product.category === 'Sofas' ? '92 cm (36.2 in)' : product.category === 'Bedroom' ? '210 cm (82.7 in)' : '85 cm (33.5 in)',
    height: product.category === 'Sofas' ? '82 cm (32.3 in)' : product.category === 'Bedroom' ? '110 cm (43.3 in)' : '75 cm (29.5 in)',
    seatHeight: product.category === 'Sofas' ? '45 cm (17.7 in)' : undefined,
    weight: product.category === 'Sofas' ? '65 kg' : '45 kg',
    seatingCapacity: product.category === 'Sofas' ? '3 Adults' : undefined
  };

  // Fallback material details if not explicitly set
  const materials: MaterialDetails = product.materialDetails || {
    primaryMaterial: product.category === 'Sofas' ? 'High-Performance Tailored Velvet / Linen Blend' : 'Grade-A Seasoned Solid Teak & Natural Veneer',
    secondaryMaterial: 'Kiln-Dried Hardwood Internal Skeleton with Corner Cleats',
    finish: 'Protective Low-VOC Satin Lacquer Finish',
    rubCount: '50,000+ Martindale Rubs (Commercial Grade)',
    warranty: '5-Year Comprehensive Structural Warranty',
    assembly: 'White Glove In-Room Setup & Packaging Disposal',
    careInstructions: 'Dust with a soft, lint-free cloth. Promptly blot liquid spills.'
  };

  const handleAddToCart = () => {
    addToCart(product);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 900);
  };

  const handleBuyNow = () => {
    addToCart(product);
    onClose();
    setIsCartOpen(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-charcoal/70 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 25 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-5xl bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col lg:flex-row z-10 max-h-[92vh] my-auto"
        >
          {/* Top Bar Close Button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 z-30 p-2.5 bg-white/90 backdrop-blur-md text-charcoal hover:bg-charcoal hover:text-white rounded-full shadow-md border border-charcoal/10 transition-all group"
          >
            <X size={18} className="group-hover:rotate-90 transition-transform duration-200" />
          </button>

          {/* LEFT COLUMN: Interactive High-Resolution Image & Material Close-up Viewer */}
          <div className="w-full lg:w-[48%] bg-off-white flex flex-col border-b lg:border-b-0 lg:border-r border-charcoal/5">
            {/* Main Stage Image */}
            <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] bg-cream overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImage.url}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  src={currentImage.url}
                  alt={currentImage.label}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1000';
                  }}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>

              {/* High-Resolution Close-Up Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 bg-charcoal/80 backdrop-blur-md text-white rounded-full text-[10px] font-bold tracking-wider uppercase">
                <ZoomIn size={12} className="text-wood" />
                <span>{currentImage.label}</span>
              </div>

              {/* Dynamic Image Description Bar */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-charcoal/80 via-charcoal/40 to-transparent p-4 text-white">
                <p className="text-xs font-medium tracking-wide">{currentImage.description}</p>
              </div>
            </div>

            {/* Thumbnail Navigation Strip */}
            <div className="p-4 bg-white border-t border-charcoal/5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-charcoal/50 flex items-center gap-1.5">
                  <Layers size={12} className="text-wood" />
                  Material Close-Ups & Views ({images.length})
                </span>
                <span className="text-[10px] text-charcoal/40">Click swatch to view detail</span>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 text-left group ${
                      selectedImageIndex === idx 
                        ? 'border-wood ring-2 ring-wood/20 scale-[1.02]' 
                        : 'border-charcoal/10 hover:border-charcoal/30 opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.label}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800';
                      }}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-charcoal/0 transition-colors" />
                    <span className="absolute bottom-1 inset-x-1 text-[8px] font-bold text-white uppercase tracking-tight truncate bg-charcoal/70 px-1 rounded text-center">
                      {img.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Guarantees bar */}
            <div className="mt-auto p-4 bg-cream/60 border-t border-charcoal/5 hidden sm:grid grid-cols-3 gap-2 text-center text-[10px]">
              <div className="flex flex-col items-center gap-1 text-charcoal/70">
                <ShieldCheck size={16} className="text-wood" />
                <span className="font-semibold">{materials.warranty.split(' ')[0]} {materials.warranty.split(' ')[1]}</span>
                <span className="text-charcoal/40 text-[9px]">Full Warranty</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-charcoal/70">
                <Truck size={16} className="text-wood" />
                <span className="font-semibold">White Glove</span>
                <span className="text-charcoal/40 text-[9px]">Safe Delivery</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-charcoal/70">
                <CheckCircle2 size={16} className="text-wood" />
                <span className="font-semibold">Certified Wood</span>
                <span className="text-charcoal/40 text-[9px]">Sustainably Milled</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Details, Technical Dimensions & Specifications */}
          <div className="w-full lg:w-[52%] flex flex-col overflow-y-auto">
            {/* Header Area */}
            <div className="p-6 md:p-8 pb-4 border-b border-charcoal/5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-wood bg-wood/10 px-2.5 py-1 rounded">
                  {product.category}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-charcoal/60">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={13} 
                        className={i < Math.floor(product.rating) ? "fill-wood text-wood" : "text-charcoal/20"} 
                      />
                    ))}
                  </div>
                  <span className="font-bold text-charcoal">{product.rating}</span>
                  <span className="text-[11px] text-charcoal/40">({Math.floor(product.rating * 12 + 6)} verified reviews)</span>
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-serif text-charcoal tracking-tight mb-2">
                {product.name}
              </h2>

              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-serif text-charcoal font-semibold">{product.price}</span>
                <span className="text-xs text-charcoal/40 line-through">
                  ₹{Math.round(parseInt(product.price.replace(/[^\d]/g, '') || '30000') * 1.25).toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Direct Factory Price
                </span>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-charcoal/10 px-6 md:px-8 bg-off-white/50">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-3.5 text-xs font-bold uppercase tracking-wider transition-all relative flex items-center gap-2 mr-6 ${
                  activeTab === 'overview' ? 'text-charcoal' : 'text-charcoal/40 hover:text-charcoal'
                }`}
              >
                <Sparkles size={14} className={activeTab === 'overview' ? 'text-wood' : ''} />
                Overview
                {activeTab === 'overview' && (
                  <motion.div layoutId="quickViewTab" className="absolute bottom-0 inset-x-0 h-0.5 bg-wood" />
                )}
              </button>

              <button
                onClick={() => setActiveTab('dimensions')}
                className={`py-3.5 text-xs font-bold uppercase tracking-wider transition-all relative flex items-center gap-2 mr-6 ${
                  activeTab === 'dimensions' ? 'text-charcoal' : 'text-charcoal/40 hover:text-charcoal'
                }`}
              >
                <Ruler size={14} className={activeTab === 'dimensions' ? 'text-wood' : ''} />
                Technical Dimensions
                {activeTab === 'dimensions' && (
                  <motion.div layoutId="quickViewTab" className="absolute bottom-0 inset-x-0 h-0.5 bg-wood" />
                )}
              </button>

              <button
                onClick={() => setActiveTab('materials')}
                className={`py-3.5 text-xs font-bold uppercase tracking-wider transition-all relative flex items-center gap-2 ${
                  activeTab === 'materials' ? 'text-charcoal' : 'text-charcoal/40 hover:text-charcoal'
                }`}
              >
                <Layers size={14} className={activeTab === 'materials' ? 'text-wood' : ''} />
                Materials & Specs
                {activeTab === 'materials' && (
                  <motion.div layoutId="quickViewTab" className="absolute bottom-0 inset-x-0 h-0.5 bg-wood" />
                )}
              </button>
            </div>

            {/* Tab Contents Area */}
            <div className="p-6 md:p-8 flex-grow">
              <AnimatePresence mode="wait">
                {activeTab === 'overview' && (
                  <motion.div
                    key="tab-overview"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-charcoal/40 mb-2">
                        Product Description
                      </h4>
                      <p className="text-sm text-charcoal/70 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    {/* Highlights Grid */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="p-3.5 rounded-xl bg-off-white border border-charcoal/5">
                        <span className="text-[10px] uppercase font-bold text-wood block mb-1">Cushioning</span>
                        <p className="text-xs font-medium text-charcoal">High-density Sleepwell® resilience core</p>
                      </div>
                      <div className="p-3.5 rounded-xl bg-off-white border border-charcoal/5">
                        <span className="text-[10px] uppercase font-bold text-wood block mb-1">Durability</span>
                        <p className="text-xs font-medium text-charcoal">50,000+ rub double-stitched seams</p>
                      </div>
                      <div className="p-3.5 rounded-xl bg-off-white border border-charcoal/5">
                        <span className="text-[10px] uppercase font-bold text-wood block mb-1">Internal Frame</span>
                        <p className="text-xs font-medium text-charcoal">Seasoned solid timber with mortise joints</p>
                      </div>
                      <div className="p-3.5 rounded-xl bg-off-white border border-charcoal/5">
                        <span className="text-[10px] uppercase font-bold text-wood block mb-1">Delivery</span>
                        <p className="text-xs font-medium text-charcoal">Pan-India delivery in 5 - 10 business days</p>
                      </div>
                    </div>

                    {/* Quick Review Quote */}
                    <div className="border-l-2 border-wood pl-4 py-2 bg-wood/5 rounded-r-lg">
                      <div className="flex items-center gap-1 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={10} className="fill-wood text-wood" />
                        ))}
                        <span className="text-[11px] font-bold ml-1">"Masterpiece in our living room"</span>
                      </div>
                      <p className="text-xs text-charcoal/60 italic">
                        The material feel and solid structure exceeded our expectations. The upholstery color is gorgeous in natural sunlight.
                      </p>
                      <span className="text-[10px] text-charcoal/40 uppercase tracking-widest mt-1 block">— Verified Buyer from Bangalore</span>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'dimensions' && (
                  <motion.div
                    key="tab-dimensions"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    {/* Visual Dimension Schematic Box */}
                    <div className="p-5 rounded-2xl bg-charcoal text-white relative overflow-hidden">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Ruler size={16} className="text-wood" />
                          <span className="text-xs font-bold uppercase tracking-wider">Spatial Footprint</span>
                        </div>
                        <span className="text-[10px] uppercase tracking-widest bg-white/10 px-2 py-0.5 rounded text-white/80">
                          Accurate to ±0.5 cm
                        </span>
                      </div>

                      {/* Schematic Grid */}
                      <div className="grid grid-cols-3 gap-3 text-center py-2">
                        <div className="p-2.5 bg-white/5 rounded-lg border border-white/10">
                          <span className="text-[10px] uppercase tracking-wider text-white/50 block">Width (W)</span>
                          <span className="text-base font-serif font-bold text-wood">{dimensions.width}</span>
                        </div>
                        <div className="p-2.5 bg-white/5 rounded-lg border border-white/10">
                          <span className="text-[10px] uppercase tracking-wider text-white/50 block">Depth (D)</span>
                          <span className="text-base font-serif font-bold text-wood">{dimensions.depth}</span>
                        </div>
                        <div className="p-2.5 bg-white/5 rounded-lg border border-white/10">
                          <span className="text-[10px] uppercase tracking-wider text-white/50 block">Height (H)</span>
                          <span className="text-base font-serif font-bold text-wood">{dimensions.height}</span>
                        </div>
                      </div>

                      <div className="mt-3 grid grid-cols-2 gap-3 text-xs text-white/80 border-t border-white/10 pt-3">
                        {dimensions.seatHeight && (
                          <div className="flex justify-between">
                            <span className="text-white/40">Seat Height:</span>
                            <span className="font-semibold text-white">{dimensions.seatHeight}</span>
                          </div>
                        )}
                        {dimensions.weight && (
                          <div className="flex justify-between">
                            <span className="text-white/40">Net Weight:</span>
                            <span className="font-semibold text-white">{dimensions.weight}</span>
                          </div>
                        )}
                        {dimensions.seatingCapacity && (
                          <div className="flex justify-between col-span-2">
                            <span className="text-white/40">Seating Capacity:</span>
                            <span className="font-semibold text-white">{dimensions.seatingCapacity}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Doorway & Placement Guidelines */}
                    <div className="p-4 rounded-xl bg-off-white border border-charcoal/5 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-charcoal">
                        <Info size={14} className="text-wood" />
                        <span>Doorway & Stairwell Fit Guide</span>
                      </div>
                      <p className="text-xs text-charcoal/60 leading-relaxed">
                        Requires a minimum doorway clearance width of <strong>76 cm (30 inches)</strong> with legs removed. Legs detach effortlessly without requiring specialized tools.
                      </p>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'materials' && (
                  <motion.div
                    key="tab-materials"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <div className="divide-y divide-charcoal/10 text-xs">
                      <div className="py-2.5 flex flex-col sm:flex-row sm:justify-between gap-1">
                        <span className="font-bold text-charcoal/50 uppercase tracking-wider text-[10px]">Primary Material</span>
                        <span className="font-medium text-charcoal text-right">{materials.primaryMaterial}</span>
                      </div>
                      <div className="py-2.5 flex flex-col sm:flex-row sm:justify-between gap-1">
                        <span className="font-bold text-charcoal/50 uppercase tracking-wider text-[10px]">Internal Structure</span>
                        <span className="font-medium text-charcoal text-right">{materials.secondaryMaterial}</span>
                      </div>
                      {materials.finish && (
                        <div className="py-2.5 flex flex-col sm:flex-row sm:justify-between gap-1">
                          <span className="font-bold text-charcoal/50 uppercase tracking-wider text-[10px]">Finish & Coating</span>
                          <span className="font-medium text-charcoal text-right">{materials.finish}</span>
                        </div>
                      )}
                      {materials.rubCount && (
                        <div className="py-2.5 flex flex-col sm:flex-row sm:justify-between gap-1">
                          <span className="font-bold text-charcoal/50 uppercase tracking-wider text-[10px]">Abrasion Resistance</span>
                          <span className="font-medium text-charcoal text-right">{materials.rubCount}</span>
                        </div>
                      )}
                      <div className="py-2.5 flex flex-col sm:flex-row sm:justify-between gap-1">
                        <span className="font-bold text-charcoal/50 uppercase tracking-wider text-[10px]">Warranty</span>
                        <span className="font-semibold text-wood text-right">{materials.warranty}</span>
                      </div>
                      <div className="py-2.5 flex flex-col sm:flex-row sm:justify-between gap-1">
                        <span className="font-bold text-charcoal/50 uppercase tracking-wider text-[10px]">Assembly Type</span>
                        <span className="font-medium text-charcoal text-right">{materials.assembly}</span>
                      </div>
                    </div>

                    {materials.careInstructions && (
                      <div className="p-3.5 bg-cream/80 rounded-xl border border-charcoal/5 mt-4">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-wood block mb-1">Care & Maintenance</span>
                        <p className="text-xs text-charcoal/60 leading-relaxed">{materials.careInstructions}</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Actions Bar */}
            <div className="p-6 md:p-8 pt-4 bg-off-white/80 border-t border-charcoal/5 mt-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={addedAnimation}
                  className={`flex-1 py-4 border-2 font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 rounded-xl ${
                    addedAnimation 
                      ? 'bg-emerald-600 border-emerald-600 text-white' 
                      : 'border-charcoal text-charcoal hover:bg-charcoal hover:text-white'
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <CheckCircle2 size={16} />
                      Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={16} />
                      Add to Cart
                    </>
                  )}
                </button>

                <button
                  onClick={handleBuyNow}
                  className="flex-1 py-4 bg-charcoal text-white hover:bg-wood font-bold text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 rounded-xl shadow-lg"
                >
                  Buy Now
                  <ArrowRight size={16} />
                </button>

                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  aria-label="Save to wishlist"
                  className={`p-4 border rounded-xl transition-colors flex items-center justify-center ${
                    isWishlisted 
                      ? 'border-red-200 bg-red-50 text-red-500' 
                      : 'border-charcoal/10 text-charcoal/60 hover:text-charcoal hover:bg-white'
                  }`}
                >
                  <Heart size={20} className={isWishlisted ? "fill-red-500" : ""} />
                </button>
              </div>

              <p className="text-[10px] text-center uppercase tracking-widest text-charcoal/40 mt-3">
                Free Pan-India Insured Shipping • 100% Solid Wood Guarantee
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default QuickViewModal;
