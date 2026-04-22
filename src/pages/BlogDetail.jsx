import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { ArrowLeft, Clock } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function BlogDetail() {
  const { id } = useParams();
  const { data: blog, isLoading } = useQuery({
    queryKey: ['blog', id],
    queryFn: async () => (await base44.entities.Blog.filter({ id }))[0],
  });

  if (isLoading) return <div className="pt-40 text-center text-white/40">Loading...</div>;
  if (!blog) return <div className="pt-40 text-center text-white/40">Not found.</div>;

  return (
    <article className="pt-32 pb-32">
      <div className="max-w-[900px] mx-auto px-6 lg:px-10">
        <Link to="/blog" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/50 hover:text-gold mb-10">
          <ArrowLeft className="w-3 h-3" /> Back to Ledger
        </Link>

        <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-gold mb-6">
          <span>{blog.category}</span>
          <span className="w-1 h-1 rounded-full bg-gold" />
          <span className="flex items-center gap-1 text-white/40"><Clock className="w-3 h-3" /> {blog.read_time || 5} min</span>
        </div>
        <h1 className="font-serif text-4xl md:text-6xl text-white font-light leading-tight">{blog.title}</h1>
        {blog.author && <p className="mt-6 text-white/40 text-sm">By {blog.author}</p>}

        {blog.cover_image && (
          <div className="aspect-[16/9] mt-12 overflow-hidden">
            <img src={blog.cover_image} alt={blog.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="mt-12 prose prose-invert prose-lg max-w-none prose-headings:font-serif prose-headings:font-light prose-a:text-gold prose-strong:text-gold">
          <ReactMarkdown>{blog.content || blog.excerpt || ''}</ReactMarkdown>
        </div>
      </div>
    </article>
  );
}