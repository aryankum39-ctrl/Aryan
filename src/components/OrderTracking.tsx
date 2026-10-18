import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  PackageCheck, 
  Search, 
  Truck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Hammer, 
  ShieldCheck, 
  Phone, 
  ArrowRight,
  Sparkles,
  Calendar,
  AlertCircle
} from 'lucide-react';

export interface TimelineStep {
  title: string;
  subtitle: string;
  date: string;
  time?: string;
  status: 'completed' | 'current' | 'upcoming';
  location?: string;
  iconName: 'confirmed' | 'processing' | 'shipped' | 'delivered';
}

export interface OrderTrackDetails {
  orderId: string;
  productName: string;
  productSpecs: string;
  image: string;
  customerName: string;
  orderDate: string;
  estimatedDelivery: string;
  shippingAddress: string;
  courierName: string;
  trackingNumber: string;
  statusLabel: 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered';
  statusCode: number; // 1 to 4
  steps: TimelineStep[];
}

const PRESET_ORDERS: Record<string, OrderTrackDetails> = {
  'AF-8942': {
    orderId: 'AF-8942',
    productName: 'The Florence 3-Seater Velvet Sofa',
    productSpecs: 'Emerald Green Velvet • Natural Teak Legs • Dual-Foam Comfort',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
    customerName: 'Aryan Sharma',
    orderDate: 'Oct 14, 2026',
    estimatedDelivery: 'Oct 21, 2026',
    shippingAddress: 'Golf Course Road, DLF Phase 5, Gurugram, Haryana - 122002',
    courierName: 'Akshara White Glove Logistics (Van #HR-26-8812)',
    trackingNumber: 'AKSHARA-EXP-8942',
    statusLabel: 'Shipped',
    statusCode: 3,
    steps: [
      {
        title: 'Order Confirmed',
        subtitle: 'Payment verified and specs approved by master craftsman.',
        date: 'Oct 14, 2026',
        time: '11:42 AM',
        status: 'completed',
        location: 'Akshara Studio, New Delhi',
        iconName: 'confirmed',
      },
      {
        title: 'Processing & Artisan Crafting',
        subtitle: 'Kiln-dried hardwood frame assembled & 32-density foam upholstered.',
        date: 'Oct 16, 2026',
        time: '04:15 PM',
        status: 'completed',
        location: 'Workshop Hub #2, Manesar',
        iconName: 'processing',
      },
      {
        title: 'Shipped & In Transit',
        subtitle: 'Handed to White Glove team in climate-controlled padded vehicle.',
        date: 'Oct 18, 2026',
        time: '08:30 AM',
        status: 'current',
        location: 'Gurugram Distribution Hub',
        iconName: 'shipped',
      },
      {
        title: 'Delivered & Free In-Room Assembly',
        subtitle: 'Scheduled room placement, uncrating & technician inspection.',
        date: 'Oct 21, 2026',
        time: 'Expected by 2:00 PM',
        status: 'upcoming',
        location: 'Delivery Address',
        iconName: 'delivered',
      },
    ],
  },
  'AF-5120': {
    orderId: 'AF-5120',
    productName: 'The Nordic Oak Minimalist Lounge',
    productSpecs: 'Oatmeal Bouclé Fabric • Walnut Finish Legs • Matching Bolster Pillows',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
    customerName: 'Priya Mehra',
    orderDate: 'Oct 17, 2026',
    estimatedDelivery: 'Oct 26, 2026',
    shippingAddress: 'Vasant Vihar, Block C, New Delhi - 110057',
    courierName: 'Akshara Artisan Transport Fleet',
    trackingNumber: 'AKSHARA-EXP-5120',
    statusLabel: 'Processing',
    statusCode: 2,
    steps: [
      {
        title: 'Order Confirmed',
        subtitle: 'Order details recorded and timber selected.',
        date: 'Oct 17, 2026',
        time: '02:10 PM',
        status: 'completed',
        location: 'Akshara Studio, New Delhi',
        iconName: 'confirmed',
      },
      {
        title: 'Processing & Artisan Crafting',
        subtitle: 'Hand-tailoring bouclé weave fabric and precision leg carving.',
        date: 'Oct 18, 2026',
        time: '01:00 PM',
        status: 'current',
        location: 'Workshop Hub #1, Jaipur',
        iconName: 'processing',
      },
      {
        title: 'Shipped & In Transit',
        subtitle: 'Packing in protective wooden crate for secure highway transit.',
        date: 'Expected Oct 22, 2026',
        status: 'upcoming',
        location: 'Transit Facility',
        iconName: 'shipped',
      },
      {
        title: 'Delivered & In-Room Assembly',
        subtitle: 'White glove delivery and placement in your living space.',
        date: 'Expected Oct 26, 2026',
        status: 'upcoming',
        location: 'Delivery Address',
        iconName: 'delivered',
      },
    ],
  },
  'AF-1090': {
    orderId: 'AF-1090',
    productName: 'The Kensington Chesterfield Leather Sofa',
    productSpecs: 'Vintage Cognac Italian Leather • Brass Caster Wheels • High Resiliency Foam',
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80',
    customerName: 'Kabir Singhania',
    orderDate: 'Oct 08, 2026',
    estimatedDelivery: 'Oct 15, 2026',
    shippingAddress: 'Bandra West, Mumbai, Maharashtra - 400050',
    courierName: 'Akshara White Glove Logistics Express',
    trackingNumber: 'AKSHARA-EXP-1090',
    statusLabel: 'Delivered',
    statusCode: 4,
    steps: [
      {
        title: 'Order Confirmed',
        subtitle: 'Custom leather batch checked and order registered.',
        date: 'Oct 08, 2026',
        time: '09:15 AM',
        status: 'completed',
        location: 'Akshara Central Atelier',
        iconName: 'confirmed',
      },
      {
        title: 'Processing & Artisan Crafting',
        subtitle: 'Deep diamond tufting done by senior craftsmen.',
        date: 'Oct 10, 2026',
        time: '05:30 PM',
        status: 'completed',
        location: 'Main Upholstery Lab',
        iconName: 'processing',
      },
      {
        title: 'Shipped & In Transit',
        subtitle: 'Dispatched via premium express logistics line.',
        date: 'Oct 12, 2026',
        time: '11:00 AM',
        status: 'completed',
        location: 'Bandra Delivery Center',
        iconName: 'shipped',
      },
      {
        title: 'Delivered & Handover Complete',
        subtitle: 'Delivered, assembled and signed by customer with 10-year warranty seal.',
        date: 'Oct 15, 2026',
        time: '01:45 PM',
        status: 'completed',
        location: 'Bandra West, Mumbai',
        iconName: 'delivered',
      },
    ],
  },
};

