import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '../brand/SectionHeading';

const CATEGORIES = [
  { name: 'Real Estate', tag: 'Tangible · Appreciating', img: 'https://media.base44.com/images/public/69e46bc888dafa440169762a/209b17371_generated_f5712da0.png', to: '/opportunities?cat=Real Estate' },
  { name: 'Land & Plots', tag: 'Sovereign · Scarce', img: 'https://media.base44.com/images/public/69e46bc888dafa440169762a/cc940e927_generated_fe57265f.png', to: '/opportunities?cat=Land' },
  { name: 'Gold', tag: 'Eternal · Liquid', img: 'https://media.base44.com/images/public/69e46bc888dafa440169762a/e535f58b0_generated_deb73cf0.png', to: '/opportunities?cat=Gold' },
  { name: 'Halal Business', tag: 'Productive · Ethical', img: 'https://media.base44.com/images/public/69e46bc888dafa440169762a/1011f2d27_generated_96e3a311.png', to: '/opportunities?cat=Business' },
];

export default function AssetCategories() {
  return (
    <section className="py-28 md:py-36 bg-gradient-to-b from-onyx via-black to-onyx relative">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <SectionHeading
          eyebrow="Asset Categories"
          title="Four pillars of halal wealth."
          subtitle="Each category is vetted by our Shariah Advisory Board and structured as tangible, lawful ownership."
          align="center"
        />

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
            >
              <Link to={c.to} className="group block relative overflow-hidden aspect-[3/4]">
                <img src={c.img} alt={c.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/40 to-transparent" />
                <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/40 transition-colors duration-700" />

                <div className="absolute inset-0 p-7 flex flex-col justify-end">
                  <div className="text-[9px] uppercase tracking-[0.35em] text-gold mb-2">{c.tag}</div>
                  <h3 className="font-serif text-3xl text-white leading-tight">{c.name}</h3>
                  <div className="mt-6 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/60 group-hover:text-gold transition-colors">
                    <span>Explore</span>
                    <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    <span className="flex-1 h-px bg-current opacity-30" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}