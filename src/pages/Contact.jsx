import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Phone, Mail, MapPin, Clock, Check } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import GoldButton from '@/components/brand/GoldButton';

const WA_NUMBER = '919876543210';
const WA_MSG = encodeURIComponent('Assalamu Alaikum, I want halal investment details.');

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', notes: '' });
  const [sent, setSent] = useState(false);
  const mut = useMutation({
    mutationFn: (d) => base44.entities.Lead.create({ ...d, source: 'Website', status: 'New', interest: 'General Inquiry' }),
    onSuccess: () => setSent(true),
  });

  return (
    <>
      <section className="pt-40 pb-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-10 h-px bg-gold" />
            <span className="text-[10px] uppercase tracking-[0.5em] text-gold">Private Consultation</span>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl text-white font-light max-w-4xl">
            Begin a <span className="italic gold-text-gradient">conversation</span><br /> rooted in trust.
          </h1>
        </div>
      </section>

      <section className="pb-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact details */}
          <div>
            <div className="space-y-10">
              {[
                { Icon: Phone, t: 'Call us', v: '+91 98765 43210', sub: 'Mon–Sat, 10:00 – 19:00 IST', href: 'tel:+919876543210' },
                { Icon: Mail, t: 'Email', v: 'invest@taqwaassets.com', sub: 'Response within 6 hours', href: 'mailto:invest@taqwaassets.com' },
                { Icon: MapPin, t: 'Office', v: 'Banjara Hills, Hyderabad', sub: 'Road No. 12, Telangana 500034' },
                { Icon: Clock, t: 'Hours', v: 'Mon – Sat · 10:00 – 19:00', sub: 'Friday prayer break: 13:00 – 14:30' },
              ].map((c) => (
                <div key={c.t} className="flex items-start gap-6 pb-10 border-b border-gold/10 last:border-0">
                  <div className="w-12 h-12 border border-gold/30 flex items-center justify-center shrink-0">
                    <c.Icon className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.3em] text-gold mb-2">{c.t}</div>
                    {c.href ? <a href={c.href} className="font-serif text-2xl text-white hover:text-gold transition-colors">{c.v}</a> : <div className="font-serif text-2xl text-white">{c.v}</div>}
                    <div className="text-sm text-white/50 font-light mt-1">{c.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex gap-3">
              <GoldButton href={`https://wa.me/${WA_NUMBER}?text=${WA_MSG}`} size="md">WhatsApp</GoldButton>
              <GoldButton href="tel:+919876543210" variant="outline" size="md">Call Now</GoldButton>
            </div>

            {/* Map placeholder */}
            <div className="mt-12 aspect-[16/9] relative overflow-hidden glass">
              <iframe
                title="Taqwa Assets Office"
                src="https://www.openstreetmap.org/export/embed.html?bbox=78.4208%2C17.4156%2C78.4408%2C17.4356&layer=mapnik&marker=17.4256%2C78.4308"
                className="w-full h-full grayscale opacity-80"
                style={{ filter: 'invert(1) hue-rotate(180deg) grayscale(0.6) contrast(0.9)' }}
              />
            </div>
          </div>

          {/* Form */}
          <div className="glass-strong p-10 md:p-12 self-start">
            {sent ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 mx-auto rounded-full border border-gold/40 flex items-center justify-center mb-6">
                  <Check className="w-8 h-8 text-gold" />
                </div>
                <h3 className="font-serif text-3xl text-white">JazakAllah Khair</h3>
                <p className="mt-4 text-white/60">We'll be in touch within 24 hours, inshaAllah.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); mut.mutate(form); }} className="space-y-6">
                <div className="text-[10px] uppercase tracking-[0.4em] text-gold mb-2">Send a Message</div>
                <h3 className="font-serif text-3xl text-white">Private inquiry.</h3>
                <div className="hairline !my-6" />
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.3em] text-white/50 mb-2">Name *</label>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-transparent border-b border-white/20 focus:border-gold pb-2 text-white outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.3em] text-white/50 mb-2">Phone *</label>
                  <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full bg-transparent border-b border-white/20 focus:border-gold pb-2 text-white outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.3em] text-white/50 mb-2">Email</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full bg-transparent border-b border-white/20 focus:border-gold pb-2 text-white outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.3em] text-white/50 mb-2">Message</label>
                  <textarea rows="4" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="w-full bg-transparent border-b border-white/20 focus:border-gold pb-2 text-white outline-none resize-none" />
                </div>
                <GoldButton type="submit" className="w-full" size="md">Send Message</GoldButton>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}