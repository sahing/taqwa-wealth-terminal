import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

const formatINR = (n) => !n ? '₹0' : `₹${n.toLocaleString('en-IN')}`;
const tone = { Pending: 'text-gold', Active: 'text-emerald', Matured: 'text-white', Cancelled: 'text-destructive' };

export default function MyInvestments() {
  const { user } = useOutletContext();
  const { data: investments = [], isLoading } = useQuery({
    queryKey: ['investments', user.email],
    queryFn: () => base44.entities.Investment.filter({ user_email: user.email }, '-created_date'),
  });

  return (
    <div>
      <h1 className="font-serif text-4xl text-white mb-10 font-light">My <span className="italic gold-text-gradient">Investments</span></h1>

      {isLoading ? <div className="text-white/40">Loading...</div> : investments.length === 0 ? (
        <div className="glass p-20 text-center text-white/50">No investments yet.</div>
      ) : (
        <div className="glass overflow-hidden">
          <div className="grid grid-cols-5 gap-4 p-6 text-[10px] uppercase tracking-[0.3em] text-white/50 border-b border-gold/15">
            <div className="col-span-2">Project</div>
            <div>Amount</div>
            <div>Date</div>
            <div>Status</div>
          </div>
          {investments.map(i => (
            <div key={i.id} className="grid grid-cols-5 gap-4 p-6 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
              <div className="col-span-2 font-medium text-white">{i.project_title}</div>
              <div className="text-gold font-serif">{formatINR(i.amount)}</div>
              <div className="text-white/60 text-sm">{new Date(i.created_date).toLocaleDateString()}</div>
              <div className={`text-xs uppercase tracking-widest ${tone[i.status] || 'text-white'}`}>{i.status}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}