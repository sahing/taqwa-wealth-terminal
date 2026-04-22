import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Trash2, X, Upload, Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import GoldButton from '@/components/brand/GoldButton';

const empty = { name: '', designation: '', location: '', quote: '', rating: 5, photo_url: '', investment_category: 'Real Estate', featured: false, published: true };

export default function TestimonialsAdmin() {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(empty);
  const [uploading, setUploading] = useState(false);

  const { data: items = [] } = useQuery({ queryKey: ['admin-testi'], queryFn: () => base44.entities.Testimonial.list('-created_date') });
  const save = useMutation({ mutationFn: (d) => base44.entities.Testimonial.create(d), onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-testi'] }); setOpen(false); setForm(empty); } });
  const del = useMutation({ mutationFn: (id) => base44.entities.Testimonial.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-testi'] }) });

  const upload = async (e) => {
    const file = e.target.files[0]; if (!file) return;
    setUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    setForm(f => ({ ...f, photo_url: file_url })); setUploading(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <h1 className="font-serif text-4xl text-white font-light">Testimonials</h1>
        <GoldButton onClick={() => setOpen(true)} icon={false}><Plus className="w-4 h-4" /> Add</GoldButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 