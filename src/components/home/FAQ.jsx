import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import SectionHeading from '../brand/SectionHeading';

const FAQS = [
  { q: 'How is Taqwa Assets different from conventional investment firms?', a: 'Every structure is reviewed by our Shariah Advisory Board. We deal exclusively in tangible assets (real estate, gold, productive businesses) with zero interest-bearing instruments, derivatives, or speculative positions.' },
  { q: 'Are my investments asset-backed?', a: 'Yes. 100% of our portfolios are backed by verifiable physical assets — registered land titles, constructed property, allocated gold, or equity in halal operating businesses. Documentation is provided quarterly.' },
  { q: 'What is the minimum investment?', a: 'Our entry opportunities begin at ₹1,00,000. Premium real estate syndicates typically start at ₹10,00,000. Custom portfolios are available for HNI and NRI investors.' },
  { q: 'How do NRIs invest with Taqwa Assets?', a: 'We support NRE/NRO account routing, FEMA-compliant structuring, and end-to-end documentation remotely. Our NRI desk serves clients across UAE, UK, US, and GCC.' },
  { q: 'How are profits distributed — Shariah compliant?', a: 'We use Musharakah (partnership) and Ijarah (lease) structures. Profits are distributed proportional to equity contribution. Losses, if any, are also shared proportionately — never guaranteed returns (which would constitute riba).' },
  { q: 'Can I exit an investment early?', a: 'Real estate and land holdings have defined lock-in periods (typically 24-60 months). Gold holdings are liquid. Early exit options exist via secondary transfer, subject to buyer availability.' },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="py-28 md:py-36">
      <div className="max-w-[1100px] mx-auto px-6 lg:px-10">
        <SectionHeading eyebrow="Frequent Inquiries" title="Answers rooted in clarity." align="center" />
        <div className="mt-16">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="border-b border-gold/10">
                <button onClick={() => setOpen(isOpen ? -1 : i)} className="w-full py-7 flex items-center justify-between gap-6 text-left group">
                  <span className={`font-serif text-xl md:text-2xl transition-colors ${isOpen ? 'text-gold' : 'text-white group-hover:text-gold'}`}>{f.q}</span>
                  <span className={`w-10 h-10 shrink-0 rounded-full border flex items-center justify-center transition-all ${isOpen ? 'bg-gold text-onyx border-gold' : 'border-gold/30 text-gold'}`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4 }} className="overflow-hidden">
                      <p className="pb-8 text-white/60 font-light leading-relaxed pr-16">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}