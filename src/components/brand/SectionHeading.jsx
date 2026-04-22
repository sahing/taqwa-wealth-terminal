import React from 'react';
import { motion } from 'framer-motion';

export default function SectionHeading({ eyebrow, title, subtitle, align = 'left', light = false }) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';
  return (
    <div className={`max-w-3xl ${alignClass}`}>
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`flex items-center gap-3 mb-6 ${align === 'center' ? 'justify-center' : ''}`}
        >
          <span className="w-8 h-px bg-gold" />
          <span className="text-[10px] uppercase tracking-[0.4em] text-gold font-sans">{eyebrow}</span>
          <span className="w-8 h-px bg-gold" />
        </motion.div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className={`font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05] ${light ? 'text-onyx' : 'text-white'}`}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className={`mt-6 text-base md:text-lg leading-relaxed font-light ${light ? 'text-zinc-700' : 'text-white/60'}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}