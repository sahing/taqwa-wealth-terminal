import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import GoldButton from '@/components/brand/GoldButton';
import { Check } from 'lucide-react';

export default function Profile() {
  const { user } = useOutletContext();
  const [form, setForm] = useState({
    phone: user.phone || '',
    address: user.address || '',
    city: user.city || '',
    country: user.country || 'India',
  });
  const [saved, setSaved] = useState(false);

  const save = async (e) => {
    e.preventDefault();
    await base44.auth.updateMe(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <h1 className="font-serif text-4xl text-white mb-10 font-light">My <span className="italic gold-text-gradient">Profile</span></h1>

      <form onSubmit={save} className="glass p-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl">
        <div>
          <label className="block text-[10px] uppercase tracking-[0.3em] text-white/50 mb-2">Full Name</label>
          <input disabled value={user.full_name || ''} className="w-full bg-transparent border-b border-white/10 pb-2 text-white/60" />
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-[0.3em] text-white/50 mb-2">Email</label>
          <input disabled value={user.email} className="w-full bg-transparent border-b border-white/10 pb-2 text-white/60" />
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-[0.3em] text-white/50 mb-2">Phone</label>
          <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full bg-transparent border-b border-white/20 focus:border-gold pb-2 text-white outline-none" />
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-[0.3em] text-white/50 mb-2">City</label>
          <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="w-full bg-transparent border-b border-white/20 focus:border-gold pb-2 text-white outline-none" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-[10px] uppercase tracking-[0.3em] text-white/50 mb-2">Address</label>
          <textarea rows="2" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="w-full bg-transparent border-b border-white/20 focus:border-gold pb-2 text-white outline-none resize-none" />
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-[0.3em] text-white/50 mb-2">Country</label>
          <input value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} className="w-full bg-transparent border-b border-white/20 focus:border-gold pb-2 text-white outline-none" />
        </div>
        <div className="md:col-span-2 flex items-center justify-between pt-4">
          {saved && <span className="flex items-center gap-2 text-emerald text-sm"><Check className="w-4 h-4" /> Saved</span>}
          <GoldButton type="submit" className="ml-auto">Save Changes</GoldButton>
        </div>
      </form>
    </div>
  );
}