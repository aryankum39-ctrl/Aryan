import React from 'react';
import { motion, TargetAndTransition, VariantLabels } from 'motion/react';

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: 'fade-up' | 'fade-in' | 'fade-left' | 'fade-right' | 'scale-up';
  delay?: number;
  duration?: number;
  yOffset?: number;
  xOffset?: number;
  className?: string;
  viewportMargin?: string;
  once?: boolean;
}

export const smoothEase = [0.22, 1, 0.36, 1] as const;

export default function ScrollReveal({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 0.7,
  yOffset = 28,
  xOffset = 24,
  className = '',
  viewportMargin = '-60px',
  once = true,
}: ScrollRevealProps) {
  let initial = {};

  switch (variant) {
    case 'fade-up':
      initial = { opacity: 0, y: yOffset };
      break;
    case 'fade-in':
      initial = { opacity: 0 };
      break;
    case 'fade-left':
      initial = { opacity: 0, x: xOffset };
      break;
    case 'fade-right':
      initial = { opacity: 0, x: -xOffset };
      break;
    case 'scale-up':
      initial = { opacity: 0, scale: 0.95 };
      break;
    default:
      initial = { opacity: 0, y: yOffset };
  }

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once, margin: viewportMargin }}
      transition={{
        duration,
        delay,
        ease: smoothEase,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
