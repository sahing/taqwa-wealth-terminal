import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function GoldButton({
  children,
  to,
  href,
  onClick,
  variant = 'solid',
  size = 'md',
  icon = true,
  className = '',
  type = 'button',
  disabled = false,
}) {
  const base = 'group relative inline-flex items-center justify-center gap-3 font-sans uppercase tracking-[0.25em] transition-all duration-500 overflow-hidden';
  const sizes = {
    sm: 'px-5 py-3 text-[10px]',
    md: 'px-8 py-4 text-xs',
    lg: 'px-10 py-5 text-sm',
  };
  const variants = {
    solid: 'bg-gold text-onyx hover:bg-champagne border border-gold',
    outline: 'border border-gold/40 text-gold hover:border-gold hover:bg-gold/5',
    ghost: 'text-white/80 hover:text-gold',
  };

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {icon && (
        <ArrowUpRight className="relative z-10 w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
      )}
      {variant === 'solid' && (
        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-700 bg-gradient-to-r from-champagne via-gold to-champagne" />
      )}
    </>
  );

  const classes = `${base} ${sizes[size]} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;

  if (to) return <Link to={to} className={classes}>{content}</Link>;
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>{content}</a>;
  return <button type={type} onClick={onClick} disabled={disabled} className={classes}>{content}</button>;
}