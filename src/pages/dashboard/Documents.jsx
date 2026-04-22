import React from 'react';
import { FileText, Download } from 'lucide-react';

const DOCS = [
  { name: 'Welcome Letter.pdf', type: 'Onboarding' },
  { name: 'Shariah Compliance Certificate.pdf', type: 'Certification' },
  { name: 'Master Investor Agreement.pdf', type: 'Agreement' },
];

export default function Documents() {
  return (
    <div>
      <h1 className="font-serif text-4xl text-white mb-10 font-light">Document <span className="italic gold-text-gradient">Vault</span></h1>
      <div className="glass divide-y divide-white/5">
        {DOCS.map((d, i) => (
          <div key={i} className="flex items-center justify-between p-6 hover:bg-white/5 transition">
            <div className="flex items-center gap-4">
              <FileText className="w-5 h-5 text-gold" />
              <div>
                <div className="text-white">{d.name}</div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 mt-1">{d.type}</div>
              </div>
            </div>
            <button className="text-gold text-xs flex items-center gap-2 hover:text-champagne"><Download className="w-4 h-4" /> Download</button>
          </div>
        ))}
      </div>
      <p className="text-xs text-white/40 mt-6">Project-specific documents appear here after investment confirmation.</p>
    </div>
  );
}