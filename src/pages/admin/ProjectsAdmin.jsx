import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Edit2, Trash2, Star, X, Upload, Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import GoldButton from '@/components/brand/GoldButton';

const empty = { title: '', category: 'Real Estate', location: '', description: '', short_description: '', price: 0, min_investment: 0, roi_estimate: 0, duration_months: 12, status: 'Open', cover_image: '', shariah_purity: 100, asset_backing: 'Fully asset-backed', featured: false, highlights: [] };

export default function ProjectsAdmin() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);
  const [uploading, setUploading] = useState(false);

  const { data: projects = [] } = useQuery({ queryKey: ['admin-projects'], queryFn: () => base44.entities.Project.list('-created_date') });

  const save = useMutation({
    mutationFn: (data) => editing?.id ? base44.entities.Project.update(editing.id, data) : base44.entities.Project.create(data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-projects'] }); setEditing(null); setForm(empty); },
  });
  const del = useMutation({
    mutationFn: (id) => base44.entities.Project.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-projects'] }),
  });

  const openEdit = (p) => { setEditing(p); setForm({ ...empty, ...p, highlights: p.highlights || [] }); };
  const openNew = () => { setEditing({}); setForm(empty); };

  const uploadCover = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
 