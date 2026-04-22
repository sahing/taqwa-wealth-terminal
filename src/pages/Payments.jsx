import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Download } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function Payments() {
  const { user } = useOutletContext();
  const { data: payments = [] } = useQuery({
    queryKey: ['payments', user.email],
    queryFn: () => base44.entities.Payment.filter({ user_email: user.email }, '-created_date'),
  });

  return (
    <div>
      <h1 className="font-serif text-4xl text-white mb-10 font-light">Payment <span className="italic gold-text-gradient">Ledger</span></h1>
      {payments.length === 0 ? (
        <div className="glass p-20 text-center text-white/50">No transactions yet.</div>
      ) : (
        <div className="glass overflow-hidden">
          <div className="grid grid-cols-6 gap-4 p-6 text-[10px] uppercase tracking-[0.3em] text-white/50 border-b border-gold/15">
            <div className="col-span-2">Project</div>
            <div>Type</div>
            <div>Amount</div>
            <div>Status</div>
            <div>Receipt</div>
          </div>
          {payments.map(p => (
            <div key={p.id} className="grid grid-cols-6 gap-4 p-6 border-b border-white/5 items-center">
              <div className="col-span-2 text-white text-sm">{p.project_title || '—'}</div>
              <div className="text-white/60 text-xs">{p.type}</div>
              <div className="text-gold font-serif">₹{p.amount?.toLocaleString('en-IN')}</div>
              <div className={`text-xs uppercase tracking-widest ${p.status === 'Success' ? 'text-emerald' : 'text-gold'}`}>{p.status}</div>
              <div><button className="text-gold text-xs flex items-center gap-1 hover:text-champagne"><Download className="w-3 h-3" /> PDF</button></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}