// Generates a mock order dynamically for any ID entered
const generateMockOrder = (rawId: string): OrderTrackDetails => {
  const cleanId = rawId.trim().toUpperCase().replace(/^#/, '');
  
  // Calculate deterministic stage from characters
  const charCodeSum = cleanId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const stage = (charCodeSum % 4) + 1; // 1, 2, 3, or 4

  const statusMap: Record<number, 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered'> = {
    1: 'Confirmed',
    2: 'Processing',
    3: 'Shipped',
    4: 'Delivered',
  };

  const currentStatus = statusMap[stage];

  const steps: TimelineStep[] = [
    {
      title: 'Order Confirmed',
      subtitle: 'Order verified and sent to artisan production queue.',
      date: 'Oct 16, 2026',
      time: '10:30 AM',
      status: stage >= 1 ? (stage === 1 ? 'current' : 'completed') : 'upcoming',
      location: 'Akshara Studio, New Delhi',
      iconName: 'confirmed',
    },
    {
      title: 'Processing & Crafting',
      subtitle: 'Solid seasoned wood joinery, ergonomic cushion layering & upholstery.',
      date: stage >= 2 ? 'Oct 17, 2026' : 'Scheduled',
      time: stage >= 2 ? '03:45 PM' : undefined,
      status: stage >= 2 ? (stage === 2 ? 'current' : 'completed') : 'upcoming',
      location: 'Craft Atelier #3',
      iconName: 'processing',
    },
    {
      title: 'Shipped & In Transit',
      subtitle: 'Safely packed in cushioned wooden crating & dispatched via express freight.',
      date: stage >= 3 ? 'Oct 18, 2026' : 'Est. Oct 21, 2026',
      time: stage >= 3 ? '09:15 AM' : undefined,
      status: stage >= 3 ? (stage === 3 ? 'current' : 'completed') : 'upcoming',
      location: 'Regional Logistics Center',
      iconName: 'shipped',
    },
    {
      title: 'Delivered & Assembled',
      subtitle: 'White-glove unboxing, precision alignment, and debris removal.',
      date: stage >= 4 ? 'Oct 18, 2026' : 'Est. Oct 23, 2026',
      time: stage >= 4 ? '12:20 PM' : undefined,
      status: stage >= 4 ? 'completed' : 'upcoming',
      location: 'Destination Address',
      iconName: 'delivered',
    },
  ];

  return {
    orderId: cleanId,
    productName: 'The Akshara Signature Collection Furniture',
    productSpecs: 'Custom Selected Fabric • Reinforced Hardwood • Premium Comfort Foam',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
    customerName: 'Valued Customer',
    orderDate: 'Oct 16, 2026',
    estimatedDelivery: stage === 4 ? 'Delivered' : 'Oct 23, 2026',
    shippingAddress: 'Express Residential Delivery, India',
    courierName: 'Akshara White Glove Logistics',
    trackingNumber: `AKSHARA-TRK-${cleanId}`,
    statusLabel: currentStatus,
    statusCode: stage,
    steps,
  };
};

