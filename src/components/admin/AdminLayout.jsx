import React, { useEffect, useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { LayoutGrid, Briefcase, Users, UserCheck, BookOpen, Star, CreditCard, Settings, LogOut, ShieldAlert, Menu, X } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import Logo from '../brand/Logo';

const NAV = [
  { to: '/admin', icon: LayoutGrid, label: 'Dashboard' },
  { to: '/admin/projects', icon: Briefcase, label: 'Projects' },
  { to: '/admin/leads', icon: Users, label: 'Leads CRM' },
  { to: '/admin/investors', icon: UserCheck, label: 'Investors' },
  { to: '/admin/blogs', icon: BookOpen, label: 'Blog CMS' },
  { to: '/admin/testimonials', icon: Star, label: 'Testimonials' },
  { to: '/admin/payments', icon: CreditCard, label: 'Payments' },
  { to: '/admin/settings', icon: Settings, label: 'Settings' },
];

export default function AdminLayout() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    base44.auth.me().then((u) => { setUser(u); setLoading(false); }).catch(() => { setLoading(false); base44.auth.redirectToLogin(window.location.href); });
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-white/40">Loading...</div>;
  if (!user) return null;
  if (user.role !== 'admin') return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="glass-strong p-16 max-w-lg text-center">
        <ShieldAlert className="w-10 h-10 text-gold mx-auto mb-6" />
        <h3 className="font-serif text-3xl text-white">Admin Access Only</h3>
        <p className="text-white/60 mt-4">This area is reserved for authorized personnel.</p>
        <Link to="/" className="mt-8 inline-block px-8 py-4 bg-gold text-onyx text-[10px] uppercase tracking-[0.3em]">Return Home</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-onyx text-white flex">
      <aside className={`fixed lg:sticky lg:translate-x-0 top-0 left-0 h-screen w-72 glass-strong z-40 transition-transform ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-8 border-b border-gold/15">
            <Link to="/"><Logo size="md" /></Link>
            <div className="mt-6 text-[10px] uppercase tracking-[0.3em] text-gold">Command Center</div>
          </div>
          <nav className="flex-1 p-6 space-y-1 overflow-y-auto">
            {NAV.map(n => (
              <NavLink key={n.to} to={n.to} end={n.to === '/admin'} onClick={() => setOpen(false)}
                className={({ isActive }) => `flex items-center gap-3 px-4 py-3 text-sm transition-all ${
                  isActive ? 'bg-gold/10 text-gold border-l-2 border-gold' : 'text-white/60 hover:text-white hover:bg-white/5 border-l-2 border-transparent'
                }`}>
                <n.icon className="w-4 h-4" /> {n.label}
              </NavLink>
            ))}
          </nav>
          <div className="p-6 border-t border-gold/15">
            <div className="text-xs text-white/50 mb-1">{user.full_name}</div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-gold mb-4">Admin</div>
            <button onClick={() => base44.auth.logout('/')} className="flex items-center gap-2 text-xs text-white/60 hover:text-gold"><LogOut className="w-3 h-3" /> Sign out</button>
          </div>
        </div>
      </aside>

      <header className="lg:hidden fixed top-0 inset-x-0 z-30 glass-strong p-4 flex items-center justify-between">
        <Logo size="sm" />
        <button onClick={() => setOpen(!open)} className="text-white">{open ? <X /> : <Menu />}</button>
      </header>

      <main className="flex-1 min-h-screen pt-20 lg:pt-0">
        <div className="p-6 lg:p-12 max-w-7xl">
          <Outlet context={{ user }} />
        </div>
      </main>
    </div>
  );
}