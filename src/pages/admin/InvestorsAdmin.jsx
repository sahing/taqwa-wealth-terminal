import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Check, X } from 'lucide-react';

export default function InvestorsAdmin() {
  const qc = useQueryClient();
  const { data: users = [] } = useQuery({ queryKey: ['all-users'], queryFn: () => base44.entities.User.list() });
  const { data: kycs = [] } = useQuery({ queryKey: ['all-kyc'], queryFn: () => base44.entities.KYC.list() });
  const { data: investments = [] } = useQuery({ queryKey: ['all-investments'], queryFn: () => base44.entities.Investment.list() });

  const updateKyc = useMutation({
    mutationFn: ({ id, status }) => base44.entities.KYC.update(id, { status }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['all-kyc'] }),
  });

  return (
    <div>
      <h1 className="font-serif text-4xl text-white mb-10 font-light">Investors</h1>
      <div className="glass overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-5 text-[10px] uppercase tracking-[0.3em] text-white/50 border-b border-gold/15">
          <div className="col-span-3">Name</div>
          <div className="col-span-3">Email</div>
          <div className="col-span-2">Invested</div>
          <div className="col-span-2">KYC</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>
        {users.filter(u => u.role === 'user').map(u => {
          const kyc = kycs.find(k => k.user_email === u.email);
          const userInvs = investments.filter(i => i.user_email === u.email);
          const total = userInvs.reduce((s, i) => s + (i.amount || 0), 0);
          return (
            <div key={u.id} className="grid grid-cols-12 gap-4 p-5 border-b border-white/5 items-center">
              <div className="col-span-3 text-white text-sm">{u.full_name}</div>
              <div className="col-span-3 text-white/60 text-xs">{u.email}</div>
              <div className="col-span-2 text-gold">₹{total.toLocaleString('en-IN')}</div>
              <div className="col-span-2 text-xs uppercase tracking-widest">
                <span className={kyc?.status === 'Approved' ? 'text-emerald' : kyc?.status === 'Pending Review' ? 'text-gold' : 'text-white/40'}>
                  {kyc?.status || 'Not submitted'}
                </span>
              </div>
              <div className="col-span-2 flex justify-end gap-2">
                {kyc?.status === 'Pending Review' && (
                  <>
                    <button onClick={() => updateKyc.mutate({ id: kyc.id, status: 'Approved' })} className="p-2 text-emerald hover:bg-emerald/10"><Check className="w-4 h-4" /></button>
                    <button onClick={() => updateKyc.mutate({ id: kyc.id, status: 'Rejected' })} className="p-2 text-destructive hover:bg-destructive/10"><X className="w-4 h-4" /></button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}