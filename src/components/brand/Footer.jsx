import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Linkedin, Facebook } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative bg-onyx border-t border-gold/15 pt-24 pb-10">
      <div className="absolute top-0 left-0 right-0 hairline" />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-5">
            <Logo size="lg" />
            <p className="mt-6 text-white/60 font-light leading-relaxed max-w-md">
              Halal wealth. Legal security. Clear ethics. Long-term trust. Building sustainable family wealth through Shariah-compliant tangible assets.
            </p>
            <div className="mt-8 flex items-center gap-4">
              {[Instagram, Linkedin, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 border border-gold/20 flex items-center justify-center hover:border-gold hover:bg-gold/5 transition-all"
                >
                  <Icon className="w-4 h-4 text-gold" />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-display text-[10px] uppercase tracking-[0.3em] text-gold mb-6">Explore</h4>
            <ul className="space-y-3 text-sm text-white/60 font-light">
              <li><Link to="/about" className="hover:text-gold transition">About</Link></li>
              <li><Link to="/opportunities" className="hover:text-gold transition">Opportunities</Link></li>
              <li><Link to="/why-taqwa" className="hover:text-gold transition">Why Us</Link></li>
              <li><Link to="/blog" className="hover:text-gold transition">Insights</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-display text-[10px] uppercase tracking-[0.3em] text-gold mb-6">Trust</h4>
            <ul className="space-y-3 text-sm text-white/60 font-light">
              <li><Link to="/legal" className="hover:text-gold transition">Compliance</Link></li>
              <li><Link to="/testimonials" className="hover:text-gold transition">Testimonials</Link></li>
              <li><Link to="/contact" className="hover:text-gold transition">Contact</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-display text-[10px] uppercase tracking-[0.3em] text-gold mb-6">Reach Us</h4>
            <ul className="space-y-4 text-sm text-white/60 font-light">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                <span>invest@taqwaassets.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                <span>Banjara Hills, Hyderabad,<br/>Telangana, India 500034</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="hairline mb-6" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40 font-light">
          <div>© {year} Taqwa Assets. All wealth flows from Allah ﷻ.</div>
          <div className="font-display tracking-[0.3em] text-gold/70">بناء الثروة بالضمير</div>
          <div>Privacy · Terms · Shariah Charter</div>
        </div>
      </div>
    </footer>
  );
}