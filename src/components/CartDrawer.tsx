import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus, Trash2, ShoppingBag, Check, Smartphone, Banknote, Building2, Tag, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface AppliedCoupon {
  code: string;
  discountPercent: number;
  label: string;
}

const CartDrawer: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice, isCartOpen, setIsCartOpen, clearCart } = useCart();
  const [checkoutState, setCheckoutState] = useState<'idle' | 'processing' | 'success'>('idle');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cod' | 'bank'>('upi');
  const [generatedOrderId, setGeneratedOrderId] = useState<string>('AF-8942');
  
  // Coupon state
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>({
    code: 'FESTIVE15',
    discountPercent: 15,
    label: 'Festive Season 15% OFF'
  });

  // Listen for coupon apply events from banners
  useEffect(() => {
    const handleApplyCouponEvent = (e: CustomEvent<{ code: string }>) => {
      const code = e.detail?.code?.toUpperCase().trim();
      if (code === 'FESTIVE15') {
        setAppliedCoupon({ code: 'FESTIVE15', discountPercent: 15, label: 'Festive Season 15% OFF' });
        setCouponInput('FESTIVE15');
        setCouponError(null);
      } else if (code === 'AKSHARA20') {
        setAppliedCoupon({ code: 'AKSHARA20', discountPercent: 20, label: 'Artisan VIP 20% OFF' });
        setCouponInput('AKSHARA20');
        setCouponError(null);
      }
    };
    window.addEventListener('apply-coupon-code' as any, handleApplyCouponEvent);
    return () => window.removeEventListener('apply-coupon-code' as any, handleApplyCouponEvent);
  }, []);

  const handleApplyCoupon = (codeToApply?: string) => {
    const target = (codeToApply || couponInput).toUpperCase().trim();
    if (!target) return;

    if (target === 'FESTIVE15') {
      setAppliedCoupon({ code: 'FESTIVE15', discountPercent: 15, label: 'Festive Season 15% OFF' });
      setCouponInput('FESTIVE15');
      setCouponError(null);
    } else if (target === 'AKSHARA20') {
      setAppliedCoupon({ code: 'AKSHARA20', discountPercent: 20, label: 'Artisan VIP 20% OFF' });
      setCouponInput('AKSHARA20');
      setCouponError(null);
    } else if (target === 'WELCOME10') {
      setAppliedCoupon({ code: 'WELCOME10', discountPercent: 10, label: 'Welcome First Order 10% OFF' });
      setCouponInput('WELCOME10');
      setCouponError(null);
    } else {
      setCouponError('Invalid coupon code. Try FESTIVE15');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput('');
    setCouponError(null);
  };

  // Calculations
  const discountAmount = appliedCoupon 
    ? Math.round((totalPrice * appliedCoupon.discountPercent) / 100)
    : 0;
  const finalPrice = Math.max(0, totalPrice - discountAmount);

  const handleCheckout = () => {
    setCheckoutState('processing');
    const newId = `AF-${Math.floor(1000 + Math.random() * 9000)}`;
    setGeneratedOrderId(newId);
    // Simulate API call
    setTimeout(() => {
      setCheckoutState('success');
      setTimeout(() => {
        clearCart();
        setCheckoutState('idle');
        setIsCartOpen(false);
      }, 5000);
    }, 1500);
  };

  const handleTrackCreatedOrder = () => {
    clearCart();
    setCheckoutState('idle');
    setIsCartOpen(false);
    window.dispatchEvent(new CustomEvent('track-order-event', { detail: { orderId: generatedOrderId } }));
    const elem = document.getElementById('track-order');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const paymentOptions = [
    { id: 'upi', name: 'UPI / PhonePe / GPay', icon: Smartphone, description: 'Pay using any UPI app' },
    { id: 'bank', name: 'Net Banking', icon: Building2, description: 'All major Indian banks supported' },
    { id: 'cod', name: 'Cash on Delivery', icon: Banknote, description: 'Pay when your furniture arrives' },
  ] as const;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              if (checkoutState === 'idle') setIsCartOpen(false);
            }}
            className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm z-[150]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[160] flex flex-col"
          >
            <div className="p-6 border-b border-charcoal/10 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-wood" />
                <h2 className="text-xl font-serif">
                  {checkoutState === 'success' ? 'Order Confirmed' : 'Your Cart'}
                </h2>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)}
                disabled={checkoutState === 'processing'}
                className="p-2 hover:bg-charcoal/5 rounded-full transition-colors disabled:opacity-50"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-6 relative">
              <AnimatePresence mode="wait">
                {checkoutState === 'idle' ? (
                  <motion.div 
                    key="cart-items"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-8"
                  >
                    {cart.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-20">
                        <div className="w-16 h-16 bg-cream rounded-full flex items-center justify-center text-charcoal/20">
                          <ShoppingBag size={32} />
                        </div>
                        <div>
                          <p className="text-charcoal/60">Your cart is empty</p>
                          <button 
                            onClick={() => setIsCartOpen(false)}
                            className="mt-4 text-xs font-bold uppercase tracking-widest text-wood hover:text-charcoal transition-colors"
                          >
                            Continue Shopping
                          </button>
                        </div>
                      </div>
                    ) : (
                      cart.map((item) => (
                        <div key={item.id} className="flex gap-4">
                          <div className="w-24 h-24 bg-cream overflow-hidden">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="flex-grow space-y-1">
                            <div className="flex justify-between">
                              <h3 className="text-sm font-medium">{item.name}</h3>
                              <button 
                                onClick={() => removeFromCart(item.id)}
                                className="text-charcoal/30 hover:text-red-500 transition-colors"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                            <p className="text-xs text-charcoal/40 uppercase tracking-widest">{item.category}</p>
                            <p className="text-sm font-semibold">{item.price}</p>
                            
                            {item.customOptions && (
                              <div className="mt-2 space-y-0.5">
                                {Object.entries(item.customOptions).map(([key, value]) => (
                                  <p key={key} className="text-[9px] text-charcoal/60">
                                    <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span> {value}
                                  </p>
                                ))}
                              </div>
                            )}
                            
                            <div className="flex items-center gap-4 mt-4">
                              <div className="flex items-center border border-charcoal/10">
                                <button 
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="p-1 hover:bg-charcoal/5 transition-colors"
                                >
                                  <Minus size={14} />
                                </button>
                                <span className="w-8 text-center text-xs">{item.quantity}</span>
                                <button 
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="p-1 hover:bg-charcoal/5 transition-colors"
                                >
                                  <Plus size={14} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}

                    {cart.length > 0 && (
                      <div className="pt-8 border-t border-charcoal/10">
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-charcoal/40 mb-4">Select Payment Method</h4>
                        <div className="space-y-3">
                          {paymentOptions.map((option) => (
                            <button
                              key={option.id}
                              onClick={() => setPaymentMethod(option.id)}
                              className={`w-full p-4 rounded-xl border-2 transition-all text-left flex items-center gap-4 ${
                                paymentMethod === option.id ? 'border-wood bg-wood/5' : 'border-charcoal/5 hover:border-charcoal/20'
                              }`}
                            >
                              <div className={`p-2 rounded-lg ${paymentMethod === option.id ? 'bg-wood text-white' : 'bg-charcoal/5 text-charcoal/40'}`}>
                                <option.icon size={18} />
                              </div>
                              <div className="flex-grow">
                                <h5 className="text-xs font-bold">{option.name}</h5>
                                <p className="text-[10px] text-charcoal/60">{option.description}</p>
                              </div>
                              {paymentMethod === option.id && <Check size={16} className="text-wood" />}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ) : checkoutState === 'processing' ? (
                  <motion.div 
                    key="processing"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center space-y-6 py-20"
                  >
                    <div className="w-16 h-16 border-4 border-wood border-t-transparent rounded-full animate-spin" />
                    <div>
                      <h3 className="text-xl font-serif mb-2">Processing Payment</h3>
                      <p className="text-sm text-charcoal/60">Connecting to secure gateway...</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center space-y-6 py-20"
                  >
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                      <Check size={40} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-serif mb-2">Thank You!</h3>
                      <p className="text-sm text-charcoal/60 mb-6">Your order has been placed successfully. A confirmation email has been sent to your inbox.</p>
                      <div className="space-y-3">
                        <div className="p-4 bg-cream rounded-lg text-left">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-charcoal/40 mb-1">Order ID</p>
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-mono font-bold text-charcoal">#{generatedOrderId}</p>
                            <button
                              onClick={handleTrackCreatedOrder}
                              className="text-[11px] font-bold uppercase tracking-wider text-wood hover:text-charcoal underline transition-colors"
                            >
                              Track Order Live →
                            </button>
                          </div>
                        </div>
                        <div className="p-4 bg-wood/5 rounded-lg text-left border border-wood/10">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-wood mb-1">Payment Mode</p>
                          <p className="text-xs font-bold flex items-center gap-2">
                            {paymentMethod === 'upi' && <Smartphone size={14} />}
                            {paymentMethod === 'bank' && <Building2 size={14} />}
                            {paymentMethod === 'cod' && <Banknote size={14} />}
                            {paymentOptions.find(o => o.id === paymentMethod)?.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {cart.length > 0 && checkoutState === 'idle' && (
              <div className="p-6 border-t border-charcoal/10 space-y-4 bg-stone-50/50">
                {/* Coupon Code Section */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-charcoal/60 flex items-center gap-1">
                      <Tag size={12} className="text-wood" />
                      Promo & Festive Code
                    </span>
                    {!appliedCoupon && (
                      <button 
                        type="button"
                        onClick={() => handleApplyCoupon('FESTIVE15')}
                        className="text-[10px] font-bold text-wood hover:text-charcoal transition-colors underline"
                      >
                        Apply FESTIVE15 (15% Off)
                      </button>
                    )}
                  </div>

                  {appliedCoupon ? (
                    <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200/80 rounded-lg text-emerald-800">
                      <div className="flex items-center gap-2">
                        <Sparkles size={14} className="text-emerald-600 shrink-0" />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono font-bold text-xs">{appliedCoupon.code}</span>
                            <span className="text-[9px] bg-emerald-200/60 font-bold px-1.5 py-0.2 rounded uppercase">Applied</span>
                          </div>
                          <p className="text-[10px] text-emerald-700">{appliedCoupon.label} (-₹{discountAmount.toLocaleString('en-IN')})</p>
                        </div>
                      </div>
                      <button 
                        onClick={handleRemoveCoupon}
                        className="text-emerald-600 hover:text-emerald-900 p-1 transition-colors"
                        title="Remove coupon"
                      >
                        <X size={15} />
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={couponInput}
                          onChange={(e) => {
                            setCouponInput(e.target.value.toUpperCase());
                            setCouponError(null);
                          }}
                          placeholder="e.g. FESTIVE15"
                          className="flex-grow uppercase font-mono text-xs px-3 py-2 border border-charcoal/15 rounded-lg focus:outline-none focus:border-wood bg-white"
                        />
                        <button
                          type="button"
                          onClick={() => handleApplyCoupon()}
                          className="px-4 py-2 bg-charcoal text-white text-[10px] font-bold uppercase tracking-wider rounded-lg hover:bg-wood transition-colors"
                        >
                          Apply
                        </button>
                      </div>
                      {couponError && (
                        <p className="text-[10px] text-red-500 font-medium pl-1">{couponError}</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2 pt-2 border-t border-charcoal/10 text-xs">
                  <div className="flex justify-between items-center text-charcoal/60">
                    <span>Subtotal</span>
                    <span>₹{totalPrice.toLocaleString('en-IN')}</span>
                  </div>

                  {appliedCoupon && (
                    <div className="flex justify-between items-center text-emerald-700 font-medium">
                      <span>Festive Savings ({appliedCoupon.discountPercent}%)</span>
                      <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center text-charcoal/60">
                    <span className="flex items-center gap-1">
                      White-Glove Setup
                      <span className="text-[9px] bg-wood/10 text-wood px-1.5 py-0.2 rounded font-bold uppercase">Promo</span>
                    </span>
                    <span className="text-emerald-700 font-bold">
                      FREE <span className="line-through text-charcoal/30 font-normal text-[10px]">₹1,500</span>
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-charcoal/10">
                    <span className="text-xs font-bold uppercase tracking-widest text-charcoal">Grand Total</span>
                    <span className="text-2xl font-serif font-bold text-charcoal">
                      ₹{finalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <button 
                  onClick={handleCheckout}
                  className="w-full py-4.5 bg-charcoal text-white text-xs font-bold uppercase tracking-widest hover:bg-wood transition-colors shadow-lg"
                >
                  Confirm & Place Order
                </button>
                <p className="text-[10px] text-center uppercase tracking-widest text-charcoal/40">
                  Secure 256-bit SSL Encrypted Payment
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
