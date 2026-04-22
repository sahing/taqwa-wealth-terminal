import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Scale, Gem, Users, FileCheck, Home, Leaf } from 'lucide-react';
import SectionHeading from '../brand/SectionHeading';

const PILLARS = [
  { Icon: Shield, title: 'Built on Taqwa, Not Hype', desc: 'Every decision is weighed against divine accountability before market trends.' },
  { Icon: Scale, title: 'Zero Riba. Zero Compromise.', desc: 'Pure profit-sharing and asset-backed contracts. No interest. No ambiguity.' },
  { Icon: Gem, title: 'Tangible Assets Only', desc: 'Real land, real buildings, real gold. No speculation, no derivatives.' },
  { Icon: Users, title: 'Investor-First Ethics', desc: 'Your trust is an amanah. We report with radical transparency.' },
  { Icon: FileCheck, title: 'Legal Transparency', desc: 'RERA-aligned titles, verified agreements, and registered documentation.' },
  { Icon: Home, title: 'Family Wealth Focused', desc: 'Generational assets structured for inheritance and barakah.' },
];

export default function WhyUs() {
  return (
    <section className="py-28 md:py-36 relative">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-end mb-20">
          <SectionHeading
            eyebrow="The Taqwa Doctrine"
            title="Wealth guided by conscience. Protected by law."
          />
          <p className="text-white/60 font-light leading-relaxed md:pb-2">
            We build slow, steady, and halal — never haram. Our discipline is rooted in
            six centuries of Islamic finance jurisprudence, executed with modern precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gold/10">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="group bg-onyx p-10 hover:bg-gradient-to-br hover:from-onyx hover:to-gold/5 transition-all duration-700 relative"
            >
              <div className="absolute top-0 left-0 h-px w-0 group-hover:w-full bg-gradient-to-r from-gold to-transparent transition-all duration-1000" />
              <div className="w-12 h-12 border border-gold/30 flex items-center justify-center mb-8 group-hover:border-gold group-hover:bg-gold/5 transition-all">
                <p.Icon className="w-5 h-5 text-gold" />
              </div>
              <div className="text-[9px] uppercase tracking-[0.3em] text-gold/60 mb-3">0{i + 1}</div>
              <h3 className="font-serif text-2xl text-white leading-tight mb-4">{p.title}</h3>
              <p className="text-sm text-white/50 font-light leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}