import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Edit2, Trash2, X, Upload, Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import GoldButton from '@/components/brand/GoldButton';

const empty = { title: '', excerpt: '', content: '', category: 'Halal Finance', author: 'Taqwa Editorial', read_time: 5, cover_image: '', meta_title: '', meta_description: '', published: true };

export default function BlogsAdmin() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);
  const [uploading, setUploading] = useState(false);

  const { data: blogs = [] } = useQuery({ queryKey: ['admin-blogs'], queryFn: () => base44.entities.Blog.list('-created_date') });
  const save = useMutation({
    mutationFn: (data) => editing?.id ? base44.entities.Blog.update(editing.id, data) : base44.entities.Blog.create(data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-blogs'] }); setEditing(null); },
  });
  const del = useMutation({ mutationFn: (id) => base44.entities.Blog.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-blogs'] }) });

  const uploadCover = async (e) => {
    const file = e.target.files[0]; if (!file) return;
    setUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    setForm(f => ({ ...f, cover_image: file_url })); setUploading(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <h1 className="font-serif text-4xl text-white font-light">Blog CMS</h1>
        <GoldButton onClick={() => { setEditing({}); setForm(empty); }} icon={false}><Plus className="w-4 h-4" /> New Post</GoldButton>
      </div>

      <div className="glass overflow-hidden">
        {blogs.map(b => (
          <div key={b.id} className="flex items-center justify-between p-5 border-b border-white/5 hover:bg-white/5">
            <div className="flex items-center gap-4">
              {b.cover_image && <img src={b.cover_image} alt="" className="w-14 h-14 object-cover" />}
              <div>
                <div className="text-white">{b.title}</div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-gold mt-1">{b.category} · {b.published ? 'Published' : 'Draft'}</div>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => { setEditing(b); setForm({ ...empty, ...b }); }} className="p-2 text-white/50 hover:text-gold"><Edit2 className="w-4 h-4" /></button>
              <button onClick={() => confirm('Delete?') && del.mutate(b.id)} className="p-2 text-white/50 hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
        {blogs.length === 0 && <div className="p-16 text-center text-white/40">No blog posts yet.</div>}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/80" onClick={() => setEditing(null)} />
          <div className="relative ml-auto w-full max-w-2xl h-full glass-strong overflow-y-auto">
            <div className="p-8 border-b border-gold/15 flex items-center justify-between">
              <h2 className="font-serif text-2xl text-white">{editing.id ? 'Edit Post' : 'New Post'}</h2>
              <button onClick={() => setEditing(null)}><X className="text-white/60" /></button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); save.mutate(form); }} className="p-8 space-y-6">
              <div><label className="lbl">Title</label><input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="inp" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="lbl">Category</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="inp">
                    {['Halal Finance', 'Wealth Planning', 'Gold Investing', 'Property Investing', 'Market Insights'].map(c => <option key={c} value={c} className="bg-onyx">{c}</option>)}
                  </select>
                </div>
                <div><label className="lbl">Read time (min)</label><input type="number" value={form.read_time} onChange={(e) => setForm({ ...form, read_time: +e.target.value })} className="inp" /></div>
              </div>
              <div><label className="lbl">Excerpt</label><textarea rows="2" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className="inp resize-none" /></div>
              <div><label className="lbl">Content (Markdown)</label><textarea rows="10" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="inp resize-none font-mono text-xs" /></div>
              <div><label className="lbl">Cover Image</label>
                <div className="flex items-center gap-4">
                  {form.cover_image && <img src={form.cover_image} alt="" className="w-20 h-20 object-cover" />}
                  <label className="glass px-4 py-3 cursor-pointer flex items-center gap-2 text-sm">
                    {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4 text-gold" />} Upload
                    <input type="file" className="hidden" accept="image/*" onChange={uploadCover} />
                  </label>
                </div>
              </div>
              <label className="flex items-center gap-3 text-sm text-white"><input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="accent-gold" /> Published</label>
              <div className="flex justify-end gap-3"><button type="button" onClick={() => setEditing(null)} className="text-white/60 text-xs uppercase tracking-widest">Cancel</button><GoldButton type="submit">Save</GoldButton></div>
            </form>
          </div>
        </div>
      )}

      <style>{`.lbl{display:block;font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:rgba(255,255,255,0.5);margin-bottom:8px}.inp{width:100%;background:transparent;border-bottom:1px solid rgba(255,255,255,0.15);padding:8px 0;color:white;outline:none}.inp:focus{border-color:#D4AF37}`}</style>
    </div>
  );
}