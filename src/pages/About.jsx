import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SectionHeading from '@/components/brand/SectionHeading';
import GoldButton from '@/components/brand/GoldButton';
import { BookOpen, Compass, Heart, Infinity as InfinityIcon } from 'lucide-react';

export default function About() {
  return (
    <>
      {/* Page Hero */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://media.base44.com/images/public/69e46bc888dafa440169762a/d940c2eb9_generated_7a962127.png" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-onyx/80" />
        </div>
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-10 h-px bg-gold" />
            <span className="text-[10px] uppercase tracking-[0.5em] text-gold">Our Mission</span>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl text-white font-light leading-[1.02] max-w-4xl">
            A house built on<br /><span className="italic gold-text-gradient">Taqwa —</span> not on hype.
          </h1>
        </div>
      </section>

      {/* Meaning of Taqwa */}
      <section className="py-28">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-16">
            <div className="md:col-span-2">
              <div className="text-[10px] uppercase tracking-[0.4em] text-gold mb-4">The Meaning</div>
              <div className="font-display text-7xl text-gold mb-2">تقوى</div>
              <div className="font-serif text-3xl text-white italic">Taq·wa</div>
              <div className="text-white/40 text-sm mt-2">/ˈtɑk.wɑː/ noun, Arabic</div>
            </div>
            <div className="md:col-span-3">
              <p className="text-xl md:text-2xl font-serif text-white/90 font-light leading-relaxed">
                Taqwa is the inner consciousness that stands between a believer and every action —
                the unwavering awareness that Allah ﷻ sees, hears, and weighs every transaction,
                every word, every intention.
              </p>
              <div className="hairline my-8" />
              <p className="text-white/60 font-light leading-relaxed">
                In the marketplace of wealth, Taqwa is the firewall that filters every rupee earned.
                It rejects riba, shuns gharar, and refuses the shortcut of haram gain — choosing instead
                the slower, steadier, more dignified path of blessed wealth. This is not a slogan.
                It is the spine of our firm.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why We Exist */}
      <section className="py-28 bg-gradient-to-b from-onyx via-black to-onyx">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <img src="https://media.base44.com/images/public/69e46bc888dafa440169762a/328224fb3_generated_07026239.png" alt="Muslim family" className="w-full aspect-[4/5] object-cover" />
            </div>
            <div>
              <SectionHeading eyebrow="Why We Exist" title="Because too many Muslim families have been forced to choose between faith and financial growth." />
              <p className="mt-8 text-white/60 font-light leading-relaxed">
                For decades, observant Muslim investors in India were trapped between two unacceptable
                options: compromise their deen to access conventional returns, or preserve their deen
                and watch inflation erode their savings.
              </p>
              <p className="mt-6 text-white/60 font-light leading-relaxed">
                Taqwa Assets was founded to end that false choice. We assemble world-class real estate,
                land, gold, and business opportunities — structured from the ground up to satisfy both
                Shariah scholars and sophisticated investors.
              </p>
              <div className="mt-10 pt-10 border-t border-gold/15 grid grid-cols-2 gap-8">
                <div>
                  <div className="font-serif text-4xl gold-text-gradient">2013</div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 mt-2">Founded in Hyderabad</div>
                </div>
                <div>
                  <div className="font-serif text-4xl gold-text-gradient">12+</div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 mt-2">Years of Taqwa</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Four Principles */}
      <section className="py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <SectionHeading eyebrow="Our Philosophy" title="Four principles. One purpose." align="center" />
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { Icon: BookOpen, t: 'Quran First', d: 'Every structure aligns with Quranic finance principles — no exceptions.' },
              { Icon: Compass, t: 'Ethical Compass', d: 'We decline opportunities that compromise ethics, regardless of profit.' },
              { Icon: Heart, t: 'Family Centered', d: 'We build multi-generational wealth, not short-term speculation.' },
              { Icon: InfinityIcon, t: 'Long-Term View', d: 'Barakah compounds over decades. Patience is our asset class.' },
            ].map((p, i) => (
              <motion.div
                key={p.t}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-10 group hover:border-gold/40 transition-all duration-700"
              >
                <p.Icon className="w-8 h-8 text-gold mb-6" />
                <h3 className="font-serif text-2xl text-white mb-4">{p.t}</h3>
                <p className="text-white/50 font-light text-sm leading-relaxed">{p.d}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <GoldButton to="/opportunities" size="lg">Explore Our Holdings</GoldButton>
          </div>
        </div>
      </section>
    </>
  );
}