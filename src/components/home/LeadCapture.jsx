import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useMutation } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Check, Loader2 } from 'lucide-react';
import GoldButton from '../brand/GoldButton';

export default function LeadCapture() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', interest: 'Real Estate', investment_range: '1L - 10L' });
  const [sent, setSent] = useState(false);

  const mut = useMutation({
    mutationFn: (data) => base44.entities.Lead.create({ ...data, source: 'Website', status: 'New' }),
    onSuccess: () => setSent(true),
  });

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    mut.mutate(form);
  };

  return (
    <section className="py-28 md:py-36">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-gold/20">
          <div className="p-10 md:p-16 bg-gradient-to-br from-onyx via-black to-onyx relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-gold/5 blur-3xl" />
            <div className="text-[10px] uppercase tracking-[0.4em] text-gold mb-6">Private Consultation</div>
            <h2 className="font-serif text-4xl md:text-5xl text-white font-light leading-tight">
              Begin your amanah<br />with a private<br /><span className="italic gold-text-gradient">wealth advisor.</span>
            </h2>
            <p className="mt-8 text-white/60 font-light leading-relaxed max-w-md">
              Schedule a complimentary 30-minute consultation. We'll assess your goals,
              discuss Shariah structures, and curate opportunities aligned with your values.
            </p>

            <div className="mt-12 space-y-4">
              {['Complimentary strategy call', 'Shariah-certified advisors', 'No obligation, full confidentiality'].map((b) => (
                <div key={b} className="flex items-center gap-3 text-sm text-white/70">
                  <Check className="w-4 h-4 text-gold" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-10 md:p-16 bg-onyx relative">
            {sent ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 rounded-full border border-gold/40 flex items-center justify-center mb-6">
                  <Check className="w-8 h-8 text-gold" />
                </div>
                <h3 className="font-serif text-3xl text-white">JazakAllah Khair</h3>
                <p className="mt-4 text-white/60 max-w-sm">Our advisor will reach out within 24 hours, inshaAllah.</p>
              </motion.div>
            ) : (
              <form onSubmit={submit} className="space-y-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.3em] text-white/50 mb-3">Full Name *</label>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-transparent border-b border-white/20 focus:border-gold pb-3 text-white placeholder-white/30 outline-none transition-colors" placeholder="As per Aadhaar" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.3em] text-white/50 mb-3">Phone (WhatsApp) *</label>
                  <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-transparent border-b border-white/20 focus:border-gold pb-3 text-white placeholder-white/30 outline-none transition-colors" placeholder="+91 98765 43210" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.3em] text-white/50 mb-3">Email</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-transparent border-b border-white/20 focus:border-gold pb-3 text-white placeholder-white/30 outline-none transition-colors" placeholder="you@example.com" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.3em] text-white/50 mb-3">Interest</label>
                    <select value={form.interest} onChange={(e) => setForm({ ...form, interest: e.target.value })}
                      className="w-full bg-transparent border-b border-white/20 focus:border-gold pb-3 text-white outline-none">
                      {['Real Estate', 'Land', 'Gold', 'Business', 'All'].map(o => <option key={o} value={o} className="bg-onyx">{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.3em] text-white/50 mb-3">Range</label>
                    <select value={form.investment_range} onChange={(e) => setForm({ ...form, investment_range: e.target.value })}
                      className="w-full bg-transparent border-b border-white/20 focus:border-gold pb-3 text-white outline-none">
                      {['1L - 10L', '10L - 50L', '50L - 1Cr', '1Cr+'].map(o => <option key={o} value={o} className="bg-onyx">{o}</option>)}
                    </select>
                  </div>
                </div>
                <div className="pt-6">
                  <GoldButton type="submit" disabled={mut.isPending} className="w-full" icon={!mut.isPending}>
                    {mut.isPending ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting</> : 'Request Consultation'}
                  </GoldButton>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}