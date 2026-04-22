import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Phone, Mail } from 'lucide-react';

const STATUSES = ['New', 'Contacted', 'Qualified', 'Converted', 'Lost'];

export default function LeadsAdmin() {
  const qc = useQueryClient();
  const { data: leads = [] } = useQuery({ queryKey: ['all-leads'], queryFn: () => base44.entities.Lead.list('-created_date') });

  const update = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Lead.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['all-leads'] }),
  });

  return (
    <div>
      <h1 className="font-serif text-4xl text-white mb-10 font-light">Leads CRM</h1>
      <div className="glass overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-5 text-[10px] uppercase tracking-[0.3em] text-white/50 border-b border-gold/15">
          <div className="col-span-3">Name</div>
          <div className="col-span-3">Contact</div>
          <div className="col-span-2">Interest</div>
          <div className="col-span-2">Range</div>
          <div className="col-span-2">Status</div>
        </div>
        {leads.map(l => (
          <div key={l.id} className="grid grid-cols-12 gap-4 p-5 border-b border-white/5 items-center hover:bg-white/5">
            <div className="col-span-3">
              <div className="text-white text-sm">{l.name}</div>
              <div className="text-[10px] text-white/40 mt-1">{new Date(l.created_date).toLocaleDateString()}</div>
            </div>
            <div className="col-span-3 text-xs space-y-1">
              <a href={`tel:${l.phone}`} className="flex items-center gap-2 text-white/70 hover:text-gold"><Phone className="w-3 h-3" /> {l.phone}</a>
              {l.email && <a href={`mailto:${l.email}`} className="flex items-center gap-2 text-white/70 hover:text-gold"><Mail className="w-3 h-3" /> {l.email}</a>}
            </div>
            <div className="col-span-2 text-white/60 text-xs">{l.interest}</div>
            <div className="col-span-2 text-white/60 text-xs">{l.investment_range}</div>
            <div className="col-span-2">
              <select value={l.status} onChange={(e) => update.mutate({ id: l.id, data: { status: e.target.value } })}
                className="bg-transparent border border-gold/30 text-gold text-[10px] uppercase tracking-[0.2em] px-2 py-1">
                {STATUSES.map(s => <option key={s} value={s} className="bg-onyx">{s}</option>)}
              </select>
            </div>
          </div>
        ))}
        {leads.length === 0 && <div className="p-16 text-center text-white/40">No leads yet.</div>}
      </div>
    </div>
  );
}