import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS, CATEGORIES } from '../constants';
import { Category, Product } from '../types';
import ProductCard from './ProductCard';
import QuickViewModal from './QuickViewModal';
import { useCart } from '../context/CartContext';

const ProductGallery: React.FC = () => {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>(['All']);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();

  const toggleCategory = (cat: Category) => {
    if (cat === 'All') {
      setSelectedCategories(['All']);
      return;
    }

    setSelectedCategories(prev => {
      const isSelected = prev.includes(cat);
      let next: Category[];

      if (isSelected) {
        // Remove the category
        next = prev.filter(c => c !== cat);
        // If nothing left, default to All
        if (next.length === 0) return ['All'];
        return next;
      } else {
        // Add the category and remove 'All'
        next = [...prev.filter(c => c !== 'All'), cat];
        return next;
      }
    });
  };

  const handleAddSetToCart = () => {
    const setProducts = PRODUCTS.filter(p => ['2', '5', '9'].includes(p.id));
    setProducts.forEach(product => addToCart(product));
  };

  const filteredProducts = selectedCategories.includes('All')
    ? PRODUCTS
    : PRODUCTS.filter(p => selectedCategories.includes(p.category));

  return (
    <section id="collections" className="py-24 bg-off-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif mb-8">Product Gallery</h2>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => toggleCategory(cat as Category)}
                className={`text-xs font-bold uppercase tracking-[0.2em] pb-2 border-b-2 transition-all duration-300 ${
                  selectedCategories.includes(cat as Category)
                    ? 'border-wood text-charcoal' 
                    : 'border-transparent text-charcoal/40 hover:text-charcoal'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <p className="mt-4 text-[10px] uppercase tracking-widest text-charcoal/40">
            Select multiple categories to refine your view
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <AnimatePresence mode='popLayout'>
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onQuickView={() => setSelectedProduct(product)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Shop the Look Section */}
      <div className="mt-32 bg-cream py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/5] overflow-hidden"
            >
              <img 
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1000" 
                alt="Curated Living Room"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-charcoal/10"></div>
              <div className="absolute top-12 left-12">
                <span className="text-xs font-bold uppercase tracking-[0.4em] text-white/80 mb-4 block">Curated Spaces</span>
                <h3 className="text-4xl md:text-5xl font-serif text-white">The Modern <br /> Living Set</h3>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-12"
            >
              <div>
                <h3 className="text-2xl font-serif mb-4">Shop the Look</h3>
                <p className="text-charcoal/60 leading-relaxed">
                  A cohesive blend of textures and tones. This curated selection brings together our most popular living room pieces for a space that feels both elevated and inviting.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {PRODUCTS.filter(p => ['2', '5', '9'].includes(p.id)).map((product) => (
                  <div 
                    key={product.id} 
                    className="group cursor-pointer bg-white p-4 shadow-sm hover:shadow-md transition-all"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <div className="aspect-square overflow-hidden mb-4 bg-off-white">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        loading="lazy"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1000';
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <h4 className="text-xs font-medium uppercase tracking-tight">{product.name}</h4>
                      <span className="text-xs font-bold">{product.price}</span>
                    </div>
                  </div>
                ))}
              </div>

              <button 
                onClick={handleAddSetToCart}
                className="w-full py-5 bg-charcoal text-white text-xs font-bold uppercase tracking-widest hover:bg-wood transition-colors"
              >
                Add Entire Set to Cart — ₹48,500
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
    </section>
  );
};

export default ProductGallery;
