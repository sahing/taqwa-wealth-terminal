import React from 'react';
import { motion } from 'framer-motion';
import Counter from '../brand/Counter';

const STATS = [
  { label: 'Capital Deployed', value: 450, suffix: 'Cr+', prefix: '₹' },
  { label: 'Families Empowered', value: 1200, suffix: '+' },
  { label: 'Active Projects', value: 28, suffix: '' },
  { label: 'NRI Investors', value: 340, suffix: '+' },
];

export default function TrustCounters() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <img src="https://media.base44.com/images/public/69e46bc888dafa440169762a/d943f52a6_generated_0429f0fb.png" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-onyx/85" />
      </div>
      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-gold" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-gold">Trust in Numbers</span>
            <span className="w-8 h-px bg-gold" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-white font-light">A track record measured in <span className="italic gold-text-gradient">barakah.</span></h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gold/20">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-onyx/80 p-10 text-center backdrop-blur-sm"
            >
              <div className="font-serif text-5xl md:text-6xl gold-text-gradient font-light">
                <Counter to={s.value} prefix={s.prefix} suffix={s.suffix} />
              </div>
              <div className="mt-4 text-[10px] uppercase tracking-[0.3em] text-white/60">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}