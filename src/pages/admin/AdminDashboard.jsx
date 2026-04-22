import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Users, Briefcase, UserCheck, CreditCard, TrendingUp } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function AdminDashboard() {
  const { data: leads = [] } = useQuery({ queryKey: ['a-leads'], queryFn: () => base44.entities.Lead.list('-created_date') });
  const { data: projects = [] } = useQuery({ queryKey: ['a-projects'], queryFn: () => base44.entities.Project.list() });
  const { data: investments = [] } = useQuery({ queryKey: ['a-investments'], queryFn: () => base44.entities.Investment.list() });
  const { data: payments = [] } = useQuery({ queryKey: ['a-payments'], queryFn: () => base44.entities.Payment.list('-created_date') });
  const { data: investors = [] } = useQuery({ queryKey: ['a-users'], queryFn: () => base44.entities.User.list() });

  const totalRevenue = payments.filter(p => p.status === 'Success').reduce((s, p) => s + (p.amount || 0), 0);

  const stats = [
    { icon: Users, label: 'Total Leads', value: leads.length, tone: 'text-white' },
    { icon: UserCheck, label: 'Investors', value: investors.filter(u => u.role === 'user').length, tone: 'text-white' },
    { icon: Briefcase, label: 'Active Projects', value: projects.filter(p => p.status !== 'Sold Out' && p.status !== 'Draft').length, tone: 'gold-text-gradient' },
    { icon: CreditCard, label: 'Revenue', value: `₹${(totalRevenue / 100000).toFixed(1)}L`, tone: 'gold-text-gradient' },
    { icon: TrendingUp, label: 'Investments', value: investments.length, tone: 'text-white' },
  ];

  return (
    <div>
      <div className="mb-10">
        <div className="text-[10px] uppercase tracking-[0.4em] text-gold mb-3">Command Center</div>
        <h1 className="font-serif text-4xl text-white font-light">Overview</h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-gold/10 mb-10">
        {stats.map(s => (
          <div key={s.label} className="bg-onyx p-8">
            <s.icon className="w-4 h-4 text-gold mb-4" />
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2">{s.label}</div>
            <div className={`font-serif text-3xl ${s.tone}`}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass p-8">
          <h3 className="font-serif text-xl text-white mb-6">Recent Enquiries</h3>
          {leads.slice(0, 6).map(l => (
            <div key={l.id} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
              <div>
                <div className="text-white text-sm">{l.name}</div>
                <div className="text-[10px] text-white/40 mt-1">{l.phone} · {l.interest}</div>
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-gold">{l.status}</span>
            </div>
          ))}
          {leads.length === 0 && <div className="text-white/40 text-sm">No leads yet.</div>}
        </div>

        <div className="glass p-8">
          <h3 className="font-serif text-xl text-white mb-6">Recent Payments</h3>
          {payments.slice(0, 6).map(p => (
            <div key={p.id} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
              <div>
                <div className="text-white text-sm">{p.project_title || p.type}</div>
                <div className="text-[10px] text-white/40 mt-1">{p.user_email}</div>
              </div>
              <span className="font-serif text-gold">₹{p.amount?.toLocaleString('en-IN')}</span>
            </div>
          ))}
          {payments.length === 0 && <div className="text-white/40 text-sm">No payments yet.</div>}
        </div>
      </div>
    </div>
  );
}