import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Loader2, CreditCard } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import GoldButton from '../brand/GoldButton';

export default function InvestModal({ open, onClose, project }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ amount: '', name: '', phone: '', email: '' });
  const [user, setUser] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!open) return;
    base44.auth.me().then((u) => {
      setUser(u);
      setForm(f => ({ ...f, name: u.full_name || '', email: u.email || '', phone: u.phone || '' }));
    }).catch(() => setUser(null));
  }, [open]);

  useEffect(() => {
    if (open) { setStep(1); setDone(false); setForm(f => ({ ...f, amount: project?.min_investment || '' })); }
  }, [open, project]);

  const submit = async () => {
    setProcessing(true);

    if (!user) {
      base44.auth.redirectToLogin(window.location.href);
      return;
    }

    // Simulated Razorpay flow (creates investment + payment record)
    const investment = await base44.entities.Investment.create({
      user_email: user.email,
      project_id: project.id,
      project_title: project.title,
      amount: Number(form.amount),
      status: 'Pending',
      start_date: new Date().toISOString().slice(0, 10),
    });

    await base44.entities.Payment.create({
      user_email: user.email,
      investment_id: investment.id,
      project_title: project.title,
      amount: 10000,
      type: 'Booking Token',
      status: 'Success',
      transaction_id: `TXN${Date.now()}`,
      method: 'Razorpay',
    });

    setProcessing(false);
    setDone(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-onyx/90 backdrop-blur-xl" onClick={onClose} />
          <motion.div
            initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
            className="relative glass-strong w-full max-w-lg p-10 border border-gold/20"
          >
            <button onClick={onClose} className="absolute top-6 right-6 text-white/50 hover:text-gold">
              <X className="w-5 h-5" />
            </button>

            {done ? (
              <div className="text-center py-8">
                <div className="w-20 h-20 mx-auto rounded-full border border-gold flex items-center justify-center mb-6">
                  <Check className="w-8 h-8 text-gold" />
                </div>
                <h3 className="font-serif text-3xl text-white">MashaAllah!</h3>
                <p className="mt-4 text-white/60 font-light">Your reservation for <span className="text-gold">{project.title}</span> is confirmed. Our team will reach out within 24 hours for documentation.</p>
                <GoldButton to="/dashboard" className="mt-8" size="md">View in Portfolio</GoldButton>
              </div>
            ) : (
              <>
                <div className="text-[10px] uppercase tracking-[0.4em] text-gold mb-3">Reserve Your Share</div>
                <h3 className="font-serif text-3xl text-white mb-2">{project.title}</h3>
                <p className="text-sm text-white/50">Booking token: ₹10,000 · Refundable</p>
                <div className="hairline my-6" />

                <div className="space-y-5">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.3em] text-white/50 mb-2">Investment Amount (₹)</label>
                    <input type="number" min={project.min_investment || 0} value={form.amount}
                      onChange={(e) => setForm({ ...form, amount: e.target.value })}
                      className="w-full bg-transparent border-b border-white/20 focus:border-gold pb-2 text-white text-xl font-serif outline-none" />
                    <p className="text-[10px] text-white/40 mt-1">Minimum: ₹{(project.min_investment || 0).toLocaleString('en-IN')}</p>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.3em] text-white/50 mb-2">Name</label>
                    <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-transparent border-b border-white/20 focus:border-gold pb-2 text-white outline-none" />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.3em] text-white/50 mb-2">Phone</label>
                    <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-transparent border-b border-white/20 focus:border-gold pb-2 text-white outline-none" />
                  </div>
                </div>

                <div className="mt-8 glass p-4 flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-gold" />
                  <div className="text-xs text-white/60">Secure payment via Razorpay · UPI, Cards, Netbanking</div>
                </div>

                <GoldButton onClick={submit} disabled={processing || !form.amount || !form.name} className="w-full mt-6" size="lg" icon={!processing}>
                  {processing ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing</> : 'Pay ₹10,000 Booking Token'}
                </GoldButton>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}