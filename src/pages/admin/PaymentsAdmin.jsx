import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

export default function PaymentsAdmin() {
  const { data: payments = [] } = useQuery({ queryKey: ['admin-pay'], queryFn: () => base44.entities.Payment.list('-created_date') });
  const total = payments.filter(p => p.status === 'Success').reduce((s, p) => s + (p.amount || 0), 0);

  return (
    <div>
      <h1 className="font-serif text-4xl text-white mb-4 font-light">Payments</h1>
      <div className="text-gold font-serif text-2xl mb-10">Total Collected: ₹{total.toLocaleString('en-IN')}</div>

      <div className="glass overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-5 text-[10px] uppercase tracking-[0.3em] text-white/50 border-b border-gold/15">
          <div className="col-span-3">Investor</div>
          <div className="col-span-3">Project</div>
          <div className="col-span-2">Type</div>
          <div className="col-span-2">Amount</div>
          <div className="col-span-2">Status</div>
        </div>
        {payments.map(p => (
          <div key={p.id} className="grid grid-cols-12 gap-4 p-5 border-b border-white/5 items-center hover:bg-white/5">
            <div className="col-span-3 text-white/80 text-sm">{p.user_email}</div>
            <div className="col-span-3 text-white text-sm">{p.project_title || '—'}</div>
            <div className="col-span-2 text-white/60 text-xs">{p.type}</div>
            <div className="col-span-2 text-gold font-serif">₹{p.amount?.toLocaleString('en-IN')}</div>
            <div className={`col-span-2 text-xs uppercase tracking-widest ${p.status === 'Success' ? 'text-emerald' : 'text-gold'}`}>{p.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
}