const OrderTracking: React.FC = () => {
  const [searchInput, setSearchInput] = useState<string>('AF-8942');
  const [activeOrder, setActiveOrder] = useState<OrderTrackDetails | null>(PRESET_ORDERS['AF-8942']);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Allow other components (like CartDrawer checkout) to broadcast an order ID to track
  useEffect(() => {
    const handleCustomTrack = (event: Event) => {
      const customEvent = event as CustomEvent<{ orderId: string }>;
      if (customEvent.detail?.orderId) {
        const id = customEvent.detail.orderId.replace(/^#/, '');
        setSearchInput(id);
        handleLookup(id);
      }
    };

    window.addEventListener('track-order-event', handleCustomTrack);
    return () => window.removeEventListener('track-order-event', handleCustomTrack);
  }, []);

  const handleLookup = (idToLookup?: string) => {
    const target = (idToLookup || searchInput).trim().toUpperCase().replace(/^#/, '');
    
    if (!target) {
      setErrorMessage('Please enter an Order ID to track.');
      return;
    }

    setErrorMessage('');
    setIsSearching(true);

    setTimeout(() => {
      if (PRESET_ORDERS[target]) {
        setActiveOrder(PRESET_ORDERS[target]);
      } else {
        // Fallback dynamic generator so any valid string displays a coherent mock status
        setActiveOrder(generateMockOrder(target));
      }
      setIsSearching(false);
    }, 400);
  };

  const getStepIcon = (iconName: TimelineStep['iconName'], status: TimelineStep['status']) => {
    const iconClass = status === 'completed' 
      ? 'text-white' 
      : status === 'current' 
        ? 'text-wood' 
        : 'text-charcoal/30';

    switch (iconName) {
      case 'confirmed':
        return <PackageCheck className={iconClass} size={18} />;
      case 'processing':
        return <Hammer className={iconClass} size={18} />;
      case 'shipped':
        return <Truck className={iconClass} size={18} />;
      case 'delivered':
        return <CheckCircle2 className={iconClass} size={18} />;
      default:
        return <Clock className={iconClass} size={18} />;
    }
  };

  const getStatusBadge = (statusLabel: OrderTrackDetails['statusLabel']) => {
    switch (statusLabel) {
      case 'Confirmed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            Order Confirmed
          </span>
        );
      case 'Processing':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            Artisan Crafting in Progress
          </span>
        );
      case 'Shipped':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
            <Truck size={12} className="animate-bounce" />
            Out for Transit / Shipped
          </span>
        );
      case 'Delivered':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 size={12} />
            Delivered Successfully
          </span>
        );
    }
  };

  return (
    <section id="track-order" className="py-24 bg-cream/50 relative overflow-hidden">
      {/* Decorative background subtle circle */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-wood/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-charcoal/5 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-wood/10 text-wood rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            <Truck size={14} />
            Bespoke Delivery Status
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mb-4">
            Track Your Furniture Order
          </h2>
          <p className="text-charcoal/60 text-sm md:text-base leading-relaxed">
            Follow each stage of your furniture piece — from timber selection and artisan upholstery to White Glove in-home installation.
          </p>
        </motion.div>

        {/* Input & Search Box */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto mb-8"
        >
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleLookup();
            }}
            className="flex flex-col sm:flex-row gap-3 bg-white p-2.5 rounded-2xl shadow-sm border border-charcoal/10"
          >
            <div className="relative flex-grow flex items-center">
              <span className="pl-4 pr-2 text-charcoal/40 font-mono font-medium">#</span>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                placeholder="Enter Order ID (e.g. AF-8942)"
                className="w-full py-3 pr-4 text-charcoal font-medium placeholder:text-charcoal/30 focus:outline-none text-sm md:text-base uppercase tracking-wider font-mono"
              />
            </div>
            <button
              type="submit"
              disabled={isSearching}
              className="py-3 px-8 bg-charcoal hover:bg-wood text-white font-medium text-xs uppercase tracking-widest rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
            >
              {isSearching ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Search size={16} />
                  Track Order
                </>
              )}
            </button>
          </form>

          {errorMessage && (
            <p className="text-red-500 text-xs mt-2 flex items-center gap-1.5 pl-2">
              <AlertCircle size={14} />
              {errorMessage}
            </p>
          )}

          {/* Preset Sample Quick Buttons */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-charcoal/40 uppercase tracking-widest text-[11px] font-bold mr-1">
              Quick Samples:
            </span>
            <button
              type="button"
              onClick={() => {
                setSearchInput('AF-8942');
                handleLookup('AF-8942');
              }}
              className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition-all ${
                searchInput.toUpperCase().includes('8942')
                  ? 'bg-wood text-white border-wood font-semibold shadow-sm'
                  : 'bg-white hover:bg-cream border-charcoal/10 text-charcoal/70'
              }`}
            >
              #AF-8942 (Shipped)
            </button>
            <button
              type="button"
              onClick={() => {
                setSearchInput('AF-5120');
                handleLookup('AF-5120');
              }}
              className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition-all ${
                searchInput.toUpperCase().includes('5120')
                  ? 'bg-wood text-white border-wood font-semibold shadow-sm'
                  : 'bg-white hover:bg-cream border-charcoal/10 text-charcoal/70'
              }`}
            >
              #AF-5120 (Processing)
            </button>
            <button
              type="button"
              onClick={() => {
                setSearchInput('AF-1090');
                handleLookup('AF-1090');
              }}
              className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition-all ${
                searchInput.toUpperCase().includes('1090')
                  ? 'bg-wood text-white border-wood font-semibold shadow-sm'
                  : 'bg-white hover:bg-cream border-charcoal/10 text-charcoal/70'
              }`}
            >
              #AF-1090 (Delivered)
            </button>
          </div>
        </motion.div>

        {/* Tracking Results Card */}
        <AnimatePresence mode="wait">
          {activeOrder && (
            <motion.div
              key={activeOrder.orderId}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl border border-charcoal/10 shadow-xl overflow-hidden"
            >
              {/* Top Banner: Order Header */}
              <div className="p-6 md:p-8 bg-charcoal text-white flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-white/50">
                      Order Reference
                    </span>
                    <span className="font-mono font-bold text-lg text-wood">
                      #{activeOrder.orderId}
                    </span>
                    {getStatusBadge(activeOrder.statusLabel)}
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-white">
                    {activeOrder.productName}
                  </h3>
                  <p className="text-white/60 text-xs md:text-sm mt-1">
                    {activeOrder.productSpecs}
                  </p>
                </div>

                <div className="flex flex-col md:items-end border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-8">
                  <span className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1">
                    Estimated Delivery
                  </span>
                  <div className="text-xl font-serif font-bold text-white flex items-center gap-2">
                    <Calendar size={18} className="text-wood" />
                    {activeOrder.estimatedDelivery}
                  </div>
                  <span className="text-xs text-white/50 mt-1">
                    Placed on {activeOrder.orderDate}
                  </span>
                </div>
              </div>

              {/* Progress Stepper Bar (Horizontal on tablet/desktop) */}
              <div className="px-6 md:px-12 py-10 bg-cream/20 border-b border-charcoal/5">
                <div className="relative">
                  {/* Connecting Line behind steps */}
                  <div className="hidden md:block absolute top-1/2 left-8 right-8 -translate-y-1/2 h-1 bg-charcoal/10 z-0">
                    <div 
                      className="h-full bg-wood transition-all duration-700 ease-out"
                      style={{ 
                        width: activeOrder.statusCode === 1 
                          ? '0%' 
                          : activeOrder.statusCode === 2 
                            ? '33.3%' 
                            : activeOrder.statusCode === 3 
                              ? '66.6%' 
                              : '100%' 
                      }}
                    />
                  </div>

                  {/* Steps Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
                    {activeOrder.steps.map((step, idx) => {
                      const isCompleted = step.status === 'completed';
                      const isCurrent = step.status === 'current';
                      
                      return (
                        <div 
                          key={idx} 
                          className={`flex md:flex-col items-start md:items-center text-left md:text-center gap-4 md:gap-3 p-3 rounded-2xl transition-all ${
                            isCurrent ? 'bg-white shadow-md border border-wood/20 md:scale-105' : ''
                          }`}
                        >
                          {/* Icon Circle */}
                          <div
                            className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform ${
                              isCompleted
                                ? 'bg-wood shadow-md text-white'
                                : isCurrent
                                  ? 'bg-charcoal text-white ring-4 ring-wood/20 animate-pulse'
                                  : 'bg-white border-2 border-charcoal/10 text-charcoal/30'
                            }`}
                          >
                            {getStepIcon(step.iconName, step.status)}
                          </div>

                          {/* Text info */}
                          <div>
                            <div className="flex items-center gap-2 md:justify-center">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal/40">
                                Step 0{idx + 1}
                              </span>
                              {isCurrent && (
                                <span className="inline-block px-2 py-0.5 bg-wood/10 text-wood text-[9px] font-extrabold uppercase rounded tracking-wider">
                                  Current
                                </span>
                              )}
                            </div>
                            <h4 className={`text-sm font-bold mt-0.5 ${
                              isCurrent ? 'text-charcoal' : isCompleted ? 'text-charcoal/90' : 'text-charcoal/40'
                            }`}>
                              {step.title}
                            </h4>
                            <p className="text-xs text-charcoal/50 mt-1 line-clamp-2 md:line-clamp-none max-w-xs">
                              {step.subtitle}
                            </p>
                            <div className="text-[11px] font-mono font-medium text-wood mt-2 flex items-center md:justify-center gap-1">
                              <Clock size={12} />
                              {step.date}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Order Info & Live Milestones Activity Log */}
              <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left 2 Cols: Detailed Timeline Activity */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-charcoal/10">
                    <h4 className="font-serif font-bold text-lg text-charcoal flex items-center gap-2">
                      <Sparkles size={18} className="text-wood" />
                      Detailed Crafting & Transit Milestones
                    </h4>
                    <span className="text-xs text-charcoal/40 uppercase tracking-widest font-mono">
                      Live Updates
                    </span>
                  </div>

                  <div className="space-y-6 relative pl-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-charcoal/10">
                    {activeOrder.steps.map((step, idx) => (
                      <div key={idx} className="relative group">
                        {/* Dot indicator on timeline */}
                        <div 
                          className={`absolute -left-[27px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white transition-colors ${
                            step.status === 'completed'
                              ? 'bg-wood'
                              : step.status === 'current'
                                ? 'bg-charcoal ring-2 ring-wood'
                                : 'bg-charcoal/20'
                          }`}
                        />

                        <div className="bg-cream/30 p-4 rounded-xl border border-charcoal/5">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                            <span className="font-bold text-sm text-charcoal">
                              {step.title}
                            </span>
                            <span className="text-xs font-mono text-charcoal/50">
                              {step.date} {step.time ? `• ${step.time}` : ''}
                            </span>
                          </div>
                          <p className="text-xs text-charcoal/70 leading-relaxed">
                            {step.subtitle}
                          </p>
                          {step.location && (
                            <div className="mt-2 text-[11px] text-charcoal/50 flex items-center gap-1.5">
                              <MapPin size={12} className="text-wood" />
                              <span>{step.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Col: Delivery & Support Details */}
                <div className="space-y-6">
                  {/* Shipping Info Card */}
                  <div className="p-5 bg-cream/40 rounded-2xl border border-charcoal/5 space-y-4">
                    <h5 className="text-xs font-bold uppercase tracking-widest text-charcoal/50">
                      Destination & Carrier
                    </h5>

                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-charcoal/40 block">
                        Recipient
                      </span>
                      <p className="text-sm font-bold text-charcoal">
                        {activeOrder.customerName}
                      </p>
                    </div>

                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-charcoal/40 block">
                        White Glove Delivery Address
                      </span>
                      <p className="text-xs text-charcoal/70 leading-relaxed mt-0.5">
                        {activeOrder.shippingAddress}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-charcoal/10">
                      <span className="text-[11px] uppercase tracking-wider text-charcoal/40 block">
                        Dedicated Carrier & Waybill
                      </span>
                      <p className="text-xs font-bold text-charcoal mt-0.5">
                        {activeOrder.courierName}
                      </p>
                      <span className="text-[11px] font-mono text-wood block mt-0.5">
                        Tracking: {activeOrder.trackingNumber}
                      </span>
                    </div>
                  </div>

                  {/* White Glove Promise */}
                  <div className="p-5 bg-wood/5 border border-wood/20 rounded-2xl space-y-3">
                    <div className="flex items-center gap-2 text-wood font-bold text-xs uppercase tracking-wider">
                      <ShieldCheck size={16} />
                      Akshara White Glove Promise
                    </div>
                    <p className="text-xs text-charcoal/70 leading-relaxed">
                      Includes scheduled in-room delivery, complete structural assembly, packaging removal, and quality sign-off by our master technician.
                    </p>
                    <div className="pt-2 border-t border-wood/10 flex items-center justify-between text-xs">
                      <span className="text-charcoal/60">Need delivery assistance?</span>
                      <a 
                        href="tel:8742974384"
                        className="font-bold text-charcoal hover:text-wood flex items-center gap-1 transition-colors"
                      >
                        <Phone size={12} />
                        Call Support
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default OrderTracking;
