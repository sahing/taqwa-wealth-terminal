import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import SectionHeading from '../brand/SectionHeading';

const FALLBACK = [
  { name: 'Mohammed Asif', designation: 'Business Owner · Dubai', photo_url: 'https://media.base44.com/images/public/69e46bc888dafa440169762a/1b0e15594_generated_e4f15cf7.png', quote: 'Taqwa Assets did not simply sell me property — they structured a generational amanah. Every document, every clause, reviewed through the lens of Shariah.', rating: 5, investment_category: 'Real Estate' },
  { name: 'Rizwana Sheikh', designation: 'Consultant · Hyderabad', photo_url: 'https://media.base44.com/images/public/69e46bc888dafa440169762a/881d00069_generated_9d3cddcf.png', quote: 'After years of uncertainty with conventional funds, I finally found clarity. No riba, no gharar — only real assets backed by real barakah.', rating: 5, investment_category: 'Gold' },
  { name: 'Yusuf Khan', designation: 'NRI Investor · London', photo_url: 'https://media.base44.com/images/public/69e46bc888dafa440169762a/d0da471ef_generated_4230b35d.png', quote: 'The transparency is unmatched. I receive quarterly reports with land records, RERA certificates, and profit distribution — all Shariah-certified.', rating: 5, investment_category: 'Land' },
];

export default function Testimonials() {
  const { data = [] } = useQuery({
    queryKey: ['testimonials-home'],
    queryFn: () => base44.entities.Testimonial.filter({ published: true }, '-created_date', 3).catch(() => []),
  });
  const items = data.length >= 3 ? data.slice(0, 3) : FALLBACK;

  return (
    <section className="py-28 md:py-36 bg-gradient-to-b from-onyx to-black">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <SectionHeading
          eyebrow="Voices of Trust"
          title="What our amanah-holders say."
          align="center"
        />

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((t, i) => (
            <motion.div
              key={t.id || t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass p-10 relative group hover:border-gold/30 transition-all duration-700"
            >
              <Quote className="absolute top-8 right-8 w-10 h-10 text-gold/10 group-hover:text-gold/30 transition-colors" />
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating || 5)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-gold text-gold" />)}
              </div>
              <p className="font-serif text-lg text-white/90 leading-relaxed italic">"{t.quote}"</p>
              <div className="hairline mt-8 mb-6" />
              <div className="flex items-center gap-4">
                {t.photo_url && <img src={t.photo_url} alt={t.name} className="w-12 h-12 object-cover rounded-full border border-gold/30" />}
                <div>
                  <div className="font-medium text-white text-sm">{t.name}</div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-gold/70 mt-0.5">{t.designation}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}