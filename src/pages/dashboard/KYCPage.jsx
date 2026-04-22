import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Upload, Check, Loader2, ShieldCheck } from 'lucide-react';
import GoldButton from '@/components/brand/GoldButton';

export default function KYCPage() {
  const { user } = useOutletContext();
  const qc = useQueryClient();
  const [form, setForm] = useState({ full_name: '', pan_number: '', aadhaar_number: '', passport_number: '', address: '' });
  const [files, setFiles] = useState({ pan: null, aadhaar: null, passport: null });
  const [uploading, setUploading] = useState(false);

  const { data: kyc = [] } = useQuery({
    queryKey: ['kyc', user.email],
    queryFn: () => base44.entities.KYC.filter({ user_email: user.email }),
  });
  const existing = kyc[0];

  useEffect(() => {
    if (existing) setForm({
      full_name: existing.full_name || user.full_name || '',
      pan_number: existing.pan_number || '',
      aadhaar_number: existing.aadhaar_number || '',
      passport_number: existing.passport_number || '',
      address: existing.address || '',
    });
    else setForm(f => ({ ...f, full_name: user.full_name || '' }));
  }, [existing, user]);

  const mut = useMutation({
    mutationFn: async (data) => {
      if (existing) return base44.entities.KYC.update(existing.id, data);
      return base44.entities.KYC.create({ ...data, user_email: user.email, status: 'Pending Review' });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['kyc', user.email] }),
  });

  const submit = async (e) => {
    e.preventDefault();
    setUploading(true);
    const urls = {};
    for (const [key, file] of Object.entries(files)) {
      if (file) {
        const res = await base44.integrations.Core.UploadFile({ file });
        urls[`${key}_document_url`] = res.file_url;
      }
    }
    await mut.mutateAsync({ ...form, ...urls, status: 'Pending Review' });
    setUploading(false);
  };

  if (existing?.status === 'Approved') {
    return (
      <div>
        <h1 className="font-serif text-4xl text-white mb-10 font-light">KYC <span className="italic gold-text-gradient">Verified</span></h1>
        <div className="glass-strong p-16 text-center">
          <div className="w-20 h-20 mx-auto rounded-full border border-emerald flex items-center justify-center mb-6">
            <ShieldCheck className="w-8 h-8 text-emerald" />
          </div>
          <h3 className="font-serif text-3xl text-white">MashaAllah — Verified</h3>
          <p className="text-white/60 mt-4">Your KYC was approved on {new Date(existing.updated_date).toLocaleDateString()}.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-serif text-4xl text-white mb-4 font-light">KYC <span className="italic gold-text-gradient">Submission</span></h1>
      <p className="text-white/50 mb-10">Secure · Encrypted · Required for investments above ₹1,00,000</p>

      {existing?.status === 'Pending Review' && (
        <div className="glass border-gold/30 p-6 mb-10 flex items-center gap-4">
          <Loader2 className="w-5 h-5 text-gold animate-spin" />
          <span className="text-white">Your KYC is under review. Typical turnaround: 24 hours.</span>
        </div>
      )}

      <form onSubmit={submit} className="glass p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="block text-[10px] uppercase tracking-[0.3em] text-white/50 mb-2">Full Name (as per PAN)</label>
          <input value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} className="w-full bg-transparent border-b border-white/20 focus:border-gold pb-2 text-white outline-none" />
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-[0.3em] text-white/50 mb-2">PAN Number</label>
          <input value={form.pan_number} onChange={(e) => setForm({ ...form, pan_number: e.target.value.toUpperCase() })} className="w-full bg-transparent border-b border-white/20 focus:border-gold pb-2 text-white outline-none" />
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-[0.3em] text-white/50 mb-2">Aadhaar Number</label>
          <input value={form.aadhaar_number} onChange={(e) => setForm({ ...form, aadhaar_number: e.target.value })} className="w-full bg-transparent border-b border-white/20 focus:border-gold pb-2 text-white outline-none" />
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-[0.3em] text-white/50 mb-2">Passport (Optional)</label>
          <input value={form.passport_number} onChange={(e) => setForm({ ...form, passport_number: e.target.value })} className="w-full bg-transparent border-b border-white/20 focus:border-gold pb-2 text-white outline-none" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-[10px] uppercase tracking-[0.3em] text-white/50 mb-2">Address</label>
          <textarea rows="2" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="w-full bg-transparent border-b border-white/20 focus:border-gold pb-2 text-white outline-none resize-none" />
        </div>

        {/* File uploads */}
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
          {[{ k: 'pan', l: 'PAN Document' }, { k: 'aadhaar', l: 'Aadhaar Document' }, { k: 'passport', l: 'Passport (opt)' }].map(({ k, l }) => (
            <label key={k} className="glass-strong p-5 cursor-pointer hover:border-gold/40 transition-colors flex items-center gap-3">
              <input type="file" className="hidden" onChange={(e) => setFiles({ ...files, [k]: e.target.files[0] })} />
              {files[k] ? <Check className="w-4 h-4 text-emerald" /> : <Upload className="w-4 h-4 text-gold" />}
              <div className="flex-1">
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/40">{l}</div>
                <div className="text-xs text-white truncate">{files[k]?.name || 'Upload PDF / Image'}</div>
              </div>
            </label>
          ))}
        </div>

        <div className="md:col-span-2 flex justify-end pt-6">
          <GoldButton type="submit" disabled={uploading || mut.isPending} size="lg" icon={!uploading}>
            {uploading ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting</> : 'Submit KYC for Review'}
          </GoldButton>
        </div>
      </form>
    </div>
  );
}