import React from 'react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { Maximize2, ShoppingBag, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onQuickView: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addToCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className="group relative bg-white p-4 shadow-sm hover:shadow-xl transition-all duration-500"
    >
      <div 
        className="relative aspect-square overflow-hidden mb-4 bg-cream cursor-pointer"
        onClick={onQuickView}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1000';
          }}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onQuickView();
            }}
            className="p-4 bg-white rounded-full text-charcoal hover:bg-wood hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300"
            title="Quick View"
          >
            <Maximize2 size={20} />
          </button>
          <button 
            onClick={handleQuickAdd}
            className="p-4 bg-white rounded-full text-charcoal hover:bg-wood hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75"
            title="Add to Cart"
          >
            <ShoppingBag size={20} />
          </button>
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between items-start">
          <span className="text-[10px] uppercase tracking-widest text-charcoal/40">{product.category}</span>
          <div className="flex items-center gap-1">
            <Star size={10} className="fill-wood text-wood" />
            <span className="text-[10px] font-bold">{product.rating}</span>
          </div>
        </div>
        <h3 className="text-sm font-medium tracking-tight group-hover:text-wood transition-colors">{product.name}</h3>
        <div className="flex justify-between items-center">
          <p className="text-sm font-semibold">{product.price}</p>
          <button 
            onClick={handleQuickAdd}
            className="text-[10px] font-bold uppercase tracking-widest text-wood hover:text-charcoal transition-colors md:hidden"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
