import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import ProjectCard from '@/components/brand/ProjectCard';

const CATS = ['All', 'Real Estate', 'Land', 'Gold', 'Business', 'Redevelopment'];

export default function Opportunities() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initial = searchParams.get('cat') || 'All';
  const [active, setActive] = useState(initial);

  useEffect(() => { setActive(searchParams.get('cat') || 'All'); }, [searchParams]);

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['projects-all'],
    queryFn: () => base44.entities.Project.list('-created_date', 100),
  });

  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active);

  return (
    <>
      <section className="pt-40 pb-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-10 h-px bg-gold" />
            <span className="text-[10px] uppercase tracking-[0.5em] text-gold">Live Holdings</span>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl text-white font-light leading-tight max-w-4xl">
            The Opportunity <span className="italic gold-text-gradient">Matrix.</span>
          </h1>
          <p className="mt-8 text-white/60 font-light max-w-2xl">
            Every holding is Shariah-certified, asset-backed, and legally registered.
            Filter by category to begin your diligence.
          </p>

          {/* Filters */}
          <div className="mt-12 flex flex-wrap gap-2">
            {CATS.map((c) => (
              <button
                key={c}
                onClick={() => setSearchParams(c === 'All' ? {} : { cat: c })}
                className={`px-5 py-3 text-[10px] uppercase tracking-[0.25em] border transition-all ${
                  active === c
                    ? 'bg-gold text-onyx border-gold'
                    : 'border-white/15 text-white/60 hover:border-gold hover:text-gold'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => <div key={i} className="glass aspect-[3/4] animate-pulse" />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="glass p-20 text-center">
              <div className="font-serif text-3xl text-white mb-3">No holdings in this category currently.</div>
              <p className="text-white/50 font-light">New opportunities are curated monthly. Contact us for a private briefing.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(p => <ProjectCard key={p.id} project={p} />)}
            </div>
          )}
        </div>
      </section>
    </>
  );
}