import React from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { TrendingUp, Wallet, Briefcase, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { base44 } from '@/api/base44Client';

const formatINR = (n) => !n ? '₹0' : n >= 10000000 ? `₹${(n / 10000000).toFixed(2)} Cr` : n >= 100000 ? `₹${(n / 100000).toFixed(2)} L` : `₹${n.toLocaleString('en-IN')}`;

export default function DashboardOverview() {
  const { user } = useOutletContext();

  const { data: investments = [] } = useQuery({
    queryKey: ['my-investments', user.email],
    queryFn: () => base44.entities.Investment.filter({ user_email: user.email }, '-created_date'),
  });
  const { data: kyc = [] } = useQuery({
    queryKey: ['my-kyc', user.email],
    queryFn: () => base44.entities.KYC.filter({ user_email: user.email }),
  });

  const totalInvested = investments.reduce((s, i) => s + (i.amount || 0), 0);
  const activeCount = investments.filter(i => i.status === 'Active' || i.status === 'Pending').length;
  const portfolioValue = investments.reduce((s, i) => s + (i.current_value || i.amount || 0), 0);
  const kycStatus = kyc[0]?.status || 'Not Submitted';

  return (
    <div>
      <div className="mb-12">
        <div className="text-[10px] uppercase tracking-[0.4em] text-gold mb-3">Wealth Terminal</div>
        <h1 className="font-serif text-4xl md:text-5xl text-white font-light">As-salāmu ʿalaykum,<br /><span className="italic gold-text-gradient">{user.full_name?.split(' ')[0] || 'Investor'}.</span></h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gold/10 mb-12">
        {[
          { icon: Wallet, label: 'Total Invested', value: formatINR(totalInvested), tone: 'text-white' },
          { icon: TrendingUp, label: 'Portfolio Value', value: formatINR(portfolioValue), tone: 'gold-text-gradient' },
          { icon: Briefcase, label: 'Active Projects', value: activeCount, tone: 'text-white' },
          { icon: ShieldCheck, label: 'KYC Status', value: kycStatus, tone: kycStatus === 'Approved' ? 'text-emerald' : 'text-gold' },
        ].map((s) => (
          <div key={s.label} className="bg-onyx p-8">
            <s.icon className="w-5 h-5 text-gold mb-6" />
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-3">{s.label}</div>
            <div className={`font-serif text-3xl ${s.tone}`}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Taqwa Impact */}
      <div className="glass-strong p-10 mb-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-px bg-gold" />
          <span className="text-[10px] uppercase tracking-[0.4em] text-gold">Taqwa Impact Score</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 items-center">
          <div className="md:col-span-1">
            <div className="font-serif text-7xl gold-text-gradient">98</div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 mt-2">/ 100</div>
          </div>
          <div className="md:col-span-3">
            <p className="font-serif text-xl text-white leading-relaxed">Your wealth is contributing to <span className="text-gold">Shariah-compliant, tangible, family-benefiting assets.</span> Barakah score reflects real-world ethical impact.</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="glass p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-serif text-2xl text-white">Recent Investments</h3>
          <Link to="/dashboard/investments" className="text-[10px] uppercase tracking-[0.3em] text-gold hover:text-champagne flex items-center gap-1">View All <ArrowUpRight className="w-3 h-3" /></Link>
        </div>
        {investments.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-white/40 mb-6">You haven't invested yet. Begin your amanah today.</p>
            <Link to="/opportunities" className="inline-block px-8 py-4 bg-gold text-onyx text-[10px] uppercase tracking-[0.3em]">Explore Opportunities</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {investments.slice(0, 5).map(i => (
              <div key={i.id} className="flex items-center justify-between py-4 border-b border-white/5 last:border-0">
                <div>
                  <div className="font-medium text-white">{i.project_title}</div>
                  <div className="text-xs text-white/40 mt-1">{new Date(i.created_date).toLocaleDateString()}</div>
                </div>
                <div className="text-right">
                  <div className="font-serif text-lg text-gold">{formatINR(i.amount)}</div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-white/50">{i.status}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}