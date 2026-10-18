import React, { useState } from 'react';
import { Sparkles, Copy, Check, X, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';

interface FestiveAnnouncementBarProps {
  onDismiss?: () => void;
}

const FestiveAnnouncementBar: React.FC<FestiveAnnouncementBarProps> = ({ onDismiss }) => {
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const { setIsCartOpen } = useCart();

  const couponCode = 'FESTIVE15';

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(couponCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleApplyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(couponCode);
    // Dispatch event for cart to pre-apply coupon
    window.dispatchEvent(new CustomEvent('apply-coupon-code', { detail: { code: couponCode } }));
    setIsCartOpen(true);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="bg-charcoal text-cream border-b border-wood/20 relative z-50 text-xs py-2.5 px-4"
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Left / Promo Text */}
          <div className="flex items-center gap-2 flex-wrap text-center sm:text-left mx-auto sm:mx-0">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-wood text-white text-[10px] font-bold tracking-widest uppercase shadow-sm">
              <Sparkles size={11} className="text-amber-200 animate-pulse" />
              Festive Season
            </span>
            <span className="text-white/90 font-medium tracking-wide">
              Flat 15% OFF on all Custom Handcrafted Furniture & Sofas
            </span>
            <span className="hidden md:inline text-white/40">|</span>
            <span className="hidden lg:inline text-white/70">
              Free White-Glove Installation Across India
            </span>
          </div>

          {/* Right / Coupon Action */}
          <div className="flex items-center gap-3 mx-auto sm:mx-0">
            <div 
              onClick={handleCopy}
              className="group flex items-center gap-1.5 bg-white/10 hover:bg-white/20 px-3 py-1 rounded cursor-pointer transition-all border border-white/10 hover:border-wood/50"
              title="Click to copy coupon code"
            >
              <Tag size={12} className="text-wood" />
              <span className="font-mono font-bold tracking-wider text-amber-200">{couponCode}</span>
              <button 
                type="button"
                className="text-white/70 group-hover:text-white transition-colors ml-1"
                aria-label="Copy code"
              >
                {copied ? (
                  <span className="flex items-center gap-1 text-emerald-400 font-bold text-[10px]">
                    <Check size={12} /> Copied!
                  </span>
                ) : (
                  <Copy size={12} />
                )}
              </button>
            </div>

            <button
              onClick={handleApplyNow}
              className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-wood hover:text-white transition-colors underline underline-offset-4"
            >
              Use in Cart →
            </button>

            <button
              onClick={() => {
                setIsVisible(false);
                onDismiss?.();
              }}
              className="text-white/40 hover:text-white transition-colors p-1"
              aria-label="Dismiss banner"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FestiveAnnouncementBar;
