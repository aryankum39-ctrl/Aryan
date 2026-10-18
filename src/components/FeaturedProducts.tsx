import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PRODUCTS } from '../constants';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import QuickViewModal from './QuickViewModal';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

const FeaturedProducts: React.FC = () => {
  const featured = PRODUCTS.filter(p => p.featured);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8"
        >
          <div className="max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-wood mb-4 block">Selected Pieces</span>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight">
              Featured Designs for <br /> Modern Living
            </h2>
          </div>
          <p className="text-charcoal/60 max-w-sm leading-relaxed">
            Our most sought-after pieces, hand-selected for their exceptional craftsmanship and timeless aesthetic.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {featured.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="group cursor-pointer"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="relative aspect-[4/5] overflow-hidden mb-6 bg-cream">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1000';
                  }}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors duration-300"></div>
                <div className="absolute bottom-6 left-6 right-6 flex gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProduct(product);
                    }}
                    className="flex-1 py-4 bg-white text-charcoal text-xs font-bold uppercase tracking-widest hover:bg-charcoal hover:text-white transition-colors"
                  >
                    Quick View
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    className="p-4 bg-white text-charcoal hover:bg-wood hover:text-white transition-colors"
                    title="Add to Cart"
                  >
                    <ShoppingBag size={18} />
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-charcoal/40 mb-1 block">{product.category}</span>
                  <h3 className="text-xl font-serif group-hover:text-wood transition-colors">{product.name}</h3>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium block">{product.price}</span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    className="text-[10px] font-bold uppercase tracking-widest text-wood hover:text-charcoal transition-colors md:hidden mt-2"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 flex justify-center"
        >
          <a
            href="#collections"
            className="flex items-center text-sm font-bold uppercase tracking-widest group border-b border-charcoal/20 pb-2 hover:border-charcoal transition-all"
          >
            View All Collections
            <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" size={16} />
          </a>
        </motion.div>
      </div>

      <QuickViewModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
    </section>
  );
};

export default FeaturedProducts;
