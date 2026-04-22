import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { base44 } from '@/api/base44Client';

const FALLBACK = [
  { name: 'Mohammed Asif', designation: 'Business Owner · Dubai', photo_url: 'https://media.base44.com/images/public/69e46bc888dafa440169762a/1b0e15594_generated_e4f15cf7.png', quote: 'Taqwa Assets did not simply sell me property — they structured a generational amanah. Every document, every clause, reviewed through the lens of Shariah.', rating: 5, investment_category: 'Real Estate' },
  { name: 'Rizwana Sheikh', designation: 'Consultant · Hyderabad', photo_url: 'https://media.base44.com/images/public/69e46bc888dafa440169762a/881d00069_generated_9d3cddcf.png', quote: 'After years of uncertainty with conventional funds, I finally found clarity. No riba, no gharar — only real assets backed by real barakah.', rating: 5, investment_category: 'Gold' },
  { name: 'Yusuf Khan', designation: 'NRI Investor · London', photo_url: 'https://media.base44.com/images/public/69e46bc888dafa440169762a/d0da471ef_generated_4230b35d.png', quote: 'The transparency is unmatched. I receive quarterly reports with land records, RERA certificates, and profit distribution — all Shariah-certified.', rating: 5, investment_category: 'Land' },
];

export default function TestimonialsPage() {
  const { data = [] } = useQuery({
    queryKey: ['testimonials-all'],
    queryFn: () => base44.entities.Testimonial.filter({ published: true }, '-created_date').catch(() => []),
  });
  const items = data.length >= 3 ? data : FALLBACK;

  return (
    <>
      <section className="pt-40 pb-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-10 h-px bg-gold" />
            <span className="text-[10px] uppercase tracking-[0.5em] text-gold">Voices of Trust</span>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl text-white font-light max-w-4xl">
            Stories from our<br /><span className="italic gold-text-gradient">amanah-holders.</span>
          </h1>
        </div>
      </section>

      <section className="pb-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((t, i) => (
            <motion.div
              key={t.id || t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 2) * 0.1 }}
              className="glass p-10 md:p-12 hover:border-gold/30 transition-all duration-700 group"
            >
              <Quote className="w-10 h-10 text-gold/20 group-hover:text-gold/50 transition-colors mb-6" />
              <p className="font-serif text-xl md:text-2xl text-white/90 leading-relaxed italic">"{t.quote}"</p>
              <div className="hairline mt-10 mb-6" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {t.photo_url && <img src={t.photo_url} alt={t.name} className="w-14 h-14 object-cover rounded-full border border-gold/30" />}
                  <div>
                    <div className="font-medium text-white">{t.name}</div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-gold/70 mt-1">{t.designation}</div>
                  </div>
                </div>
                <div className="flex gap-1">{[...Array(t.rating || 5)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-gold text-gold" />)}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}