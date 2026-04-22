import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { Clock, ArrowUpRight } from 'lucide-react';

const CATS = ['All', 'Halal Finance', 'Wealth Planning', 'Gold Investing', 'Property Investing', 'Market Insights'];

export default function Blog() {
  const [cat, setCat] = useState('All');
  const { data: blogs = [] } = useQuery({
    queryKey: ['blogs'],
    queryFn: () => base44.entities.Blog.filter({ published: true }, '-created_date', 50),
  });
  const filtered = cat === 'All' ? blogs : blogs.filter(b => b.category === cat);

  return (
    <>
      <section className="pt-40 pb-12">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-10 h-px bg-gold" />
            <span className="text-[10px] uppercase tracking-[0.5em] text-gold">The Ledger</span>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl text-white font-light max-w-4xl">Insights on <span className="italic gold-text-gradient">halal wealth.</span></h1>
          <div className="mt-12 flex flex-wrap gap-2">
            {CATS.map(c => (
              <button key={c} onClick={() => setCat(c)} className={`px-5 py-3 text-[10px] uppercase tracking-[0.25em] border transition-all ${cat === c ? 'bg-gold text-onyx border-gold' : 'border-white/15 text-white/60 hover:border-gold hover:text-gold'}`}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          {filtered.length === 0 ? (
            <div className="glass p-20 text-center">
              <p className="text-white/50 font-light">New insights publishing soon, inshaAllah.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map(b => (
                <Link key={b.id} to={`/blog/${b.id}`} className="group glass overflow-hidden hover:border-gold/30 transition-all">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={b.cover_image || 'https://media.base44.com/images/public/69e46bc888dafa440169762a/d943f52a6_generated_0429f0fb.png'} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                  </div>
                  <div className="p-7">
                    <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-gold mb-4">
                      <span>{b.category || 'Insights'}</span>
                      <span className="w-1 h-1 rounded-full bg-gold" />
                      <span className="flex items-center gap-1 text-white/40"><Clock className="w-3 h-3" /> {b.read_time || 5} min</span>
                    </div>
                    <h3 className="font-serif text-2xl text-white leading-tight group-hover:text-gold transition-colors">{b.title}</h3>
                    <p className="text-white/50 font-light text-sm mt-4 line-clamp-2">{b.excerpt}</p>
                    <div className="mt-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/40 group-hover:text-gold transition-colors">
                      Read Insight <ArrowUpRight className="w-3 h-3" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}