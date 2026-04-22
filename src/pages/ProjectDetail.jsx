import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { MapPin, TrendingUp, Clock, Shield, Check, ArrowLeft } from 'lucide-react';
import GoldButton from '@/components/brand/GoldButton';
import InvestModal from '@/components/invest/InvestModal';

const formatINR = (n) => !n ? '—' : n >= 10000000 ? `₹${(n / 10000000).toFixed(2)} Cr` : n >= 100000 ? `₹${(n / 100000).toFixed(2)} L` : `₹${n.toLocaleString('en-IN')}`;

export default function ProjectDetail() {
  const { id } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const { data: project, isLoading } = useQuery({
    queryKey: ['project', id],
    queryFn: async () => {
      const arr = await base44.entities.Project.filter({ id });
      return arr[0];
    },
  });

  if (isLoading) return <div className="pt-40 text-center text-white/40">Loading...</div>;
  if (!project) return <div className="pt-40 text-center text-white/40">Project not found.</div>;

  const img = project.cover_image || project.images?.[0] || 'https://media.base44.com/images/public/69e46bc888dafa440169762a/209b17371_generated_f5712da0.png';

  return (
    <>
      <section className="pt-32 pb-12">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <Link to="/opportunities" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/50 hover:text-gold mb-8">
            <ArrowLeft className="w-3 h-3" /> All Opportunities
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={img} alt={project.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 glass-strong px-3 py-1.5 text-[10px] uppercase tracking-[0.3em] text-gold border border-gold/30">
                  {project.category}
                </div>
              </div>

              <div className="mt-10">
                <div className="flex items-center gap-2 text-xs text-white/60 mb-4">
                  <MapPin className="w-3 h-3 text-gold" /> {project.location || 'India'}
                </div>
                <h1 className="font-serif text-4xl md:text-5xl text-white font-light leading-tight">{project.title}</h1>
                <div className="hairline my-10" />

                <h3 className="font-display text-xs tracking-[0.3em] text-gold mb-6">OVERVIEW</h3>
                <p className="text-white/70 font-light leading-relaxed whitespace-pre-line">
                  {project.description || 'Detailed investment memorandum available upon qualified inquiry.'}
                </p>

                {project.highlights?.length > 0 && (
                  <div className="mt-12">
                    <h3 className="font-display text-xs tracking-[0.3em] text-gold mb-6">HIGHLIGHTS</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {project.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-3 text-white/70 font-light">
                          <Check className="w-4 h-4 text-gold mt-0.5 shrink-0" /> {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-5 lg:sticky lg:top-28 self-start">
              <div className="glass-strong p-8">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-gold">Status</span>
                  <span className="text-white">{project.status}</span>
                </div>
                <div className="hairline mb-6" />

                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/50 flex items-center gap-2"><TrendingUp className="w-3 h-3" /> Est. ROI</span>
                    <span className="font-serif text-2xl gold-text-gradient">{project.roi_estimate || '—'}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/50 flex items-center gap-2"><Clock className="w-3 h-3" /> Term</span>
                    <span className="text-white">{project.duration_months || '—'} months</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/50">Min Investment</span>
                    <span className="text-white font-medium">{formatINR(project.min_investment)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/50">Total Raise</span>
                    <span className="text-white font-medium">{formatINR(project.price)}</span>
                  </div>
                </div>

                <div className="hairline my-6" />

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">Shariah Purity</span>
                    <span className="text-gold text-sm">{project.shariah_purity || 100}%</span>
                  </div>
                  <div className="h-1 w-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-gold-dark via-gold to-champagne" style={{ width: `${project.shariah_purity || 100}%` }} />
                  </div>
                  <p className="text-[10px] text-white/40 mt-2 flex items-center gap-1">
                    <Shield className="w-3 h-3 text-gold" /> {project.asset_backing || 'Fully asset-backed'}
                  </p>
                </div>

                <GoldButton onClick={() => setModalOpen(true)} className="w-full" size="lg">
                  Reserve Your Share
                </GoldButton>
                <p className="text-[10px] text-white/40 text-center mt-4 leading-relaxed">
                  Booking token ₹10,000 · Fully refundable after due diligence
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <InvestModal open={modalOpen} onClose={() => setModalOpen(false)} project={project} />
    </>
  );
}