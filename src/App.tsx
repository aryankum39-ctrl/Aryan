/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedProducts from './components/FeaturedProducts';
import FestiveOfferBanner from './components/FestiveOfferBanner';
import SofaCustomizer from './components/SofaCustomizer';
import SofaRepair from './components/SofaRepair';
import ProductGallery from './components/ProductGallery';
import OrderTracking from './components/OrderTracking';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import { CartProvider } from './context/CartContext';
import { motion } from 'motion/react';

/**
 * Akshara Furnitures - Main Application Component
 * 
 * This component serves as the layout wrapper for the high-end furniture showcase.
 * It includes a sticky navigation, hero section, featured products, a filterable gallery,
 * and a comprehensive footer.
 * 
 * Design Aesthetic: Minimalist, Elegant, Professional.
 * Palette: Deep Charcoals, Warm Wood Tones, Soft Off-Whites.
 */
export default function App() {
  return (
    <CartProvider>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="min-h-screen flex flex-col"
      >
        {/* Sticky Navigation Bar */}
        <Navbar />

        <main className="flex-grow">
          {/* Hero Section: High-end feel with CTA */}
          <Hero />

          {/* Featured Products: Showcasing core categories */}
          <FeaturedProducts />

          {/* Special Festive Season Artisan Celebration Banner */}
          <FestiveOfferBanner />

          {/* Customization Section: Bespoke sofa design */}
          <SofaCustomizer />

          {/* Repair Section: Camera-based condition assessment */}
          <SofaRepair />

          {/* Product Gallery: JavaScript-based filtering by category */}
          <ProductGallery />

          {/* Order Tracking: Check status timeline for bespoke orders */}
          <OrderTracking />

          {/* Brand Philosophy / Quote Section */}
          <section className="py-32 bg-charcoal text-white text-center">
            <div className="max-w-4xl mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="text-xs font-bold uppercase tracking-[0.4em] text-white/40 mb-8 block">Our Philosophy</span>
                <blockquote className="text-3xl md:text-5xl font-serif italic leading-tight mb-12">
                  "Design is not just what it looks like and feels like. Design is how it works."
                </blockquote>
                <div className="w-12 h-[1px] bg-wood mx-auto"></div>
              </motion.div>
            </div>
          </section>
        </main>

        {/* Footer Section: Contact and navigation */}
        <Footer />

        {/* Cart Drawer */}
        <CartDrawer />
      </motion.div>
    </CartProvider>
  );
}
