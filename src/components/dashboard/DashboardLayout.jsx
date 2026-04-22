import React, { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Wallet, Receipt, FileText, User, ShieldCheck, LogOut, Menu, X } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import Logo from '../brand/Logo';

const NAV = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
  { to: '/dashboard/investments', icon: Wallet, label: 'My Investments' },
  { to: '/dashboard/payments', icon: Receipt, label: 'Payments' },
  { to: '/dashboard/documents', icon: FileText, label: 'Documents' },
  { to: '/dashboard/kyc', icon: ShieldCheck, label: 'KYC' },
  { to: '/dashboard/profile', icon: User, label: 'Profile' },
];

export default function DashboardLayout() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => base44.auth.redirectToLogin(window.location.href));
  }, []);

  if (!user) return <div className="min-h-screen flex items-center justify-center text-white/40">Loading...</div>;

  return (
    <div className="min-h-screen bg-onyx text-white flex">
      {/* Sidebar */}
      <aside className={`fixed lg:sticky lg:translate-x-0 top-0 left-0 h-screen w-72 glass-strong z-40 transition-transform ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-8 border-b border-gold/15">
            <Link to="/"><Logo size="md" /></Link>
            <div className="mt-6 text-[10px] uppercase tracking-[0.3em] text-gold">Wealth Terminal</div>
          </div>

          <nav className="flex-1 p-6 space-y-1">
            {NAV.map(n => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === '/dashboard'}
                onClick={() => setOpen(false)}
                className={({ isActive }) => `flex items-center gap-3 px-4 py-3 text-sm transition-all ${
                  isActive ? 'bg-gold/10 text-gold border-l-2 border-gold' : 'text-white/60 hover:text-white hover:bg-white/5 border-l-2 border-transparent'
                }`}
              >
                <n.icon className="w-4 h-4" /> {n.label}
              </NavLink>
            ))}
          </nav>

          <div className="p-6 border-t border-gold/15">
            <div className="text-xs text-white/50 mb-3">{user.full_name}</div>
            <div className="text-[10px] text-white/30 mb-4">{user.email}</div>
            <button onClick={() => base44.auth.logout('/')} className="flex items-center gap-2 text-xs text-white/60 hover:text-gold transition-colors">
              <LogOut className="w-3 h-3" /> Sign out
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile header */}
      <header className="lg:hidden fixed top-0 inset-x-0 z-30 glass-strong p-4 flex items-center justify-between">
        <Logo size="sm" />
        <button onClick={() => setOpen(!open)} className="text-white">{open ? <X /> : <Menu />}</button>
      </header>

      <main className="flex-1 min-h-screen lg:ml-0 pt-20 lg:pt-0">
        <div className="p-6 lg:p-12 max-w-7xl">
          <Outlet context={{ user }} />
        </div>
      </main>
    </div>
  );
}