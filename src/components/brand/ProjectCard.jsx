import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, TrendingUp, Clock, ArrowUpRight } from 'lucide-react';

const statusTone = {
  'Open': 'border-emerald/50 text-emerald bg-emerald/5',
  'Closing Soon': 'border-gold/50 text-gold bg-gold/5',
  'Sold Out': 'border-zinc-600 text-zinc-500 bg-zinc-900/50',
  'Draft': 'border-zinc-700 text-zinc-500 bg-zinc-900/50',
};

const formatINR = (n) => {
  if (!n) return '—';
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(2)} L`;
  return `₹${n.toLocaleString('en-IN')}`;
};

export default function ProjectCard({ project }) {
  const fallback = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200';
  const img = project.cover_image || project.images?.[0] || fallback;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8 }}
      whileHover={{ y: -8 }}
      className="group relative glass overflow-hidden"
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={img}
          alt={project.title}
          className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/20 to-transparent" />

        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="glass-strong px-3 py-1.5 text-[10px] uppercase tracking-[0.3em] text-gold border border-gold/30">
            {project.category}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] border ${statusTone[project.status] || statusTone['Open']}`}>
            {project.status || 'Open'}
          </span>
        </div>

        <div className="absolute bottom-4 left-4 flex items-center gap-2 text-xs text-white/70">
          <MapPin className="w-3 h-3 text-gold" />
          {project.location || 'India'}
        </div>
      </div>

      <div className="p-7">
        <h3 className="font-serif text-2xl text-white leading-tight mb-2 group-hover:text-gold transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-white/50 font-light line-clamp-2 leading-relaxed">
          {project.short_description || project.description || 'Shariah-compliant asset backed by tangible value.'}
        </p>

        {/* Shariah Purity Bar */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[9px] uppercase tracking-[0.3em] text-white/40">Shariah Purity</span>
            <span className="text-[10px] text-gold font-medium">{project.shariah_purity || 100}%</span>
          </div>
          <div className="h-px w-full bg-white/10 relative overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${project.shariah_purity || 100}%` }}
              transition={{ duration: 1.2, delay: 0.2 }}
              viewport={{ once: true }}
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold-dark via-gold to-champagne"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-white/5">
          <div>
            <div className="text-[9px] uppercase tracking-[0.2em] text-white/40 mb-1">Min Invest</div>
            <div className="text-sm font-medium text-white">{formatINR(project.min_investment)}</div>
          </div>
          <div>
            <div className="text-[9px] uppercase tracking-[0.2em] text-white/40 mb-1 flex items-center gap-1">
              <TrendingUp className="w-2.5 h-2.5" /> ROI
            </div>
            <div className="text-sm font-medium text-gold">{project.roi_estimate ? `${project.roi_estimate}%` : '—'}</div>
          </div>
          <div>
            <div className="text-[9px] uppercase tracking-[0.2em] text-white/40 mb-1 flex items-center gap-1">
              <Clock className="w-2.5 h-2.5" /> Term
            </div>
            <div className="text-sm font-medium text-white">{project.duration_months ? `${project.duration_months} mo` : '—'}</div>
          </div>
        </div>

        <Link
          to={`/opportunities/${project.id}`}
          className="mt-7 w-full flex items-center justify-between px-5 py-4 bg-gold text-onyx uppercase tracking-[0.25em] text-[10px] font-semibold hover:bg-champagne transition-colors duration-500 group/btn"
        >
          <span>View Opportunity</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
        </Link>
      </div>
    </motion.div>
  );
}