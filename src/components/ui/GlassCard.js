'use client';
import { motion } from 'framer-motion';

export default function GlassCard({ children, className = '', hoverEffect = true, ...props }) {
  return (
    <motion.div
      className={`glass-effect rounded-2xl p-6 ${hoverEffect ? 'glass-effect-hover' : ''} ${className}`}
      whileHover={hoverEffect ? { scale: 1.015, y: -4 } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      {...props}
    ) {
      {children}
    </motion.div>
  );
}