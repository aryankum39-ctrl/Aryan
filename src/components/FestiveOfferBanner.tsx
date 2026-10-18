import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Clock, ShieldCheck, Truck, Palette, ArrowRight, Tag, Check, Gift } from 'lucide-react';
import { useCart } from '../context/CartContext';

const FestiveOfferBanner: React.FC = () => {
  const { setIsCartOpen } = useCart();
  const [copied, setCopied] = useState(false);

  // Realistic countdown timer that ticks
  const [timeLeft, setTimeLeft] = useState({
    days: 4,
    hours: 18,
    minutes: 45,
    seconds: 30,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText('FESTIVE15');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleApplyToCart = () => {
    window.dispatchEvent(new CustomEvent('apply-coupon-code', { detail: { code: 'FESTIVE15' } }));
    setIsCartOpen(true);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-[#FAF8F5] via-[#F4EFEA] to-[#FAF8F5] relative overflow-hidden border-y border-wood/15">
      {/* Subtle background ornamentation */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-wood/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="bg-charcoal text-white rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl overflow-hidden relative"
        >
          {/* Subtle gold grid overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#C5A880_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-wood/20 border border-wood/40 text-amber-200 text-xs font-bold uppercase tracking-widest">
                <Sparkles size={14} className="text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
                <span>Special Festive Celebration Edition</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif leading-tight">
                Craft Your Dream Living Space With <span className="text-amber-200 italic">15% Festive Savings</span>
              </h2>

              <p className="text-white/70 text-base sm:text-lg max-w-xl font-light leading-relaxed">
                Celebrate the season of new beginnings. Personalize solid teak structures, Sleepwell® ergonomic seating, and Italian bouclé or royal velvet upholstery with bespoke master craftsmanship.
              </p>

              {/* Countdown timer */}
              <div className="pt-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-wood mb-3">
                  <Clock size={14} />
                  <span>Limited Festive Production Slots Closing In:</span>
                </div>
                <div className="flex items-center gap-3">
                  {[
                    { label: 'Days', val: String(timeLeft.days).padStart(2, '0') },
                    { label: 'Hours', val: String(timeLeft.hours).padStart(2, '0') },
                    { label: 'Mins', val: String(timeLeft.minutes).padStart(2, '0') },
                    { label: 'Secs', val: String(timeLeft.seconds).padStart(2, '0') },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 min-w-[64px] text-center">
                        <span className="block text-xl sm:text-2xl font-mono font-bold text-white">
                          {item.val}
                        </span>
                        <span className="block text-[9px] uppercase tracking-wider text-white/50">
                          {item.label}
                        </span>
                      </div>
                      {idx < 3 && <span className="text-xl font-bold text-white/30">:</span>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  href="#customize"
                  className="px-8 py-4 bg-wood hover:bg-wood/90 text-white rounded-none font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-lg hover:shadow-wood/30 flex items-center gap-2 group"
                >
                  <span>Customize Your Sofa</span>
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </a>

                {/* Coupon copy widget */}
                <div 
                  onClick={handleCopyCode}
                  className="cursor-pointer group flex items-center gap-2.5 px-5 py-3.5 bg-white/10 hover:bg-white/15 border border-dashed border-amber-300/40 rounded-none transition-all"
                  title="Click to copy coupon code"
                >
                  <Tag size={15} className="text-amber-300" />
                  <span className="text-xs uppercase tracking-wider text-white/70">Code:</span>
                  <span className="font-mono font-bold text-amber-200 tracking-wider">FESTIVE15</span>
                  {copied ? (
                    <span className="flex items-center gap-1 text-emerald-400 text-xs font-bold ml-1">
                      <Check size={14} /> Copied
                    </span>
                  ) : (
                    <span className="text-[10px] uppercase tracking-widest text-white/40 group-hover:text-white transition-colors ml-1">
                      (Tap to copy)
                    </span>
                  )}
                </div>

                <button
                  onClick={handleApplyToCart}
                  className="text-xs uppercase tracking-widest font-bold text-amber-200/80 hover:text-amber-200 underline underline-offset-4 transition-colors"
                >
                  Apply in Cart →
                </button>
              </div>
            </div>

            {/* Right Perked Card */}
            <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-sm space-y-6">
              <div className="flex items-center gap-2 text-amber-200 text-xs font-bold uppercase tracking-widest">
                <Gift size={16} />
                <span>Festive Artisan Inclusions</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5 pb-4 border-b border-white/10">
                  <div className="p-2.5 rounded-lg bg-wood/20 text-amber-200 shrink-0">
                    <Palette size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Free Fabric Swatch Box</h4>
                    <p className="text-xs text-white/60 mt-0.5">
                      Touch & feel 12+ premium swatches (Bouclé, Royal Velvet, Top-Grain Leather) delivered to your home.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 pb-4 border-b border-white/10">
                  <div className="p-2.5 rounded-lg bg-wood/20 text-amber-200 shrink-0">
                    <Truck size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">White-Glove Delivery & Setup</h4>
                    <p className="text-xs text-white/60 mt-0.5">
                      Zero shipping fee, professional assembly, and packaging haul-away across all pin codes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-lg bg-wood/20 text-amber-200 shrink-0">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">10-Year Structural Guarantee</h4>
                    <p className="text-xs text-white/60 mt-0.5">
                      Kiln-dried solid teak framing with certified Sleepwell® resilience warranty card included.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2 text-center">
                <p className="text-[11px] text-white/40 tracking-wider uppercase">
                  ⭐ Rated 4.9/5 by 2,400+ Homeowners Across India
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FestiveOfferBanner;
