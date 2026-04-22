import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ShieldCheck, PlayCircle } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import GoldButton from '../brand/GoldButton';

const WA_NUMBER = '919876543210';
const WA_MSG = encodeURIComponent('Assalamu Alaikum, I want halal investment details.');

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://media.base44.com/images/public/69e46bc888dafa440169762a/f65db5dfd_generated_717d372b.png"
          alt="Luxury skyline at golden hour"
          className="w-full h-full object-cover animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-onyx/85 via-onyx/50 to-onyx" />
        <div className="absolute inset-0 bg-gradient-to-r from-onyx/80 via-transparent to-onyx/40" />
      </div>

      {/* Floating Halal Certificate */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute top-32 right-8 lg:right-20 z-10 hidden md:block"
      >
        <div className="glass-strong w-44 h-44 rounded-full flex flex-col items-center justify-center text-center p-6 border border-gold/30 shadow-2xl shadow-gold/10">
          <ShieldCheck className="w-7 h-7 text-gold mb-2" />
          <div className="text-[8px] uppercase tracking-[0.3em] text-white/60">Certified</div>
          <div className="font-serif text-xl text-white leading-tight mt-1">100%</div>
          <div className="text-[9px] uppercase tracking-[0.25em] text-gold">Shariah Compliant</div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-10 pb-20 lg:pb-32 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="w-10 h-px bg-gold" />
          <span className="text-[10px] uppercase tracking-[0.5em] text-gold font-sans">A Sovereign Ethical Wealth Platform</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl font-light leading-[0.95] text-white max-w-5xl"
        >
          Halal Wealth.<br/>
          Legal Security.<br/>
          <span className="gold-text-gradient italic">Long-Term Trust.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-8 text-base md:text-lg text-white/60 font-light max-w-2xl leading-relaxed"
        >
          Taqwa Assets architects sustainable family wealth through tangible,
          Shariah-compliant investments across premium real estate, land, gold,
          and ethical businesses — built on the bedrock of faith and law.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4"
        >
          <GoldButton to="/opportunities" size="lg">Explore Opportunities</GoldButton>
          <GoldButton href={`https://wa.me/${WA_NUMBER}?text=${WA_MSG}`} variant="outline" size="lg">
            WhatsApp Now
          </GoldButton>
          <button
            onClick={() => base44.auth.redirectToLogin(window.location.origin + '/dashboard')}
            className="group flex items-center gap-3 text-white/70 hover:text-gold transition-colors pl-2"
          >
            <span className="text-[11px] uppercase tracking-[0.3em]">Investor Login</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
        </motion.div>

        {/* Bottom KPI strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 pt-10 border-t border-gold/15 max-w-4xl"
        >
          {[
            { k: '₹450Cr+', v: 'Assets Under Advisory' },
            { k: '1,200+', v: 'Muslim Families Served' },
            { k: '0%', v: 'Riba. Ever.' },
            { k: '12+', v: 'Years of Taqwa' },
          ].map((i) => (
            <div key={i.v}>
              <div className="font-serif text-2xl md:text-3xl text-white">{i.k}</div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-white/40 mt-1">{i.v}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 right-8 hidden lg:flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-white/40">
        <span>Scroll</span>
        <span className="w-12 h-px bg-gold/40" />
      </div>
    </section>
  );
}