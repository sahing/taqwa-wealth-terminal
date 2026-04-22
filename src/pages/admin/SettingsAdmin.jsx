import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import GoldButton from '@/components/brand/GoldButton';
import { Check } from 'lucide-react';

const DEFAULTS = [
  { key: 'contact_phone', label: 'Primary Phone', category: 'Contact' },
  { key: 'contact_email', label: 'Primary Email', category: 'Contact' },
  { key: 'whatsapp_number', label: 'WhatsApp Number (with country code)', category: 'Contact' },
  { key: 'office_address', label: 'Office Address', category: 'Contact' },
  { key: 'instagram_url', label: 'Instagram URL', category: 'Social' },
  { key: 'linkedin_url', label: 'LinkedIn URL', category: 'Social' },
  { key: 'facebook_url', label: 'Facebook URL', category: 'Social' },
  { key: 'homepage_tagline', label: 'Homepage Tagline', category: 'Content' },
];

export default function SettingsAdmin() {
  const [values, setValues] = useState({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    base44.entities.Setting.list().then(list => {
      const map = {};
      list.forEach(s => { map[s.key] = { id: s.id, value: s.value }; });
      setValues(map);
    });
  }, []);

  const save = async () => {
    for (const d of DEFAULTS) {
      const v = values[d.key];
      if (v?.id) await base44.entities.Setting.update(v.id, { value: v.value || '' });
      else if (v?.value) await base44.entities.Setting.create({ key: d.key, value: v.value, category: d.category });
 