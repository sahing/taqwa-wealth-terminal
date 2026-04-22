import React from 'react';
import { motion } from 'framer-motion';
import { FileCheck, ScrollText, Stamp, Search, Gavel, Landmark } from 'lucide-react';
import SectionHeading from '@/components/brand/SectionHeading';

const ITEMS = [
  { Icon: ScrollText, t: 'Proper Agreements', d: 'Every investment backed by Musharakah, Ijarah, or Murabaha agreements drafted by specialized Islamic finance lawyers.' },
  { Icon: Search, t: 'Title Verification', d: 'Multi-layered title search, encumbrance certificates, and chain-of-ownership audits before every acquisition.' },
  { Icon: Stamp, t: 'Registration Support', d: 'End-to-end sub-registrar coordination, stamp duty management, and handover facilitation.' },
  { Icon: FileCheck, t: 'Transparent Documentation', d: 'Complete document vault accessible in your investor dashboard. No hidden clauses, ever.' },
  { Icon: Gavel, t: 'Legal Due Diligence', d: 'External legal opinions on every syndication, including Shariah Advisory Board concurrence.' },
  { Icon: Landmark, t: 'RERA Aligned', d: 'All real estate holdings registered with respective state RERA authorities where applicable.' },
];

export default function Legal() {
  return (
    <>
      <section className="pt-40 pb-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-10 h-px bg-gold" />
            <span className="text-[10px] uppercase tracking-[0.5em] text-gold">Legal & Compliance</span>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl text-white font-light leading-[1.02] max-w-4xl">
            Transparency is not a policy —<br /><span className="italic gold-text-gradient">it is a creed.</span>
          </h1>
          <p className="mt-8 text-white/60 font-light max-w-2xl">
            We operate on the principle that an investor who reads every document is the investor we
            deserve. Our compliance framework is built for radical disclosure.
          </p>
        </div>
      </section>

      <section className="pb-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ITEMS.map((i, idx) => (
              <motion.div
                key={i.t}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="glass p-10 hover:border-gold/40 transition-all duration-500"
              >
                <i.Icon className="w-8 h-8 text-gold mb-6" />
                <h3 className="font-serif text-2xl text-white mb-4">{i.t}</h3>
                <p className="text-white/50 font-light text-sm leading-relaxed">{i.d}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 glass-strong p-10 md:p-16">
            <div className="text-[10px] uppercase tracking-[0.4em] text-gold mb-6">Shariah Advisory Board</div>
            <h3 className="font-serif text-3xl text-white mb-6 max-w-3xl">Every structure passes the double filter — Indian law and Islamic jurisprudence.</h3>
            <p className="text-white/60 font-light leading-relaxed max-w-3xl">
              Our Shariah Advisory Board comprises certified scholars from AAOIFI-accredited institutions.
              No opportunity is listed without unanimous fatwa concurrence. Certificates of compliance
              accompany every investment memorandum.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}