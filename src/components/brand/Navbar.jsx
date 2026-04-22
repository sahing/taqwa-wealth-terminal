import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import Logo from './Logo';
import GoldButton from './GoldButton';
import { base44 } from '@/api/base44Client';

const NAV = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Opportunities', to: '/opportunities' },
  { label: 'Why Us', to: '/why-taqwa' },
  { label: 'Legal', to: '/legal' },
  { label: 'Blog', to: '/blog' },
  { label: 'Testimonials', to: '/testimonials' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    base44.auth.isAuthenticated().then(async (isAuth) => {
      if (isAuth) {
        const me = await base44.auth.me().catch(() => null);
        setUser(me);
      }
    });
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass-strong py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <Logo size="md" />
            <div className="hidden md:block">
              <div className="font-display text-sm tracking-[0.3em] text-white">TAQWA</div>
              <div className="font-display text-[9px] tracking-[0.5em] text-gold">ASSETS</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV.map((item) => {
              const active = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`text-[11px] uppercase tracking-[0.25em] font-light transition-colors relative ${
                    active ? 'text-gold' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {item.label}
                  {active && <span className="absolute -bottom-2 left-0 right-0 h-px bg-gold" />}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <GoldButton to={user.role === 'admin' ? '/admin' : '/dashboard'} variant="outline" size="sm" icon={false}>
                <User className="w-3 h-3 mr-1" /> {user.role === 'admin' ? 'Admin' : 'Portal'}
              </GoldButton>
            ) : (
              <GoldButton onClick={() => base44.auth.redirectToLogin(window.location.href)} variant="outline" size="sm">
                Investor Login
              </GoldButton>
            )}
          </div>

          <button className="lg:hidden text-white" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-onyx/95 backdrop-blur-xl" onClick={() => setOpen(false)} />
        <div className="relative h-full flex flex-col items-center justify-center gap-6 px-6">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-2xl font-serif text-white hover:text-gold transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-8 pt-8 border-t border-gold/20 w-full max-w-xs">
            {user ? (
              <GoldButton to={user.role === 'admin' ? '/admin' : '/dashboard'} className="w-full" size="md">
                {user.role === 'admin' ? 'Admin Panel' : 'My Portfolio'}
              </GoldButton>
            ) : (
              <GoldButton onClick={() => base44.auth.redirectToLogin(window.location.href)} className="w-full" size="md">
                Investor Login
              </GoldButton>
            )}
          </div>
        </div>
      </div>
    </>
  );
}