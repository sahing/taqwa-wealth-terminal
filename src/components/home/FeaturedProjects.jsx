import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import SectionHeading from '../brand/SectionHeading';
import ProjectCard from '../brand/ProjectCard';
import GoldButton from '../brand/GoldButton';

export default function FeaturedProjects() {
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['featured-projects'],
    queryFn: () => base44.entities.Project.filter({ featured: true }, '-created_date', 6),
  });

  return (
    <section className="py-28 md:py-36 relative">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <SectionHeading
            eyebrow="Curated Opportunities"
            title="Featured holdings of the quarter."
          />
          <GoldButton to="/opportunities" variant="outline" size="sm">View All Holdings</GoldButton>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="glass aspect-[3/4] animate-pulse" />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="glass p-20 text-center">
            <p className="text-white/50 font-light">Curated opportunities coming soon. Join our waitlist via WhatsApp.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => <ProjectCard key={p.id} project={p} />)}
          </div>
        )}
      </div>
    </section>
  );
}