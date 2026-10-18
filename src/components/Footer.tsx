import React from 'react';
import { motion } from 'motion/react';
import { Instagram, Twitter, Facebook, ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-charcoal text-white pt-24 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20"
        >
          {/* Brand Info */}
          <div className="space-y-8">
            <h3 className="text-2xl font-serif font-bold tracking-tighter">AKSHARA FURNITURES</h3>
            <p className="text-white/50 leading-relaxed max-w-xs">
              Crafting timeless furniture pieces that transform houses into homes. Minimalist by design, exceptional by nature.
            </p>
            <div className="flex space-x-6">
              <a href="https://instagram.com/thisisaryans" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-white/60 hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-white/60 hover:text-white transition-colors"><Facebook size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-8">Collections</h4>
            <ul className="space-y-4 text-white/50 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Living Room</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Dining Room</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Bedroom</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Office</a></li>
              <li><a href="#repair" className="hover:text-white transition-colors">Repair Service</a></li>
              <li><a href="#track-order" className="hover:text-white transition-colors">Track Your Order</a></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-8">Contact Us</h4>
            <ul className="space-y-4 text-white/50 text-sm">
              <li>
                <span className="block text-white/30 text-[10px] uppercase tracking-widest mb-1">Phone</span>
                <a href="tel:8742974384" className="hover:text-white transition-colors">+91 8742974384</a>
              </li>
              <li>
                <span className="block text-white/30 text-[10px] uppercase tracking-widest mb-1">Email</span>
                <a href="mailto:babu.sofa8742@gmail.com" className="hover:text-white transition-colors">babu.sofa8742@gmail.com</a>
              </li>
              <li>
                <span className="block text-white/30 text-[10px] uppercase tracking-widest mb-1">Instagram</span>
                <a href="https://instagram.com/thisisaryans" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">@thisisaryans</a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-8">Newsletter</h4>
            <p className="text-white/50 text-sm mb-6">Join our list for exclusive previews and design inspiration.</p>
            <form className="relative">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full bg-transparent border-b border-white/20 py-3 text-sm focus:outline-none focus:border-white transition-colors"
              />
              <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 text-white/60 hover:text-white">
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-widest text-white/30"
        >
          <p>© 2026 Akshara Furnitures. All rights reserved.</p>
          <div className="flex space-x-8">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
