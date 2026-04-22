import React from 'react';

export default function Logo({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'h-8',
    md: 'h-11',
    lg: 'h-16',
    xl: 'h-24',
  };
  return (
    <img
      src="https://media.base44.com/images/public/69e46bc888dafa440169762a/381b763bc_ChatGPTImageApr19202611_39_59AM.png"
      alt="Taqwa Assets — Halal Wealth"
      className={`${sizes[size]} w-auto object-contain ${className}`}
    />
  );
}