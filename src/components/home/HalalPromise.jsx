import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const PROMISES = {
  never: ['Riba (Interest)', 'Fraud or Black Money', 'Exploitative Dealings', 'Gambling & Speculation', 'False Promises'],
  always: ['Transparency', 'Fair Pricing', 'Legal Compliance', 'Accountability to Allah ﷻ', 'Sustainable Family Wealth'],
};

export default function HalalPromise() {
  return (
    <section className="py-28 md:py-36 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <img src="https://media.base44.com/images/public/69e46bc888dafa440169762a/0dc30bfa5_generated_444596be.png" alt="" className="w-full h-full object-cover opacity-[0.08]" />
      </div>
      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="glass-strong p-10 md:p-20 relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 hairline" />
          <div className="absolute bottom-0 inset-x-0 hairline" />

          <div className="max-w-3xl mb-16">
            <div className="text-[10px] uppercase tracking-[0.5em] text-gold mb-6">The Halal Promise</div>
            <h2 className="font-serif text-4xl md:text-6xl text-white font-light leading-[1.05]">
              We grow slow, steady, and halal —<br />
              <span className="italic gold-text-gradient">never haram.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-destructive/10 border border-destructive/30 flex items-center justify-center">
                  <X className="w-4 h-4 text-destructive" />
                </div>
                <span className="font-display text-sm tracking-[0.3em] text-white/80">WHAT WE AVOID</span>
              </div>
              <ul className="space-y-5">
                {PROMISES.never.map((n, i) => (
                  <motion.li
                    key={n}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-4 pb-5 border-b border-white/5 text-white/60 font-light"
                  >
                    <span className="text-[10px] text-white/30">0{i + 1}</span>
                    <span>{n}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
                  <Check className="w-4 h-4 text-gold" />
                </div>
                <span className="font-display text-sm tracking-[0.3em] text-gold">WHAT WE PROMOTE</span>
              </div>
              <ul className="space-y-5">
                {PROMISES.always.map((n, i) => (
                  <motion.li
                    key={n}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-4 pb-5 border-b border-gold/10 text-white font-light"
                  >
                    <span className="text-[10px] text-gold/50">0{i + 1}</span>
                    <span>{n}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}