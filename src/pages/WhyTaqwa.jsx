import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Scale, Gem, Users, FileCheck, Home, Leaf } from 'lucide-react';
import SectionHeading from '@/components/brand/SectionHeading';

const PILLARS = [
  { Icon: Shield, title: 'Built on Taqwa, Not Hype', desc: 'Every decision is weighed against divine accountability before market trends. Barakah is our metric — not just basis points.' },
  { Icon: Scale, title: 'Zero Riba. Zero Compromise.', desc: 'Pure profit-sharing (Musharakah) and asset-lease (Ijarah) structures. No interest-bearing instruments under any circumstance.' },
  { Icon: Gem, title: 'Tangible Assets Only', desc: 'Real land. Real buildings. Real gold. Real businesses. Every rupee is backed by verifiable physical ownership.' },
  { Icon: Users, title: 'Investor-First Ethics', desc: 'Your capital is an amanah (trust). Full quarterly disclosure of every holding, every fee, every outcome.' },
  { Icon: FileCheck, title: 'Legal Transparency', desc: 'RERA-aligned registrations, title-verified assets, and notarized agreements on every transaction.' },
  { Icon: Home, title: 'Family Wealth Focused', desc: 'Generational structures with inheritance planning built-in. We serve families — not just portfolios.' },
  { Icon: Leaf, title: 'Sustainable Growth', desc: 'We reject pump-and-dump speculation. We compound slowly, ethically, and durably across decades.' },
];

export default function WhyTaqwa() {
  return (
    <>
      <section className="pt-40 pb-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-10 h-px bg-gold" />
            <span className="text-[10px] uppercase tracking-[0.5em] text-gold">The Taqwa Difference</span>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl text-white font-light leading-[1.02] max-w-4xl">
            Seven pillars that separate<br /><span className="italic gold-text-gradient">sacred wealth</span> from conventional finance.
          </h1>
        </div>
      </section>

      <section className="pb-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gold/10">
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-onyx p-10 md:p-12 group hover:bg-gradient-to-br hover:from-onyx hover:to-gold/5 transition-all duration-700 relative"
              >
                <div className="flex items-start justify-between mb-8">
                  <div className="w-14 h-14 border border-gold/30 flex items-center justify-center group-hover:bg-gold group-hover:text-onyx text-gold transition-all duration-500">
                    <p.Icon className="w-5 h-5" />
                  </div>
                  <div className="font-serif text-5xl text-gold/10 group-hover:text-gold/40 transition-colors">0{i + 1}</div>
                </div>
                <h3 className="font-serif text-2xl text-white mb-4 leading-tight">{p.title}</h3>
                <p className="text-white/50 font-light text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}